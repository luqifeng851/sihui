<?php
   #连接数据库
   //注册功能
    $db = mysqli_connect("127.0.0.1","root","","LQF");
    //
    $username = $_REQUEST["username"];
    $password = $_REQUEST["possword"];
    $phone = $_REQUEST["phone"];
    #INSERT INTO `lqf`.`userlist` (`username`, `password`, `phone`) VALUES ('zs', '123456', '15766842696');

    $sql="INSERT INTO `lqf`.`userlist` (`username`, `password`, `phone`) VALUES ('$username', '$password', '$phone');";
    $result = mysqli_query($db ,$sql);
    $data = array("status"=>"","msg"=>"","data"=>"");
    if($result){
        $data["status"] = "succes";
        $data["msg"] = "注册成功！！！！！";
    }else{
        $data["status"] = "error";
        $data["msg"] = "抱歉，用户名或者手机号码已注册";
    }
    echo json_encode($data,true);
?>