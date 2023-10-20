
# Full Stack Soccer Club Management

Um site informativo sobre partidas e classificações de futebol


## Funcionalidades

- Autenticação de usuários, via JWT
- Visualizar as partidas em andamento e finalizadas
- Alterar o placar das partidas


## Rodando o projeto com Docker

Clone o projeto

```bash
  git clone git@github.com:fellipemrcl/full-stack-soccer-management.git
```

Entre no diretório do projeto

```bash
  cd full-stack-soccer-management
```

Instale as dependências para o Front-end e Back-end ao mesmo tempo

```bash
  npm run install:apps
```

Acesse a pasta "app"

```bash
  cd app/
```

Suba os containers do Docker do projeto

```bash
  npm run compose:up
```

O Front-end do projeto estará disponível no endereço

```
  http://localhost:3000
```

O Back-end do projeto estará disponível no endereço

```
  http://localhost:3001
```
