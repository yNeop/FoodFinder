import { buscarReceitaAleatoria } from "../services/mealdb.js";
import { criarCardReceita } from "./recipes.js";

export function inicializarRandom() {
    const botaoRandom = document.getElementById("randomRecipeButton");
    const elementoReceitas = document.getElementById("featuredRecipes");

    // Evita erros caso os elementos não existam na página
    if (!botaoRandom || !elementoReceitas) {
        return;
    }

    botaoRandom.addEventListener("click", async () => {
        const textoOriginal = botaoRandom.textContent;

        try {
            botaoRandom.disabled = true;
            botaoRandom.textContent = "Sorteando...";
            elementoReceitas.innerHTML = `
                <div class="col-12 text-center">
                    <p>Buscando uma receita aleatória...</p>
                </div>
            `;

            const receita = await buscarReceitaAleatoria();

            elementoReceitas.innerHTML = "";

            if (!receita) {
                elementoReceitas.innerHTML = `
                    <div class="col-12">
                        <p class="alert alert-warning">
                            Não foi possível encontrar uma receita.
                        </p>
                    </div>
                `;
                return;
            }

            const card = criarCardReceita(receita);
            elementoReceitas.appendChild(card);

        } catch (erro) {
            console.error("Erro ao buscar receita aleatória:", erro);

            elementoReceitas.innerHTML = `
                <div class="col-12">
                    <p class="alert alert-danger">
                        Não foi possível carregar a receita. Tente novamente.
                    </p>
                </div>
            `;
        } finally {
            botaoRandom.disabled = false;
            botaoRandom.textContent = textoOriginal;
        }
    });
}