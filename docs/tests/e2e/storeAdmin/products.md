# Gerenciamento de Produtos da Loja - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o gerenciamento de produtos da loja funcione corretamente, incluindo:

* Acesso à página de produtos
* Abertura do formulário de criação
* Criação de produto com dados válidos
* Upload da imagem
* Validação dos campos obrigatórios
* Tratamento de dados inválidos
* Exibição do produto criado
* Edição e remoção de produtos
* Tratamento de erros do backend

---

## 🧩 Cenários de Teste

| ID  | Cenário                                         | Resultado Esperado                                                     | Status           |
| --- | ----------------------------------------------- | ---------------------------------------------------------------------- | ---------------- |
| T01 | Acessar a página de produtos da loja            | Exibe a listagem e o botão "Criar Produto"                             | Planejado        |
| T02 | Clicar em "Criar Produto"                       | Abre o formulário de criação de produto                                | Em implementação |
| T03 | Preencher todos os campos com dados válidos     | Os campos recebem os valores corretamente                              | Em implementação |
| T04 | Selecionar uma imagem válida                    | A imagem é adicionada ao formulário                                    | Em implementação |
| T05 | Enviar o formulário com dados válidos           | Cria o produto com sucesso                                             | Em implementação |
| T06 | Validar os dados enviados ao backend            | Envia nome, descrição, preço, estoque, categoria e imagem corretamente | Planejado        |
| T07 | Validar o produto após a criação                | Exibe o produto criado na listagem                                     | Planejado        |
| T08 | Enviar o formulário com campos vazios           | Exibe mensagens de validação nos campos obrigatórios                   | Planejado        |
| T09 | Informar um preço igual a zero                  | Impede a criação e exibe mensagem de preço inválido                    | Planejado        |
| T10 | Informar um preço negativo                      | Impede a criação e exibe mensagem de preço inválido                    | Planejado        |
| T11 | Informar estoque igual a zero                   | Cria o produto como sem estoque ou aplica a regra definida             | Planejado        |
| T12 | Informar estoque negativo                       | Impede a criação e exibe mensagem de estoque inválido                  | Planejado        |
| T13 | Informar preço com formato inválido             | Impede o envio do formulário                                           | Planejado        |
| T14 | Não selecionar uma categoria                    | Exibe mensagem informando que a categoria é obrigatória                | Planejado        |
| T15 | Não selecionar uma imagem                       | Exibe mensagem de imagem obrigatória, caso seja exigida                | Planejado        |
| T16 | Selecionar um arquivo com formato inválido      | Rejeita o arquivo e exibe mensagem de erro                             | Planejado        |
| T17 | Selecionar uma imagem acima do limite permitido | Rejeita o arquivo e informa o tamanho máximo                           | Planejado        |
| T18 | Backend retorna status 500 durante a criação    | Exibe mensagem de erro e mantém o formulário aberto                    | Planejado        |
| T19 | Backend retorna status 401                      | Exibe mensagem informando que o usuário não está autenticado           | Planejado        |
| T20 | Backend retorna status 403                      | Exibe mensagem informando que o usuário não pode gerenciar a loja      | Planejado        |
| T21 | Backend retorna lista vazia de produtos         | Exibe mensagem informando que nenhum produto foi cadastrado            | Planejado        |
| T22 | Editar um produto existente                     | Atualiza os dados e exibe as novas informações                         | Planejado        |
| T23 | Cancelar a edição de um produto                 | Fecha o formulário sem alterar os dados                                | Planejado        |
| T24 | Remover um produto existente                    | Remove o produto da listagem após confirmação                          | Planejado        |
| T25 | Cancelar a remoção de um produto                | Mantém o produto na listagem                                           | Planejado        |
| T26 | Filtrar produtos por nome                       | Exibe apenas produtos correspondentes à busca                          | Planejado        |
| T27 | Ordenar produtos por preço                      | Exibe os produtos na ordem selecionada                                 | Planejado        |
| T28 | Ordenar produtos por estoque                    | Exibe os produtos conforme a quantidade disponível                     | Planejado        |
| T29 | Navegar entre páginas da listagem               | Carrega corretamente os produtos da página selecionada                 | Planejado        |

---

## 🔄 Fluxo Principal de Criação

1. Limpar o ambiente de testes.
2. Registrar e autenticar um usuário.
3. Criar uma loja vinculada ao usuário.
4. Acessar `/loja/produtos`.
5. Clicar em "Criar Produto".
6. Validar a abertura do formulário.
7. Preencher o nome do produto.
8. Selecionar uma imagem.
9. Preencher a descrição.
10. Preencher o preço.
11. Preencher o estoque.
12. Selecionar uma categoria.
13. Interceptar a requisição de criação.
14. Enviar o formulário.
15. Validar os dados enviados ao backend.
16. Validar a mensagem de sucesso.
17. Confirmar que o formulário foi fechado.
18. Validar o produto criado na listagem.

---

## 🧪 Dados Utilizados

```ts
const productData = {
  name: "camisa",
  description: "lorem ipstu description",
  price: 59.99,
  stock: 50,
  category: "Livros",
  image: "cypress/fixtures/image.jpeg",
};
```

---

## 🔗 Requisição de Criação

A rota deve ser ajustada conforme o endpoint utilizado pelo backend:

```ts
cy.intercept("POST", "**/stores/products").as("createProduct");
```

Depois do envio:

```ts
cy.contains("button", "Enviar").click();

cy.wait("@createProduct").then(({ request }) => {
  expect(request.body).to.include({
    name: productData.name,
    description: productData.description,
    price: productData.price,
    stock: productData.stock,
    category: productData.category,
  });
});
```

Caso a requisição utilize `multipart/form-data`, o corpo pode não ser apresentado como um objeto simples pelo Cypress. Nesse caso, valide principalmente:

* Status da resposta
* Mensagem de sucesso
* Fechamento do formulário
* Produto presente na listagem

---

## ✅ Exemplo de Teste Principal

```ts
/// <reference types="cypress" />

describe("/loja/produtos", () => {
  const productData = {
    name: "camisa",
    description: "lorem ipstu description",
    price: "59.99",
    stock: "50",
    category: "Livros",
    image: "cypress/fixtures/image.jpeg",
  };

  beforeEach(() => {
    cy.reset_mocks();
    cy.register_login();
    cy.createStore();
  });

  it("should successfully create a new product", () => {
    cy.visit("/loja/produtos");

    cy.contains("Criar Produto").click();

    cy.get('[data-testid="upsert-name"]')
      .type(productData.name);

    cy.get('[data-testid="image-product"]')
      .selectFile(productData.image);

    cy.get('[data-testid="upsert-description"]')
      .type(productData.description);

    cy.get('[data-testid="upsert-price"]')
      .type(productData.price);

    cy.get('[data-testid="upsert-stock"]')
      .type(productData.stock);

    cy.get('[data-testid="select-product"]')
      .select(productData.category);

    cy.intercept("POST", "**/stores/products").as("createProduct");

    cy.contains("button", "Enviar").click();

    cy.wait("@createProduct");

    cy.get(".message_success")
      .should("contain.text", "Produto criado com sucesso");

    cy.contains(productData.name)
      .should("be.visible");

    cy.contains(productData.price)
      .should("be.visible");

    cy.contains(productData.stock)
      .should("be.visible");
  });
});
```

---

## ⚠️ Casos de Validação Planejados

### Campos obrigatórios

Enviar o formulário sem preencher os campos deve exibir mensagens de validação:

```text
Nome obrigatório
Descrição obrigatória
Preço obrigatório
Estoque obrigatório
Categoria obrigatória
Imagem obrigatória
```

As mensagens exatas devem acompanhar o comportamento real da aplicação.

---

### Preço inválido

Valores que devem ser testados:

```text
0
-10
abc
59,99
```

O comportamento para vírgula decimal deve seguir a regra definida no frontend.

---

### Estoque inválido

Valores que devem ser testados:

```text
-1
1.5
abc
```

Caso o sistema aceite estoque igual a zero, o produto deve aparecer como indisponível ou sem estoque.

---

### Arquivo inválido

Arquivos planejados para validação:

```text
document.pdf
image.svg
large-image.png
```

A aplicação deve rejeitar formatos não permitidos e arquivos acima do limite configurado.

---

## ⚠️ Tratamento de Erros

### Erro interno

```ts
cy.intercept("POST", "**/stores/products", {
  statusCode: 500,
  body: {
    message: "Internal Server Error",
  },
}).as("createProductError");
```

Resultado esperado:

```text
Algo deu errado, tente novamente mais tarde!
```

---

### Usuário não autenticado

Quando o backend retornar `401`, a aplicação deve exibir uma mensagem de autenticação ou redirecionar para `/login`.

---

### Usuário sem permissão

Quando o backend retornar `403`, a aplicação deve impedir o gerenciamento dos produtos da loja.

---

## ✏️ Cenários Futuros de Edição

A edição de produtos deve validar:

* Carregamento dos dados atuais no formulário
* Alteração do nome
* Alteração da descrição
* Alteração do preço
* Alteração do estoque
* Alteração da categoria
* Substituição da imagem
* Manutenção da imagem atual
* Cancelamento da edição
* Atualização da listagem após salvar

---

## 🗑️ Cenários Futuros de Remoção

A remoção de produtos deve validar:

* Abertura da confirmação
* Confirmação da exclusão
* Cancelamento da exclusão
* Mensagem de sucesso
* Remoção do produto da listagem
* Erro do backend durante a exclusão

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* O comando `cy.reset_mocks()` deve limpar o ambiente de testes.
* O comando `cy.register_login()` deve registrar e autenticar o usuário.
* O comando `cy.createStore()` deve criar uma loja vinculada ao usuário.
* A rota `/loja/produtos` deve estar acessível.
* O arquivo `cypress/fixtures/image.jpeg` deve existir.
* O endpoint de criação de produtos deve estar configurado.
* O usuário deve possuir permissão para administrar a loja.

---
