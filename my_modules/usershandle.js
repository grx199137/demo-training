var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/userlist";
//用户验证比较
function compare(optoins,next) {
    mongoClient.connect(url,function (err,db) {
        var condition = {"email":optoins.email}
        db.collection("users").find(condition).toArray(function (err,dos) {
            db.close();
            if(dos.length==0){
                next(0)
            }else if(dos[0].password==optoins.password){
                next(2)
            }else{
                next(1)
            }
        })
    })
}
//显示数控信息
function findData(next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("users").find().toArray(function (err,dos) {
            next(dos);
            db.close();
        })
    })
}
//局部刷新添加后在显示数据
function userinsertData(options,next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("users").insertOne(options,function () {
            db.close();
            findData(function (data) {
                next(data);
            })
        })
    })
}
//删除数据
function userremoveData(options,next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("users").removeOne(options,function () {
            db.close();
            findData(function (data) {
                next(data);
            })
        })
    })
}
//邮箱添加验证
function mailData(options,next) {
    mongoClient.connect(url,function (err,db) {
        var condition = {"email":options}
        db.collection("users").find(condition).toArray(function (err,dos) {
            next(dos);
            db.close();
        })
    })
}
module.exports = {
    compare:compare,
    findData:findData,
    userinsertData:userinsertData,
    userremoveData:userremoveData,
    mailData:mailData
}