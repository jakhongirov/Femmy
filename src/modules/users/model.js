const { fetchALL, fetch } = require('../../lib/postgres')

const usersList = (limit, page, id, phone) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      ${
         id && phone ? `
            WHERE
               id = ${id} and phone ilike '%${phone}%'
         ` : id ? `WHERE id = ${id}` : phone ? `WHERE phone ilike '%${phone}%'` : ""   
      }
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
const foundUser = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         id = $1;
   `;

   return fetch(QUERY, id)
}
const foundUserStatus = (id) => {
   const QUERY = `
      SELECT
         name,
         premium,
         nimadir,
          expired_date
      FROM
         users
      WHERE
         id = $1;
   `;

   return fetch(QUERY, id)
}
const addTracking = (user_id, currentTime) => {
   const QUERY = `
      UPDATE
         users
      SET
         tracking = array_append(tracking, $2)
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, user_id, currentTime)
}
const checkUser = (phone_number) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         phone_number = $1;
   `;

   return fetch(QUERY, phone_number)
}
const createUser = (
   name,
   age,
   mode_id,
   phone_number,
   pass_hash,
   avarage_period,
   cycle_duration,
   last_period_date,
   fetal_age,
   baby_born_date
) => {
   const QUERY = `
      INSERT INTO 
         users (
            name,
            age,
            mode_id,
            phone_number,
            password,
            avarage_period,
            cycle_duration,
            last_period_date,
            fetal_age,
            baby_born_date
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
      name,
      age,
      mode_id,
      phone_number,
      pass_hash,
      avarage_period,
      cycle_duration,
      last_period_date,
      fetal_age,
      baby_born_date
   )
}
const foundUserByEmail = (email) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         email = $1;
   `;

   return fetch(QUERY, email)
}
const addUser = (email) => {
   const QUERY = `
      INSERT INTO
         users (
            email
         ) VALUES (
            $1 
         ) RETURNING *;
   `;

   return fetch(QUERY, email)
}
const editName = (id, name) => {
   const QUERY = `
      UPDATE
         users
      SET
         name = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, name)
}
const editAge = (id, age) => {
   const QUERY = `
      UPDATE
         users
      SET
         age = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, age)
}
const editModel = (id, mode_id) => {
   const QUERY = `
      UPDATE
         users
      SET
         mode_id = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, mode_id)
}
const editPhoneNumber = (id, phone_number) => {
   const QUERY = `
      UPDATE
         users
      SET
         phone_number = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, phone_number)
}
const editEmail = (id, email) => {
   const QUERY = `
      UPDATE
         users
      SET
         email = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, email)
}
const editPassword = (id, pass_hash) => {
   const QUERY = `
      UPDATE
         users
      SET
         password = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, pass_hash)
}
const editAvaragePeriod = (id, avarage_period) => {
   const QUERY = `
      UPDATE
         users
      SET
         avarage_period = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, avarage_period)
}
const editCycleDuration = (id, cycle_duration) => {
   const QUERY = `
      UPDATE
         users
      SET
         cycle_duration = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, cycle_duration)
}
const editLastPeriodDate = (id, last_period_date) => {
   const QUERY = `
      UPDATE
         users
      SET
         last_period_date = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, last_period_date)
}
const editFetalAge = (id, fetal_age) => {
   const QUERY = `
      UPDATE
         users
      SET
         fetal_age = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, fetal_age)
}
const editBabyBornDate = (id, baby_born_date) => {
   const QUERY = `
      UPDATE
         users
      SET
         baby_born_date = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, baby_born_date)
}
const editExpiredDate = (id, expired_date) => {
   const QUERY = `
      UPDATE
         users
      SET
         expired_date = $2
      WHERE 
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, expired_date)
}
const editPremium = (id, premium) => {
   const QUERY = `
      UPDATE
         users
      SET
         premium = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, premium)
}
const editWeight = (id, weight) => {
   const QUERY = `
      UPDATE
         users
      SET
         weight = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, weight)
}
const editHeight = (id, height) => {
   const QUERY = `
      UPDATE
         users
      SET
         height = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, height)
}
const editNimadir = (id, nimadir) => {
   const QUERY = `
      UPDATE
         users
      SET
         nimadir = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, nimadir)
}
const editPincode = (id, pincode) => {
   const QUERY = `
      UPDATE
         users
      SET
         pincode = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, pincode)
}
const foundOtp = (code) => {
   QUERY = `
      SELECT
         *
      FROM
         otp
      WHERE
         code = $1
         and created_at >= NOW() - INTERVAL '5 minutes'
         and status = true;
   `;

   return fetch(QUERY, code)
}
const editOtpStatus = (id) => {
   const QUERY = `
      UPDATE
         otp
      SET
         status = false
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}
const foundUserChatId = (chat_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         chat_id = $1;
   `;

   return fetch(QUERY, chat_id)
}
const deleteUser = (id) => {
   const QUERY = `
      DELETE FROM
         users
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   usersList,
   foundUser,
   foundUserStatus,
   addTracking,
   checkUser,
   createUser,
   foundUserByEmail,
   addUser,
   editName,
   editAge,
   editModel,
   editPhoneNumber,
   editEmail,
   editPassword,
   editAvaragePeriod,
   editCycleDuration,
   editLastPeriodDate,
   editFetalAge,
   editBabyBornDate,
   editExpiredDate,
   editPremium,
   editWeight,
   editHeight,
   editNimadir,
   editPincode,
   foundOtp,
   editOtpStatus,
   foundUserChatId,
   deleteUser
}