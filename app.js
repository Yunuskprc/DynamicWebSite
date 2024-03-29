const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const loginRoute = require('./routers/LoginController');
const adminRouter = require('./routers/AdminController.js');
const blogRouter = require('./routers/BlogController');
const APIrouter = require('./routers/apicontrol.js')

const app = express();
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image",express.static(__dirname))
app.use(express.static(path.join(__dirname, '/public')));
app.use('/image', express.static(path.join(__dirname, 'public/image')));

app.use('/Login', loginRoute);
app.use('/Admin', adminRouter);
app.use('/', blogRouter);
app.use('/api',APIrouter);
app.listen(4000, () => {
  console.log('server çalışıyor.');
});