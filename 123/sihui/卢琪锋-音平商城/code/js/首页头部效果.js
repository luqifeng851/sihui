// 顶部的效果(我的音平)
$(".topNav .right ul li").eq(0).mouseenter(function () {
    $(this).css("border", "1px solid #ccc")
    $(".topNav .nav-details").stop().slideToggle();
})
$(".topNav .right ul li").eq(0).mouseleave(function () {
    $(this).css("border", "none")
    $(".topNav .nav-details").stop().slideToggle();
})
//手机音平
$(".index-head-active span").eq(0).hover(() => $(".wx-code").toggle());
//套装方案
$(".nav-index ul li").eq(1).hover(() => $(".z-index").toggle())
// let oDiv = $(".fullSlide");
let jsonp = $("<div class='jspop box'></div>");
//轮播图旁边的导航
$.getJSON("../server/navData.json", function (res) {
    let html = res.map((ele, index) => {
        let html1 = ele.title.map((ele1) => {
            return `<span>${ele1}</span>`
        }).join("")
        let html2 = ele.dl.map((ele2) => {
            return `<span>${ele2}</span>`
        }).join("")
        let res1 = ele.details.map((ele4) => {
            let res11 = ele4.lis.map((ele3) => {
                return `<li>${ele3}<span>&nbsp;&nbsp;&nbsp;/</span></li>`;
            }).join("");
            return `
        <div class="dt">
            <h3>${ele4.title}</h3>
            <ul>${res11}</ul>
        </div> `
        }).join("");
        let res2 = ele.imgs.map((ele0) => {
            return `<a href="" style="margin:4px;height: 52px;width: 120px;"><img src=${ele0}></a>`
        }).join("");
        return `<li>
            <div>${html1}</div>
            <div class="dd">${html2}</div>
            <div class='pop'>
                <div class="left">${res1}</div>
                <div class="right">
                    <div style="height:186px;padding-left:15px;">
                        <img src="../img/222.png" alt="" style="height:186px;">
                    </div>
                    <h3
                        style="height:40px;line-height:40px;border-bottom:1px solid #ccc;margin-bottom:10px; padding-left:15px;color:orange">
                        品牌精选</h3>
                    ${res2}
                </div>
            </div>
        </li>`;
    }).join("");
    jsonp.html(html);
    $(".allbtn").append(jsonp);
    console.log("++++");
    $(".jspop>li").mouseenter(function () {
        $(".pop").removeClass("pop1")
        $(this).addClass("item").siblings().removeClass("item");
        $(this).find(".pop").addClass("pop1");
    })
    $(".jspop").mouseleave(function () {
        $(".pop").removeClass("pop1");
        $(".jspop>li").removeClass("item");
    })
})