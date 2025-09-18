🛒 E-Commerce Backend  
This is the backend for an E-Commerce application, built with:  
Node.js – Runtime JavaScript  
Express – Web framework  
Prisma – ORM for PostgreSQL  
PostgreSQL – Relational database  
GitHub – Version control & repository  

🚀 Installation  
1. Clone the repository  
   git clone https://github.com/your-username/ecommerce-backend.git  
   cd ecommerce-backend  
2. Install dependencies  
   npm install  
3. Setup environment variables in .env  
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ecommerce?schema=public"  
   PORT=5000  
4. Run Prisma migration:  
   npx prisma migrate dev --name init  
5. Run the server  
   npm run dev  

🛠️ Features (planned)  
- User authentication  
- Product management  
- Shopping cart  
- Order & payment system  
- API documentation with Swagger  

