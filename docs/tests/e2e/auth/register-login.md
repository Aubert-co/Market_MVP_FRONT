# Fluxo de Registro e Login - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo de criação de conta e autenticação funcione corretamente, incluindo:

* Acesso à página de registro
* Preenchimento do formulário
* Criação de um novo usuário
* Exibição da mensagem de sucesso
* Redirecionamento para a página de login
* Login com a conta recém-criada
* Redirecionamento para a página inicial

---

## 🧩 Cenários de Teste

| ID  | Cenário                                            | Resultado Esperado                                                |
| --- | -------------------------------------------------- | ----------------------------------------------------------------- |
| T01 | Acessar a página de registro                       | Exibe o formulário de criação de conta                            |
| T02 | Preencher o formulário com dados válidos           | Os campos recebem os dados corretamente                           |
| T03 | Enviar o formulário de registro                    | Cria uma nova conta com sucesso                                   |
| T04 | Validar a mensagem após o registro                 | Exibe "Você criou sua conta com sucesso, você será redirecionado" |
| T05 | Aguardar o redirecionamento após o registro        | Redireciona para `/login`                                         |
| T06 | Preencher o formulário de login com a conta criada | Os campos recebem o e-mail e a senha corretamente                 |
| T07 | Enviar o formulário de login                       | Realiza a autenticação com sucesso                                |
| T08 | Validar a mensagem após o login                    | Exibe "Você fez login com sucesso, você será redirecionado"       |
| T09 | Aguardar o redirecionamento após o login           | Redireciona para a página inicial `/`                             |

---

## 🔄 Fluxo do Teste

1. Limpar o estado do ambiente de testes.
2. Acessar a página `/registro`.
3. Abrir ou acessar o formulário de cadastro.
4. Preencher o e-mail.
5. Preencher o nome do usuário.
6. Preencher a senha.
7. Confirmar a senha.
8. Enviar o formulário.
9. Validar a mensagem de criação de conta.
10. Confirmar o redirecionamento para `/login`.
11. Preencher o e-mail da conta criada.
12. Preencher a senha.
13. Enviar o formulário de login.
14. Validar a mensagem de autenticação.
15. Confirmar o redirecionamento para `/`.

---

## 🧪 Dados Utilizados

```ts
const userSettings = {
  name: "joaotest",
  email: "user@example1.com",
  password: "1234567",
};
```

Os dados devem ser exclusivos ou o banco de testes deve ser reiniciado antes da execução para evitar conflito de usuário já cadastrado.

---

## 🔗 Preparação do Ambiente

Antes do teste, o estado da aplicação é reiniciado:

```ts
cy.request("POST", "http://localhost:8080/test/reset");
```

Depois, o Cypress acessa a página de registro:

```ts
cy.visit("/registro");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível em `http://localhost:8080`.
* A rota `POST /test/reset` deve estar habilitada apenas no ambiente de testes.
* A página `/registro` deve estar acessível.
* A página `/login` deve estar configurada.
* O e-mail utilizado no teste não pode existir antes da execução.
* Os campos de senha e confirmação devem aceitar os dados informados.
* O registro deve redirecionar para `/login`.
* O login deve redirecionar para `/`.

---
