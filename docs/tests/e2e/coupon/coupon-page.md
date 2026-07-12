# Fluxo de Cupons - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo de cupons funcione corretamente, incluindo:

* Acesso à página de cupons
* Adição de um cupom ao perfil do usuário
* Exibição da mensagem de sucesso
* Bloqueio de cupons duplicados
* Adição de diferentes cupons
* Visualização dos cupons no perfil do usuário

---

## 🧩 Cenários de Teste

| ID  | Cenário                                                   | Resultado Esperado                                |
| --- | --------------------------------------------------------- | ------------------------------------------------- |
| T01 | Acessar a página inicial após realizar login              | A página inicial é carregada corretamente         |
| T02 | Acessar a seção "Dezenas de Cupons"                       | Redireciona para a página de cupons               |
| T03 | Adicionar o primeiro cupom disponível                     | Exibe "Sucesso ao adicionar o cupom"              |
| T04 | Tentar adicionar novamente o mesmo cupom                  | Exibe "Você já possui este cupom"                 |
| T05 | Aguardar o desaparecimento da mensagem de cupom duplicado | A mensagem deixa de ser exibida                   |
| T06 | Adicionar um segundo cupom diferente                      | Exibe "Sucesso ao adicionar o cupom"              |
| T07 | Acessar a área de pedidos e perfil                        | Exibe as opções relacionadas ao perfil do usuário |
| T08 | Acessar a seção "Meus cupons"                             | Exibe a lista de cupons vinculados ao usuário     |
| T09 | Validar a quantidade de cupons adicionados                | Exibe dois cupons na lista                        |

---

## 🔄 Fluxo do Teste

1. Limpar os mocks e o estado da aplicação.
2. Realizar login com um usuário válido.
3. Acessar a página inicial.
4. Aguardar o carregamento dos produtos.
5. Acessar a página de cupons.
6. Adicionar o primeiro cupom.
7. Validar a mensagem de sucesso.
8. Tentar adicionar o mesmo cupom novamente.
9. Validar a mensagem de cupom duplicado.
10. Adicionar um segundo cupom.
11. Validar a mensagem de sucesso.
12. Acessar o perfil do usuário.
13. Abrir a seção "Meus cupons".
14. Validar que dois cupons são exibidos.

---

## ✅ Pré-requisitos

* O frontend deve estar em execução.
* O backend deve estar disponível em `http://localhost:8080`.
* O usuário de teste deve existir e possuir credenciais válidas.
* A página de cupons deve possuir pelo menos dois cupons disponíveis.
* O comando personalizado `cy.login()` deve estar configurado.
* O comando `cy.reset_mocks()` deve limpar o estado necessário antes do teste.

---
