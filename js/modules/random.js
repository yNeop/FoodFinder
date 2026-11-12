import { buscarReceitaAleatoria } from "../services/mealdb.js";

export function inicializarRandom() {
    const botaoRandom = document.getElementById("randomRecipeButton");

    if (!botaoRandom) return;

    botaoRandom.addEventListener("click", async () => {
        const textoOriginal = botaoRandom.textContent;

        try {
            botaoRandom.disabled = true;
            botaoRandom.textContent = "Sorteando...";

            const receita = await buscarReceitaAleatoria();

            if (!receita) {
                alert("Não foi possível encontrar uma receita.");
                return;
            }

            window.location.href = new URL(
                `pages/explore.html?random=${encodeURIComponent(receita.idMeal)}`,
                window.location.href
            ).href;

        } catch (erro) {
            console.error("Erro ao sortear receita:", erro);
            alert("Erro ao buscar receita aleatória. Tente novamente.");

        } finally {
            botaoRandom.disabled = false;
            botaoRandom.textContent = textoOriginal;
        }
    });
}