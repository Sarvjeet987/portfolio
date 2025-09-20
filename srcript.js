//navbar

// let menuList = document.getElementById("menuList");
// menuList.style.maxHeight = "0px";
// function ToggleMenu() {
//     if (menuList.style.maxHeight == "0px") {
//         menuList.style.maxHeight = "400px"
//     }
//     else {
//         menuList.style.maxHeight = "0px";
//     }
// }


//updated

let menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

function ToggleMenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "500px";
    } else {
        menuList.style.maxHeight = "0px";
    }
}

// Add event listeners to each menu item to hide the menu on click
let menuItems = menuList.querySelectorAll("li");
menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
        menuList.style.maxHeight = "0px";
    });
});

const hireBtn = document.getElementById("hireBtn");
hireBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent double firing if needed
    menuList.style.maxHeight = "0px";
    // Add any extra action for the Hire Me button here
});

/*** */


//***************************************** */


/*form message*/

// const form = document.getElementById("contactForm");
// form.addEventListener("submit", function (e) {
//     const name = form.name.value.trim();
//     const email = form.email.value.trim();
//     const subject = form.subject.value.trim();
//     const message = form.message.value.trim();
//     if (!name || !email || !subject || !message) {
//         e.preventDefault();
//         alert("Please fill out the form!");
//     } else {
//         alert("Message sent successfully!");
//     }
// });


const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
        e.preventDefault(); // stop form submit
        alert("Please fill out the form!");
    } else {
        alert("Message sent successfully!");
        // Thoda delay rakhenge taki Formspree pe data chala jaye
        setTimeout(() => {
            form.reset(); // input fields clear
        }, 500);
    }
});



//************************************************* */


//moving text
var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Mern Full-Stack Developer')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Web Designer')
    .pauseFor(2500)
    .deleteAll()
    .typeString('<strong>FrontEnd Developer</strong>')
    .pauseFor(2500)
    .start();



