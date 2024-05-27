<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    class Token {

        // Connection
        private $conn;

        // Secret key
        // TODO: this key should be stored in another file
        private $KEY = "Mys3cretKey! Houhou...";

        // Db connection
        public function __construct($db) {
            $this->conn = $db;
        }

        /**
         * Get access token from header.
         *
         * @param $p_server The $_SERVER object.
         * @return The token.
         **/
        public function getBearerToken($p_server) {

            $headers = $this->getAuthorizationHeader($p_server);
            // HEADER: Get the access token from the header
            if (!empty($headers)) {
                if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                    return $matches[1];
                }
            }
            return null;
        }

        /**
         * Check if the token is valid
         *
         * @param $p_server The $_SERVER object.
         * @return <code>true</code> if the token if valid.
         */
        public function isTokenValid($p_server) {

            $token = str_replace("Bearer ", "", $p_server['REDIRECT_HTTP_AUTHORIZATION']);
            
            $header    = explode(".", $token)[0];
            $payload   = explode(".", $token)[1];
            $signature = explode(".", $token)[2];

            $isExpDateValid = time() < json_decode(base64_decode($payload))->exp;
            $isSignatureCorrect = $signature == $this->getSignature($header, $payload);

            return ($isExpDateValid && $isSignatureCorrect);
        }

        /**
         * Generate a token from email and role.
         *
         * @param $p_email The user email.
         * @param $p_role The user role.
         * @return The token.
         */
        public function generateToken($p_email, $p_role) {

            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

            $today = time();
            $payload = json_encode([
                'iss'   => 'www.wamp.gilles-phan.fr',
                'iat'   => $today,
                'exp'   => $today + (3 * 24 * 60 * 60),
                'aud'   => 'www.wamp.gilles-phan.fr',
                'sub'   => 'ionos server',
                'email' => $p_email,
                'role'  => $p_role,
            ]);
            $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
            
            $base64UrlSignature = $this->getSignature($base64UrlHeader, $base64UrlPayload);

            return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        }

        /**
         * Calculate the signature from header and payload.
         *
         * @param $p_base64Header The header.
         * @param $p_base64Payload The payload.
         * @return The signature.
         */
        private function getSignature($p_base64Header, $p_base64Payload) {

            $signature = hash_hmac('sha256', $p_base64Header . "." . $p_base64Payload, $KEY, true);
            return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        }


        /** 
         * Get header Authorization
         *
         * @param $p_server the $_SERVER object.
         * @return The header.
         **/
        private function getAuthorizationHeader($p_server) {

            $headers = null;
            if (isset($p_server['Authorization'])) {
                $headers = trim($p_server["Authorization"]);
            }
            else if (isset($p_server['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
                $headers = trim($p_server["HTTP_AUTHORIZATION"]);
            } elseif (function_exists('apache_request_headers')) {
                $requestHeaders = apache_request_headers();
                // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
                $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
                //print_r($requestHeaders);
                if (isset($requestHeaders['Authorization'])) {
                    $headers = trim($requestHeaders['Authorization']);
                }
            }
            return $headers;
        }
    }
?>