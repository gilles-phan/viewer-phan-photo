<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../class/user.php';
    include_once '../class/token.php';

    $database = new Database();
    $db = $database->getConnection();

    $user  = new User($db);
    $token = new Token($db);

    $user->email    = isset($_GET['email'])    ? $_GET['email']    : die();
    $user->password = isset($_GET['password']) ? $_GET['password'] : die();
  
    $user->checkLogin();

    $generatedToken = $token->generateToken($user->email, $user->role);
    if ($user->id != null && $generatedToken) {
        // auth success
        $emp_arr = array(
            "email" => $user->email,
            "role"  => $user->role,
            "token" => $generatedToken
        );
      
        http_response_code(200);
        echo json_encode($emp_arr);
    } else if (!$generatedToken) {
        $emp_arr = array(
            "code"    => "TOKEN_NOT_GENERATED",
            "message" => "Token has not been generated."
        );
        http_response_code(500);
        echo json_encode($emp_arr);
    } else {
        $emp_arr = array(
            "code"    => "BAD_LOGIN",
            "message" => "Incorrect Email / Password."
        );
        http_response_code(500);
        echo json_encode($emp_arr);
    }
?>