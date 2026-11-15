// Cria um elemento HTML com propriedades
export function criarElemento(tag, propriedades = {}) {
    const elemento = document.createElement(tag);

    Object.entries(propriedades).forEach(([chave, valor]) => {
        elemento[chave] = valor;
    });

    return elemento;
}

// Busca um elemento pelo seletor
export function selecionar(seletor, contexto = document) {
    return contexto.querySelector(seletor);
}

// Limpa o conteúdo de um elemento
export function limparElemento(elemento) {
    elemento.innerHTML = "";
}
