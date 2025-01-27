require('dotenv').config()
const express = require("express");
const http = require('http');
const cors = require("cors");
const path = require('path')
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const {
   PORT
} = require("./src/config");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const router = require("./src/modules");
const TelegramBot = require('node-telegram-bot-api')
const bcryptjs = require('bcryptjs')
const model = require('./model')
const botText = require('./text.json')
const { generateOTP } = require('./src/lib/functions')

const publicFolderPath = path.join(__dirname, 'public');
const imagesFolderPath = path.join(publicFolderPath, 'images');

if (!fs.existsSync(publicFolderPath)) {
   fs.mkdirSync(publicFolderPath);
   console.log('Public folder created successfully.');
} else {
   console.log('Public folder already exists.');
}

if (!fs.existsSync(imagesFolderPath)) {
   fs.mkdirSync(imagesFolderPath);
   console.log('Images folder created successfully.');
} else {
   console.log('Images folder already exists within the public folder.');
}

const bot = new TelegramBot(process.env.BOT_TOKEN, {
   polling: true
});

bot.onText(/\/start ?(.*)?/, async (msg, match) => {
   const chatId = msg.chat.id;
   const param = match[1]?.trim();
   const username = msg.from.first_name;
   const foundUser = await model.foundUser(chatId)

   console.log(chatId)

   if (foundUser) {
      if (param == 'login') {
         bot.sendMessage(chatId, botText.startTextLogin?.replace(/%%user%%/g, foundUser?.name), {
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: botText.sendContactBtn,
                        request_contact: true
                     }
                  ]
               ],
               resize_keyboard: true,
               one_time_keyboard: true
            }
         }).then(async () => {
            await model.editStep(chatId, 'login')
         })
      } else {
         bot.sendMessage(chatId, botText.startTextLogin?.replace(/%user%/g, username), {
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: botText.sendContactBtn,
                        request_contact: true
                     }
                  ]
               ],
               resize_keyboard: true,
               one_time_keyboard: true
            }
         }).then(async () => {
            await model.createUser(
               chatId,
               "register"
            )
         })
      }
   } else {
      bot.sendMessage(chatId, botText.startTextLogin?.replace(/%user%/g, username), {
         reply_markup: {
            keyboard: [
               [
                  {
                     text: botText.sendContactBtn,
                     request_contact: true
                  }
               ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
         }
      }).then(async () => {
         await model.createUser(
            chatId,
            "register"
         )
      })
   }
})

bot.on('contact', async (msg) => {
   const chatId = msg.chat.id;
   const foundUser = await model.foundUser(chatId)
   let phoneNumber = msg.contact.phone_number;

   if (msg.contact && foundUser?.bot_step == 'register') {
      if (!phoneNumber.startsWith('+')) {
         phoneNumber = `+${phoneNumber}`;
      }

      const addPhoneNumber = await model.addPhoneNumber(
         chatId,
         phoneNumber
      )

      if (addPhoneNumber) {
         bot.sendMessage(chatId, botText.askName)
            .then(async () => {
               await model.editStep(chatId, 'ask_name')
            })
      }

   } else if (msg.contact && foundUser?.bot_step == 'login') {

      if (!phoneNumber.startsWith('+')) {
         phoneNumber = `+${phoneNumber}`;
      }

      if (foundUser?.phone_number == phoneNumber) {
         const otpCode = await generateOTP(6)
         const addOtp = await model.addOtp(otpCode, chatId)

         if (addOtp) {
            bot.sendMessage(
               chatId,
               botText.otpCodeTextLogin.replace(/%code%/g, otpCode),
               {
                  parse_mode: 'HTML'
               }
            ).then(async () => {
               await model.editStep(chatId, 'otp_code_login')
            })
         }
      } else {
         const addPhoneNumber = await model.addPhoneNumber(
            chatId,
            phoneNumber
         )

         if (addPhoneNumber) {
            bot.sendMessage(chatId, botText.askName)
               .then(async () => {
                  await model.editStep(chatId, 'ask_name')
               })
         }
      }
   }
})

bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;
   const foundUser = await model.foundUser(chatId)

   if (foundUser?.bot_step == 'ask_name' && text) {
      const addName = await model.addName(chatId, text)
      console.log(addName)


      if (addName) {
         const otpCode = await generateOTP(6)
         await model.addOtp(otpCode, chatId)

         bot.sendMessage(
            chatId,
            botText.otpCodeTextRegister.replace(/%code%/g, otpCode),
            {
               parse_mode: 'HTML'
            }
         ).then(async () => {
            await model.editStep(chatId, 'otp_code_register')
         })
      }
   }
})

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "FEMMY API documentation",
         version: "1.0.0",
         description: "by Diyor Jaxongirov",
      },
      servers: [
         {
            url: "https://srvr.femmy.uz/api/v1"
         }
      ]
   },
   apis: ["./src/modules/index.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors({
   origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use("/api/v1", router);

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});