# Página de Buscas e Filtros - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que a página de buscas carregue, preencha, limpe e envie os filtros corretamente, incluindo:

* Preenchimento dos campos a partir dos parâmetros da URL
* Envio correto dos filtros para o backend
* Exibição de mensagem em caso de erro no servidor
* Exibição de mensagem quando nenhum produto é encontrado
* Limpeza dos filtros
* Preservação do termo de busca presente na URL

---

## 🧩 Cenários de Teste

| ID  | Cenário                                         | Resultado Esperado                                                        |
| --- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| T01 | Acessar a página com parâmetros de busca na URL | Preenche os campos com os valores presentes na URL                        |
| T02 | Enviar filtros carregados pela URL              | Envia `maxPrice`, `minPrice`, `category`, `orderBy` e `name` corretamente |
| T03 | Backend retorna erro 500 durante a busca        | Exibe "Ocorreu um erro ao carregar os dados."                             |
| T04 | Backend retorna uma lista vazia de produtos     | Exibe "Sem produtos disponíveis"                                          |
| T05 | Preencher os filtros e clicar em "Limpar"       | Remove os valores preenchidos no formulário                               |
| T06 | Preencher novamente os filtros após a limpeza   | Permite inserir novos valores normalmente                                 |
| T07 | Selecionar a opção "Todas" em categoria         | Envia a categoria como uma string vazia                                   |
| T08 | Selecionar ordenação por menor preço            | Envia `orderBy` com o valor `asc`                                         |
| T09 | Acessar a página com o nome do produto na URL   | Preenche o campo de busca com o termo informado                           |
| T10 | Limpar os filtros mantendo o termo da URL       | Preserva o nome do produto carregado pela URL                             |
| T11 | Enviar novos filtros após limpar o formulário   | Envia os novos valores corretamente ao backend                            |

---

## 🔄 Fluxos Testados

### Preenchimento por parâmetros da URL

1. Acessar a página de buscas com parâmetros na URL.
2. Abrir o formulário de filtros.
3. Validar o preço mínimo.
4. Validar o preço máximo.
5. Validar o termo de busca.
6. Validar a categoria selecionada.
7. Validar a ordenação.
8. Enviar o formulário.
9. Validar os parâmetros enviados na requisição.

Exemplo de URL:

```text
/buscas?maxPrice=50&category=Livros&q=camisa+polo&minPrice=10&orderBy=asc
```

Parâmetros esperados:

```text
maxPrice=50
minPrice=10
name=camisa polo
category=Livros
orderBy=asc
```

---

### Erro interno do servidor

1. Acessar a página de buscas.
2. Preencher os filtros.
3. Interceptar a requisição de busca.
4. Simular uma resposta com status `500`.
5. Enviar o formulário.
6. Validar a mensagem de erro.

Mensagem esperada:

```text
Ocorreu um erro ao carregar os dados.
```

---

### Busca sem produtos disponíveis

1. Acessar a página de buscas.
2. Preencher os filtros.
3. Simular uma resposta de sucesso com uma lista vazia.
4. Enviar o formulário.
5. Validar a mensagem de lista vazia.

Mensagem esperada:

```text
Sem produtos disponíveis
```

---

### Limpeza e novo preenchimento dos filtros

1. Acessar a página de buscas.
2. Abrir o formulário de filtros.
3. Preencher preço mínimo e máximo.
4. Selecionar uma categoria.
5. Selecionar uma ordenação.
6. Clicar em "Limpar".
7. Abrir novamente o formulário.
8. Preencher novos valores.
9. Enviar o formulário.
10. Validar os parâmetros enviados.

Valores esperados na requisição:

```text
maxPrice=100
minPrice=50
name=
category=
orderBy=asc
```

---

### Preservação do termo de busca da URL

1. Acessar a página com o parâmetro `q`.
2. Validar o termo carregado no campo de busca.
3. Preencher os demais filtros.
4. Limpar o formulário.
5. Preencher novos valores.
6. Enviar a busca.
7. Validar que o termo original continua sendo enviado.

Exemplo:

```text
/buscas?q=camisa+polo
```

Valores esperados:

```text
name=camisa polo
category=Livros
orderBy=asc
maxPrice=100
minPrice=50
```

---

## 🔗 Requisições Interceptadas

Busca de produtos:

```ts
cy.intercept("GET", "**/product/search**").as("searchProducts");
```

Simulação de erro interno:

```ts
cy.intercept("GET", "**/api/product/search?**", {
  statusCode: 500,
  body: {
    message: "Internal Server Error",
    datas: [],
  },
}).as("searchProducts");
```

Simulação de lista vazia:

```ts
cy.intercept("GET", "**/product/search**", {
  statusCode: 200,
  body: {
    datas: [],
  },
}).as("searchProducts");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* A rota `/buscas` deve estar configurada.
* O formulário de filtros deve estar acessível pelo elemento `.collapse-container`.
* Os campos devem possuir os atributos utilizados pelos testes.
* A busca deve enviar os filtros por query parameters.
* O Cypress deve estar configurado com a `baseUrl` correta.

---
