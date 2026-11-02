import { describe, it, expect } from 'vitest';
import { sqlSimulator, SQL_SCHEMAS } from '../services/sqlSimulatorService';
import { SQL_DAYS_DATA } from '../data/sqlCurriculumData';

describe('SqlSimulatorService & SQL Curriculum', () => {
  it('resets database and returns seeded tables', () => {
    sqlSimulator.resetDatabase();
    const customers = sqlSimulator.getRawTable('customers');
    const orders = sqlSimulator.getRawTable('orders');
    const products = sqlSimulator.getRawTable('products');
    const orderItems = sqlSimulator.getRawTable('order_items');
    const employees = sqlSimulator.getRawTable('employees');
    const srcCustomers = sqlSimulator.getRawTable('src_customers');
    const tgtCustomers = sqlSimulator.getRawTable('tgt_customers');

    expect(customers.length).toBeGreaterThan(0);
    expect(orders.length).toBeGreaterThan(0);
    expect(products.length).toBeGreaterThan(0);
    expect(orderItems.length).toBeGreaterThan(0);
    expect(employees.length).toBeGreaterThan(0);
    expect(srcCustomers.length).toBeGreaterThan(0);
    expect(tgtCustomers.length).toBeGreaterThan(0);
  });

  it('provides schema definitions for tables', () => {
    const custSchema = SQL_SCHEMAS.find((s) => s.tableName === 'customers');
    expect(custSchema).toBeDefined();
    expect(custSchema?.columns.some((c: { name: string }) => c.name === 'id')).toBe(true);
    expect(custSchema?.columns.some((c: { name: string }) => c.name === 'email')).toBe(true);
  });

  it('executes SELECT query with WHERE filtering', () => {
    const result = sqlSimulator.execute('SELECT id, name, email FROM customers WHERE country = "India";');
    expect(result.error).toBeUndefined();
    expect(result.rowCount).toBeGreaterThan(0);
    expect(result.columns).toContain('name');
  });

  it('executes WHERE LIKE, BETWEEN, and IN queries', () => {
    const likeRes = sqlSimulator.execute('SELECT * FROM customers WHERE email LIKE "%@example.com";');
    expect(likeRes.error).toBeUndefined();
    expect(likeRes.rowCount).toBeGreaterThan(0);

    const betweenRes = sqlSimulator.execute('SELECT * FROM orders WHERE total_amount BETWEEN 100 AND 500;');
    expect(betweenRes.error).toBeUndefined();

    const inRes = sqlSimulator.execute('SELECT * FROM orders WHERE status IN ("COMPLETED", "DELIVERED");');
    expect(inRes.error).toBeUndefined();
  });

  it('executes GROUP BY and HAVING aggregations', () => {
    const result = sqlSimulator.execute('SELECT customer_id, COUNT(*) AS order_cnt, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;');
    expect(result.error).toBeUndefined();
    expect(result.columns).toContain('order_cnt');
    expect(result.columns).toContain('total_spent');
  });

  it('executes INNER JOIN and LEFT JOIN', () => {
    const innerJoin = sqlSimulator.execute(`
      SELECT o.id, c.name, o.total_amount
      FROM orders o
      INNER JOIN customers c ON o.customer_id = c.id;
    `);
    expect(innerJoin.error).toBeUndefined();
    expect(innerJoin.rowCount).toBeGreaterThan(0);

    const leftJoin = sqlSimulator.execute(`
      SELECT oi.id, oi.product_id, p.name
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id;
    `);
    expect(leftJoin.error).toBeUndefined();
  });

  it('executes CASE WHEN conditional statements', () => {
    const caseRes = sqlSimulator.execute(`
      SELECT id, total_amount,
        CASE
          WHEN total_amount >= 500 THEN 'VIP'
          WHEN total_amount >= 200 THEN 'Regular'
          ELSE 'Economy'
        END AS tier
      FROM orders;
    `);
    expect(caseRes.error).toBeUndefined();
    expect(caseRes.columns).toContain('tier');
  });

  it('executes window function ROW_NUMBER() OVER (PARTITION BY ...)', () => {
    const windowRes = sqlSimulator.execute(`
      SELECT id, customer_id, total_amount,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS rn
      FROM orders;
    `);
    expect(windowRes.error).toBeUndefined();
    expect(windowRes.columns).toContain('rn');
    expect(windowRes.rows.some((r: any[]) => r.includes(1))).toBe(true);
  });

  it('handles safe DML with transactions (BEGIN, INSERT, UPDATE, ROLLBACK)', () => {
    const beginRes = sqlSimulator.execute('BEGIN;');
    expect(beginRes.error).toBeUndefined();

    const insertRes = sqlSimulator.execute(`
      INSERT INTO customers (id, name, email, country, balance)
      VALUES (999, 'Test QA', 'qa@test.com', 'India', 500);
    `);
    expect(insertRes.error).toBeUndefined();

    const verifyInsert = sqlSimulator.execute('SELECT * FROM customers WHERE id = 999;');
    expect(verifyInsert.rowCount).toBe(1);

    const rollbackRes = sqlSimulator.execute('ROLLBACK;');
    expect(rollbackRes.error).toBeUndefined();

    const verifyRollback = sqlSimulator.execute('SELECT * FROM customers WHERE id = 999;');
    expect(verifyRollback.rowCount).toBe(0);
  });

  it('contains all 5 days of curriculum with exercises and quizzes', () => {
    expect(SQL_DAYS_DATA.length).toBe(5);
    SQL_DAYS_DATA.forEach((day) => {
      expect(day.dayNumber).toBeGreaterThanOrEqual(1);
      expect(day.dayNumber).toBeLessThanOrEqual(5);
      expect(day.topics.length).toBeGreaterThan(0);
      expect(day.exercises.length).toBeGreaterThan(0);
      expect(day.interviewQuestions.length).toBeGreaterThan(0);
      expect(day.quiz.questions.length).toBe(5);
    });
  });

  it('Day 5 exercises validate migration reconciliation successfully', () => {
    const day5 = SQL_DAYS_DATA.find((d) => d.dayNumber === 5);
    expect(day5).toBeDefined();

    // Test Ex 1: Source vs target count
    const ex1 = day5!.exercises[0];
    const ex1Res = sqlSimulator.execute(ex1.solutionSql);
    expect(ex1Res.error).toBeUndefined();
    const ex1Validation = ex1.validate(ex1Res);
    expect(ex1Validation.success).toBe(true);

    // Test Ex 2: Orphaned/missing records check
    const ex2 = day5!.exercises[1];
    const ex2Res = sqlSimulator.execute(ex2.solutionSql);
    expect(ex2Res.error).toBeUndefined();
    const ex2Validation = ex2.validate(ex2Res);
    expect(ex2Validation.success).toBe(true);
  });
});
