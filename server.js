var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var studentshandle = require("./my_modules/studentshandle");
var userhandle = require("./my_modules/usershandle");
var session = require("express-session");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    "secret":"hello",
    "cookie":{maxAge:6666666666*1000}
}))
app.set("view engine","jade")

app.listen(3000,function () {
    console.log("服务器已经开启")
})
app.get("/",function (req,res) {
    var info = req.query.info
    res.render("login",{showinfo:info})
})
app.post("/login",function (req,res) {
    var data = req.body;
    userhandle.compare(data,function (dos) {
        if(dos==0){
            res.redirect("/?info=用户错误")
        }else if(dos==1){
            res.redirect("/?info=密码错误")
        }else{
            req.session.email = req.body.email
            res.redirect("/users")
        }
    })
})
//登陆验证
app.get("/users",function (req,res) {
    if(req.session.email){
        var info = "用户" +req.session.email;
        res.render("users",{userinfo:info})
    }else {
        res.redirect("/")
    }
})
//用户数据显示
app.get("/usersshow",function (req,res) {
    userhandle.findData(function (data) {
        res.send(data)
    })
})
//用户数据添加
app.post("/usersinsert",function (req,res) {
    userhandle.userinsertData(req.body,function (data) {
        res.send(data)
    })
})
//用户数据删除
app.post("/usersrmove",function (req,res) {
    userhandle.userremoveData(req.body,function (data) {
        res.send(data)
    })
})
//学生数据
app.get("/students",function (req,res) {
    if(req.session.email){
        var info = "用户" +req.session.email;
        res.render("students",{userinfo:info})
    }else {
        res.redirect("/")
    }
})
//学生数据显示
app.get("/studentshow",function (req,res) {
    studentshandle.findData(function (data) {
        res.send(data)
    })
})
//学生数据添加或修改
app.post("/stuInOrUp",function (req,res) {
    var data = req.body
    var condition = req.body.number;
    console.log(condition)
    studentshandle.stuInOrUp(condition,function (num) {
        if(num==0){
            studentshandle.stuinsertData(data,function (data) {
                res.send(data)
            })
        }else if(num==1){
            studentshandle.stuupdateData(condition,data,function (data) {
                res.send(data)
            })
        }
    })
})
//学生数据删除
app.post("/studentremove",function (req,res) {
    studentshandle.sturemoveData(req.body,function (data) {
        res.send(data)
    })
})
//学生数据修改
// app.post("/studentupdate",function (req,res) {
//     var data = req.body;
//     var condition = {"number":data.number}
//     studentshandle.stuupdateData(condition,data,function (data) {
//         res.send(data)
//     })
// })
//学生成绩排序
app.get("/achievementSort",function (req,res) {
    studentshandle.achievementSort(function (data) {
        res.send(data)
    })
})
//年龄排序
app.get("/ageSort",function (req,res) {
    studentshandle.ageSort(function (data) {
        res.send(data)
    })
})
//筛选男
app.get("/screenmale",function (req,res) {
    studentshandle.screenmale(req.query,function (data) {
        res.send(data)
    })
})
//筛选女
app.get("/screenfemale",function (req,res) {
    studentshandle.screenfemale(req.query,function (data) {
        res.send(data)
    })
})
//用户邮箱添加验证
app.post("/maildata",function (req,res) {
    userhandle.mailData(req.body.email,function (data) {
        res.send(data);
    })
})
//学生添加验证
app.post("/studentVerification",function (req,res) {
    studentshandle.studentVerification(req.body.number,function (data) {
        res.send(data)
    })
})



