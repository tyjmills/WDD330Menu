async function getMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];

        document.getElementById('meal').innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
        `;
    } catch (error) {
        console.error("Error fetching meal:", error);
    }
}

// Load a meal on page load
getMeal();

const text = "What We Having?";
let index = 0;
function typeTitle() {
    if (index < text.length) {
        document.getElementById("title").textContent += text.charAt(index);
        index++;
        setTimeout(typeTitle, 100); // Adjust speed here
    }
}
window.onload = typeTitle; // Start animation when page loads