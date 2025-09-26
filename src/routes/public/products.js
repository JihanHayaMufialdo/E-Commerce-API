/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Fetches a list of all products available in the store.
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
 *     description: Fetches a list of all products available.
 *     tags: [Admin-Products]
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
 *     description: Create a new product with name, price, and stock.
 *     tags: [Admin-Products]
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
 *                 example: "Apple iPhone 17"
 *               productPrice:
 *                 type: integer
 *                 example: 23000000
 *               productStock:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update an existing product's name, price, or stock.
 *     tags: [Admin-Products]
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
 *                 example: "Apple iPhone 14 Pro"
 *               productPrice:
 *                 type: integer
 *                 example: 13000000
 *               productStock:
 *                 type: integer
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
 *     description: Delete an existing product by providing its ID.
 *     tags: [Admin-Products]
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
