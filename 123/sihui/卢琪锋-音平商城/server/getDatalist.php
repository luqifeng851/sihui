<?php
    #获取相应的数据
    //先连接数据库
    $con3 = mysqli_connect("127.0.0.1","root","","aaa");
    //分页用
    $page = $_REQUEST["page"] * 20;
    //排序用
    $typeOrder = $_REQUEST["orderType"];//内联看sql语句
    if($typeOrder == 0){
        $sql = "SELECT * FROM   abc order by `goodid` limit $page,20";
    }
    if($typeOrder == 1){
        $sql = "SELECT * FROM `abc` ORDER BY `price` ASC limit 0,20";
    }
    if($typeOrder == 2){
        $sql = "SELECT * FROM `abc` ORDER BY `price` DESC limit 0,20";
    }if($typeOrder == 3){
        $sql = "SELECT * FROM `abc` ORDER BY `abc`.`commit`  ASC limit 0 , 20";
    }
        // var_dump($sql);
        $result = mysqli_query($con3,$sql);
    // var_dump($result);
    #转换为JSON数据返回
    $aaa=mysqli_fetch_all($result, MYSQLI_ASSOC);
    $data = array("status"=>"success","msg"=>"请求成功","data"=>$aaa);
    echo json_encode($data,true);
?>