# Serverless Web Template
Simple Cookiecutter template to get an API Gateway + NodeJS lambda stack up and running

## Deploying
Fill in `etc/cloudformation.parameters.json`

### Deploy certificate:
```bash
$ ./scripts/deploy-certificate
```

This involves setting a CNAME record for validation. The command will output the required record and it'll also be available in the Certificate Manager Console and Cloudformation Console.

### Deploy meta:
```bash
$ ./scripts/deploy-meta
```

### Deploy resources:
```bash
$ ./scripts/deploy-resources
```

After this step, all that's left is adding a CNAME for the domain itself.

## Developing
First install the dependencies:

```bash
$ npm install
```

Run the Typescript watcher with

```bash
$ make watch-functions
```

Run the local server with

```bash
$ make serve
```
