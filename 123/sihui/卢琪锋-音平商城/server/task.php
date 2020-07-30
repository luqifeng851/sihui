<?php
    #把数据添加到数据库中
    //先连接数据库
    $con11 = mysqli_connect("127.0.0.1","root","","aaa");
    //解决上传服务器时中文出现乱码的情况
    if ($con11->connect_error) {
        die("连接失败: " . $con11->connect_error);
    }
    $con11->query("SET NAMES 'UTF8'");
    // mysql_query('SET NAMES UTF8');
    // mysql_query("SET NAMES 'GBK'");
    #读取JSON文件
    $json = file_get_contents("../code/server/details-lis-task.json");
    #把json文件转换为数组
    $data = json_decode($json ,true);
    echo $data;
    echo "<br>";
    #遍历把数据注入到数组中
    for ($i=0 ; $i<count($data); $i++){
        $ele = $data[$i]["ele"];
        $src = $data[$i]["src"];
        $price = $data[$i]["price"];
        $name = $data[$i]["name"];
        $commit = $data[$i]["commit"];
        $minImg=$data[$i]["minImg"];
        $sql = "INSERT INTO `aaa`.`abc` (`goodid`, `src`, `price`, `ele`,`commit`, `name`,`minImg` ) VALUES ('$i', '$src', '$price', '$ele', '$commit','$name','$minImg' )";
        // echo $sql;
        // echo "<br>";
        mysqli_query($con11,$sql);
    }
?>