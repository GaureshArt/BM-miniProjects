# **E-Commerce Admin Panel**

## **Project Overview**

Develop a **fully functional E-Commerce Admin Panel** using the **FakeStore API**, where an admin can **manage products, users, orders (carts), and authentication**. The project will involve CRUD operations, authentication, and efficient API data handling.

---

## **Core Features**

### **1. Authentication System**

- Implement a **login page** with `POST /auth/login` API.
- Use **React Hook Form** for form validation.
- Store authentication status globally using **Zustand**.
- Handle **successful and unsuccessful login attempts**.
- Redirect users to the dashboard after login.

---

### **2. Product Management**

- Fetch all products from the API (`GET /products`).
- View details of a **single product** (`GET /products/{id}`).
- Implement **search, filtering, and sorting** using **useState and useReducer**.
- **Add new products** (`POST /products`).
- **Update product details** (`PUT /products/{id}`).
- **Delete a product** (`DELETE /products/{id}`).
- Use **React Hook Form** for form validation.
- Show success/error messages using toast notifications.

---

### **3. User Management**

- Fetch all users from the API (`GET /users`).
- View details of a **single user** (`GET /users/{id}`).
- Allow admin to add a new user (`POST /users`).
- Edit user details (`PUT /users/{id}`).
- Delete users (`DELETE /users/{id}`).
- Implement **search and filtering**.
- Store users globally using **Zustand**.

---

### **4. Order (Cart) Management**

- Fetch all carts (orders) (`GET /carts`).
- View details of a **single cart** (`GET /carts/{id}`).
- **Add a new order** (`POST /carts`).
- **Update cart details** (`PUT /carts/{id}`).
- **Delete an order** (`DELETE /carts/{id}`).
- Show order totals and customer details.

---

### **5. Global State Management**

- Store **authentication status and user session** using **Context API or Zustand**.
- Maintain a **global product list** to reduce API calls.
- Use **useState and useReducer** for filtering, sorting, and pagination.

---

### **6. UI & API Handling**

- Use **Ant Design, Chakra UI, or Material UI** for UI components.
- Implement tables and modals for product and user management.
- Fetch data efficiently with **TanStack Query (React Query)**.
- Handle **loading, error, and success states** effectively.
- Implement a **skeleton loader** for better UX.

---

## **Tech Stack**

- **React + Vite**
- **UI Library**: Ant Design, Chakra UI, Material UI
- **Axios** for handling API requests
- **React Query** (TanStack Query) for API calls
- **React Hook Form** for form handling & validation
- **useState, useReducer** for component-level state management
- **Context API & Zustand** for global state management
- **React Router** for navigation

---

## **Stretch Goals (Optional)**

- Implement **dark mode** using `useContext`.
- Add **pagination** for products and users.
- Implement **role-based access control** (Admin vs Staff).
- Implement **chart analytics** for product sales and orders.

---

## **API Endpoints Used**

<https://fakestoreapi.com/docs#tag/Products>

- `POST /auth/login` - User authentication
- `GET /users` - List users
- `GET /users/{id}` - Get user details
- `POST /users` - Create a new user
- `PUT /users/{id}` - Update user details
- `DELETE /users/{id}` - Delete a user
- `GET /products` - List products
- `GET /products/{id}` - Get product details
- `POST /products` - Add a new product
- `PUT /products/{id}` - Update product details
- `DELETE /products/{id}` - Delete a product
- `GET /carts` - List all orders
- `GET /carts/{id}` - Get cart details
- `POST /carts` - Create a new order
- `PUT /carts/{id}` - Update an order
- `DELETE /carts/{id}` - Delete an order

---
