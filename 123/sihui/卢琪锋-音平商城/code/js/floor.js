//楼层效果
class Floor {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.createELE()
    }
    createELE() {
        let oDiv = $("<div class='box'></div>");
        let res1 = this.data.more.map(ele => {
            return `<li><a href="">&nbsp;&nbsp;${ele}&nbsp;&nbsp;/</a></li>`;
        }).join("")
        let html1 = `<h1>${this.data.title}<ul>${res1}</ul></h1>`;
        let res21 = this.data.details.map((element, index) => {
            return `<div class="content ${index==0||index==3?"item":""}">
                            <div class="commit">${element.commit}</div>
                            <div class="name">${element.name}</div>
                            <div class="price">${element.price}</div>
                            <img src=${element.img} alt="">
                    </div>`
        }).join("");
        let res2 = `<div class="rightSize">${res21}</div>`;
        let html2 = `<div class="box-list">
                        <div class = "Bigimg"><img src=${this.data.src} alt = ""></div>
                        ${res2}
                        </div>`;
        let res3 = this.data.dowmPic.map(ele3 => {
            return `<li><img src=${ele3} alt=""></li>`
        }).join("")
        let html3 = `<div class="dowmPic"><ul>${res3}</ul></div>`;
        oDiv.html(html1 + html2 + html3);
        $(".floor").append(oDiv);
    }
}