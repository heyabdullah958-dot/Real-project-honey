# 🐝 Amazing Natures API Documentation

Detailed documentation for the backend services of Amazing Natures Australian Manuka Honey website.

## Base URL
* **Development:** `http://localhost:5000/api`
* **Production:** `https://api.amazingnatures.com.au/api` (or customized hosting URL)

## Global Headers & Cookies
* **Auth Token:** Passed in the HTTP request headers as `Authorization: Bearer <access_token>`
* **Refresh Token:** Passed in the HTTP-only cookie as `refreshToken=<refresh_token>`
* **Content-Type:** `application/json` (Required for all `POST`/`PUT`/`PATCH` endpoints)

## Consistent JSON Responses
Every response from the server returns a consistent JSON payload format.

### Success Response
```json
{
  "success": true,
  "message": "Optional description of action",
  "data": {} // contains requested payload/details
}
```

### Error Response
```json
{
  "success": false,
  "message": "Description of why the request failed"
}
```

---

## 🔑 1. Authentication Endpoints

### Register Admin User
Create a new admin user record.
* **Method:** `POST`
* **Route:** `/auth/register`
* **Access:** Public (Strictly rate-limited to 5 registration requests per hour)
* **Request Payload:**
  ```json
  {
    "fullName": "Abdullah Nadeem",
    "email": "heyabdullah958@gmail.com",
    "password": "secure_password_123"
  }
  ```
* **Response Status:** `201 Created`
* **Response Payload:**
  ```json
  {
    "success": true,
    "message": "Admin registered successfully.",
    "accessToken": "eyJhbGciOi...",
    "data": {
      "id": "603d2e1c94b7e...",
      "fullName": "Abdullah Nadeem",
      "email": "heyabdullah958@gmail.com",
      "role": "admin"
    }
  }
  ```

### Login Admin
Verify admin credentials and establish a secure session.
* **Method:** `POST`
* **Route:** `/auth/login`
* **Access:** Public
* **Request Payload:**
  ```json
  {
    "email": "heyabdullah958@gmail.com",
    "password": "secure_password_123"
  }
  ```
* **Response Status:** `200 OK` (Sets HTTP-only Cookie `refreshToken`)
* **Response Payload:**
  ```json
  {
    "success": true,
    "message": "Logged in successfully.",
    "accessToken": "eyJhbGciOi...",
    "data": {
      "id": "603d2e1c94b7e...",
      "fullName": "Abdullah Nadeem",
      "email": "heyabdullah958@gmail.com",
      "role": "admin"
    }
  }
  ```

### Refresh Access Token
Generate a new JWT access token using the HTTP-only refresh cookie.
* **Method:** `POST`
* **Route:** `/auth/refresh`
* **Access:** Public
* **Request Payload:** None (Reads `refreshToken` cookie automatically)
* **Response Status:** `200 OK` (Rotates HTTP-only Cookie `refreshToken`)
* **Response Payload:**
  ```json
  {
    "success": true,
    "accessToken": "eyJhbGciOi...",
    "data": {
      "id": "603d2e1c94b7e...",
      "fullName": "Abdullah Nadeem",
      "email": "heyabdullah958@gmail.com",
      "role": "admin"
    }
  }
  ```

### Logout User
Invalidates the session and clears the secure cookie.
* **Method:** `POST`
* **Route:** `/auth/logout`
* **Access:** Public
* **Request Payload:** None
* **Response Status:** `200 OK` (Clears Cookie `refreshToken`)
* **Response Payload:**
  ```json
  {
    "success": true,
    "message": "Logged out successfully."
  }
  ```

### Get Admin Profile
Retrieve profile data for the currently authenticated admin.
* **Method:** `GET`
* **Route:** `/auth/profile`
* **Access:** Private (Admin token in headers required)
* **Response Status:** `200 OK`
* **Response Payload:**
  ```json
  {
    "success": true,
    "data": {
      "id": "603d2e1c94b7e...",
      "fullName": "Abdullah Nadeem",
      "email": "heyabdullah958@gmail.com",
      "role": "admin"
    }
  }
  ```

---

## 🍯 2. Products Endpoints

### Get All Active Products
Retrieve all active honey products.
* **Method:** `GET`
* **Route:** `/products`
* **Access:** Public
* **Response Status:** `200 OK`
* **Response Payload:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "603d2e1c94b7e...",
        "slug": "mgo-30",
        "name": "Manuka Honey MGO 30",
        "mgo": 30,
        "price": 14,
        "size": "250g",
        "activityLevel": 1,
        "rating": 4,
        "tagline": "The Gold Standard for Daily Use",
        "description": "Entry-level Manuka honey...",
        "benefits": ["Daily Wellness", "Natural Energy"],
        "bestFor": "Daily Use",
        "activity": "Balanced",
        "taste": "Mild",
        "image": "/assets/products/mgo-30.png",
        "color": "#C8A96E",
        "isActive": true
      }
    ]
  }
  ```

### Get Product By Slug
Retrieve product details by unique slug.
* **Method:** `GET`
* **Route:** `/products/:slug`
* **Access:** Public
* **Response Status:** `200 OK`

### Create Product
Add a new honey product to the system.
* **Method:** `POST`
* **Route:** `/products`
* **Access:** Private (Admin Only)
* **Request Payload:** Same fields as in Product model schema (slug, name, mgo, price are required).
* **Response Status:** `201 Created`

### Update Product
Modify an existing product's details.
* **Method:** `PUT`
* **Route:** `/products/:slug`
* **Access:** Private (Admin Only)
* **Request Payload:** Any fields to modify.
* **Response Status:** `200 OK`

### Delete Product
Soft delete a product from active directory.
* **Method:** `DELETE`
* **Route:** `/products/:slug`
* **Access:** Private (Admin Only)
* **Response Status:** `200 OK`

---

## 📦 3. Orders Endpoints

### Place COD Order
Submit order items and shipping details (processes and triggers email).
* **Method:** `POST`
* **Route:** `/orders`
* **Access:** Public
* **Request Payload:**
  ```json
  {
    "fullName": "Zaid Ali",
    "whatsapp": "0405123456",
    "email": "customer@example.com",
    "city": "Sydney",
    "address": "45 Pitt Street",
    "items": [
      {
        "name": "Manuka Honey MGO 400",
        "quantity": 2,
        "price": 70
      }
    ],
    "totalAmount": 140,
    "orderNote": "Leave at front door if not home."
  }
  ```
* **Response Status:** `201 Created`
* **Response Payload:**
  ```json
  {
    "success": true,
    "orderId": "AN-2026-64728",
    "message": "Order placed successfully."
  }
  ```

### Get All Orders
* **Method:** `GET`
* **Route:** `/orders`
* **Access:** Private (Admin Only)
* **Response Status:** `200 OK`

### Get Order Details
* **Method:** `GET`
* **Route:** `/orders/:orderId`
* **Access:** Private (Admin Only)
* **Response Status:** `200 OK`

### Update Order Status
Update the COD tracking status.
* **Method:** `PATCH`
* **Route:** `/orders/:orderId`
* **Access:** Private (Admin Only)
* **Request Payload:**
  ```json
  {
    "status": "confirmed" // Must be one of: pending, confirmed, shipped, delivered, cancelled
  }
  ```
* **Response Status:** `200 OK`

---

## ✉️ 4. Contact Inquiries Endpoints

### Submit Contact Inquiry
* **Method:** `POST`
* **Route:** `/contact`
* **Access:** Public
* **Request Payload:**
  ```json
  {
    "name": "Sarah Connor",
    "email": "sarah@sky.net",
    "subject": "Bioactive profile query",
    "message": "Hi, what is the best MGO honey for throat support?"
  }
  ```
* **Response Status:** `201 Created`

### Get All Inquiries
* **Method:** `GET`
* **Route:** `/contact`
* **Access:** Private (Admin Only)
* **Response Status:** `200 OK`

### Mark Inquiry as Read
* **Method:** `PATCH`
* **Route:** `/contact/:id`
* **Access:** Private (Admin Only)
* **Response Status:** `200 OK`
