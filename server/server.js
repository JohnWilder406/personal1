const express = require('express');
const cors = require('cors')
const app = express();


//server config first
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

//run mongoose connect
// require('./config/mongoose.config');

//routes next
// require('./routes/movie.routes')(app)

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})