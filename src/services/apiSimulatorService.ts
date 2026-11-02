/**
 * RootAccess Postman REST API Deterministic Simulator Service
 *
 * Provides a mock REST API server and test execution runtime for learning API testing.
 * All requests and responses are strictly handled client-side in a deterministic sandbox.
 * Supports HTTP methods (GET, POST, PUT, PATCH, DELETE), headers, URL params, JSON payloads,
 * status codes, environment variables, Postman pm.* test assertions, and seeded QA bug modes.
 */

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
  testScript?: string;
}

export interface ApiTestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  responseTimeMs: number;
  headers: Record<string, string>;
  data: any;
  testResults: ApiTestResult[];
  environment: Record<string, string>;
  isSimulated: true;
}

export interface MockProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  rating: number;
}

const INITIAL_PRODUCTS: MockProduct[] = [
  { id: 101, name: 'Playwright Automation Masterclass', category: 'Testing', price: 649, stock: 150, description: '20-Day browser automation with pure JS', rating: 4.9 },
  { id: 102, name: 'Manual QA in 5 Days: Interview Prep', category: 'Testing', price: 299, stock: 200, description: 'End-to-end test case design and Jira defect lifecycle', rating: 4.8 },
  { id: 103, name: 'SQL & Database Audits for QA', category: 'Database', price: 299, stock: 180, description: 'Relational query verification, joins, and data migration', rating: 4.9 },
  { id: 104, name: 'API Testing & Postman Pack', category: 'API', price: 299, stock: 120, description: 'REST architecture, Chai assertions, and automation', rating: 4.9 },
  { id: 105, name: 'QA Tech Interview Mastery', category: 'Career', price: 1499, stock: 50, description: 'STAR method, situational questions, and portfolio reviews', rating: 4.7 },
  { id: 106, name: 'Docker & Kubernetes Foundations', category: 'DevOps', price: 1299, stock: 40, description: 'Containerization, networking, and deployment', rating: 4.6 },
];

class ApiSimulatorService {
  private products: MockProduct[];
  private environment: Record<string, string>;
  private cart: Array<{ productId: number; name: string; quantity: number; price: number }>;
  private orders: Array<Record<string, any>>;
  private bugModeEnabled: boolean;

  constructor() {
    this.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    this.environment = {
      baseUrl: 'https://api.rootaccess.org/v1',
      authToken: '',
    };
    this.cart = [];
    this.orders = [
      {
        orderId: 'ORD-7001',
        customerId: 'USR-101',
        customerName: 'Priya Sharma',
        items: [{ productId: 101, quantity: 1, price: 649 }],
        totalAmount: 649,
        status: 'PAID',
        createdAt: '2024-04-10T14:22:00Z',
      },
    ];
    this.bugModeEnabled = false;
  }

  public reset(): void {
    this.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    this.cart = [];
    this.environment = {
      baseUrl: 'https://api.rootaccess.org/v1',
      authToken: '',
    };
    this.bugModeEnabled = false;
  }

  public setBugMode(enabled: boolean): void {
    this.bugModeEnabled = enabled;
  }

  public getEnvironment(): Record<string, string> {
    return { ...this.environment };
  }

  public setEnvironmentVariable(key: string, value: string): void {
    this.environment[key] = value;
  }

  public async execute(config: ApiRequestConfig): Promise<ApiResponse> {
    const startTime = performance.now();

    // Substitute {{variable}} placeholders in URL and Body
    const resolvedUrl = this.substituteVariables(config.url);
    const resolvedBody = config.body ? this.substituteVariables(config.body) : '';

    // Route request through mock REST dispatch
    const rawResponse = this.routeRequest(config.method, resolvedUrl, config.headers || {}, resolvedBody);

    // Artificial network latency simulation (15ms - 45ms)
    const simulatedDuration = Math.round(performance.now() - startTime + Math.floor(Math.random() * 25) + 15);

    // Run Postman pm.* test assertions if provided
    const testResults: ApiTestResult[] = [];
    if (config.testScript && config.testScript.trim()) {
      this.runPostmanTests(config.testScript, rawResponse.status, rawResponse.data, simulatedDuration, testResults);
    }

    return {
      status: rawResponse.status,
      statusText: this.getStatusText(rawResponse.status),
      responseTimeMs: simulatedDuration,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'RootAccess-MockServer/1.0',
        'x-ratelimit-limit': '100',
        'x-ratelimit-remaining': '98',
        date: new Date().toUTCString(),
        ...rawResponse.headers,
      },
      data: rawResponse.data,
      testResults,
      environment: { ...this.environment },
      isSimulated: true,
    };
  }

  private routeRequest(
    method: string,
    fullUrl: string,
    headers: Record<string, string>,
    bodyStr: string
  ): { status: number; data: any; headers?: Record<string, string> } {
    let parsedBody: any = null;
    if (bodyStr.trim()) {
      try {
        parsedBody = JSON.parse(bodyStr);
      } catch (err) {
        return {
          status: 400,
          data: {
            error: 'Bad Request',
            message: 'Invalid JSON payload. Check for syntax errors such as trailing commas or unquoted keys.',
          },
        };
      }
    }

    // Extract path and query params: e.g. https://api.rootaccess.org/v1/products?category=Testing -> /products
    let path = fullUrl.replace(/^https?:\/\/[^/]+/i, '').replace(/^\/v1/, '');
    const queryIdx = path.indexOf('?');
    let queryString = '';
    if (queryIdx !== -1) {
      queryString = path.substring(queryIdx + 1);
      path = path.substring(0, queryIdx);
    }
    path = path.replace(/\/+$/, '') || '/';

    const queryParams = new URLSearchParams(queryString);
    const authHeader = headers['authorization'] || headers['Authorization'] || '';

    // Route 1: POST /auth/login
    if (path === '/auth/login' && method === 'POST') {
      if (!parsedBody?.email || !parsedBody?.password) {
        return {
          status: 400,
          data: {
            error: 'Bad Request',
            message: 'Missing mandatory credentials. "email" and "password" are required fields.',
          },
        };
      }

      if (parsedBody.email === 'student@rootaccess.org' && parsedBody.password === 'RootAccess@2026') {
        const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVU1ItMTAxIiwibmFtZSI6IlN0dWRlbnQiLCJyb2xlIjoic3R1ZGVudCJ9.mockSignature991';
        this.environment['authToken'] = mockJwt;
        return {
          status: 200,
          data: {
            message: 'Authentication successful',
            token_type: 'Bearer',
            access_token: mockJwt,
            expires_in: 3600,
            user: {
              id: 'USR-101',
              email: 'student@rootaccess.org',
              role: 'student',
            },
          },
        };
      } else if (parsedBody.email === 'admin@rootaccess.org' && parsedBody.password === 'AdminMaster@2026') {
        const mockAdminJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVU1ItMDAxIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.mockAdminSig884';
        this.environment['authToken'] = mockAdminJwt;
        return {
          status: 200,
          data: {
            message: 'Admin authentication successful',
            token_type: 'Bearer',
            access_token: mockAdminJwt,
            expires_in: 3600,
            user: {
              id: 'USR-001',
              email: 'admin@rootaccess.org',
              role: 'admin',
            },
          },
        };
      } else {
        return {
          status: 401,
          data: {
            error: 'Unauthorized',
            message: 'Invalid email or password. Please check your credentials.',
          },
        };
      }
    }

    // Route 2: GET /products
    if (path === '/products' && method === 'GET') {
      let filtered = [...this.products];
      const category = queryParams.get('category');
      const minPrice = queryParams.get('min_price');
      const limit = queryParams.get('limit');

      if (category) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (minPrice) {
        filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
      }
      if (limit) {
        filtered = filtered.slice(0, parseInt(limit, 10));
      }

      return {
        status: 200,
        data: {
          total: filtered.length,
          products: filtered,
        },
      };
    }

    // Route 3: GET /products/:id
    const productDetailMatch = path.match(/^\/products\/([0-9]+)$/);
    if (productDetailMatch && method === 'GET') {
      const id = parseInt(productDetailMatch[1], 10);
      const prod = this.products.find((p) => p.id === id);
      if (!prod) {
        return {
          status: 404,
          data: {
            error: 'Not Found',
            message: `Product with ID ${id} was not found in the catalog.`,
          },
        };
      }
      return { status: 200, data: prod };
    }

    // Route 4: POST /products
    if (path === '/products' && method === 'POST') {
      if (!parsedBody?.name || parsedBody?.price === undefined || !parsedBody?.category) {
        return {
          status: 400,
          data: {
            error: 'Bad Request',
            message: 'Validation failed: "name", "price", and "category" are mandatory fields.',
            validationErrors: [
              !parsedBody?.name ? 'Field "name" cannot be empty.' : null,
              parsedBody?.price === undefined ? 'Field "price" is required.' : null,
              !parsedBody?.category ? 'Field "category" is required.' : null,
            ].filter(Boolean),
          },
        };
      }

      if (typeof parsedBody.price !== 'number' || parsedBody.price <= 0) {
        return {
          status: 422,
          data: {
            error: 'Unprocessable Entity',
            message: 'Product price must be a positive numeric value.',
          },
        };
      }

      const newId = Math.max(...this.products.map((p) => p.id), 100) + 1;
      const newProduct: MockProduct = {
        id: newId,
        name: parsedBody.name,
        category: parsedBody.category,
        price: parsedBody.price,
        stock: parsedBody.stock || 50,
        description: parsedBody.description || 'Newly added course asset',
        rating: 5.0,
      };
      this.products.push(newProduct);
      this.environment['productId'] = String(newId);

      return {
        status: 201,
        data: {
          message: 'Product created successfully',
          product: newProduct,
        },
      };
    }

    // Route 5: PUT /products/:id or PATCH /products/:id
    if (productDetailMatch && (method === 'PUT' || method === 'PATCH')) {
      const id = parseInt(productDetailMatch[1], 10);
      const prodIdx = this.products.findIndex((p) => p.id === id);
      if (prodIdx === -1) {
        return {
          status: 404,
          data: { error: 'Not Found', message: `Product ${id} not found.` },
        };
      }

      if (method === 'PUT') {
        if (!parsedBody?.name || !parsedBody?.price || !parsedBody?.category) {
          return {
            status: 400,
            data: { error: 'Bad Request', message: 'PUT requires full entity payload (name, price, category).' },
          };
        }
        this.products[prodIdx] = { ...this.products[prodIdx], ...parsedBody, id };
      } else {
        // PATCH partial
        this.products[prodIdx] = { ...this.products[prodIdx], ...parsedBody, id };
      }

      return {
        status: 200,
        data: {
          message: `Product ${id} updated successfully`,
          product: this.products[prodIdx],
        },
      };
    }

    // Route 6: DELETE /products/:id
    if (productDetailMatch && method === 'DELETE') {
      const id = parseInt(productDetailMatch[1], 10);
      const prodIdx = this.products.findIndex((p) => p.id === id);

      // Seeded Bug in BugMode: Returning 200 OK on nonexistent IDs
      if (prodIdx === -1 && !this.bugModeEnabled) {
        return {
          status: 404,
          data: { error: 'Not Found', message: `Cannot delete non-existent product ${id}.` },
        };
      }

      if (prodIdx !== -1) {
        this.products.splice(prodIdx, 1);
      }

      return {
        status: 204,
        data: null,
      };
    }

    // Route 7: GET /cart and POST /cart/items
    if (path === '/cart' && method === 'GET') {
      const totalAmount = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        status: 200,
        data: {
          itemCount: this.cart.length,
          items: this.cart,
          totalAmount: Math.round(totalAmount * 100) / 100,
        },
      };
    }

    if (path === '/cart/items' && method === 'POST') {
      const { productId, quantity } = parsedBody || {};
      if (!productId || quantity === undefined) {
        return {
          status: 400,
          data: { error: 'Bad Request', message: 'productId and quantity are required' },
        };
      }

      // Seeded Bug: Bug mode allows negative quantities without validation
      if (!this.bugModeEnabled && quantity <= 0) {
        return {
          status: 422,
          data: { error: 'Unprocessable Entity', message: 'Item quantity must be at least 1.' },
        };
      }

      const prod = this.products.find((p) => p.id === productId);
      if (!prod) {
        return { status: 404, data: { error: 'Not Found', message: `Product ${productId} not found.` } };
      }

      // Seeded Bug: Accepts client-provided tampered price in Bug mode
      let effectivePrice = prod.price;
      if (this.bugModeEnabled && parsedBody.price !== undefined) {
        effectivePrice = parsedBody.price;
      }

      this.cart.push({
        productId: prod.id,
        name: prod.name,
        quantity,
        price: effectivePrice,
      });

      return {
        status: 201,
        data: {
          message: 'Item added to shopping cart',
          cartItem: { productId: prod.id, name: prod.name, quantity, price: effectivePrice },
        },
      };
    }

    // Route 8: POST /orders (Checkout)
    if (path === '/orders' && method === 'POST') {
      if (!authHeader.startsWith('Bearer ')) {
        return {
          status: 401,
          data: {
            error: 'Unauthorized',
            message: 'Authentication token is missing. Please provide "Authorization: Bearer <token>" header.',
          },
        };
      }

      // Seeded Bug: Crashes with 500 Internal Server Error if cart is empty instead of clean 400
      if (this.cart.length === 0) {
        if (this.bugModeEnabled) {
          return {
            status: 500,
            data: {
              error: 'Internal Server Error',
              exception: 'NullPointerException at com.rootaccess.order.CheckoutService.computeTotalAmount(CheckoutService.java:142)',
              message: 'Unhandled server exception occurred during order serialization.',
            },
          };
        } else {
          return {
            status: 400,
            data: {
              error: 'Bad Request',
              message: 'Cannot place order with an empty shopping cart. Please add items before checkout.',
            },
          };
        }
      }

      const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const totalAmount = this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

      const orderRecord = {
        orderId: newOrderId,
        customerId: 'USR-101',
        items: [...this.cart],
        totalAmount,
        status: 'PAID',
        createdAt: new Date().toISOString(),
      };
      this.orders.push(orderRecord);
      this.environment['orderId'] = newOrderId;
      this.cart = []; // clear cart

      return {
        status: 201,
        data: {
          message: 'Order created and paid successfully',
          order: orderRecord,
        },
      };
    }

    // Route 9: GET /orders/:id
    const orderMatch = path.match(/^\/orders\/([a-zA-Z0-9_-]+)$/);
    if (orderMatch && method === 'GET') {
      const orderId = orderMatch[1];
      const ord = this.orders.find((o) => o.orderId === orderId);

      // Seeded Bug in BugMode: IDOR flaw allows accessing order without checking authorization header
      if (!this.bugModeEnabled) {
        if (!authHeader.startsWith('Bearer ')) {
          return {
            status: 401,
            data: { error: 'Unauthorized', message: 'Valid authentication Bearer token required.' },
          };
        }
      }

      if (!ord) {
        return {
          status: 404,
          data: { error: 'Not Found', message: `Order ${orderId} does not exist.` },
        };
      }

      return { status: 200, data: ord };
    }

    // Route 10: GET /admin/audit-logs
    if (path === '/admin/audit-logs' && method === 'GET') {
      if (!authHeader.startsWith('Bearer ')) {
        return {
          status: 401,
          data: {
            error: 'Unauthorized',
            message: 'Authentication token missing. Please sign in as an administrator.',
          },
        };
      }

      // Check if user is admin role
      const token = authHeader.replace(/^Bearer\s+/i, '');
      if (!token.includes('admin') && !token.includes('mockAdminSig')) {
        return {
          status: 403,
          data: {
            error: 'Forbidden',
            message: 'Access denied: You do not have the required "admin" role to view security audit logs.',
          },
        };
      }

      return {
        status: 200,
        data: {
          auditCount: 3,
          logs: [
            { id: 'LOG-01', event: 'ADMIN_SIGN_IN', timestamp: '2024-04-12T09:00:00Z', status: 'SUCCESS' },
            { id: 'LOG-02', event: 'USER_ROLE_EVALUATION', timestamp: '2024-04-12T09:15:00Z', status: 'GRANTED' },
            { id: 'LOG-03', event: 'DATABASE_BACKUP_COMPLETED', timestamp: '2024-04-12T10:00:00Z', status: 'SUCCESS' },
          ],
        },
      };
    }

    // Default 404
    return {
      status: 404,
      data: {
        error: 'Not Found',
        message: `Endpoint ${method} ${path} was not found on this server.`,
      },
    };
  }

  private substituteVariables(str: string): string {
    return str.replace(/\{\{([a-zA-Z0-9_-]+)\}\}/g, (_, key) => {
      return this.environment[key] ?? `{{${key}}}`;
    });
  }

  private getStatusText(status: number): string {
    const map: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      422: 'Unprocessable Entity',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      503: 'Service Unavailable',
    };
    return map[status] || 'Unknown';
  }

  // --- Postman pm.* Script Runtime Sandbox ---
  private runPostmanTests(
    testScript: string,
    status: number,
    data: any,
    responseTimeMs: number,
    results: ApiTestResult[]
  ): void {
    const pm = {
      test: (testName: string, testFn: () => void) => {
        try {
          testFn();
          results.push({ name: testName, passed: true });
        } catch (err: any) {
          results.push({ name: testName, passed: false, error: err.message || 'Assertion failed' });
        }
      },
      response: {
        to: {
          have: {
            status: (expectedStatus: number) => {
              if (status !== expectedStatus) {
                throw new Error(`Expected status code ${expectedStatus} but got ${status}`);
              }
            },
          },
        },
        json: () => data,
        responseTime: responseTimeMs,
      },
      environment: {
        set: (key: string, value: any) => {
          this.environment[key] = String(value);
        },
        get: (key: string) => {
          return this.environment[key];
        },
      },
      expect: (actual: any) => {
        return {
          to: {
            be: {
              an: (type: string) => {
                if (type === 'array' && !Array.isArray(actual)) {
                  throw new Error(`Expected array but got ${typeof actual}`);
                }
                if (type !== 'array' && typeof actual !== type) {
                  throw new Error(`Expected ${type} but got ${typeof actual}`);
                }
              },
              a: (type: string) => {
                if (type === 'array' && !Array.isArray(actual)) {
                  throw new Error(`Expected array but got ${typeof actual}`);
                }
                if (type !== 'array' && typeof actual !== type) {
                  throw new Error(`Expected ${type} but got ${typeof actual}`);
                }
              },
              below: (threshold: number) => {
                if (Number(actual) >= threshold) {
                  throw new Error(`Expected ${actual} to be below ${threshold}`);
                }
              },
              above: (threshold: number) => {
                if (Number(actual) <= threshold) {
                  throw new Error(`Expected ${actual} to be above ${threshold}`);
                }
              },
            },
            eql: (expected: any) => {
              if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
              }
            },
            equal: (expected: any) => {
              if (actual !== expected) {
                throw new Error(`Expected ${expected} but got ${actual}`);
              }
            },
            include: (substr: string) => {
              if (!String(actual).includes(substr)) {
                throw new Error(`Expected "${actual}" to include "${substr}"`);
              }
            },
            have: {
              property: (propName: string) => {
                if (actual === null || actual === undefined || actual[propName] === undefined) {
                  throw new Error(`Expected object to have property "${propName}"`);
                }
              },
            },
          },
        };
      },
    };

    try {
      // Evaluate script inside safe function scope
      const runner = new Function('pm', testScript);
      runner(pm);
    } catch (err: any) {
      results.push({
        name: 'Postman Script Execution',
        passed: false,
        error: `Script syntax error: ${err.message}`,
      });
    }
  }
}

export const apiSimulator = new ApiSimulatorService();
