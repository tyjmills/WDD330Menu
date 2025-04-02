// JavaScript code for the meal search application
async function fetchRecipesByName(name) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients;
}

async function searchMeals() {
    let searchInput = document.getElementById("search-input").value.trim();
    let mealList = document.getElementById("meal-list");

    if (searchInput === "") {
        mealList.innerHTML = "<p style='text-align:center;'>Start typing to search for meals...</p>";
        return;
    }

    let meals = await fetchRecipesByName(searchInput);
    mealList.innerHTML = ""; // Clear previous results

    if (meals.length === 0) {
        mealList.innerHTML = "<p style='text-align:center;'>No meals found. Try a different name.</p>";
        return;
    }

    meals.forEach(meal => {
        let mealDiv = document.createElement("div");
        mealDiv.classList.add("meal");

        let ingredientsList = getIngredients(meal)
            .map(item => `<li>${item}</li>`)
            .join("");

        mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <div class="details">
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>${ingredientsList}</ul>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
        `;

        mealDiv.addEventListener("click", () => {
            let details = mealDiv.querySelector(".details");
            details.style.display = details.style.display === "none" || details.style.display === "" ? "block" : "none";
        });

        mealList.appendChild(mealDiv);
    });
}

const text = "Let's Get Cook'n!";
let index = 0;
function typeTitle() {
    if (index < text.length) {
        document.getElementById("title").textContent += text.charAt(index);
        index++;
        setTimeout(typeTitle, 100); // Adjust speed here
    }
}
window.onload = typeTitle; // Start animation when page loads
