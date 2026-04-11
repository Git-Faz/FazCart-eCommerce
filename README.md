<div align="center">

# 🛒 FazCart

### A Modern Full-Stack eCommerce Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*A feature-rich, production-ready eCommerce application built with a React + TypeScript frontend and a Java Spring Boot REST API backend.*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
  - [Frontend](#-frontend)
  - [Backend](#-backend)
  - [Infrastructure](#-infrastructure)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Docker Setup](#docker-setup)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

**FazCart** is a full-stack eCommerce platform designed for performance and scalability. The frontend delivers a modern, responsive shopping experience powered by React 19 and Tailwind CSS, while the backend provides a secure, rate-limited REST API built with Spring Boot, Spring Security (JWT), and PostgreSQL.

---

## ✨ Features

- 🔐 **Authentication & Authorization** — JWT-based register/login with Spring Security
- 🛍️ **Product Catalog** — Browse, filter, and view detailed product pages
- 🛒 **Shopping Cart** — Add, update, and remove items in real time
- 📦 **Order Management** — Checkout flow and full order history tracking
- 👤 **User Profile** — View and manage account details
- 🌙 **Dark / Light Mode** — System-aware theme switching
- 🚦 **Rate Limiting** — Bucket4j-powered API throttling to prevent abuse
- 📄 **API Docs** — Interactive Swagger UI via SpringDoc OpenAPI
- 🐳 **Docker Ready** — Multi-stage Dockerfile for clean, optimized backend images

---

## 🧰 Tech Stack

### 🖥️ Frontend

| Technology | Purpose |
|---|---|
| [![React](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=white)](https://react.dev/) | Core UI framework |
| [![TypeScript](https://img.shields.io/badge/TypeScript%205.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Static typing |
| [![Vite](https://img.shields.io/badge/Vite%207-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | Build tool & dev server |
| [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | Utility-first styling |
| [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) | Accessible component library |
| [![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?logo=radixui&logoColor=white)](https://www.radix-ui.com/) | Headless UI primitives |
| [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/) | Global state management |
| [![TanStack Query](https://img.shields.io/badge/TanStack%20Query%20v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query) | Server state & data fetching |
| [![React Router](https://img.shields.io/badge/React%20Router%20v7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/) | Client-side routing |
| [![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/) | HTTP client |
| [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/) | Animations & transitions |
| [![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)](https://threejs.org/) | 3D background graphics |
| [![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/) | Lightweight local state |
| [![Sonner](https://img.shields.io/badge/Sonner-000000?logo=sonner&logoColor=white)](https://sonner.emilkowal.ski/) | Toast notifications |
| [![next-themes](https://img.shields.io/badge/next--themes-000000?logo=nextdotjs&logoColor=white)](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [![Lucide React](https://img.shields.io/badge/Lucide%20React-F56040?logo=lucide&logoColor=white)](https://lucide.dev/) | Icon library |

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| [![Java 17](https://img.shields.io/badge/Java%2017-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/17/) | Core language |
| [![Spring Boot](https://img.shields.io/badge/Spring%20Boot%203.5-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot) | Application framework |
| [![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security) | Authentication & authorization |
| [![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-data-jpa) | ORM & database access layer |
| [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/) | Relational database |
| [![JWT](https://img.shields.io/badge/JWT%20(JJWT%200.12)-000000?logo=jsonwebtokens&logoColor=white)](https://github.com/jwtk/jjwt) | Stateless authentication tokens |
| [![Bucket4j](https://img.shields.io/badge/Bucket4j%208-0080FF?logoColor=white)](https://bucket4j.com/) | API rate limiting |
| [![SpringDoc OpenAPI](https://img.shields.io/badge/SpringDoc%20OpenAPI-6DB33F?logo=swagger&logoColor=white)](https://springdoc.org/) | Swagger UI documentation |
| [![Lombok](https://img.shields.io/badge/Lombok-BC1C1C?logoColor=white)](https://projectlombok.org/) | Boilerplate code reduction |
| [![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)](https://maven.apache.org/) | Build & dependency management |

### 🐳 Infrastructure

| Technology | Purpose |
|---|---|
| [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) | Backend containerization (multi-stage build) |

---

## 🏗️ Architecture

```
FazCart-eCommerce/
├── frontend/          # React + TypeScript SPA (Vite)
│   └── src/
│       ├── app/       # Redux store, Axios instance, theme config
│       ├── components/# Shared visual components (3D, animations)
│       ├── features/  # Feature modules (auth, cart, orders, products, user)
│       ├── pages/     # Route-level page components
│       ├── routes/    # App routing configuration
│       └── shared/    # Shared utilities and UI
│
└── backend/           # Spring Boot REST API
    └── src/main/java/com/faz/ecommerce/
        ├── config/    # Security & OpenAPI configuration
        ├── controller/# REST controllers (Auth, Cart, Order, Product, User)
        ├── dto/       # Request/Response data transfer objects
        ├── entity/    # JPA entities (User, Product, Cart, Order)
        ├── repository/# Spring Data JPA repositories
        ├── security/  # JWT filter, rate limiter, user details
        └── service/   # Business logic layer
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+ & npm
- **Java** 17+
- **Maven** 3.9+
- **PostgreSQL** 14+
- **Docker** (optional)

---

### Backend Setup

1. **Create the PostgreSQL database:**

   ```sql
   CREATE DATABASE ecommerce;
   ```

2. **Configure credentials** in `backend/src/main/resources/application-dev.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the application:**

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`.

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

### Docker Setup

Build and run the backend in a Docker container:

```bash
cd backend
docker build -t fazcart-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/ecommerce \
  -e SPRING_DATASOURCE_USERNAME=your_username \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  fazcart-backend
```

---

## 📄 API Documentation

Once the backend is running, interactive API docs are available at:

```
http://localhost:8080/swagger-ui.html
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/{id}` | Get product details |
| `GET` | `/api/cart` | Get current user's cart |
| `POST` | `/api/cart` | Add item to cart |
| `DELETE` | `/api/cart/{id}` | Remove item from cart |
| `POST` | `/api/orders` | Place an order (checkout) |
| `GET` | `/api/orders` | Get order history |
| `GET` | `/api/user/profile` | Get user profile |

---

## 📁 Project Structure

<details>
<summary><strong>Frontend</strong></summary>

```
frontend/src/
├── app/
│   ├── store.ts          # Redux store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   ├── axios.ts          # Axios instance with JWT interceptor
│   └── theme/            # Theme tokens and config
├── components/
│   ├── FloatingLines.tsx  # Animated background (Three.js / OGL)
│   └── ShapeGrid.tsx      # Decorative grid component
├── features/
│   ├── auth/             # Login, register, auth state (Redux slice)
│   ├── cart/             # Cart management
│   ├── orders/           # Order placement and history
│   ├── products/         # Product listing & detail queries
│   └── user/             # User profile
├── pages/
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── Products.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Order.tsx
│   └── UserProfile.tsx
└── routes/
    └── AppRoutes.tsx     # React Router configuration
```

</details>

<details>
<summary><strong>Backend</strong></summary>

```
backend/src/main/java/com/faz/ecommerce/
├── config/
│   ├── SecurityConfig.java    # Spring Security & CORS config
│   └── OpenApiConfig.java     # Swagger / OpenAPI config
├── controller/
│   ├── AuthController.java
│   ├── CartController.java
│   ├── OrderController.java
│   ├── ProductController.java
│   └── UserController.java
├── dto/                       # Request & Response DTOs
├── entity/
│   ├── User.java
│   ├── Product.java
│   ├── CartItem.java
│   ├── Order.java
│   └── OrderItem.java
├── enums/
│   └── OrderStatus.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── BadRequestException.java
│   └── UnauthorizedException.java
├── repository/                # Spring Data JPA repositories
├── security/
│   ├── JwtUtil.java
│   ├── JwtAuthenticationFilter.java
│   ├── RateLimitFilter.java   # Bucket4j rate limiting
│   └── CustomUserDetails.java
└── service/                   # Business logic
```

</details>

---

<div align="center">

Made with ❤️ by **Faz**

</div>
