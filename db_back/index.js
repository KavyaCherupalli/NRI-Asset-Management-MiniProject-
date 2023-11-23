const express=require('express');
const mysql=require('mysql');
const app=express()
const PORT=3500;
const cors=require('cors');
const {sqlconnect,connection}=require('./middlewares/sqlconfig.js');
const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./');
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1];
        cb(null,`uploads/${file.originalname}.${ext}`);
    }
});

const upload=multer({
    storage:storage
});

app.use(cors());
app.use(express.json());




app.route('/').get((req,res)=>{
    res.send('running');
})


app.use('/',express.static(path.join(__dirname,'/')));


app.route('/insertdata').post(sqlconnect,(req,res)=>{
    const {owner,village,mandal,dist,state,pin,survey,land,id}=req.body;
    console.log(owner+village+mandal,dist+state+pin);
     const status='pending';
   const query=`INSERT INTO properties (owner_name,village , mandal,district , state, pin_number,survey,extent_of_land,user_id,status) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`;


    connection.query(query,[owner,village,mandal,dist,state,pin,survey,land,id,status],(err,results,fields)=>{
        if(err) console.log(err.message);
        console.log(results);
        connection.close();
        res.json({'message':'registered'});
    })
        
/*     connection.close(); */
})

app.route('/saveimg/:id').post(sqlconnect,upload.single("image"),(req,res)=>{
  
    
    const id=req.params.id;
    const image=req.file.filename;
    const query=`UPDATE properties set status="completed", image="${image}" WHERE id=${id}`;
    console.log(id);
   console.log(image);
   console.log(query);

    connection.query(query,(err,results,fields)=>{
        if(err) console.log(err.message);
        //console.log(results);
        connection.close();
        res.status(200).json({'message':'Image_Sent_Sucessfully!!!'});
    })

    //connection.end();
   // res.status(200).send({message:'ok'});
    
})


app.route("/getimg/:id").get((req,res)=>{

    const id=req.params.id;

    const query=`SELECT image from properties where id=${id}`;

    connection.query(query,(err,results,fields)=>{
        if(err) console.log(err.message);
        console.log(results);
        res.json({'message':'registered'});
    })

})

app.use((err,req,res,next)=>{
    console.log(err.message)
})

app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`)
})
