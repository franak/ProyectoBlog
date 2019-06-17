const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const mongoUrl = 'mongodb://127.0.0.1/meanblog';
const mongoUrl = 'mongodb://aepiblogadmin:Aepi1001@ds137857.mlab.com:37857/heroku_0cvtn66v';

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
})

/* 
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aepi-blog.firebaseio.com"
});
 */

// let db;

// MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
//     if (err) return console.log(err)
//     db = client.db('blogtestdb') // whatever your database name is
//     app.listen(3000, () => {
//         console.log('listening on 3000')
//     })
// })

module.export = db;