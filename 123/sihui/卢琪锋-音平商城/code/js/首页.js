$(() => {
    $.getScript("../js/首页头部效果.js");
    let oDiv = $(".fullSlide");
    //轮播图
    let middle = $("<div class='middle'></div>")
    let lis = dataImg.map((ele, index) => {
        return `<li class=${index==0?"item":""}><img src=${ele}></li>`;
    }).join("");
    middle.append(lis);
    oDiv.append(middle);
    let num = 0;
    time();
    var timer;

    function time() {
        var timer = setInterval(() => {
            num++;
            if (num > 4) {
                num = 0
            }
            $(".middle>li").eq(num).addClass("item").siblings().removeClass("item");
            $("#fullSlide").css("background", maxColor[num])
        }, 2000);
        $(".fullSlide").mouseenter(() => clearInterval(timer));
    }
    $(".fullSlide").mouseleave(() => time());
    //轮播图右边
    let bbb = $("<div class='show-case'><img src='../img/333.png'>")
    oDiv.append(bbb);
    //猜你喜欢
    $.getJSON("../server/guessYouLike.json", function (res) {
        let html = res.map(ele => {
            return `<li>
                                <img src=${ele.src} alt="">
                                <div class="item_name">${ele.name}</div>
                                <div class="item_price">${ele.price}</div>
                            </li>`
        }).join("");
        $(".GuessYouLike ul").html(html);
        $("#main-bg h2 span").click(() => {
            let left = -1250 + "px";
            if ($(".GuessYouLike ul").css("left") == "-1250px") {
                left = 0;
            }
            $(".GuessYouLike ul").stop().animate({
                left
            }, 1000)
        })
    })
    //热卖促销

    //楼层效果
    $.getJSON("../server/floor.json", function (res) {
        for (let i = 0; i < res.length; i++) {
            (new Floor(res[i])).init();
        }
    })
    //最新晒单
    $.getJSON("../server/newShaiDan.json", function (res) {
        let html = res.map(ele => {
            return `<li>
                <img src=${ele.src} alt="">
                <div class="tit_b">${ele.title}</div>
                <div class="newsShaidan-min-img">
                    <img src=${ele.minImg} alt="">
                    <div>${ele.minImgDetails}</div>
                </div>
                <div class="commit">
                    <span style="float: left">${ele.name}</span>
                    <span style="float: right">${ele.time}</span>
                </div>
            </li>`
        }).join("");
        $("#newsShaidan ul").html(html);
    })

    //音平资讯
    $.getJSON("../server/yinpingZiXun.json", function (res) {
        let html = res.map(ele => {
            return `<li style="float: left">
                                <img src=${ele.src} alt="">
                                <div class="til_a">${ele.title}</div>
                                <div class="commit_A">
                                    <span style="float: left">${ele.name}</span>
                                    <span style="float: right">${ele.time}</span>
                                </div>
                            </li>`
        }).join("");

        $("#newsZixun ul").html(html);
    })
    //左侧楼层跳转
    $("#nav_panel li:not(:last)").mouseenter(function () {
        $(this).addClass("item111").siblings().removeClass("item111");
    })
    //滚动条滚动时的效果
    window.onscroll = () => {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollT >= 700) {
            $("#nav_panel").css("display", "block");
            $("#nav_panel li").removeClass("item111");
            if (scrollT >= 1420 && scrollT < 1420 + 540) {
                $("#nav_panel li").eq(1).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 1960 && scrollT < 1960 + 540) {
                $("#nav_panel li").eq(2).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 2500 && scrollT < 2500 + 540) {
                $("#nav_panel li").eq(3).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 3040 && scrollT < 3040 + 540) {
                $("#nav_panel li").eq(4).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 3580 && scrollT < 3580 + 540) {
                $("#nav_panel li").eq(5).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 4130 && scrollT < 4130 + 540) {
                $("#nav_panel li").eq(6).addClass("item111").siblings().removeClass("item111");
            } else if (scrollT >= 4530 && scrollT < 4530 + 2000) {
                $("#nav_panel li").eq(7).addClass("item111").siblings().removeClass("item111");
            }
        } else {
            $("#nav_panel").css("display", "none");
        }
        $("#nav_panel").on("click", "li", function () {
            let index = $(this).index();
            let Top = 0;
            if (index >= 2) {
                Top = 1650 + 540 * (index - 1)
            }
            if (index == 1) {
                Top = 1520;
            }
            if (index == 8) {
                Top = 0;
            }
            window.scrollTo(0, Top)
        })
    }

});