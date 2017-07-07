'use strict';

const Agent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const urllib = require('urllib');

module.exports = app => {
  const HttpClient = app.config.httpclient.enableDNSCache ?
    require('./dnscache_httpclient') : urllib.HttpClient;

  const config = app.config.httpclient;
  if (typeof config.timeout === 'number' && config.timeout < 30000) {
    app.coreLogger.warn('[egg:httpclient] config.httpclient.timeout(%s) can\'t below 30000, auto reset to 30000',
      config.timeout);
    config.timeout = 30000;
  }

  return new HttpClient({
    app,
    agent: new Agent(config),
    httpsAgent: new HttpsAgent(config),
  });
};
