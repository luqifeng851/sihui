<?php
# 通过type来区别数据库操作的类型：
# type = add  添加
# type = del  删除
# type = clear 清理
# type = update 更新
# type = get    获取

$db1 = mysqli_connect("127.0.0.1", "root", "", "aaa");
mysqli_set_charset($db1,"utf8");
$type = $_REQUEST["type"];
// $num = $_REQUEST["num"];
if($type == "add")
{
  $good_id = $_REQUEST["id"];

  /* 检查之前是否存在对应的数据，如果存在那么就修改num值，如果不存在那么就插入数据 */
  $sql = "SELECT * FROM buycar WHERE goodid = $good_id";
  $result = mysqli_query($db1,$sql);
  if(mysqli_num_rows($result) == 0)
  {
    /* 往数据库表中新增一条数据 */
    $sql = "INSERT INTO `buycar` ( `goodid`, `num`) VALUES ( $good_id, 1)";
  }else{
    /* 更新数据 */
    $sql = "UPDATE `buycar` SET `num`= `num`+ 1 WHERE `goodid`=$good_id";
  }
  $res = mysqli_query($db1,$sql);
  echo json_encode(array("status"=>"success"));
}elseif($type == "get"){
    $sql = "SELECT * FROM `buycar`";
    $result = mysqli_query($db1,$sql);
    $aaa=mysqli_fetch_all($result, MYSQLI_ASSOC);
    $data = array("status"=>"success","msg"=>"请求成功","data"=>$aaa);
    echo json_encode($data,true);
}
elseif($type == "update")
{
  $sign = $_REQUEST["flag"];
  $good_id = $_REQUEST["goodid"];

  if($sign == "right"){
    $plusSql = "UPDATE `buycar` SET `num`= `num`+ 1 WHERE `goodid`=$good_id";
    mysqli_query($db1,$plusSql);
  }elseif($sign == "left"){
    $reduceSql = "UPDATE `buycar` SET `num`= `num`- 1 WHERE `goodid`=$good_id";
    mysqli_query($db1,$reduceSql);
  }
  echo json_encode(array("status"=>"success"), true);
}elseif($type == "del")
{
  $good_id = $_REQUEST["goodid"];
  $delSql = "DELETE FROM `buycar` WHERE goodid = $good_id";
  mysqli_query($db1, $delSql);
  echo json_encode(array("status" => "success"), true);
}

#   清空操作 $removeSql = "TRUNCATE table `cart`";
#   删除操作 $delSql = "DELETE FROM `cart` WHERE good_id = $good_id";
?>