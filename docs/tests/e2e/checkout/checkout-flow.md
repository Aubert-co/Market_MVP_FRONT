# Finalização de Compra - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo completo de compra funcione corretamente, incluindo:

* Acesso à página de cupons
* Adição de um cupom ao perfil
* Seleção de um produto
* Adição do produto ao carrinho
* Acesso ao carrinho
* Aplicação de um cupom
* Finalização da compra
* Exibição da mensagem de sucesso
* Acesso à área de pedidos do usuário

---

## 🧩 Cenários de Teste

| ID  | Cenário                                      | Resultado Esperado                                       |
| --- | -------------------------------------------- | -------------------------------------------------------- |
| T01 | Acessar a página inicial após realizar login | A página inicial é carregada com os produtos disponíveis |
| T02 | Acessar a seção "Dezenas de Cupons"          | Redireciona para a página de cupons                      |
| T03 | Adicionar o primeiro cupom disponível        | Exibe "Sucesso ao adicionar o cupom"                     |
| T04 | Retornar à página inicial                    | A página inicial é carregada novamente                   |
| T05 | Selecionar o primeiro produto disponível     | Exibe os detalhes do produto                             |
| T06 | Adicionar o produto ao carrinho              | O produto é adicionado ao carrinho                       |
| T07 | Acessar o carrinho pelo perfil               | Exibe os itens adicionados ao carrinho                   |
| T08 | Clicar em "Finalizar compra"                 | Exibe a etapa de finalização do pedido                   |
| T09 | Selecionar o cupom `DESCONTO10`              | O cupom é aplicado à compra                              |
| T10 | Confirmar a finalização                      | A compra é processada com sucesso                        |
| T11 | Validar a mensagem de sucesso                | Exibe "Compra realizada com sucesso!"                    |
| T12 | Acessar a área de pedidos                    | Redireciona para os pedidos do usuário                   |

---

## 🔄 Fluxo do Teste

1. Limpar os mocks e o estado da aplicação.
2. Realizar login com um usuário válido.
3. Acessar a página inicial.
4. Aguardar o carregamento dos produtos.
5. Acessar a página de cupons.
6. Adicionar o primeiro cupom disponível.
7. Validar a mensagem de sucesso.
8. Retornar à página inicial.
9. Aguardar novamente o carregamento dos produtos.
10. Abrir o primeiro produto disponível.
11. Adicionar o produto ao carrinho.
12. Acessar o carrinho pelo perfil.
13. Iniciar a finalização da compra.
14. Selecionar o cupom `DESCONTO10`.
15. Confirmar a compra.
16. Validar a mensagem de sucesso.
17. Acessar a área de pedidos do usuário.

---

## 🔗 Requisição Interceptada

```ts
cy.intercept(
  "GET",
  "http://localhost:8080/api/product?page=1",
).as("getProducts");
```

A requisição é aguardada antes de interagir com a lista de produtos:

```ts
cy.wait("@getProducts");
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível em `http://localhost:8080`.
* O usuário de teste deve existir e possuir credenciais válidas.
* A página inicial deve possuir pelo menos um produto disponível.
* A página de cupons deve possuir pelo menos um cupom disponível.
* O cupom `DESCONTO10` deve estar disponível para seleção.
* O usuário deve conseguir adicionar produtos ao carrinho.
* O comando `cy.login()` deve estar configurado.
* O comando `cy.reset_mocks()` deve limpar o estado necessário antes do teste.
* A rota de pedidos deve estar acessível após a conclusão da compra.

---
