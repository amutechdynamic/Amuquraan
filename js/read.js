const params = new URLSearchParams(window.location.search);

const surah = params.get("surah") || 1;

const title = document.getElementById("surahTitle");
const container = document.getElementById("ayahContainer");

let currentAudio = null;

async function loadSurah() {

    try {

        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surah}/editions/quran-uthmani,en.asad`
        );

        const data = await response.json();

        const arabic = data.data[0];
        const english = data.data[1];

        title.textContent = `${arabic.englishName} (${arabic.name})`;

        container.innerHTML = "";

        arabic.ayahs.forEach((ayah, index) => {

            container.innerHTML += `

            <div class="ayah">

    <div class="ayah-header">

        <span class="ayah-number">
            ${ayah.numberInSurah}
        </span>
        

        <div class="ayah-icons">
<button onclick="markMemorized(${surah}, ${ayah.numberInSurah})">
    ✅
</button>

            <button onclick="playAudio(${ayah.numberInSurah})">
                ▶️
            </button>

            <button onclick="copyAyah(\`${ayah.text}\`)">
                📋
            </button>

            <button onclick="bookmarkAyah(${ayah.numberInSurah})">
                ⭐
            </button>

        </div>

    </div>

    <p class="arabic">
        ${ayah.text}
    </p>

    <p class="translation">
        ${english.ayahs[index].text}
    </p>

</div>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadSurah();

const player = document.getElementById("audioPlayer");

function playAudio(ayahNumber) {
    saveLastRead(ayahNumber);
    currentRepeat = 0;

    const surahNo = String(surah).padStart(3, "0");
    const ayahNo = String(ayahNumber).padStart(3, "0");

    player.src =
        `https://everyayah.com/data/Alafasy_128kbps/${surahNo}${ayahNo}.mp3`;

    player.play();

    player.onended = function () {

        currentRepeat++;

        if (currentRepeat < repeatCount) {

            player.play();

        }

    };

}
function copyAyah(text) {

    navigator.clipboard.writeText(text);

    showToast("Ayah copied successfully.");

}
let repeatCount = 1;
let currentRepeat = 0;

function setRepeat(value) {

    repeatCount = value;

    currentRepeat = 0;

    alert(`Repeat set to ${value}x`);

}
function bookmarkAyah(ayah) {

    localStorage.setItem("bookmark", JSON.stringify({

        surah: surah,

        ayah: ayah

    }));

    showToast("Bookmark saved successfully.");
    upgdateProgress();

}



function saveLastRead(ayah) {

    localStorage.setItem("lastRead", JSON.stringify({

        surah: surah,

        ayah: ayah

    }));

}
let fontSize = 42;
let progress = 0;

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2000);
}

function changeFontSize(value) {
    fontSize += value;

    document.querySelectorAll(".arabic").forEach(ayah => {
        ayah.style.fontSize = fontSize + "px";
    });
}

function updateProgress() {
    progress += 5;

    if (progress > 100) {
        progress = 100;
    }

    document.getElementById("progressBar").style.width = progress + "%";
}
function favoriteSurah() {

    localStorage.setItem("favoriteSurah", surah);

    showToast("Surah added to Favorites ❤️");

}
document.addEventListener("input", (e) => {

    if (e.target.id !== "searchAyah") return;

    const value = e.target.value.toLowerCase();

    document.querySelectorAll(".ayah").forEach((ayah) => {

        ayah.style.display =
            ayah.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";

    });

});
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

settingsBtn.onclick = () => {
    settingsPanel.classList.add("active");
};

closeSettings.onclick = () => {
    settingsPanel.classList.remove("active");
};

document.getElementById("fontSlider").addEventListener("input", function () {

    document.querySelectorAll(".arabic").forEach(ayah => {

        ayah.style.fontSize = this.value + "px";

    });

});

function markMemorized(surahNumber, ayahNumber){

    let memorized = JSON.parse(localStorage.getItem("memorized")) || [];

    const exists = memorized.some(item =>
        item.surah === surahNumber &&
        item.ayah === ayahNumber
    );

    if(!exists){

        memorized.push({
            surah: surahNumber,
            ayah: ayahNumber
        });

        localStorage.setItem(
            "memorized",
            JSON.stringify(memorized)
        );

        showToast("Ayah marked as memorized ✅");

    }else{

        showToast("Already memorized.");

    }

}

