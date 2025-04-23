const modelDb = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const aiList = await modelDb.aiList()

         if (aiList?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: aiList
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

   GET_MODE_ID: async (req, res) => {
      try {
         const { mode_id } = req.params

         const foundAi = await modelDb.foundAi(mode_id)

         if (foundAi) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundAi
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

   ADD_AI: async (req, res) => {
      try {
         const {
            name,
            token,
            mode_id,
            prompt,
            model,
            questions
         } = req.body

         const addAi = await modelDb.addAi(
            name,
            token,
            mode_id,
            prompt,
            model,
            questions
         )

         if (addAi) {
            return res.status(201).json({
               status: 201,
               message: "Success",
               data: addAi
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

   EDIT_AI: async (req, res) => {
      try {
         const {
            id,
            name,
            token,
            mode_id,
            prompt,
            model,
            questions
         } = req.body

         const editAi = await modelDb.editAi(
            id,
            name,
            token,
            mode_id,
            prompt,
            model,
            questions
         )

         if (editAi) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: editAi
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

   DELETE_AI: async (req, res) => {
      try {
         const { id } = req.body
         const deleteAi = modelDb.deleteAi(id)

         if (deleteAi) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: deleteAi
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