const { execPath } = require('process');

const router = require('express').Router();

router.get('/', (_req, res) => {
    const info = {
        "Entry Args" : process.argv,
        "Exec Path" : execPath,
        "Dirname" : __dirname,
        "Platform Name" : process.platform,
        "Process Id" : process.pid,
        "Node Version" : process.version,
        "Project Folder" : process.cwd(),
        "Rss" : process.memoryUsage().rss
    };

    res.send(info)
});

module.exports = router;