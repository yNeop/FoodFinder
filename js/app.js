import { inicializarHome } from "./modules/home.js";
import { inicializarExplore } from "./modules/explore.js";
import { inicializarDetalhesReceita } from "./modules/recipe-details.js";

function iniciarAplicacao() {
    if (document.getElementById("randomRecipeButton")) {
        inicializarHome();
    }

    if (document.getElementById("exploreSearchForm")) {
        inicializarExplore();
    }

    if (document.getElementById("recipeDetails")) {
        inicializarDetalhesReceita();
    }
}

iniciarAplicacao();