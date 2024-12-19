const { fetchALL, fetch } = require('../../lib/postgres')

const categories = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories_article
         ${lang ? `WHERE lang = $1` : ""}
      ORDER BY
         id DESC;
   `;

   return fetchALL(QUERY, lang || null)
}
const addCategory = (
   name,
   lang,
   type,
   free,
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
            image_url,
            image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      name,
      lang,
      type,
      free,
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
         image_url = $6,
         image_name = $7
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
   addCategory,
   foundCategory,
   editCategory,
   deleteCategory
}