const express = require('express');
const bodyParser = require('body-parser');
const { VM } = require('vm2');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'herobase-secret-key-at-least-32-characters-long';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/invoke/:functionName', authenticate, (req, res) => {
  const { functionName } = req.params;
  const { body } = req;
  let code = '';
  if (functionName === 'hello') {
    code = `
      (async (data) => {
        return { message: "Hello " + data.name + " from Herobase Edge Functions!" };
      })
    `;
  } else {
    return res.status(404).send('Function not found');
  }

  try {
    const vm = new VM({
      timeout: 1000,
      sandbox: { console }
    });
    const functionToRun = vm.run(code);
    functionToRun(body).then(result => {
      res.send(result);
    }).catch(err => {
      res.status(500).send(err.message);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Functions runner running on port ${PORT}`);
});
