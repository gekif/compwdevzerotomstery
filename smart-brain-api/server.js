const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users:
        [
            {
                id: '123',
                name: 'fikar',
                password: 'polah',
                email: 'fikar@gmail.com',
                entries: 0,
                joined: new Date()
            },
            {
                id: '321',
                name: 'Febrina',
                password: 'tempo',
                email: 'febrina.maulana@gmail.com',
                entries: 0,
                joined: new Date()
            }
        ],
    login:
        [
            {
                id: '987',
                hash: '',
                email: 'fikar@gmail.com'
            }
        ]
};



app.get('/', (req, res) => {
    res.send(database.users);
});



app.post('/signin', (req, res) => {
    bcrypt.compare("password", "$2a$10$kJcFnTi45hIzEOIyIV/QPux8if3WEoLo7nofoy.8klAxQ1V9zvOH2", function (err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", "$2a$10$kJcFnTi45hIzEOIyIV/QPux8if3WEoLo7nofoy.8klAxQ1V9zvOH2", function (err, res) {
        console.log('second guess', res);
    });

    const { email, password } = req.body;
    if (email === database.users[0].email &&
        password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error login');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '3333',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
           return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
});



app.listen(3005, () => {
    console.log('Running');
});

/**
 * / --> res = this is working
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 *
 */
