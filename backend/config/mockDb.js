/**
 * High-Fidelity Mongoose Interceptor for Offline/Mock Development Mode.
 * Intercepts Mongoose model methods to run in-memory when Atlas connection fails.
 */

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Contact = require('../models/Contact');

const bcrypt = require('bcryptjs');
const defaultHash = bcrypt.hashSync('password123', 10);

const db = {
  users: [
    {
      _id: 'mock_admin_default',
      fullName: 'Default Mock Admin',
      email: 'admin@test.com',
      password: defaultHash,
      role: 'admin',
      createdAt: new Date(),
      comparePassword: async function(candidate) {
        return await bcrypt.compare(candidate, this.password);
      }
    }
  ],
  products: [
    {
      slug: "mgo-30",
      name: "Manuka Honey MGO 30",
      mgo: 30,
      price: 14,
      size: "250g",
      activityLevel: 1,
      rating: 4,
      tagline: "The Amazing Standard for Daily Use",
      description: "Entry-level Manuka honey for daily use and natural wellness. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
      benefits: ["Daily Wellness", "Natural Energy", "Sugar Substitute"],
      bestFor: "Daily Use",
      activity: "Balanced",
      taste: "Mild",
      image: "/assets/products/mgo-30.png",
      color: "#C8A96E",
      isActive: true
    },
    {
      slug: "mgo-100",
      name: "Manuka Honey MGO 100",
      mgo: 100,
      price: 18,
      size: "250g",
      activityLevel: 2,
      rating: 4,
      tagline: "Premium Reserve Wellness",
      description: "Moderate strength Manuka honey suitable for regular wellness support. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
      benefits: ["Digestive Wellness", "Wellness Boost", "Daily Maintenance"],
      bestFor: "Wellness",
      activity: "Moderate",
      taste: "Mild-Med",
      image: "/assets/products/mgo-100.png",
      color: "#C49A2A",
      isActive: true
    },
    {
      slug: "mgo-263",
      name: "Manuka Honey MGO 263",
      mgo: 263,
      price: 40,
      size: "250g",
      activityLevel: 3,
      rating: 5,
      tagline: "Naturally Concentrated Support",
      description: "Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level. Ideal for targeted wellness and natural support.",
      benefits: ["Natural Support", "Wellness Support", "Bioactive Support"],
      bestFor: "Wellness Support",
      activity: "High",
      taste: "Medium",
      image: "/assets/products/mgo-263.png",
      color: "#D4930A",
      isActive: true
    },
    {
      slug: "mgo-400",
      name: "Manuka Honey MGO 400",
      mgo: 400,
      price: 70,
      size: "250g",
      activityLevel: 4,
      rating: 5,
      tagline: "Dynamic Natural Activity",
      description: "Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level. Premium reserve grade for intensive wellness support.",
      benefits: ["Skin Wellness", "Intensive Wellness Support", "Natural Support"],
      bestFor: "Wellness Support",
      activity: "Very High",
      taste: "Strong",
      image: "/assets/products/mgo-400.png",
      color: "#B87800",
      isActive: true
    },
    {
      slug: "mgo-800",
      name: "Manuka Honey MGO 800",
      mgo: 800,
      price: 160,
      size: "250g",
      activityLevel: 5,
      rating: 5,
      tagline: "Liquid Gold Reserve",
      description: "Our highest activity level, premium reserve grade Manuka. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
      benefits: ["Advanced Wellness", "Max Bio-Activity", "Premium Support"],
      bestFor: "Targeted Support",
      activity: "Exceptional",
      taste: "Intense",
      image: "/assets/products/mgo-800.png",
      color: "#9B6500",
      isActive: true
    }
  ],
  orders: [],
  contacts: []
};

class MockQuery {
  constructor(result) {
    this.result = result;
  }
  
  select(fields) {
    return this;
  }

  sort(criteria) {
    return this;
  }

  then(onfulfilled, onrejected) {
    return Promise.resolve(this.result).then(onfulfilled, onrejected);
  }
}

module.exports = () => {
  // Override User Model Methods
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
    return db.users.find(u => u._id === id) || null;
  };

  // Override Product Model Methods
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

  // Override Order Model Methods
  Order.create = async (data) => {
    const newOrder = {
      ...data,
      _id: `order_${Date.now()}`,
      status: 'pending',
      emailSent: false,
      save: async function() {
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

  // Override Contact Model Methods
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
};
