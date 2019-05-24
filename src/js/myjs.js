// 自制选项卡方法
function commonTab(ele1, ele2, clas) {
	var index = ele1.index()
	ele1.addClass(clas).siblings().removeClass(clas)
	ele2.eq(index).addClass(clas).siblings().removeClass(clas)
}

// 切换类
function switchClas(ele,clas) {
	ele.addClass(clas).siblings().removeClass(clas)
}

//验证手机号
function validatemobile(mobile) {
    if (mobile.length == 0) {
        alert('手机号码不能为空！');
        return;
    }
    
    if (mobile.length != 11) {
        alert('请输入有效的手机号码，需是11位！');
        return;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    // var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

    if (!myreg.test(mobile)) {
        alert('请输入有效的手机号码！');
        return;
    }
}

$(function () {
	// 限制详情页图片
	$('.detail_box p img').each(function () {
		$(this).parents('p').css('textIndent', 0)
    })
    $('.goods_detail p img').each(function () {
		$(this).parents('p').css('textIndent', 0)
	})

	// 侧边栏关闭按钮
	$('#sider_close').click(function(){
		$('#sider_box').slideUp()
    })
    
    // 公共选项卡
    $('.tab_item').click(function(){
        commonTab($(this),$('.tab_cont'),'active')
    })
    
})