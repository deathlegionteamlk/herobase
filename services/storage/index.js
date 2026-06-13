const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const JWT_SECRET = process.env.JWT_SECRET || 'herobase-secret-key-at-least-32-characters-long';

const s3 = new AWS.S3({
  accessKeyId: 'admin',
  secretAccessKey: 'password',
  endpoint: 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

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

app.post('/upload', authenticate, upload.single('file'), (req, res) => {
  const params = {
    Bucket: 'herobase',
    Key: `${req.user.sub}/${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send({ url: data.Location, key: params.Key });
  });
});

app.get('/files/:key', authenticate, (req, res) => {
  const params = {
    Bucket: 'herobase',
    Key: req.params.key,
  };

  s3.getObject(params, (err, data) => {
    if (err) return res.status(404).send(err);
    res.send(data.Body);
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Storage service running on port ${PORT}`);
  s3.createBucket({ Bucket: 'herobase' }, (err) => {
    if (err && err.code !== 'BucketAlreadyOwnedByYou') {
      console.error('Error creating bucket:', err);
    } else {
      console.log('Bucket "herobase" ready');
    }
  });
});
