import fastify from 'fastify';

const server = fastify({ logger: { prettyPrint: true } });

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

server.get<{ Querystring: IQuerystring; Headers: IHeaders }>(
  '/auth',
  {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(
        username !== 'admin' ? new Error('Must be admin to enter') : undefined
      );
    },
  },
  async (request, reply) => {
    const { username, password } = request.query;
    const customHeader = request.headers['h-Custom'];

    //auth user

    return 'logged in';
  }
);

server.get('/ping', async (request, reply) => {
  return 'pong 🏓';
});

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
