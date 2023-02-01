const router = require('express').Router();
const _ = require('lodash');

router.get('/randoms', (req, res) => {
    let {cant} = req.query;
    if(_.isUndefined(cant)){
        cant = 100000000
    };
    let randomNumbers = {};
    for (let i = 0; i < cant; i++){
        const num = Math.floor(Math.random() * (1000 - 1) + 1);
        randomNumbers[num] ? randomNumbers[num] += 1 : randomNumbers[num] = 1;
    }
    res.status(200).json({randomNumbers});
});

module.exports = router;

/* Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms. */
