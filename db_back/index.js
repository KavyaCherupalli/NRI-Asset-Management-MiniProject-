const express=require('express');
const mysql=require('mysql');
const app=express()
const PORT=3500;
const cors=require('cors');
const {sqlconnect,connection}=require('./middlewares/sqlconfig.js');


app.use(cors());
app.use(express.json());
app.use(sqlconnect);


app.route('/').get((req,res)=>{
    res.send('running');
})


app.route('/insertdata').post((req,res)=>{
    const {owner,village,mandal,dist,state,pin,survey,land,id}=req.body;
    console.log(owner+village+mandal,dist+state+pin);
     const status='pending';
   const query=`INSERT INTO properties (owner_name,village , mandal,district , state, pin_number,survey,extent_of_land,user_id,status) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`;


    connection.query(query,[owner,village,mandal,dist,state,pin,survey,land,id,status],(err,results,fields)=>{
        if(err) console.log(err.message);
        console.log(results);
        res.json({'message':'registered'});
    })

/*     connection.close(); */
})

app.route('/saveimg').post((req,res)=>{
    const status = base64;
    // const decodedData = Buffer.from(status, 'base64').toString('utf-8');
    const query=`INSERT INTO properties (owner_name,village , mandal,district , state, pin_number,survey,extent_of_land,user_id,status) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`;


    connection.query(query,[owner,village,mandal,dist,state,pin,survey,land,id,status],(err,results,fields)=>{
        if(err) console.log(err.message);
        console.log(results);
        res.json({'message':'Image_Sent_Sucessfully!!!'});
    })
})

app.use((err,req,res,next)=>{
    console.log(err.message)
})

app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`)
})
