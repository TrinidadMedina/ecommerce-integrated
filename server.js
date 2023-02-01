const app = require('./app');
const minimist = require('minimist');

//const PORT = process.env.PORT || 3001;

const options = {default:{PORT: 8080}}

const argParams = minimist(process.argv.slice(2), options);

const PORT = argParams.PORT;

app.listen(PORT, () => {
    console.info(`Server up and running on port: ${PORT}`)
})