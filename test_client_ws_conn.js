const baseAbsPath = __dirname + '/';

const Logger = require(baseAbsPath + "./backend/utils/Logger");
const logger = Logger.instance.getLogger(__filename);

const constants = require(baseAbsPath + "./common/constants");

const argv = process.argv.slice(2);

if (2 > argv.length) {
  logger.error('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <userid> <roomid>');
  return;
}

const host = 'localhost';
const urlToConnect = 'http://' + host + ":9099";
const userid = argv[0];
const roomid = argv[1];

logger.debug('Url to connect is ' + urlToConnect);

const socket = require('socket.io-client')(urlToConnect, {
  path: '/sio',
  /* Unfortunately, due to an unknown reason (could be implementation specific for `socket.io-client` or `socket.io-server` or `socket.io-redis`), the
   * following configuration of `transports` is COMPULSORY to make the "stateful load-balancing" work here in this repository.
   * 
   * This is NOT LIKELY a general constraint for all implementations, see "https://github.com/genxium/nodejs-cluster-prac" for comparison and more information.
   */
  transports: ['websocket'], 
  query: 'userid=' + userid + '&roomid=' + roomid 
});

socket.on('connect', function(){
  logger.info('Connected.');
  setTimeout(function() {
    logger.debug('Sending hello to server for echoing.');
    const evtName = "message";
    socket.emit(evtName, "Hello");
  }, 1000);
});

socket.on("unicastedFrame", function(msg){
  logger.info(msg);
});

socket.on('disconnect', function(){
  logger.warn('Disconnected.');
});

socket.on('error', function(err){
  logger.error(err);
});

