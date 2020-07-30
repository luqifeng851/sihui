window.onload = function () {
    let index = window.location.search.slice(4) * 1 + 1;
    console.log(index);

    //头部标签
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
    }).then(function (resolve, reject) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                $.getScript("../js/aaa.js");
                resolve();
            }, 200)
        })
    }).then(function (resolve, reject) {
        setTimeout(function () {
            $(".jspop").removeClass("box");
        }, 200)
    })
    $.ajax({
        type: "get",
        url: "../../server/getGoods.php",
        data: "index=" + index,
        dataType: "json",
        success: function (response) {
            console.log(response);

            let data = response["data"][0];
            let res = data["minImg"].split("&").map(ele1 => {
                return `<li><img src=${ele1} alt=""></li>`
            }).join("");
            let html = `<div class="box">
                            <div class="box-img">
                                <img src=${data.src} alt="">
                                <div class="mask"></div>
                            </div>
                            <div class="box-down-imgs">
                                <div class="itemLeft">&lt</div>
                                <div class="itemzhong">
                                    <ul>${res}</ul>
                                </div>
                                <div class="itemRight">&gt</div>
                            </div>
                            <div class="max-img"><img src=${data.src.replace("/MLI/","/L/")}></div>
                        </div>
                        <div class="Good-details">
                            <div class="name">${data.name}</div>
                            <div class="details">【年货价828元】1.5-1.16限时优惠!!! 该产品/套装不与满减活动同时参与</div>
                            <div class="summary-price-left-box">
                                <div class="YinPinprice">音平价</div>
                                <div class="price"><span>￥</span>${data.price}</div>
                                <del>[${data.ele}]</del>
                                <span class="priceDowm">降价通知</span>
                                <img src="../img/详情页1.png" alt="" class="img1">
                                <img src="../img/详情页2.png" alt="" class="img2">
                            </div>
                            <img src="../img/详情页3.png" alt="" class="img3">
                            <div class="btn-add-buy">
                                <button>&lt</button><input type="text" value="1"><button>&gt</button>
                                <span class="buy">立即购买</span>
                                <span class="buyCar" data-index=${data.goodid}>加入购物车</span>
                            </div>
                        </div>`;
            $(".main").prepend(html);
            //盒子下面的鼠标移入事件
            $(".box-down-imgs .itemzhong li").mouseenter(function () {
                src = $(this).find("img")[0].src.replace("/S/", "/L/");
                $(".box-img img")[0].src = src;
                $(".max-img img")[0].src = src;
                $(this).addClass("item").siblings().removeClass("item");
            })
            let num1 = 0;
            $(".itemLeft").click(function () {
                let index = $(this).next().find("ul").children().length;
                ++num1;
                if ((index - num1) >= 5) {
                    left = $(this).next().find("ul")[0].offsetLeft - 65 + "px"
                    $(this).next().find("ul").stop().animate({
                        left
                    })
                }

            })
            //左右两边点击
            $(".itemRight").click(function () {
                if ($(this).prev().find("ul")[0].offsetLeft < 0) {
                    left = $(this).prev().find("ul")[0].offsetLeft + 65;
                    $(this).prev().find("ul").stop().animate({
                        left: left + "px",
                    })
                }
            })
            //放大镜
            // 获取元素
            var magnify = $('.box')[0];
            var minBox = $('.box-img')[0];
            var minBoxImg = $('.box-img img')[0];
            var mask = $('.mask')[0];

            var maxBox = $('.max-img')[0];
            var maxImg = $('.max-img img')[0];

            // 第一步 绑定鼠标移入事件

            minBox.onmouseenter = function () {
                mask.style.display = "block";
                maxBox.style.display = "block";
            }

            // 第二步 当鼠标在图片上移动的时候绑定移动事件

            minBox.onmousemove = function (e) {
                // 为什么没有用 minBox.offsetLeft
                var x = e.pageX - magnify.offsetLeft - mask.offsetWidth / 2;

                var y = e.pageY - magnify.offsetTop - mask.offsetHeight / 2;

                // 为了不让遮罩出去，需要限制范围
                // 遮罩可以运动的最大范围
                var maxX = minBox.offsetWidth - mask.offsetWidth; // 100px
                var maxY = minBox.offsetHeight - mask.offsetHeight;
                if (x <= 0) {
                    x = 0;
                }
                if (y <= 0) {
                    y = 0;
                }
                if (x >= maxX) {
                    x = maxX;
                }
                if (y >= maxY) {
                    y = maxY;
                }
                mask.style.left = x + 'px';
                mask.style.top = y + 'px';

                // 大图片可以运动的最大X方向的距离
                var maxImgX = maxImg.offsetWidth - maxBox.offsetWidth; // 200px
                var maxImgY = maxImg.offsetHeight - maxBox.offsetHeight;

                var biliX = maxImgX / maxX; // 2;

                var biliY = maxImgY / maxY; // 2
                // 大盒子运动的距离 = 遮罩每像素移动的距离 * 遮罩运动的距离

                maxImg.style.left = -(x * biliX) + 'px';
                maxImg.style.top = -(y * biliY) + 'px';

            }

            // 第三部 绑定鼠标移出事件

            minBox.onmouseleave = function () {
                mask.style.display = "none";
                maxBox.style.display = "none";
            }
            //右边的详情之添加到购物车的数量
            $(".btn-add-buy button").first().click(function () {
                let value = $(this).next().val() - 1;
                if (value < 0) {
                    value = 0;
                }
                $(".btn-add-buy input").val(value);
            })
            $(".btn-add-buy button").last().click(function () {
                let value = $(this).prev().val() * 1 + 1;
                $(".btn-add-buy input").val(value);
            })
            //达人也在看
            //达人也在看--轮播图
            $.getJSON("../server/details-left-lunbo.json", function (res) {
                res.forEach((element, index) => {
                    let oDiv = $(`<div class='mb-list ${index==0?' item':''}'></div>`);
                    let html = element.map(ele => {
                        element.length = 2;
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
            //添加到购物车
            $(".buyCar").click(function () {
                $.ajax({
                    type: "get",
                    url: "../../server/addbuycar.php",
                    data: {
                        "id": index,
                        "type": "add",
                    },
                    // dataType: "dataType",
                    success: function (response) {
                        console.log(response);

                    }
                });
            })
        }
    });
    $(".right_nav").load("./首页.html .right_nav a");
    $("footer").load("./首页.html #foot")
}