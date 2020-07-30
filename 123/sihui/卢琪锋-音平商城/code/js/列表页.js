 window.onload = function () {
     new Promise(function (resolve, reject) {
         $("header").load("./首页.html #top");
         resolve();
     }).then(function () {
         return new Promise(function (resolve, reject) {
             setTimeout(function () {
                 $.getScript("../js/首页头部效果.js");
                 resolve();
             }, 200)
         })
     }).then(function () {
         return new Promise(function (resolve, reject) {
             setTimeout(function () {
                 $(".jspop").removeClass("box");
                 resolve();
             }, 200)
         })
     }).then(function () {
         setTimeout(function () {

             $.getScript("../js/aaa.js");
         }, 200)
     })

     //一周销量排行
     $.getJSON("../server/详情页列表左边的上面的数据.json", function (res) {
         let html = res.map(ele => {
             return `<li>
                        <div class="topSale-container topSaleOne">
                            <a href="//item.ingping.com/8937.html" base="//item.ingping.com" params="[id:8937]"
                                target="_blank" title="富克斯特(Focusrite) Scarlett Solo 三代 专业录音声卡 USB外置声卡音频接口 升级版"
                                class="topSaleImg fl">
                                <img alt="富克斯特(Focusrite) Scarlett Solo 三代 专业录音声卡 USB外置声卡音频接口 升级版"
                                    src=${ele.src}>
                            </a>
                            <div class="topSaleMessage fl">
                                <a href="//item.ingping.com/8937.html">${ele.name}</a>
                                <strong class="topSalePrice">${ele.price}</strong>
                            </div>
                        </div>
                    </li>`;
         }).join("");
         let oDiv = ` <h2>一周热销排行</h2><ul class="clearfix">${html}<ul>`
         $(".mc").append(oDiv);
     })
     //达人也在看--轮播图
     $.getJSON("../server/details-left-lunbo.json", function (res) {
         res.forEach((element, index) => {
             let oDiv = $(`<div class='mb-list ${index==0?'item':''}'></div>`);
             let html = element.map(ele => {
                 return `<li>
                            <img src=${ele.src} alt="">
                            <div class="mb-title">${ele.price}</div>
                            <div class="mb-price">${ele.title}</div>
                        </li>`
             }).join("");
             oDiv.html(html);
             if (index == 3) return;
             $(".mb").append(oDiv);
         });
         let count = 0;
         var timer;
         time();

         function time() {
             timer = setInterval(() => {
                 count++;
                 if (count > 2) {
                     count = 0;
                 }
                 $(".mb-list").eq(count).addClass("item").siblings().removeClass("item");
                 $(".mb-span span").eq(count).addClass("item").siblings().removeClass(
                     "item");
             }, 2000)
         }
         $(".mb").mouseenter(() => clearInterval(timer));
         $(".mb").mouseleave(() => time());
     })
     //列表页
     render(0, 0);

     function render(page, orderType) {
         $.ajax({
             type: "get",
             url: "../../server/getDatalist.php",
             data: `page=${page}&orderType=${orderType}`,
             dataType: "json",
             success: function (res) {
                 console.log(res);

                 let html = res.data.map((ele, index) => {
                     let result = ele["minImg"].split("&").map(ele123 => {
                         return `<li><img src=${ele123} alt=""></li>`
                     }).join("");
                     return `<li data-index=${ele.goodid}>
                                        <img src=${ele.src} alt="">
                                        <div class="minImg">
                                            <div class="itemLeft">&lt</div>
                                            <div class="itemzhong">
                                                <ul>${result}</ul>
                                            </div>
                                            <div class="itemRight">&gt</div>
                                            </div>
                                            <div class="price">￥${ele.price}<del>￥${ele.ele}</del></div>
                                            <div class="name">${ele.name}</div>
                                            <div class="commit">
                                            <span class="iconfont icon-xinxi"></span>
                                             ${ele.commit}
                                             <span class="joinBuyCar">加入购物车</span></div>
                                        </li>`
                 }).join("");
                 $(".main-dowm").html(html);
                 $(".minImg .itemzhong li").mouseenter(function () {
                     src = $(this).find("img")[0].src.replace("/S/", "/MLI/");
                     $(this).parents("li").children("img")[0].src = src;
                 })
                 let num1 = 0;
                 $(".itemLeft").click(function () {
                     let index = $(this).next().find("ul").children().length;
                     ++num1;
                     if ((index - num1) >= 5) {
                         left = $(this).next().find("ul")[0].offsetLeft - 40 + "px"
                         $(this).next().find("ul").stop().animate({
                             left
                         })
                     }

                 })
                 $(".itemRight").click(function () {
                     if ($(this).prev().find("ul")[0].offsetLeft < 0) {
                         left = $(this).prev().find("ul")[0].offsetLeft + 40;
                         $(this).prev().find("ul").stop().animate({
                             left: left + "px",
                         })
                     }
                 })
                 //去详情页
                 $(".main-dowm li").click(function () {
                     let index = $(this).data("index") * 1 - 1;
                     window.location.href = `http://127.0.0.1/YingPingMall/code/html/%e8%af%a6%e6%83%85%e9%a1%b5.html?id=${index}`;
                 })
                 //加入购物车
                 //  $(".main-dowm li .joinBuyCar").click(function () {
                 //      console.log($(this));

                 //  })
             }
         });
     }

     // 获取数据并建立有几页， 分页功能
     $.ajax({
         type: "get",
         url: "../../server/getDataCount.php",
         dataType: "json",
         success: function (response) {
             for (let i = 0; i < response.data.count; i++) {
                 $(".foot").append(`<span class=${i==0?"item":""}>${i+1}</span>`)
             }
         }
     })
     // 分页功能之点击换页
     let page, sort;
     $(".foot").on("click", "span", function () {
         page = $(this).index();
         $(this).addClass("item").siblings().removeClass("item");
         render(page, 0);
     })
     //排序功能
     $(".main-sort").on("click", "a", function () {
         sort = $(this).index();
         $(this).addClass("item").siblings().removeClass("item");
         render(page, sort);
     })
     //右边加入购物车
     $(".right_nav").load("./首页.html .right_nav a");
     //尾部标签
     $("footer").load("./首页.html #foot")
 }