# Página de Login - Plano de Testes (Cypress)

## 🎯 Objetivo

Garantir que o fluxo de autenticação da página de login funcione corretamente, incluindo:

* Login com credenciais válidas
* Validação dos campos
* Exibição de mensagens de erro adequadas
* Redirecionamentos corretos
* Envio do formulário ao pressionar Enter

---

## 🧩 Cenários de Teste

| ID  | Cenário                                | Resultado Esperado                                |
| --- | -------------------------------------- | ------------------------------------------------- |
| T01 | Login com credenciais válidas          | Redireciona para a página inicial                 |
| T02 | Login com senha incorreta              | Exibe "Credenciais inválidas"                     |
| T03 | Campos vazios                          | Exibe "Preencha todos os campos"                  |
| T04 | Formato de e-mail inválido             | Exibe "Formato de e-mail inválido"                |
| T05 | Usuário inexistente                    | Exibe "Usuário não encontrado"                    |
| T06 | Erro 500 no servidor                   | Exibe "Erro interno do servidor, tente novamente" |
| T07 | Pressionar Enter                       | Envia o formulário e realiza o login com sucesso  |
| T08 | Usuário autenticado acessando `/login` | Redireciona automaticamente para a página inicial |

---
