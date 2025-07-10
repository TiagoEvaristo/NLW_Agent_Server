# NLW Agents

> Projeto desenvolvido durante o evento da Rocketseat

## 📋 Sobre o Projeto

API REST construída com TypeScript e Fastify para gerenciamento de agentes, desenvolvida com foco em performance e tipagem estática.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas TypeScript-first
- **Fastify Type Provider Zod** - Integração entre Fastify e Zod

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **PGVector** - Extensão PostgreSQL para busca vetorial
- **Drizzle ORM** - ORM TypeScript type-safe
- **Postgres.js** - Cliente PostgreSQL para Node.js

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatador de código
- **Drizzle Kit** - Ferramenta para migrations
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 🏗️ Padrões de Projeto

- **MVC Pattern** - Separação de responsabilidades
- **Repository Pattern** - Abstração da camada de dados
- **Environment Variables** - Configuração através de variáveis de ambiente
- **Type Safety** - Tipagem estática em todo o projeto
- **API REST** - Padrão de arquitetura para APIs

## 🔧 Configuração e Setup

### Pré-requisitos
- Node.js 18+ 
- Docker e Docker Compose
- PostgreSQL (via Docker)

### 1. Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd server

# Instale as dependências
npm install
```

### 2. Configuração do Banco de Dados

```bash
# Inicie o banco PostgreSQL com Docker
docker-compose up -d
```

### 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Executar Migrations

```bash
# Execute as migrations do banco
npx drizzle-kit push
```

### 5. Seed do Banco (Opcional)

```bash
# Execute o seed para popular o banco
npm run db:seed
```

### 6. Executar o Projeto

```bash
# Desenvolvimento (com watch mode)
npm run dev

# Produção
npm start
```

## 📡 Endpoints

### Health Check
```http
GET /health
```

### Rooms
```http
GET /rooms
```

## 🐳 Docker

O projeto utiliza Docker para o banco de dados PostgreSQL com a extensão PGVector:

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down
```

## 📁 Estrutura do Projeto

```
src/
├── db/
│   ├── connection.ts      # Conexão com banco
│   ├── seed.ts           # Seed do banco
│   ├── migrations/       # Migrations
│   └── schema/           # Schemas do banco
├── http/
│   └── routes/           # Rotas da API
├── env.ts                # Configuração de variáveis
└── server.ts             # Servidor principal
```

## 🔍 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm start` - Executa em produção
- `npm run db:seed` - Executa seed do banco

## 📝 Observações

- O servidor roda por padrão na porta 3333
- CORS configurado para `http://localhost:5173`
- Utiliza o experimental strip-types do Node.js para TypeScript
- Configuração de linting com Biome e preset Ultracite
