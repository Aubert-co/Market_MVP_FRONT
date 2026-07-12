# Página Inicial da Loja - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que a área inicial da loja funcione corretamente, incluindo:

* Acesso à seção "Minha loja"
* Exibição da mensagem para usuários sem loja
* Redirecionamento para a criação de loja
* Criação de uma nova loja
* Exibição da loja criada no perfil
* Acesso ao dashboard da loja

---

## 🧩 Cenários de Teste

| ID  | Cenário                                     | Resultado Esperado                                        |
| --- | ------------------------------------------- | --------------------------------------------------------- |
| T01 | Acessar `/perfil/loja` sem possuir uma loja | Exibe a seção "Minha loja"                                |
| T02 | Usuário ainda não possui uma loja           | Exibe "Você ainda não tem uma loja, crie uma agora mesmo" |
| T03 | Clicar em "crie uma agora mesmo"            | Redireciona para `/abrir-loja`                            |
| T04 | Acessar a página de criação                 | Exibe o formulário "Criar Loja!"                          |
| T05 | Preencher os dados e selecionar uma imagem  | O formulário recebe os dados corretamente                 |
| T06 | Enviar o formulário de criação              | Cria uma nova loja                                        |
| T07 | Retornar para `/perfil/loja`                | Exibe o nome da loja criada                               |
| T08 | Clicar no nome da loja                      | Abre a área de gerenciamento                              |
| T09 | Validar a página inicial da loja            | Exibe o dashboard da loja                                 |

---

## 🔄 Fluxo do Teste

1. Limpar o ambiente de testes.
2. Registrar e autenticar um usuário.
3. Acessar `/perfil/loja`.
4. Validar a exibição da seção "Minha loja".
5. Validar a mensagem informando que o usuário não possui uma loja.
6. Clicar no link para criar uma loja.
7. Confirmar o redirecionamento para `/abrir-loja`.
8. Validar a exibição do formulário de criação.
9. Preencher o nome da loja.
10. Preencher a descrição.
11. Selecionar uma imagem.
12. Enviar o formulário.
13. Retornar para `/perfil/loja`.
14. Validar a exibição do nome da loja criada.
15. Clicar na loja.
16. Confirmar a exibição do dashboard.

---

## 🧪 Dados Utilizados

```ts
const storeName = "eletronic";
const description = "lorem isptu";
```

Imagem utilizada no upload:

```text
cypress/fixtures/image.jpeg
```

---

## 🔗 Requisição Interceptada

```ts
cy.intercept("POST", "/api/store").as("createStore");
```

Após enviar o formulário, é recomendado aguardar a requisição:

```ts
cy.contains("button", "Enviar").click();
cy.wait("@createStore");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* O comando `cy.reset_mocks()` deve limpar o ambiente.
* O comando `cy.register_login()` deve registrar e autenticar o usuário.
* O usuário não deve possuir uma loja antes do teste.
* A rota `/perfil/loja` deve estar acessível.
* A rota `/abrir-loja` deve estar configurada.
* O arquivo `cypress/fixtures/image.jpeg` deve existir.
* O endpoint `POST /api/store` deve estar disponível.

---
