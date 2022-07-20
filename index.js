const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000; 


// middleware 

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASS}@cluster0.2mk48.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
    try{

        await client.connect();
        console.log('database connected');
        const postCollection = client.db('postCollection').collection('post');
        const newPostCollection = client.db('postCollection').collection('newPost');


        app.get('/posts',async(req,res)=>{
            const query = {};
            const cursor = postCollection.find(query);
            const allPost = await cursor.toArray();
            res.send(allPost);
        });

        // post a new post
        app.post('/newpost', async (req, res) => {
            const newPost = req.body;
            console.log(req.body);
            const result = await postCollection.insertOne(newPost);
            res.send(result);
        });


    }
    finally{
        
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running Blogging diary sever');
});




app.listen(port,()=>{
    console.log('listening to the port',port)
})