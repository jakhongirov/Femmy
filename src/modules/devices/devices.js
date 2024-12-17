const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const devicesList = await model.devicesList(limit, page)

            if (devicesList?.length) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: devicesList
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

   GET_USER_ID: async (req, res) => {
      try {
         const { user_id } = req.params
         const foundUserDevices = await model.foundUserDevices(user_id)

         if (foundUserDevices?.length) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundUserDevices
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

   ADD_DEVICE: async (req, res) => {
      try {
         const {
            user_id,
            phone_brand,
            phone_lang,
            app_lang,
            platform
         } = req.body

         const addDevice = await model.addDevice(
            user_id,
            phone_brand,
            phone_lang,
            app_lang,
            platform
         )

         if (addDevice) {
            return res.status(201).json({
               status: 201,
               message: "Success",
               data: addDevice
            });
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            });
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   EDIT_DEVICE: async (req, res) => {
      try {
         const {
            id,
            user_id,
            phone_brand,
            phone_lang,
            app_lang,
            platform
         } = req.body
         let device = {}

         if (phone_brand) {
            const editPhoneBrand = await model.editPhoneBrand(id, user_id, phone_brand)
            if (editPhoneBrand) {
               return device = editPhoneBrand
            } else {
               return device = null
            }
         }

         if (phone_lang) {
            const editPhoneLang = await model.editPhoneLang(id, user_id, phone_lang)
            if (editPhoneLang) {
               return device = editPhoneLang
            } else {
               return device = null
            }
         }

         if (app_lang) {
            const editAppLang = await model.editAppLang(id, user_id, app_lang)
            if (editAppLang) {
               return device = editAppLang
            } else {
               return device = null
            }
         }

         if (platform) {
            const editPlatform = await model.editPlatform(id, user_id, platform)
            if (editPlatform) {
               return device = editPlatform
            } else {
               return device = null
            }
         }

         if (device) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: device
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

   DELETE_DEVICE: async (req, res) => {
      try {
         const { id, user_id } = req.query

         const deleteDevice = await model.deleteDevice(id, user_id)

         if (deleteDevice) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: deleteDevice
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
   }
}