<?php
    #计算页码值
    //先连接数据库
    $con = mysqli_connect("127.0.0.1","root","","aaa");

    #查询数据库中商品的总数量
    $sql = "SELECT * FROM abc";
    $result = mysqli_query($con , $sql);
    $listCount = mysqli_num_rows($result);
    #上面这个是计算商品的总数量
    // print_r($listCount);
    #计算页码值
    // $count = 20 ;
    $pageCount = ceil($listCount / 20);
    // echo $pageCount;
    #JSON数据返回
    $data = array("status"=>"success","msg"=>"获取成功","data"=>array("count"=>$pageCount));
    echo json_encode($data,true);
?>