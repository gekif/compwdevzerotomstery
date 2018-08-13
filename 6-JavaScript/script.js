var database = [
    {
        username: "Fikar",
        password: "12345"
    }
];

var newsFeed = [
    {
        username: "Anjay",
        timeline: "tired from all that learning"
    },
    {
        username: "Sally",
        timeline: "Javascipt is cool"
    }
];

var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("Enter your password");

function singIn(user, pass) {
    if (user === database[0].username &&
        pass === database[0].password) {
        console.log(newsFeed);
    } else {
        alert("Incorrect");
    }
}

singIn(userNamePrompt, passwordPrompt);