const { fetch, fetchALL } = require('../../lib/postgres')

const bannerList = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         banners
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
const bannerListLang = (lang, mode) => {
   let data = '*';

   if (lang == 'uz') {
      data = `id, title_uz AS title, description_uz AS description, mode, image_url, image_name`;
   } else if (lang == 'ru') {
      data = `id, title_ru AS title, description_ru AS description, mode, image_url, image_name`;
   } else if (lang == 'en') {
      data = `id, title_eng AS title, description_eng AS description, mode, image_url, image_name`;
   } else {
      data = '*'
   }

   const QUERY = `
      SELECT
         ${data}
      FROM
         banners
      WHERE
         mode = $1 or mode = 0
      ORDER BY
         id DESC;
   `;

   return fetchALL(
      QUERY,
      mode
   )
}
const bannerId = (id, lang) => {
   let data = '*';

   if (lang == 'uz') {
      data = `id, title_uz AS title, description_uz AS description, mode, image_url, image_name`;
   } else if (lang == 'ru') {
      data = `id, title_ru AS title, description_ru AS description, mode, image_url, image_name`;
   } else if (lang == 'en') {
      data = `id, title_eng AS title, description_eng AS description, mode, image_url, image_name`;
   } else {
      data = '*'
   }

   const QUERY = `
      SELECT
         ${data}
      FROM
         banners
      WHERE
         id = $1;
   `;

   return fetch(QUERY, id)
}
const addBanner = (
   title_uz,
   title_ru,
   title_eng,
   description_uz,
   description_ru,
   description_eng,
   mode,
   imgUrl,
   imgName
) => {
   const QUERY = `
      INSERT INTO
         banners (
            title_uz,
            title_ru,
            title_eng,
            description_uz,
            description_ru,
            description_eng,
            mode,
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
            $9
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      title_uz,
      title_ru,
      title_eng,
      description_uz,
      description_ru,
      description_eng,
      mode,
      imgUrl,
      imgName
   )
}
const editBanner = (
   id,
   title_uz,
   title_ru,
   title_eng,
   description_uz,
   description_ru,
   description_eng,
   mode,
   imgUrl,
   imgName
) => {
   const QUERY = `
      UPDATE
         banners
      SET
         title_uz = $2,
         title_ru = $3,
         title_eng = $4,
         description_uz = $5,
         description_ru = $6,
         description_eng = $7,
         mode = $8,
         image_url = $9,
         image_name = $10
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
      description_uz,
      description_ru,
      description_eng,
      mode,
      imgUrl,
      imgName
   )
}
const deleteBanner = (id) => {
   const QUERY = `
      DELETE FROM
         banners
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   bannerList,
   bannerListLang,
   bannerId,
   addBanner,
   editBanner,
   deleteBanner
}