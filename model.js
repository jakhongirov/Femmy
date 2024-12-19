const { fetchALL, fetch } = require('./src/lib/postgres')

const foundUser = (chatId) => {
   const QUERY = `
      SELECT
         *
      FROM  
         users
      WHERE
         chat_id = $1;
   `;

   return fetch(QUERY, chatId)
}
const editStep = (chatId, step) => {
   const QUERY = `
      UPDATE
         users
      SET
         bot_step = $2
      WHERE
         chat_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, chatId, step)
}
const createUser = (
   chatId,
   step
) => {
   const QUERY = `
      INSERT INTO
         users (
            chat_id,
            bot_step
         ) VALUES (
            $1,
            $2 
         ) RETURNING *;
   `;

   return fetch(QUERY, chatId, step)
}
const addPhoneNumber = (
   chatId,
   phoneNumber
) => {
   const QUERY = `
      UPDATE
         users
      SET
         phone_number = $2
      WHERE
         chat_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, chatId, phoneNumber)
}
const addOtp = (otpCode, chatId) => {
   const QUERY = `
      INSERT INTO
         otp (
            code,
            chat_id
         )  VALUES (
            $1,
            $2
         ) RETURNING *;
   `;

   return fetch(QUERY, otpCode, chatId)
}
const addName = (chatId, text) => {
   const QUERY = `
      UPDATE
         users
      SET
         name = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, chatId, text)
}

module.exports = {
   foundUser,
   editStep,
   createUser,
   addPhoneNumber,
   addOtp,
   addName
}