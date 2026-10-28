import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  Lock,
  Send,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useManualQa } from '../../context/ManualQaContext';
import { useProgress } from '../../context/ProgressContext';

export const FinalProjectPage: React.FC = () => {
  const { state, submitAssignment } = useManualQa();
  const { isCourseEnrolled, enrollInCourse } = useProgress();
  const isEnrolled = isCourseEnrolled('manual-qa-fundamentals');

  // Check prerequisite recommendation
  const isPrerequisiteMet =
    state.days[1]?.status === 'completed' &&
    state.days[2]?.status === 'completed' &&
    state.days[3]?.status === 'completed' &&
    state.days[4]?.status === 'completed';

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Course Enrollment Required</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Capstone Final Project requires enrollment in the Manual QA course. Day 1 is completely free to start!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => enrollInCourse('manual-qa-fundamentals')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors text-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/manual-qa-fundamentals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-xs"
              >
                <span>View Curriculum</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Seeded starter test cases for high quality learner experience
  const [testCases, setTestCases] = useState<
    Array<{
      id: string;
      module: string;
      title: string;
      type: 'positive' | 'negative';
      testData: string;
      expected: string;
    }>
  >([
    { id: 'TC_CHK_01', module: 'Cart', title: 'Verify standard checkout with valid in-stock items', type: 'positive', testData: '2 items in cart', expected: 'Proceeds to shipping address screen' },
    { id: 'TC_CHK_02', module: 'Cart', title: 'Verify checkout blocked when cart subtotal is zero', type: 'negative', testData: '0 items', expected: 'Displays "Cart is empty" banner' },
    { id: 'TC_CHK_03', module: 'Cart', title: 'Verify out-of-stock item flags alert and prevents checkout', type: 'negative', testData: 'Item qty > stock', expected: 'Inline warning "Reduce quantity to proceed"' },
    { id: 'TC_CHK_04', module: 'Address', title: 'Verify valid US domestic shipping address submission', type: 'positive', testData: 'Valid street, city, zip 94103', expected: 'Address validated and saves to order' },
    { id: 'TC_CHK_05', module: 'Address', title: 'Verify invalid postal code format rejection', type: 'negative', testData: 'ZIP "941"', expected: 'Validation error: "Enter valid 5-digit ZIP"' },
    { id: 'TC_CHK_06', module: 'Promo', title: 'Verify valid active 15% discount coupon applies properly', type: 'positive', testData: 'Code "SAVE15"', expected: 'Subtotal reduced by exactly 15%' },
    { id: 'TC_CHK_07', module: 'Promo', title: 'Verify expired coupon code rejection', type: 'negative', testData: 'Code "SUMMER2020"', expected: 'Error: "Coupon has expired"' },
    { id: 'TC_CHK_08', module: 'Promo', title: 'Verify coupon with minimum spend condition below threshold', type: 'negative', testData: '$40 cart with $50 min code', expected: 'Error: "Add $10 more to use coupon"' },
    { id: 'TC_CHK_09', module: 'Payment', title: 'Verify successful credit card payment with 3DS OTP auth', type: 'positive', testData: 'Valid Visa, valid OTP', expected: 'Payment authorized, order ID created' },
    { id: 'TC_CHK_10', module: 'Payment', title: 'Verify payment rejection for expired card date', type: 'negative', testData: 'MM/YY past date', expected: 'Error: "Card has expired"' },
    { id: 'TC_CHK_11', module: 'Payment', title: 'Verify incorrect CVV security code validation', type: 'negative', testData: 'CVV "00"', expected: 'Error: "Invalid CVV code"' },
    { id: 'TC_CHK_12', module: 'Payment', title: 'Verify insufficient bank balance card rejection', type: 'negative', testData: 'Decline code 51', expected: 'Error: "Card declined due to insufficient funds"' },
    { id: 'TC_CHK_13', module: 'Confirmation', title: 'Verify order confirmation screen displays order ID and receipt', type: 'positive', testData: 'Authorized transaction', expected: 'Displays order #, summary, and email confirmation note' },
    { id: 'TC_CHK_14', module: 'Confirmation', title: 'Verify stock inventory decrements upon order completion', type: 'positive', testData: 'DB audit', expected: 'Inventory count reduces by order quantity' },
    { id: 'TC_CHK_15', module: 'Confirmation', title: 'Verify confirmation email received with line items', type: 'positive', testData: 'Transactional email audit', expected: 'Receipt sent to registered email' },
  ]);

  // Bug reports state
  const [bugReports, setBugReports] = useState<
    Array<{
      title: string;
      severity: string;
      priority: string;
      steps: string;
      actual: string;
      expected: string;
    }>
  >([
    {
      title: '[Cart] Negative quantity bypass allows negative subtotal order generation',
      severity: 'Critical',
      priority: 'P1',
      steps: '1. Add any item to cart\n2. Open dev tools / manual input and set qty to -3\n3. Click Proceed to Checkout',
      actual: 'System calculates -$150.00 subtotal and completes checkout as customer credit balance.',
      expected: 'Server and client must validate qty >= 1 and reject negative numbers with HTTP 400.',
    },
    {
      title: '[Payment] Expired credit card submission displays uncaught 500 error screen',
      severity: 'Major',
      priority: 'P2',
      steps: '1. Proceed to payment page\n2. Enter credit card with expiration date 01/22\n3. Click Complete Payment',
      actual: 'Page crashes to blank white screen with raw JSON 500 internal server error.',
      expected: 'Gateway response caught gracefully; user shown inline message "Card expired. Please use a valid card."',
    },
  ]);

  // Executive summary report
  const [summaryReport, setSummaryReport] = useState(
    'ROOTACCESS QA TEST SUMMARY REPORT\n' +
      'Project: E-Commerce Checkout & Payment Gateway\n' +
      'Sprint: Release Candidate 1.0\n' +
      'Total Planned Test Cases: 15 | Executed: 15 | Passed: 13 | Failed: 2\n' +
      'Defects Logged: 1 Critical (Cart negative quantity), 1 Major (Expired card 500 crash)\n' +
      'Test Environment: Staging Web (Chrome 122, Safari 17.2, Mobile Responsive)\n' +
      'Recommendation: CONDITIONAL SIGN-OFF. Hotfix required for P1 Cart defect before public launch.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: `TC_CHK_${(testCases.length + 1).toString().padStart(2, '0')}`,
        module: 'Payment',
        title: '',
        type: 'negative',
        testData: '',
        expected: '',
      },
    ]);
  };

  const handleAddBugReport = () => {
    setBugReports([
      ...bugReports,
      {
        title: '',
        severity: 'Major',
        priority: 'P2',
        steps: '',
        actual: '',
        expected: '',
      },
    ]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        testCases,
        bugReports,
        summaryReport,
      };
      const res = await submitAssignment(5, payload);
      setResult(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(err?.message || 'Error submitting final project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/manual-qa" className="hover:text-indigo-600 transition-colors">
              Manual QA Roadmap
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">Final Portfolio Project</span>
          </nav>

          {/* Advisory Prerequisite Banner */}
          {!isPrerequisiteMet && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Advisory:</strong> All course projects are unlocked for open and flexible learning. For optimal hands-on preparation, we recommend completing Days 1 to 4 and Surprise Test 1 before authoring your Capstone Project.
                </span>
              </div>
              <Link
                to="/manual-qa"
                className="font-bold underline text-amber-800 hover:text-amber-950 shrink-0 cursor-pointer"
              >
                View Roadmap →
              </Link>
            </div>
          )}

          {/* Hero Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Day 5 Capstone Deliverable
              </span>
              <span className="text-xs text-slate-500">Industry Portfolio Piece</span>
              {state.finalProjectPassed && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Passed Rubric</span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
                <FileCode2 className="w-7 h-7 text-indigo-600 shrink-0" />
                <span>Final Portfolio Project: E-Commerce Checkout Test Suite</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Construct a professional, portfolio-ready Manual QA deliverable covering an end-to-end e-commerce checkout flow. You will write ≥15 structured test cases, report ≥2 workplace bug tickets, and author an executive Test Summary Report.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-slate-500">Milestone 1</div>
                <div className="font-bold text-slate-900 mt-0.5">≥15 Structured Test Cases</div>
                <div className="text-[11px] text-slate-500 mt-1">Current: {testCases.length} Test Cases</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-slate-500">Milestone 2</div>
                <div className="font-bold text-slate-900 mt-0.5">≥2 High-Severity Bug Tickets</div>
                <div className="text-[11px] text-slate-500 mt-1">Current: {bugReports.length} Bugs Logged</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-slate-500">Milestone 3</div>
                <div className="font-bold text-slate-900 mt-0.5">Executive Summary Report</div>
                <div className="text-[11px] text-slate-500 mt-1">Ready for Stakeholder Sign-Off</div>
              </div>
            </div>
          </div>

          {/* Submission Result Feedback */}
          {result && (
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-4 shadow-xs ${
                result.passed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {result.passed ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {result.passed ? 'Final Project Approved!' : 'Revisions Required'}
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-700 mt-0.5">
                      {result.passed
                        ? 'Your test documentation meets senior QA quality guidelines.'
                        : 'Some requirements did not meet deterministic rubric thresholds.'}
                    </div>
                  </div>
                </div>

                {result.passed && (
                  <Link
                    to="/manual-qa/final-assessment"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
                  >
                    <span>Proceed to Final Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              {result.feedback && (
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-mono">
                  {result.feedback}
                </div>
              )}
            </div>
          )}

          {/* Section 1: Test Cases */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  1. Test Case Suite (Target: ≥ 15 Test Cases)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cover Cart, Shipping Address, Coupon Discounts, Payment, and Confirmation modules.
                </p>
              </div>
              <button
                onClick={handleAddTestCase}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Test Case</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Module</th>
                    <th className="p-3">Test Scenario / Title</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Test Data</th>
                    <th className="p-3">Expected Result</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {testCases.map((tc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-bold text-indigo-600">{tc.id}</td>
                      <td className="p-3 font-semibold text-slate-700">{tc.module}</td>
                      <td className="p-3 font-medium max-w-xs">{tc.title}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            tc.type === 'positive'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {tc.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-mono text-[11px]">{tc.testData}</td>
                      <td className="p-3 text-slate-600">{tc.expected}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setTestCases(testCases.filter((_, i) => i !== idx))}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Defect Reports */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  2. Jira-Standard Bug Tickets (Target: ≥ 2 Defect Reports)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed repro steps, actual vs expected outputs, and severity classifications.
                </p>
              </div>
              <button
                onClick={handleAddBugReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Defect Ticket</span>
              </button>
            </div>

            <div className="space-y-4">
              {bugReports.map((b, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">Bug #{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {b.severity}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {b.priority}
                      </span>
                    </div>
                    <button
                      onClick={() => setBugReports(bugReports.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Title:</label>
                      <input
                        type="text"
                        value={b.title}
                        onChange={(e) => {
                          const updated = [...bugReports];
                          updated[idx].title = e.target.value;
                          setBugReports(updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Steps to Reproduce:</label>
                      <textarea
                        rows={2}
                        value={b.steps}
                        onChange={(e) => {
                          const updated = [...bugReports];
                          updated[idx].steps = e.target.value;
                          setBugReports(updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Actual Result:</label>
                        <input
                          type="text"
                          value={b.actual}
                          onChange={(e) => {
                            const updated = [...bugReports];
                            updated[idx].actual = e.target.value;
                            setBugReports(updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Expected Result:</label>
                        <input
                          type="text"
                          value={b.expected}
                          onChange={(e) => {
                            const updated = [...bugReports];
                            updated[idx].expected = e.target.value;
                            setBugReports(updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Test Summary Report */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                3. Executive Test Summary Report
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Stakeholder executive sign-off, pass/fail metrics, environment configurations, and recommendations.
              </p>
            </div>
            <textarea
              rows={7}
              value={summaryReport}
              onChange={(e) => setSummaryReport(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit Action */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="text-xs text-slate-600 font-medium">
              Portfolio Deliverables: <strong className="text-slate-900">{testCases.length} Test Cases</strong>,{' '}
              <strong className="text-slate-900">{bugReports.length} Bug Tickets</strong>, Executive Report Ready
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-xs text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Evaluating Project Deliverables...' : 'Submit Final Portfolio Project'}</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
