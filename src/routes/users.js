/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get users
 *     description: >
 *       Retrieve the users.
 *       Requires a valid Json Web Token (JWT) with USER role.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request success
 *       500:
 *         description: Error fetching users
 */