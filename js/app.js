import { inicializarRandom } from "./modules/random.js";
import { inicializarPesquisa } from "./modules/search.js";
import { inicializarCategorias } from "./modules/categories.js";

// Inicializa a aplicação
function iniciarAplicacao() {
    inicializarPesquisa();
    inicializarCategorias();
    inicializarRandom();
}

iniciarAplicacao();