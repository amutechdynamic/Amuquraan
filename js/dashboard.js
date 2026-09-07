const memorized = JSON.parse(localStorage.getItem("memorized")) || [];

document.getElementById("memorizedCount").textContent = memorized.length;

const totalAyahs = 6236;

const percent = (memorized.length / totalAyahs) * 100;

document.getElementById("progressBar").style.width = percent + "%";

document.getElementById("streak").textContent =
localStorage.getItem("streak") || 0;