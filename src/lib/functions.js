function generateOTP(length) {
   let otp = '';
   const digits = '0123456789';

   for (let i = 0; i < length; i++) {
      // Append a random digit from the `digits` string
      otp += digits[Math.floor(Math.random() * digits.length)];
   }

   return otp;
}

function getCurrentTimeFormatted() {
   const now = new Date();
   const uzbekistanTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
   }).format(now);

   // Split the formatted date and time
   const [date, time] = uzbekistanTime.split(', ');

   // Reformat date from dd/mm/yyyy to dd.mm.yyyy
   const [day, month, year] = date.split('/');

   return `${day}.${month}.${year} ${time}`;
}

const calculateExpiredDate = (perid) => {
   const currentDate = new Date();
   const expirationDate = new Date(currentDate);
   expirationDate.setDate(expirationDate.getDate() + Number(perid));
   const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000);
   return expirationTimestamp
}

module.exports = {
   generateOTP,
   getCurrentTimeFormatted,
   calculateExpiredDate
}