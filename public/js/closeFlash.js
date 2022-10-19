const crossBtn = document.querySelector(".cross-btn");
if (crossBtn) {
    crossBtn.addEventListener("click", e => {
        e.target.parentElement.remove();
    });
}
