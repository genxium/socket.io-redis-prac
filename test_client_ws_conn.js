const baseAbsPath = __dirname + '/';

const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

const host = 'localhost';
const port = 9099;
const urlToConnect = 'http://' + host + ":" + port;

// logger.debug('Url to connect is ' + urlToConnect);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const magicWorkersCount = 8;
  const workersCount = (numCPUs > magicWorkersCount ? numCPUs : magicWorkersCount);
  console.log(`The supposed workersCount == ${workersCount}.`);

  // Fork workers.
  for (let i = 0; i < workersCount; i++) {
    console.log(`Forking the ${i}-th worker.`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const Logger = require(baseAbsPath + "./backend/utils/Logger");
  const logger = Logger.instance.getLogger(__filename);
  const workerId = ((null != cluster && null != cluster.worker) ? cluster.worker.id : process.env.pm_id);
  const interval = 250;
  const uidInterval = {
    minClosed: (workerId - 1)* interval,
    maxOpen: (workerId) * interval
  }; 

  logger.info("WorkerId == %d, confirmed uidInterval == [%d, %d).", workerId, uidInterval.minClosed, uidInterval.maxOpen);

  for (let userid = uidInterval.minClosed; userid < uidInterval.maxOpen; ++userid) {
    const roomid = (userid % 100);
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
      // logger.info('Connected.');
      setInterval(() => {
        // logger.info('Sending hello to server for echoing.');
        const evtName = "message";
        socket.emit(evtName, "Hello");
      }, 1000);
    });

    socket.on("unicastedFrame", function(msg){
      // logger.info(msg);
    });

    socket.on('disconnect', function(){
      logger.warn('Disconnected.');
    });

    socket.on('error', function(err){
      logger.error(err);
    });
  }
}

