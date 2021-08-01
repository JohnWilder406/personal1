const mongoose = require('mongoose');
const dbName = "";

mongoose.connect("mongodb://127.0.0.1/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the "${dbName}" database`))
    .catch(err => console.log(`Something went wrong when connecting to the "${dbName}" database`, err))