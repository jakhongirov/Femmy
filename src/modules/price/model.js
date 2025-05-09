const { fetch, fetchALL } = require('../../lib/postgres')

const priceList = () => {
   const QuERY = `
      SELECT
         *
      FROM
         price
      ORDER BY
         sort_order
   `;

   return fetchALL(QuERY)
}
const addPrice = (
   title_uz,
   title_ru,
   title_eng,
   period,
   price,
   sort_order,
   monthly_price
) => {
   const QUERY = `
      INSERT INTO
         price (
            title_uz,
            title_ru,
            title_eng,
            period,
            price,
            sort_order,
            monthly_price
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
      title_uz,
      title_ru,
      title_eng,
      period,
      price,
      sort_order,
      monthly_price
   )
}
const editPrice = (
   id,
   title_uz,
   title_ru,
   title_eng,
   period,
   price,
   sort_order,
   monthly_price
) => {
   const QUERY = `
      UPDATE
         price
      SET
         title_uz = $2,
         title_ru = $3,
         title_eng = $4,
         period = $5,
         price = $6,
         sort_order = $7,
         monthly_price = $8
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      title_uz,
      title_ru,
      title_eng,
      period,
      price,
      sort_order,
      monthly_price
   )
}
const deletePrice = (id) => {
   const QUERY = `
      DELETE FROM
         price
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   priceList,
   addPrice,
   editPrice,
   deletePrice
}