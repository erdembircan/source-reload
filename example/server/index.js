const fs = require('fs');
const path = require('path');
const Server = require('./server');

// emulating developer changing a json file that is being served through an api endpoint
setTimeout(() => {
  console.log('💾 writing to file to force restart');
  const tempJson = {
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
  };
  fs.writeFileSync(path.resolve(__dirname, 'last_restart.json'), JSON.stringify(tempJson));
}, 8000);

const exampleServer = new Server();
exampleServer.listen();
