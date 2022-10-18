const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
    if (navLinks.classList.contains("closed")) {
        navLinks.classList.remove("left-full", "closed");
        navLinks.classList.add("left-0");
    } else {
        navLinks.classList.add("left-full", "closed");
        navLinks.classList.remove("left-0");
    }
});
