const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});


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
                id: '123',
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
    const { email, name } = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
    })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('not found');
            }
    })
        .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
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
