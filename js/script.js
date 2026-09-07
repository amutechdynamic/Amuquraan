const surahList = document.getElementById("surahList");

async function loadSurahs(){

const response = await fetch("https://api.alquran.cloud/v1/surah");

const data = await response.json();

displaySurahs(data.data);

}

function displaySurahs(surahs){

surahList.innerHTML="";

surahs.forEach(surah=>{

surahList.innerHTML += `

<div class="surah-card"
onclick="openSurah(${surah.number})">

<h3>${surah.englishName}</h3>

<h2>${surah.name}</h2>

<p>${surah.numberOfAyahs} Ayahs</p>

<p>${surah.revelationType}</p>

</div>

`;

});
document.querySelectorAll(".surah-card").forEach(card=>{
    card.classList.add("fade-in");
});

}

function openSurah(id){

location.href=`read.html?surah=${id}`;

}

loadSurahs();
const continueCard = document.getElementById("continueCard");

const lastRead = JSON.parse(localStorage.getItem("lastRead"));

if (continueCard && lastRead) {

    continueCard.innerHTML = `
        <h3>Surah ${lastRead.surah}</h3>
        <p>Continue from Ayah ${lastRead.ayah}</p>
    `;

    continueCard.onclick = () => {
        location.href = `read.html?surah=${lastRead.surah}`;
    };

}
const dailyAyah = document.getElementById("dailyAyah");

const verses = [

"Indeed, with hardship comes ease. (94:6)",

"So remember Me; I will remember you. (2:152)",

"And Allah is the best of planners. (8:30)"

];

if(dailyAyah){

dailyAyah.textContent =
verses[Math.floor(Math.random()*verses.length)];

}
