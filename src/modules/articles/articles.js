require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page, category_id, search } = req.query

         if (limit && page) {
            const articlesList = await model.articlesList(limit, page, category_id, search)

            if (articlesList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: articlesList
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
         const { id } = req.params
         const foundArticle = await model.foundArticle(id)

         if (foundArticle) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: foundArticle
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

   ADD_ARTICLE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            category_id,
            title,
            description,
            source,
            video_url,
            featured,
            free
         } = req.body

         const imgUrl = uploadPhoto ? `${process.env.BACKEND_URL}/${uploadPhoto?.filename}` : null;
         const imgName = uploadPhoto ? uploadPhoto?.filename : null;

         const addArticle = await model.addArticle(
            category_id,
            title,
            description,
            source,
            video_url,
            featured,
            free,
            imgUrl,
            imgName
         )

         if (addArticle) {
            return res.status(201).json({
               status: 201,
               message: "Success",
               data: addArticle
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

   EDIT_ARTICLE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            category_id,
            title,
            description,
            source,
            video_url,
            featured,
            free
         } = req.body
         const foundArticle = await model.foundArticle(id)
         let imgUrl = '';
         let imgName = '';

         if (foundArticle) {
            if (uploadPhoto) {
               if (foundArticle?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundArticle?.image_name}`))
                  deleteOldAvatar.delete()
               }
               imgUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imgName = uploadPhoto?.filename;
            } else {
               imgUrl = foundArticle?.image_url
               imgName = foundArticle?.image_name;
            }

            const editArticle = await model.editArticle(
               id,
               category_id,
               title,
               description,
               source,
               video_url,
               featured,
               free,
               imgUrl,
               imgName
            )

            if (editArticle) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: editArticle
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

   DELETE_ARTICLE: async (req, res) => {
      try {
         const { id } = req.body
         const foundArticle = await model.foundArticle(id)

         if (foundArticle) {
            const deleteArticle = await model.deleteArticle(id)

            if (deleteArticle) {
               if (deleteArticle?.image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${deleteArticle?.image_name}`))
                  deleteOldAvatar.delete()
               }

               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteArticle
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