// jQuery 入口函数
$(function() {


    let form = layui.form;

    let layer = layui.layer;

    // 初始化富文本编辑器
    initEditor();

    initCate();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    $("#btnChooseImage").on("click", function() {
        $("#coverFile").click();
    });

    $("#coverFile").on("change", function(e) {

        // 获得 用户选择的 文件
        var file = e.target.files[0];

        // 判断是否有文件
        if (file.length <= 0) return;

        var newImgURL = URL.createObjectURL(file);

        $image.cropper('destroy').attr('src', newImgURL).cropper(options); // 重新初始化裁剪区域
    });

    let art_state = "已发布";

    // 如果用户点击了存为草稿
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })


    $("#form-pub").on("submit", function(e) {

        // 1.阻止表单的默认提交行为
        e.preventDefault();

        // 使用 formData 获取 form表单中的属性名和属性值 因为 formData 是DOM 对象的方法所以 要把 jQuery对象转换成DOM对象
        let fd = new FormData($(this)[0]);

        fd.append("state", art_state);

        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            }).toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中  
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                publishArticle(fd);
            })
    });
    // 调用我们定义的 函数发起 ajax 请求
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                let tm = template("tpl-cate", res);
                $('[name="cate_id"]').html(tm);
                form.render();
            }
        });
    }


    // 封装一个 ajax 请求函数
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }

});