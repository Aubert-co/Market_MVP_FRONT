# Fluxo de Produto e Carrinho - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo entre a página de produtos e o carrinho funcione corretamente para usuários autenticados e não autenticados, incluindo:

* Acesso à página de detalhes do produto
* Adição do produto ao carrinho
* Exibição de mensagens de sucesso e erro
* Visualização do produto no carrinho
* Aumento da quantidade
* Redução da quantidade
* Remoção do produto
* Bloqueio de ações para usuários não autenticados
* Exibição da mensagem de carrinho vazio

---

## 🧩 Cenários de Teste

| ID  | Cenário                                                        | Resultado Esperado                                       |
| --- | -------------------------------------------------------------- | -------------------------------------------------------- |
| T01 | Acessar a página inicial após realizar login                   | A página inicial é carregada com os produtos disponíveis |
| T02 | Selecionar o primeiro produto da lista                         | A página ou modal de detalhes do produto é exibida       |
| T03 | Adicionar o produto ao carrinho autenticado                    | Exibe "Adicionado ao carrinho com sucesso"               |
| T04 | Acessar o carrinho após adicionar o produto                    | Exibe a página "Meu carrinho" com o produto adicionado   |
| T05 | Verificar a quantidade inicial do produto                      | Exibe a quantidade igual a 1                             |
| T06 | Aumentar a quantidade do produto                               | Atualiza a quantidade de 1 para 2                        |
| T07 | Diminuir a quantidade do produto                               | Atualiza a quantidade de 2 para 1                        |
| T08 | Remover o produto do carrinho                                  | Remove o produto do carrinho                             |
| T09 | Verificar o carrinho após a remoção                            | Exibe "Seu carrinho está vazio. Adicionar produtos"      |
| T10 | Usuário não autenticado tenta adicionar um produto ao carrinho | Exibe "Faça login para adicionar ao carrinho"            |
| T11 | Usuário não autenticado acessa o carrinho                      | Exibe "Você não está logado. Faça login."                |

---

## 🔐 Fluxo de usuário não autenticado

1. Limpar os mocks e o estado da aplicação.
2. Acessar a página inicial sem realizar login.
3. Aguardar o carregamento dos produtos.
4. Abrir o primeiro produto disponível.
5. Tentar adicionar o produto ao carrinho.
6. Validar a mensagem de erro de autenticação.
7. Acessar o carrinho.
8. Validar a mensagem informando que o usuário não está logado.

---
