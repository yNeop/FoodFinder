import { buscarReceitaPorId } from "../services/mealdb.js";
import { exibirMensagem } from "../utils/messages.js";

const areaDetalhes = document.getElementById("recipeDetails");
const parametros = new URLSearchParams(window.location.search);
const idReceita = parametros.get("id");

function criarTexto(tag, texto, classe = "") {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    if (classe) elemento.className = classe;
    return elemento;
}

function exibirDetalhes(receita) {
    areaDetalhes.innerHTML = "";
    const linha = document.createElement("div");
    linha.className = "row g-4 align-items-start";

    const colunaImagem = document.createElement("div");
    colunaImagem.className = "col-12 col-lg-5";
    const imagem = document.createElement("img");
    imagem.src = receita.strMealThumb;
    imagem.alt = `Imagem da receita ${receita.strMeal}`;
    imagem.className = "img-fluid rounded-4 shadow-sm recipe-detail-image";
    colunaImagem.appendChild(imagem);

    const colunaConteudo = document.createElement("div");
    colunaConteudo.className = "col-12 col-lg-7";
    colunaConteudo.append(
        criarTexto("h1", receita.strMeal, "mb-3"),
        criarTexto("p", `Categoria: ${receita.strCategory || "Não informada"} · Origem: ${receita.strArea || "Não informada"}`, "text-secondary")
    );

    const tituloIngredientes = criarTexto("h2", "Ingredientes", "h4 mt-4");
    const listaIngredientes = document.createElement("ul");
    listaIngredientes.className = "ingredient-list";
    for (let indice = 1; indice <= 20; indice += 1) {
        const ingrediente = receita[`strIngredient${indice}`]?.trim();
        const medida = receita[`strMeasure${indice}`]?.trim();
        if (ingrediente) listaIngredientes.appendChild(criarTexto("li", `${medida ? `${medida} ` : ""}${ingrediente}`));
    }

    const tituloPreparo = criarTexto("h2", "Modo de preparo", "h4 mt-4");
    const preparo = criarTexto("p", receita.strInstructions || "Modo de preparo não informado.", "recipe-instructions");
    colunaConteudo.append(tituloIngredientes, listaIngredientes, tituloPreparo, preparo);

    if (receita.strYoutube) {
        const video = document.createElement("a");
        video.href = receita.strYoutube;
        video.target = "_blank";
        video.rel = "noopener noreferrer";
        video.className = "btn btn-primary mt-3";
        video.textContent = "Assistir ao vídeo da receita";
        colunaConteudo.appendChild(video);
    }

    linha.append(colunaImagem, colunaConteudo);
    areaDetalhes.appendChild(linha);
}

async function carregarDetalhes() {
    if (!idReceita || !/^\d+$/.test(idReceita)) {
        exibirMensagem(areaDetalhes, "Receita inválida. Volte à exploração e escolha uma receita.", "warning");
        return;
    }
    try {
        const receita = await buscarReceitaPorId(idReceita);
        if (!receita) {
            exibirMensagem(areaDetalhes, "Não encontramos essa receita.", "warning");
            return;
        }
        document.title = `${receita.strMeal} | FoodFinder`;
        exibirDetalhes(receita);
    } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
        areaDetalhes.innerHTML = "";
        const alerta = criarTexto("p", "Não foi possível carregar os detalhes. Verifique sua conexão e tente novamente.", "alert alert-danger");
        alerta.setAttribute("role", "alert");
        const botaoTentarNovamente = criarTexto("button", "Tentar novamente", "btn btn-primary");
        botaoTentarNovamente.type = "button";
        botaoTentarNovamente.addEventListener("click", carregarDetalhes);
        areaDetalhes.append(alerta, botaoTentarNovamente);
    }
}

carregarDetalhes();
