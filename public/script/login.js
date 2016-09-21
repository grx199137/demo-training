var re = /^[a-z0-9]{6,15}\@163\.com$/;
$(".mytxt").blur(function () {
    var data = $(this).val();
    var result = re.test(data);
    $("#myinfo").html(checkInput(result))
})
function checkInput(bool) {
    var rightSpan = "<span>正确</span>"
    var wrongSpan = "<span>请输入例:xiaoming@163.com的6-15位数字和字母的邮箱格式</span>";
    if(bool){
        return rightSpan
    }else{
        return wrongSpan
    }
}
