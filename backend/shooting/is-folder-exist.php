<?php
  /**
   * TODO à supprimer ou à coder
   */
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  $path = isset($_GET["path"]) ? $_GET["path"] : die();

  if (strpos($path, "..") !== false) {
    echo "{'Error': 'Incorrect caracter in param.'}";
    die();
  }
  $baseUrl = "./../../../gils.xyz/shares/";

  if(file_exists($baseUrl . $path)) {
    echo "true";
  } else {
    echo "false";
  }
?>