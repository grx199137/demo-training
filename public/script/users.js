//添加数据并验证是否邮箱存在
$(".userinsert").click(function () {
    $("#myModal").modal();
    $(".myform input").val("")
    $(".myform p").html("")
    $(".myform .email").removeAttr("readonly")
    $(".email").blur(function () {
        var email = $(this).val();
        if(email == ""){
            $(".myemail").html("邮箱不能为空!!!")
        }else {
            var data = {"email":email};
            $.ajax({
                "method":"post",
                "url":"/maildata",
                "data":data
            }).done(function (data) {
                if(data.length==0){
                    $(".myemail").html("")
                }else {
                    $(".myemail").html("邮箱地址已经存在,请换个邮箱!!!")
                }
            })
        }
    })
    $(".username").blur(function () {
        var username = $(this).val();
        if(username==""){
            $(".myusername").html("用户名不能为空!!!")
        }else {
            $(".myusername").html("")
        }
    })
    $(".password").blur(function () {
        var password = $(this).val();
        if(password==""){
            $(".mypassword").html("密码不能为空!!!")
        }else {
            $(".myupassword").html("")
        }
    })
})
$(".myform").submit(function () {
    var myemail = $(".myemail").html();
    var myusername = $(".myusername").html();
    var mypassword= $(".mypassword").html()
    if(myemail=="" && myusername=="" && mypassword==""){
        var data = $(this).serialize();
        $.ajax({
            "method":"post",
            "url":"/usersinsert",
            "data":data
        }).done(function (data) {
            showData(data)
        })
    }
    return false;
})
//删除数据
$("table tbody").delegate(".del","click",function () {
    var email = $(this).attr("data_email");
    var condition = {"email":email};
    if(confirm("是否删除数据?")){
        $.ajax({
            "method":"post",
            "url":"/usersrmove",
            "data":condition
        }).done(function (data) {
            showData(data)
        })
    }
})
//显示数据
$.ajax({
    "method":"get",
    "url":"/usersshow"
}).done(function (data) {
    showData(data)
})
function showData(elem){
    $("table tbody tr").empty();
    for(var i in elem){
        var $tr = $("<tr>");
        for(var j in elem[i]){
            var text = elem[i][j];
            var $td = $("<td>");
            $td.text(text);
            $tr.append($td);
        }
        $tr.append("<td><button class='del' data_email='"+elem[i].email+"'>删除</button></td>")
        // $tr.append("<td><button class='cel' data_email='"+elem[i].email+"'>修改</button></td>")
        $("table tbody").append($tr);
    }
}




