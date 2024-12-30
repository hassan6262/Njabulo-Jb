const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VpQWt0bWhWS01lTGdsS0w4aklESGdUc0dES2VBeFlKbEVXbG45VmIzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXRkazdVUXNhMENwV0NYNjVVMkVoWGFKV0Z6aEtzRERkRlVOc3hIV2VqST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRlBJWWpiUkZ0S1QwTDJWRjk1WVpRKy9PMCtGZkFoWW42c1ROUGZuMUdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNZ3dwYWs4ZmJUVGRleThlNEdnQlhnc09MT25PS0YrM2N5V3k4SllVeno4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVMdGY3QjExcjhpS0xVam5iT3NUVm1TY0x5NUI1amhzZlk4Z1NJbHBrWDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhHbTZyd3g5UWFFWWpMaXJJZ2s0T05VRXNSbWxRSGJ5U05Eek5tUzZzM3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU080YU9jTER4N3V5bW5hY25PRkp4Q045YmQ0NHl2OGtxbjlVdUx6Z0tXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU1LOFZZYmQzZXFiQm44WEdLYy9qNVUzWEprc2w1YzdaK3Q1dUJXL1pGYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw5OEdhQnk5UGU2MUhRcjVVV3BXb0g2WUV2TnRpcVdOMEJXNmdkQnpLNXhpa3JTYVIzMTJNdWw5NDdaYXhMcHdIS1g4dUJpYUV0am5MZklmM0pVdUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIzLCJhZHZTZWNyZXRLZXkiOiJ2aExkeHdXZXdScDFWOXlqd0pUM21vQXNDbnV5c2Z2TmhOb3BlTFNrMnVzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ0NzkyMzQzNjA0MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2NUQxNjBCRTgzNkI4MENFNDc3NzU2MTc2M0M5N0MwNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM1NTE2MzczfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0NDc5MjM0MzYwNDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzJDRkREQTEyMjY5QTVEOEVBNTdGNkFCRkYwRjlEMTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNTUxNjM3M30seyJrZXkiOnsicmVtb3RlSmlkIjoiNDQ3OTIzNDM2MDQwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZBQzdFMTE0ODg1QkRBNzA4REE0OEEyMjUxOTNCMTNBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzU1MTYzNzR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlMxdVgwRnMwVEdTbGl2QlBSdUFzdXciLCJwaG9uZUlkIjoiZDIyOGE4OWItMDA3NC00ZWQyLTk5YWItMDg0ZDUyNjUyYWFlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik41RzFVdVVqOWI0Q293M1R6cmtNWEFlOTRqRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQUJucmkvYkw2RHNjZWtTOTZOWlg4aHMvbE09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSENKWkZUM1YiLCJtZSI6eyJpZCI6IjQ0NzkyMzQzNjA0MDoxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJubXJhIFVLIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJdjQ3YmdCRU1iQng3c0dHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHeGsrcXdNbENVQnh0TnBNK1lwQitpbEV5NkdhU0pSeVZ1aDIwTXJsZ1U4PSIsImFjY291bnRTaWduYXR1cmUiOiJBcUw5azdWT2sxeDFYN3NGTWpGL04vdi9iN2gxVHpBVzRBUHJUVGIxRUx5Q3pTVEVZNEh2aWFHak4xZVBVVFo1anlNTGJxNVVpY2JKaXFSVlFRVmFBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUjdzN1lnQVVsVlczdmV1YjB5dy9nY21ja3AxRkVFZzZIMFdBdVhUZDFVeHJicDlSczZKT2JzWXZLbGdEdS9yNUY1YTIzNGduWWdpanBOeGZYV3FrQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0NDc5MjM0MzYwNDA6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnNaUHFzREpRbEFjYlRhVFBtS1Fmb3BSTXVobWtpVWNsYm9kdERLNVlGUCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNTUxNjM3MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGUHIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
