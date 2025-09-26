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
 *         description: Request success
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Retrieve all products detail
 *     description:
 *       Fetches a list of all products available.
 *       Requires a valid Json Web Token (JWT) with ADMIN role.
 *     tags: [Admin-Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request success
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Create a new product
 *     description: |
 *       Create a new product. This endpoint requires admin role.
 *       Requires a valid Json Web Token (JWT) with ADMIN role.
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
 *         description: Product created
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
 *       Requires a valid Json Web Token (JWT) with ADMIN role.
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
 *       401:
 *         description: Unauthorized, token missing or invalid
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
 *       Requires a valid Json Web Token (JWT) with ADMIN role.
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
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
 