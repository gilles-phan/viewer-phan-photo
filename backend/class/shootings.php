<?php
    class Shooting {

        // Connection
        private $conn;

        // Table
        private $db_table = "shootings";

        // Columns
        public $id;
        public $uuid;        // generated uuid
        public $label;       //
        public $description; //
        public $image_path;  // path to the zip (http://gils.xyz/share/...)
        public $thumbnail;   // 
        public $date;        //
        public $tags;        //
        public $hidden;      // true | false
        public $type;        // portrait | sunday | presta | other
        public $nb_photos;   // nb photo finished / nb photo total

        // Db connection
        public function __construct($db) {
            $this->conn = $db;
        }

        /**
         * TODO à déplacer dans une classe utilitaire
         */
        public function uuidv4() {
            $data = random_bytes(16);

            $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
            $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
                
            return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
        }

        /**
         * Get the list of all shootings.
         */
        public function getShootings() {

            $sqlQuery = "SELECT * FROM " . $this->db_table . " ORDER BY `date`";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        /**
         * Add a new shooting.
         */
        /*public function addShooting() {

            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        uuid        = :uuid,
                        label       = :label,
                        description = :description,
                        image_path  = :image_path,
                        thumbnail   = :thumbnail,
                        date        = :date,
                        tags        = :tags,
                        hidden      = :hidden,
                        type        = :type,
                        nb_photos   = :nb_photos;
        
            $stmt = $this->conn->prepare($sqlQuery);

            $this->uuid        = htmlspecialchars(strip_tags($this->uuid));
            $this->label       = htmlspecialchars(strip_tags($this->label));
            $this->description = htmlspecialchars(strip_tags($this->description));
            $this->image_path  = htmlspecialchars(strip_tags($this->image_path));
            $this->image_path  = htmlspecialchars(strip_tags($this->image_path));
            $this->thumbnail   = htmlspecialchars(strip_tags($this->thumbnail));
            $this->date        = htmlspecialchars(strip_tags($this->date));
            $this->tags        = htmlspecialchars(strip_tags($this->tags));
            $this->hidden      = isset($this->hidden) ? htmlspecialchars(strip_tags($this->hidden)) : strip_tags("false");
            $this->type        = htmlspecialchars(strip_tags($this->type));
            $this->nb_photos   = isset($this->nb_photos) ? htmlspecialchars(strip_tags($this->nb_photos)) : 0;

            // bind data
            $stmt->bindParam(":uuid",        $this->uuid);
            $stmt->bindParam(":label",       $this->label);
            $stmt->bindParam(":description", $this->description);
            $stmt->bindParam(":image_path",  $this->image_path);
            $stmt->bindParam(":thumbnail",   $this->thumbnail);
            $stmt->bindParam(":date",        $this->date);
            $stmt->bindParam(":tags",        $this->tags);
            $stmt->bindParam(":hidden",      $this->hidden);
            $stmt->bindParam(":type",        $this->type);
            $stmt->bindParam(":nb_photos",   $this->nb_photos);
        
            if ($stmt->execute()) {
                return true;
            }
            return false;
        }*/

        /**
         * Update the shooting.
         *
         * @return <code>true</code> if the statement has been executed.
         */
        public function updateShooting() {

            $sqlQuery = "UPDATE ". $this->db_table ."
                    SET
                        model        = :model,
                        photographer = :photographer,
                        date         = :date,
                        delay        = :delay,
                        type         = :type,
                        nb_photos    = :nb_photos,
                        status       = :status,
                        location     = :location,
                        path         = :path
                    WHERE 
                        id = :id";

            $stmt = $this->conn->prepare($sqlQuery);

            $this->model        = htmlspecialchars(strip_tags($this->model));
            $this->photographer = htmlspecialchars(strip_tags($this->photographer));
            $this->date         = htmlspecialchars(strip_tags($this->date));
            $this->delay        = htmlspecialchars(strip_tags($this->delay));
            $this->type         = htmlspecialchars(strip_tags($this->type));
            $this->nb_photos    = htmlspecialchars(strip_tags($this->nb_photos));
            $this->status       = htmlspecialchars(strip_tags($this->status));
            $this->location     = htmlspecialchars(strip_tags($this->location));
            $this->path         = htmlspecialchars(strip_tags($this->path));
            $this->id           = htmlspecialchars(strip_tags($this->id));

            // bind data
            $stmt->bindParam(":model",        $this->model);
            $stmt->bindParam(":photographer", $this->photographer);
            $stmt->bindParam(":date",         $this->date);
            $stmt->bindParam(":delay",        $this->delay);
            $stmt->bindParam(":type",         $this->type);
            $stmt->bindParam(":nb_photos",    $this->nb_photos);
            $stmt->bindParam(":status",       $this->status);
            $stmt->bindParam(":location",     $this->location);
            $stmt->bindParam(":path",         $this->path);
            $stmt->bindParam(":id",           $this->id);

            if($stmt->execute()) {
               return true;
            }
            return false;
        }
    }
?>