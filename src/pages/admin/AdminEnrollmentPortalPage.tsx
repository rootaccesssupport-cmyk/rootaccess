import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  ArrowLeft,
  BookOpen,
  Lock,
  Unlock,
  Check,
  Loader2,
  UserMinus,
  X,
  CreditCard,
  Sparkles,
  Settings,
  AlertTriangle,
  Users,
  Coins,
  Calendar,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdminNavHeader } from '../../components/admin/AdminNavHeader';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG } from '../../data/enrollmentPaymentConfig';
import { enrollmentService, type EnrollmentRequest } from '../../services/enrollmentService';
import {
  campaignService,
  type CampaignStats,
} from '../../services/campaignService';
import {
  getStoredCampaignConfig,
  saveStoredCampaignConfig,
  type LaunchCampaignConfig,
} from '../../data/campaignConfig';
import { COURSES } from '../../data/curriculumData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const AdminEnrollmentPortalPage: React.FC = () => {
  const { user, profile } = useAuth();

  const isAdmin =
    ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(user?.email) ||
    profile?.role === 'admin' ||
    user?.email === 'pavankalyan.d@gmail.com';

  // Navigation tab: 'founding100' | 'requests' | 'tools'
  const [adminMainTab, setAdminMainTab] = useState<'founding100' | 'requests' | 'tools'>('founding100');

  const [requests, setRequests] = useState<EnrollmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Campaign Stats & Settings
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(null);
  const [campaignConfig, setCampaignConfig] = useState<LaunchCampaignConfig>(getStoredCampaignConfig());
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState(campaignConfig.launchPriceInr);
  const [editSeats, setEditSeats] = useState(campaignConfig.maxSeats);
  const [editDuration, setEditDuration] = useState(campaignConfig.durationDays);
  const [editIsActive, setEditIsActive] = useState(campaignConfig.isActive);

  // Founding 100 table filters
  const [foundingFilter, setFoundingFilter] = useState<'all' | 'pending' | 'active' | 'expired' | 'rejected'>('all');
  const [foundingSearch, setFoundingSearch] = useState('');

  // Approval Modal with UTR entry
  const [approvingRequest, setApprovingRequest] = useState<EnrollmentRequest | null>(null);
  const [approvalUpiRef, setApprovalUpiRef] = useState('');
  const [approvalAdminNotes, setApprovalAdminNotes] = useState('');
  const [approvalSubmitting, setApprovalSubmitting] = useState(false);

  // Quick Tools Tab: 'grant' | 'revoke'
  const [adminToolTab, setAdminToolTab] = useState<'grant' | 'revoke'>('grant');

  // Direct grant modal/form
  const [grantEmail, setGrantEmail] = useState('');
  const [grantCourse, setGrantCourse] = useState('playwright-automation');
  const [grantUpiRef, setGrantUpiRef] = useState('');
  const [grantNotes, setGrantNotes] = useState('');
  const [grantLoading, setGrantLoading] = useState(false);

  // Direct revoke form
  const [revokeEmail, setRevokeEmail] = useState('');
  const [revokeCourse, setRevokeCourse] = useState('all');
  const [revokeLoading, setRevokeLoading] = useState(false);

  // Registered students list for quick reference
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await enrollmentService.getAllRequests();
      setRequests(data);
      const stats = await campaignService.getFounding100Stats();
      setCampaignStats(stats);
      setCampaignConfig(getStoredCampaignConfig());
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
              This portal is restricted to authorized RootAccess platform administrators.
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

  const handleOpenApprovalModal = (req: EnrollmentRequest) => {
    setApprovingRequest(req);
    setApprovalUpiRef(req.upi_reference || '');
    setApprovalAdminNotes(req.student_notes || '');
  };

  const handleConfirmApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!approvingRequest) return;
    setApprovalSubmitting(true);
    setActionMessage(null);

    const res = await enrollmentService.approveRequest(
      approvingRequest.id,
      user?.email || 'admin',
      approvalUpiRef,
      approvalAdminNotes
    );

    if (res.success) {
      setActionMessage({
        type: 'success',
        text: `✅ Approved access to "${approvingRequest.course_title}" for ${approvingRequest.user_name}${approvalUpiRef ? ` [UTR: ${approvalUpiRef}]` : ''}! 30-day course access activated.`,
      });
      setApprovingRequest(null);
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: `Failed to approve: ${res.error}` });
    }
    setApprovalSubmitting(false);
  };

  const handleReject = async (requestId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to reject the enrollment request for ${studentName}?`)) return;
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
      user?.email || 'admin',
      grantUpiRef,
      grantNotes
    );

    if (res.success) {
      setActionMessage({ type: 'success', text: res.message });
      setGrantEmail('');
      setGrantUpiRef('');
      setGrantNotes('');
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
    setGrantLoading(false);
  };

  const handleDirectRevoke = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revokeEmail.trim()) return;
    setRevokeLoading(true);
    setActionMessage(null);

    const res = await enrollmentService.revokeAccessByEmail(revokeEmail, revokeCourse);
    if (res.success) {
      setActionMessage({ type: 'success', text: res.message });
      setRevokeEmail('');
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
    setRevokeLoading(false);
  };

  const handleRevoke = async (studentId: string, studentEmail: string, courseSlug: string) => {
    if (!window.confirm(`Revoke "${courseSlug}" access from ${studentEmail}?`)) return;
    const res = await enrollmentService.revokeAccess(studentId, courseSlug);
    if (res.success) {
      setActionMessage({ type: 'success', text: `Revoked access to ${courseSlug} for ${studentEmail}.` });
      loadRequests();
      loadRegisteredStudents();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
  };

  const handleSaveCampaignConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveStoredCampaignConfig({
      launchPriceInr: Number(editPrice),
      maxSeats: Number(editSeats),
      durationDays: Number(editDuration),
      isActive: Boolean(editIsActive),
    });
    setCampaignConfig(updated);
    setIsConfigModalOpen(false);
    setActionMessage({
      type: 'success',
      text: '✅ Campaign settings updated successfully! Live counter limits and launch pricing refreshed.',
    });
    loadRequests();
  };

  // Filter for Founding 100 students
  const foundingRequests = requests.filter((r) => {
    if (r.course_slug !== 'playwright-automation') return false;
    return r.campaign_tag === 'founding-100' || r.amount_paid === 149 || !r.campaign_tag;
  });

  const nowMs = Date.now();

  const filteredFoundingRequests = foundingRequests.filter((r) => {
    const isApproved = r.status === 'approved';
    const expMs = r.expires_at ? new Date(r.expires_at).getTime() : (r.activated_at ? new Date(r.activated_at).getTime() + 30 * 86400000 : null);
    const isExpired = isApproved && expMs !== null && expMs <= nowMs;
    const isActive = isApproved && !isExpired;

    if (foundingFilter === 'pending' && r.status !== 'pending') return false;
    if (foundingFilter === 'rejected' && r.status !== 'rejected') return false;
    if (foundingFilter === 'active' && !isActive) return false;
    if (foundingFilter === 'expired' && !isExpired) return false;

    if (foundingSearch.trim()) {
      const q = foundingSearch.toLowerCase();
      return (
        r.user_name.toLowerCase().includes(q) ||
        r.user_email.toLowerCase().includes(q) ||
        (r.enrollment_id && r.enrollment_id.toLowerCase().includes(q)) ||
        (r.upi_reference && r.upi_reference.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Standard all requests filter
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
  const foundingPendingCount = foundingRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />
      <AdminNavHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Control Center</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>FOUNDING 100 CAMPAIGN ACTIVE</span>
                </span>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pendingCount} Pending Approvals</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Playwright Founding 100 &amp; Enrollment Management
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
                Review WhatsApp / UPI payment requests (+91 9741243048), verify ₹149 Founding 100 student enrollments, trigger 30-day access timers, and manage campaign limits.
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
                <span>Refresh Data</span>
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

        {/* Admin Portal Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setAdminMainTab('founding100')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminMainTab === 'founding100'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FOUNDING 100 CAMPAIGN</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
              {campaignStats ? `${campaignStats.enrolledCount}/${campaignStats.totalSeats}` : '0/100'}
            </span>
          </button>

          <button
            onClick={() => setAdminMainTab('requests')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminMainTab === 'requests'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Course Requests</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminMainTab('tools')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminMainTab === 'tools'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Direct Grant / Revoke Tools</span>
          </button>
        </div>

        {/* TAB 1: FOUNDING 100 CAMPAIGN */}
        {adminMainTab === 'founding100' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Campaign Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Verified Enrolments */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Verified Enrolments
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      campaignStats?.isSoldOut
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {campaignStats?.isSoldOut ? 'Sold Out' : 'Active Offer'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    {campaignStats ? `${campaignStats.enrolledCount} / ${campaignStats.totalSeats}` : '0 / 100'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Students</span>
                </div>
                <div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        campaignStats?.isSoldOut ? 'bg-rose-500' : 'bg-indigo-600'
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            ((campaignStats?.enrolledCount || 0) /
                              (campaignStats?.totalSeats || 100)) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex justify-between">
                    <span>{campaignStats?.remainingSeats ?? 100} seats available</span>
                    <span>Starts at 0</span>
                  </p>
                </div>
              </div>

              {/* Card 2: Verified Revenue */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Verified Revenue
                  </span>
                  <Coins className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                    ₹{campaignStats ? campaignStats.verifiedRevenueInr.toLocaleString('en-IN') : '0'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">INR</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Calculated from {campaignStats?.enrolledCount || 0} approved payments @ ₹{campaignConfig.launchPriceInr}
                </p>
              </div>

              {/* Card 3: Pending Approvals */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Pending Requests
                  </span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    {foundingPendingCount}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Awaiting review</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {foundingPendingCount > 0 ? 'Requires UTR verification' : 'All requests processed'}
                </p>
              </div>

              {/* Card 4: Access Expiry Tracking */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    30-Day Access Health
                  </span>
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono">
                    {campaignStats?.activeStudentsCount || 0}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Active / {campaignStats?.expiredStudentsCount || 0} Expired</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Automated 30-day expiry enforcement
                </p>
              </div>
            </div>

            {/* Campaign Controls Strip */}
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-purple-950">
                    Founding 100 Settings: ₹{campaignConfig.launchPriceInr} • Max {campaignConfig.maxSeats} Students • {campaignConfig.durationDays} Days Access
                  </h3>
                  <p className="text-xs text-purple-800">
                    Status: <strong>{campaignConfig.isActive ? 'Active Campaign' : 'Paused'}</strong> • Course: Playwright Automation with JavaScript + AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditPrice(campaignConfig.launchPriceInr);
                  setEditSeats(campaignConfig.maxSeats);
                  setEditDuration(campaignConfig.durationDays);
                  setEditIsActive(campaignConfig.isActive);
                  setIsConfigModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Campaign Limits</span>
              </button>
            </div>

            {/* Table of Founding 100 Students */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Founding 100 Enrolments &amp; Access Expiry ({foundingRequests.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live list of learners who requested or were approved for the Founding 100 Launch Offer
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto no-scrollbar">
                  {(['all', 'pending', 'active', 'expired', 'rejected'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFoundingFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${
                        foundingFilter === tab
                          ? 'bg-white text-slate-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'active' ? 'Active Access' : tab === 'expired' ? 'Expired (30d)' : tab}
                      {tab === 'pending' && foundingPendingCount > 0 ? ` (${foundingPendingCount})` : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={foundingSearch}
                  onChange={(e) => setFoundingSearch(e.target.value)}
                  placeholder="Search by student name, email, Enrollment ID (FA-100-...), or UTR..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Table */}
              {loading ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span>Loading Founding 100 records...</span>
                </div>
              ) : filteredFoundingRequests.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                  <p className="font-semibold text-slate-700">No Founding 100 records found</p>
                  <p className="text-slate-400">
                    {foundingFilter === 'pending'
                      ? 'No pending Founding 100 payment requests.'
                      : 'No records matched the selected filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFoundingRequests.map((req) => {
                    const isApproved = req.status === 'approved';
                    const expMs = req.expires_at ? new Date(req.expires_at).getTime() : (req.activated_at ? new Date(req.activated_at).getTime() + 30 * 86400000 : null);
                    const isExpired = isApproved && expMs !== null && expMs <= nowMs;
                    const isActive = isApproved && !isExpired;
                    const daysRemaining = expMs ? Math.max(0, Math.ceil((expMs - nowMs) / (1000 * 60 * 60 * 24))) : 0;

                    return (
                      <div
                        key={req.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          req.status === 'pending'
                            ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                            : isExpired
                            ? 'bg-rose-50/30 border-rose-200'
                            : isActive
                            ? 'bg-white border-emerald-200/90 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-slate-900">{req.user_name}</span>
                            <span className="text-xs text-slate-500 font-mono">({req.user_email})</span>
                            {req.enrollment_id && (
                              <span className="font-mono text-[11px] font-extrabold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-lg border border-purple-200">
                                {req.enrollment_id}
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isActive
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isExpired
                                  ? 'bg-rose-100 text-rose-800'
                                  : req.status === 'rejected'
                                  ? 'bg-slate-200 text-slate-700'
                                  : 'bg-amber-100 text-amber-800 animate-pulse'
                              }`}
                            >
                              {isActive ? `Active (${daysRemaining}d left)` : isExpired ? 'Access Expired' : req.status}
                            </span>
                            <span className="text-xs font-bold text-purple-700">
                              ₹{req.amount_paid || campaignConfig.launchPriceInr}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
                            {req.upi_reference && (
                              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px]">
                                UTR: <strong>{req.upi_reference}</strong>
                              </span>
                            )}
                            {req.activated_at && (
                              <span className="text-slate-500 text-[11px]">
                                Activated: {new Date(req.activated_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                            {req.expires_at && (
                              <span className={`text-[11px] font-medium ${isExpired ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
                                Expires: {new Date(req.expires_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>

                          {req.student_notes && (
                            <p className="text-[11px] text-slate-500 italic bg-white/70 p-2 rounded-lg border border-slate-200/60">
                              &ldquo;{req.student_notes}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {req.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleOpenApprovalModal(req)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Verify &amp; Unlock (30d)</span>
                              </button>
                              <button
                                onClick={() => handleReject(req.id, req.user_name)}
                                className="inline-flex items-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenApprovalModal(req)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                              >
                                <span>Edit UTR / Notes</span>
                              </button>
                              <button
                                onClick={() => handleRevoke(req.user_id, req.user_email, req.course_slug)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                                title="Revoke access"
                              >
                                <UserMinus className="w-3.5 h-3.5" />
                                <span>Revoke</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ALL COURSE REQUESTS */}
        {adminMainTab === 'requests' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Course Enrollment Requests ({requests.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Comprehensive log of all course enrollment requests across RootAccess
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

              {/* Requests Table */}
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
                          {req.enrollment_id && (
                            <span className="font-mono text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              {req.enrollment_id}
                            </span>
                          )}
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
                              onClick={() => handleOpenApprovalModal(req)}
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
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Course Active</span>
                            </span>
                            <button
                              onClick={() => handleRevoke(req.user_id, req.user_email, req.course_slug)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                              title="Revoke access"
                            >
                              <UserMinus className="w-3.5 h-3.5" />
                              <span>Revoke</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenApprovalModal(req)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-200 hover:bg-emerald-600 hover:text-white text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                          >
                            <span>Re-approve (Enter UTR)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIRECT TOOLS & DIRECTORY */}
        {adminMainTab === 'tools' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Direct Access Management Tool */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              {/* Tab Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAdminToolTab('grant')}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    adminToolTab === 'grant'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Grant Access</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAdminToolTab('revoke')}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    adminToolTab === 'revoke'
                      ? 'bg-white text-rose-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserMinus className="w-3.5 h-3.5 text-rose-600" />
                  <span>Revoke Access</span>
                </button>
              </div>

              {adminToolTab === 'grant' ? (
                /* Form: Direct Grant */
                <form onSubmit={handleDirectGrant} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Registered Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={grantEmail}
                      onChange={(e) => setGrantEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Course to Unlock *
                    </label>
                    <select
                      value={grantCourse}
                      onChange={(e) => setGrantCourse(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {COURSES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      UTR / Transaction Reference (Optional)
                    </label>
                    <input
                      type="text"
                      value={grantUpiRef}
                      onChange={(e) => setGrantUpiRef(e.target.value)}
                      placeholder="e.g. 412345678901"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Notes
                    </label>
                    <input
                      type="text"
                      value={grantNotes}
                      onChange={(e) => setGrantNotes(e.target.value)}
                      placeholder="e.g. Verified via WhatsApp screenshot"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={grantLoading}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {grantLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                    <span>Directly Unlock Course</span>
                  </button>
                </form>
              ) : (
                /* Form: Direct Revoke */
                <form onSubmit={handleDirectRevoke} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Registered Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={revokeEmail}
                      onChange={(e) => setRevokeEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Course to Revoke *
                    </label>
                    <select
                      value={revokeCourse}
                      onChange={(e) => setRevokeCourse(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="all">ALL Courses (Complete Lock)</option>
                      {COURSES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={revokeLoading}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {revokeLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserMinus className="w-4 h-4" />
                    )}
                    <span>Lock Course Access</span>
                  </button>
                </form>
              )}
            </div>

            {/* Registered Students Directory */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Registered Students Directory ({registeredStudents.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Accounts in Supabase public.profiles with enrolled courses
                  </p>
                </div>
                <Users className="w-4 h-4 text-slate-400" />
              </div>

              {loadingStudents ? (
                <div className="py-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>Loading profiles...</span>
                </div>
              ) : registeredStudents.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No profiles found in Supabase.</p>
              ) : (
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {registeredStudents.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <strong className="text-slate-900">{st.full_name || 'Anonymous'}</strong>
                          <span className="text-slate-500 font-mono text-[11px]">({st.email})</span>
                          {st.role === 'admin' && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          Enrolled:{' '}
                          {st.enrolled_courses && st.enrolled_courses.length > 0 ? (
                            <span className="font-semibold text-indigo-700">
                              {st.enrolled_courses.join(', ')}
                            </span>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Approval Confirmation & UTR Entry Modal */}
      {approvingRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-xl border border-slate-200 animate-fadeIn relative">
            <button
              onClick={() => setApprovingRequest(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approval Confirmation</span>
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Unlock Course &amp; Record UTR
              </h2>
              <p className="text-xs text-slate-500">
                Verify payment details and enter the transaction UTR number before unlocking the course for this student.
              </p>
            </div>

            {/* Student & Course Summary Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-slate-900">{approvingRequest.user_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-mono text-slate-700">{approvingRequest.user_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course:</span>
                <span className="font-semibold text-indigo-700">{approvingRequest.course_title}</span>
              </div>
              {approvingRequest.course_slug === 'playwright-automation' && (
                <>
                  <div className="flex justify-between text-purple-900 font-medium">
                    <span>Campaign &amp; Duration:</span>
                    <span className="font-bold">Founding 100 • 30 Days Full Access</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Introductory Price:</span>
                    <strong className="text-emerald-700">₹{approvingRequest.amount_paid || campaignConfig.launchPriceInr}</strong>
                  </div>
                  {approvingRequest.enrollment_id && (
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500">Enrollment ID:</span>
                      <strong className="text-purple-800">{approvingRequest.enrollment_id}</strong>
                    </div>
                  )}
                </>
              )}
              {approvingRequest.student_notes && (
                <div className="pt-1 border-t border-slate-200/60 text-slate-600 italic">
                  &ldquo;{approvingRequest.student_notes}&rdquo;
                </div>
              )}
            </div>

            {/* Warning if Founding 100 seats are full */}
            {approvingRequest.course_slug === 'playwright-automation' &&
              campaignStats &&
              campaignStats.enrolledCount >= campaignStats.totalSeats && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Founding 100 Limit Reached ({campaignStats.totalSeats}/{campaignStats.totalSeats})</strong>
                    <span>All seats for this campaign have been claimed. You cannot approve further students at the ₹149 Founding rate.</span>
                  </div>
                </div>
              )}

            <form onSubmit={handleConfirmApproval} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>UPI / UTR Transaction ID *</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">12-Digit Reference</span>
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={approvalUpiRef}
                    onChange={(e) => setApprovalUpiRef(e.target.value)}
                    placeholder="e.g. 423456789012"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Enter the 12-digit UTR from your PhonePe, Google Pay, Paytm, or WhatsApp screenshot.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Admin Verification Notes
                </label>
                <input
                  type="text"
                  value={approvalAdminNotes}
                  onChange={(e) => setApprovalAdminNotes(e.target.value)}
                  placeholder="e.g. Verified payment on WhatsApp (+91 9741243048)"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApprovingRequest(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    approvalSubmitting ||
                    (approvingRequest.course_slug === 'playwright-automation' &&
                      campaignStats !== null &&
                      campaignStats.enrolledCount >= campaignStats.totalSeats)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {approvalSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Confirm Payment &amp; Unlock Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign Settings Editor Modal */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-xl border border-slate-200 animate-fadeIn relative">
            <button
              onClick={() => setIsConfigModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                <Settings className="w-3.5 h-3.5" />
                <span>Campaign Settings</span>
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Founding 100 Parameters
              </h2>
              <p className="text-xs text-slate-500">
                Update introductory pricing, seat cap, access duration, and campaign status.
              </p>
            </div>

            <form onSubmit={handleSaveCampaignConfig} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Launch Offer Price (INR)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Maximum Founding Students (Seats)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={editSeats}
                  onChange={(e) => setEditSeats(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Access Duration (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={editDuration}
                  onChange={(e) => setEditDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Campaign Active Status</span>
                  <span className="text-slate-500 text-[11px]">Allow students to enroll at launch price</span>
                </div>
                <input
                  type="checkbox"
                  checked={editIsActive}
                  onChange={(e) => setEditIsActive(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
