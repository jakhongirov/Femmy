const model = require('./model')
const { calculateExpiredDate } = require('../../lib/functions')

module.exports = {
   CHECK: async (req, res) => {
      try {
         const { id, tarif, amount } = req.params
         const foundUser = await model.foundUser(id)
         const foundTarif = await model.foundTarif(tarif)

         console.log(req.params)
         console.log(foundUser)
         console.log(foundTarif)

         if (foundUser && foundTarif) {
            if (foundTarif.price == amount) {
               return res.status(200).json({
                  status: 200,
                  message: "Success"
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
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   SUCCESS: async (req, res) => {
      try {
         const { id, tarif } = req.params
         const foundUser = await model.foundUser(id)
         const foundTarif = await model.foundTarif(tarif)



         if (foundUser) {
            const expiredDate = await calculateExpiredDate(Number(foundTarif.period))
            const editUserPremium = await model.editUserPremium(foundUser.id, expiredDate)

            console.log('success');
            console.log(expiredDate);
            console.log(editUserPremium);

            if (editUserPremium) {
               return res.status(200).json({
                  status: 200,
                  message: "Success"
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
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}