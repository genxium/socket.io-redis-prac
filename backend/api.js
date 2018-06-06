const baseAbsPath = __dirname + '/';

const Logger = require(baseAbsPath + "utils/Logger");
const logger = Logger.instance.getLogger();
const util = require('util');
const cluster = require('cluster');
const crypto = require('crypto');
function randomEleFromArray(arr) {
  const buf = Buffer.from(crypto.randomBytes(4));
  const idx = (buf.readUInt32LE() % arr.length);
  return arr[idx];
}

const express = require('express');
const app = express();
const http = require('http').Server(app);

function findUser(wsSessionHandshake) {
  // TODO: Make a genuine authentication.
  const userId = wsSessionHandshake.query.userid;
  return {
    id: userId
  };
}

/*
* Initialization of `socket.io-server` under a `worker-process` launched & managed by `pm2`. 
*/
const io = require('socket.io')(http, {
  path: '/sio',
  pingInterval: 2000,
  pingTimeout: 2000
});
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

const constants = require(baseAbsPath + '../common/constants');

// Body parser middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*------------------------*/

/**
 * @apiGroup Constants 
 * @api {get} /retCode/v:version/list RetCodeList 
 *
 * @apiSuccess {Object} N/A A single-level retCode dictionary.
 *
 */
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.RET_CODE + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST, function(req, res) {
  const toLogMsg = constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.RET_CODE + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST;
  logger.info(toLogMsg);
  res.json(constants.RET_CODE);
});

/**
 * @apiGroup Constants 
 * @api {get} /regex/v:version/list RegexList 
 *
 * @apiSuccess {Object} N/A A single-level regex dictionary.
 *
 */
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.REGEX + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST, function(req, res) {
  const toLogMsg = constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.REGEX + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST;
  logger.info(toLogMsg);
  let toRet = {};
  for (let k in constants.REGEX) {
    toRet[k] = constants.REGEX[k].toString();
  }
  res.json(toRet);
});

const port = constants.PORT;
http.listen(port, function() {
  const theAdapter = io.of('/').adapter; 
  io.use((wsSession, next) => {
    const user = findUser(wsSession.handshake);
    if (!user) return next(new Error("Authentication error"));
    wsSession.user = user;
    return next();
  });

  io.on('connect', (wsSession) => {
    const uid = wsSession.user.id;
    const roomid = parseInt(wsSession.handshake.query.roomid);
    logger.info(util.format("Uid == %s is requesting to join roomid == %s via pid == %s.", uid, roomid, process.pid));

    theAdapter.remoteJoin(wsSession.id, roomid, (err) => {
      if (err) { 
        logger.error(err);
        return;
      }
      logger.info(util.format("Uid == %s has joined roomid == %s via pid == %s.", uid, roomid, process.pid));
    });

   wsSession.on("message", (msg) => {
      logger.debug(`Received message ${JSON.stringify(msg)} from a wsSession managed by pid == ${process.pid}.`);
      const toEchoMsg = {
        fromUserId: uid,
        toUserId: uid,
      };
      wsSession.emit('unicastedFrame', toEchoMsg);
    });

    wsSession.on('disconnect', (reason) => {
      // There's no need to invoke `theAdapter.remoteLeave` for each joined `roomid` manually.
      logger.info(util.format("Uid == %s has left roomid == %s via pid == %s.", uid, roomid, process.pid));
    });
  });

  try {
    logger.info('Api service listening on port ' + port + '. ' + Date.now());
  } catch (err) {
    logger.error(err.stack);
  }
});

process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});
