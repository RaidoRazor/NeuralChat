This is the [assistant-ui](https://github.com/Yonom/assistant-ui) starter project.

## Getting Started

First, add your OpenAI API key to `.env.local` file:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Simple Auth Demo

- Register: http://localhost:3000/register
- Login: http://localhost:3000/login
- Account: http://localhost:3000/account?email=YOUREMAIL

## Running with Docker

1. Build and start everything:

```sh
docker-compose up --build
```

2. App: http://localhost:3000
3. Postgres: localhost:5432 (user: testuser, pass: testpass, db: testdb)
