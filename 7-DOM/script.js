/*
var button = document.getElementsByTagName("button")[0];

// button.addEventListener("click", function () {
// button.addEventListener("mouseenter", function () {
button.addEventListener("mouseleave", function () {
    console.log("clickkkk");
});*/


var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");


function inputLength() {
    return input.value.length;
}

function createListElement() {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeyPress(event) {
    if (inputLength()> 0 && event.which === 13) {
        createListElement();
    }
}


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeyPress);