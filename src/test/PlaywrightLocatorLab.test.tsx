import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightRealLifeLocatorLab } from '../components/playwright/PlaywrightRealLifeLocatorLab';
import { PlaywrightLocatorLabPage } from '../pages/playwright/PlaywrightLocatorLabPage';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';
import { ManualQaProvider } from '../context/ManualQaContext';

describe('Playwright Real-Life Locator Lab & Unlocked Course Experience', () => {
  it('renders RootCart live web application and interactive Playwright locator console', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    // Header & Brand
    expect(screen.getByText(/Playwright Real-World Locator & Strict Mode Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/RootCart Store/i)).toBeInTheDocument();

    // Rendered form elements
    expect(screen.getByText(/Customer Account Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Profile/i })).toBeInTheDocument();

    // Mission 1 is active
    expect(screen.getAllByText(/Mission 1: Accessible Primary Button/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Run Locator & Inspect/i })).toBeInTheDocument();
  });

  it('evaluates getByRole locator with strict mode pass on single button match', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const locatorInput = screen.getByLabelText(/Locator Expression/i) as HTMLInputElement;
    fireEvent.change(locatorInput, {
      target: { value: "page.getByRole('button', { name: 'Save Profile' })" },
    });

    const evalButton = screen.getByRole('button', { name: /Run Locator & Inspect/i });
    fireEvent.click(evalButton);

    expect(screen.getByText(/1 Matched Element/i)).toBeInTheDocument();
    expect(screen.getByText(/Matched 1 unique element/i)).toBeInTheDocument();
  });

  it('detects strict mode violation when targeting multiple Add to Cart buttons without filter', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const locatorInput = screen.getByLabelText(/Locator Expression/i) as HTMLInputElement;
    fireEvent.change(locatorInput, {
      target: { value: "page.getByRole('button', { name: 'Add to Cart' })" },
    });

    const evalButton = screen.getByRole('button', { name: /Run Locator & Inspect/i });
    fireEvent.click(evalButton);

    // 3 items matched
    expect(screen.getByText(/3 Matched Elements/i)).toBeInTheDocument();
    expect(screen.getByText(/Strict Mode Violation/i)).toBeInTheDocument();
  });

  it('resolves strict mode disambiguation when chained with filter hasText', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const locatorInput = screen.getByLabelText(/Locator Expression/i) as HTMLInputElement;
    fireEvent.change(locatorInput, {
      target: {
        value: "page.locator('.product-card').filter({ hasText: 'DevOps' }).getByRole('button', { name: 'Add to Cart' })",
      },
    });

    const evalButton = screen.getByRole('button', { name: /Run Locator & Inspect/i });
    fireEvent.click(evalButton);

    expect(screen.getByText(/1 Matched Element/i)).toBeInTheDocument();
    expect(screen.getByText(/Strict mode passed/i)).toBeInTheDocument();
  });

  it('switches to Test Script Runner mode and renders Playwright test player controls', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const scriptRunnerBtn = screen.getByRole('button', { name: /Test Script Runner & Actions/i });
    fireEvent.click(scriptRunnerBtn);

    expect(screen.getByText(/Playwright Test Script Player/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Test Script/i })).toBeInTheDocument();
    expect(screen.getByText(/Profile Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart Flow/i)).toBeInTheDocument();
  });

  it('switches to Network Mocking mode and configures page.route rules', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const networkBtn = screen.getByRole('button', { name: /Network Mocking \(page\.route\)/i });
    fireEvent.click(networkBtn);

    expect(screen.getByText(/page\.route\(\) Interception Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock HTTP 500 Server Outage on \/api\/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock HTTP 200 50% VIP Coupon Payload/i)).toBeInTheDocument();
  });

  it('switches to StorageState mode and switches between Guest, Student, and Admin contexts', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const storageBtn = screen.getByRole('button', { name: /Session & StorageState/i });
    fireEvent.click(storageBtn);

    expect(screen.getByText(/storageState Multi-Context Injection/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Admin/i })).toBeInTheDocument();

    // Click Admin session
    fireEvent.click(screen.getByRole('button', { name: /Admin/i }));
    expect(screen.getAllByText(/admin-auth\.json/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Admin Inventory & DB Controls/i)).toBeInTheDocument();
  });

  it('switches to Auto-Waiting mode and tests async waiting strategies', () => {
    render(<PlaywrightRealLifeLocatorLab />);

    const autoWaitBtn = screen.getByRole('button', { name: /Auto-Waiting & Flakiness/i });
    fireEvent.click(autoWaitBtn);

    expect(screen.getByText(/Web-First Auto-Waiting Diagnostics/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. Naive Immediate Click/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. Playwright Web-First Auto-Wait/i)).toBeInTheDocument();
  });

  it('renders PlaywrightLocatorLabPage with cheat sheets and link to Day 4', () => {
    render(
      <MemoryRouter initialEntries={['/courses/playwright-automation/locator-lab']}>
        <AuthProvider>
          <ProgressProvider>
            <PlaywrightLocatorLabPage />
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Playwright Live Application Locator Lab/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to Day 4: Locators/i })).toBeInTheDocument();
    expect(screen.getByText(/Role Locator \(Priority 1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Label Locator \(Form Inputs\)/i)).toBeInTheDocument();
  });

  it('renders CourseDetailPage with all syllabus lessons unlocked with Open actions', () => {
    render(
      <MemoryRouter initialEntries={['/courses/playwright-automation']}>
        <AuthProvider>
          <ProgressProvider>
            <ManualQaProvider>
              <Routes>
                <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
              </Routes>
            </ManualQaProvider>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // In playwright course, check that "Live Locator Lab" is in the header
    expect(screen.getByRole('link', { name: /Live Locator Lab/i })).toBeInTheDocument();

    // Check that syllabus buttons say "Open" and NOT "Enroll to Unlock"
    const openButtons = screen.getAllByRole('link', { name: /Open/i });
    expect(openButtons.length).toBeGreaterThan(0);
    expect(screen.queryByText(/Enroll to Unlock/i)).not.toBeInTheDocument();
  });
});
