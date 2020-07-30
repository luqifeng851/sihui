<?php
    $con6 = mysqli_connect("127.0.0.1","root","","aaa");
    $index=$_REQUEST["index"];
    $sql = "select * from `abc` where goodid = '$index'";
    $result = mysqli_query($con6,$sql);
    $aaa=mysqli_fetch_all($result, MYSQLI_ASSOC);
    $data = array("status"=>"success","msg"=>"请求成功","data"=>$aaa);
    echo json_encode($data,true);
?>