<?php

  /**
   * TODO à supprimer ou à coder.
   */
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  include_once '../config/database.php';
  include_once '../class/shooting.php';
  include_once '../class/token.php';

  $database = new Database();
  $db = $database->getConnection();

  $token = new Token($db);

  $paramPath = isset($_GET["path"]) ? $_GET["path"] : die();

  if (strpos($paramPath, "..") !== false) {
    echo "{'Error': 'Incorrect caracter in param.'}";
    die();
  }

  $isTokenValid = $token->isTokenValid($_SERVER);
  echo "coucou";
  if($isTokenValid && $paramPath) {
    http_response_code(200);
    echo "1";
    $baseUrl = "./../../../gils.xyz/shares/";
    echo "2";
    mkdir($baseUrl . $paramPath);
    echo "3";
    echo json_encode(array("message" => "Success!"));
  } else if (!$isTokenValid) {
    http_response_code(500);
    echo json_encode(array("message" => "Invalid token!"));
  } else {
    http_response_code(500);
    $result = array(
      "error" =>   "Folder '" . $paramPath . "' could not be created",
      "description" => "-"
    );
    echo json_encode($result);
  }
?>