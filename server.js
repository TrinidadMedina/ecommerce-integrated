const app = require('./app');
const minimist = require('minimist');

//const PORT = process.env.PORT || 3001;

const options = {default:{PORT: 8080, MODO: 'FORK'}}

const argParams = minimist(process.argv.slice(2), options);

const PORT = argParams.PORT;
const MODO = argParams.MODO;

app.listen(PORT, () => {
    console.info(`Server up and running on port: ${PORT}`)
})


/* const cluster = require('cluster');
const numCPUs = require('os').cpus().length; */


/* if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    })
}else{
    app.get('/', (_req, res) => {
        res.send('Hola mundo ' + process.pid)
    })
    app.listen(8081, () => {
        console.info(`Worker ${process.pid} started`);
    });
}; */
