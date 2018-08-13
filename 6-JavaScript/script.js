function sayHello() {
    console.log('Hellow');
}

//Function expression
var sayBye = function () {
    console.log('goodbye');
};

var sing = function (sing) {
    console.log("i'm singing " + sing);
};



input.onclick = function () {
    var a = '';
    var b = prompt("Choose your song" + a);
    sing(b);
};

button.onclick = function () {
    sayHello();
    sayBye();
};

