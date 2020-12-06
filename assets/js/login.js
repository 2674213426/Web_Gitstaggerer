$(function() {

    // 点击 “去注册 账号”的连接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 点击 “去登录”
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 验证密码 
    let form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });



    // 获取弹出框
    let layer = layui.layer

    // 注册 使用 Ajax 发起 POST
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        let data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message + "请登入");
            $("#link_login").click();
        });
    });


    // 登录事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.message !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                localStorage.setItem('token', JSON.stringify(res.token))
                location.href = '/index.html'
            }
        });
    });
});