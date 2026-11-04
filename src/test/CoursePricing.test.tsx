import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getCoursePriceDetails } from '../data/enrollmentPaymentConfig';
import { CoursePricingDisplay } from '../components/common/CoursePricingDisplay';

describe('Course Pricing Configuration & Calculations', () => {
  it('Playwright Automation has exact ₹1,599 regular and ₹649 launch price with 59% discount', () => {
    const details = getCoursePriceDetails('playwright-automation');
    expect(details.originalInr).toBe(1599);
    expect(details.inr).toBe(649);
    expect(details.savings).toBe(950);
    expect(details.discountPercent).toBe(59);
    expect(details.formattedInr).toBe('₹649');
    expect(details.formattedOriginalInr).toBe('₹1,599');
    expect(details.formattedSavings).toBe('₹950');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('Manual Testing has exact ₹599 regular and ₹299 launch price with 50% discount', () => {
    const details = getCoursePriceDetails('manual-qa-fundamentals');
    expect(details.originalInr).toBe(599);
    expect(details.inr).toBe(299);
    expect(details.savings).toBe(300);
    expect(details.discountPercent).toBe(50);
    expect(details.formattedInr).toBe('₹299');
    expect(details.formattedOriginalInr).toBe('₹599');
    expect(details.formattedSavings).toBe('₹300');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('SQL for QA Engineers has exact ₹599 regular and ₹299 launch price with 50% discount', () => {
    const details = getCoursePriceDetails('sql-for-qa-engineers');
    expect(details.originalInr).toBe(599);
    expect(details.inr).toBe(299);
    expect(details.savings).toBe(300);
    expect(details.discountPercent).toBe(50);
    expect(details.formattedInr).toBe('₹299');
    expect(details.formattedOriginalInr).toBe('₹599');
    expect(details.formattedSavings).toBe('₹300');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('API Testing with Postman has exact ₹599 regular and ₹299 launch price with 50% discount', () => {
    const details = getCoursePriceDetails('api-testing-postman');
    expect(details.originalInr).toBe(599);
    expect(details.inr).toBe(299);
    expect(details.savings).toBe(300);
    expect(details.discountPercent).toBe(50);
    expect(details.formattedInr).toBe('₹299');
    expect(details.formattedOriginalInr).toBe('₹599');
    expect(details.formattedSavings).toBe('₹300');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('Appium Mobile Automation has exact ₹1,599 regular and ₹649 launch price with 59% discount', () => {
    const details = getCoursePriceDetails('appium-mobile-automation');
    expect(details.originalInr).toBe(1599);
    expect(details.inr).toBe(649);
    expect(details.savings).toBe(950);
    expect(details.discountPercent).toBe(59);
    expect(details.formattedInr).toBe('₹649');
    expect(details.formattedOriginalInr).toBe('₹1,599');
    expect(details.formattedSavings).toBe('₹950');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('Apache JMeter Performance Testing has exact ₹799 regular and ₹399 launch price with 50% discount', () => {
    const details = getCoursePriceDetails('jmeter-performance-testing');
    expect(details.originalInr).toBe(799);
    expect(details.inr).toBe(399);
    expect(details.savings).toBe(400);
    expect(details.discountPercent).toBe(50);
    expect(details.formattedInr).toBe('₹399');
    expect(details.formattedOriginalInr).toBe('₹799');
    expect(details.formattedSavings).toBe('₹400');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('AI Agent Development for Beginners has exact ₹599 regular and ₹299 launch price with 50% discount', () => {
    const details = getCoursePriceDetails('ai-agent-development');
    expect(details.originalInr).toBe(599);
    expect(details.inr).toBe(299);
    expect(details.savings).toBe(300);
    expect(details.discountPercent).toBe(50);
    expect(details.formattedInr).toBe('₹299');
    expect(details.formattedOriginalInr).toBe('₹599');
    expect(details.formattedSavings).toBe('₹300');
    expect(details.isLaunchOffer).toBe(true);
  });

  it('DevOps Engineering pricing remains untouched at ₹3,499 / ₹6,999', () => {
    const details = getCoursePriceDetails('devops-engineering');
    expect(details.originalInr).toBe(6999);
    expect(details.inr).toBe(3499);
    expect(details.isLaunchOffer).toBe(false);
  });
});

describe('CoursePricingDisplay Component', () => {
  it('renders Launch Offer badge, strikethrough regular price, launch price, and savings on card variant', () => {
    render(<CoursePricingDisplay courseSlug="playwright-automation" variant="card" />);

    expect(screen.getByText('Launch Offer')).toBeInTheDocument();
    expect(screen.getByText('₹649')).toBeInTheDocument();
    expect(screen.getByText('₹1,599')).toHaveClass('line-through');
    expect(screen.getByText(/Save ₹950 \(59% off\)/)).toBeInTheDocument();
  });

  it('renders gate variant with Lifetime Access and Launch Offer pill', () => {
    render(<CoursePricingDisplay courseSlug="manual-qa-fundamentals" variant="gate" />);

    expect(screen.getByText('Launch Offer')).toBeInTheDocument();
    expect(screen.getByText(/Save ₹300 \(50% off\)/)).toBeInTheDocument();
    expect(screen.getByText('₹299')).toBeInTheDocument();
    expect(screen.getByText('₹599')).toHaveClass('line-through');
    expect(screen.getByText('Lifetime Access')).toBeInTheDocument();
  });

  it('renders modal variant with special badge and pricing', () => {
    render(<CoursePricingDisplay courseSlug="sql-for-qa-engineers" variant="modal" />);

    expect(screen.getByText('Course Pricing')).toBeInTheDocument();
    expect(screen.getByText('Launch Offer')).toBeInTheDocument();
    expect(screen.getByText('₹299')).toBeInTheDocument();
    expect(screen.getByText('₹599')).toHaveClass('line-through');
    expect(screen.getByText(/Save ₹300 \(50% off\)/)).toBeInTheDocument();
  });

  it('renders detail variant for course sidebar', () => {
    render(<CoursePricingDisplay courseSlug="api-testing-postman" variant="detail" />);

    expect(screen.getByText('Launch Offer')).toBeInTheDocument();
    expect(screen.getByText('₹299')).toBeInTheDocument();
    expect(screen.getByText('₹599')).toHaveClass('line-through');
    expect(screen.getByText(/Save ₹300 \(50% off\)/)).toBeInTheDocument();
    expect(screen.getByText('Lifetime Access')).toBeInTheDocument();
  });
});
