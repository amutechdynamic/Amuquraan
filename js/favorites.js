const container = document.getElementById("favoriteContainer");

const favorite = localStorage.getItem("favoriteSurah");

if(favorite){

container.innerHTML = `

<div class="surah-card">

<h2>Surah ${favorite}</h2>

<a href="read.html?surah=${favorite}">
Open Surah
</a>

</div>

`;

}