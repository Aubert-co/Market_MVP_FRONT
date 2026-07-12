# Pedidos da Loja - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que a página de pedidos da loja funcione corretamente, incluindo:

* Exibição da lista de pedidos
* Renderização dos dados de cada pedido
* Abertura dos detalhes de um pedido
* Exibição das informações completas do pedido
* Exibição de cupom quando aplicado
* Tratamento de lista vazia
* Tratamento de erro interno do servidor

---

## 🧩 Cenários de Teste

| ID  | Cenário                                    | Resultado Esperado                                                  |
| --- | ------------------------------------------ | ------------------------------------------------------------------- |
| T01 | Acessar a página de pedidos da loja        | Exibe a listagem de pedidos                                         |
| T02 | Backend retorna pedidos com status 200     | Renderiza os dados de todos os pedidos                              |
| T03 | Validar os dados exibidos na listagem      | Exibe produto, status, valor total e data                           |
| T04 | Abrir os detalhes do primeiro pedido       | Exibe o painel "Detalhes da ordem"                                  |
| T05 | Validar os dados detalhados do pedido      | Exibe ID, cliente, produto, quantidade, preço, total, status e data |
| T06 | Pedido possui cupom aplicado               | Exibe o código e o percentual de desconto do cupom                  |
| T07 | Backend retorna lista vazia com status 200 | Exibe "Nenhum pedido encontrado."                                   |
| T08 | Backend retorna status 500                 | Exibe "Erro ao carregar os pedidos. Tente novamente."               |

---

## 🔄 Fluxos Testados

### Renderização dos pedidos

1. Limpar o estado do ambiente de testes.
2. Registrar e autenticar um usuário.
3. Criar uma loja vinculada ao usuário.
4. Acessar `/loja/pedidos`.
5. Simular uma resposta de sucesso com os pedidos.
6. Validar o nome de cada produto.
7. Validar o status formatado.
8. Validar o valor total.
9. Validar a data formatada.

Dados validados na listagem:

```text
Nome do produto
Status do pedido
Valor total
Data de criação
```

---

### Detalhes do pedido

1. Localizar o botão de detalhes do primeiro pedido.
2. Abrir o painel de detalhes.
3. Validar o título "Detalhes da ordem".
4. Validar o identificador do pedido.
5. Validar o nome do cliente.
6. Validar o nome do produto.
7. Validar a quantidade.
8. Validar o preço unitário.
9. Validar o valor total.
10. Validar o status.
11. Validar a data de criação.
12. Validar o cupom, quando existir.

Dados esperados:

```text
#ID do pedido
Nome do cliente
Nome do produto
Quantidade
Preço unitário
Valor total
Status
Data de criação
Cupom aplicado
```

---

## 🎟️ Pedido com cupom

Quando o pedido possui um cupom, a página deve exibir o código e o percentual de desconto:

```ts
`${order.coupon.code} (${order.coupon.discount}%)`
```

Exemplo:

```text
DESCONTO10 (10%)
```

---

## 📭 Lista vazia

Quando o backend retorna:

```ts
{
  datas: [],
}
```

com status `200`, a página deve exibir:

```text
Nenhum pedido encontrado.
```

---

## ⚠️ Erro interno do servidor

Quando o backend retorna status `500`, a página deve exibir:

```text
Erro ao carregar os pedidos. Tente novamente.
```

---

## 🔗 Requisições Interceptadas

Resposta com pedidos:

```ts
cy.intercept("GET", "**/stores/3/orders**", {
  statusCode: 200,
  body: {
    datas: ordersMock,
  },
}).as("getStoreOrders");
```

Resposta com lista vazia:

```ts
cy.intercept("GET", "**/stores/3/orders**", {
  statusCode: 200,
  body: {
    datas: [],
  },
}).as("getEmptyStoreOrders");
```

Resposta com erro:

```ts
cy.intercept("GET", "**/stores/3/orders**", {
  statusCode: 500,
  body: {
    datas: [],
  },
}).as("getStoreOrdersError");
```

---

## 🧪 Dados Utilizados

Os pedidos são carregados pelo fixture:

```ts
import { ordersMock } from "cypress/fixtures/orders";
```

O primeiro pedido é utilizado para validar o painel de detalhes:

```ts
const firstMock = ordersMock[0];
```

As funções utilitárias são utilizadas para formatar os dados:

```ts
getOrderStatus(order.status);
getLocalDate(order.createdAt);
```

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível.
* O comando `cy.reset_mocks()` deve limpar o ambiente de testes.
* O comando `cy.register_login()` deve registrar e autenticar um usuário.
* O comando `cy.createStore()` deve criar uma loja vinculada ao usuário.
* O fixture `cypress/fixtures/orders` deve possuir pedidos válidos.
* A rota `/loja/pedidos` deve estar acessível.
* O botão de detalhes deve possuir um `aria-label` identificável.
* As funções `getOrderStatus()` e `getLocalDate()` devem formatar os dados corretamente.

---
