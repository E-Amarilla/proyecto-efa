import { serialize, parse } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);
  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
}

export function getCookie(req, name) {
  const cookies = parse(req.headers.cookie || '');
  return cookies[name] ? JSON.parse(cookies[name].slice(2)) : null;
}
