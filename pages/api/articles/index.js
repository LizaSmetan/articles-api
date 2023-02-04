const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    try {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const coll = client.db('genshin-ua').collection('articles');
        const cursor = coll.find();
        const result = await cursor.toArray();
        await client.close();
        
        res.status(200).json(result)
    } catch {
        res.status(404).json({message: "Not found"})
    }
    
}
