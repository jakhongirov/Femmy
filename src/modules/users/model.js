const { fetchALL, fetch } = require('../../lib/postgres')

const usersList = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
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
   model_id,
   phone_number,
   pass_hash,
   avarage_period,
   cycle_duration
) => {
   const QUERY = `
      INSERT INTO 
         users (
            name,
            age,
            model_id,
            phone_number,
            password,
            avarage_period,
            cycle_duration
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
      age,
      model_id,
      phone_number,
      pass_hash,
      avarage_period,
      cycle_duration
   )
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
const editModel = (id, model_id) => {
   const QUERY = `
      UPDATE
         users
      SET
         model_id = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, model_id)
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
   checkUser,
   createUser,
   editName,
   editAge,
   editModel,
   editPhoneNumber,
   editPassword,
   editAvaragePeriod,
   editCycleDuration,
   editExpiredDate,
   editPremium,
   editWeight,
   editHeight,
   deleteUser
}