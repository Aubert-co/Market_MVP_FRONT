# Página de Registro - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo de criação de conta funcione corretamente, incluindo:

* Registro com dados válidos
* Redirecionamento para a página de login
* Tratamento de erro interno do servidor
* Tratamento de e-mail já cadastrado
* Permanência na página de registro em caso de falha

---

## 🧩 Cenários de Teste

| ID  | Cenário                                            | Resultado Esperado                                                                |
| --- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| T01 | Registrar um novo usuário com dados válidos        | Cria a conta e exibe a mensagem de sucesso                                        |
| T02 | Validar redirecionamento após o registro           | Redireciona para `/login`                                                         |
| T03 | Backend retorna status 500 durante o registro      | Exibe "Ocorreu um erro inesperado."                                               |
| T04 | Validar a rota após erro interno                   | Permanece em `/registro`                                                          |
| T05 | Tentar registrar um e-mail já cadastrado           | Exibe "Confira seus dados e tente novamente. Caso já tenha uma conta, faça login" |
| T06 | Validar a rota após tentativa com e-mail existente | Permanece em `/registro`                                                          |

---

## 🔄 Fluxos Testados

### Registro com sucesso

1. Limpar o estado do ambiente de testes.
2. Acessar a página `/registro`.
3. Abrir o formulário de cadastro.
4. Preencher o e-mail.
5. Preencher o nome do usuário.
6. Preencher a senha.
7. Confirmar a senha.
8. Enviar o formulário.
9. Validar a mensagem de sucesso.
10. Confirmar o redirecionamento para `/login`.

Mensagem esperada:

```text
Você criou sua conta com sucesso, você será redirecionado
```

---

### Erro interno do servidor

1. Interceptar a requisição de registro.
2. Simular uma resposta com status `500`.
3. Preencher o formulário com dados válidos.
4. Enviar o formulário.
5. Validar a mensagem de erro.
6. Confirmar que o usuário permanece em `/registro`.

Mensagem esperada:

```text
Ocorreu um erro inesperado.
```

---

### E-mail já cadastrado

1. Criar previamente um usuário de teste com `cy.register_login()`.
2. Acessar o formulário de registro.
3. Preencher o formulário com o e-mail já cadastrado.
4. Enviar o formulário.
5. Validar a mensagem informativa.
6. Confirmar que o usuário permanece em `/registro`.

Mensagem esperada:

```text
Confira seus dados e tente novamente. Caso já tenha uma conta, faça login
```

---

## 🔗 Requisição Interceptada

```ts
cy.intercept("POST", "http://localhost:8080/api/register", {
  statusCode: 500,
  body: {
    message: "Internal Server Error",
  },
}).as("registerError");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível em `http://localhost:8080`.
* A rota `POST /api/register` deve estar configurada.
* O comando `cy.reset_mocks()` deve limpar o estado de testes.
* O comando `cy.register_login()` deve criar um usuário previamente.
* A página `/registro` deve estar acessível.
* A página `/login` deve estar configurada.
* O endpoint de reset deve estar disponível apenas no ambiente de testes.

---
