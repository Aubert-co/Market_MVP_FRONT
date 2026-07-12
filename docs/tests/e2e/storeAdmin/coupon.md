# Gerenciamento de Cupons da Loja - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que a página de cupons da loja funcione corretamente, incluindo:

* Criação de um novo cupom
* Validação dos dados enviados ao backend
* Exibição do cupom criado
* Tratamento de lista vazia
* Tratamento de erro interno do servidor
* Tratamento de usuário não autenticado

---

## 🧩 Cenários de Teste

| ID  | Cenário                                | Resultado Esperado                                            |
| --- | -------------------------------------- | ------------------------------------------------------------- |
| T01 | Acessar a página de cupons da loja     | Exibe a área de gerenciamento de cupons                       |
| T02 | Abrir o formulário de criação de cupom | Exibe o drawer "Criar Cupom"                                  |
| T03 | Criar um cupom com dados válidos       | Envia os dados corretamente e cria o cupom                    |
| T04 | Validar os dados enviados na criação   | Envia código, desconto, tipo, validade e quantidade esperados |
| T05 | Validar fechamento do formulário       | O drawer deixa de ser exibido após a criação                  |
| T06 | Validar o cupom criado na listagem     | Exibe o desconto e a quantidade cadastrados                   |
| T07 | Backend retorna uma lista vazia        | Exibe "Nenhum cupom disponivel"                               |
| T08 | Backend retorna status 500             | Exibe "Algo deu errado, tente novamente mais tarde!"          |
| T09 | Backend retorna status 401             | Exibe "Você não está logado. Faça login."                     |

---

## 🔄 Fluxos Testados

### Criação de cupom com sucesso

1. Limpar o estado do ambiente de testes.
2. Registrar e autenticar um usuário.
3. Criar uma loja para o usuário.
4. Acessar `/loja/cupons`.
5. Clicar em "Criar Cupom".
6. Validar a exibição do formulário.
7. Selecionar o tipo de desconto por porcentagem.
8. Preencher o valor do desconto.
9. Preencher o código do cupom.
10. Selecionar a validade de uma semana.
11. Preencher a quantidade disponível.
12. Enviar o formulário.
13. Aguardar a requisição de criação.
14. Validar os dados enviados ao backend.
15. Confirmar o fechamento do formulário.
16. Validar o desconto e a quantidade na listagem.

---

## 🧪 Dados Utilizados

```ts
const couponDatas = {
  code: "DESCONTO5",
  discount: 10,
  discountType: "percent",
  expiresAt: "oneweek",
  quantity: 5,
};
```

Dados esperados no corpo da requisição:

```text
code=DESCONTO5
discount=10
discountType=percent
expiresAt=oneweek
quantity=5
```

---

## 📭 Lista vazia

Quando o backend retorna uma lista sem cupons:

```ts
{
  datas: [],
  status: 200,
  message: "success",
  currentPage: 1,
  totalPages: 1,
}
```

A página deve exibir:

```text
Nenhum cupom disponivel
```

---

## ⚠️ Erro interno do servidor

Quando o backend retorna status `500`, a página deve exibir:

```text
Algo deu errado, tente novamente mais tarde!
```

---

## 🔐 Usuário não autenticado

Quando o backend retorna status `401`, a página deve exibir:

```text
Você não está logado. Faça login.
```

---

## 🔗 Requisições Interceptadas

Criação de cupom:

```ts
cy.intercept("POST", "**/stores/coupons").as("createCoupon");
```

Busca de cupons:

```ts
cy.intercept("GET", "**/stores/coupons/**").as("getCoupons");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* O comando `cy.reset_mocks()` deve limpar o ambiente de testes.
* O comando `cy.register_login()` deve registrar e autenticar um usuário.
* O comando `cy.createStore()` deve criar uma loja vinculada ao usuário.
* A rota `/loja/cupons` deve estar acessível.
* A rota de criação de cupons deve estar configurada.
* O usuário deve possuir uma loja antes de acessar a página.
* Os endpoints de teste devem estar disponíveis apenas no ambiente de testes.

---
