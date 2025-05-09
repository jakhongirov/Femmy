const express = require("express")
const router = express.Router()

//Middlawares
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

// files
const admin = require('./admin/admin')
const users = require('./users/users')
const devices = require('./devices/devices')
const categoiresArticle = require('./categories/categories')
const articles = require('./articles/articles')
const ai = require('./ai/ai')
const price = require('./price/price')
const payment = require('./payment/payment')
const banners = require('./banners/banners')

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
   *         email:
   *           type: string
   *           description: user's email
   *         password:
   *           type: string
   *           description: user's password, auto hash
   *         weight:
   *           type: integer
   *           description: user's weight - 65.4 kg
   *         height:
   *           type: integer
   *           description: user's height - 1.87 m
   *         mode_id:
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
   *         last_period_date:
   *           type: string
   *           description: user's last period date
   *         fetal_age:
   *           type: string
   *           description: user's last fetal age
   *         baby_born_date:
   *           type: string
   *           description: user's last baby born date
   *         chat_id:
   *           type: integer
   *           description: user's telegram chat_id
   *         bot_step:
   *           type: string
   *           description: telegram bot step
   *         telegram:
   *           type: boolean
   *           description: sign up with telegram
   *         nimadir:
   *           type: boolean
   *           description: user's nimadir
   *         pincode:
   *           type: string
   *           description: user's pincode
   *         tracking:
   *           type: string
   *           description: user's tracking
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
   *         mode_id: 1
   *         expired_date: 12.12.2025
   *         premium: true
   *         avarage_period: 12.12.2024
   *         cycle_duration: 12.12.2024
   *         last_period_date: 12.12.2024
   *         fetal_age: 12
   *         baby_born_date: 12.12.2024
   *         chat_id: null
   *         bot_step: null
   *         telegram: false
   *         nimadir: true
   *         pincode: 123ka
   *         tracking: ["12.04.2025 12:50"]
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
   *       - in: query
   *         name: id
   *         required: false
   *         schema:
   *           type: integer
   *       - in: query
   *         name: phone
   *         required: false
   *         schema:
   *           type: string
   *         description: user 
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
   * /user/admin/{user_id}:
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
   *         name: user_id
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
  .get('/user/admin/:user_id', AUTH, users.GET_ID)

  /**
   * @swagger
   * /user/{user_id}:
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
   *         name: user_id
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
  .get('/user/:user_id', AUTH, users.GET_ID_TRACKING)

  /**
   * @swagger
   * /user/status/{user_id}:
   *   get:
   *     summary: Get user status by ID
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
   *         name: user_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: User data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: John Doe
   *                     premium:
   *                       type: boolean
   *                       example: true
   *                     nimadir:
   *                       type: string
   *                       example: Some additional info
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: Not found
   *       500:
   *         description: Internal server error
   */
  .get('/user/status/:user_id', AUTH, users.GET_STATUS)

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
    *               mode_id:
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
    *               last_period_date:
    *                 type: string
    *                 description: User's last period date
    *                 example: 12.12.2024
    *               fetal_age:
    *                 type: string
    *                 description: User's fetal age
    *                 example: 12
    *               baby_born_date:
    *                 type: string
    *                 description: User's baby born date
    *                 example: 12.12.2024
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
    * /user/register/email:
    *   post:
    *     summary: Register user by email
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content: 
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               email:
    *                 type: string
    *                 description: User's registered email
    *                 example: diyor.jakhongirov@icloud.com
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
  .post('/user/register/email', users.REGISTER_EMAIL)


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
   *               mode_id:
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
   *               last_period_date:
   *                 type: string
   *                 description: User's last period date
   *                 example: 12.12.2024
   *               fetal_age:
   *                 type: string
   *                 description: User's fetal age
   *                 example: 12
   *               baby_born_date:
   *                 type: string
   *                 description: User's baby born date
   *                 example: 12.12.2024
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
   *               nimadir:
   *                 type: boolean
   *                 description: User's nimadir
   *                 example: true
   *               pincode:
   *                 type: string
   *                 description: User's pincode
   *                 example: 234ka
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

  // CATEGORIES ARTICLE API
  /**
   * @swagger
   * components:
   *    schemas:
   *      Categories:
   *        type: object
   *        required:
   *          - name
   *          - lang
   *          - type
   *        properties:
   *          id: 
   *            type: integer
   *            description: auto generate
   *          name:
   *            type: string
   *            description: category's name
   *          lang: 
   *            type: string
   *            description: category's language
   *          type:
   *            type: string
   *            description: category's type
   *          html_code:
   *            type: string
   *            description: category's html_code
   *          image_url:
   *            type: string
   *            description: category's image link
   *          image_name:
   *            type: string
   *            description: category's name
   *          free:
   *            type: boolean
   *            description: category's free or for premium users
   *          created_at:
   *            type: string
   *            description: category creation date
   *        example:
   *          id: 1,
   *          name: Nimadir
   *          lang: uz
   *          type: bilmima
   *          image_url: https://srvr.femmy.uz/public/images/nmadr.jpg
   *          image_name: nmadr.jpg
   *          free: false
   *          created_at: 2024-01-23 10:52:41 +0000
   */

  /**
   * @swagger
   * tags:
   *    name: Categories
   *    description: Categories article api documentation
   */

  /**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a list of all categories, optionally filtered by language
 *     tags: [Categories]
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
 *         name: lang
 *         required: false
 *         schema: 
 *           type: string
 *         description: Filter categories by language (optional)
 *     responses:
 *       '200':
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categories'
 *         headers:
 *           token:
 *             description: Authentication token
 *             schema:
 *               type: string
 *       '500':
 *         description: Internal server error
 */
  .get('/categories', categoiresArticle.GET)

  /**
 * @swagger
 * /categories/article:
 *   get:
 *     summary: Returns a list of all categories with article, optionally filtered by language
 *     tags: [Categories]
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
 *         name: lang
 *         required: true
 *         schema: 
 *           type: string
 *         description: Filter categories by language
 *       - in: query
 *         name: type
 *         required: false
 *         schema: 
 *           type: string
 *         description: Filter categories by type
 *     responses:
 *       '200':
 *         description: A list of categories with article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categories'
 *         headers:
 *           token:
 *             description: Authentication token
 *             schema:
 *               type: string
 *       '500':
 *         description: Internal server error
 */
  .get('/categories/article', categoiresArticle.GET_LIST)

  /**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Returns category with article
 *     tags: [Categories]
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
 *         description: Filter categories by id
 *     responses:
 *       '200':
 *         description: A categor with article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categories'
 *         headers:
 *           token:
 *             description: Authentication token
 *             schema:
 *               type: string
 *       '500':
 *         description: Internal server error
 */
  .get('/category/:id', categoiresArticle.GET_ID)

  /**
   * @swagger
   * /category/add:
   *    post:
   *      summary: Create a new category
   *      tags: [Categories]
   *      security:
   *        - token: []
   *      parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema:
   *            type: string
   *          description: Authentication token
   *      requestBody:
   *          required: true
   *          content:
   *            multipart/form-data:
   *              schema:
   *                type: object
   *                properties:
   *                  image:
   *                    type: string
   *                    format: binary
   *                    description: category's image
   *                  name:
   *                    type: string
   *                    description: category's name
   *                    example: nimadir
   *                  lang:
   *                    type: string
   *                    description: category's language
   *                    example: uz
   *                  type:
   *                    type: string
   *                    description: category's type
   *                    example: bilmima
   *                  html_code:
   *                    type: string
   *                    description: category's html_code
   *                    example: bilmima
   *                  free:
   *                    type: boolean
   *                    description: category's free or for premium users
   *                    example: true
   *      responses:
   *        '201':
   *          description: Successfully created a new category article
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Categories'
   *        '500':
   *          description: Server error      
   */
  .post('/category/add', AUTH, FileUpload.single('image'), categoiresArticle.ADD_CATEGORY)

  /**
   * @swagger
   * /category/edit:
   *    put:
   *      summary: Edit a category
   *      tags: [Categories]
   *      security:
   *        - token: []
   *      parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema: 
   *            type: string
   *          description: Authentication token
   *      requestBody:
   *          required: true
   *          content:
   *            multipart/form-data:
   *              schema:
   *                type: object
   *                properties:
   *                  id:
   *                    type: integer
   *                    description: category's id
   *                    example: 1
   *                  image:
   *                    type: string
   *                    format: binary
   *                    description: category's image
   *                  name:
   *                    type: string
   *                    description: category's name
   *                    example: nimadir
   *                  lang:
   *                    type: string
   *                    description: category's language
   *                    example: uz
   *                  type:
   *                    type: string
   *                    description: category's type
   *                    example: bilmima
   *                  html_code:
   *                    type: string
   *                    description: category's html_code
   *                    example: bilmima
   *                  free:
   *                    type: boolean
   *                    description: category's free or for premium users
   *                    example: true
   *      responses:
   *        '200':
   *          description: Successfully edit a category article
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Categories'
   *        '500':
   *          description: Server error      
   */
  .put('/category/edit', AUTH, FileUpload.single('image'), categoiresArticle.EDIT_CATEGORY)

  /**
  * @swagger
  * /category/delete:
  *    delete:
  *       summary: Delete category from database
  *       tags: [Categories]
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
  *                         description: Category's id
  *                         example: 1
  *       responses:
  *          '200':
  *             description: Category deleted
  *             content: 
  *                application/json:
  *                   schema:
  *                      $ref: '#/components/schemas/Categories'
  *          '500':
  *             description: Server error
  */
  .delete('/category/delete', AUTH, categoiresArticle.DELETE_CATEGORY)

  // ARTICLE API
  /**
   * @swagger
   * components:
   *    schemas:
   *      Articles:
   *        type: object
   *        required:
   *          - category_id
   *          - title
   *          - description
   *        properties:
   *          id:
   *            type: integer
   *            description: auto generate
   *          category_id:
   *            type: integer
   *            description: category's id
   *          title:
   *            type: string
   *            description: article's title
   *          description:
   *            type: string
   *            description: article text
   *          html_code:
   *            type: string
   *            description: article html_code
   *          image_url:
   *            type: string
   *            description: article image url
   *          image_name:
   *            type: string
   *            description: article image name
   *          source:
   *            type: string
   *            description: article source
   *          video_url:
   *            type: string
   *            description: article video url
   *          featured:
   *            type: boolean
   *            decription: article featured
   *          free:
   *            type: boolean
   *            decription: article for premium users
   *          created_at:
   *            type: string
   *            decription: article created time
   *        example:
   *          id: 1
   *          category_id: 1
   *          title: Nimadir nimadir
   *          description: lorem2000
   *          image_url: https://srvr.femmy.uz/public/images/nmadr.jpg
   *          image_name: nmadr.jpg
   *          source: bla bla bla bla
   *          video_url: https://youtube.com
   *          featured: true
   *          free: false
   *          created_at: 2024-01-23 10:52:41 +0000
   */

  /**
   * @swagger
   * tags:
   *    name: Articles
   *    description: Articles article api documentation
   */

  /**
   * @swagger
   *  /articles/list:
   *    get:
   *      summary: Returns a list of all articles, optionally filtered by categories
   *      tags: [Articles]
   *      security: 
   *        - token: []
   *      parameters:
   *        - in: header
   *          name: token
   *          required: true
   *          schema:
   *            type: string
   *          description: Authentication token
   *        - in: query
   *          name: category_id
   *          required: false
   *          schema: 
   *            type: integer
   *          description: Filter articles by category ID (optional)
   *        - in: query
   *          name: search
   *          required: false
   *          schema: 
   *            type: string
   *          description: Filter articles by title (optional)
   *        - in: query
   *          name: limit
   *          required: true
   *          schema:
   *            type: integer
   *          description: Limit for the number of articles in the list
   *        - in: query
   *          name: page
   *          required: true
   *          schema:
   *            type: integer
   *          description: Page number for pagination
   *      responses:
   *        '200':
   *          description: A list of articles
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Articles'
   *        '500':
   *          description: Server error
   */
  .get('/articles/list', articles.GET)

  /**
   * @swagger
   * /article/{id}:
   *    get:
   *       summary: Get article data by user id
   *       tags: [Articles]
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
   *            name: id
   *            required: true
   *            schema:
   *               type: integer
   *            description: Article's ID
   *       responses:
   *          '200':
   *             description: Article's data retrieved successfully
   *             content:
   *                application/json:
   *                   schema:
   *                      $ref: '#/components/schemas/Articles'
   *             headers:
   *                token:
   *                   description: Token for authentication
   *                   schema:
   *                      type: string
   *          '500':
   *             description: Server error
   */
  .get('/article/:id', articles.GET_ID)

  /**
 * @swagger
 * /article/add:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security: 
 *       - token: []
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema: 
 *           type: string
 *         description: Authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Article's image
 *               category_id:
 *                 type: integer
 *                 description: Category's ID
 *                 example: 1
 *               title: 
 *                 type: string
 *                 description: Article's title
 *                 example: Nimadir
 *               description: 
 *                 type: string
 *                 description: Article text
 *                 example: Lorem ipsum dolor sit amet
 *               html_code: 
 *                 type: string
 *                 description: Article html_code
 *                 example: Lorem ipsum dolor sit amet
 *               source:
 *                 type: string
 *                 description: Article source
 *                 example: nimadir bla bla
 *               video_url:
 *                 type: string
 *                 description: Article video URL
 *                 example: https://youtube.com
 *               featured:
 *                 type: boolean
 *                 description: Whether the article is featured
 *                 example: true
 *               free: 
 *                 type: boolean  
 *                 description: Whether the article is free for premium users
 *                 example: false
 *     responses:
 *       '201':
 *         description: Successfully created a new article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       '500':
 *         description: Server error
 */
  .post('/article/add', AUTH, FileUpload.single('image'), articles.ADD_ARTICLE)

  /**
  * @swagger
  * /article/edit:
  *   put:
  *     summary: Edit an article
  *     tags: [Articles]
  *     security: 
  *       - token: []
  *     parameters:
  *       - in: header
  *         name: token
  *         required: true
  *         schema: 
  *           type: string
  *         description: Authentication token
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               id:
  *                 type: integer
  *                 description: article's id
  *                 example: 1
  *               image:
  *                 type: string
  *                 format: binary
  *                 description: Article's image
  *               category_id:
  *                 type: integer
  *                 description: Category's ID
  *                 example: 1
  *               title: 
  *                 type: string
  *                 description: Article's title
  *                 example: Nimadir
  *               description: 
  *                 type: string
  *                 description: Article text
  *                 example: Lorem ipsum dolor sit amet
  *               html_code: 
  *                 type: string
  *                 description: Article html_code
  *                 example: Lorem ipsum dolor sit amet
  *               source:
  *                 type: string
  *                 description: Article source
  *                 example: nimadir bla bla
  *               video_url:
  *                 type: string
  *                 description: Article video URL
  *                 example: https://youtube.com
  *               featured:
  *                 type: boolean
  *                 description: Whether the article is featured
  *                 example: true
  *               free: 
  *                 type: boolean  
  *                 description: Whether the article is free for premium users
  *                 example: false
  *     responses:
  *       '200':
  *         description: Successfully edited an article
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Articles'
  *       '500':
  *         description: Server error
  */
  .put('/article/edit', AUTH, FileUpload.single('image'), articles.EDIT_ARTICLE)

  /**
 * @swagger
 * /article/delete:
 *    delete:
 *       summary: Delete article from database
 *       tags: [Articles]
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
 *                         description: Article's id
 *                         example: 1
 *       responses:
 *          '200':
 *             description: Article deleted
 *             content: 
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Articles'
 *          '500':
 *             description: Server error
 */
  .delete('/article/delete', AUTH, articles.DELETE_ARTICLE)

  // AI
  /**
   * @swagger
   * components:
   *   schemas:
   *     AI:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *           example: GPT-4 Bot
   *         token:
   *           type: string
   *           example: sk-abc123token
   *         mode_id:
   *           type: integer
   *           example: 2
   *         prompt:
   *           type: string
   *           example: You are an expert virtual assistant. Answer concisely.
   *         model:
   *           type: string
   *           example: 3.5
   *         questions:
   *           type: string
   *           example: ["lorem", "niamdir"]
   *         created_at:
   *           type: string
   *           format: date-time
   *           example: "2025-04-13T12:00:00Z"
   */

  /**
   * @swagger
   * tags:
   *    name: AI
   *    description: AI managing API
   */

  /**
   * @swagger
   * /ai/list:
   *   get:
   *     summary: Retrieve a list of all AI configurations
   *     tags: [AI]
   *     responses:
   *       200:
   *         description: A list of AI configs
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/AI'
   *       404:
   *         description: No AI configurations found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: Not found
   *       500:
   *         description: Internal server error
   */
  .get('/ai/list', AUTH, ai.GET)

  /**
   * @swagger
   * /ai/{mode_id}:
   *   get:
   *     summary: Get a single AI config by its mode ID
   *     tags: [AI]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: mode_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The mode ID of the AI configuration
   *     responses:
   *       200:
   *         description: AI configuration found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/AI'
   *       404:
   *         description: AI configuration not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: Not found
   *       500:
   *         description: Internal server error
   */
  .get('/ai/:mode_id', AUTH, ai.GET_MODE_ID)

  /**
   * @swagger
   * /ai/add:
   *   post:
   *     summary: Add a new AI configuration
   *     tags: [AI]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - token
   *               - mode_id
   *               - prompt
   *             properties:
   *               name:
   *                 type: string
   *                 example: ChatGPT Turbo
   *               token:
   *                 type: string
   *                 example: sk-xxx-your-openai-token
   *               mode_id:
   *                 type: integer
   *                 example: 1
   *               prompt:
   *                 type: string
   *                 example: You are a helpful assistant that answers in a friendly tone.
   *               model:
   *                 type: string
   *                 example: GPT 3.5
   *               questions:
   *                 type: array
   *                 items:
   *                   type: string
   *                 example: ["lorem", "kimdir"]
   *     responses:
   *       201:
   *         description: AI configuration created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 201
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/AI'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal server error
   */
  .post('/ai/add', AUTH, ai.ADD_AI)

  /**
   * @swagger
   * /ai/edit:
   *   put:
   *     summary: Edit an existing AI configuration
   *     tags: [AI]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *               - name
   *               - token
   *               - mode_id
   *               - prompt
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 1
   *               name:
   *                 type: string
   *                 example: ChatGPT Turbo
   *               token:
   *                 type: string
   *                 example: sk-xxx-your-openai-token
   *               mode_id:
   *                 type: integer
   *                 example: 1
   *               prompt:
   *                 type: string
   *                 example: You are a helpful assistant that answers in a friendly tone.
   *               model:
   *                 type: string
   *                 example: GPT 3.5
   *               questions:
   *                 type: array
   *                 items:
   *                   type: string
   *                 example: ["lorem", "kimdir"]
   *     responses:
   *       200:
   *         description: AI configuration updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/AI'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal server error
   */
  .put('/ai/edit', AUTH, ai.EDIT_AI)

  /**
   * @swagger
   * /ai/delete:
   *   delete:
   *     summary: Delete an AI configuration by ID
   *     tags: [AI]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: AI configuration deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   example: { id: 1 }
   *       400:
   *         description: Bad request (e.g., ID not found)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal server error
   */
  .delete('/ai/delete', AUTH, ai.DELETE_AI)

  // Price
  /**
  * @swagger
  * components:
  *   schemas:
  *     Price:
  *       type: object
  *       properties:
  *         id:
  *           type: integer
  *           example: 1
  *         title_uz:
  *           type: string
  *           example: "Bir oylik obuna"
  *         title_ru:
  *           type: string
  *           example: "Подписка на месяц"
  *         title_eng:
  *           type: string
  *           example: "One month subscription"
  *         period:
  *           type: integer
  *           description: Duration of the subscription in days
  *           example: 30
  *         price:
  *           type: integer
  *           description: Price in smallest currency unit (e.g., cents or tiyin)
  *           example: 25000
  *         sort_order:
  *           type: integer
  *           description: Order for displaying prices
  *           example: 1
  *         create_at:
  *           type: string
  *           format: date-time
  *           example: "2025-04-13T10:20:30Z"
  */

  /**
   * @swagger
   * tags:
   *    name: Price
   *    description: Price managing API
   */

  /**
  * @swagger
  * /price:
  *   get:
  *     summary: Get list of all prices
  *     tags:
  *       - Price
  *     responses:
  *       200:
  *         description: List of prices retrieved successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 status:
  *                   type: integer
  *                   example: 200
  *                 message:
  *                   type: string
  *                   example: Success
  *                 data:
  *                   type: array
  *                   items:
  *                     $ref: '#/components/schemas/Price'
  *       404:
  *         description: No prices found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 status:
  *                   type: integer
  *                   example: 404
  *                 message:
  *                   type: string
  *                   example: Not found
  *       500:
  *         description: Internal Server Error
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 status:
  *                   type: integer
  *                   example: 500
  *                 message:
  *                   type: string
  *                   example: Interval Server Error
  */
  .get('/price', price.GET)

  /**
   * @swagger
   * /price:
   *   post:
   *     summary: Add a new price plan
   *     tags:
   *       - Price
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title_uz
   *               - title_ru
   *               - title_eng
   *               - period
   *               - price
   *               - sort_order
   *             properties:
   *               title_uz:
   *                 type: string
   *                 example: Oylik tarif
   *               title_ru:
   *                 type: string
   *                 example: Месячный тариф
   *               title_eng:
   *                 type: string
   *                 example: Monthly plan
   *               period:
   *                 type: integer
   *                 example: 30
   *               price:
   *                 type: integer
   *                 example: 150000
   *               monthly_price:
   *                 type: integer
   *                 example: 150000
   *               sort_order:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       201:
   *         description: Price added successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 201
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/Price'
   *       400:
   *         description: Bad request (invalid or missing parameters)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: Interval Server Error
   */
  .post('/price', AUTH, price.ADD_PRICE)

  /**
   * @swagger
   * /price:
   *   put:
   *     summary: Edit an existing price plan
   *     tags:
   *       - Price
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *               - title_uz
   *               - title_ru
   *               - title_eng
   *               - period
   *               - price
   *               - sort_order
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 1
   *               title_uz:
   *                 type: string
   *                 example: Yangi tarif
   *               title_ru:
   *                 type: string
   *                 example: Новый тариф
   *               title_eng:
   *                 type: string
   *                 example: New Plan
   *               period:
   *                 type: integer
   *                 example: 90
   *               price:
   *                 type: integer
   *                 example: 350000
   *               monthly_price:
   *                 type: integer
   *                 example: 350000
   *               sort_order:
   *                 type: integer
   *                 example: 2
   *     responses:
   *       200:
   *         description: Price updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/Price'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: Interval Server Error
   */
  .put('/price', AUTH, price.EDIT_PRICE)

  /**
   * @swagger
   * /price:
   *   delete:
   *     summary: Delete a price by ID
   *     tags:
   *       - Price
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Price deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   description: Deleted price data
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: Interval Server Error
   */
  .delete('/price', AUTH, price.DELETE_PRICE)

  .get("/payment/check/:id/:tarif/:amount", payment.CHECK)
  .get("/payment/success/:id/:tarif", payment.SUCCESS)

  // BANNERS

  /**
   * @swagger
   * tags:
   *    name: Banner
   *    description: Banner managing API
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Banner:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         title_uz:
   *           type: string
   *         title_ru:
   *           type: string
   *         title_eng:
   *           type: string
   *         description_uz:
   *           type: string
   *         description_ru:
   *           type: string
   *         description_eng:
   *           type: string
   *         mode:
   *           type: integer
   *         image_url:
   *           type: string
   *         image_name:
   *           type: string
   *         create_at:
   *           type: string
   *           format: date-time
   */

  /**
   * @swagger
   * /banners/list/admin:
   *   get:
   *     summary: Get a paginated list of banners (admin access)
   *     tags: [Banner]
   *     security:
   *       - token: []
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         required: true
   *         description: Number of banners per page
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: true
   *         description: Page number
   *     responses:
   *       200:
   *         description: A list of banners
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                 message:
   *                   type: string
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Banner'
   *       400:
   *         description: Bad request (missing limit or page)
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal Server Error
   */
  .get('/banners/list/admin', AUTH, banners.GET_ADMIN)

  /**
   * @swagger
   * /banners/list:
   *   get:
   *     summary: Get a list of banners by language and mode
   *     tags: [Banner]
   *     parameters:
   *       - in: query
   *         name: lang
   *         schema:
   *           type: string
   *           enum: [uz, ru, eng]
   *         required: true
   *         description: Language code for banner content
   *       - in: query
   *         name: mode
   *         schema:
   *           type: string
   *         required: false
   *         description: Display mode or category (optional)
   *     responses:
   *       200:
   *         description: Successfully retrieved list of banners
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                 message:
   *                   type: string
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Banner'
   *       500:
   *         description: Internal Server Error
   */
  .get('/banners/list', banners.GET_LIST)

  /**
   * @swagger
   * /banner/{id}:
   *   get:
   *     summary: Get a banner by ID and language
   *     tags: [Banner]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The banner ID
   *       - in: query
   *         name: lang
   *         required: true
   *         schema:
   *           type: string
   *           enum: [uz, ru, eng]
   *         description: Language code for banner content
   *     responses:
   *       200:
   *         description: Successfully retrieved banner
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Banner'
   *       404:
   *         description: Banner not found
   *       500:
   *         description: Internal Server Error
   */
  .get('/banner/:id', banners.GET_ID)

  /**
   * @swagger
   * /banner/add:
   *   post:
   *     summary: Add a new banner
   *     tags: [Banner]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - title_uz
   *               - title_ru
   *               - title_eng
   *               - description_uz
   *               - description_ru
   *               - description_eng
   *               - image
   *             properties:
   *               title_uz:
   *                 type: string
   *               title_ru:
   *                 type: string
   *               title_eng:
   *                 type: string
   *               description_uz:
   *                 type: string
   *               description_ru:
   *                 type: string
   *               description_eng:
   *                 type: string
   *               mode:
   *                 type: integer
   *               image:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: Banner successfully added
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Banner'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal Server Error
   */
  .post('/banner/add', AUTH, FileUpload.single('image'), banners.ADD_BANNER)

  /**
   * @swagger
   * /banner/edit:
   *   put:
   *     summary: Edit an existing banner
   *     tags: [Banner]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *               - title_uz
   *               - title_ru
   *               - title_eng
   *               - description_uz
   *               - description_ru
   *               - description_eng
   *             properties:
   *               id:
   *                 type: integer
   *               title_uz:
   *                 type: string
   *               title_ru:
   *                 type: string
   *               title_eng:
   *                 type: string
   *               description_uz:
   *                 type: string
   *               description_ru:
   *                 type: string
   *               description_eng:
   *                 type: string
   *               mode:
   *                 type: integer
   *               image:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Banner successfully updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Banner'
   *       400:
   *         description: Bad request
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal Server Error
   */
  .put('/banner/edit', AUTH, FileUpload.single('image'), banners.EDIT_BANNER)

  /**
   * @swagger
   * /banner/{id}:
   *   delete:
   *     summary: Delete a banner by ID
   *     tags: [Banner]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Banner ID to delete
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted banner
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Success
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: Bad request
   *       404:
   *         description: Banner not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: Not found
   *       500:
   *         description: Internal Server Error
   */
  .delete('/banner/:id', AUTH, banners.DELETE_BANNER)

module.exports = router
