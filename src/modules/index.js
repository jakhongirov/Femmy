const express = require("express")
const router = express.Router()

//Middlawares
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

// files
const admin = require('./admin/admin')
const users = require('./users/users')
const devices = require('./devices/devices')

router

  /**
   * components:
   *    securitySchemes:
   *       token:
   *       type: apiKey
   *       in: header
   *       name: token
   */

  // ADMIN API
  /** 
   * @swagger
   * components: 
   *     schemas: 
   *       Admin:
   *          type: object
   *          required: 
   *             - admin_email
   *             - admin_password
   *          properties:
   *             admin_id: 
   *                type: integer
   *                description: auto generate
   *             admin_email: 
   *                type: string
   *                description: admin's email
   *             admin_password:
   *                type: string
   *                description: admin put password for login and it hashing
   *             admin_create_at:
   *                type: string
   *                description: admin created date
   *          example:
   *             admin_id: 1
   *             admin_email: diyor.jakhongirov@gmail.com
   *             admin_password: 2jk3jnnj3nj43nb4j3bjeb3b23j
   *             admin_create_at: 2024-01-23 10:52:41 +0000
  */

  /**
   * @swagger
   * tags:
   *    name: Admin
   *    description: Admin managing API
   */

  /**
   * @swagger
   * /admin/list:
   *   get:
   *     summary: Returns the list of all the admins for Frontend developer
   *     tags: [Admin]
   *     security:
   *       - token: []
   *     parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema:
   *             type: string
   *          description: Authentication token
   *        - in: query
   *          name: limit
   *          schema:
   *             type: integer
   *          description: limit of list
   *        - in: query
   *          name: page
   *          schema:
   *             type: integer
   *          description: page of list
   *     responses:
   *       '200':
   *          description: The list of the admins
   *          content:
   *             application/json:
   *                schema:
   *                   type: array
   *                items:
   *                   $ref: '#/components/schemas/Admin'
   *          headers:
   *             token:
   *                description: Token for authentication
   *                schema:
   *                type: string
   *       '500':
   *          description: Some server error
   */

  .get('/admin/list', AUTH, admin.GET_ADMIN)

  /**
   * @swagger
   * /admin/register:
   *    post:
   *       summary: Register new admin for Frontend developer
   *       tags: [Admin]
   *       requestBody:
   *          required: true
   *          content: 
   *             application/json:
   *                schema:
   *                   $ref: '#/components/schemas/Admin'
   *       responses:
   *          200:
   *             description: Created new admin
   *             content:
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Admin'
   *          500:
   *             description: Some server error
   */

  .post('/admin/register', admin.REGISTER_ADMIN)

  /**
   * @swagger
   * /admin/login:
   *    post:
   *       summary: Login admin for Frontend developer
   *       tags: [Admin]
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   $ref: '#/components/schemas/Admin'
   *       responses:
   *          200:
   *             description: You logined
   *             content: 
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Admin' 
   *          500:
   *             description: Server error
   */

  .post('/admin/login', admin.LOGIN_ADMIN)

  /**
   * @swagger
   * /admin/edit:
   *    put:
   *       summary: Change admin's email and password for Frontend developer
   *       tags: [Admin]
   *       parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema:
   *             type: string
   *          description: Authentication token      
   *       security:
   *          - token: []
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   $ref: '#/components/schemas/Admin'
   *       responses:
   *          200:
   *             description: Changed data
   *             content: 
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Admin' 
   *             headers:
   *                token:
   *                   description: Token for authentication
   *                   schema:
   *                   type: string
   *          500:
   *             description: Server error
   */

  .put('/admin/edit', AUTH, admin.EDIT_ADMIN)

  /**
   * @swagger
   * /admin/delete:
   *    delete:
   *       summary: Delete admin for Frontend developer
   *       tags: [Admin]
   *       parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema:
   *             type: string
   *          description: Authentication token 
   *       security:
   *          - token: []
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   $ref: '#/components/schemas/Admin'
   *       responses:
   *          200:
   *             description: Deleted admin
   *             content: 
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Admin' 
   *             headers:
   *                token:
   *                   description: Token for authentication
   *                   schema:
   *                   type: string
   *          500:
   *             description: Server error
   */

  .delete('/admin/delete', AUTH, admin.DELETE_ADMIN)

  // USERS API
  /**
   * @swagger
   * components:
   *   schemas:
   *     Users:
   *       type: object
   *       required:
   *         - name
   *         - phone_number
   *       properties:
   *         id:
   *           type: integer
   *           description: auto generate
   *         name:
   *           type: string
   *           description: user's name
   *         phone_number:
   *           type: string
   *           description: user's phone number
   *         password:
   *           type: string
   *           description: user's password, auto hash
   *         weight:
   *           type: integer
   *           description: user's weight - 65.4 kg
   *         height:
   *           type: integer
   *           description: user's height - 1.87 m
   *         model_id:
   *           type: string
   *           description: user's model id
   *         expired_date:
   *           type: string
   *           description: user's premium expired date
   *         premium:
   *           type: boolean
   *           description: user's premium status
   *         avarage_period:
   *           type: string
   *           description: user's average period
   *         cycle_duration:
   *           type: string
   *           description: user's cycle duration
   *         chat_id:
   *           type: integer
   *           description: user's telegram chat_id
   *         bot_step:
   *           type: string
   *           description: telegram bot step
   *         telegram:
   *           type: boolean
   *           description: sign up with telegram
   *         created_at:
   *           type: string
   *           description: user creation date
   *       example:
   *         id: 1
   *         name: Hilola
   *         phone_number: +998991234567
   *         password: 2jk3jnnj3nj43nb4j3bjeb3b23jijjerjf#$%#$#$
   *         weight: 63.5
   *         height: 1.87
   *         model_id: 1
   *         expired_date: 12.12.2025
   *         premium: true
   *         avarage_period: 12.12.2024
   *         cycle_duration: 12.12.2024
   *         chat_id: null
   *         bot_step: null
   *         telegram: false
   *         created_at: 2024-01-23 10:52:41 +0000
   */

  /**
   * @swagger
   * tags:
   *    name: Users
   *    description: Users api documentation
   */

  /**
   * @swagger
   * /users/list:
   *   get:
   *     summary: Returns a list of all users, for Frontend developers
   *     tags: [Users]
   *     security:
   *       - token: []
   *     parameters:
   *       - in: header
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Authentication token
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Limit for the number of users in the list
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number for pagination
   *     responses:
   *       '200':
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Users'
   *         headers:
   *           token:
   *             description: Token for authentication
   *             schema:
   *               type: string
   *       '500':
   *         description: Server error
   */
  .get('/users/list', AUTH, users.GET_LIST)

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Get user data by ID
   *     tags: [Users]
   *     security:
   *       - token: []
   *     parameters:
   *       - in: header
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Authentication token
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User's ID
   *     responses:
   *       '200':
   *         description: User data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Users'
   *         headers:
   *           token: 
   *             description: Token for authentication
   *             schema:
   *               type: string
   *       '500':
   *         description: Server error
   */
  .get('/user/:id', AUTH, users.GET_ID)

  /**
    * @swagger
    * /user/register:
    *   post:
    *     summary: Register a new user
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *                 description: User's name
    *                 example: Hilola
    *               age:
    *                 type: integer
    *                 description: User's age
    *                 example: 19
    *               model_id:
    *                 type: string
    *                 description: User's model ID
    *                 example: 23
    *               phone_number:
    *                 type: string
    *                 description: User's phone number
    *                 example: +998991234567
    *               password:
    *                 type: string
    *                 description: User's password
    *                 example: 1234
    *               avarage_period:
    *                 type: string
    *                 description: User's average period
    *                 example: 23
    *               cycle_duration:
    *                 type: string
    *                 description: User's cycle duration
    *                 example: 28
    *     responses:
    *       '201':
    *         description: Successfully created a new user
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Users'
    *       '500':
    *         description: Server error
    */
  .post('/user/register', users.REGISTER_USER)

  /**
      * @swagger
      * /user/login:
      *   post:
      *     summary: Login user
      *     tags: [Users]
      *     requestBody:
      *       required: true
      *       content:
      *         application/json:
      *           schema:
      *             type: object
      *             properties:
      *               phone_number:
      *                 type: string
      *                 description: User's registered phone number
      *                 example: +998991234567
      *               password:
      *                 type: string
      *                 description: User's password
      *                 example: 1234
      *     responses:
      *       '200':
      *         description: Successful login
      *         content:
      *           application/json:
      *             schema:
      *               $ref: '#/components/schemas/Users'
      *       '500':
      *         description: Server error
      */
  .post('/user/login', users.LOGIN_USER)

  /**
   * @swagger
   * /user/edit:
   *   put:
   *     summary: Edit user's data
   *     tags: [Users]
   *     parameters:
   *       - in: header
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Authentication token
   *     security:
   *       - token: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 description: User's ID
   *                 example: 2
   *               name:
   *                 type: string
   *                 description: User's new name
   *                 example: Nodira
   *               age:
   *                 type: integer
   *                 description: User's new age
   *                 example: 20
   *               model_id:
   *                 type: string
   *                 description: User's new model ID
   *                 example: 4
   *               phone_number:
   *                 type: string
   *                 description: User's new phone number
   *                 example: +998987654321
   *               password:
   *                 type: string
   *                 description: User's new password
   *                 example: 4321
   *               avarage_period:
   *                 type: string
   *                 description: User's new average period
   *                 example: 12
   *               cycle_duration:
   *                 type: string
   *                 description: User's new cycle duration
   *                 example: 34
   *               expired_date:
   *                 type: string
   *                 description: User's new premium expiration date
   *                 example: 12.01.2025
   *               premium:
   *                 type: boolean
   *                 description: User's premium status (active/inactive)
   *                 example: true
   *               weight:
   *                 type: number
   *                 description: User's weight
   *                 example: 63.5
   *               height:
   *                 type: number
   *                 description: User's height
   *                 example: 1.67
   *     responses:
   *       '200':
   *         description: User data successfully updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Users'
   *       '500':
   *         description: Server error
   */
  .put('/user/edit', AUTH, users.EDIT_USER)

  /**
   * @swagger
   * /user/otp:
   *   post:
   *     summary: OTP
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                 code:
   *                   type: integer
   *                   description: OTP code
   *                   example: 566893
   *     responses:
   *       '200':
   *         description: Successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Users'
   *       '500':
   *          description: Server error
   */
  .post('/user/otp', users.OTP)

  /**
   * @swagger
   * /user/delete:
   *   delete:
   *     summary: Delete user from database
   *     tags: [Users]
   *     parameters:
   *       - in: header
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Authentication token
   *     security:
   *       - token: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 description: User's ID
   *                 example: 2
   *     responses:
   *       '200':
   *         description: User data deleted
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Users'
   *       '500':
   *         description: Server error
   */
  .delete('/user/delete', AUTH, users.DELETE_USER)

  // DEVICES API
  /**
   * @swagger
   * components:
   *    schemas:
   *       Devices:
   *          type: object
   *          required:
   *             - user_id
   *          properties:
   *             id: 
   *                type: integer
   *                description: auto generate
   *             user_id: 
   *                type: integer
   *                description: user's id
   *             phone_brnad:
   *                type: string
   *                description: user's phone brand name
   *             phone_lang:
   *                type: string
   *                description: user's phone langugage
   *             app_lang: 
   *                type: string
   *                description: user's application language
   *             platform:
   *                type: string
   *                description: user's device os
   *          example:
   *             id: 1
   *             user_id: 2
   *             phone_brand: iPhone
   *             phone_lang: eng
   *             app_lang: uz
   *             platform: ios
   *             created_at: 2024-01-23 10:52:41 +0000
   */

  /**
   * @swagger
   * tags:
   *    name: Devices
   *    description: Devices api documentation
   */

  /**
   * @swagger
   * /devices/list:
   *    get:
   *       summary: Returns a list of all devices, for Frontend developers
   *       tags: [Devices]
   *       security:
   *          - token: []
   *       parameters:
   *          - in: header
   *            name: token
   *            required: true
   *            schema:
   *               type: string
   *            description: Authentication token
   *          - in: query
   *            name: limit
   *            schema:
   *               type: integer
   *            description: Limit for the number of devices in the list
   *          - in: query
   *            name: page
   *            schema:
   *               type: integer
   *            description: Page number for pagination
   *       responses:
   *         '200':
   *             description: A list of devices
   *             content:
   *                application/json:
   *                   schema:
   *                      type: array
   *                      items:
   *                         $ref: '#/components/schemas/Devices'
   *         headers:
   *          token:
   *             description: Token for authentication
   *             schema:
   *                type: string
   *         '500':
   *           description: Server error 
   */
  .get('/devices/list', AUTH, devices.GET)

  /**
   * @swagger
   * /devices/{user_id}:
   *    get:
   *       summary: Get devices data by user id
   *       tags: [Devices]
   *       security:
   *          - token: []
   *       parameters:
   *          - in: header
   *            name: token
   *            required: true
   *            schema:
   *               type: string
   *            description: Authentication token
   *          - in: path
   *            name: user_id
   *            required: true
   *            schema:
   *               type: integer
   *            description: User's ID
   *       responses:
   *          '200':
   *             description: User's devices data retrieved successfully
   *             content:
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Devices'
   *             headers:
   *                token:
   *                   description: Token for authentication
   *                   schema:
   *                      type: string
   *          '500':
   *             description: Server error
   */
  .get('/devices/:user_id', AUTH, devices.GET_USER_ID)

  /**
   * @swagger
   * /device/add:
   *    post:
   *       summary: Add user's device
   *       tags: [Devices]
   *       parameters:
   *          - in: header
   *            name: token
   *            required: true
   *            schema:
   *               type: string
   *            description: Authentication token
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   type: object
   *                   properties:
   *                      user_id:
   *                         type: integer
   *                         description: User's id
   *                         example: 2
   *                      phone_brand: 
   *                         type: string
   *                         description: User's device brand
   *                         example: iPhone
   *                      phone_lang:
   *                         type: string
   *                         description: User's device language
   *                         example: en
   *                      app_lang:
   *                         type: string
   *                         description: User's application language
   *                         example: uz
   *                      platform:
   *                         type: string
   *                         description: User's device platform
   *                         example: ios
   *       responses:
   *          '201':
   *             description: Successfully created a new user's device
   *             content:
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Devices'
   *          '500':
   *             description: Server error
   */
  .post('/device/add', AUTH, devices.ADD_DEVICE)

  /**
   * @swagger
   * /device/edit:
   *    put:
   *       summary: Edit user's device
   *       tags: [Devices]
   *       parameters:
   *          - in: header
   *            name: token
   *            required: true
   *            schema:
   *                type: string
   *            description: Authentication token
   *       security:
   *          - token: []
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   type: object
   *                   properties:
   *                      id:
   *                         type: integer
   *                         description: User's device id
   *                         example: 1
   *                      user_id:
   *                         type: integer
   *                         description: User id
   *                         example: 2
   *                      phone_brand:
   *                         type: string
   *                         description: User's device brand
   *                         example: iPhone
   *                      phone_lang:
   *                         type: string
   *                         description: User's device language
   *                         example: en
   *                      app_lang:
   *                         type: string
   *                         description: User's application language
   *                         example: uz
   *                      platform:
   *                         type: string
   *                         description: User's device platform
   *                         example: ios
   *       responses:
   *          '200':
   *             description: User's device data successfully updated
   *             content:
   *                application/json:
   *                   schema: 
   *                      $ref: '#/components/schemas/Devices'
   *          '500':
   *             description: Server error
   */
  .put('/device/edit', AUTH, devices.EDIT_DEVICE)

  /**
   * @swagger
   * /device/delete:
   *    delete:
   *       summary: Delete user's device from database
   *       tags: [Devices]
   *       parameters:
   *          - in: header
   *            name: token
   *            required: true
   *            schema:
   *               type: string
   *            description: Authentication token
   *       security:
   *          - token: []
   *       requestBody:
   *          required: true
   *          content:
   *             application/json:
   *                schema:
   *                   type: object
   *                   properties:
   *                      id:
   *                         type: integer
   *                         description: User's device ID
   *                         example: 1
   *       responses:
   *          '200':
   *             description: User' device data deleted
   *             content: 
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Devices'
   *          '500':
   *             description: Server error
   */
  .delete('/device/delete', AUTH, devices.DELETE_DEVICE)

module.exports = router
