require('dotenv').config();         // read environment variables from .env file
const express = require('express'); 
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT;	 	
const host = process.env.MySQL_DB_HOST;

app.use(cors()); //enable ALL CORS requests (client requests from other domain)
app.use(express.json()); //enable parsing JSON body data

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'home -- Celebr8 api' });
});

// routing middleware
app.use('/',require("./routes/auth.routes.js"))
app.use('/',require("./routes/event.routes.js"))
app.use('/',require("./routes/task.routes.js"))
app.use('/',require("./routes/guest.routes.js"))
app.use('/',require("./routes/companion.routes.js"))
//app.use('/',require("./routes/chat.routes.js"))
app.use('/',require("./routes/costs.routes.js"))
app.use('/',require("./routes/categories.routes.js"))
app.use('/',require("./routes/user.routes.js"))
app.use("/",require("./routes/template.routes.js"))
// handle invalid routes
app.all('*', function (req, res) {
	res.status(400).json({ success: false, msg: `The API does not recognize the request on ${req.url}` });
})
app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));