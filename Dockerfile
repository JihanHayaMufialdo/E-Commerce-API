# Step 1: Use official Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Step 4: Copy all project files
COPY . .

# Step 5: Generate Prisma client
RUN npx prisma generate

# Step 6: Expose port (sesuaikan dengan port aplikasi, misalnya 5000)
EXPOSE 5000

# Step 7: Run the app
CMD ["npm", "start"]
