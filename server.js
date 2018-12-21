const express=require('express');
const path=require('path');
const app=express();

app.use(express.static(__dirname+'/dist/frntend'));

app.get(path.join(__dirname + '/dist/frntend/index.html'));

app.listen(process.env.Port || 8080,()=>{
    console.log("Successful")
})