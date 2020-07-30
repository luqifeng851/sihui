 $(() => {
     let yanzhengma, possword, phoneNumOruserName, number;
     let captcha1 = new Captcha();
     captcha1.draw(document.querySelector('#captcha1'), r => {
         yanzhengma = r;
     });
     let uesReg = /^\w{0,6}$/;
     let phoneReg = /^1[3-9]\d{9}$/;
     let passwordReg = /^\w{6,12}$/;
     $("#phone").blur(function () {
         let value = $(this).val();
         if (phoneReg.test(value) || uesReg.test(value)) {
             phoneNumOruserName = value;
         }

     })
     $("#password").blur(function () {
         let value = $(this).val();
         if (passwordReg.test(value)) {
             possword = value;
         }
     })
     //验证码功能
     $("#Verification").blur(function () {
         let value = $(this).val().toLowerCase();
         if (value == yanzhengma.toLowerCase()) {
             number = value;
         }

     })
     //点击验证码的时候要默认出发输入框的失去焦点事件
     $("#captcha1").click(function () {
         $("#Verification").trigger("blur");
     })
     //当所有的信息都完善好，发送网络请求
     $("#submit").click(function () {
         if (number && possword && phoneNumOruserName) {
             if (phoneReg.test(phoneNumOruserName)) {
                 let quersy = `phone=${phoneNumOruserName}&possword=${possword}`;
                 $.ajax({
                     type: "get",
                     url: "../../server/login-phone.php",
                     data: quersy,
                     dataType: "json",
                     success: function (response) {
                         if (response.status == "success") {
                             alert(response.msg);
                         } else {
                             alert(response.msg);
                         }
                     }
                 });
             } else if (uesReg.test(phoneNumOruserName)) {
                 let quersy = `username=${phoneNumOruserName}&possword=${possword}`;
                 $.ajax({
                     type: "get",
                     url: "../../server/login-username.php",
                     data: quersy,
                     dataType: "json",
                     success: function (response) {
                         if (response.status == "success") {
                             alert(response.msg);
                         } else {
                             alert(response.msg);
                         }
                         console.log(response);

                     }
                 });

             }
             $("#phone,#password,#Verification").val("")

         } else {
             alert("填写的信息有误");
         }

     })
     $("#registered").click(() => {
         console.log("---");

         window.location.href = "./registered.html"
     })
 })