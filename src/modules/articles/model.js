const { fetchALL, fetch } = require('../../lib/postgres')

const articlesList = (limit, page, category_id, search) => {
   const QUERY = `
      SELECT
         *
      FROM
         articles
         ${category_id && search ? `WHERE category_id = ${category_id} and title ilike '%${search}%'` : ""}
         ${category_id ? `WHERE category_id = ${category_id}` : ""}
         ${search ? `WHERE title ilike '%${search}%'` : ""}
      ORDER BY
         featured
      LIMIT $1
      OFFSET $2;
   `;

   return fetchALL(
      QUERY,
      limit,
      Number((page - 1) * limit)
   )
}
const foundArticle = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         articles
      WHERE
         id = $1
   `;

   return fetch(QUERY, id)
}
const addArticle = (
   category_id,
   title,
   description,
   source,
   video_url,
   featured,
   free,
   html_code,
   imgUrl,
   imgName
) => {
   const QUERY = `
      INSERT INTO
         articles (
            category_id,
            title,
            description,
            source,
            video_url,
            featured,
            free,
            html_code,
            image_url,
            image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      category_id,
      title,
      description,
      source,
      video_url,
      featured,
      free,
      html_code,
      imgUrl,
      imgName
   )
}
const editArticle = (
   id,
   category_id,
   title,
   description,
   source,
   video_url,
   featured,
   free,
   html_code,
   imgUrl,
   imgName
) => {
   const QUERY = `
      UPDATE
         articles
      SET
         category_id = $2,
         title = $3,
         description = $4,
         source = $5,
         video_url = $6,
         featured = $7,
         free = $8,
         html_code = $9,
         image_url = $10,
         image_name = $11
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      category_id,
      title,
      description,
      source,
      video_url,
      featured,
      free,
      html_code,
      imgUrl,
      imgName
   )
}
const deleteArticle = (id) => {
   const QUERY = `
      DELETE FROM
         articles
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   articlesList,
   foundArticle,
   addArticle,
   editArticle,
   deleteArticle
}