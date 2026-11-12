import { buscarCategorias, buscarReceitas, buscarReceitasPorCategoria } from "../services/mealdb.js";
import { exibirReceitas } from "./recipes.js";
import { exibirMensagem, exibirCarregamento } from "../utils/messages.js";

const formulario = document.getElementById("exploreSearchForm");
const campoPesquisa = document.getElementById("exploreSearchInput");
const seletorCategoria = document.getElementById("exploreCategorySelect");
const botaoPesquisa = document.getElementById("exploreSearchButton");
const areaReceitas = document.getElementById("exploreRecipes");
const status = document.getElementById("exploreStatus");

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
        exibirMensagem(areaReceitas, "Não foi possível carregar as categorias. Tente novamente.", "danger");
    }
}

async function pesquisarReceitas(evento) {
    evento?.preventDefault();
    const nome = campoPesquisa.value.trim();
    const categoria = seletorCategoria.value;

    if (!nome && !categoria) {
        exibirMensagem(areaReceitas, "Digite o nome de uma receita ou selecione uma categoria.", "warning");
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
                receitas = receitas.filter((receita) => receita.strMeal.toLocaleLowerCase("pt-BR").includes(termo));
            }
        } else {
            receitas = await buscarReceitas(nome);
        }
        exibirReceitas(receitas, areaReceitas, categoria);
        status.textContent = `${receitas.length} receita(s) encontrada(s).`;
    } catch (erro) {
        console.error("Erro ao pesquisar receitas:", erro);
        exibirMensagem(areaReceitas, "Não foi possível conectar à TheMealDB. Verifique sua internet e tente novamente.", "danger");
        status.textContent = "Falha ao buscar receitas.";
    } finally {
        botaoPesquisa.disabled = false;
    }
}

formulario.addEventListener("submit", pesquisarReceitas);
seletorCategoria.addEventListener("change", () => {
    if (seletorCategoria.value) pesquisarReceitas();
});
carregarCategorias();
