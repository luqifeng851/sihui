$(() => {
    class Render {
        constructor(data, num) {
            this.data = data;
            this.num = num;
            this.root = null;
        }
        init() {
            this.createELE();
            this.getallMoney();
            this.addBtnelement();
        }
        createELE() {
            let oDiv = $(`<div class='clearfix' data-index=${this.data.goodid}></div>`);
            let html = `<input type="checkbox" checked="checked">
                        <img src=${this.data.src} alt="">
                        <div class="customCart">${this.data.name}</div>
                        <div class="good_price">
                            <del>￥${this.data.ele}</del>
                            <span>￥${this.data.price}</span>
                        </div>
                        <button>-</button><input type="text" class="num" value=${ this.num}><button>+</button >
                        <span class="allPrice">￥${this.data.price* this.num}</span>
                        <button class="delete_good">删除</button>`;
            oDiv.html(html);
            oDiv.insertBefore($(".allMoney"));
            this.root = oDiv;
        }
        getallMoney() {
            let text = 0;
            let num = 0;
            $(".allPrice").each((index, ele) => {
                text += ele.innerText.slice(1) * 1;
            })
            $(".sumRealMoney span").text("￥" + text);
            $(".num").each((index, ele) => {
                num += ele.value * 1;
            })
            $(".good_number span").text(num)
        }
        addBtnelement() {
            let ele = this;
            this.root.find("button").eq(0).click(function () {
                let value = $(this).next().val() * 1 - 1;
                if (value < 0) return;
                $(this).next().val(value);
                let price = $(".good_price span").last().text().slice(1) * 1 * value;
                $(this).nextAll(".allPrice").text("￥" + price);
                ele.getallMoney();
                let goodid = $(this).parent().data("index");
                ele.allChoose("update", "left", goodid)
            })
            this.root.find("button").eq(1).click(function () {
                let value = $(this).prev().val() * 1 + 1;
                $(this).prev().val(value);
                let price = $(".good_price span").last().text().slice(1) * 1 * value;
                $(this).nextAll(".allPrice").text("￥" + price);
                ele.getallMoney();
                let goodid = $(this).parent().data("index");
                ele.allChoose("update", "right", goodid)
            })
            this.root.find("button").eq(2).click(function () {
                $(this).parent().remove();
                ele.getallMoney();
                let goodid = $(this).parent().data("index");
                ele.allChoose("del", null, goodid)
            })
        }
        //更新服务器功能
        allChoose(type, flag, goodid) {
            $.ajax({
                type: "get",
                url: "../../server/addbuycar.php",
                data: {
                    type,
                    flag,
                    goodid,
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                }
            });
        }
    }

    $.ajax({
        type: "get",
        url: "../../server/addbuycar.php",
        data: "type=get",
        dataType: "json ",
        success: function (response) {
            let arr = response.data;
            arr.forEach(element => {
                $.ajax({
                    type: "get",
                    url: "../../server/getGoods.php",
                    data: "index=" + element.goodID,
                    dataType: "json",
                    success: function (res) {
                        (new Render(res["data"][0], element.num).init());
                        $(".head input,.allMoney input").click(function () {
                            if ($(this).is(":checked")) {
                                $("input[type='checkbox']").attr("checked", true);

                            } else {
                                $("input[type='checkbox']").attr("checked", false);
                            }
                        })
                    }
                });
            });

        }
    });

    $("footer").load("./首页.html #foot");
})