$(function() {

    let layer = layui.layer;

    // 获取 用户的信息
    getUserInfo();

    // 给 退出按钮设置 点击事件
    $("#ExitButton").on("click", function(e) {
        e.preventDefault();

        layer.confirm('确定,要退出吗?', { icon: 3, title: '提示' }, function(index) {

            localStorage.removeItem("token");
            location.href = './login.html'
            layer.close(index);
        });
    });

});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        // 使用 GET请求
        method: "GET",

        // 因为使用了 请求拦截 不需要填充 前面的 连接
        url: "/my/userinfo",

        // 返回值 回调
        success: function(res) {

            // 判断 是否获取成功
            if (res.status !== 0) return console.log("获取数据失败");

            // 把获取的用户信息渲染到 页面中
            Renderuserinfo(res)
        },

    });
}


// 把得到的用户信息渲染到 页面中
function Renderuserinfo(obj) {
    let a = obj.data.nickname || obj.data.username;
    if (a.length >= 5) {

        $(".hy").html("欢迎   " + a.substring(0, 5));
    } else {
        $(".hy").html("欢迎   " + a);
    }
    if (obj.data.user_pic) {
        $(".layui-nav-img").attr("src", obj.data.user_pic);
        $(".txx").hide();
    } else {
        $(".layui-nav-img").hide();
        $(".txx").show();
        $(".txx").html(a[0].toUpperCase());
    }
}