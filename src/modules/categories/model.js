const { fetchALL, fetch } = require('../../lib/postgres')

const categories = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories_article
         ${lang ? `WHERE lang = '${lang}'` : ""}
      ORDER BY
         id DESC;
   `;

   return fetchALL(QUERY)
}
const categoriesArticle = (lang, type) => {
   const QUERY = `
      WITH limited_articles AS (
         SELECT 
            a.id,
            a.category_id,
            a.title,
            a.description,
            a.image_url,
            a.image_name,
            a.source,
            a.video_url,
            a.featured,
            a.free,
            a.created_at,
            ROW_NUMBER() OVER (PARTITION BY a.category_id ORDER BY a.created_at DESC) AS row_num
         FROM 
            articles a
      )
      SELECT 
         ca.id AS id,
         ca.name,
         ca.lang,
         ca.type,
         ca.image_url,
         ca.image_name,
         ca.free,
         ca.created_at,
         COALESCE(
            JSON_AGG(
                  JSON_BUILD_OBJECT(
                     'id', la.id,
                     'category_id', la.category_id,
                     'title', la.title,
                     'description', la.description,
                     'image_url', la.image_url,
                     'image_name', la.image_name,
                     'source', la.source,
                     'video_url', la.video_url,
                     'featured', la.featured,
                     'free', la.free,
                     'created_at', la.created_at
                  )
            ) FILTER (WHERE la.id IS NOT NULL), '[]'
         ) AS articles
      FROM 
         categories_article ca
      LEFT JOIN 
         limited_articles la
      ON 
         ca.id = la.category_id AND la.row_num <= 10
      WHERE
         ca.lang = $1 ${type ? `and ca.type = '${type}'` : ""}
      GROUP BY 
         ca.id;
   `;

   return fetchALL(QUERY, lang)
}
const addCategory = (
   name,
   lang,
   type,
   free,
   html_code,
   imgUrl,
   imgName
) => {
   const QUERY = `
      INSERT INTO
         categories_article (
            name,
            lang,
            type,
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
            $7
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      name,
      lang,
      type,
      free,
      html_code,
      imgUrl,
      imgName
   )
}
const foundCategory = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories_article
      WHERE
         id = $1;
   `;

   return fetch(QUERY, id)
}
const editCategory = (
   id,
   name,
   lang,
   type,
   free,
   html_code,
   imgUrl,
   imgName
) => {
   const QUERY = `
      UPDATE
         categories_article
      SET
         name = $2,
         lang = $3,
         type = $4,
         free = $5,
         html_code = $6,
         image_url = $7,
         image_name = $8
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      name,
      lang,
      type,
      free,
      html_code,
      imgUrl,
      imgName
   )
}
const deleteCategory = (id) => {
   const QUERY = `
      DELETE FROM
         categories_article
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   categories,
   categoriesArticle,
   addCategory,
   foundCategory,
   editCategory,
   deleteCategory
}