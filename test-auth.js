const { auth } = require('./lib/auth');

async function test() {
  try {
    console.log('Testing NextAuth initialization...');
    console.log('Auth object keys:', Object.keys(require('./lib/auth')));
    console.log('Initialization successful.');
  } catch (err) {
    console.error('Initialization failed:', err);
  }
}

test();
