import { criarElemento } from "../utils/dom.js";

// Cria um card de receita
export function criarCardReceita(receita, categoria = "") {
    const coluna = criarElemento("div", {
        className: "col-12 col-sm-6 col-lg-4"
    });

    const article = criarElemento("article", {
        className: "card h-100 shadow-sm"
    });

    const imagem = criarElemento("img", {
        className: "card-img-top",
        alt: `Imagem da receita ${receita.strMeal}`
    });

    imagem.src = receita.strMealThumb;

    const corpo = criarElemento("div", {
        className: "card-body"
    });

    const titulo = criarElemento("h3", {
        className: "card-title",
        textContent: receita.strMeal
    });

    const descricao = criarElemento("p", {
        className: "card-text",
        textContent: `Categoria: ${
            receita.strCategory || categoria || "Não informada"
        }`
    });

    const link = criarElemento("a", {
        className: "btn btn-primary mt-2",
        href: `${window.location.pathname.includes("/pages/") ? "" : "pages/"}recipe.html?id=${encodeURIComponent(receita.idMeal)}`,
        textContent: "Ver receita"
    });

    corpo.append(titulo, descricao, link);
    article.append(imagem, corpo);
    coluna.appendChild(article);

    return coluna;
}

// Exibe as receitas na interface
export function exibirReceitas(receitas, elemento, categoria = "") {
    elemento.innerHTML = "";

    if (!receitas || receitas.length === 0) {
        elemento.appendChild(
            document.createElement("div")
        );

        elemento.firstElementChild.className = "col-12";
        elemento.firstElementChild.innerHTML = `
            <p class="alert alert-warning text-center">
                Nenhuma receita encontrada.
            </p>
        `;

        return;
    }

    receitas.forEach((receita) => {
        elemento.appendChild(
            criarCardReceita(receita, categoria)
        );
    });
}
