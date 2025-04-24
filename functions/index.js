const { onRequest } = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const express = require('express');
const next = require('next');

setGlobalOptions({maxInstances: 10});

const app = express();
const port = process.env.PORT || 5001;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, conf: { distDir: '.next' } });
const handle = nextApp.getRequestHandler();

exports.serveNext = onRequest({region: "us-central1"}, async (req, res) => {
  await nextApp.prepare();
  return handle(req, res);
});