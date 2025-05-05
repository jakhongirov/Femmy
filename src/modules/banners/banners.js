const model = require('./model')

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, page } = req.query
         const bannerList = await model.bannerList(limit, page)

         if (limit && page) {
            if (bannerList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: bannerList
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

   GET_LIST: async (req, res) => {
      try {
         const { lang, mode } = req.query

         const bannerListLang = await model.bannerListLang(lang, mode)

         return res.status(200).json({
            status: 200,
            message: "Success",
            data: bannerListLang
         })

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
         const { id, lang } = req.params

         const bannerId = await model.bannerId(id, lang)

         if (bannerId) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: bannerId
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

   ADD_BANNER: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            title_uz,
            title_ru,
            title_eng,
            description_uz,
            description_ru,
            description_eng,
            mode
         } = req.body

         const imgUrl = uploadPhoto ? `${process.env.BACKEND_URL}/${uploadPhoto?.filename}` : null;
         const imgName = uploadPhoto ? uploadPhoto?.filename : null;

         const addBanner = await model.addBanner(
            title_uz,
            title_ru,
            title_eng,
            description_uz,
            description_ru,
            description_eng,
            mode,
            imgUrl,
            imgName
         )

         if (addBanner) {
            return res.status(201).json({
               status: 201,
               message: "Success",
               data: addBanner
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

   EDIT_BANNER: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            title_uz,
            title_ru,
            title_eng,
            description_uz,
            description_ru,
            description_eng,
            mode
         } = req.body
         const bannerId = await model.bannerId(id, lang)

         if (bannerId) {
            if (uploadPhoto) {
               if (bannerId?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${bannerId?.image_name}`))
                  deleteOldAvatar.delete()
               }
               imgUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imgName = uploadPhoto?.filename;
            } else {
               imgUrl = bannerId?.image_url
               imgName = bannerId?.image_name;
            }

            const editBanner = await model.editBanner(
               id,
               title_uz,
               title_ru,
               title_eng,
               description_uz,
               description_ru,
               description_eng,
               mode,
               imgUrl,
               imgName
            )

            if (editBanner) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: editBanner
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
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   DELETE_BANNER: async (req, res) => {
      try {
         const { id } = req.params
         const bannerId = await model.bannerId(id, lang)

         if (bannerId) {
            const deleteBanner = await model.deleteBanner(id)

            if (deleteBanner) {
               if (deleteBanner?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${deleteBanner?.image_name}`))
                  deleteOldAvatar.delete()
               }

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
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}