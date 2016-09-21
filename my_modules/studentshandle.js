var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/studentlist";
//显示数控信息
function findData(next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("students").find().toArray(function (err,dos) {
            db.close();
            next(dos);
        })
    })
}//t添加
function stuinsertData(options,next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("students").insertOne(options,function () {
            db.close();
            findData(function (data) {
                next(data);
            })
        })
    })
}
//删除
function sturemoveData(options,next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("students").removeOne(options,function () {
            db.close();
            findData(function (data) {
                next(data);
            })
        })
    })
}
//修改
function stuupdateData(condition,options,next) {
    mongoClient.connect(url,function (err,db) {
        var conditions = {"number":condition}
        db.collection("students").updateOne(conditions,options,function () {
            db.close();
            findData(function (data) {
                next(data);
            })
        })
    })
}
//成绩排序
function achievementSort(next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("students").find().toArray(function (err,dos) {
            db.close();
            for(var i=dos.length;i>=2;i--){
                for(var j=0;j<i-1;j++){
                    if(dos[j].achievement>dos[j+1].achievement){
                        var temp = dos[j];
                        dos[j] = dos[j+1];
                        dos[j+1] = temp;
                    }
                }
            }
            next(dos)
        })
    })
}
//年龄排序
function ageSort(next) {
    mongoClient.connect(url,function (err,db) {
        db.collection("students").find().toArray(function (err,dos) {
            db.close();
            for(var i=dos.length;i>=2;i--){
                for(var j=0;j<i-1;j++){
                    if(dos[j].age>dos[j+1].age){
                        var temp = dos[j];
                        dos[j] = dos[j+1];
                        dos[j+1] = temp;
                    }
                }
            }
            next(dos)
        })
    })
}
//筛选男
function screenmale(options,next) {
    mongoClient.connect(url,function (err,db) {
        var sex = options.sex;
        db.collection("students").find({sex:"male"}).toArray(function (err,dos) {
            db.close();
            next(dos);
        })
    })
}
//筛选女
function screenfemale(options,next) {
    mongoClient.connect(url,function (err,db) {
        var sex = options.sex;
        db.collection("students").find({sex:"female"}).toArray(function (err,dos) {
            db.close();
            next(dos);
        })
    })
}
//学生添加验证
function studentVerification(options,next) {
    mongoClient.connect(url,function (err,db) {
        var condition = {"number":options}
        db.collection("students").find(condition).toArray(function (err,dos) {
            db.close();
            next(dos);
        })
    })
}
//判断添加或修改
function stuInOrUp(options,next) {
    //0添加
    //1修改
    mongoClient.connect(url,function (err,db) {
        var condition = {"number":options}
        console.log(condition)
        db.collection("students").find(condition).toArray(function (err,dos) {
            db.close();
            if(dos.length==0){
                next(0)
            }else{
                next(1)
            }
        })
    })
}
module.exports = {
    findData:findData,
    stuinsertData:stuinsertData,
    sturemoveData:sturemoveData,
    stuupdateData:stuupdateData,
    achievementSort:achievementSort,
    ageSort:ageSort,
    screenmale:screenmale,
    screenfemale:screenfemale,
    studentVerification:studentVerification,
    stuInOrUp:stuInOrUp
}