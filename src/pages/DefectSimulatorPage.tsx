import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { SIMULATED_BUGS } from '../data/curriculumData';
import type { BugReportSubmission } from '../types/curriculum';
import {
  ArrowLeft,
  Bug,
  CheckCircle2,
  Lightbulb,
  Send,
  ShoppingBag,
  CreditCard,
  Tag,
  ShieldAlert,
  Award,
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export const DefectSimulatorPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { reportedBugs, submitBugReport, isCourseEnrolled, enrollInCourse } = useProgress();

  const isEnrolledInQA =
    isCourseEnrolled('manual-qa-fundamentals') ||
    isCourseEnrolled('playwright-automation') ||
    isCourseEnrolled('qa-interview-mastery');

  const defaultCustomerName = profile?.full_name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'QA Student');

  // Mock checkout app state (Target Under Test)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'item-1', name: 'Logitech MX Master 3S Mouse', unitPrice: 99.0, quantity: 1 },
    { id: 'item-2', name: 'Mechanical Switch Keycaps Set', unitPrice: 35.0, quantity: 1 },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState(defaultCustomerName);

  useEffect(() => {
    if (defaultCustomerName && customerName === 'QA Student') {
      setCustomerName(defaultCustomerName);
    }
  }, [defaultCustomerName]);
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [phone, setPhone] = useState(''); // empty triggers silent bug
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  // QA Bug Logger Form state
  const [selectedBugId, setSelectedBugId] = useState<string>(SIMULATED_BUGS[0].id);
  const [severity, setSeverity] = useState<'Blocker' | 'Critical' | 'Major' | 'Minor'>('Critical');
  const [bugTitle, setBugTitle] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [actualBehavior, setActualBehavior] = useState('');
  const [showHintForBug, setShowHintForBug] = useState<string | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Calculate live Cart math with bugs intentionally present!
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  // BUG 2: total is allowed to go negative if coupon > subtotal!
  const total = subtotal - appliedDiscount;

  // Handle Cart quantity change
  const handleQuantityChange = (itemId: string, newQty: number) => {
    // Intentionally no Math.max(1, newQty) check! BUG 1: allows 0 or negative
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Handle Coupon code
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SAVE50') {
      // Intentionally applies $50 without checking if subtotal < 50! BUG 2
      setAppliedDiscount(50.0);
      setCouponFeedback('Coupon SAVE50 applied! -$50.00 discount granted.');
    } else {
      setCouponFeedback('Invalid coupon code. Try "SAVE50".');
    }
  };

  // Handle Place Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // BUG 3: Silent Phone Validation Failure (Does not highlight phone field or show error message)
    if (!phone.trim()) {
      // Silently returns without doing anything!
      return;
    }

    setOrderPlacedSuccess(true);
    setTimeout(() => {
      setOrderPlacedSuccess(false);
    }, 4000);
  };

  // Handle Jira Bug Submission
  const handleSubmitBugReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugTitle.trim() || !stepsToReproduce.trim() || !expectedBehavior.trim()) {
      alert('Please fill out all bug report fields (Title, Steps, Expected Result).');
      return;
    }

    const submission: BugReportSubmission = {
      scenarioId: 'checkout-bug-hunt',
      bugId: selectedBugId,
      title: bugTitle.trim(),
      severity,
      stepsToReproduce: stepsToReproduce.trim(),
      expectedBehavior: expectedBehavior.trim(),
      actualBehavior: actualBehavior.trim() || 'Observed system calculation failure.',
      submittedAt: new Date().toISOString(),
    };

    const review = submitBugReport(submission);
    setSubmissionFeedback({
      success: review.success,
      message: review.feedback,
    });

    // Reset inputs for next report
    setBugTitle('');
    setStepsToReproduce('');
    setExpectedBehavior('');
    setActualBehavior('');
  };

  const bugsFoundCount = Object.keys(reportedBugs).length;
  const allBugsFound = bugsFoundCount >= SIMULATED_BUGS.length;

  if (!isEnrolledInQA) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Bug className="w-4 h-4 text-rose-500" />
              <span>QA Staging Environment</span>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100 shadow-2xs">
              <Bug className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>QA Course Enrollment Required</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Workplace Defect Simulation Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Defect Simulation Lab is an interactive staging workbench available exclusively to students enrolled in our QA engineering tracks (Manual QA or Playwright Automation).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900">Available inside these QA tracks:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Manual QA in 5 Days: Industry-Based Interview Preparation</li>
                <li>Playwright Automation with JavaScript + AI</li>
                <li>QA Technical Interview Prep &amp; Defect Portfolio</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  enrollInCourse('manual-qa-fundamentals');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <span>Enroll in Manual QA Track</span>
              </button>
              <Link
                to="/app?tab=catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <span>Explore All Courses</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Bug className="w-4 h-4 text-rose-600" />
              <span>Workplace Defect Simulation Lab</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold">
              <span className="text-slate-500">Bugs Found:</span>
              <span className="text-indigo-600">
                {bugsFoundCount} / {SIMULATED_BUGS.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dual Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Cols 1-7): Target Under Test (The Shopping Cart & Checkout) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target App Frame Header */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                http://staging.rootshop.local/checkout
              </span>
            </div>
            <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
              Target Under Test (v2.4-RC)
            </span>
          </div>

          {/* Interactive Mock Checkout App */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">RootShop Checkout</h2>
              </div>
              <span className="text-xs text-slate-500">2 Items in Cart</span>
            </div>

            {/* 1. Line Items List (Bug 1: Negative Quantity) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Order Items Review
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">
                        ${item.unitPrice.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label
                        htmlFor={`qty-${item.id}`}
                        className="text-xs font-medium text-slate-600"
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                        }
                        className="w-16 px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white text-center font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <span className="text-xs font-bold text-slate-900 w-20 text-right">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Promo Coupon Code (Bug 2: Coupon Overflow) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Discount Code
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon (e.g. SAVE50)"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Apply Code
                </button>
              </form>
              {couponFeedback && (
                <p
                  className={`text-xs font-medium ${
                    appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {couponFeedback}
                </p>
              )}
            </div>

            {/* 3. Shipping Form (Bug 3: Silent Phone Validation) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Shipping & Delivery Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Phone Number (Required)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 555-0199"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Delivery Instructions (Notes)
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Special instructions for courier..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bug 4: Reflective Preview without sanitization */}
              {deliveryNotes && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">
                    Courier Note Live Preview:
                  </span>
                  <div
                    className="text-amber-800 font-mono text-[11px]"
                    dangerouslySetInnerHTML={{ __html: deliveryNotes }}
                  />
                </div>
              )}
            </div>

            {/* 4. Live Order Calculation Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount (SAVE50):</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (8%):</span>
                <span>$0.00</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Final Order Total:</span>
                <span
                  className={
                    total < 0
                      ? 'text-rose-600 font-mono font-extrabold text-base bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200'
                      : ''
                  }
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Complete Order (${total.toFixed(2)})</span>
              </button>

              {orderPlacedSuccess && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center font-bold">
                  Order Successfully Submitted to Backend!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Cols 8-12): QA Defect Hunting Mission & Jira Logger */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mission Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">QA Lead Mission Brief</h3>
              </div>
              {allBugsFound && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Award className="w-3.5 h-3.5" />
                  <span>Mission Accomplished</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Product just deployed this checkout build. Your mission is to find <strong>4 real defects</strong>, determine their correct severity, and log them into Jira.
            </p>

            {/* Target Defects Checklist */}
            <div className="space-y-2 pt-1">
              {SIMULATED_BUGS.map((bug, idx) => {
                const isFound = Boolean(reportedBugs[bug.id]);
                const showHint = showHintForBug === bug.id;

                return (
                  <div
                    key={bug.id}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isFound
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        {isFound ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0 mt-0.5 text-slate-400">
                            {idx + 1}
                          </span>
                        )}
                        <div>
                          <span className="font-bold block">{bug.name}</span>
                          <span className="text-[10px] opacity-75">Area: {bug.targetArea}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowHintForBug(showHint ? null : bug.id)}
                        className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
                      >
                        <Lightbulb className="w-3 h-3" />
                        <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                      </button>
                    </div>

                    {showHint && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-lg">
                        <strong>QA Hint:</strong> {bug.hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Jira Bug Report Submission Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Bug className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Log Defect Ticket (Jira Template)
              </h3>
            </div>

            {submissionFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  submissionFeedback.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {submissionFeedback.message}
              </div>
            )}

            <form onSubmit={handleSubmitBugReport} className="space-y-3.5 text-xs">
              {/* Target Defect */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Discovered Defect
                </label>
                <select
                  value={selectedBugId}
                  onChange={(e) => setSelectedBugId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                >
                  {SIMULATED_BUGS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.targetArea})
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Defect Severity Level
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Blocker', 'Critical', 'Major', 'Minor'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-all ${
                        severity === sev
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bug Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Bug Summary / Title
                </label>
                <input
                  type="text"
                  value={bugTitle}
                  onChange={(e) => setBugTitle(e.target.value)}
                  placeholder="e.g. [Checkout] Negative quantity in cart decreases total"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Steps to Reproduce */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Steps to Reproduce (Numbered)
                </label>
                <textarea
                  rows={2}
                  value={stepsToReproduce}
                  onChange={(e) => setStepsToReproduce(e.target.value)}
                  placeholder="1. Navigate to checkout&#10;2. Change quantity to -1&#10;3. Observe final balance"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {/* Expected vs Actual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Expected Result
                  </label>
                  <textarea
                    rows={2}
                    value={expectedBehavior}
                    onChange={(e) => setExpectedBehavior(e.target.value)}
                    placeholder="Input should enforce min=1 and prevent negative numbers"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Actual Result
                  </label>
                  <textarea
                    rows={2}
                    value={actualBehavior}
                    onChange={(e) => setActualBehavior(e.target.value)}
                    placeholder="Total price becomes negative"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-[11px]"
                  />
                </div>
              </div>

              {/* Submit to QA Lead Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket for QA Review</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
