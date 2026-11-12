import {
    buscarCategorias,
    buscarReceitas,
    buscarReceitasPorCategoria,
    buscarReceitaPorId
} from "../services/mealdb.js";

import { exibirReceitas } from "./recipes.js";

import {
    exibirMensagem,
    exibirCarregamento
} from "../utils/messages.js";

const formulario = document.getElementById("exploreSearchForm");
const campoPesquisa = document.getElementById("exploreSearchInput");
const seletorCategoria = document.getElementById("exploreCategorySelect");
const botaoPesquisa = document.getElementById("exploreSearchButton");
const areaReceitas = document.getElementById("exploreRecipes");
const status = document.getElementById("exploreStatus");

// Carrega as categorias
async function carregarCategorias() {
    try {
        const categorias = await buscarCategorias();

        categorias.forEach(({ strCategory }) => {
            const opcao = document.createElement("option");
            opcao.value = strCategory;
            opcao.textContent = strCategory;
            seletorCategoria.appendChild(opcao);
        });

    } catch (erro) {
        console.error("Erro ao carregar categorias:", erro);

        exibirMensagem(
            areaReceitas,
            "Não foi possível carregar as categorias. Tente novamente.",
            "danger"
        );
    }
}

// Pesquisa receitas
async function pesquisarReceitas(evento) {
    evento?.preventDefault();

    const nome = campoPesquisa.value.trim();
    const categoria = seletorCategoria.value;

    if (!nome && !categoria) {
        exibirMensagem(
            areaReceitas,
            "Digite o nome de uma receita ou selecione uma categoria.",
            "warning"
        );

        campoPesquisa.focus();
        return;
    }

    botaoPesquisa.disabled = true;

    exibirCarregamento(areaReceitas, "Buscando receitas...");
    status.textContent = "Buscando receitas.";

    try {
        let receitas;

        if (categoria) {
            receitas = await buscarReceitasPorCategoria(categoria);

            if (nome) {
                const termo = nome.toLocaleLowerCase("pt-BR");

                receitas = receitas.filter((receita) =>
                    receita.strMeal.toLocaleLowerCase("pt-BR").includes(termo)
                );
            }
        } else {
            receitas = await buscarReceitas(nome);
        }

        exibirReceitas(receitas, areaReceitas, categoria);

        status.textContent = `${receitas.length} receita(s) encontrada(s).`;

    } catch (erro) {
        console.error("Erro ao pesquisar receitas:", erro);

        exibirMensagem(
            areaReceitas,
            "Não foi possível conectar à TheMealDB. Verifique sua internet e tente novamente.",
            "danger"
        );

        status.textContent = "Falha ao buscar receitas.";

    } finally {
        botaoPesquisa.disabled = false;
    }
}

// Carrega a receita aleatória recebida pela URL
async function carregarReceitaAleatoria() {
    const parametros = new URLSearchParams(window.location.search);
    const idAleatorio = parametros.get("random");

    // Se não veio de um sorteio, não faz nada
    if (!idAleatorio) return;

    if (!/^\d+$/.test(idAleatorio)) {
        exibirMensagem(
            areaReceitas,
            "Identificador de receita inválido.",
            "warning"
        );
        return;
    }

    botaoPesquisa.disabled = true;

    exibirCarregamento(
        areaReceitas,
        "Carregando sua receita surpresa..."
    );

    status.textContent = "Carregando receita aleatória.";

    try {
        const receita = await buscarReceitaPorId(idAleatorio);

        if (!receita) {
            exibirMensagem(
                areaReceitas,
                "Não foi possível encontrar a receita sorteada.",
                "warning"
            );
            return;
        }

        // Cria o card na página Explore
        exibirReceitas([receita], areaReceitas);

        status.textContent = `Receita surpresa: ${receita.strMeal}.`;

        // Remove o parâmetro da URL sem recarregar a página
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    } catch (erro) {
        console.error("Erro ao carregar receita aleatória:", erro);

        exibirMensagem(
            areaReceitas,
            "Não foi possível carregar a receita surpresa. Tente novamente.",
            "danger"
        );

    } finally {
        botaoPesquisa.disabled = false;
    }
}

// Eventos
formulario.addEventListener("submit", pesquisarReceitas);

seletorCategoria.addEventListener("change", () => {
    if (seletorCategoria.value) {
        pesquisarReceitas();
    }
});

// Inicialização
carregarCategorias();
carregarReceitaAleatoria();