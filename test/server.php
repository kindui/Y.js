<?php
/**
 * Author: humanhuang
 * Date: 13-8-19
 */


//echo json_encode(array("a" => "nima"));

$cb = $_REQUEST['callback'];
$data = json_encode(array("a" => 1));

echo "$cb" . "(" . $data . ")";