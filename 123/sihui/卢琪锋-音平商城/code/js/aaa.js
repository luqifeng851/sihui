//鼠标划入，导航栏出现
$(".allbtn").mouseenter(() => {
    $(".jspop").addClass("box");
})
//鼠标划出，导航栏消失
$(".jspop").mouseleave(function () {
    $(this).css("display", "none");
})
console.log("----");