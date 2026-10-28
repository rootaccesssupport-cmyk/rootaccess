import React, { useState, useRef, useEffect, useId } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  RotateCcw,
  Target,
  HelpCircle,
  ShieldCheck,
  Check,
  Terminal,
  Globe,
  KeyRound,
  Clock,
  Lock,
  RefreshCw,
  UserCheck,
} from 'lucide-react';

export type AutomationLabMode =
  | 'locators'
  | 'script-runner'
  | 'network-mocking'
  | 'storage-state'
  | 'auto-waiting';

export interface PlaywrightRealLifeLocatorLabProps {
  initialMode?: AutomationLabMode;
  dayNumber?: number;
}

export interface LocatorExerciseMission {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  task: string;
  hint: string;
  targetElementDescription: string;
  expectedSelectorExample: string;
  validateMatch: (matchedElements: HTMLElement[], locatorText: string) => boolean;
}

export const REAL_LIFE_LOCATOR_MISSIONS: LocatorExerciseMission[] = [
  {
    id: 'mission-1',
    title: 'Mission 1: Accessible Primary Button',
    level: 'Beginner',
    scenario: 'A user wants to submit their profile on the checkout screen.',
    task: "Target the 'Save Profile' primary button using Playwright's accessible role locator (page.getByRole). Avoid brittle CSS classes.",
    hint: "Use page.getByRole('button', { name: 'Save Profile' }) or case-insensitive regex { name: /save profile/i }.",
    targetElementDescription: "<button type='submit'>Save Profile</button>",
    expectedSelectorExample: "page.getByRole('button', { name: 'Save Profile' })",
    validateMatch: (matches) => {
      if (matches.length !== 1) return false;
      const el = matches[0];
      return el.tagName.toLowerCase() === 'button' && /save profile/i.test(el.textContent || '');
    },
  },
  {
    id: 'mission-2',
    title: 'Mission 2: Form Input via Accessible Label',
    level: 'Beginner',
    scenario: 'Form inputs frequently change IDs and classes during frontend redesigns.',
    task: "Target the 'Email Address' input field using page.getByLabel. Playwright automatically connects the <label> text to the form control.",
    hint: "Use page.getByLabel('Email Address') or page.getByLabel(/email address/i).",
    targetElementDescription: "<input id='student-email' type='email' />",
    expectedSelectorExample: "page.getByLabel('Email Address')",
    validateMatch: (matches) => {
      if (matches.length !== 1) return false;
      const el = matches[0];
      return el.tagName.toLowerCase() === 'input' && (el.getAttribute('type') === 'email' || el.id === 'student-email');
    },
  },
  {
    id: 'mission-3',
    title: 'Mission 3: Strict Mode Disambiguation',
    level: 'Intermediate',
    scenario: "The catalog renders 3 distinct 'Add to Cart' buttons. If you simply write page.getByRole('button', { name: 'Add to Cart' }), Playwright will throw a Strict Mode Violation error!",
    task: "Target ONLY the 'Add to Cart' button for the 'DevOps Docker Mastery' product card without triggering strict mode (exactly 1 element must match).",
    hint: "Combine scoping: page.locator('.product-card').filter({ hasText: 'DevOps' }).getByRole('button') or use .nth(1).",
    targetElementDescription: "The 'Add to Cart' button inside the DevOps Docker Mastery product card",
    expectedSelectorExample: "page.locator('.product-card').filter({ hasText: 'DevOps' }).getByRole('button')",
    validateMatch: (matches, text) => {
      if (matches.length !== 1) return false;
      const el = matches[0];
      const card = el.closest('.product-card');
      return (
        el.tagName.toLowerCase() === 'button' &&
        /add to cart/i.test(el.textContent || '') &&
        Boolean(card && /devops/i.test(card.textContent || '')) &&
        (text.includes('DevOps') || text.includes('nth(1)') || text.includes('filter'))
      );
    },
  },
  {
    id: 'mission-4',
    title: 'Mission 4: Test ID & Badge Telemetry',
    level: 'Intermediate',
    scenario: 'Dynamic badges with rapid text changes (like cart quantity counters) are best targeted via dedicated test attributes.',
    task: "Target the shopping cart quantity counter badge using page.getByTestId('cart-badge').",
    hint: "Write page.getByTestId('cart-badge'). Playwright automatically searches data-testid='cart-badge'.",
    targetElementDescription: "<span data-testid='cart-badge'>3</span>",
    expectedSelectorExample: "page.getByTestId('cart-badge')",
    validateMatch: (matches) => {
      if (matches.length !== 1) return false;
      const el = matches[0];
      return el.getAttribute('data-testid') === 'cart-badge';
    },
  },
  {
    id: 'mission-5',
    title: 'Mission 5: Checkbox Accessible Role & State',
    level: 'Advanced',
    scenario: 'Checkboxes and toggles require accessible role verification.',
    task: "Target the 'I accept terms and conditions' checkbox using page.getByRole('checkbox', { name: ... }).",
    hint: "Use page.getByRole('checkbox', { name: 'I accept terms and conditions' }) or /terms and conditions/i.",
    targetElementDescription: "<input type='checkbox' id='terms-agree' />",
    expectedSelectorExample: "page.getByRole('checkbox', { name: /terms and conditions/i })",
    validateMatch: (matches) => {
      if (matches.length !== 1) return false;
      const el = matches[0];
      return el.tagName.toLowerCase() === 'input' && el.getAttribute('type') === 'checkbox' && el.id === 'terms-agree';
    },
  },
];

export const PlaywrightRealLifeLocatorLab: React.FC<PlaywrightRealLifeLocatorLabProps> = ({
  initialMode,
  dayNumber,
}) => {
  // Determine default mode based on props or dayNumber
  const determineInitialMode = (): AutomationLabMode => {
    if (initialMode) return initialMode;
    if (dayNumber === 4) return 'locators';
    if (dayNumber === 5 || dayNumber === 8 || dayNumber === 17) return 'auto-waiting';
    if (dayNumber === 11) return 'storage-state';
    if (dayNumber === 13) return 'network-mocking';
    if (dayNumber && dayNumber >= 9) return 'script-runner';
    return 'locators';
  };

  const [activeTabMode, setActiveTabMode] = useState<AutomationLabMode>(determineInitialMode());

  // 1. Locators Mode State
  const [activeMissionIndex, setActiveMissionIndex] = useState<number>(0);
  const [locatorInput, setLocatorInput] = useState<string>("page.getByRole('button', { name: 'Save Profile' })");
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [evalStatus, setEvalStatus] = useState<'idle' | 'success' | 'strict-violation' | 'no-match' | 'error'>('idle');
  const [evalFeedback, setEvalFeedback] = useState<string>('');
  const [matchedElementsInfo, setMatchedElementsInfo] = useState<Array<{ tag: string; role?: string; text: string }>>([]);
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<boolean>(false);

  // 2. Shared Simulated Application States
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@apexcorp.io',
    title: 'Senior QA Engineer',
    tier: 'Pro Automation Engineer',
    newsletter: true,
    terms: true,
  });
  const [cartCount, setCartCount] = useState<number>(3);
  const [statusAlertVisible, setStatusAlertVisible] = useState<boolean>(false);

  // 3. Script Runner State
  const [selectedScriptPreset, setSelectedScriptPreset] = useState<'profile' | 'cart' | 'search'>('profile');
  const [isScriptRunning, setIsScriptRunning] = useState<boolean>(false);
  const [scriptStepIndex, setScriptStepIndex] = useState<number>(-1);
  const [scriptLogs, setScriptLogs] = useState<Array<{ text: string; duration: number; type: 'pass' | 'info' | 'fail' }>>([]);

  // 4. Network Route Mocking State
  const [activeRouteMock, setActiveRouteMock] = useState<'none' | '500-error' | '50-promo' | 'slow-2s'>('none');
  const [promoInput, setPromoInput] = useState<string>('AUTOMATE50');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [networkLog, setNetworkLog] = useState<Array<{ method: string; url: string; status: number; duration: number; source: string }>>([]);
  const [isNetworkPending, setIsNetworkPending] = useState<boolean>(false);

  // 5. StorageState & Session Auth State
  const [sessionRole, setSessionRole] = useState<'guest' | 'student' | 'admin'>('student');

  // 6. Auto-Waiting & Flaky Test State
  const [asyncButtonState, setAsyncButtonState] = useState<'idle' | 'calculating' | 'ready'>('idle');
  const [autoWaitLog, setAutoWaitLog] = useState<Array<{ strategy: string; time: number; status: 'passed' | 'failed' | 'warning'; message: string }>>([]);

  const sandboxRef = useRef<HTMLDivElement>(null);
  const highlightedElsRef = useRef<HTMLElement[]>([]);
  const fullNameId = useId();
  const jobTitleId = useId();
  const tierId = useId();

  const currentMission = REAL_LIFE_LOCATOR_MISSIONS[activeMissionIndex];

  // Clean DOM highlight rings
  const clearHighlightRings = () => {
    highlightedElsRef.current.forEach((el) => {
      el.classList.remove('ring-4', 'ring-emerald-500', 'ring-offset-2', 'ring-rose-500', 'bg-emerald-50/60');
    });
    highlightedElsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearHighlightRings();
    };
  }, []);

  // Mode 1: Evaluate Locator
  const evaluateLocatorExpression = (exprToEval?: string) => {
    clearHighlightRings();
    const rawExpr = (exprToEval !== undefined ? exprToEval : locatorInput).trim();

    if (!rawExpr) {
      setEvalStatus('error');
      setEvalFeedback('Please provide a Playwright locator expression.');
      setMatchCount(0);
      setMatchedElementsInfo([]);
      return;
    }

    const container = sandboxRef.current;
    if (!container) {
      setEvalStatus('error');
      setEvalFeedback('Simulated browser container not mounted.');
      return;
    }

    try {
      const cleanExpr = rawExpr.replace(/^(?:await\s+)?(?:page\.)+/i, '');
      const matched: HTMLElement[] = [];

      const roleMatch = cleanExpr.match(/^getByRole\(\s*['"]([^'"]+)['"](?:\s*,\s*\{\s*name:\s*(?:['"]([^'"]+)['"]|\/([^/]+)\/([gimsuy]*))\s*\})?\s*\)/i);
      const labelMatch = cleanExpr.match(/^getByLabel\(\s*(?:['"]([^'"]+)['"]|\/([^/]+)\/([gimsuy]*))\s*\)/i);
      const testIdMatch = cleanExpr.match(/^getByTestId\(\s*['"]([^'"]+)['"]\s*\)/i);
      const placeholderMatch = cleanExpr.match(/^getByPlaceholder\(\s*(?:['"]([^'"]+)['"]|\/([^/]+)\/([gimsuy]*))\s*\)/i);
      const textMatch = cleanExpr.match(/^getByText\(\s*(?:['"]([^'"]+)['"]|\/([^/]+)\/([gimsuy]*))\s*\)/i);
      const locatorFilterMatch = cleanExpr.match(/^locator\(\s*['"]([^'"]+)['"]\s*\)(?:\.filter\(\s*\{\s*hasText:\s*['"]([^'"]+)['"]\s*\}\s*\))?(?:\.getByRole\(\s*['"]([^'"]+)['"](?:\s*,\s*\{\s*name:\s*['"]([^'"]+)['"]\s*\})?\s*\))?/i);

      const isFirst = cleanExpr.includes('.first()');
      const isLast = cleanExpr.includes('.last()');
      const nthMatch = cleanExpr.match(/\.nth\((\d+)\)/);
      const nthIndex = nthMatch ? parseInt(nthMatch[1], 10) : null;

      if (roleMatch) {
        const expectedRole = roleMatch[1].toLowerCase();
        const expectedName = roleMatch[2] || (roleMatch[3] ? new RegExp(roleMatch[3], roleMatch[4] || 'i') : null);

        const allCandidates = container.querySelectorAll<HTMLElement>(
          'button, a, input, select, textarea, [role], h1, h2, h3, h4, h5, h6, ul, ol, li, form'
        );

        allCandidates.forEach((el) => {
          let actualRole = el.getAttribute('role')?.toLowerCase();
          if (!actualRole) {
            const tag = el.tagName.toLowerCase();
            if (tag === 'button' || (tag === 'input' && (el.getAttribute('type') === 'button' || el.getAttribute('type') === 'submit'))) {
              actualRole = 'button';
            } else if (tag === 'input' && el.getAttribute('type') === 'checkbox') {
              actualRole = 'checkbox';
            } else if (tag === 'a' && el.getAttribute('href')) {
              actualRole = 'link';
            } else if (/^h[1-6]$/.test(tag)) {
              actualRole = 'heading';
            } else if (tag === 'select') {
              actualRole = 'combobox';
            }
          }

          if (actualRole === expectedRole) {
            if (!expectedName) {
              matched.push(el);
            } else {
              const accessibleName =
                el.getAttribute('aria-label') ||
                el.getAttribute('aria-labelledby') ||
                el.textContent ||
                el.innerText ||
                el.getAttribute('title') ||
                el.getAttribute('placeholder') ||
                (el as HTMLInputElement).value ||
                '';

              let matchesName = false;
              if (expectedName instanceof RegExp) {
                matchesName = expectedName.test(accessibleName);
              } else {
                matchesName = accessibleName.toLowerCase().includes(expectedName.toLowerCase());
              }

              if (matchesName) {
                matched.push(el);
              }
            }
          }
        });
      } else if (labelMatch) {
        const expectedLabel = labelMatch[1] || (labelMatch[2] ? new RegExp(labelMatch[2], labelMatch[3] || 'i') : null);
        const labels = container.querySelectorAll<HTMLLabelElement>('label');
        labels.forEach((lbl) => {
          const labelText = lbl.textContent || lbl.innerText || '';
          let match = false;
          if (expectedLabel instanceof RegExp) {
            match = expectedLabel.test(labelText);
          } else if (expectedLabel) {
            match = labelText.toLowerCase().includes(expectedLabel.toLowerCase());
          }

          if (match) {
            const htmlFor = lbl.getAttribute('for');
            if (htmlFor) {
              const targetInput = container.querySelector<HTMLElement>(`#${htmlFor}`);
              if (targetInput) matched.push(targetInput);
            } else {
              const nestedInput = lbl.querySelector<HTMLElement>('input, select, textarea');
              if (nestedInput) matched.push(nestedInput);
            }
          }
        });
      } else if (testIdMatch) {
        const expectedId = testIdMatch[1];
        const elements = container.querySelectorAll<HTMLElement>(`[data-testid="${expectedId}"]`);
        elements.forEach((el) => matched.push(el));
      } else if (placeholderMatch) {
        const expectedText = placeholderMatch[1] || (placeholderMatch[2] ? new RegExp(placeholderMatch[2], placeholderMatch[3] || 'i') : null);
        const elements = container.querySelectorAll<HTMLElement>('input, textarea');
        elements.forEach((el) => {
          const ph = el.getAttribute('placeholder') || '';
          let match = false;
          if (expectedText instanceof RegExp) {
            match = expectedText.test(ph);
          } else if (expectedText) {
            match = ph.toLowerCase().includes(expectedText.toLowerCase());
          }
          if (match) matched.push(el);
        });
      } else if (textMatch) {
        const expectedText = textMatch[1] || (textMatch[2] ? new RegExp(textMatch[2], textMatch[3] || 'i') : null);
        const all = container.querySelectorAll<HTMLElement>('*');
        all.forEach((el) => {
          if (el.children.length === 0 && (el.textContent || el.innerText)) {
            const txt = el.textContent || el.innerText || '';
            let match = false;
            if (expectedText instanceof RegExp) {
              match = expectedText.test(txt);
            } else if (expectedText) {
              match = txt.toLowerCase().includes(expectedText.toLowerCase());
            }
            if (match) matched.push(el);
          }
        });
      } else if (locatorFilterMatch) {
        const baseSelector = locatorFilterMatch[1];
        const filterText = locatorFilterMatch[2];
        const subRole = locatorFilterMatch[3];
        const subRoleName = locatorFilterMatch[4];

        let candidates = Array.from(container.querySelectorAll<HTMLElement>(baseSelector));

        if (filterText) {
          candidates = candidates.filter((el) => (el.textContent || el.innerText || '').toLowerCase().includes(filterText.toLowerCase()));
        }

        if (subRole) {
          candidates.forEach((parent) => {
            const buttons = parent.querySelectorAll<HTMLElement>(subRole === 'button' ? 'button, input[type="submit"]' : subRole);
            buttons.forEach((b) => {
              if (!subRoleName || (b.textContent || b.innerText || '').toLowerCase().includes(subRoleName.toLowerCase())) {
                matched.push(b);
              }
            });
          });
        } else {
          candidates.forEach((c) => matched.push(c));
        }
      } else {
        const fallbackQuery = container.querySelectorAll<HTMLElement>(cleanExpr);
        fallbackQuery.forEach((el) => matched.push(el));
      }

      let finalElements = matched;
      if (isFirst && finalElements.length > 0) {
        finalElements = [finalElements[0]];
      } else if (isLast && finalElements.length > 0) {
        finalElements = [finalElements[finalElements.length - 1]];
      } else if (nthIndex !== null && nthIndex >= 0 && nthIndex < finalElements.length) {
        finalElements = [finalElements[nthIndex]];
      }

      setMatchCount(finalElements.length);
      highlightedElsRef.current = finalElements;

      const infoList = finalElements.map((el) => ({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role') || el.tagName.toLowerCase(),
        text: (el.textContent || el.innerText || '').trim().slice(0, 40),
      }));
      setMatchedElementsInfo(infoList);

      if (finalElements.length === 0) {
        setEvalStatus('no-match');
        setEvalFeedback(
          `No elements matched "${rawExpr}". Check your accessible name, role, or text filter.`
        );
      } else if (finalElements.length === 1) {
        finalElements[0].classList.add('ring-4', 'ring-emerald-500', 'ring-offset-2', 'bg-emerald-50/60');
        setEvalStatus('success');
        setEvalFeedback(
          `✓ Matched 1 unique element. Strict mode passed! Target is actionable and resilient.`
        );

        if (currentMission && currentMission.validateMatch(finalElements, rawExpr)) {
          setCompletedMissions((prev) => ({
            ...prev,
            [currentMission.id]: true,
          }));
        }
      } else {
        finalElements.forEach((el) => el.classList.add('ring-4', 'ring-rose-500', 'ring-offset-2'));
        setEvalStatus('strict-violation');
        setEvalFeedback(
          `⚠️ Strict Mode Violation! Matched ${finalElements.length} elements. Playwright requires locators to resolve to a single element unless explicitly iterating.`
        );
      }
    } catch (err: any) {
      setEvalStatus('error');
      setEvalFeedback(`Execution error: ${err.message || 'Malformed selector expression'}`);
      setMatchCount(0);
      setMatchedElementsInfo([]);
    }
  };

  // Mode 2: Playwright Test Script Runner
  const runTestScriptPreset = async (preset: 'profile' | 'cart' | 'search') => {
    setIsScriptRunning(true);
    setScriptLogs([]);
    setScriptStepIndex(0);

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    if (preset === 'profile') {
      // Step 1: page.goto
      setScriptStepIndex(1);
      setScriptLogs((prev) => [...prev, { text: "page.goto('https://store.rootcart.io/checkout')", duration: 14, type: 'pass' }]);
      await sleep(350);

      // Step 2: fill email
      setScriptStepIndex(2);
      setFormData((prev) => ({ ...prev, email: 'automation.lead@rootaccess.io' }));
      setScriptLogs((prev) => [...prev, { text: "page.getByLabel('Email Address').fill('automation.lead@rootaccess.io')", duration: 42, type: 'pass' }]);
      await sleep(350);

      // Step 3: select dropdown
      setScriptStepIndex(3);
      setFormData((prev) => ({ ...prev, tier: 'Lead SDET Architect' }));
      setScriptLogs((prev) => [...prev, { text: "page.getByLabel('Role Type').selectOption('Lead SDET Architect')", duration: 26, type: 'pass' }]);
      await sleep(350);

      // Step 4: check newsletter
      setScriptStepIndex(4);
      setFormData((prev) => ({ ...prev, newsletter: true }));
      setScriptLogs((prev) => [...prev, { text: "page.getByRole('checkbox', { name: /subscribe/i }).check()", duration: 18, type: 'pass' }]);
      await sleep(350);

      // Step 5: click save
      setScriptStepIndex(5);
      setStatusAlertVisible(true);
      setScriptLogs((prev) => [...prev, { text: "page.getByRole('button', { name: 'Save Profile' }).click()", duration: 38, type: 'pass' }]);
      await sleep(350);

      // Step 6: assert alert
      setScriptStepIndex(6);
      setScriptLogs((prev) => [...prev, { text: "expect(page.getByRole('alert')).toBeVisible()", duration: 12, type: 'pass' }]);
      setScriptLogs((prev) => [...prev, { text: "expect(page.getByRole('alert')).toContainText('Profile updated successfully')", duration: 8, type: 'pass' }]);
      await sleep(200);
    } else if (preset === 'cart') {
      setScriptStepIndex(1);
      setScriptLogs((prev) => [...prev, { text: "page.locator('.product-card').filter({ hasText: 'Mechanical Keyboard' })", duration: 16, type: 'pass' }]);
      await sleep(350);

      setScriptStepIndex(2);
      setCartCount((c) => c + 1);
      setScriptLogs((prev) => [...prev, { text: "button.getByRole('button', { name: 'Add to Cart' }).click()", duration: 35, type: 'pass' }]);
      await sleep(350);

      setScriptStepIndex(3);
      setScriptLogs((prev) => [...prev, { text: "expect(page.getByTestId('cart-badge')).toHaveText('4')", duration: 10, type: 'pass' }]);
      await sleep(300);
    } else if (preset === 'search') {
      setScriptStepIndex(1);
      setSearchQuery('Docker Mastery');
      setScriptLogs((prev) => [...prev, { text: "page.getByPlaceholder(/search/i).fill('Docker Mastery')", duration: 28, type: 'pass' }]);
      await sleep(350);

      setScriptStepIndex(2);
      setScriptLogs((prev) => [...prev, { text: "page.getByRole('button', { name: 'Search' }).click()", duration: 30, type: 'pass' }]);
      await sleep(350);

      setScriptStepIndex(3);
      setScriptLogs((prev) => [...prev, { text: "expect(page.getByText('DevOps Docker Mastery')).toBeVisible()", duration: 12, type: 'pass' }]);
    }

    setIsScriptRunning(false);
  };

  // Mode 3: Network Interception & Route Mocking Action
  const handleTriggerNetworkRequest = async () => {
    setIsNetworkPending(true);
    const start = performance.now();

    if (activeRouteMock === '500-error') {
      setTimeout(() => {
        setIsNetworkPending(false);
        const duration = Math.round(performance.now() - start);
        setPromoMessage({
          type: 'error',
          text: '[HTTP 500 Server Error] Payment Gateway Outage: Bank transaction processor returned HTTP 500 timeout.',
        });
        setNetworkLog((prev) => [
          { method: 'POST', url: 'https://store.rootcart.io/api/checkout', status: 500, duration, source: "page.route() Mock Fulfill" },
          ...prev,
        ]);
      }, 350);
    } else if (activeRouteMock === '50-promo') {
      setTimeout(() => {
        setIsNetworkPending(false);
        const duration = Math.round(performance.now() - start);
        setDiscountAmount(50);
        setPromoMessage({
          type: 'success',
          text: '[HTTP 200 Mock OK] VIP Promotion Applied! 50% discount intercepted and returned via page.route.',
        });
        setNetworkLog((prev) => [
          { method: 'POST', url: 'https://store.rootcart.io/api/promo/validate', status: 200, duration, source: "page.route() Mock Fulfill" },
          ...prev,
        ]);
      }, 350);
    } else if (activeRouteMock === 'slow-2s') {
      setTimeout(() => {
        setIsNetworkPending(false);
        const duration = Math.round(performance.now() - start);
        setPromoMessage({
          type: 'success',
          text: '[HTTP 200 Slow Network] Completed after simulated 2000ms latency. Auto-waiting verified!',
        });
        setNetworkLog((prev) => [
          { method: 'GET', url: 'https://store.rootcart.io/api/inventory', status: 200, duration, source: "page.route() Latency Delay" },
          ...prev,
        ]);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsNetworkPending(false);
        const duration = Math.round(performance.now() - start);
        setPromoMessage({
          type: 'success',
          text: '[HTTP 200 Real Network] Standard checkout flow processed successfully.',
        });
        setNetworkLog((prev) => [
          { method: 'POST', url: 'https://store.rootcart.io/api/checkout', status: 200, duration, source: "Unmocked Real Network" },
          ...prev,
        ]);
      }, 250);
    }
  };

  // Mode 5: Auto-Waiting Experiment
  const handleTestAutoWaitingStrategy = async (strategy: 'naive' | 'sleep' | 'auto-wait') => {
    setAsyncButtonState('calculating');

    if (strategy === 'naive') {
      setTimeout(() => {
        setAsyncButtonState('idle');
        setAutoWaitLog((prev) => [
          {
            strategy: 'Naive Immediate Click (page.click without waiting)',
            time: 2,
            status: 'failed',
            message: '❌ ElementNotInteractableError: Button was disabled while computing shipping tariffs.',
          },
          ...prev,
        ]);
      }, 50);
    } else if (strategy === 'sleep') {
      setTimeout(() => {
        setAsyncButtonState('ready');
        setAutoWaitLog((prev) => [
          {
            strategy: 'Hardcoded Sleep (await page.waitForTimeout(4000))',
            time: 4000,
            status: 'warning',
            message: '⚠️ PASSED, but wasted 2500ms of idle CI compute time (4000ms slept vs 1500ms needed).',
          },
          ...prev,
        ]);
      }, 4000);
    } else {
      setTimeout(() => {
        setAsyncButtonState('ready');
        setAutoWaitLog((prev) => [
          {
            strategy: 'Playwright Web-First Auto-Wait (expect.toBeEnabled())',
            time: 1515,
            status: 'passed',
            message: '✓ PASSED in exactly 1515ms! Polled every 50ms and executed the exact millisecond the state became actionable.',
          },
          ...prev,
        ]);
      }, 1500);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* 1. Header Banner & Automation Mode Selector */}
      <div className="bg-slate-900 text-white p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Live Interactive Application
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Playwright Automation Engineering Simulator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Playwright Real-World Locator & Strict Mode Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore authentic automation tasks: test runner script execution, network route mocking (<code>page.route</code>), <code>storageState</code> session injection, auto-waiting diagnostics, and resilient locators.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Active Simulation
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeTabMode === 'locators' && 'Locator Inspector'}
                {activeTabMode === 'script-runner' && 'Test Script Runner'}
                {activeTabMode === 'network-mocking' && 'page.route Mocking'}
                {activeTabMode === 'storage-state' && 'StorageState Auth'}
                {activeTabMode === 'auto-waiting' && 'Auto-Waiting Lab'}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Automation Engineering Simulation Mode Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTabMode('locators')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTabMode === 'locators'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>1. Locators & Strict Mode</span>
          </button>

          <button
            onClick={() => setActiveTabMode('script-runner')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTabMode === 'script-runner'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>2. Test Script Runner & Actions</span>
          </button>

          <button
            onClick={() => setActiveTabMode('network-mocking')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTabMode === 'network-mocking'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3. Network Mocking (page.route)</span>
          </button>

          <button
            onClick={() => setActiveTabMode('storage-state')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTabMode === 'storage-state'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>4. Session & StorageState</span>
          </button>

          <button
            onClick={() => setActiveTabMode('auto-waiting')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTabMode === 'auto-waiting'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>5. Auto-Waiting & Flakiness</span>
          </button>
        </div>
      </div>

      {/* Mode 1 Specific Sub-header: Missions Navigation */}
      {activeTabMode === 'locators' && (
        <div className="bg-slate-50 border-b border-slate-200 p-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {REAL_LIFE_LOCATOR_MISSIONS.map((mission, idx) => {
              const isSelected = activeMissionIndex === idx;
              const isDone = Boolean(completedMissions[mission.id]);
              return (
                <button
                  key={mission.id}
                  onClick={() => {
                    setActiveMissionIndex(idx);
                    setLocatorInput(mission.expectedSelectorExample);
                    setEvalStatus('idle');
                    setEvalFeedback('');
                    setMatchCount(null);
                    setShowHint(false);
                    clearHighlightRings();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{mission.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-indigo-700 text-indigo-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {mission.level}
                  </span>
                  {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 1 Specific Mission Details Banner */}
      {activeTabMode === 'locators' && (
        <div className="bg-indigo-50/70 border-b border-indigo-100 p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {currentMission.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
                <strong>Task:</strong> {currentMission.task}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-lg border border-indigo-300 text-indigo-700 bg-white hover:bg-indigo-50 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocatorInput(currentMission.expectedSelectorExample);
                  evaluateLocatorExpression(currentMission.expectedSelectorExample);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Load Solution</span>
              </button>
            </div>
          </div>

          {showHint && (
            <div className="mt-3 p-3 bg-white border border-indigo-200/80 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Playwright Best Practice Hint:</strong> {currentMission.hint}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Split Grid: Live Simulated Browser Application vs Control Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column (Lg: 7 cols): Live Browser Application Sandbox */}
        <div className="lg:col-span-7 border-r border-slate-200 p-4 sm:p-6 bg-slate-100 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Mock Chrome Browser Window Frame */}
            <div className="bg-slate-800 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              {/* Address bar */}
              <div className="flex-1 bg-slate-900 rounded-lg px-3 py-1 text-[11px] font-mono text-slate-300 flex items-center justify-between border border-slate-700">
                <span className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  https://store.rootcart.io/checkout
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  {sessionRole === 'admin' && <span className="text-rose-400">● Admin Context</span>}
                  {sessionRole === 'student' && <span className="text-emerald-400">● Student Session</span>}
                  {sessionRole === 'guest' && <span className="text-amber-400">● Guest Mode</span>}
                </span>
              </div>
            </div>

            {/* Rendered Live HTML Application Sandbox */}
            <div
              ref={sandboxRef}
              className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-5 sm:p-6 space-y-6 shadow-sm overflow-y-auto max-h-[520px]"
            >
              {/* App Navigation */}
              <header className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                    R
                  </div>
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">RootCart Store</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                  <span className="text-[11px] text-slate-500">
                    {sessionRole === 'guest' && 'Guest User'}
                    {sessionRole === 'student' && 'Alex Morgan (Student Pro)'}
                    {sessionRole === 'admin' && 'Lead SDET (Admin)'}
                  </span>
                  <button
                    type="button"
                    className="relative p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 text-slate-700 cursor-pointer"
                  >
                    <span>Cart</span>
                    <span
                      data-testid="cart-badge"
                      role="status"
                      className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {cartCount}
                    </span>
                  </button>
                </div>
              </header>

              {/* Admin Special Panel when storageState session is admin */}
              {sessionRole === 'admin' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 text-rose-950">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-600" /> Admin Inventory & DB Controls
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-rose-200 text-rose-900 px-2 py-0.5 rounded-md">
                      storageState: admin-auth.json
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-800">
                    Rendered because Playwright context injected authenticated admin session cookies and permissions without UI login steps.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCartCount(99)}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Seed Cart DB (99 items)
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusAlertVisible(true)}
                      className="px-2.5 py-1 bg-white border border-rose-300 text-rose-900 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Trigger System Alert
                    </button>
                  </div>
                </div>
              )}

              {/* Search Banner */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search catalog items, SKU, or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Status Alert */}
              {statusAlertVisible && (
                <div
                  role="alert"
                  data-testid="status-alert"
                  className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between"
                >
                  <span className="font-semibold">✓ Profile updated successfully! Changes saved to database.</span>
                  <button
                    type="button"
                    onClick={() => setStatusAlertVisible(false)}
                    className="text-emerald-700 hover:text-emerald-950 font-bold"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Network Mocking Feedback Alert */}
              {promoMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                    promoMessage.type === 'error'
                      ? 'bg-rose-50 border border-rose-200 text-rose-900'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  }`}
                >
                  <span className="font-medium">{promoMessage.text}</span>
                  <button
                    type="button"
                    onClick={() => setPromoMessage(null)}
                    className="font-bold ml-2 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Customer Account Details Form */}
              <div className="border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Customer Account Details
                  </h3>
                  <span className="text-[10px] text-slate-500">Form Controls & Accessible Labels</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor={fullNameId} className="text-xs font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      id={fullNameId}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="student-email" className="text-xs font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      id="student-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={jobTitleId} className="text-xs font-medium text-slate-700">
                      Job Title
                    </label>
                    <input
                      id={jobTitleId}
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={tierId} className="text-xs font-medium text-slate-700">
                      Role Type
                    </label>
                    <select
                      id={tierId}
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Pro Automation Engineer">Pro Automation Engineer</option>
                      <option value="Lead SDET Architect">Lead SDET Architect</option>
                      <option value="QA Tech Lead">QA Tech Lead</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newsletter-sub"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="newsletter-sub" className="text-xs text-slate-600">
                      Subscribe to automated release and test execution alerts
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms-agree"
                      checked={formData.terms}
                      onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="terms-agree" className="text-xs text-slate-600">
                      I accept terms and conditions
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusAlertVisible(true);
                      setTimeout(() => setStatusAlertVisible(false), 5000);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                  >
                    Save Profile
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">
                    target: page.getByRole('button', &#123; name: 'Save Profile' &#125;)
                  </span>
                </div>
              </div>

              {/* Mode 5: Async Delayed Button for Auto-Waiting Testing */}
              {activeTabMode === 'auto-waiting' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Dynamic Async Element (Simulates 1.5s Backend Delay)
                    </span>
                    <span className="text-[10px] text-amber-700 font-mono uppercase bg-amber-100 px-2 py-0.5 rounded">
                      State: {asyncButtonState}
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Test how Playwright's web-first assertions handle elements that take time to become actionable.
                  </p>
                  <button
                    type="button"
                    disabled={asyncButtonState === 'calculating'}
                    onClick={() => {
                      alert('Express shipping rate calculated: $14.99!');
                    }}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      asyncButtonState === 'calculating'
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-2xs'
                    }`}
                  >
                    {asyncButtonState === 'calculating' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>Calculate Express Shipping</span>
                  </button>
                </div>
              )}

              {/* Mode 3: Payment Gateway & Route Mocking Trigger */}
              {activeTabMode === 'network-mocking' && (
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-indigo-300">
                      <Globe className="w-4 h-4" /> API Payment Gateway Checkout Form
                    </span>
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded">
                      Mock Rule: {activeRouteMock}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code..."
                      className="text-xs px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white flex-1"
                    />
                    <button
                      type="button"
                      disabled={isNetworkPending}
                      onClick={handleTriggerNetworkRequest}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded cursor-pointer transition-colors"
                    >
                      {isNetworkPending ? 'Requesting...' : 'Submit Order'}
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300 pt-1">
                    <span>Order Total:</span>
                    <span className="font-bold text-white">
                      ${(249 - discountAmount).toFixed(2)}{' '}
                      {discountAmount > 0 && <span className="text-emerald-400">(-${discountAmount} discount applied)</span>}
                    </span>
                  </div>
                </div>
              )}

              {/* Product Catalog Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Product Catalog (Strict Mode Test Targets)
                  </h4>
                  <span className="text-[10px] text-slate-500">3 Repeated "Add to Cart" Buttons</span>
                </div>

                <div className="space-y-2.5">
                  {/* Card 1 */}
                  <div className="product-card border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-white hover:border-slate-300 transition-colors">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">Wireless Mechanical Keyboard</div>
                      <div className="text-[11px] text-slate-500">Hot-swappable RGB switches • $129.00</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className="product-card border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-white hover:border-slate-300 transition-colors">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">DevOps Docker Mastery</div>
                      <div className="text-[11px] text-slate-500">Production containerization course • $79.00</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Card 3 */}
                  <div className="product-card border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-white hover:border-slate-300 transition-colors">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">Playwright Test Automation Pro</div>
                      <div className="text-[11px] text-slate-500">Complete enterprise certification • $199.00</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200 mt-4">
            <span>Chromium Render Engine • DOM Events Active</span>
            <span>Target DOM ID: #rootcart-sandbox</span>
          </div>
        </div>

        {/* Right Column (Lg: 5 cols): Dedicated Automation Workspace for Current Mode */}
        <div className="lg:col-span-5 p-4 sm:p-6 space-y-5 bg-white flex flex-col justify-between">
          {/* ============================================================== */}
          {/* SUB-VIEW 1: LOCATORS & STRICT MODE CONSOLE                     */}
          {/* ============================================================== */}
          {activeTabMode === 'locators' && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Interactive Evaluation Console
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Playwright Locator Engine
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Type a locator expression. The engine evaluates it against the live sandbox, draws highlight rings, and evaluates strict mode compliance.
                </p>
              </div>

              {/* Locator Expression Input */}
              <div className="space-y-2">
                <label
                  htmlFor="playwright-locator-input"
                  className="text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>Locator Expression</span>
                  <span className="text-[10px] text-slate-500 font-mono">JavaScript (.js)</span>
                </label>
                <div className="relative">
                  <input
                    id="playwright-locator-input"
                    aria-label="Locator Expression"
                    type="text"
                    value={locatorInput}
                    onChange={(e) => {
                      setLocatorInput(e.target.value);
                      setEvalStatus('idle');
                    }}
                    placeholder="e.g. page.getByRole('button', { name: 'Save Profile' })"
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-900 text-indigo-300 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Evaluation Action Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => evaluateLocatorExpression()}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Locator &amp; Inspect</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocatorInput('');
                    clearHighlightRings();
                    setMatchCount(null);
                    setEvalStatus('idle');
                    setEvalFeedback('');
                  }}
                  className="p-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 cursor-pointer transition-colors"
                  title="Clear Expression"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Match Feedback & Telemetry */}
              {evalStatus !== 'idle' && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    evalStatus === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : evalStatus === 'strict-violation'
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : evalStatus === 'no-match'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {evalStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {evalStatus === 'strict-violation' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                      {evalStatus === 'no-match' && <XCircle className="w-4 h-4 text-amber-600" />}
                      {evalStatus === 'error' && <XCircle className="w-4 h-4 text-rose-600" />}
                      <span>
                        {matchCount === 1
                          ? '1 Matched Element'
                          : `${matchCount ?? 0} Matched Elements`}
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold">
                      {evalStatus === 'success' && 'Single Target OK'}
                      {evalStatus === 'strict-violation' && 'Ambiguous Selector'}
                      {evalStatus === 'no-match' && 'Zero Matches'}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed">{evalFeedback}</p>

                  {matchedElementsInfo.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1">
                      <span className="font-semibold text-[10px] text-slate-600 uppercase tracking-wider">
                        Inspected Elements:
                      </span>
                      {matchedElementsInfo.map((info, i) => (
                        <div
                          key={i}
                          className="font-mono text-[10px] bg-white/80 p-1.5 rounded border border-slate-200/80 flex items-center justify-between"
                        >
                          <span>&lt;{info.tag}&gt; {info.text ? `"${info.text}"` : ''}</span>
                          <span className="text-slate-500 text-[9px]">role="{info.role}"</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SUB-VIEW 2: TEST SCRIPT RUNNER & ACTIONS                       */}
          {/* ============================================================== */}
          {activeTabMode === 'script-runner' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Full Automation Execution Player
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Playwright Test Script Player
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Run end-to-end JavaScript test flows with automated typing, clicking, form submission, and live assertion verification.
                </p>
              </div>

              {/* Script Preset Selector */}
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedScriptPreset('profile')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedScriptPreset === 'profile' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Profile Flow
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScriptPreset('cart')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedScriptPreset === 'cart' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Cart Flow
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScriptPreset('search')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedScriptPreset === 'search' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Search Flow
                </button>
              </div>

              {/* Code Script Viewer */}
              <div className="bg-slate-950 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 space-y-1">
                {selectedScriptPreset === 'profile' && (
                  <>
                    <div className={scriptStepIndex === 1 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      1: await page.goto('https://store.rootcart.io/checkout');
                    </div>
                    <div className={scriptStepIndex === 2 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      2: await page.getByLabel('Email Address').fill('automation.lead@rootaccess.io');
                    </div>
                    <div className={scriptStepIndex === 3 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      3: await page.getByLabel('Role Type').selectOption('Lead SDET Architect');
                    </div>
                    <div className={scriptStepIndex === 4 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      4: await page.getByRole('checkbox', &#123; name: /subscribe/i &#125;).check();
                    </div>
                    <div className={scriptStepIndex === 5 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      5: await page.getByRole('button', &#123; name: 'Save Profile' &#125;).click();
                    </div>
                    <div className={scriptStepIndex === 6 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      6: await expect(page.getByRole('alert')).toBeVisible();
                    </div>
                  </>
                )}
                {selectedScriptPreset === 'cart' && (
                  <>
                    <div className={scriptStepIndex === 1 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      1: const card = page.locator('.product-card').filter(&#123; hasText: 'Mechanical Keyboard' &#125;);
                    </div>
                    <div className={scriptStepIndex === 2 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      2: await card.getByRole('button', &#123; name: 'Add to Cart' &#125;).click();
                    </div>
                    <div className={scriptStepIndex === 3 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      3: await expect(page.getByTestId('cart-badge')).toHaveText('4');
                    </div>
                  </>
                )}
                {selectedScriptPreset === 'search' && (
                  <>
                    <div className={scriptStepIndex === 1 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      1: await page.getByPlaceholder(/search/i).fill('Docker Mastery');
                    </div>
                    <div className={scriptStepIndex === 2 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      2: await page.getByRole('button', &#123; name: 'Search' &#125;).click();
                    </div>
                    <div className={scriptStepIndex === 3 ? 'text-emerald-400 font-bold bg-slate-900 px-1 rounded' : 'text-slate-400'}>
                      3: await expect(page.getByText('DevOps Docker Mastery')).toBeVisible();
                    </div>
                  </>
                )}
              </div>

              {/* Execution Controls */}
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isScriptRunning}
                  onClick={() => runTestScriptPreset(selectedScriptPreset)}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isScriptRunning ? 'Executing Playwright Test...' : '▶ Run Test Script'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: 'Alex Morgan',
                      email: 'alex.morgan@apexcorp.io',
                      title: 'Senior QA Engineer',
                      tier: 'Pro Automation Engineer',
                      newsletter: true,
                      terms: true,
                    });
                    setCartCount(3);
                    setStatusAlertVisible(false);
                    setSearchQuery('');
                    setScriptLogs([]);
                    setScriptStepIndex(-1);
                  }}
                  className="px-3 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 text-xs font-medium cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Step Logs Telemetry */}
              {scriptLogs.length > 0 && (
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono space-y-1.5 border border-slate-800 max-h-40 overflow-y-auto">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Playwright Test Execution Log
                  </div>
                  {scriptLogs.map((log, i) => (
                    <div key={i} className="flex items-center justify-between text-emerald-400">
                      <span>✓ {log.text}</span>
                      <span className="text-[10px] text-slate-400 font-mono">[{log.duration}ms]</span>
                    </div>
                  ))}
                  {!isScriptRunning && (
                    <div className="text-emerald-300 font-bold pt-1 border-t border-slate-800 text-[10px]">
                      1 passed ({scriptLogs.reduce((acc, c) => acc + c.duration, 0)}ms)
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SUB-VIEW 3: NETWORK ROUTE INTERCEPTION & MOCKING               */}
          {/* ============================================================== */}
          {activeTabMode === 'network-mocking' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Day 13 & API Test Architecture
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  page.route() Interception Simulator
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Test backend edge cases without actual API changes. Intercept network requests and fulfill them with custom HTTP statuses or payloads.
                </p>
              </div>

              {/* Active Route Rule Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Active page.route Rule</label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveRouteMock('500-error')}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      activeRouteMock === '500-error'
                        ? 'border-rose-400 bg-rose-50/80 text-rose-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    1. Mock HTTP 500 Server Outage on /api/checkout
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRouteMock('50-promo')}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      activeRouteMock === '50-promo'
                        ? 'border-emerald-400 bg-emerald-50/80 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    2. Mock HTTP 200 50% VIP Coupon Payload
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRouteMock('slow-2s')}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      activeRouteMock === 'slow-2s'
                        ? 'border-amber-400 bg-amber-50/80 text-amber-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    3. Simulate 2.0s Slow 3G Latency & Spinner
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveRouteMock('none');
                      setDiscountAmount(0);
                      setPromoMessage(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      activeRouteMock === 'none'
                        ? 'border-indigo-400 bg-indigo-50/80 text-indigo-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    4. Unmocked (Pass-Through to Production Network)
                  </button>
                </div>
              </div>

              {/* Code Snippet for Selected Rule */}
              <div className="bg-slate-900 text-slate-300 p-3 rounded-xl font-mono text-[11px] border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Playwright Spec:</span>
                {activeRouteMock === '500-error' && (
                  <code className="text-rose-300">
                    await page.route('**/api/checkout', route =&gt; route.fulfill(&#123; status: 500 &#125;));
                  </code>
                )}
                {activeRouteMock === '50-promo' && (
                  <code className="text-emerald-300">
                    await page.route('**/api/promo/**', route =&gt; route.fulfill(&#123; json: &#123; discount: 50 &#125; &#125;));
                  </code>
                )}
                {activeRouteMock === 'slow-2s' && (
                  <code className="text-amber-300">
                    await page.route('**/*', async r =&gt; &#123; await page.waitForTimeout(2000); r.continue(); &#125;);
                  </code>
                )}
                {activeRouteMock === 'none' && (
                  <code className="text-slate-400">// No route interception registered</code>
                )}
              </div>

              {/* Network Telemetry Log */}
              {networkLog.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Intercepted Network Traffic
                  </span>
                  <div className="max-h-28 overflow-y-auto space-y-1 text-[10px] font-mono">
                    {networkLog.map((log, i) => (
                      <div
                        key={i}
                        className="p-1.5 rounded border border-slate-200 flex items-center justify-between bg-slate-50"
                      >
                        <span className="font-bold">{log.method} {log.status}</span>
                        <span className="truncate max-w-[150px] text-slate-600">{log.url}</span>
                        <span className="text-indigo-600 font-medium">{log.duration}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SUB-VIEW 4: STORAGESTATE & SESSION AUTH                        */}
          {/* ============================================================== */}
          {activeTabMode === 'storage-state' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Day 11 Authentication &amp; Isolation
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  storageState Multi-Context Injection
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Instead of logging in via the UI before each test, Playwright captures cookies and localStorage into a state file and injects them instantly into fresh browser contexts.
                </p>
              </div>

              {/* Context Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Browser Context</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSessionRole('guest');
                      setCartCount(0);
                    }}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      sessionRole === 'guest'
                        ? 'border-amber-400 bg-amber-50 text-amber-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <div className="text-xs">Guest</div>
                    <div className="text-[9px] text-slate-500">No Auth State</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSessionRole('student');
                      setCartCount(3);
                    }}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      sessionRole === 'student'
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <div className="text-xs">Student</div>
                    <div className="text-[9px] text-slate-500">student-auth.json</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSessionRole('admin');
                      setCartCount(5);
                    }}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      sessionRole === 'admin'
                        ? 'border-rose-400 bg-rose-50 text-rose-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Lock className="w-4 h-4 mx-auto mb-1 text-rose-600" />
                    <div className="text-xs">Admin</div>
                    <div className="text-[9px] text-slate-500">admin-auth.json</div>
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 space-y-1">
                <div className="text-slate-500 text-[10px]">// playwright.config.js</div>
                <div className="text-indigo-400">use: &#123;</div>
                <div className="pl-4 text-emerald-300">
                  storageState: {sessionRole === 'guest' ? 'null' : `'playwright/.auth/${sessionRole}-auth.json'`},
                </div>
                <div className="text-indigo-400">&#125;</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                <span className="font-bold text-slate-800 block">Why this matters:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Notice how switching contexts immediately updates the mock browser on the left with custom roles, banners, and permissions without filling out any login form. This speeds up large test suites by up to 10x!
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SUB-VIEW 5: AUTO-WAITING & FLAKINESS DIAGNOSTICS               */}
          {/* ============================================================== */}
          {activeTabMode === 'auto-waiting' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Day 5, 8 & 17 Anti-Flakiness
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Web-First Auto-Waiting Diagnostics
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Test three automation approaches against a delayed async button to experience why hardcoded sleeps waste CI time and naive clicks cause flakiness.
                </p>
              </div>

              {/* Three Strategy Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleTestAutoWaitingStrategy('naive')}
                  className="w-full text-left p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-950 font-medium text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold">1. Naive Immediate Click (No Waiting)</div>
                    <div className="text-[10px] text-rose-700 font-mono">await page.click('#calc-shipping-btn')</div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                    Flaky Fail
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTestAutoWaitingStrategy('sleep')}
                  className="w-full text-left p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-950 font-medium text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold">2. Anti-Pattern: Hardcoded Sleep (4000ms)</div>
                    <div className="text-[10px] text-amber-700 font-mono">await page.waitForTimeout(4000)</div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    Wastes 2.5s
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTestAutoWaitingStrategy('auto-wait')}
                  className="w-full text-left p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950 font-medium text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold">3. Playwright Web-First Auto-Wait</div>
                    <div className="text-[10px] text-emerald-700 font-mono">await expect(btn).toBeEnabled()</div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    Optimal
                  </span>
                </button>
              </div>

              {/* Auto-Wait Run Logs */}
              {autoWaitLog.length > 0 && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Execution Telemetry
                  </span>
                  {autoWaitLog.map((log, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-[11px] ${
                        log.status === 'passed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : log.status === 'warning'
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{log.strategy}</span>
                        <span className="font-mono">{log.time}ms</span>
                      </div>
                      <p className="text-[10px] mt-0.5">{log.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Cheat Sheet Bar at Bottom */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-medium">Playwright Automation Studio</span>
              <span className="font-semibold text-indigo-600">Pure JavaScript + AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
