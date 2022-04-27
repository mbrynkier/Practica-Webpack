const fs = require('fs'); //es de file system

fs.writeFileSync('./.env', `API =${process.env.API}\n`);