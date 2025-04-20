require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (req, res) => {
      try {
         const { lang } = req.query
         const categories = await model.categories(lang)

         if (categories?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: categories
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

   GET_LIST: async (req, res) => {
      try {
         const { lang, type } = req.query
         const categoriesArticle = await model.categoriesArticle(lang, type)

         if (categoriesArticle?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: categoriesArticle
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

   GET_ID: async (req, res) => {
      try {
         const { id } = req.params
         const foundCategoryWithArticle = await model.foundCategoryWithArticle(id)

         if (foundCategoryWithArticle) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundCategoryWithArticle
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

   ADD_CATEGORY: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            name,
            lang,
            type,
            free,
            html_code
         } = req.body

         const imgUrl = uploadPhoto ? `${process.env.BACKEND_URL}/${uploadPhoto?.filename}` : null;
         const imgName = uploadPhoto ? uploadPhoto?.filename : null;

         const addCategory = await model.addCategory(
            name,
            lang,
            type,
            free,
            html_code,
            imgUrl,
            imgName
         )

         if (addCategory) {
            return res.status(201).json({
               status: 201,
               message: "Success",
               data: addCategory
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

   EDIT_CATEGORY: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            name,
            lang,
            type,
            free,
            html_code
         } = req.body
         const foundCategory = await model.foundCategory(id)
         let imgUrl = '';
         let imgName = '';

         if (foundCategory) {
            if (uploadPhoto) {
               if (foundCategory?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCategory?.image_name}`))
                  deleteOldAvatar.delete()
               }
               imgUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imgName = uploadPhoto?.filename;
            } else {
               imgUrl = foundCategory?.image_url
               imgName = foundCategory?.image_name;
            }

            const editCategory = await model.editCategory(
               id,
               name,
               lang,
               type,
               free,
               html_code,
               imgUrl,
               imgName
            )

            if (editCategory) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: editCategory
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

   DELETE_CATEGORY: async (req, res) => {
      try {
         const { id } = req.body
         const foundCategory = await model.foundCategory(id)

         if (foundCategory) {
            const deleteCategory = await model.deleteCategory(id)

            if (deleteCategory) {
               if (deleteCategory?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCategory?.image_name}`))
                  deleteOldAvatar.delete()
               }
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteCategory
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