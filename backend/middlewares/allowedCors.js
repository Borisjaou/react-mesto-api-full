const allowedCors = [
  'https://tomato.nomoredomains.xyz',
  'http://tomato.nomoredomains.xyz',
  'https://www.tomato.nomoredomains.xyz',
  'http://www.tomato.nomoredomains.xyz',
  'http://api.tomato.nomoredomains.work',
  'https://api.tomato.nomoredomains.work',
  'http://www.api.tomato.nomoredomains.work',
  'https://www.api.tomato.nomoredomains.work',
  'localhost:3000',
];

const allowedRequest = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = allowedRequest;
