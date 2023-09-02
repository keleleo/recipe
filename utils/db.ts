import { ConnectOptions, Mongoose, Promise, connect } from 'mongoose';

const mongo_uri = process.env.MONGO_URI || '';

if (!mongo_uri) {
  throw new Error('Please define a mongo URI');
}

let cached: Mongoose | undefined;

async function getConnection(): Promise<Mongoose | any> {
  if (!cached) {
    const opts: ConnectOptions = {
      autoCreate: true,
    };
    cached = await connect(mongo_uri, opts);
  }

  return cached;
}

export default getConnection;
