const { fetchALL, fetch } = require('../../lib/postgres')

const devicesList = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         devices
      ORDER BY
         id DESC
      LIMIT $1
      OFFSET $2;
   `;

   return fetchALL(
      QUERY,
      limit,
      Number((page - 1) * limit)
   )
}
const foundUserDevices = (user_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         devices
      WHERE
         user_id = $1
      ORDER BY
         id DESC;
   `;

   return fetchALL(QUERY, user_id)
}
const addDevice = (
   user_id,
   phone_brand,
   phone_lang,
   app_lang,
   platform
) => {
   const QUERY = `
      INSERT INTO
         devices (
            user_id,
            phone_brand,
            phone_lang,
            app_lang,
            platform
         ) VALUES (
            $1, 
            $2, 
            $3, 
            $4, 
            $5 
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      user_id,
      phone_brand,
      phone_lang,
      app_lang,
      platform
   )
}
const editPhoneBrand = (id, user_id, phone_brand) => {
   const QUERY = `
      UPDATE
         devices
      SET
         phone_brand = $3
      WHERE
         id = $1 and user_id = $2
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      user_id,
      phone_brand
   )
}
const editPhoneLang = (id, user_id, phone_lang) => {
   const QUERY = `
      UPDATE
         devices
      SET
         phone_lang = $3
      WHERE
         id = $1 and user_id = $2
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      user_id,
      phone_lang
   )
}
const editAppLang = (id, user_id, app_lang) => {
   const QUERY = `
      UPDATE
         devices
      SET
         app_lang = $3
      WHERE
         id = $1 and user_id = $2
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      user_id,
      app_lang
   )
}
const editPlatform = (id, user_id, platform) => {
   const QUERY = `
      UPDATE
         devices
      SET
         platform = $3
      WHERE
         id = $1 and user_id = $2
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      user_id,
      platform
   )
}
const deleteDevice = (id, user_id) => {
   const QUERY = `
      DELETE FROM
         devices
      WHERE
         id = $1 and user_id = $2
      RETURNING *;
   `;

   return fetch(QUERY, id, user_id)
}


module.exports = {
   devicesList,
   foundUserDevices,
   addDevice,
   editPhoneBrand,
   editPhoneLang,
   editAppLang,
   editPlatform,
   deleteDevice
}