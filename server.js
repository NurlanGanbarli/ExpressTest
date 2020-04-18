var express    = require('express');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var User       = require('./app/models/user');

var app = express();
var port = process.env.PORT || 8080;
var db = mongoose.connection;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We are connected');
})
mongoose.connect('mongodb://localhost:27017/lookforbooktest');

app.get('/', (req, res) => {
    res.send('Homeeeee');
})

app.post('/users', async (req, res) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    try {
        await user.save();
        res.send(req.body);
    } catch(err) {
        res.send({
            message: err
        })
    }

});

app.listen(port, function() {
    console.log('app is running on port ' + port);
});
