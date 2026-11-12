
# FoodFinder

O **FoodFinder** é uma aplicação frontend desenvolvida para facilitar a descoberta de receitas culinárias. Com ele, é possível pesquisar pratos pelo nome, explorar diferentes categorias, descobrir receitas aleatórias e consultar informações detalhadas sobre ingredientes e modos de preparo.

Todos os dados são obtidos diretamente da API pública [TheMealDB](https://www.themealdb.com/api.php), por meio de requisições realizadas no próprio navegador.

## Tecnologias utilizadas

- **HTML5:** estruturação semântica das páginas.
- **CSS3:** estilização e responsividade da interface.
- **JavaScript (ES6):** lógica da aplicação, organização em módulos, `fetch`, `async/await` e manipulação do DOM.
- **Bootstrap 5.3.3:** componentes, sistema de grid e recursos de responsividade.
- **TheMealDB API:** fornecimento dos dados e informações das receitas.

## Integrante

- **Cauã de Araujo Sousa** — 202520174

## Links

- **Repositório:** [FoodFinder — GitHub](https://github.com/yNeop/FoodFinder)
- **GitHub Pages:** [FoodFinder | Descubra novos sabores](https://yneop.github.io/FoodFinder/index.html)

## API e endpoints utilizados

**API:** [TheMealDB](https://www.themealdb.com/api.php)

**Base URL:**
`https://www.themealdb.com/api/json/v1/1/`

| Método | Endpoint | Utilização no FoodFinder |
|---|---|---|
| GET | `search.php?s={nome}` | Pesquisa receitas pelo nome na página inicial e na página Explorar. |
| GET | `categories.php` | Carrega as categorias disponíveis nos seletores. |
| GET | `filter.php?c={categoria}` | Filtra receitas pela categoria selecionada. |
| GET | `random.php` | Busca uma receita aleatória pelo botão "Surpreenda-me!". |
| GET | `lookup.php?i={id}` | Busca os detalhes de uma receita selecionada, incluindo ingredientes e instruções de preparo. |

A aplicação utiliza cinco endpoints distintos, cujos resultados são apresentados ou utilizados diretamente em sua interface.

## Como executar o projeto

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Inicie um servidor HTTP local, como a extensão **Live Server**.
4. Acesse o arquivo `index.html` pelo endereço disponibilizado pelo servidor.

**Importante:** não abra o arquivo HTML diretamente pelo protocolo `file://`, pois o projeto utiliza módulos JavaScript ES6.

Após iniciar a aplicação, é possível utilizar os recursos de pesquisa, filtragem por categoria, descoberta de receitas aleatórias e consulta de detalhes dos pratos.

## Funcionalidades

- Pesquisa de receitas pelo nome.
- Exploração de receitas disponíveis na API.
- Filtragem de pratos por categoria.
- Descoberta de receitas aleatórias.
- Visualização detalhada das receitas.
- Consulta de ingredientes e instruções de preparo.
- Interface responsiva para computadores, tablets e dispositivos móveis.

## Tratamento de falhas

A aplicação possui mecanismos para tratar situações inesperadas durante a utilização:

- Validação de entradas antes da realização das pesquisas.
- Exibição de mensagens para pesquisas sem resultados.
- Avisos visuais em caso de falhas nas requisições à API.
- Indicadores de carregamento durante as operações.
- Desativação temporária dos botões de pesquisa para evitar envios repetidos.

A disponibilidade das receitas depende do funcionamento da API TheMealDB e de uma conexão ativa com a internet.

## Fontes e créditos

**GitHub Icon:** [Flaticon — GitHub Icon](https://www.flaticon.com/br/icone-gratis/github_919847?term=github&page=1&position=13&origin=search&related_id=919847)

**Background de Cabeçalho:** [Magnific — User: timolina](https://www.magnific.com/free-photo/traditional-salad-with-pieces-medium-rare-grilled-ahi-tuna-sesame-with-fresh-vegetable-salad-rice-plate_7535867.htm#fromView=keyword&page=1&position=0&uuid=2d7aaf08-bf2d-418a-8d2a-70f4570e4c3c&track=ais_hybrid&query=Restaurant+header)

**Carousel — Imagem 1:** [Pexels — User: mehmetakifarts](https://www.pexels.com/pt-br/foto/delicioso-prato-misto-de-frituras-com-molhos-para-mergulhar-40135531/)

**Carousel — Imagem 2:** [Pexels — User: mehmetakifarts](https://www.pexels.com/pt-br/foto/deliciosos-kebabs-turcos-com-legumes-grelhados-40135757/)

**Carousel — Imagem 3:** [Pexels — User: mehmetakifarts](https://www.pexels.com/pt-br/foto/deliciosas-fajitas-de-carne-com-legumes-coloridos-40135787/)

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.