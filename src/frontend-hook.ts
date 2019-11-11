import { FastifyRequest, FastifyReply } from 'fastify';

const allExt = ['.js', '.png', '.jpg', '.ico', '.css'];

// reference:
// https://medium.com/@bo.vandersteene/use-nest-as-your-server-side-application-with-an-angular-frontend-540b0365bfa3
export function frontendHook(
  req: FastifyRequest,
  res: FastifyReply<any>,
  next: () => void,
) {
  const url = req.req.url;
  if (url.startsWith('/api')) {
    // it starts with /api --> continue with execution
    next();
  } else if (allExt.some(ext => url.endsWith(ext))) {
    // it has a file extension --> resolve the file
    res.sendFile(url);
  } else {
    // in all other cases, redirect to the index.html!
    res.sendFile('index.html');
  }
}
