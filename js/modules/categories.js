import {
    buscarCategorias,
    buscarReceitas,
    buscarReceitasPorCategoria
} from "../services/mealdb.js";

import { exibirReceitas } from "./recipes.js";

import {
    exibirMensagem,
    exibirCarregamento
} from "../utils/messages.js";

export function inicializarCategorias() {
    const seletor = document.getElementById("categorySelect");
    const elementoReceitas = document.getElementById("featuredRecipes");

    if (!seletor || !elementoReceitas) {
        return;
    }

    async function carregarCategorias() {
        try {
            const categorias = await buscarCategorias();

            categorias.forEach((categoria) => {
                const opcao = document.createElement("option");

                opcao.value = categoria.strCategory;
                opcao.textContent = categoria.strCategory;

                seletor.appendChild(opcao);
            });

        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);

            exibirMensagem(
                elementoReceitas,
                "Não foi possível carregar as categorias.",
                "danger"
            );
        }
    }

    async function filtrarPorCategoria() {
        const categoria = seletor.value;

        try {
            seletor.disabled = true;

            if (!categoria) {
                exibirCarregamento(elementoReceitas);

                const receitas = await buscarReceitas("Arrabiata");

                exibirReceitas(receitas, elementoReceitas);

                return;
            }

            exibirCarregamento(
                elementoReceitas,
                "Carregando receitas da categoria..."
            );

            const receitas = await buscarReceitasPorCategoria(categoria);

            exibirReceitas(receitas, elementoReceitas, categoria);

        } catch (erro) {
            console.error("Erro ao filtrar categorias:", erro);

            exibirMensagem(
                elementoReceitas,
                "Não foi possível carregar as receitas.",
                "danger"
            );

        } finally {
            seletor.disabled = false;
        }
    }

    seletor.addEventListener("change", filtrarPorCategoria);

    carregarCategorias();
}
