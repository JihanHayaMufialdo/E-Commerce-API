/**
 * @swagger
 * /register:
 *   post:
 *     summary: User register
 *     description: >
 *       This endpoint simulates user registration.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: John Doe
 *               userEmail:
 *                 type: string
 *                 example: john@example.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: >
 *       This endpoint simulates user login. It returns a fake JWT token for testing.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: user@shop.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: >
 *       This endpoint simulates admin login. It returns a fake JWT token for testing.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: admin@example.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
