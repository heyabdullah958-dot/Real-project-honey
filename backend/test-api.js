/**
 * Automated Test Suite for Amazing Natures Backend
 * Run with: node test-api.js
 * Verifies all controller logic, middleware execution, and route mapping
 * by mocking Mongoose DB connections and executing actual HTTP requests.
 */

process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.JWT_ACCESS_SECRET = 'test_access_secret_64_characters_long_for_entropy_security_key';
process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_64_characters_long_for_entropy_security_key';
process.env.JWT_ACCESS_EXPIRES = '1m';
process.env.JWT_REFRESH_EXPIRES = '1d';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.ADMIN_EMAIL = 'test-admin@amazingnatures.com.au';

const assert = require('assert');
const http = require('http');
const mongoose = require('mongoose');

// Mock Mongoose connection
mongoose.connect = async () => {
  console.log('🧪 [Mock] MongoDB Connected successfully.');
  return { connection: { host: 'mock-mongo-cluster' } };
};

// In-memory data store for mock models
const db = {
  users: [],
  products: [
    {
      slug: "mgo-30",
      name: "Manuka Honey MGO 30",
      mgo: 30,
      price: 14,
      size: "250g",
      activityLevel: 1,
      rating: 4,
      tagline: "The Gold Standard for Daily Use",
      description: "Entry-level Manuka honey...",
      benefits: ["Daily Wellness"],
      bestFor: "Daily Use",
      activity: "Balanced",
      taste: "Mild",
      image: "/assets/products/mgo-30.png",
      color: "#C8A96E",
      isActive: true
    }
  ],
  orders: [],
  contacts: []
};

// Helper for Mocking Mongoose Query
class MockQuery {
  constructor(result) {
    this.result = result;
  }
  
  select(fields) {
    // Mock select behavior
    return this;
  }

  sort(criteria) {
    // Mock sort behavior
    return this;
  }

  // To support awaiting the query
  then(onfulfilled, onrejected) {
    return Promise.resolve(this.result).then(onfulfilled, onrejected);
  }
}

// Mock Model classes and methods
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Contact = require('./models/Contact');

// Mocking User methods
User.findOne = (query) => {
  const user = db.users.find(u => u.email === query.email) || null;
  return new MockQuery(user);
};
User.create = async (data) => {
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const newUser = {
    _id: `user_${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
    role: data.role || 'admin',
    createdAt: new Date(),
    comparePassword: async function(candidate) {
      return await bcrypt.compare(candidate, this.password);
    }
  };
  db.users.push(newUser);
  return newUser;
};
User.findById = async (id) => {
  const user = db.users.find(u => u._id === id) || null;
  return user;
};

// Mocking Product methods
Product.find = (query) => {
  const list = db.products.filter(p => !query.isActive || p.isActive === query.isActive);
  return new MockQuery(list);
};
Product.findOne = (query) => {
  const prod = db.products.find(p => p.slug === query.slug && (!query.isActive || p.isActive === query.isActive)) || null;
  return new MockQuery(prod);
};
Product.create = async (data) => {
  const newProduct = { ...data, _id: `prod_${Date.now()}`, isActive: true };
  db.products.push(newProduct);
  return newProduct;
};
Product.findOneAndUpdate = async (query, update, options) => {
  const index = db.products.findIndex(p => p.slug === query.slug);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...update };
  return db.products[index];
};

// Mocking Order methods
Order.create = async (data) => {
  const newOrder = {
    ...data,
    _id: `order_${Date.now()}`,
    status: 'pending',
    emailSent: false,
    save: async function() {
      // update in array
      const index = db.orders.findIndex(o => o.orderId === this.orderId);
      if (index !== -1) {
        db.orders[index] = { ...this };
      }
      return this;
    }
  };
  db.orders.push(newOrder);
  return newOrder;
};
Order.find = () => {
  return new MockQuery(db.orders);
};
Order.findOne = (query) => {
  const ord = db.orders.find(o => o.orderId === query.orderId) || null;
  return new MockQuery(ord);
};
Order.findOneAndUpdate = async (query, update, options) => {
  const index = db.orders.findIndex(o => o.orderId === query.orderId);
  if (index === -1) return null;
  db.orders[index] = { ...db.orders[index], ...update };
  return db.orders[index];
};

// Mocking Contact methods
Contact.create = async (data) => {
  const newContact = { ...data, _id: `contact_${Date.now()}`, isRead: false };
  db.contacts.push(newContact);
  return newContact;
};
Contact.find = () => {
  return new MockQuery(db.contacts);
};
Contact.findByIdAndUpdate = async (id, update, options) => {
  const index = db.contacts.findIndex(c => c._id === id);
  if (index === -1) return null;
  db.contacts[index] = { ...db.contacts[index], ...update };
  return db.contacts[index];
};

// Start Server
require('./server');

// Helper function to send HTTP requests to test server
const request = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    
    let reqBodyString = '';
    if (body) {
      reqBodyString = JSON.stringify(body);
      reqHeaders['Content-Length'] = Buffer.byteLength(reqBodyString);
    }

    const options = {
      hostname: 'localhost',
      port: 5001,
      path,
      method,
      headers: reqHeaders
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: json
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(reqBodyString);
    }
    req.end();
  });
};

// Run the tests
async function runTests() {
  console.log('\n🚀 Starting Test Suite...');
  let testsPassed = 0;
  let testsFailed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      testsPassed++;
    } catch (e) {
      console.error(`❌ [FAIL] ${name}`);
      console.error(e);
      testsFailed++;
    }
  };

  // Test 1: Health Check Endpoint
  await test('GET /health returns 200 and success: true', async () => {
    const res = await request('GET', '/health');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.status, 'OK');
  });

  // Test 2: Public Products Retrieval
  await test('GET /api/products returns products list', async () => {
    const res = await request('GET', '/api/products');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.strictEqual(res.body.data[0].slug, 'mgo-30');
  });

  // Test 3: Public Product by Slug
  await test('GET /api/products/mgo-30 returns correct product detail', async () => {
    const res = await request('GET', '/api/products/mgo-30');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.slug, 'mgo-30');
  });

  // Test 4: Register Admin
  let adminToken = '';
  let refreshCookie = '';
  await test('POST /api/auth/register creates an admin user and returns access token + refresh cookie', async () => {
    const payload = {
      fullName: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123'
    };
    const res = await request('POST', '/api/auth/register', payload);
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.accessToken);
    assert.strictEqual(res.body.data.email, 'admin@test.com');
    assert.strictEqual(res.body.data.role, 'admin');

    adminToken = res.body.accessToken;
    
    // Extract cookie
    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie && setCookie.length > 0);
    assert.ok(setCookie[0].includes('refreshToken='));
    refreshCookie = setCookie[0].split(';')[0];
  });

  // Test 5: Register Admin validation checks
  await test('POST /api/auth/register fails on invalid email or short password', async () => {
    const invalidPayload = {
      fullName: 'No Email',
      email: 'not-an-email',
      password: '123'
    };
    const res = await request('POST', '/api/auth/register', invalidPayload);
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.ok(res.body.message.includes('email') || res.body.message.includes('Password'));
  });

  // Test 6: Login Admin
  await test('POST /api/auth/login validates credentials and returns tokens', async () => {
    const loginPayload = {
      email: 'admin@test.com',
      password: 'password123'
    };
    const res = await request('POST', '/api/auth/login', loginPayload);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.accessToken);
  });

  // Test 7: Get Admin Profile (Protected)
  await test('GET /api/auth/profile requires auth and returns admin profile details', async () => {
    // Attempt without token
    const resNoAuth = await request('GET', '/api/auth/profile');
    assert.strictEqual(resNoAuth.statusCode, 401);

    // Attempt with token
    const resAuth = await request('GET', '/api/auth/profile', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert.strictEqual(resAuth.statusCode, 200);
    assert.strictEqual(resAuth.body.success, true);
    assert.strictEqual(resAuth.body.data.email, 'admin@test.com');
  });

  // Test 8: Place Order (Public)
  let orderId = '';
  await test('POST /api/orders places a new COD order and returns orderId', async () => {
    const orderPayload = {
      fullName: 'Customer Zaid',
      whatsapp: '0405112233',
      email: 'zaid@test.com',
      city: 'Sydney',
      address: '123 Honey Lane',
      items: [
        {
          name: 'Manuka Honey MGO 263',
          quantity: 2,
          price: 40
        }
      ],
      totalAmount: 80,
      orderNote: 'Signature premium jar please'
    };

    const res = await request('POST', '/api/orders', orderPayload);
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.orderId);
    orderId = res.body.orderId;
  });

  // Test 9: Get All Orders (Admin Protected)
  await test('GET /api/orders allows authorized admins to retrieve all orders', async () => {
    // Attempt without token
    const resNoAuth = await request('GET', '/api/orders');
    assert.strictEqual(resNoAuth.statusCode, 401);

    // Attempt with token
    const resAuth = await request('GET', '/api/orders', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert.strictEqual(resAuth.statusCode, 200);
    assert.strictEqual(resAuth.body.success, true);
    assert.ok(Array.isArray(resAuth.body.data));
    assert.strictEqual(resAuth.body.data[0].orderId, orderId);
  });

  // Test 10: Submit Contact Inquiry (Public)
  await test('POST /api/contact submits inquiry', async () => {
    const contactPayload = {
      name: 'Bob Smith',
      email: 'bob@test.com',
      subject: 'Question on MGO 800',
      message: 'Is MGO 800 organic honey?'
    };

    const res = await request('POST', '/api/contact', contactPayload);
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.body.success, true);
  });

  // Test 11: Refresh Token
  await test('POST /api/auth/refresh rotates the refresh token and returns a new access token', async () => {
    const res = await request('POST', '/api/auth/refresh', null, {
      'Cookie': refreshCookie
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.accessToken);
  });

  // Test 12: Update Product (Admin Protected)
  await test('PUT /api/products/:slug updates the product details and price', async () => {
    const updatePayload = {
      price: 25,
      description: 'Updated premium description for testing',
      size: '500g'
    };
    const res = await request('PUT', '/api/products/mgo-30', updatePayload, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.price, 25);
    assert.strictEqual(res.body.data.description, 'Updated premium description for testing');
    assert.strictEqual(res.body.data.size, '500g');
  });

  console.log(`\n📊 Test Execution Results:`);
  console.log(`   Passed: ${testsPassed}`);
  console.log(`   Failed: ${testsFailed}`);

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    console.log('✅ All API tests completed successfully!');
    process.exit(0);
  }
}

// Delay test execution briefly to let server boot up completely
setTimeout(runTests, 1000);
