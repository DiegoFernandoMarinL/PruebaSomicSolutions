const { MongoClient } = require('mongodb');

exports.connectMongo = async()=> {
    //const url = 'mongodb://root:campus2023@172.16.102.139:27017/'
    const url = 'mongodb://localhost:27017/'
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("SomicSolutions");
    return db;
}