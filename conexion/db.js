const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const dbConnection = "mongodb+srv://cartel-dy:andres123@cluster0.ujzhm.mongodb.net/test";
const dbName = "EmpleadoDB";
const collectionName = "Empleados";

function initialize(successCallBack, failureCallBack) {
    MongoClient.connect(dbConnection,
        function(error, dbInstance) {
            if (error) {
                console.log("[MongoDb] Error" + error);

            } else {
                const dbObject = dbInstance.db(dbName);
                const dbCollection = dbObject.collection(collectionName);
                console.log("[MongoDb] success");
                successCallBack(dbCollection);
            }

        }
    );
}

module.exports = { initialize }

/* function initialize(successCallback, 
    failureCallback){
    MongoClient.connect(dbConnection,
        function(error, dbIntance){
            if(error){
                console.log("[MongoDb] Error"+error);
                //failureCallback(error);
            }else{ */