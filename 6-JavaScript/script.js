var database = [
    {
        username: "Fikar",
        password: "12345"
    },
    {
        username: "Antoka",
        password: "12345"
    },
    {
        username: "Miras",
        password: "12345"
    },
];

var newsFeed = [
    {
        username: "Anjay",
        timeline: "tired from all that learning"
    },
    {
        username: "Sally",
        timeline: "Javascipt is cool"
    },
    {
        username: "Mirah",
        timeline: "Ngokkkk"
    }
];


function isUserValid(username, password) {
    for (var i = 0; i < database.length; i++) {
        if (database[i].username === username &&
            database[i].password === password) {
            return true;
        }
    }
    return false;
}

function singIn(username, password) {
    if (isUserValid(username, password)) {
        console.log(newsFeed);
    } else {
        alert("Incorrect username or password");
    }
}


var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("Enter your password");

singIn(userNamePrompt, passwordPrompt);