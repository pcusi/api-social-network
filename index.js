const express = require('express');
const app = express();

const port = process.env.PORT || 4500;
const _parser = require('body-parser');
const _cors = require('cors');

app.use(_parser.urlencoded({
    extended: false
}));
app.use(_cors());

const _userRoute = require('./routes/user.routes');
const _friendRoute = require('./routes/friendship.routes');
const _publicationRoute = require('./routes/publication.routes');
app.use('/api/v1', [_userRoute, _friendRoute, _publicationRoute]);

const mongo = require('mongoose');
mongo.Promise = global.Promise;

mongo.connect('mongodb://localhost:27017/db-social_network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(connected => {
    if (connected) {
        console.log('MONGODB CONNECTED');
        app.listen(port, () => {
            console.log(`http://localhost:${port}/api/v1/`)
        });
    }
}).catch(err => console.log(`${err}`))