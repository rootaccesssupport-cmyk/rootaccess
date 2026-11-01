import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  UserCheck,
  RefreshCw,
  ArrowLeft,
  BookOpen,
  Lock,
  Unlock,
  Check,
  Loader2,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG } from '../../data/enrollmentPaymentConfig';
import { enrollmentService, type EnrollmentRequest } from '../../services/enrollmentService';
import { COURSES } from '../../data/curriculumData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const AdminEnrollmentPortalPage: React.FC = () => {
  const { user, profile } = useAuth();

  const isAdmin =
    ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(user?.email) ||
    profile?.role === 'admin' ||
    user?.email === 'pavankalyan.d@gmail.com';

  const [requests, setRequests] = useState<EnrollmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Direct grant modal/form
  const [grantEmail, setGrantEmail] = useState('');
  const [grantCourse, setGrantCourse] = useState('manual-qa-fundamentals');
  const [grantLoading, setGrantLoading] = useState(false);

  // Registered students list for quick reference
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await enrollmentService.getAllRequests();
      setRequests(data);
    } catch (err: any) {
      console.error('Failed to load enrollment requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRegisteredStudents = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoadingStudents(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, enrolled_courses, created_at')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setRegisteredStudents(data);
      }
    } catch (err) {
      console.warn('Error loading students list:', err);
    } finally {
      setLoadingStudents(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadRequests();
      loadRegisteredStudents();
    }
  }, [isAdmin, loadRequests, loadRegisteredStudents]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Access Only</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              This portal is restricted to the RootAccess platform administrator (<span className="font-mono text-indigo-600">{ENROLLMENT_PAYMENT_CONFIG.adminEmail}</span>).
            </p>
            <div className="pt-2">
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Student Dashboard</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleApprove = async (requestId: string, studentName: string, courseTitle: string) => {
    const res = await enrollmentService.approveRequest(requestId, user?.email || 'admin');
    if (res.success) {
      setActionMessage({
        type: 'success',
        text: `✅ Approved access to "${courseTitle}" for ${studentName}! Course unlocked.`,
      });
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: `Failed to approve: ${res.error}` });
    }
  };

  const handleReject = async (requestId: string, studentName: string) => {
    const res = await enrollmentService.rejectRequest(requestId, user?.email || 'admin');
    if (res.success) {
      setActionMessage({
        type: 'success',
        text: `Rejected enrollment request for ${studentName}.`,
      });
      loadRequests();
    } else {
      setActionMessage({ type: 'error', text: `Failed to reject: ${res.error}` });
    }
  };

  const handleDirectGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantEmail.trim()) return;
    setGrantLoading(true);
    setActionMessage(null);

    const res = await enrollmentService.directGrantByEmail(
      grantEmail,
      grantCourse,
      user?.email || 'admin'
    );

    if (res.success) {
      setActionMessage({ type: 'success', text: res.message });
      setGrantEmail('');
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
    setGrantLoading(false);
  };

  const handleRevoke = async (studentId: string, studentEmail: string, courseSlug: string) => {
    if (!window.confirm(`Revoke access to ${courseSlug} for ${studentEmail}?`)) return;
    const res = await enrollmentService.revokeAccess(studentId, courseSlug);
    if (res.success) {
      setActionMessage({ type: 'success', text: `Revoked ${courseSlug} from ${studentEmail}` });
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.user_name.toLowerCase().includes(q) ||
        r.user_email.toLowerCase().includes(q) ||
        r.course_title.toLowerCase().includes(q) ||
        (r.upi_reference && r.upi_reference.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Control Center</span>
                </span>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pendingCount} Pending Approval</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Course Enrollment &amp; UPI Payment Approvals
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Review student UPI payment requests sent to WhatsApp (+91 9741243048), approve course enrollments with 1-click, or directly unlock courses by student email.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => {
                  loadRequests();
                  loadRegisteredStudents();
                }}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action feedback banner */}
        {actionMessage && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center justify-between animate-fadeIn ${
              actionMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <span>{actionMessage.text}</span>
            <button
              onClick={() => setActionMessage(null)}
              className="font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2-column: Requests list */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Payment &amp; Enrollment Requests ({requests.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Students who requested access via WhatsApp / UPI
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                        filter === tab
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab} {tab === 'pending' && pendingCount > 0 ? `(${pendingCount})` : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by student name, email, UPI ref, or course..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Requests Table / Cards */}
              {loading ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>Loading enrollment requests...</span>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                  <p className="font-semibold text-slate-700">No requests found</p>
                  <p className="text-slate-400">
                    {filter === 'pending'
                      ? 'No pending payment requests at the moment.'
                      : 'No requests matched the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        req.status === 'pending'
                          ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                          : req.status === 'approved'
                          ? 'bg-white border-emerald-200/80'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">{req.user_name}</span>
                          <span className="text-xs text-slate-500 font-mono">({req.user_email})</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              req.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800 animate-pulse'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <div className="text-xs text-indigo-700 font-semibold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{req.course_title}</span>
                        </div>

                        {req.upi_reference && (
                          <div className="text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200 inline-block font-mono">
                            UTR / UPI Ref: <strong>{req.upi_reference}</strong>
                          </div>
                        )}

                        {req.student_notes && (
                          <p className="text-[11px] text-slate-500 italic bg-white/60 p-2 rounded-lg border border-slate-200/60">
                            &ldquo;{req.student_notes}&rdquo;
                          </p>
                        )}

                        <div className="text-[10px] text-slate-400">
                          Requested: {new Date(req.requested_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          {req.reviewed_by && ` • Reviewed by: ${req.reviewed_by}`}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {req.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleApprove(req.id, req.user_name, req.course_title)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve &amp; Unlock</span>
                            </button>
                            <button
                              onClick={() => handleReject(req.id, req.user_name)}
                              className="inline-flex items-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : req.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Course Active</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApprove(req.id, req.user_name, req.course_title)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-200 hover:bg-emerald-600 hover:text-white text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                          >
                            <span>Re-approve</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right 1-column: Quick Direct Unlock & Registered Accounts */}
          <div className="space-y-6">
            {/* Quick Direct Grant Tool */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Unlock className="w-4 h-4 text-indigo-600" />
                <span>Direct Course Unlock (Manual)</span>
              </div>
              <p className="text-xs text-slate-500">
                Grant access to any student immediately by entering their registered email address.
              </p>

              <form onSubmit={handleDirectGrant} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={grantEmail}
                    onChange={(e) => setGrantEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Course Track
                  </label>
                  <select
                    value={grantCourse}
                    onChange={(e) => setGrantCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    {COURSES.map((c: any) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={grantLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {grantLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>Grant Instant Lifetime Access</span>
                </button>
              </form>
            </div>

            {/* Registered Students Directory */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Registered Students ({registeredStudents.length})</span>
                </div>
                <button
                  onClick={loadRegisteredStudents}
                  className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {loadingStudents ? (
                <div className="py-6 text-center text-xs text-slate-400">Loading student directory...</div>
              ) : registeredStudents.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">No students found</div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar">
                  {registeredStudents.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{st.full_name}</strong>
                        <span className="text-[10px] font-semibold text-slate-400 capitalize">
                          {st.role || 'student'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{st.email}</p>

                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 font-medium">Enrolled Courses:</span>
                        {st.enrolled_courses && st.enrolled_courses.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {st.enrolled_courses.map((slug: string) => (
                              <span
                                key={slug}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200"
                              >
                                <span>{slug}</span>
                                <button
                                  onClick={() => handleRevoke(st.id, st.email, slug)}
                                  className="text-rose-500 hover:text-rose-700 ml-0.5"
                                  title="Revoke access"
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-amber-600 mt-0.5">None (Preview only)</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
