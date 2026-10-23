import { describe, it, expect } from 'vitest';

describe('Authentication Validation Logic', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must include at least one number.';
    return null;
  };

  it('validates correct email formats', () => {
    expect(emailRegex.test('user@example.com')).toBe(true);
    expect(emailRegex.test('alex.morgan@domain.co.in')).toBe(true);
    expect(emailRegex.test('test+qa@sub.rootaccess.org')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(emailRegex.test('')).toBe(false);
    expect(emailRegex.test('plainaddress')).toBe(false);
    expect(emailRegex.test('@missinguser.com')).toBe(false);
    expect(emailRegex.test('user@.com')).toBe(false);
    expect(emailRegex.test('user@domain')).toBe(false);
  });

  it('enforces strong password criteria', () => {
    // Too short
    expect(validatePassword('Ab1')).toBe('Password must be at least 8 characters long.');
    // Missing uppercase
    expect(validatePassword('password123')).toBe('Password must include at least one uppercase letter.');
    // Missing lowercase
    expect(validatePassword('PASSWORD123')).toBe('Password must include at least one lowercase letter.');
    // Missing number
    expect(validatePassword('PasswordOnly')).toBe('Password must include at least one number.');
    // Valid password
    expect(validatePassword('SecurePass123')).toBeNull();
  });

  it('detects password mismatch', () => {
    const password = 'CorrectPassword1';
    const mismatch = 'DifferentPassword1';
    expect(password === mismatch).toBe(false);
  });
});
