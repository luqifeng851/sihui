<?php
//登录功能
$username = $_REQUEST["username"];
$password = $_REQUEST["possword"];
#连接数据库
$db = mysqli_connect("127.0.0.1","root","","lqf");
    ##用户名是否存在，密码要正确
    #检查制定的用户名
$sql="select * from  userList  where username  = '$username'";
$result = mysqli_query($db,$sql);
$data = array("status"=>"","msg"=>"","data"=>"");
if(mysqli_num_rows($result)== "0")
{
    $data["status"] = "error";
    $data["msg"] = "登录失败，用户名不存在";
}else{
        #检查密码是否正确
        $res = mysqli_fetch_array($result);
        if($res["password"] !== $password)
        {
            $data["status"] = "error";
            $data["msg"] = "登录失败，密码不正确";
        }else{
            $data["status"] = "success";
            $data["msg"] = "登录成功！！！！！";
        }
    }
echo json_encode($data,true);
?>