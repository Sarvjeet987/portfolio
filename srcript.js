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

typewriter.typeString('Mern Stack Developer')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Web Designer')
    .pauseFor(2500)
    .deleteAll()
    .typeString('<strong>Frontend Developer</strong>')
    .pauseFor(2500)
    .start();


// Function to show the modal
function showModal() {
    const modal = document.getElementById('welcomeModal');
    // Check if the user has already seen the modal in this session
    if (!sessionStorage.getItem('modalSeen')) {
        modal.classList.add('show');
    }
}

// Function to close the modal
function closeModal(event) {
    // Prevent default action if it's an <a> tag click
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    const modal = document.getElementById('welcomeModal');
    modal.classList.remove('show');
    // Set a flag so the modal doesn't show again on reload (for this session)
    sessionStorage.setItem('modalSeen', 'true');
}

// Event listener to show the modal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // ... (Other functions like animateCards() and setupFiltering() are also called here)
    showModal();

    // Event listener for the close button, make sure this runs after DOMContentLoad
    document.querySelector('.close-btn').addEventListener('click', closeModal);
});





//PROJECT POPUP

let projectLinkToOpen = null;

const projectButtons = document.querySelectorAll(".proj-btn");

projectButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        projectLinkToOpen = this.getAttribute("data-link");
        document.getElementById("projectAccessPopup").style.display = "flex";
    });
});

document.getElementById("projSubmitBtn").addEventListener("click", function () {
    let userName = document.getElementById("projUserName").value.trim();
    let errorBox = document.getElementById("proj-error-msg");

    if (userName === "") {
        errorBox.innerText = "Please enter your full name.";
        errorBox.style.color = "red";
        return;
    }

    errorBox.innerText = "";
    document.getElementById("projectAccessPopup").style.display = "none";

    if (projectLinkToOpen) {
        window.open(projectLinkToOpen, "_blank");
    }
});

document.getElementById("projCloseBtn").addEventListener("click", function () {
    document.getElementById("projectAccessPopup").style.display = "none";
    document.getElementById("projUserName").value = "";
    document.getElementById("proj-error-msg").innerText = "";
});

