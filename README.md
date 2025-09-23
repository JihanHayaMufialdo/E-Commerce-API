# 🛒 E-Commerce API  
  
### This is the backend for an E-Commerce application, built with:  
+ Node.js – Runtime JavaScript  
+ Express – Web framework  
+ Prisma – ORM for PostgreSQL  
+ PostgreSQL – Relational database  
+ Docker - Containerization  
+ GitHub – Version control & repository  
  
## 🚀 Installation  
### 1. Clone the repository  
   git clone https://github.com/JihanHayaMufialdo/E-Commerce-API.git  
   cd E-Commerce-API  
### 2. Setup environment variables  
   DATABASE_URL="postgresql://postgres:yourpassword@e-commerce-api-db:5432/ecommerce?schema=public"  
   PORT=5000  
   JWT_SECRET="your_jwt_secret_here"  
   MIDTRANS_SERVER_KEY="your_midtrans_server_key"  
### 3. Build and run containers  
   docker-compose up --build  
### 4. Run Prisma migration & seed  
   docker-compose exec app npx prisma migrate dev --name init  
   docker-compose exec app npm run seed  
### 4. Start the server  
   docker-compose exec app npm run dev  
### 5. Access the API at  
   http://localhost:5000/api  
  
## 🛠️ Features  
### Authentication & Authorization  
- User registration & login with JWT  
- Role-based access (User, Admin)  
### User Management  
- View all users (admin only)  
- Secure password hashing  
### Product Management  
- Add, update, delete products (admin only)  
- View product catalog (public & user)  
### Shopping Cart  
- Add product to cart (quantity auto-updated if exists)  
- View cart items  
- Update or remove cart items  
### Order Management  
- Place order from cart  
- Order status: Pending → Paid / Cancelled  
- Cancel order (only if status is Pending)  
- Order history per user  
### Payment Integration  
- Integrated with **Midtrans** (sandbox/test mode)  
- Payment linked to order (no duplicate amount field)  
- Auto-update order status to PAID on successful payment  
### Admin Panel  
- Manage users  
- Manage products  
- Manage orders  
- Manage payments  

