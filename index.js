const { response } = require("express");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const db = require("./conexion/db");

db.initialize(function (dbCollection) {

    /* let empleado = {
        "primerNombre": "Juan",
        "segundoNombre": "Alberto",
        "numeroDocumento": "1234"
    } */

    server.get('/', function (req, res) {
        dbCollection.find().toArray((error, result) => {
            if (error) {
                throw error;
            }
            else {
                res.json(result);
            }
        });

        //res.send("Servicio Raiz");
    });

    /* 
    Si coloco :id -> sirve para resivir el id por la url
     */
    server.get('/Empleado/:id', function (req, res) {
        const idObj = req.params.id;
        
        const filtro = {
            "NumeroDocumento": idObj

        }
        dbCollection.findOne(filtro, (error, result) => {
            if (error) {
                throw error;
            }
            else {
                if (result== null){
                    res.send("Nada en BD");
                }else{
                    res.json(result);
                }
                
            }
        });
        /* if(empleado.numeroDocumento === idObj){
            res.send(empleado);
        }else{
            res.send("No Existe Empleado");
        } */

    });

    server.post("/Empleado", function (req, res) {

        const empleadoTmp = req.body;
        dbCollection.insertOne(empleadoTmp,(error,result)=>{
            if (error) {
                throw error;
            }
            else {
                console.log("exito en post");
                /* const filtro = {
                    "NumeroDocumento": empleadoTmp.NumeroDocumento        
                }
                dbCollection.findOne(filtro, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    else {
                        res.json(result);
                    }
                }); */
                //res.json(result);
            }
        });

        /* if (req.body.numeroDocumento !== '') {
            empleado = req.body;
        } */
        res.send(empleado);
    });

    server.put("/Empleado/:id", function (req, res) {

        
        if(req.params.id=== req.body.NumeroDocumento){

            const filtro = {
                "NumeroDocumento": req.NumeroDocumento        
            }
            dbCollection.updateOne(filtro,{$set:req.body},(error,result)=>{
                if(error){
                    throw error;
                }else{
                    console.log("exito en put");
                }
            });
        }


       /*  if (req.params.id === empleado.numeroDocumento) {
            empleado = req.body;
        } */
        res.send(empleado);
    });

    /* extra metod */

    server.put("/", function(req,res){
        const filtro = {
            "query":{"apellido":"pasaje"},
            "sort":{NumeroDocumento:1},
            "update":{$apellido:req.body.$apellido},


        }
        dbCollection.findAndModify(filtro,(error,result)=>{
            
        });
    });

    /*  fin extra metod*/

    server.delete("/Empleado/:id", function (req, res) {

        
        const filtro = {
            "NumeroDocumento": req.params.id
        }
        dbCollection.deleteOne(filtro,(error,result)=>{
            if(error){
                throw error;
            }else{
                console.log("exito en Delete");
                res.send("objeto Eliminado");
            }

        });

        /* if (req.params.id === empleado.numeroDocumento) {
            empleado = {
                "primerNombre": "",
                "segundoNombre": "",
                "numeroDocumento": ""
            }
        } */
        


    });


}, function (error) {
    throw error;
}
);

server.use(bodyParser.json());

const servidor = 3000;



server.listen(
    servidor, () => {
        console.log("server init");
    }
);