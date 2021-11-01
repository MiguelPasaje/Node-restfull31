const express = require("express");
const server = express();

const servidor = 3000;

const empleado = {
    "primerNombre" :"Juan",
    "segundoNombre" : "Alberto"
}

 server.get('/',function(req,res){
     res.send("Servicio Raiz");
 });

 server.get('/Empleado',function(req,res){
    res.send(empleado);
});

server.listen(
    servidor,()=>{
        console.log("server init");
    }
);