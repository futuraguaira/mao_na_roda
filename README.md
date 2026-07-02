# Mão na Roda

Aplicativo que conecta **prestadores de serviços** (de qualquer tipo) a **tomadores de serviço**, com busca por localização, raio de atendimento e disponibilidade de agenda. A plataforma atua apenas como **diretório e intermediadora de contato** — sem pagamentos, sem comissão. O contato final entre prestador e tomador acontece via WhatsApp.

- **Domínio:** maonaroda.com.br
- **Modelo de negócio no MVP:** nenhum (foco em engajamento; monetização futura via ads)

---

## 1. Visão geral do produto

| Perfil | O que faz |
|---|---|
| **Prestador** | Cria perfil, cadastra os serviços que realiza, define localização e raio de atendimento, marca dias/horários disponíveis, recebe avaliações |
| **Tomador** | Busca prestadores por tipo de serviço + proximidade + disponibilidade, entra em contato via WhatsApp, avalia depois do atendimento |

Um mesmo usuário pode ser prestador e tomador ao mesmo tempo (ex: um eletricista que também precisa contratar uma diarista).

---

## 2. Stack recomendada

| Camada | Tecnologia | Por quê |
|---|---|---|
| Frontend web | Next.js (App Router) + TypeScript + Tailwind CSS | Ampla cobertura em IDEs com IA (Cursor, Windsurf) — menos alucinação de código |
| Backend/dados | Supabase (Postgres + Auth + Storage + Realtime) | Auth pronta, banco gerenciado, storage de imagens, tudo num único serviço |
| Geolocalização | PostGIS (extensão do Postgres, nativa no Supabase) | Permite buscas por raio (`ST_DWithin`) direto no banco |
| Mobile (futuro) | React Native + Expo | Reaproveita lógica de negócio e cliente Supabase |
| Deploy frontend | Vercel | Integração nativa com Next.js, deploy automático |
| Deploy backend | Supabase Cloud | Já hospedado, sem servidor próprio para gerenciar |

---

## 3. Schema do banco de dados (Postgres / Supabase)

```sql
-- Extensão de geolocalização
create extension if not exists postgis;

-- Usuários (estende a tabela auth.users do Supabase)
create table perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  telefone text not null, -- usado para montar o link do WhatsApp
  tipo text not null check (tipo in ('prestador', 'tomador', 'ambos')),
  foto_url text,
  criado_em timestamptz default now()
);

-- Categorias de serviço (tabela de referência, ex: "Eletricista", "Diarista")
create table servicos (
  id serial primary key,
  nome text not null unique,
  icone text -- opcional, para UI
);

-- Dados específicos de quem presta serviço
create table prestadores (
  id uuid primary key references perfis(id) on delete cascade,
  bio text,
  localizacao geography(point, 4326) not null, -- lat/lng base do prestador
  raio_atendimento_km integer not null default 10,
  nota_media numeric(2,1) default 0,
  total_avaliacoes integer default 0
);

-- Relação N:N entre prestador e os serviços que ele oferece
create table prestador_servicos (
  prestador_id uuid references prestadores(id) on delete cascade,
  servico_id integer references servicos(id) on delete cascade,
  primary key (prestador_id, servico_id)
);

-- Disponibilidade de agenda do prestador
create table disponibilidade (
  id serial primary key,
  prestador_id uuid references prestadores(id) on delete cascade,
  data date not null,
  hora_inicio time not null,
  hora_fim time not null,
  disponivel boolean default true
);

-- Avaliações (pós-atendimento, marcado manualmente pelo tomador)
create table avaliacoes (
  id serial primary key,
  prestador_id uuid references prestadores(id) on delete cascade,
  tomador_id uuid references perfis(id) on delete cascade,
  nota integer not null check (nota between 1 and 5),
  comentario text,
  criado_em timestamptz default now()
);

-- Favoritos (opcional no MVP)
create table favoritos (
  tomador_id uuid references perfis(id) on delete cascade,
  prestador_id uuid references prestadores(id) on delete cascade,
  primary key (tomador_id, prestador_id)
);
```

### Índice geográfico (essencial para performance da busca)

```sql
create index prestadores_localizacao_idx on prestadores using gist (localizacao);
```

### Exemplo de query de busca por raio

```sql
select p.id, pf.nome, p.raio_atendimento_km,
       st_distance(p.localizacao, st_setsrid(st_makepoint(:lng_tomador, :lat_tomador), 4326)) / 1000 as distancia_km
from prestadores p
join perfis pf on pf.id = p.id
join prestador_servicos ps on ps.prestador_id = p.id
where ps.servico_id = :servico_id
  and st_dwithin(
        p.localizacao,
        st_setsrid(st_makepoint(:lng_tomador, :lat_tomador), 4326),
        p.raio_atendimento_km * 1000
      )
order by distancia_km asc;
```

---

## 4. Fluxos principais do MVP

### 4.1 Cadastro do prestador
1. Cria conta (Supabase Auth)
2. Preenche perfil: nome, telefone, foto
3. Seleciona um ou mais serviços que realiza (tabela `servicos`)
4. Define localização (geolocalização do navegador/app ou endereço digitado) e raio de atendimento
5. Marca disponibilidade (datas e horários)

### 4.2 Busca do tomador
1. Seleciona tipo de serviço desejado
2. App captura localização do tomador
3. Mostra lista de prestadores dentro do raio de atendimento, ordenada por proximidade e/ou nota
4. Filtro opcional por disponibilidade (data específica)

### 4.3 Contato
1. Tomador clica em "Chamar no WhatsApp"
2. App gera link `https://wa.me/<telefone>?text=<mensagem pré-formatada>`
3. Conversa acontece fora da plataforma

### 4.4 Avaliação
1. Tomador marca manualmente "atendimento concluído" para aquele prestador
2. Libera formulário de nota (1-5) + comentário
3. Atualiza `nota_media` e `total_avaliacoes` do prestador (trigger ou função no Supabase)

---

## 5. Telas do MVP

- Onboarding / escolha de perfil (prestador, tomador ou ambos)
- Cadastro de perfil
- Cadastro de serviços + raio de atendimento (prestador)
- Agenda de disponibilidade (prestador)
- Busca de prestadores (tomador)
- Perfil público do prestador (fotos, serviços, nota, botão WhatsApp)
- Histórico de atendimentos concluídos + avaliação (tomador)
- Painel "meus atendimentos" (prestador, visão simples de quem entrou em contato)

---

## 6. Roadmap pós-MVP

- Chat interno (reduz dependência do WhatsApp, abre espaço pra dados e monetização)
- Verificação de identidade/documentos do prestador (selo de confiança)
- Notificações push (novo contato, lembrete de avaliação)
- Monetização via ads (banners, destaque na lista de busca)
- App mobile nativo (React Native + Expo)

---

## 7. Prompts sugeridos para a IDE com IA (Cursor/Windsurf)

> Use estes prompts em sequência, um de cada vez, revisando o código gerado antes de avançar.

1. *"Crie um projeto Next.js 14 com App Router, TypeScript e Tailwind CSS, já configurado com o cliente Supabase (@supabase/supabase-js e @supabase/ssr)."*
2. *"Gere as migrations SQL do Supabase para o schema abaixo [colar o schema da seção 3], incluindo a extensão PostGIS e o índice geográfico."*
3. *"Crie a tela de cadastro de prestador com formulário para nome, telefone, foto (upload no Supabase Storage), seleção múltipla de serviços e raio de atendimento em km."*
4. *"Crie a função de busca de prestadores por serviço e raio usando PostGIS (ST_DWithin), retornando distância em km e ordenando por proximidade."*
5. *"Crie a tela de listagem de resultados de busca com cards mostrando foto, nome, nota média, distância e botão 'Chamar no WhatsApp' que gera o link wa.me com mensagem pré-formatada."*
6. *"Crie o fluxo de avaliação: botão 'marcar atendimento concluído' que libera um formulário de nota de 1 a 5 e comentário, e uma function/trigger no Supabase que recalcula a nota média do prestador."*

---

## 8. Próximos passos

- [ ] Confirmar disponibilidade de @maonaroda nas redes sociais
- [ ] Registrar domínio maonaroda.com.br
- [ ] Criar projeto no Supabase e rodar as migrations
- [ ] Montar wireframes das telas principais
- [ ] Iniciar desenvolvimento do MVP seguindo os fluxos da seção 4
