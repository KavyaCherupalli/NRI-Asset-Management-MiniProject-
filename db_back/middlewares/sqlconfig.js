const mysql=require('mysql');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Amkv@1234',
    database:'demo'
})
const sqlconnect=(req,res,next)=>{
    try{ 
    connection.connect()
    console.log('mysql connection successfull')
    next();
    }catch(err){
        console.log(err.message);
    }
}

module.exports={sqlconnect,connection};

