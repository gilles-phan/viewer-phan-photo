<?php
    class User {

        // Connection
        private $conn;

        // Table
        private $db_table = "User";

        // Columns
        public $id;
        public $email;
        public $password;
        public $role;

        // Db connection
        public function __construct($db) {
            $this->conn = $db;
        }

        /**
         * Generate a prepared statment to check the Login/Password.
         */
        public function checkLogin() {

            $sqlQuery = "SELECT * FROM " . $this->db_table . " WHERE email = ? AND password = ? LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->email);
            $stmt->bindParam(2, $this->password);
            $stmt->execute();

            $dataRow     = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id    = $dataRow['id'];
            $this->email = $dataRow['email'];
            $this->role  = $dataRow['role'];
        }

    }
?>