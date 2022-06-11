console.log(
    'banana'
    )
const express = require('express');
const res = require('express/lib/response');
const  bodyParser= require('body-parser');
const { application } = require('express');
const app = express();
const bdconn = require('./db/conn')
bdconn.connectToServer((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extend :true}))


app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/index.html')
    let db = bdconn.getDb()
    db.collection('test').insertOne({'weinerSize': 'large'}, (err, result)=> {
        if(err){

        }else{
            console.log(result.insertedId)
        }
    })
})

app.post('/quotes', (req, res)=> {
    console.log('Hello Eli')
    let db = bdconn.getDb()
    db.collection('quotes').insertOne({'name': req.body.name,'quote': req.body.quote}, (err, result)=> {
        if(err){

        }else{
            console.log(result.insertedId)
        }
    })
})
app.listen(3000, function(){
    console.log('listen on 3000')
}) 