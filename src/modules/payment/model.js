const { fetch } = require('../../lib/postgres')

const foundUser = (chatId) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         id = $1;
   `;

   return fetch(QUERY, chatId)
}
const foundTarif = (title) => {
   const QUERY = `
      SELECT
         *
      FROM
         price
      WHERE
         title_uz = $1 or title_ru = $1 or title_eng = $1;
   `;

   return fetch(QUERY, title)
}
const editUserPremium = (id, expiredDate) => {
   const QUERY = `
      UPDATE
         users
      SET
         expired_date = $2,
         premium = true
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, expiredDate)
}


module.exports = {
   foundUser,
   foundTarif,
   editUserPremium
}