// jQuery 入口函数
$(function() {
    // var form = layui.form
    var form = layui.form
    var layer = layui.layer //添加此行--导入layer
        // let form = layui.form;
    gitusermessage();
    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        gitusermessage()
    })


    // 创建提交事件
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        });
    });


    // 使用 ajax 发起get 请求用户信息
    function gitusermessage() {

        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return console.log("获取失败");
                form.val('formUserInfo', res.data);
            },
        });
    }
});