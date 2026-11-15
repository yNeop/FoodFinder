const API_URL = "https://www.themealdb.com/api/json/v1/1/";

// Busca dados na API
export async function fetchDados(endpoint) {
    const resposta = await fetch(`${API_URL}${endpoint}`);

    if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    return await resposta.json();
}

// Busca receitas pelo nome
export async function buscarReceitas(nome) {
    const dados = await fetchDados(
        `search.php?s=${encodeURIComponent(nome)}`
    );

    return dados.meals || [];
}

// Busca todas as categorias
export async function buscarCategorias() {
    const dados = await fetchDados("categories.php");

    return dados.categories || [];
}

// Busca receitas por categoria
export async function buscarReceitasPorCategoria(categoria) {
    const dados = await fetchDados(
        `filter.php?c=${encodeURIComponent(categoria)}`
    );

    return dados.meals || [];
}

// Busca uma receita aleatória
export async function buscarReceitaAleatoria() {
    const dados = await fetchDados("random.php");

    return dados.meals?.[0] || null;
}

// Busca detalhes de uma receita pelo ID
export async function buscarReceitaPorId(id) {
    const dados = await fetchDados(
        `lookup.php?i=${encodeURIComponent(id)}`
    );

    return dados.meals?.[0] || null;
}
