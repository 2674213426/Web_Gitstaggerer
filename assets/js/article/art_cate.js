$(function() {

    initArtcateList();

    //  定义好 layui 中的 layer
    let layer = layui.layer;

    // 定义 layui 中的 form
    let form = layui.form;

    // 创建一个 承载inddex
    let indexxx = null;


    // 未添加类别按钮绑定事件
    $("#btnAddCate").on("click", function() {
        indexxx = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $("#dialog-add").html()
        });
    });

    // 使用事件委托 给 form 添加 submit 事件
    $("body").on("submit", "#form-add", function(e) {

        // 组织表单的默认事件
        e.preventDefault();

        // 发起 ajax Post 请求
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("添加失败！！！");
                initArtcateList();
                layer.msg("添加成功");
                layer.close(indexxx);
            }
        });

    });

    let indexx = null;

    $("tbody").on("click", ".btn-edit", function(e) {
        indexx = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改类别',
            content: $("#dialog-edit").html()
        });

        // 获取动态添加的 ID
        let id = $(this).attr("data-id");

        // 使用 ajax 获取 当前id 的内容并渲染到 页面中
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status !== 0) return layer.msg("获取失败！！！");
                form.val("form-edit", res.data);
            }
        });
    });

    // 修改方法
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("修改失败！！！");
                layer.msg("修改成功");
                layer.close(indexx);
                initArtcateList()
            }
        });
    });


    let index = null;

    // 创建删除方法
    $("tbody").on("click", ".btn-delete", function() {

        // 定义一个 变量来进行接收 用户点击元素的id
        let id = $(this).attr("data-id");

        // 弹框访问是否继续删
        index = layer.confirm('确认删除?', { icon: 3, title: '提示' },

            // 使用 弹出框的 回调函数
            function(index) {

                // 调用 ajax 发起GET 请求
                $.ajax({
                    method: "GET",
                    url: "/my/article/deletecate/" + id,

                    // 返回数值的回调函数
                    success: function(res) {

                        // 判断请求是否成功
                        if (res.status !== 0) return layer.msg("删除失败！！！");

                        // 使用 layui 的弹框 提示一下 成功
                        layer.msg("删除成功");

                        // 关闭 layui 窗口
                        layer.close(index);

                        // 重新 调用 请求渲染 函数
                        initArtcateList();
                    }
                });
            }
        );


    });




    // 创建一个获取数据的方法
    function initArtcateList() {

        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return "获取文章分类列表失败"
                let talb = template("tpl-table", res);
                $("tbody").html(talb);
            }
        });
    }
});