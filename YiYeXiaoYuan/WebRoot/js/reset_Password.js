/** * Created by p on 2016/11/13. */$(function() {	var show_rsp_txt = function() {		$('#login_rsp').slideDown(300);		setTimeout(function() {			$('#login_rsp').slideUp(300);		}, 3000);	};//登陆验证后的文本响应	var test_number = function(num) {		var reg = /[0-9]{11}/;		if (reg.test(num) == true) {			return 1;		} else {			return 0;		}	};//匹配电话号码 t 1 f 0	var tel_code;	$('#login-get').on('tap click', function(e) {		e.preventDefault();		var $number = $('#Mobile_num').val();		var $validate_num = $('#validate_num').val();		if (test_number($number) == 1) {			if ($validate_num != img_validate.img[x1].id) {				$('#reset_rsp_txt').html('验证码输入错误');				show_rsp_txt();			} else {				//发送验证码到手机				$.ajax({					method : "post",					url : "servlet/ValidateServlet",					dataType : 'json',					data : {						'mobile' : $number					},					success : function(data) {						//发送短信验证码						tel_code = data.checkCode;						var countDown = 60;						var iCount = setInterval(function() {							if (countDown > 0) {								countDown--;								$('#login-get').val(countDown + 's');								$('#login-get').attr("disabled", true);							} else {								clearInterval(iCount);								countDown = 60;								$('#login-get').val('获取手机验证码');								$('#login-get').attr("disabled", false);							}						}, 1000); //计时后再能点击					},					error : function() {						alert('net wrong1');					}				});			}		} else {			$('#reset_rsp_txt').html('电话号码格式不正确');			show_rsp_txt();		}	});	$('#zhuce-submit').on('tap click', function(e) {		e.preventDefault();		var $number = $('#Mobile_num').val();		var $validate_num = $('#validate_num').val();		if (test_number($number) == 1) {			if ($validate_num != img_validate.img[x1].id) {				$('#reset_rsp_txt').html('验证码输入错误');				show_rsp_txt();			} else {				if ($('#tel-code').val() == tel_code) {//手机验证码验证正确					//注册时设置密码  1					//注册后改变密码  2					//重置密码     	3					//提交注册申请					window.sessionStorage.setItem('type', 3);					window.sessionStorage.setItem('userTel', $number);					window.location.href = 'setPassword.html';//跳转到设置密码的地方				} else {					$('#reset_rsp_txt').html('手机验证码不正确');					show_rsp_txt();				}			}		} else {			$('#reset_rsp_txt').html('电话号码格式不正确');			show_rsp_txt();		}	});});