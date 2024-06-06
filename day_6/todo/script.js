document.addEventListener("DOMContentLoaded", (event) => {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                addListItem(item.title, item.completed);
            });
        })
        .catch((error) => console.error("Error fetching the data:", error));

    var list = document.querySelector("ul");
    list.addEventListener(
        "click",
        function (ev) {
            if (ev.target.tagName === "LI") {
                ev.target.classList.toggle("checked");
            }
        },
        false
    );
});

function addListItem(text, completed = false) {
    var li = document.createElement("li");
    var t = document.createTextNode(text);
    li.appendChild(t);
    if (completed) {
        li.classList.add("checked");
    }
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
        alert("Write a todo work before you ADD!");
    } else {
        addListItem(inputValue);
        document.getElementById("myInput").value = "";
    }
}
