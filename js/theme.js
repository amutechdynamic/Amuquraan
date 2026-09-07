// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// Dark mode button
const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {

    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "☀️";
    }

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkModeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkModeBtn.textContent = "🌙";
        }

    });

}