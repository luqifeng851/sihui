//导航栏数据
function f1() {


    var oDiv = document.querySelector(".jspop.box");
    var navData = [];
    var lis = oDiv.querySelectorAll("li");
    var len = lis.length;
    for (var i = 0; i < len; i++) {
        var ele = lis[i];
        var o = {};
        var arr1 = [];
        var lis1 = ele.querySelectorAll(".tx a");
        for (var j = 0; j < lis1.length; j++) {
            arr1.push(lis1[j].innerText);
        }
        o.title = arr1;
        var arr2 = [];
        var lis2 = ele.querySelector("dl").querySelectorAll("dd a");
        for (var k = 0; k < lis2.length; k++) {
            arr2.push(lis2[k].innerText);
        }
        o.dl = arr2;
        var arr3 = [];
        var lis3 = ele.querySelectorAll(".pop .col-md-9.col-xs-9 dl");
        for (var l = 0; l < lis3.length; l++) {
            var obj = {};
            obj.title = lis3[l].querySelector("dt a").innerText;
            var arr4 = [];
            // var num = lis3[l].querySelector("dd").children;
            var num = lis3[l].querySelectorAll(".ui-link");

            for (var p = 0; p < num.length; p++) {
                arr4.push(num[p].innerText)
            }
            obj.lis = arr4;
            // var arr5 = [];
            // var num1 = lis3[l].querySelectorAll(".col-md-3 .col-xs-3 dl");
            // for (var m = 0; m < num1; m++) {
            //     arr5.push(num1[m].innerText)
            // }
            // obj.imgs = arr5;
            arr3.push(obj);
        }
        var arr10 = [];
        var lll = ele.querySelector(".col-md-3.col-xs-3").querySelectorAll("img");
        for (var t = 0; t < lll.length; t++) {
            arr10.push(lll[t].src)
        }
        o.imgs = arr10;
        o.details = arr3;
        navData.push(o);
    }
    console.log(JSON.stringify(navData));
}
//猜你喜欢下面的数据
function f2() {
    var oDiv = document.querySelector("#guessLikeContent_index");
    var lis = oDiv.querySelectorAll("li");
    var data = [];
    for (var i = 0; i < lis.length; i++) {
        var o = {};
        o.src = lis[i].querySelector("img").src;
        o.name = lis[i].querySelector(".item_name").innerText;
        o.price = lis[i].querySelector(".item_price").innerText;
        data.push(o)
    }
    console.log(JSON.stringify(data));
}
//楼层效果
function f3() {
    var oDiv = document.querySelectorAll(".MainBlock.clearfix");
    var data = [];
    for (var i = 1; i < oDiv.length; i++) {
        var ele = oDiv[i];
        var o = {};
        o.title = $(ele).prev().find("h2").text();
        arr10 = [];
        var num = $(ele).prev().find(".more")[0].children;
        for (var p = 0; p < num.length; p++) {
            if (num[p].nodeName == "A") {
                arr10.push(num[p].innerText)
            }
        }
        o.more = arr10;
        arr11 = [];
        var num11 = $(ele).next().find("li");
        for (var a = 0; a < num11.length; a++) {
            arr11.push(num11[a].querySelector("img").src)
        }
        o.dowmPic = arr11;
        o.more = arr10;
        o.src = ele.querySelector(".Block1.bigblock.fl img").src;
        var arr = [];
        var text = ele.querySelectorAll(".MBlock_980 a");
        for (var j = 1; j < text.length; j++) {
            var obj1 = {};
            var self1 = text[j];
            obj1.img = self1.querySelector("img").src;
            console.log(self1);

            obj1.commit = self1.querySelectorAll("p")[0].innerText;
            obj1.name = self1.querySelectorAll("p")[1].innerText;
            obj1.price = self1.querySelector(".item_price").innerText;
            arr.push(obj1)
        }
        var text1 = ele.querySelectorAll(".MBlock_210.ml-10.visible-lg-block a");
        for (var k = 0; k < text1.length; k++) {
            var obj2 = {};
            var self2 = text1[k];
            obj2.img = self2.querySelector("img").src;
            obj2.commit = self2.querySelector(".text-overflow.c-999").innerText;
            obj2.name = self2.querySelector(".f-16.text-overflow").innerText;
            obj2.price = self2.querySelector(".item_price").innerText;
            arr.push(obj2)
        }
        o.details = arr;
        data.push(o)
    }

    console.log(JSON.stringify(data));

}
//主页，最新晒单
function f31() {
    var oDiv = document.querySelector("#newsShaidan");
    var lis = oDiv.children;
    var data = [];
    for (var i = 0; i < lis.length; i++) {
        var ele = lis[i];
        var o = {};
        o.src = ele.querySelector(".sd_img img").src;
        o.title = ele.querySelector(".tit_b").innerText;
        o.minImg = ele.querySelector(".pro_img").src;
        o.minImgDetails = ele.querySelector(".pro_tit").innerText;
        o.name = ele.querySelector(".fl.userMsg").innerText;
        o.time = ele.querySelector(".fr").innerText;
        data.push(o)
    }
    console.log(JSON.stringify(data));

}
//主页 ， 音平资讯
function f32() {
    var oDiv = document.querySelector("#newsZixun");
    var lis = oDiv.children;
    var data = [];
    for (var i = 0; i < lis.length; i++) {
        var ele = lis[i];
        var o = {};
        o.src = ele.querySelector(".sd_img img").src;
        o.title = ele.querySelector(".tit_a").innerText;
        o.name = ele.querySelector(".fl").innerText;
        o.time = ele.querySelector(".fr").innerText;
        data.push(o)
    }
    console.log(JSON.stringify(data));
}
//详情页左边  达人也在看数据
function f4() {
    var oDiv = document.querySelector(".clearfix.RecommendedColumn-content-ul");
    var lis = oDiv.querySelectorAll("li");
    var data = [];
    for (var i = 0; i < lis.length; i++) {
        var arr = [];
        var text = lis[i].querySelectorAll(".productImg");
        for (var j = 0; j < text.length; j++) {
            var o = {};
            var ele = text[j];
            o.src = ele.querySelector("img").src;
            o.price = ele.querySelector(".Rem-price").innerText;
            o.title = ele.querySelector(".Rem-title").innerText;
            arr.push(o)
        }
        data.push(arr);
    }
    console.log(JSON.stringify(data));
}
//详情页商品列表数据
function f5() {
    var oDiv = document.querySelector(".gl-warp.clearfix");
    var lis = oDiv.children;
    var data = [];
    for (var i = 0; i < lis.length; i++) {
        var o = {};
        o.src = lis[i].querySelector(".goods-img").src;
        o.price = lis[i].querySelector(".price").innerText.slice(1);
        o.ele = lis[i].querySelector(".old-price").innerText;
        o.name = lis[i].querySelector(".p-name").innerText;
        o.commit = lis[i].querySelector(".comment.com-thumb span").innerText;
        arr9 = [];
        num = lis[i].querySelectorAll(".thumbs li");
        for (var j = 0; j < num.length; j++) {
            arr9.push(num[j].querySelector("img").src)
        }
        o.minImg = arr9.toString();
        data.push(o)
    }

    console.log(JSON.stringify(data));

}
//详情页，列表左边上的数据
function f6() {
    var oDiv = document.querySelector(".mc .clearfix");
    var lis = oDiv.children;
    var arr = [];
    for (var i = 0; i < lis.length; i++) {
        var o = {};
        o.src = lis[i].querySelector("img").src;
        o.title = lis[i].querySelector(".topSaleMessage a").innerText;
        o.price = lis[i].querySelector(".topSalePrice").innerText;
        arr.push(o)
    }

    console.log(JSON.stringify(arr));


}