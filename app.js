var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const exec = require('child_process').exec;

// declare a new express app
var app = express()
app.use(bodyParser.json())

const SECRET = process.env.SECRET_TOKEN;
const repository = process.env.REPOSITORY;
const event = process.env.EVENT;
const PORT = process.env.PORT;

const GITHUB_BRANCHS_TO_SCRIPTS = {
  'refs/heads/main': '/apps/main_build.sh',
  'refs/heads/test': '/apps/test_build.sh',
};

//github webhook
app.post('/payload', function (req, res) {
  //validate request
  const signature = `sha1=${crypto
    .createHmac('sha1', SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')}`;

  if (signature != req.header('X-Hub-Signature')) {
    return res.json({ message: "Invalid request!" })
  }

  //automation script
  const isEvent = req.header("X-GitHub-Event") === event
  const isRepository = req.body.repository.name === repository

  if (isEvent && isRepository) { 
    const script = GITHUB_BRANCHS_TO_SCRIPTS[req.body.ref];
    if (!script) {
      return res.json({ message: "Branch not defined" })
    }

    try {
      exec(`bash ${script}`);
      console.log("script:", script)
      return res.json({ message: "App updated" })
    } catch (error) {
      console.log(error);
      return res.json({ message: "Script error" })
    }
  }

  res.json({ message: "Received" })
})

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`)
});

module.exports = app