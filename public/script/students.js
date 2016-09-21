//添加数据
$(".studentinsert").click(function () {
    $("#myModal").modal();
    $(".myform input").val("");
    $(".myform p").html("");
    $(".myform .number").removeAttr("readonly")
    $(".number").blur(function () {
        var number = $(this).val();
        if(number==""){
            $(".mynumber").html("请填写学号!!!")
        }else{
            var data = {"number":number};
            $.ajax({
                "method":"post",
                "url":"/studentVerification",
                "data":data
            }).done(function (data) {
                if(data.length==0){
                    $(".mynumber").html("")
                }else{
                    $(".mynumber").html("学号重复,请重新输入")
                }
            })
        }
    })
    $(".name").blur(function () {
        var name = $(this).val();
        if(name==""){
            $(".myname").html("请填写名字!!!")
        }else {
            $(".myname").html("")
        }
    })
    $(".age").blur(function () {
        var age = $(this).val();
        if(age==""){
            $(".myage").html("请填写年龄!!!")
        }else {
            $(".myage").html("")
        }
    })
    $(".achievement").blur(function () {
        var achievement = $(this).val();
        if(achievement==""){
            $(".myachievement").html("请填写成绩!!!")
        }else {
            $(".myachievement").html("")
        }
    })
    $(".sex").blur(function () {
        var sex = $(this).val();
        if(sex==""){
            $(".mysex").html("请填写性别!!!")
        }else {
            $(".mysex").html("")
        }
    })
})
$(".myform").submit(function () {
    var mynumber = $(".mynumber").html()
    var myname = $(".myname").html()
    var myage = $(".myage").html()
    var myachievement = $(".myachievement").html()
    var mysex = $(".mysex").html()
    if(mynumber==""&& myname==""&& myage=="" && myachievement=="" &&mysex==""){
        var data = $(this).serialize();
        $.ajax({
            "method":"post",
            "url":"/stuInOrUp",
            "data":data
        }).done(function (data) {
            showData(data)
        })
    }
    return false;
})
//删除数据
$("table tbody").delegate(".del","click",function () {
    var name = $(this).attr("data_name");
    var condition = {"name":name};
    if(confirm("是否删除数据?")){
        $.ajax({
            "method":"post",
            "url":"/studentremove",
            "data":condition
        }).done(function (data) {
            showData(data)
        })
    }
})
//修改数据
$("table tbody").delegate(".cel","click",function () {
    $("#myModal").modal();
    var number = $(this).attr("data_number")
    $(".number").val(number).attr("readonly","readonly");
})
//显示数据
$.ajax({
    "method":"get",
    "url":"/studentshow"
}).done(function (data) {
    showData(data)
})
//数据遍历方法
function showData(elem){
    $("table tbody").empty();
    for(var i in elem){
        var $tr = $("<tr>");
        for(var j in elem[i]){
            var text = elem[i][j];
            var $td = $("<td>");
            $td.text(text);
            $tr.append($td);
        }
        $tr.append("<td><button class='del' data_name='"+elem[i].name+"'>删除</button></td>")
        $tr.append("<td><button class='cel' data_number='"+elem[i].number+"'>修改</button></td>")
        $("table tbody").append($tr);
    }
}
//成绩排序
$("#mybtn").click(function () {
    $.ajax({
        "method":"get",
        "url":"/achievementSort"
    }).done(function (data) {
        showData(data)
    })
})
//年龄排序
$("#myagebtn").click(function () {
    $.ajax({
        "method":"get",
        "url":"/ageSort"
    }).done(function (data) {
        showData(data)
    })
})
//筛选男
$("#mymale").click(function () {
    $.ajax({
        "method":"get",
        "url":"/screenmale"
    }).done(function (data) {
        showData(data)
    })
})
//筛选女
$("#myfemale").click(function () {
    $.ajax({
        "method":"get",
        "url":"/screenfemale"
    }).done(function (data) {
        showData(data)
    })
})
 

