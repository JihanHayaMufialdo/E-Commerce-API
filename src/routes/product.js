/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description:
 *       Fetches a list of all products available in the store.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Create a new product
 *     description: |
 *       Retrieve all products. This endpoint requires admin role.
 *       To access, provide a valid JWT token in the Authorization header. 
 *       Use the "Authorize" button and enter: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMGZhNTdjLTliZmYtNGM4MC1iOGQyLWE1ZTVjNmQwYzAwZSIsInVzZXJSb2xlIjoiQURNSU4iLCJpYXQiOjE3NTg2OTczNTIsImV4cCI6MTc1ODc4Mzc1Mn0._vC2uFIik9hw8p_OKyAb61sSZ0iucP_HMK23aryAuCc to authenticate.
 *     tags: [Admin-Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productPrice
 *               - productStock
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Apple iPhone 14"
 *               productPrice:
 *                 type: integer
 *                 description: Price of the product
 *                 example: 12000000
 *               productStock:
 *                 type: integer
 *                 description: Available stock quantity
 *                 example: 15
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: >
 *       Allows an admin to update an existing product's name, price, or stock.
 *       Requires a valid JWT token for admin authorization.
 *     tags: [Admin-Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: New name of the product
 *                 example: "Apple iPhone 14 Pro"
 *               productPrice:
 *                 type: integer
 *                 description: New price of the product
 *                 example: 1300000
 *               productStock:
 *                 type: integer
 *                 description: New stock quantity
 *                 example: 30
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Invalid input or product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: >
 *       Allows an admin to delete an existing product by providing its ID.
 *       Requires a valid JWT token for admin authorization.
 *     tags: [Admin-Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Invalid product ID or product not found
 *       500:
 *         description: Internal server error
 */
 