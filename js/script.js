// Retseptide laadimine JSON-ist ja kuvamine
document.addEventListener("DOMContentLoaded", function () {
    const recipeList = document.querySelector(".recipe-grid");

    fetch("data/recipes.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-item");
                recipeCard.innerHTML = `
                    <a href="retsept.html?id=${recipe.id}">
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description}</p>
                    </a>
                `;
                recipeList.appendChild(recipeCard);
            }); 
        });

    // Otsingufunktsioon
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const recipeItems = document.querySelectorAll(".recipe-item");

        recipeItems.forEach(item => {
            const recipeName = item.querySelector("h3").textContent.toLowerCase();
            item.style.display = recipeName.includes(searchTerm) ? "block" : "none";
        });
    });
});

// Laadi retsepti andmed retsept.html lehele
if (window.location.pathname.endsWith("retsept.html")) {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");

    fetch("data/recipes.json")
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(item => item.id == recipeId);
            if (recipe) {
                const recipeDetails = document.getElementById("recipe-details");
                recipeDetails.innerHTML = `
                    <h1>${recipe.title}</h1>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h2>Koostisosad</h2>
                    <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                    <h2>Juhised</h2>
                    <p>${recipe.instructions}</p>
                `;
            }
        });
}


// Kommentaari lisamine
function addComment() {
    const commentBox = document.getElementById("commentBox");
    const commentSection = document.getElementById("commentSection");

    const newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerText = commentBox.value;

    commentSection.appendChild(newComment);
    commentBox.value = "";
}
