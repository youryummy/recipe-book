import mongoose from 'mongoose';
import server from './server.js';
import 'dotenv/config';


// Node environment
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

// Mongo connection variables
const mongoPort = process.env.MONGO_PORT ?? 27017;
const mongoHost = process.env.MONGO_HOST ?? 'localhost';
const mongoDBName = process.env.MONGO_DBNAME ?? 'recipesBook';
const mongoProto = process.env.MONGO_PROTO ?? 'mongodb';
const mongoUser = process.env.MONGO_USER;
const mongoPwd = process.env.MONGO_PWD;

const mongoURL = `${mongoProto}://` +
  `${mongoUser ? mongoUser + ":" : ""}` +
  `${mongoPwd ? mongoPwd + "@" : ""}` +
  `${mongoHost}${mongoProto == "mongodb+srv" ? "" : ":" + mongoPort}` +
  `/${mongoDBName}`;

  console.log("Mongo URL: " + mongoURL);

const mongooseConnect = function () {

 
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error: "));
  return mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  });
};

mongoose.set('strictQuery', false);

mongooseConnect().then(() => {
  server.deploy(env).catch(err => { console.log(err); });
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
  console.log(`[${new Date().toISOString()}] Got SIGINT (aka ctrl-c in docker). Graceful shutdown`);
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.log(`[${new Date().toISOString()}] Got SIGTERM (docker container stop). Graceful shutdown`);
  shutdown();
});

const shutdown = () => {
  server.undeploy();
};
