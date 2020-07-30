 $(() => {
     let captcha1 = new Captcha();
     let yanzhengma, username, possword, phoneNum, number;
     captcha1.draw(document.querySelector('#captcha1'), r => {
         yanzhengma = r;
         $("#Verification").trigger("blur");
         // console.log(r, '验证码1');
     });
     //写正则判断输入框输入值是否正确
     let uesReg = /^\w{0,6}$/;
     let phoneReg = /^1[3-9]\d{9}$/;
     let passwordReg = /^\w{6,12}$/;
     $("#usename").blur(function () {
         let value = $(this).val();
         if (value.length == 0) {
             $(this).parent().addClass("item");
             $(this).next("p").text("用户名不能为空")
         } else {
             if (!uesReg.test(value)) {
                 $(this).parent().addClass("item");
                 $(this).next("p").text("请输入正确的用户名")
             } else {
                 $(this).parent().removeClass("item");
                 $(this).nextAll("p").text("");
                 username = value;
             }
         }

     })
     $("#phone").blur(function () {
         let value = $(this).val();
         if (value.length == 0) {
             $(this).parent().addClass("item");
             $(this).next("p").text("手机号不能为空")
         } else {
             if (!phoneReg.test(value)) {
                 $(this).parent().addClass("item");
                 $(this).next("p").text("请输入正确的手机号")
             } else {
                 $(this).parent().removeClass("item");
                 $(this).nextAll("p").text("");
                 phoneNum = value;
             }
         }

     })
     $("#password").blur(function () {
         let value = $(this).val();
         if (value.length == 0) {
             $(this).parent().addClass("item");
             $(this).next("p").text("密码不能为空")
         } else {
             if (!passwordReg.test(value)) {
                 $(this).parent().addClass("item");
                 $(this).next("p").text("请输入正确的密码")
             } else {
                 $(this).parent().removeClass("item");
                 $(this).nextAll("p").text("");
                 possword = value;
             }
         }

     })
     //验证码功能
     $("#Verification").blur(function () {
         let value = $(this).val().toLowerCase();
         if (value.length == 0) {
             $(this).parent().addClass("item");
             $(this).nextAll("p").text("验证码不能为空")
         } else {
             if (value !== yanzhengma.toLowerCase()) {
                 $(this).parent().addClass("item");
                 $(this).nextAll("p").text("验证码不正确")
             } else {
                 $(this).parent().removeClass("item");
                 $(this).nextAll("p").text("");
                 number = value;
             }
             // console.log(r, '验证码1');
         }

     })
     //点击验证码的时候要默认出发输入框的失去焦点事件
     $("#captcha1").click(function () {

     })
     //当所有的信息都完善好，发送网络请求
     $("#submit").click(function () {
         if (number && username && possword && phoneNum) {
             let quersy = `username=${username}&phone=${phoneNum}&possword=${possword}`
             $.ajax({
                 type: "get",
                 url: "../../server/registered.php",
                 data: quersy,
                 dataType: "json",
                 success: function (response) {
                     if (response.status == "success") {
                         alert("登录成功");
                     } else {
                         alert(response.msg)
                     }
                     console.log(response);
                 }
             });
         } else {
             alert("请继续完善信息");
         }
     })
     $("#login").click(() => {
         window.location.href = "./login.html";
     })
     $(".nl-footer").load("./login.html .nl-footer .item ");
 })