import { MongoClient } from "mongodb";

const dbURL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.0gnne.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export async function connectDB() {
  const client = await MongoClient.connect(dbURL);
  return client;
}
