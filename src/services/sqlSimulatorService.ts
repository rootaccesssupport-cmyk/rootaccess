/**
 * RootAccess SQL Deterministic Simulator Service
 *
 * A clean, client-side, in-memory SQL execution engine designed for interactive learning.
 * Supports standard SELECT, WHERE, operators, AND/OR/NOT, IN, BETWEEN, LIKE, ORDER BY,
 * LIMIT, DISTINCT, COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, INNER/LEFT/RIGHT JOINs,
 * table aliases, CASE WHEN, UNION/UNION ALL, COALESCE/NULL checks, subqueries,
 * basic window functions (ROW_NUMBER), and safe data modification (INSERT, UPDATE, DELETE).
 */

export interface SqlQueryResult {
  columns: string[];
  rows: (string | number | boolean | null)[][];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  affectedRows?: number;
}

export interface TableColumn {
  name: string;
  type: 'INTEGER' | 'VARCHAR' | 'DECIMAL' | 'BOOLEAN' | 'DATE' | 'TIMESTAMP';
  isPrimary?: boolean;
  isNullable?: boolean;
}

export interface TableSchema {
  tableName: string;
  description: string;
  columns: TableColumn[];
}

export interface InMemoryDatabase {
  customers: Array<Record<string, any>>;
  orders: Array<Record<string, any>>;
  products: Array<Record<string, any>>;
  order_items: Array<Record<string, any>>;
  employees: Array<Record<string, any>>;
  src_customers: Array<Record<string, any>>;
  tgt_customers: Array<Record<string, any>>;
  src_orders: Array<Record<string, any>>;
  tgt_orders: Array<Record<string, any>>;
}

const SEED_CUSTOMERS = [
  { id: 101, name: 'Alice Smith', email: 'alice@example.com', country: 'India', signup_date: '2024-01-15', tier: 'Gold' },
  { id: 102, name: 'Bob Jones', email: 'bob@example.com', country: 'United States', signup_date: '2024-02-10', tier: 'Silver' },
  { id: 103, name: 'Carol Danvers', email: 'carol@example.com', country: 'India', signup_date: '2024-02-18', tier: 'Gold' },
  { id: 104, name: 'David Miller', email: 'david@example.com', country: 'United Kingdom', signup_date: '2024-03-01', tier: 'Bronze' },
  { id: 105, name: 'Emma Watson', email: 'emma@example.com', country: 'India', signup_date: '2024-03-12', tier: 'Silver' },
  { id: 106, name: 'Frank Castle', email: 'frank@example.com', country: 'Canada', signup_date: '2024-03-20', tier: 'Bronze' },
  { id: 107, name: 'Grace Hopper', email: 'grace@example.com', country: 'United States', signup_date: '2024-04-05', tier: 'Gold' },
  { id: 108, name: 'Hank Pym', email: null, country: 'Germany', signup_date: '2024-04-18', tier: 'Bronze' },
];

const SEED_ORDERS = [
  { id: 5001, customer_id: 101, order_date: '2024-03-01', status: 'COMPLETED', total_amount: 1499.00, payment_method: 'UPI' },
  { id: 5002, customer_id: 101, order_date: '2024-03-15', status: 'COMPLETED', total_amount: 299.00, payment_method: 'UPI' },
  { id: 5003, customer_id: 102, order_date: '2024-03-20', status: 'CANCELLED', total_amount: 649.00, payment_method: 'CARD' },
  { id: 5004, customer_id: 103, order_date: '2024-03-22', status: 'COMPLETED', total_amount: 3499.00, payment_method: 'NETBANKING' },
  { id: 5005, customer_id: 104, order_date: '2024-03-25', status: 'PENDING', total_amount: 599.00, payment_method: 'UPI' },
  { id: 5006, customer_id: 105, order_date: '2024-03-28', status: 'COMPLETED', total_amount: 899.00, payment_method: 'CARD' },
  { id: 5007, customer_id: 101, order_date: '2024-04-02', status: 'REFUNDED', total_amount: 299.00, payment_method: 'UPI' },
  { id: 5008, customer_id: 107, order_date: '2024-04-10', status: 'COMPLETED', total_amount: 1200.00, payment_method: 'NETBANKING' },
  { id: 5009, customer_id: 999, order_date: '2024-04-12', status: 'PENDING', total_amount: 450.00, payment_method: 'UPI' }, // Orphaned order
];

const SEED_PRODUCTS = [
  { id: 1, name: 'Playwright Automation Course', category: 'Testing', price: 649.00, stock_qty: 150 },
  { id: 2, name: 'Manual QA Mastery Guide', category: 'Testing', price: 299.00, stock_qty: 200 },
  { id: 3, name: 'SQL for QA Engineers', category: 'Database', price: 299.00, stock_qty: 180 },
  { id: 4, name: 'Postman API Testing Pack', category: 'API', price: 299.00, stock_qty: 120 },
  { id: 5, name: 'Cloud Infrastructure Lab Access', category: 'Cloud', price: 1499.00, stock_qty: 40 },
  { id: 6, name: 'QA Interview Simulator', category: 'Career', price: 1499.00, stock_qty: 85 },
];

const SEED_ORDER_ITEMS = [
  { id: 1, order_id: 5001, product_id: 1, quantity: 1, unit_price: 649.00 },
  { id: 2, order_id: 5001, product_id: 6, quantity: 1, unit_price: 850.00 },
  { id: 3, order_id: 5002, product_id: 3, quantity: 1, unit_price: 299.00 },
  { id: 4, order_id: 5003, product_id: 1, quantity: 1, unit_price: 649.00 },
  { id: 5, order_id: 5004, product_id: 5, quantity: 2, unit_price: 1499.00 },
  { id: 6, order_id: 5005, product_id: 3, quantity: 2, unit_price: 299.00 },
  { id: 7, order_id: 5006, product_id: 4, quantity: 3, unit_price: 299.00 },
  { id: 8, order_id: 5008, product_id: 2, quantity: 4, unit_price: 299.00 },
  { id: 9, order_id: 5009, product_id: 99, quantity: 1, unit_price: 450.00 }, // Orphaned product
];

const SEED_EMPLOYEES = [
  { id: 201, name: 'Priya Sharma', department: 'Quality Assurance', salary: 75000, hire_date: '2021-06-15' },
  { id: 202, name: 'Rahul Verma', department: 'Quality Assurance', salary: 92000, hire_date: '2020-03-01' },
  { id: 203, name: 'Ananya Roy', department: 'Engineering', salary: 110000, hire_date: '2019-11-10' },
  { id: 204, name: 'Karan Mehta', department: 'Engineering', salary: 85000, hire_date: '2022-01-20' },
  { id: 205, name: 'Sneha Patel', department: 'Quality Assurance', salary: 68000, hire_date: '2023-04-10' },
  { id: 206, name: 'Vikram Seth', department: 'Data & Analytics', salary: 98000, hire_date: '2021-08-01' },
  { id: 207, name: 'Neha Gupta', department: 'Data & Analytics', salary: 105000, hire_date: '2020-09-15' },
];

// Day 5 Migration Simulation Datasets (Source vs Target with deliberate bugs)
const SEED_SRC_CUSTOMERS = [
  { customer_id: 1001, full_name: 'Arjun Das', email: 'arjun@example.com', signup_date: '2023-01-10', status: 'ACTIVE' },
  { customer_id: 1002, full_name: 'Bhavna K', email: 'bhavna@example.com', signup_date: '2023-01-15', status: 'ACTIVE' },
  { customer_id: 1003, full_name: 'Chetan M', email: 'chetan@example.com', signup_date: '2023-02-01', status: 'INACTIVE' },
  { customer_id: 1004, full_name: 'Deepa Rao', email: 'deepa@example.com', signup_date: '2023-02-12', status: 'ACTIVE' },
  { customer_id: 1005, full_name: 'Eshwar S', email: 'eshwar@example.com', signup_date: '2023-03-05', status: 'ACTIVE' },
];

const SEED_TGT_CUSTOMERS = [
  // 1001: migrated OK
  { customer_id: 1001, full_name: 'Arjun Das', email: 'arjun@example.com', signup_date: '2023-01-10', status: 'ACTIVE' },
  // 1002: migrated with NULL email bug
  { customer_id: 1002, full_name: 'Bhavna K', email: null, signup_date: '2023-01-15', status: 'ACTIVE' },
  // 1003: status mapping bug ('INACTIVE' mapped to 'UNKNOWN')
  { customer_id: 1003, full_name: 'Chetan M', email: 'chetan@example.com', signup_date: '2023-02-01', status: 'UNKNOWN' },
  // 1004: DUPLICATE KEY BUG in target!
  { customer_id: 1004, full_name: 'Deepa Rao', email: 'deepa@example.com', signup_date: '2023-02-12', status: 'ACTIVE' },
  { customer_id: 1004, full_name: 'Deepa Rao', email: 'deepa.secondary@example.com', signup_date: '2023-02-12', status: 'ACTIVE' },
  // 1005: MISSING in target! (Omitted from migration)
  // 9999: GHOST EXTRA RECORD in target (Never existed in source)
  { customer_id: 9999, full_name: 'Ghost User', email: 'ghost@target.com', signup_date: '2024-01-01', status: 'ACTIVE' },
];

const SEED_SRC_ORDERS = [
  { order_id: 801, customer_id: 1001, amount: 299.00, order_date: '2023-05-01', status: 'COMPLETED' },
  { order_id: 802, customer_id: 1002, amount: 649.00, order_date: '2023-05-04', status: 'COMPLETED' },
  { order_id: 803, customer_id: 1003, amount: 1599.00, order_date: '2023-05-10', status: 'REFUNDED' },
  { order_id: 804, customer_id: 1004, amount: 299.00, order_date: '2023-05-12', status: 'COMPLETED' },
];

const SEED_TGT_ORDERS = [
  // 801: OK
  { order_id: 801, customer_id: 1001, amount: 299.00, order_date: '2023-05-01', status: 'COMPLETED' },
  // 802: AMOUNT TRUNCATION BUG (649.00 became 64.90)
  { order_id: 802, customer_id: 1002, amount: 64.90, order_date: '2023-05-04', status: 'COMPLETED' },
  // 803: DATE MISMATCH BUG (defaulted to 1970-01-01)
  { order_id: 803, customer_id: 1003, amount: 1599.00, order_date: '1970-01-01', status: 'REFUNDED' },
  // 804: OK
  { order_id: 804, customer_id: 1004, amount: 299.00, order_date: '2023-05-12', status: 'COMPLETED' },
];

export const SQL_SCHEMAS: TableSchema[] = [
  {
    tableName: 'customers',
    description: 'Stores registered consumer profiles, subscription tiers, and geographic residency.',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'name', type: 'VARCHAR', isNullable: false },
      { name: 'email', type: 'VARCHAR', isNullable: true },
      { name: 'country', type: 'VARCHAR', isNullable: false },
      { name: 'signup_date', type: 'DATE', isNullable: false },
      { name: 'tier', type: 'VARCHAR', isNullable: false },
    ],
  },
  {
    tableName: 'orders',
    description: 'Tracks customer checkout transactions, processing states, and payment methods.',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'customer_id', type: 'INTEGER', isNullable: false },
      { name: 'order_date', type: 'DATE', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false },
      { name: 'total_amount', type: 'DECIMAL', isNullable: false },
      { name: 'payment_method', type: 'VARCHAR', isNullable: false },
    ],
  },
  {
    tableName: 'products',
    description: 'Catalog of technical training tracks, courses, and digital assets.',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'name', type: 'VARCHAR', isNullable: false },
      { name: 'category', type: 'VARCHAR', isNullable: false },
      { name: 'price', type: 'DECIMAL', isNullable: false },
      { name: 'stock_qty', type: 'INTEGER', isNullable: false },
    ],
  },
  {
    tableName: 'order_items',
    description: 'Individual line items linking checkout orders with products.',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'order_id', type: 'INTEGER', isNullable: false },
      { name: 'product_id', type: 'INTEGER', isNullable: false },
      { name: 'quantity', type: 'INTEGER', isNullable: false },
      { name: 'unit_price', type: 'DECIMAL', isNullable: false },
    ],
  },
  {
    tableName: 'employees',
    description: 'Staff directory for payroll, department allocations, and tenure analysis.',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'name', type: 'VARCHAR', isNullable: false },
      { name: 'department', type: 'VARCHAR', isNullable: false },
      { name: 'salary', type: 'INTEGER', isNullable: false },
      { name: 'hire_date', type: 'DATE', isNullable: false },
    ],
  },
  {
    tableName: 'src_customers',
    description: 'Legacy source database table for customer records prior to cloud migration.',
    columns: [
      { name: 'customer_id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'full_name', type: 'VARCHAR', isNullable: false },
      { name: 'email', type: 'VARCHAR', isNullable: false },
      { name: 'signup_date', type: 'DATE', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false },
    ],
  },
  {
    tableName: 'tgt_customers',
    description: 'Target data warehouse table after ETL pipeline execution (Audit for defects).',
    columns: [
      { name: 'customer_id', type: 'INTEGER', isNullable: false },
      { name: 'full_name', type: 'VARCHAR', isNullable: false },
      { name: 'email', type: 'VARCHAR', isNullable: true },
      { name: 'signup_date', type: 'DATE', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false },
    ],
  },
  {
    tableName: 'src_orders',
    description: 'Legacy source transactional orders table for financial balance reconciliation.',
    columns: [
      { name: 'order_id', type: 'INTEGER', isPrimary: true, isNullable: false },
      { name: 'customer_id', type: 'INTEGER', isNullable: false },
      { name: 'amount', type: 'DECIMAL', isNullable: false },
      { name: 'order_date', type: 'DATE', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false },
    ],
  },
  {
    tableName: 'tgt_orders',
    description: 'Migrated target transactional orders table (Audit for amounts and dates).',
    columns: [
      { name: 'order_id', type: 'INTEGER', isNullable: false },
      { name: 'customer_id', type: 'INTEGER', isNullable: false },
      { name: 'amount', type: 'DECIMAL', isNullable: false },
      { name: 'order_date', type: 'DATE', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false },
    ],
  },
];

class SqlSimulatorService {
  private db: InMemoryDatabase;
  private snapshotDb: InMemoryDatabase | null = null;

  constructor() {
    this.db = this.createInitialDb();
  }

  private createInitialDb(): InMemoryDatabase {
    return {
      customers: JSON.parse(JSON.stringify(SEED_CUSTOMERS)),
      orders: JSON.parse(JSON.stringify(SEED_ORDERS)),
      products: JSON.parse(JSON.stringify(SEED_PRODUCTS)),
      order_items: JSON.parse(JSON.stringify(SEED_ORDER_ITEMS)),
      employees: JSON.parse(JSON.stringify(SEED_EMPLOYEES)),
      src_customers: JSON.parse(JSON.stringify(SEED_SRC_CUSTOMERS)),
      tgt_customers: JSON.parse(JSON.stringify(SEED_TGT_CUSTOMERS)),
      src_orders: JSON.parse(JSON.stringify(SEED_SRC_ORDERS)),
      tgt_orders: JSON.parse(JSON.stringify(SEED_TGT_ORDERS)),
    };
  }

  public resetDatabase(): void {
    this.db = this.createInitialDb();
    this.snapshotDb = null;
  }

  public getRawTable(tableName: keyof InMemoryDatabase): Array<Record<string, any>> {
    return this.db[tableName] ? [...this.db[tableName]] : [];
  }

  public getTableSchema(tableName: string): TableSchema | undefined {
    return SQL_SCHEMAS.find((s) => s.tableName.toLowerCase() === tableName.toLowerCase());
  }

  public getAllSchemas(): TableSchema[] {
    return SQL_SCHEMAS;
  }

  public execute(rawSql: string): SqlQueryResult {
    const startTime = performance.now();
    const sql = rawSql.trim().replace(/;+$/, '').trim();

    if (!sql) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: 'Empty SQL query. Please enter a valid SQL statement.',
      };
    }

    try {
      const upper = sql.toUpperCase();

      // Handle Transactions
      if (upper.startsWith('BEGIN')) {
        this.snapshotDb = JSON.parse(JSON.stringify(this.db));
        return {
          columns: ['status'],
          rows: [['Transaction started. Snapshot created.']],
          rowCount: 1,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        };
      }
      if (upper.startsWith('ROLLBACK')) {
        if (this.snapshotDb) {
          this.db = this.snapshotDb;
          this.snapshotDb = null;
        }
        return {
          columns: ['status'],
          rows: [['Transaction rolled back. Changes reverted to snapshot.']],
          rowCount: 1,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        };
      }
      if (upper.startsWith('COMMIT')) {
        this.snapshotDb = null;
        return {
          columns: ['status'],
          rows: [['Transaction committed successfully.']],
          rowCount: 1,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        };
      }

      // Handle Data Modification statements
      if (upper.startsWith('INSERT INTO')) {
        return this.handleInsert(sql, startTime);
      }
      if (upper.startsWith('UPDATE')) {
        return this.handleUpdate(sql, startTime);
      }
      if (upper.startsWith('DELETE FROM') || upper.startsWith('DELETE')) {
        return this.handleDelete(sql, startTime);
      }

      // Handle UNION or UNION ALL
      if (/\bUNION\b/i.test(sql)) {
        return this.handleUnion(sql, startTime);
      }

      // Handle SELECT queries
      return this.handleSelect(sql, startTime);
    } catch (err: any) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: Math.round(performance.now() - startTime),
        error: err.message || 'Syntax error or unsupported SQL operation.',
      };
    }
  }

  // --- SELECT Execution Engine ---
  private handleSelect(sql: string, startTime: number): SqlQueryResult {
    // Check for CTE: WITH cte_name AS (SELECT ...) SELECT ...
    let mainSql = sql;
    const cteMatch = sql.match(/^WITH\s+([a-zA-Z0-9_]+)\s+AS\s*\(\s*([\s\S]+?)\s*\)\s*([\s\S]+)$/i);
    let cteTableData: Array<Record<string, any>> | null = null;
    let cteName: string | null = null;

    if (cteMatch) {
      cteName = cteMatch[1].toLowerCase();
      const cteQuery = cteMatch[2];
      mainSql = cteMatch[3];
      const cteRes = this.handleSelect(cteQuery, startTime);
      if (cteRes.error) throw new Error(cteRes.error);
      cteTableData = cteRes.rows.map((row) => {
        const obj: Record<string, any> = {};
        cteRes.columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return obj;
      });
    }

    // Extract clauses: SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
    const fromRegex = /\bFROM\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?/i;
    const fromMatch = mainSql.match(fromRegex);

    if (!fromMatch) {
      throw new Error('Unsupported query format. Expected: SELECT ... FROM <table_name>');
    }

    const primaryTableName = fromMatch[1].toLowerCase();
    const primaryAlias = fromMatch[2]?.toLowerCase() || primaryTableName;

    // Load initial table data
    let baseRows: Array<Record<string, any>> = [];
    if (cteName && primaryTableName === cteName && cteTableData) {
      baseRows = JSON.parse(JSON.stringify(cteTableData));
    } else if (this.db[primaryTableName as keyof InMemoryDatabase]) {
      baseRows = JSON.parse(JSON.stringify(this.db[primaryTableName as keyof InMemoryDatabase]));
    } else {
      throw new Error(`Table "${primaryTableName}" does not exist in simulator database.`);
    }

    // Format rows with table alias prefixes for join disambiguation
    let dataset = baseRows.map((row) => {
      const scoped: Record<string, any> = {};
      Object.keys(row).forEach((k) => {
        scoped[`${primaryAlias}.${k}`] = row[k];
        scoped[k] = row[k]; // also accessible unprefixed
      });
      return scoped;
    });

    // Handle JOINs (INNER, LEFT, RIGHT, FULL)
    const joinRegex = /\b(LEFT|RIGHT|INNER|FULL\s+OUTER|FULL)?\s*JOIN\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)/gi;
    let joinMatch: RegExpExecArray | null;

    while ((joinMatch = joinRegex.exec(mainSql)) !== null) {
      const joinType = (joinMatch[1] || 'INNER').toUpperCase();
      const joinTable = joinMatch[2].toLowerCase();
      const joinAlias = joinMatch[3]?.toLowerCase() || joinTable;
      const leftKey = joinMatch[4];
      const rightKey = joinMatch[5];

      let joinRows: Array<Record<string, any>> = [];
      if (cteName && joinTable === cteName && cteTableData) {
        joinRows = JSON.parse(JSON.stringify(cteTableData));
      } else if (this.db[joinTable as keyof InMemoryDatabase]) {
        joinRows = JSON.parse(JSON.stringify(this.db[joinTable as keyof InMemoryDatabase]));
      } else {
        throw new Error(`Joined table "${joinTable}" does not exist.`);
      }

      const mergedDataset: Array<Record<string, any>> = [];

      if (joinType.includes('LEFT')) {
        dataset.forEach((rowA) => {
          const matchingB = joinRows.filter((rowB) => {
            const valA = this.resolveValue(rowA, leftKey);
            const valB = this.resolveValue(rowB, rightKey) ?? this.resolveValue(rowB, rightKey.split('.').pop()!);
            return valA !== null && valA !== undefined && String(valA) === String(valB);
          });

          if (matchingB.length > 0) {
            matchingB.forEach((b) => {
              const combined = { ...rowA };
              Object.keys(b).forEach((k) => {
                combined[`${joinAlias}.${k}`] = b[k];
                if (combined[k] === undefined) combined[k] = b[k];
              });
              mergedDataset.push(combined);
            });
          } else {
            // Null-padded row for LEFT JOIN
            const combined = { ...rowA };
            if (joinRows.length > 0) {
              Object.keys(joinRows[0]).forEach((k) => {
                combined[`${joinAlias}.${k}`] = null;
                if (combined[k] === undefined) combined[k] = null;
              });
            }
            mergedDataset.push(combined);
          }
        });
        dataset = mergedDataset;
      } else if (joinType.includes('RIGHT')) {
        joinRows.forEach((rowB) => {
          const matchingA = dataset.filter((rowA) => {
            const valA = this.resolveValue(rowA, leftKey);
            const valB = rowB[rightKey.split('.').pop()!] ?? rowB[rightKey];
            return valA !== null && valA !== undefined && String(valA) === String(valB);
          });

          if (matchingA.length > 0) {
            matchingA.forEach((a) => {
              const combined = { ...a };
              Object.keys(rowB).forEach((k) => {
                combined[`${joinAlias}.${k}`] = rowB[k];
              });
              mergedDataset.push(combined);
            });
          } else {
            const combined: Record<string, any> = {};
            Object.keys(rowB).forEach((k) => {
              combined[`${joinAlias}.${k}`] = rowB[k];
              combined[k] = rowB[k];
            });
            mergedDataset.push(combined);
          }
        });
        dataset = mergedDataset;
      } else {
        // INNER JOIN
        dataset.forEach((rowA) => {
          const matchingB = joinRows.filter((rowB) => {
            const valA = this.resolveValue(rowA, leftKey);
            const valB = this.resolveValue(rowB, rightKey) ?? rowB[rightKey.split('.').pop()!];
            return valA !== null && valA !== undefined && String(valA) === String(valB);
          });

          matchingB.forEach((b) => {
            const combined = { ...rowA };
            Object.keys(b).forEach((k) => {
              combined[`${joinAlias}.${k}`] = b[k];
              if (combined[k] === undefined) combined[k] = b[k];
            });
            mergedDataset.push(combined);
          });
        });
        dataset = mergedDataset;
      }
    }

    // WHERE Clause filtering
    const whereMatch = mainSql.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|$)/i);
    if (whereMatch) {
      const whereCondition = whereMatch[1].trim();
      dataset = dataset.filter((row) => this.evaluateCondition(row, whereCondition));
    }

    // GROUP BY and HAVING Clause
    const groupByMatch = mainSql.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING\b|\bORDER\s+BY\b|\bLIMIT\b|$)/i);
    const selectFieldsStr = mainSql.match(/SELECT\s+([\s\S]+?)\s+FROM/i)?.[1]?.trim() || '*';
    const isDistinct = /^DISTINCT\s+/i.test(selectFieldsStr);
    const cleanSelectFields = selectFieldsStr.replace(/^DISTINCT\s+/i, '').trim();

    if (groupByMatch) {
      const groupCols = groupByMatch[1].split(',').map((c) => c.trim());
      const groups = new Map<string, Array<Record<string, any>>>();

      dataset.forEach((row) => {
        const groupKey = groupCols.map((c) => String(this.resolveValue(row, c))).join('__#_#__');
        if (!groups.has(groupKey)) {
          groups.set(groupKey, []);
        }
        groups.get(groupKey)!.push(row);
      });

      // Aggregate each group
      let aggregatedDataset: Array<Record<string, any>> = [];
      groups.forEach((groupRows) => {
        const representative = { ...groupRows[0] };
        // Compute aggregates
        const computed = this.computeGroupAggregates(groupRows, cleanSelectFields, representative);
        aggregatedDataset.push(computed);
      });

      // HAVING clause
      const havingMatch = mainSql.match(/\bHAVING\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|$)/i);
      if (havingMatch) {
        const havingCond = havingMatch[1].trim();
        aggregatedDataset = aggregatedDataset.filter((row) => this.evaluateCondition(row, havingCond));
      }

      dataset = aggregatedDataset;
    } else if (this.containsAggregatesWithoutGroupBy(cleanSelectFields)) {
      // Global aggregation over entire dataset
      const computed = this.computeGroupAggregates(dataset, cleanSelectFields, dataset[0] || {});
      dataset = [computed];
    }

    // Window Functions (ROW_NUMBER() OVER (...))
    if (/ROW_NUMBER\s*\(\s*\)\s*OVER/i.test(cleanSelectFields)) {
      dataset = this.computeWindowFunctions(dataset, cleanSelectFields);
    }

    // ORDER BY Clause
    const orderByMatch = mainSql.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT\b|$)/i);
    if (orderByMatch) {
      const orderRules = orderByMatch[1].split(',').map((rule) => {
        const parts = rule.trim().split(/\s+/);
        return {
          col: parts[0],
          isDesc: parts[1]?.toUpperCase() === 'DESC',
        };
      });

      dataset.sort((a, b) => {
        for (const rule of orderRules) {
          const valA = this.resolveValue(a, rule.col);
          const valB = this.resolveValue(b, rule.col);
          if (valA === valB) continue;
          if (valA === null || valA === undefined) return rule.isDesc ? 1 : -1;
          if (valB === null || valB === undefined) return rule.isDesc ? -1 : 1;
          if (typeof valA === 'number' && typeof valB === 'number') {
            return rule.isDesc ? valB - valA : valA - valB;
          }
          const cmp = String(valA).localeCompare(String(valB));
          return rule.isDesc ? -cmp : cmp;
        }
        return 0;
      });
    }

    // LIMIT Clause
    const limitMatch = mainSql.match(/\bLIMIT\s+([0-9]+)/i);
    if (limitMatch) {
      const limitVal = parseInt(limitMatch[1], 10);
      dataset = dataset.slice(0, limitVal);
    }

    // Project columns and construct result rows
    const { columns, projectedRows } = this.projectFields(dataset, cleanSelectFields, isDistinct);

    return {
      columns,
      rows: projectedRows,
      rowCount: projectedRows.length,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
    };
  }

  // --- Projection & Expressions ---
  private projectFields(
    dataset: Array<Record<string, any>>,
    selectFieldsStr: string,
    isDistinct: boolean
  ): { columns: string[]; projectedRows: any[][] } {
    if (selectFieldsStr === '*') {
      if (dataset.length === 0) return { columns: ['(Empty Result)'], projectedRows: [] };
      // Collect unique keys without alias duplicates
      const sample = dataset[0];
      const columns = Object.keys(sample).filter((k) => !k.includes('.'));
      const rows = dataset.map((row) => columns.map((col) => row[col] ?? null));
      return { columns, projectedRows: rows };
    }

    // Split select items respecting nested functions/parentheses
    const selectItems = this.splitCsvRespectingParens(selectFieldsStr);
    const columns: string[] = [];
    const extractors: Array<(row: Record<string, any>) => any> = [];

    selectItems.forEach((item) => {
      const aliasMatch = item.match(/^([\s\S]+?)\s+(?:AS\s+)?([a-zA-Z0-9_]+)$/i);
      let expr = item.trim();
      let colName = expr;

      if (aliasMatch && !expr.toUpperCase().includes('CASE WHEN')) {
        expr = aliasMatch[1].trim();
        colName = aliasMatch[2].trim();
      } else if (expr.toUpperCase().startsWith('CASE WHEN')) {
        const caseAlias = item.match(/\bEND\s+(?:AS\s+)?([a-zA-Z0-9_]+)$/i);
        if (caseAlias) {
          colName = caseAlias[1].trim();
        } else {
          colName = 'case_result';
        }
      }

      columns.push(colName);
      extractors.push((row) => this.evalExpression(row, expr, colName));
    });

    let projectedRows = dataset.map((row) => extractors.map((ext) => ext(row)));

    if (isDistinct) {
      const seen = new Set<string>();
      projectedRows = projectedRows.filter((r) => {
        const key = JSON.stringify(r);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return { columns, projectedRows };
  }

  private evalExpression(row: Record<string, any>, expr: string, aliasName?: string): any {
    const trimmed = expr.trim();

    // Direct pre-calculated column or alias
    if (aliasName && row[aliasName] !== undefined) return row[aliasName];
    if (row[trimmed] !== undefined) return row[trimmed];

    // COALESCE(col1, defaultVal)
    const coalesceMatch = trimmed.match(/^COALESCE\s*\(\s*([\s\S]+?)\s*\)$/i);
    if (coalesceMatch) {
      const args = coalesceMatch[1].split(',').map((s) => s.trim());
      for (const arg of args) {
        const val = this.resolveValue(row, arg);
        if (val !== null && val !== undefined) return val;
      }
      return null;
    }

    // CASE WHEN ... THEN ... ELSE ... END
    if (/^CASE\b/i.test(trimmed)) {
      return this.evaluateCaseWhen(row, trimmed);
    }

    // String Concatenation: CONCAT(a, ' ', b)
    const concatMatch = trimmed.match(/^CONCAT\s*\(\s*([\s\S]+?)\s*\)$/i);
    if (concatMatch) {
      const args = concatMatch[1].split(',').map((s) => s.trim());
      return args.map((a) => String(this.resolveValue(row, a) ?? '')).join('');
    }

    // UPPER / LOWER
    const upperMatch = trimmed.match(/^UPPER\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
    if (upperMatch) return String(this.resolveValue(row, upperMatch[1]) ?? '').toUpperCase();
    const lowerMatch = trimmed.match(/^LOWER\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
    if (lowerMatch) return String(this.resolveValue(row, lowerMatch[1]) ?? '').toLowerCase();

    return this.resolveValue(row, trimmed);
  }

  private evaluateCaseWhen(row: Record<string, any>, caseExpr: string): any {
    const whenRegex = /WHEN\s+([\s\S]+?)\s+THEN\s+([\s\S]+?)(?=\bWHEN\b|\bELSE\b|\bEND\b)/gi;
    let match: RegExpExecArray | null;

    while ((match = whenRegex.exec(caseExpr)) !== null) {
      const condition = match[1].trim();
      const thenVal = match[2].trim().replace(/^['"]|['"]$/g, '');
      if (this.evaluateCondition(row, condition)) {
        return thenVal;
      }
    }

    const elseMatch = caseExpr.match(/\bELSE\s+([\s\S]+?)\s+END/i);
    if (elseMatch) {
      return elseMatch[1].trim().replace(/^['"]|['"]$/g, '');
    }

    return null;
  }

  // --- Condition Evaluator ---
  private evaluateCondition(row: Record<string, any>, conditionStr: string): boolean {
    const trimmed = conditionStr.trim();

    // Handle OR expressions
    const orParts = this.splitTopLevel(trimmed, 'OR');
    if (orParts.length > 1) {
      return orParts.some((p) => this.evaluateCondition(row, p));
    }

    // Handle AND expressions
    const andParts = this.splitTopLevel(trimmed, 'AND');
    if (andParts.length > 1) {
      return andParts.every((p) => this.evaluateCondition(row, p));
    }

    // Handle NOT
    if (/^NOT\s+/i.test(trimmed)) {
      return !this.evaluateCondition(row, trimmed.replace(/^NOT\s+/i, ''));
    }

    // Strips surrounding parentheses: (a = 1) -> a = 1
    if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      const inner = trimmed.substring(1, trimmed.length - 1);
      if (this.isBalanced(inner)) {
        return this.evaluateCondition(row, inner);
      }
    }

    // IS NULL / IS NOT NULL
    const isNotNullMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s+IS\s+NOT\s+NULL$/i);
    if (isNotNullMatch) {
      const val = this.resolveValue(row, isNotNullMatch[1]);
      return val !== null && val !== undefined && val !== '';
    }
    const isNullMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s+IS\s+NULL$/i);
    if (isNullMatch) {
      const val = this.resolveValue(row, isNullMatch[1]);
      return val === null || val === undefined || val === '';
    }

    // IN (val1, val2) or IN (SELECT ...)
    const inMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s+(NOT\s+)?IN\s*\(\s*([\s\S]+?)\s*\)$/i);
    if (inMatch) {
      const col = inMatch[1];
      const isNot = Boolean(inMatch[2]);
      const content = inMatch[3].trim();
      const actualVal = this.resolveValue(row, col);

      let allowedValues: any[];
      if (/^SELECT\b/i.test(content)) {
        const subRes = this.handleSelect(content, performance.now());
        allowedValues = subRes.rows.map((r) => r[0]);
      } else {
        allowedValues = content.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
      }

      const hasMatch = allowedValues.some((v) => String(v).toLowerCase() === String(actualVal).toLowerCase());
      return isNot ? !hasMatch : hasMatch;
    }

    // BETWEEN a AND b
    const betweenMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s+BETWEEN\s+([0-9.]+)\s+AND\s+([0-9.]+)$/i);
    if (betweenMatch) {
      const val = Number(this.resolveValue(row, betweenMatch[1]));
      const min = Number(betweenMatch[2]);
      const max = Number(betweenMatch[3]);
      return val >= min && val <= max;
    }

    // LIKE '%pattern%' or LIKE 'pattern%'
    const likeMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s+(NOT\s+)?LIKE\s+['"]([\s\S]+?)['"]$/i);
    if (likeMatch) {
      const val = String(this.resolveValue(row, likeMatch[1]) ?? '').toLowerCase();
      const isNot = Boolean(likeMatch[2]);
      const pattern = likeMatch[3].toLowerCase();

      let regexPattern = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
      regexPattern = regexPattern.replace(/%/g, '.*').replace(/_/g, '.');
      const reg = new RegExp(`^${regexPattern}$`, 'i');
      const matches = reg.test(val);
      return isNot ? !matches : matches;
    }

    // Subquery comparison: col > (SELECT AVG(...) FROM ...)
    const subqueryMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s*(=|!=|<>|>=|<=|>|<)\s*\(\s*(SELECT[\s\S]+?)\s*\)$/i);
    if (subqueryMatch) {
      const col = subqueryMatch[1];
      const op = subqueryMatch[2];
      const subQuery = subqueryMatch[3];
      const leftVal = this.resolveValue(row, col);
      const subRes = this.handleSelect(subQuery, performance.now());
      const rightVal = subRes.rows[0]?.[0];
      return this.compareValues(leftVal, op, rightVal);
    }

    // Binary comparison: col = 'value' or col >= 50
    const binaryMatch = trimmed.match(/^([a-zA-Z0-9_.]+)\s*(=|!=|<>|>=|<=|>|<)\s*([\s\S]+)$/);
    if (binaryMatch) {
      const leftKey = binaryMatch[1];
      const op = binaryMatch[2];
      const rightRaw = binaryMatch[3].trim();

      const leftVal = this.resolveValue(row, leftKey);
      let rightVal: any;

      if (/^['"].*['"]$/.test(rightRaw)) {
        rightVal = rightRaw.replace(/^['"]|['"]$/g, '');
      } else if (!isNaN(Number(rightRaw))) {
        rightVal = Number(rightRaw);
      } else {
        // Compare with another column (e.g. src.id = tgt.id)
        rightVal = this.resolveValue(row, rightRaw);
      }

      return this.compareValues(leftVal, op, rightVal);
    }

    return true;
  }

  private compareValues(leftVal: any, op: string, rightVal: any): boolean {
    if (leftVal === null || leftVal === undefined || rightVal === null || rightVal === undefined) {
      if (op === '=' || op === '==') return leftVal === rightVal;
      if (op === '!=' || op === '<>') return leftVal !== rightVal;
      return false;
    }

    if (typeof leftVal === 'number' || typeof rightVal === 'number') {
      const numL = Number(leftVal);
      const numR = Number(rightVal);
      switch (op) {
        case '=':
        case '==':
          return numL === numR;
        case '!=':
        case '<>':
          return numL !== numR;
        case '>':
          return numL > numR;
        case '<':
          return numL < numR;
        case '>=':
          return numL >= numR;
        case '<=':
          return numL <= numR;
      }
    }

    const strL = String(leftVal);
    const strR = String(rightVal);
    switch (op) {
      case '=':
      case '==':
        return strL.toLowerCase() === strR.toLowerCase();
      case '!=':
      case '<>':
        return strL.toLowerCase() !== strR.toLowerCase();
      case '>':
        return strL > strR;
      case '<':
        return strL < strR;
      case '>=':
        return strL >= strR;
      case '<=':
        return strL <= strR;
      default:
        return false;
    }
  }

  // --- Aggregations & Window Functions ---
  private containsAggregatesWithoutGroupBy(selectStr: string): boolean {
    return /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(selectStr) && !/\bOVER\s*\(/i.test(selectStr);
  }

  private computeGroupAggregates(
    groupRows: Array<Record<string, any>>,
    selectFieldsStr: string,
    representative: Record<string, any>
  ): Record<string, any> {
    const computed: Record<string, any> = { ...representative };
    const items = this.splitCsvRespectingParens(selectFieldsStr);

    items.forEach((item) => {
      const aggMatch = item.match(/\b(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?([a-zA-Z0-9_.*]+)\s*\)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?/i);
      if (aggMatch) {
        const fn = aggMatch[1].toUpperCase();
        const isDistinct = Boolean(aggMatch[2]);
        const targetCol = aggMatch[3];
        const alias = aggMatch[4] || `${fn.toLowerCase()}_${targetCol.replace(/[^a-zA-Z0-9_]/g, '')}`;

        let values = groupRows.map((r) => (targetCol === '*' ? 1 : this.resolveValue(r, targetCol)));
        if (targetCol !== '*') {
          values = values.filter((v) => v !== null && v !== undefined);
        }

        if (isDistinct) {
          values = Array.from(new Set(values));
        }

        let result: any = 0;
        if (fn === 'COUNT') {
          result = values.length;
        } else if (fn === 'SUM') {
          result = values.reduce((acc, v) => acc + Number(v || 0), 0);
          result = Math.round(result * 100) / 100;
        } else if (fn === 'AVG') {
          const sum = values.reduce((acc, v) => acc + Number(v || 0), 0);
          result = values.length > 0 ? Math.round((sum / values.length) * 100) / 100 : 0;
        } else if (fn === 'MIN') {
          result = values.length > 0 ? Math.min(...values.map(Number)) : null;
        } else if (fn === 'MAX') {
          result = values.length > 0 ? Math.max(...values.map(Number)) : null;
        }

        computed[alias] = result;
        computed[item.trim()] = result;
        computed[`${fn}(${targetCol})`] = result;
      }
    });

    return computed;
  }

  private computeWindowFunctions(
    dataset: Array<Record<string, any>>,
    selectFieldsStr: string
  ): Array<Record<string, any>> {
    // ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)
    const winMatch = selectFieldsStr.match(/ROW_NUMBER\s*\(\s*\)\s*OVER\s*\(\s*(?:PARTITION\s+BY\s+([a-zA-Z0-9_.]+))?\s*(?:ORDER\s+BY\s+([a-zA-Z0-9_.]+)(?:\s+(ASC|DESC))?)?\s*\)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?/i);

    if (!winMatch) return dataset;

    const partitionCol = winMatch[1]?.trim();
    const orderCol = winMatch[2]?.trim();
    const isDesc = winMatch[3]?.toUpperCase() === 'DESC';
    const alias = winMatch[4]?.trim() || 'row_num';

    // Group partitions
    const partitions = new Map<string, Array<Record<string, any>>>();
    dataset.forEach((row) => {
      const key = partitionCol ? String(this.resolveValue(row, partitionCol)) : 'ALL';
      if (!partitions.has(key)) partitions.set(key, []);
      partitions.get(key)!.push(row);
    });

    const resultDataset: Array<Record<string, any>> = [];

    partitions.forEach((group) => {
      if (orderCol) {
        group.sort((a, b) => {
          const valA = this.resolveValue(a, orderCol);
          const valB = this.resolveValue(b, orderCol);
          if (valA === valB) return 0;
          if (valA === null) return 1;
          if (valB === null) return -1;
          return isDesc ? (valB > valA ? 1 : -1) : (valA > valB ? 1 : -1);
        });
      }

      group.forEach((row, idx) => {
        const enriched = { ...row };
        enriched[alias] = idx + 1;
        resultDataset.push(enriched);
      });
    });

    return resultDataset;
  }

  // --- UNION & UNION ALL ---
  private handleUnion(sql: string, startTime: number): SqlQueryResult {
    const isUnionAll = /\bUNION\s+ALL\b/i.test(sql);
    const parts = sql.split(isUnionAll ? /\bUNION\s+ALL\b/i : /\bUNION\b/i);

    const res1 = this.handleSelect(parts[0], startTime);
    const res2 = this.handleSelect(parts[1], startTime);

    if (res1.error) throw new Error(res1.error);
    if (res2.error) throw new Error(res2.error);

    let combinedRows = [...res1.rows, ...res2.rows];

    if (!isUnionAll) {
      const seen = new Set<string>();
      combinedRows = combinedRows.filter((r) => {
        const k = JSON.stringify(r);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }

    return {
      columns: res1.columns,
      rows: combinedRows,
      rowCount: combinedRows.length,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  // --- DML (INSERT, UPDATE, DELETE) ---
  private handleInsert(sql: string, startTime: number): SqlQueryResult {
    const insertMatch = sql.match(/INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*\(([\s\S]+?)\)\s*VALUES\s*\(([\s\S]+?)\)/i);
    if (!insertMatch) {
      throw new Error('Unsupported INSERT syntax. Expected: INSERT INTO <table> (<cols>) VALUES (<values>)');
    }

    const tableName = insertMatch[1].toLowerCase() as keyof InMemoryDatabase;
    const cols = insertMatch[2].split(',').map((c) => c.trim());
    const rawValues = insertMatch[3].split(',').map((v) => {
      const clean = v.trim();
      if (/^['"].*['"]$/.test(clean)) return clean.replace(/^['"]|['"]$/g, '');
      if (!isNaN(Number(clean))) return Number(clean);
      if (clean.toUpperCase() === 'NULL') return null;
      return clean;
    });

    if (!this.db[tableName]) {
      throw new Error(`Table "${tableName}" does not exist.`);
    }

    const newRecord: Record<string, any> = {};
    cols.forEach((col, idx) => {
      newRecord[col] = rawValues[idx];
    });

    this.db[tableName].push(newRecord);

    return {
      columns: ['status', 'inserted_id'],
      rows: [['1 row inserted successfully into sandbox database.', newRecord.id || newRecord.customer_id || '(auto)']],
      rowCount: 1,
      affectedRows: 1,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
    };
  }

  private handleUpdate(sql: string, startTime: number): SqlQueryResult {
    const updateMatch = sql.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!updateMatch) {
      throw new Error('Unsupported UPDATE syntax. Expected: UPDATE <table> SET col = val WHERE condition');
    }

    const tableName = updateMatch[1].toLowerCase() as keyof InMemoryDatabase;
    const setClause = updateMatch[2].trim();
    const whereClause = updateMatch[3]?.trim();

    if (!this.db[tableName]) {
      throw new Error(`Table "${tableName}" does not exist.`);
    }

    const setPairs = setClause.split(',').map((pair) => {
      const [col, val] = pair.split('=').map((s) => s.trim());
      let parsedVal: any = val;
      if (/^['"].*['"]$/.test(val)) parsedVal = val.replace(/^['"]|['"]$/g, '');
      else if (!isNaN(Number(val))) parsedVal = Number(val);
      else if (val.toUpperCase() === 'NULL') parsedVal = null;
      return { col, val: parsedVal };
    });

    let affectedCount = 0;
    this.db[tableName].forEach((row) => {
      if (!whereClause || this.evaluateCondition(row, whereClause)) {
        setPairs.forEach((p) => {
          row[p.col] = p.val;
        });
        affectedCount++;
      }
    });

    return {
      columns: ['status', 'rows_affected'],
      rows: [[`Successfully updated ${affectedCount} rows in "${tableName}".`, affectedCount]],
      rowCount: 1,
      affectedRows: affectedCount,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
    };
  }

  private handleDelete(sql: string, startTime: number): SqlQueryResult {
    const deleteMatch = sql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!deleteMatch) {
      throw new Error('Unsupported DELETE syntax. Expected: DELETE FROM <table> WHERE condition');
    }

    const tableName = deleteMatch[1].toLowerCase() as keyof InMemoryDatabase;
    const whereClause = deleteMatch[2]?.trim();

    if (!this.db[tableName]) {
      throw new Error(`Table "${tableName}" does not exist.`);
    }

    const initialLen = this.db[tableName].length;
    if (whereClause) {
      this.db[tableName] = this.db[tableName].filter((row) => !this.evaluateCondition(row, whereClause));
    } else {
      this.db[tableName] = [];
    }
    const affectedCount = initialLen - this.db[tableName].length;

    return {
      columns: ['status', 'rows_deleted'],
      rows: [[`Successfully deleted ${affectedCount} rows from "${tableName}".`, affectedCount]],
      rowCount: 1,
      affectedRows: affectedCount,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
    };
  }

  // --- Helper Utilities ---
  private resolveValue(row: Record<string, any>, key: string): any {
    if (!row) return null;
    const cleanKey = key.trim();
    if (row[cleanKey] !== undefined) return row[cleanKey];

    // Try without table prefix: "c.country" -> "country"
    const dotIdx = cleanKey.lastIndexOf('.');
    if (dotIdx !== -1) {
      const colOnly = cleanKey.substring(dotIdx + 1);
      if (row[colOnly] !== undefined) return row[colOnly];
    }

    // Literal number or string
    if (!isNaN(Number(cleanKey)) && !cleanKey.includes('.')) {
      return Number(cleanKey);
    }
    if (/^['"].*['"]$/.test(cleanKey)) {
      return cleanKey.replace(/^['"]|['"]$/g, '');
    }

    return null;
  }

  private splitTopLevel(str: string, keyword: 'AND' | 'OR'): string[] {
    const parts: string[] = [];
    let depth = 0;
    let current = '';
    const reg = new RegExp(`^\\b${keyword}\\b`, 'i');

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') depth++;
      else if (char === ')') depth--;

      if (depth === 0) {
        const sub = str.substring(i);
        const match = sub.match(reg);
        if (match) {
          parts.push(current.trim());
          current = '';
          i += match[0].length;
          continue;
        }
      }
      current += char;
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  private splitCsvRespectingParens(str: string): string[] {
    const items: string[] = [];
    let depth = 0;
    let current = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') depth++;
      else if (char === ')') depth--;

      if (char === ',' && depth === 0) {
        items.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) items.push(current.trim());
    return items;
  }

  private isBalanced(str: string): boolean {
    let depth = 0;
    for (const char of str) {
      if (char === '(') depth++;
      if (char === ')') depth--;
      if (depth < 0) return false;
    }
    return depth === 0;
  }
}

export const sqlSimulator = new SqlSimulatorService();
