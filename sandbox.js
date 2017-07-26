require('./lib/connect');
const Otter = require('./lib/models/otter');

Otter.findById('58ff9f496aafd447111c29b5')
    .then(otter => {
        console.log('this is the first console log' + otter);
    })
    .catch(console.log);