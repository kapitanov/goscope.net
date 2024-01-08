# goscope.net

A small set of tools to expore state of Golang programs.

This application is a small frontend-only web application written with Vue and Nuxt.

## Motivation

Golang offers a lot of tools to explore the state of the running program.
However, some of them are missing the user-friendly interface.
Surprisingly, even powerful Golang IDEs (like VSCode or JetBrains Goland) are lacking these tools too.

I've bumped into this issue for a number of times
and decided to create a small web application that will help me to explore the state of the my Golang programs.

Hope this app would be useful for other Gophers as well.

## Features

At the initial release **GoScope** has only one feature:

- Explore Goroutines stack traces dump.

  ![](./public/images/goroutines-preview.png)

  This feature let's you take a deep look at the output of `/debug/pprof/goroutine?debug=2` endpoint of your Golang application.

## How to build and run

### Build

```bash
make build
```

The output (static files) will be in the `dist` directory.

### Run tests

```bash
make test
```

### Run linter

```bash
make lint
```

### Run development server

```bash
make dev
```

### Run preview server

```bash
make preview
```

### Run autofomatter

```bash
make format
```

### Deploy to Cloudflare

```bash
make deploy
```

Before running the deploy command, make sure to set the following environment variables:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME`
- `CLOUDFLARE_API_TOKEN`

It's required to run `make build` before running `make deploy`.

Also, it's recommended to set the following environment variables:

- `GOOGLE_ANALYTICS_TOKEN` - this variable should be set before running `make build` to include Google Analytics tracking code in the build.

## Contributions

Community contributions are welcome via [Pull Requests](https://github.com/kapitanov/goscope.net/pulls) on GitHub.
Code submitted via Pull Requests should match the general style of the code in the repo.

## License

The source code of this project is licensed under [the MIT license](LICENSE).
