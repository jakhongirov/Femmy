const { fetch, fetchALL } = require('../../lib/postgres')

const aiList = () => {
   const QUERY = `
      SELECT
         *
      FROM
         ai
      ORDER BY
         id DESC;
   `;

   return fetchALL(QUERY)
}
const foundAi = (mode_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         ai
      WHERE
         mode_id = $1;
   `;

   return fetch(QUERY, mode_id)
}
const addAi = (
   name,
   token,
   mode_id,
   prompt,
   model,
   questions
) => {
   const QUERY = `
      INSERT INTO
         ai (
            name,
            token,
            mode_id,
            prompt,
            model,
            questions
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
      token,
      mode_id,
      prompt,
      model,
      questions
   )
}
const editAi = (
   id,
   name,
   token,
   mode_id,
   prompt,
   model,
   questions
) => {
   const QUERY = `
      UPDATE
         ai
      SET
         name = $2,
         token = $3,
         mode_id = $4,
         prompt = $5,
         model = $6,
         questions = $7
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      name,
      token,
      mode_id,
      prompt,
      model,
      questions
   )
}
const deleteAi = (id) => {
   const QUERY = `
      DELETE FROM
         ai
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   aiList,
   foundAi,
   addAi,
   editAi,
   deleteAi
}