# Integração Pix

Projeto fullstack desenvolvido com NestJS (backend) e Next.js (frontend) para gerenciar cobranças via Pix, utilizando TypeORM com MySQL.

## Requisitos

- Node.js >= 18.x
- npm
- Docker (para rodar imagem do banco de dados MySQL)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Lukas-WND/pix.git
cd pix
```

2. Faça o build e inicie os containers Docker:

```bash
docker-compose up -d --build
```

3. Instale as dependências:

No diretório `back`:

```bash
npm install
```

No diretório `front`:

```bash
npm install
```

> **Nota:** É possível que, graças às versões das dependências da biblioteca de UI utilizada no projeto, ocorra algum erro ao tentar instalar as dependências somente com `npm install`, mas pode ser facilmente contornado utilizando o comando `npm install --legacy-peer-deps` ou mesmo o `npm install --force`.

## Configuração das variáveis de ambiente

### Backend (`back/.env`)

```env
DB_HOST=localhost
DB_PORT=33065
DB_USER=admin
DB_PASS=admin
DB_NAME=database

FRONTEND_URL=http://localhost

AT_SECRET_KEY=MY_SECRET_AT_KEY
RT_SECRET_KEY=MY_SECRET_RT_KEY

CANVI_API_URL="https://gateway-homol.service-canvi.com.br/bt"
CANVI_CLIENT_ID="105F0B108954FF"
CANVI_PRIVATE_KEY="F7DD2108954105F0BF765DFFDB210C880101B4D107363F7DD2"
```

### Frontend (`front/.env`)

```env
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Banco de dados e migrations

Após configurar o `.env` do backend, certifique-se de que o banco de dados MySQL está rodando (via Docker ou localmente).

Para criar as tabelas e estruturar o banco, execute as migrations do TypeORM no diretório `back`:

```bash
npm run migration:run
```

As migrations geram um usuário padrão, de username: admin e senha: canvi

> **Nota:** Caso prefira, pode usar `synchronize: true` na configuração do TypeORM para criar as tabelas automaticamente, mas essa prática não é recomendada para produção.

## Executando o projeto

### Backend

No diretório `back` rode:

```bash
npm run start:dev
```

O backend estará disponível em:
`http://localhost:3000`

### Frontend

No diretório `front` rode:

```bash
npm run dev
```

O frontend estará disponível em:
`http://localhost`

## Autenticação
Acesse a rota `/login` manualmente no navegador para ser direcionado à tela de autenticação

O usuário padrão gerado a partir das migrations é:

```
username: admin
senha: canvi
```

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- MySQL
- [Next.js](https://nextjs.org/)
- Canvi API (simulação de pagamentos Pix)

## Estrutura do projeto

- `back/src/charge` - Módulo e serviços de cobranças Pix
- `back/src/user` - Entidades e serviços de usuários
- `back/src/canvi` - Integração com API Canvi para gerar cobranças
- `front` - Aplicação React com Next.js para frontend

## Contato

Desenvolvido por Lukas Palheta
Email: [lukas.wrks@gmail.com](mailto:lukas.wrks@gmail.com)

---

Para dúvidas ou contribuições, abra uma issue ou envie um pull request!
