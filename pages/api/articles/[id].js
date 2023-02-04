const { MongoClient, ObjectId } = require('mongodb');

export default async function handler(req, res) {
    try {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const filter = {_id: new ObjectId(req.query.id)};
    
        const coll = client.db('genshin-ua').collection('articles');
        const cursor = coll.find(filter);
        const result = await cursor.toArray();
        
        await client.close();
        if(result && result[0]){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not found"})
        }
    } catch {
        res.status(404).json({message: "Not found"})
    }
}
