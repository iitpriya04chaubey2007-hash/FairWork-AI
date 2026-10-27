// Vercel Serverless Function entry point
// This wraps the Express app for Vercel's serverless environment

const app = require('../server/index.js');

module.exports = app;
