1.使div在页面居中
    div{
        width: 300px;
        height: 400px;
        border: solid 1px black;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -150px;
        text-align: center;
    }
    div{
        width: 300px;
        height: 400px;
        border: solid 1px black;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    弹性盒
    .father{
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center
    }
2 图片与文字在同一行显示
    vertical-align:middle  加给img一类的行内元素
    需要注意的是：这个属性只对行内元素起作用，如果不是行内元素要加上diaplay:inline-block
3  文字超出隐藏显示...
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    要写宽高
4  旋转样式
    animation : circling 1s linear 2s infinite
5  -webkit-overflow-scrolling:touch   ios滚动
<!-- https://blog.csdn.net/ieeso/article/details/82219718?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522159520780319195265905187%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=159520780319195265905187&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v3~pc_rank_v3-2-82219718.pc_ecpm_v3_pc_rank_v3&utm_term=-webkit-overflow-scrolling%3Atou -->