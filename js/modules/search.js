import { buscarReceitas } from "../services/mealdb.js";
import { exibirReceitas } from "./recipes.js";
import {
    exibirMensagem,
    exibirCarregamento
} from "../utils/messages.js";

export function inicializarPesquisa() {
    const formulario = document.getElementById("searchForm");
    const campoPesquisa = document.getElementById("searchInput");
    const elementoReceitas = document.getElementById("featuredRecipes");

    if (!formulario || !campoPesquisa || !elementoReceitas) {
        return;
    }

    const botaoPesquisa = formulario.querySelector("button");

    async function pesquisar(evento) {
        evento.preventDefault();

        const nome = campoPesquisa.value.trim();

        if (!nome) {
            exibirMensagem(
                elementoReceitas,
                "Digite o nome de uma receita para pesquisar.",
                "warning"
            );

            campoPesquisa.focus();
            return;
        }

        const textoOriginal = botaoPesquisa.textContent;

        try {
            botaoPesquisa.disabled = true;
            botaoPesquisa.textContent = "Pesquisando...";

            exibirCarregamento(
                elementoReceitas,
                "Buscando receitas, aguarde..."
            );

            const receitas = await buscarReceitas(nome);

            exibirReceitas(receitas, elementoReceitas);

        } catch (erro) {
            console.error("Erro na pesquisa:", erro);

            exibirMensagem(
                elementoReceitas,
                "Não foi possível realizar a pesquisa. Tente novamente.",
                "danger"
            );

        } finally {
            botaoPesquisa.disabled = false;
            botaoPesquisa.textContent = textoOriginal;
        }
    }

    formulario.addEventListener("submit", pesquisar);
}
