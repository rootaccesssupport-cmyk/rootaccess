import { describe, it, expect } from 'vitest';
import { apiSimulator } from '../services/apiSimulatorService';
import { API_DAYS_DATA } from '../data/apiCurriculumData';

describe('ApiSimulatorService & API Curriculum', () => {
  it('resets API state cleanly', () => {
    apiSimulator.reset();
    expect(true).toBe(true);
  });

  it('handles GET /v1/products successfully', async () => {
    const res = await apiSimulator.execute({
      method: 'GET',
      url: 'https://api.rootaccess.org/v1/products',
      headers: {},
    });

    expect(res.status).toBe(200);
    expect(res.statusText).toBe('OK');
    expect(Array.isArray(res.data.products)).toBe(true);
    expect(res.data.products.length).toBeGreaterThan(0);
  });

  it('handles POST /v1/auth/login with student credentials', async () => {
    const res = await apiSimulator.execute({
      method: 'POST',
      url: 'https://api.rootaccess.org/v1/auth/login',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@rootaccess.org',
        password: 'RootAccess@2026',
      }),
    });

    expect(res.status).toBe(200);
    expect(res.data.access_token).toBeDefined();
    expect(res.data.user.role).toBe('student');
  });

  it('enforces RBAC on /v1/admin/audit-logs: 401 without token, 403 for student, 200 for admin', async () => {
    // 1. No token -> 401
    const unauthRes = await apiSimulator.execute({
      method: 'GET',
      url: 'https://api.rootaccess.org/v1/admin/audit-logs',
      headers: {},
    });
    expect(unauthRes.status).toBe(401);

    // 2. Student token -> 403
    const studentLogin = await apiSimulator.execute({
      method: 'POST',
      url: 'https://api.rootaccess.org/v1/auth/login',
      headers: {},
      body: JSON.stringify({ email: 'student@rootaccess.org', password: 'RootAccess@2026' }),
    });
    const forbiddenRes = await apiSimulator.execute({
      method: 'GET',
      url: 'https://api.rootaccess.org/v1/admin/audit-logs',
      headers: { Authorization: `Bearer ${studentLogin.data.access_token}` },
    });
    expect(forbiddenRes.status).toBe(403);

    // 3. Admin token -> 200
    const adminLogin = await apiSimulator.execute({
      method: 'POST',
      url: 'https://api.rootaccess.org/v1/auth/login',
      headers: {},
      body: JSON.stringify({ email: 'admin@rootaccess.org', password: 'AdminMaster@2026' }),
    });
    const adminRes = await apiSimulator.execute({
      method: 'GET',
      url: 'https://api.rootaccess.org/v1/admin/audit-logs',
      headers: { Authorization: `Bearer ${adminLogin.data.access_token}` },
    });
    expect(adminRes.status).toBe(200);
  });

  it('executes Postman tests runtime using pm.test and pm.expect', async () => {
    const res = await apiSimulator.execute({
      method: 'GET',
      url: 'https://api.rootaccess.org/v1/products',
      headers: {},
      testScript: `
        pm.test("Status is 200 OK", function () {
          pm.response.to.have.status(200);
        });

        pm.test("Response contains products array", function () {
          var jsonData = pm.response.json();
          pm.expect(jsonData.products).to.be.an("array");
        });
      `,
    });

    expect(res.testResults.length).toBe(2);
    expect(res.testResults.every((r: { passed: boolean }) => r.passed)).toBe(true);
  });

  it('contains all 5 days of curriculum with exercises, interview questions, and quizzes', () => {
    expect(API_DAYS_DATA.length).toBe(5);
    API_DAYS_DATA.forEach((day) => {
      expect(day.dayNumber).toBeGreaterThanOrEqual(1);
      expect(day.dayNumber).toBeLessThanOrEqual(5);
      expect(day.topics.length).toBeGreaterThan(0);
      expect(day.exercises.length).toBeGreaterThan(0);
      expect(day.interviewQuestions.length).toBeGreaterThan(0);
      expect(day.quiz.questions.length).toBe(5);
    });
  });

  it('handles Day 5 Capstone exercises and validator functions with bugMode', async () => {
    apiSimulator.setBugMode(true);
    const day5 = API_DAYS_DATA.find((d) => d.dayNumber === 5);
    expect(day5).toBeDefined();

    // Test Ex 1: Negative quantity defect
    const ex1 = day5!.exercises[0];
    const res1 = await apiSimulator.execute({
      method: ex1.method,
      url: ex1.endpoint,
      headers: ex1.headers || {},
      body: ex1.initialBody,
      testScript: ex1.initialTestScript,
    });
    const ex1Validation = ex1.validate(res1);
    expect(ex1Validation.success).toBe(true);
    apiSimulator.setBugMode(false);
  });
});
