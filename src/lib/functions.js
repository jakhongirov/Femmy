function generateOTP(length) {
   let otp = '';
   const digits = '0123456789';

   for (let i = 0; i < length; i++) {
      // Append a random digit from the `digits` string
      otp += digits[Math.floor(Math.random() * digits.length)];
   }

   return otp;
}

module.exports = {
   generateOTP
}