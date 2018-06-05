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
const urlToConnect = constants.HTTP_PROTO + '://' + host + constants.HTTP_PORT;
const userid = argv[0];
const roomid = argv[1];

logger.debug('Url to connect is ' + urlToConnect);

const socket = require('socket.io-client')(urlToConnect, {
  path: '/sio',
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
