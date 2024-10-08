const burger = document.getElementById("burger");
const mobileNav = document.querySelector(".nav-mobile")

burger.onclick = function() {
    mobileNav.classList.toggle("active");
};