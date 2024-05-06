 // Replace with your server URL
const urlAllRecipes = `${baseServerURL}/recipes`;

document.getElementById('fetch-recipes').addEventListener('click', async () => {
  const response = await fetch(`${urlAllRecipes}?page=1&limit=5`);
  const recipes = await response.json();
  renderRecipes(recipes);
});

window.addEventListener('scroll', async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const currentPage = document.querySelectorAll('.recipe-card').length / 5 + 1;
    const response = await fetch(`${urlAllRecipes}?page=${currentPage}&limit=5`);
    const recipes = await response.json();
    renderRecipes(recipes);
  }
});

function renderRecipes(recipes) {
  const dataListWrapper = document.getElementById('data-list-wrapper');
  recipes.forEach(recipe => {
    const recipeCard = `
      <div class="recipe-card">
        <div>
          <img src="${recipe.image}" alt="${recipe.name}">
        </div>
        <div class="recipe-details">
          <h2 class="recipe-name">${recipe.name}</h2>
          <p class="recipe-price">${recipe.price}</p>
        </div>
      </div>
    `;
    dataListWrapper.innerHTML += recipeCard;
  });
  updateTotalResults();
}

function updateTotalResults() {
  const totalResultsSpan = document.querySelector('.total-results');
  totalResultsSpan.textContent = document.querySelectorAll('.recipe-card').length;
}
