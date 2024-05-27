<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $paramPath = isset($_GET["path"]) ? $_GET["path"] : die();

    if (strpos($paramPath, "..") !== false) {
        echo "{'Error': 'Incorrect caracter in param.'}";
        die();
    }
    $baseUrl = "./../../../gils.xyz/shares/";

    $files = scandir($baseUrl . $paramPath);
    if ($files) {
        array_shift($files);
        array_shift($files);
        echo json_encode($files);
    } else {
        echo "[]";
    }
?>