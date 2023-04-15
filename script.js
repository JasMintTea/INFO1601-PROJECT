const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
//const recipeDetails = document.querySelector('.recipe-details-content');
let searchQuery = '';

const APP_key = '9fea73347101034b287c350553a7c7ec	';
const appID = 'c6977f74';
const appIDA = '4b1ef78f';
const APP_keyA = '61dfe6de42d5d5ec31f500e28c3d7d13';

// console.log(container)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appIDA}&app_key=${APP_keyA}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
      `
    <div class="item">
      <div class="item-image">
        <img src="${result.recipe.image}" alt="img">
      </div>
        <div class="item-content">
          <h2 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url
      }">View Recipe</a>
        <p class="item-data-2"> Calories: ${result.recipe.calories.toFixed(2)} kcal</p>
        <p class="item-data"> Diet label: </p>  <p class="item-data-2">${result.recipe.dietLabels.length > 0
        ? result.recipe.dietLabels
        : "No Data Found"
      }</p>
        <p class="item-data">Health labels: </p><p class="item-data-2"> ${result.recipe.healthLabels}</p>
        </div>
      </div>
    `;

  })
  searchResultDiv.innerHTML = generatedHTML;
}