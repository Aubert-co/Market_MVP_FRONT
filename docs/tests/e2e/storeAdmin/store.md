# Criação de Loja - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo de criação de loja funcione corretamente, incluindo:

* Acesso à área de loja no perfil
* Identificação de usuário sem loja cadastrada
* Redirecionamento para a página de criação
* Preenchimento dos dados da loja
* Upload da imagem
* Envio do formulário
* Exibição da loja criada no perfil
* Acesso ao dashboard da loja

---

## 🧩 Cenários de Teste

| ID  | Cenário                                     | Resultado Esperado                                                  |
| --- | ------------------------------------------- | ------------------------------------------------------------------- |
| T01 | Acessar a área de loja sem possuir uma loja | Exibe a mensagem informando que o usuário ainda não possui uma loja |
| T02 | Clicar em "crie uma agora mesmo"            | Redireciona para `/abrir-loja`                                      |
| T03 | Acessar a página de criação de loja         | Exibe o formulário e a mensagem de apresentação                     |
| T04 | Preencher nome e descrição da loja          | Os campos recebem os dados corretamente                             |
| T05 | Selecionar uma imagem para a loja           | O arquivo é adicionado ao formulário                                |
| T06 | Enviar o formulário com dados válidos       | Cria a loja com sucesso                                             |
| T07 | Retornar à área de loja do perfil           | Exibe a loja recém-criada                                           |
| T08 | Clicar no nome da loja                      | Abre a área de gerenciamento da loja                                |
| T09 | Validar o acesso ao gerenciamento           | Exibe o dashboard da loja                                           |

---

## 🔄 Fluxo do Teste

1. Limpar o estado do ambiente de testes.
2. Registrar e autenticar um usuário.
3. Acessar `/perfil/loja`.
4. Validar que o usuário ainda não possui uma loja.
5. Clicar no link para criar uma nova loja.
6. Confirmar o redirecionamento para `/abrir-loja`.
7. Validar a exibição do formulário.
8. Preencher o nome da loja.
9. Preencher a descrição.
10. Selecionar a imagem da loja.
11. Enviar o formulário.
12. Retornar para `/perfil/loja`.
13. Validar que o nome da loja criada é exibido.
14. Clicar no nome da loja.
15. Validar a exibição do dashboard.

---

## 🧪 Dados Utilizados

```ts
const storeName = "eletronic";
const description = "lorem isptu";
```

Imagem utilizada:

```text
cypress/fixtures/image.jpeg
```

---

## 🔗 Requisição Interceptada

```ts
cy.intercept("POST", "/api/store").as("createStore");
```

Após enviar o formulário, o ideal é aguardar a requisição:

```ts
cy.contains("button", "Enviar").click();
cy.wait("@createStore");
```

Isso evita depender apenas de redirecionamentos ou esperas fixas.

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* O comando `cy.reset_mocks()` deve limpar o ambiente de testes.
* O comando `cy.register_login()` deve registrar e autenticar um usuário.
* O usuário não deve possuir uma loja antes do teste.
* A rota `/perfil/loja` deve estar acessível.
* A rota `/abrir-loja` deve estar configurada.
* O arquivo `cypress/fixtures/image.jpeg` deve existir.
* O endpoint `POST /api/store` deve aceitar os dados enviados pelo formulário.

---
