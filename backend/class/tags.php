<?php
    class Tag {

        // Connection
        private $conn;

        // Table
        private $db_table = "tags";

        // Columns
        public $id;
        public $label;

        // Db connection
        public function __construct($db) {
            $this->conn = $db;
        }

        /**
         * Get the list of all shootings.
         */
        public function getTags() {

            $sqlQuery = "SELECT * FROM " . $this->db_table;
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // /**
        //  * Add a new shooting.
        //  */
        // public function addShooting() {

        //     $sqlQuery = "INSERT INTO
        //                 ". $this->db_table ."
        //             SET
        //                 model        = :model,
        //                 photographer = :photographer,
        //                 date         = :date,
        //                 delay        = :delay,
        //                 type         = :type,
        //                 nb_photos    = :nb_photos,
        //                 status       = :status,
        //                 location     = :location,
        //                 path         = :path";
        
        //     $stmt = $this->conn->prepare($sqlQuery);

        //     $this->model        = htmlspecialchars(strip_tags($this->model));
        //     $this->photographer = htmlspecialchars(strip_tags($this->photographer));
        //     $this->date         = htmlspecialchars(strip_tags($this->date));
        //     $this->delay        = htmlspecialchars(strip_tags($this->delay));
        //     $this->type         = htmlspecialchars(strip_tags($this->type));
        //     $this->nb_photos    = isset($this->nb_photos) ? htmlspecialchars(strip_tags($this->nb_photos)) : NULL;
        //     $this->status       = htmlspecialchars(strip_tags($this->status));
        //     $this->location     = isset($this->location)  ? htmlspecialchars(strip_tags($this->location))  : NULL;
        //     $this->path         = isset($this->path)      ? htmlspecialchars(strip_tags($this->path))      : NULL;

        //     // bind data
        //     $stmt->bindParam(":model",        $this->model);
        //     $stmt->bindParam(":photographer", $this->photographer);
        //     $stmt->bindParam(":date",         $this->date);
        //     $stmt->bindParam(":delay",        $this->delay);
        //     $stmt->bindParam(":type",         $this->type);
        //     $stmt->bindParam(":nb_photos",    $this->nb_photos);
        //     $stmt->bindParam(":status",       $this->status);
        //     $stmt->bindParam(":location",     $this->location);
        //     $stmt->bindParam(":path",         $this->path);
        
        //     if ($stmt->execute()) {
        //         return true;
        //     }
        //     return false;
        // }

        // /**
        //  * Update the shooting.
        //  *
        //  * @return <code>true</code> if the statement has been executed.
        //  */
        // public function updateShooting() {

        //     $sqlQuery = "UPDATE ". $this->db_table ."
        //             SET
        //                 model        = :model,
        //                 photographer = :photographer,
        //                 date         = :date,
        //                 delay        = :delay,
        //                 type         = :type,
        //                 nb_photos    = :nb_photos,
        //                 status       = :status,
        //                 location     = :location,
        //                 path         = :path
        //             WHERE 
        //                 id = :id";

        //     $stmt = $this->conn->prepare($sqlQuery);

        //     $this->model        = htmlspecialchars(strip_tags($this->model));
        //     $this->photographer = htmlspecialchars(strip_tags($this->photographer));
        //     $this->date         = htmlspecialchars(strip_tags($this->date));
        //     $this->delay        = htmlspecialchars(strip_tags($this->delay));
        //     $this->type         = htmlspecialchars(strip_tags($this->type));
        //     $this->nb_photos    = htmlspecialchars(strip_tags($this->nb_photos));
        //     $this->status       = htmlspecialchars(strip_tags($this->status));
        //     $this->location     = htmlspecialchars(strip_tags($this->location));
        //     $this->path         = htmlspecialchars(strip_tags($this->path));
        //     $this->id           = htmlspecialchars(strip_tags($this->id));

        //     // bind data
        //     $stmt->bindParam(":model",        $this->model);
        //     $stmt->bindParam(":photographer", $this->photographer);
        //     $stmt->bindParam(":date",         $this->date);
        //     $stmt->bindParam(":delay",        $this->delay);
        //     $stmt->bindParam(":type",         $this->type);
        //     $stmt->bindParam(":nb_photos",    $this->nb_photos);
        //     $stmt->bindParam(":status",       $this->status);
        //     $stmt->bindParam(":location",     $this->location);
        //     $stmt->bindParam(":path",         $this->path);
        //     $stmt->bindParam(":id",           $this->id);

        //     if($stmt->execute()) {
        //        return true;
        //     }
        //     return false;
        // }
    }
?>