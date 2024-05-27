<?php

    /**
     * TODO à coder.
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

    $item  = new Shooting($db);
    $token = new Token($db);

    $data = json_decode(file_get_contents("php://input"));

    // shooting values
    $item->model        = $data->model;
    $item->photographer = $data->photographer;
    $item->date         = $data->date;
    $item->delay        = $data->delay;
    $item->type         = $data->type;
    $item->nb_photos    = $data->nb_photos;
    $item->status       = $data->status;
    $item->location     = $data->location;
    $item->path         = $data->path;
    $isTokenValid = $token->isTokenValid($_SERVER);

    if($isTokenValid && $item->addShooting()) {
        http_response_code(200);
        $result = array(
            "code"    => "SUCCESS",
            "message" => "Shooting created."
        );
        echo json_encode($result);
    } else if (!$isTokenValid) {
        http_response_code(500);
        echo json_encode(array("message" => "Invalid token!"));
    } else {
        http_response_code(500);
        $result = array(
            "error" =>   "Shooting could not be created",
            "description" => "-"
        );
        echo json_encode($result);
    }
?>