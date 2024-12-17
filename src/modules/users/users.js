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

            if (usersList?.length) {
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
            model_id,
            phone_number,
            password,
            avarage_period,
            cycle_duration
         } = req.body
         const checkUser = await model.checkUser(phone_number)

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
               model_id,
               phone_number,
               pass_hash,
               avarage_period,
               cycle_duration
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

   LOGIN_USER: async (req, res) => {
      try {
         const {
            phone_number,
            password
         } = req.body
         phone_number = phone_number?.replace(/\s+/g, '');
         const checkUser = await model.checkUser(phone_number)

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
            model_id,
            phone_number,
            password,
            avarage_period,
            cycle_duration,
            expired_date,
            premium,
            weight,
            height
         } = req.body
         let userData = {}

         if (name) {
            const editName = await model.editName(id, name)
            if (editName) {
               return userData = editName
            } else {
               return userData = null
            }
         }

         if (age) {
            const editAge = await model.editAge(id, age)
            if (editAge) {
               return userData = editAge
            } else {
               return userData = null
            }
         }

         if (model_id) {
            const editModel = await model.editModel(id, model_id)
            if (editModel) {
               return userData = editModel
            } else {
               return userData = null
            }
         }

         if (phone_number) {
            const editPhoneNumber = await model.editPhoneNumber(id, phone_number)
            if (editPhoneNumber) {
               return userData = editPhoneNumber
            } else {
               return userData = null
            }
         }

         if (password) {
            const pass_hash = await bcryptjs.hash(password, 10);
            const editPassword = await model.editPassword(id, pass_hash)
            if (editPassword) {
               return userData = editPassword
            } else {
               return userData = null
            }
         }

         if (avarage_period) {
            const editAvaragePeriod = await model.editAvaragePeriod(id, avarage_period)
            if (editAvaragePeriod) {
               return userData = editAvaragePeriod
            } else {
               return userData = null
            }
         }

         if (cycle_duration) {
            const editCycleDuration = await model.editCycleDuration(id, cycle_duration)
            if (editCycleDuration) {
               return userData = editCycleDuration
            } else {
               return userData = null
            }
         }

         if (expired_date) {
            const editExpiredDate = await model.editExpiredDate(id, expired_date)
            if (editExpiredDate) {
               return userData = editExpiredDate
            } else {
               return userData = null
            }
         }

         if (premium) {
            const editPremium = await model.editPremium(id, premium)
            if (editPremium) {
               return userData = editPremium
            } else {
               return userData = null
            }
         }

         if (weight) {
            const editWeight = await model.editWeight(id, weight)
            if (editWeight) {
               return userData = editWeight
            } else {
               return userData = null
            }
         }

         if (height) {
            const editHeight = await model.editHeight(id, height)
            if (editHeight) {
               return userData = editHeight
            } else {
               return userData = null
            }
         }

         if (userData) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: userData
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