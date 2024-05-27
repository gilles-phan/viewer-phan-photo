<?php 
    // source: https://www.positronx.io/create-simple-php-crud-rest-api-with-mysql-php-pdo/

    class Database {
        // LOCALHOST
        // private $host          = "localhost";
        // private $database_name = "dbs1481893";
        // private $username      = "root";
        // private $password      = "";
        // PROD
        private $host          = "db5015874596.hosting-data.io";
        private $database_name = "dbs12941720";
        private $username      = "dbu1332931";
        private $password      = "U9z8x9vSpTuornG";

        public $conn;

        /**
         * Get connection to database.
         */
        public function getConnection() {
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception) {
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }
    }
?>