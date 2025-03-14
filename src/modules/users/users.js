require('dotenv').config();
const model = require('./model')
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')

module.exports = {
   GET_LIST: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const usersList = await model.usersList(limit, page)

            if (usersList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: usersList
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            return res.status(400).json({
               status: 400,
               message: "Must write limit and page"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   GET_ID: async (req, res) => {
      try {
         const { user_id } = req.params
         const foundUser = await model.foundUser(user_id)

         if (foundUser) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundUser
            })
         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   REGISTER_USER: async (req, res) => {
      try {
         const {
            name,
            age,
            mode_id,
            phone_number,
            password,
            avarage_period,
            cycle_duration,
            last_period_date,
            fetal_age,
            baby_born_date
         } = req.body
         const checkUser = await model.checkUser(phone_number.replace(/^(\+)?/, '+'))

         if (checkUser) {
            return res.status(302).json({
               status: 302,
               message: "User found"
            });
         } else {
            const pass_hash = await bcryptjs.hash(password, 10);
            const createUser = await model.createUser(
               name,
               age,
               mode_id,
               phone_number.replace(/^(\+)?/, '+'),
               pass_hash,
               avarage_period,
               cycle_duration,
               last_period_date,
               fetal_age,
               baby_born_date
            )

            if (createUser) {
               const token = await new JWT({
                  id: createUser?.id
               }).sign();

               return res.status(201).json({
                  status: 201,
                  message: "Success",
                  data: createUser,
                  token: token
               });
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               });
            }
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   REGISTER_EMAIL: async (req, res) => {
      try {
         const { email } = req.body
         const foundUserByEmail = await model.foundUserByEmail(email)

         if (foundUserByEmail) {
            const token = await new JWT({
               id: foundUserByEmail?.id
            }).sign()

            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundUserByEmail,
               token: token
            })
         } else {
            const addUser = await model.addUser(email)

            if (addUser) {
               const token = await new JWT({
                  id: addUser?.id
               }).sign()

               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: addUser,
                  token: token
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad requestF"
               })
            }

         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   LOGIN_USER: async (req, res) => {
      try {
         const {
            phone_number,
            password
         } = req.body

         const checkUser = await model.checkUser(phone_number.replace(/^(\+)?/, '+'))

         if (checkUser) {
            const validPass = await bcryptjs.compare(password, checkUser?.password)

            if (validPass) {
               const token = await new JWT({
                  id: checkUser?.id
               }).sign()

               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: checkUser,
                  token: token
               })
            } else {
               return res.status(401).json({
                  status: 401,
                  message: "Invalid password"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "User not found"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   EDIT_USER: async (req, res) => {
      try {
         const {
            id,
            name,
            age,
            mode_id,
            phone_number,
            email,
            password,
            avarage_period,
            cycle_duration,
            last_period_date,
            fetal_age,
            baby_born_date,
            expired_date,
            premium,
            weight,
            height
         } = req.body
         let userData = {}

         if (name) {
            await model.editName(id, name)
         }

         if (age) {
            await model.editAge(id, age)
         }

         if (mode_id) {
            await model.editModel(id, mode_id)
         }

         if (phone_number) {
            await model.editPhoneNumber(id, phone_number.replace(/^(\+)?/, '+'))
         }

         if (email) {
            await model.editEmail(id, email)
         }

         if (password) {
            const pass_hash = await bcryptjs.hash(password, 10);
            await model.editPassword(id, pass_hash)
         }

         if (avarage_period) {
            await model.editAvaragePeriod(id, avarage_period)
         }

         if (cycle_duration) {
            await model.editCycleDuration(id, cycle_duration)
         }

         if (last_period_date) {
            await model.editLastPeriodDate(id, last_period_date)
         }

         if (fetal_age) {
            await model.editFetalAge(id, fetal_age)
         }

         if (baby_born_date) {
            await model.editBabyBornDate(id, baby_born_date)
         }

         if (expired_date) {
            await model.editExpiredDate(id, expired_date)
         }

         if (premium) {
            await model.editPremium(id, premium)
         }

         if (weight) {
            await model.editWeight(id, weight)
         }

         if (height) {
            await model.editHeight(id, height)
         }

         const foundUser = await model.foundUser(id)

         if (foundUser) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundUser
            })
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   OTP: async (req, res) => {
      try {
         const { code } = req.body
         console.log(code)
         const foundOtp = await model.foundOtp(code)

         console.log(foundOtp)

         if (foundOtp) {
            const foundUserChatId = await model.foundUserChatId(foundOtp?.chat_id)

            console.log(foundUserChatId)

            if (foundUserChatId) {
               await model.editOtpStatus(foundOtp?.id)
               const token = await new JWT({
                  id: foundUserChatId?.id
               }).sign()

               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: foundUserChatId,
                  token: token

               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            return res.status(400).json({
               status: 400,
               message: "Expired code or invalid"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   DELETE_USER: async (req, res) => {
      try {
         const { id } = req.body
         const foundUser = await model.foundUser(id)

         if (foundUser) {
            const deleteUser = await model.deleteUser(id)

            if (deleteUser) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteUser
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "User not found"
            })
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}