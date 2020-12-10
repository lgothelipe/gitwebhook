# GitHub Webhook
GitHub Webhook NodeJS

HTTP endpoints (hooks) for use on local server, which you can use to execute configured commands.

## Dependencies
- Node JS
- Express

# Getting started
## Installation
### Prerequisites
1. Make sure you've properly install [NodeJs](https://nodejs.org/en/download/package-manager/) 
2. Create a Webhook in Settings -> Webhook and copy the secret

Change app.js GITHUB_BRANCHS_TO_SCRIPTS variable with branches and path of scripts.
Rename .env.example to .env and replace the variables, paste the secret from the Webhook and then run

```bash
$ npm install
$ npm start_prod
```
to use nodemon: 

```bash
$ npm install
$ npm start_local
```
