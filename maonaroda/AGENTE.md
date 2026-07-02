# Instância de agente — Mão na Roda

## Objetivo
Esta instância organiza o trabalho em três camadas para manter o projeto confiável:

1. Diretivas — instruções operacionais em Markdown.
2. Orquestração — decisões e roteamento das tarefas.
3. Execução — scripts determinísticos em Python.

## Estrutura esperada
- directives/ — SOPs e instruções do projeto.
- execution/ — scripts reutilizáveis para validação e automação.
- .tmp/ — arquivos intermediários, nunca para versionamento.
- .env.example — variáveis de ambiente de exemplo.

## Regras de operação
- Ler primeiro as instruções antes de alterar código.
- Preferir scripts determinísticos a tarefas manuais.
- Registrar aprendizados nas diretivas quando um fluxo mudar.
- Validar sempre com um comando de verificação antes de concluir.

## Contexto do projeto
- Produto: plataforma para conectar prestadores e tomadores de serviço.
- MVP: landing page, cadastro básico, busca por localização e contato por WhatsApp.
- Stack atual: Next.js, TypeScript, Tailwind.
