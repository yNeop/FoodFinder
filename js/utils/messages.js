import { criarElemento } from "./dom.js";

// Exibe uma mensagem na interface
export function exibirMensagem(elemento, mensagem, tipo = "info") {
    elemento.innerHTML = "";

    const coluna = criarElemento("div", {
        className: "col-12"
    });

    const alerta = criarElemento("p", {
        className: `alert alert-${tipo} text-center`,
        textContent: mensagem
    });

    coluna.appendChild(alerta);
    elemento.appendChild(coluna);
}

// Exibe um indicador de carregamento
export function exibirCarregamento(elemento, mensagem = "Carregando...") {
    exibirMensagem(elemento, mensagem, "info");
}
