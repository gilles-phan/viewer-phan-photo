<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    
    include_once '../config/database.php';
    include_once '../class/shootings.php';
    include_once '../class/tags.php';

    $database = new Database();
    $db       = $database->getConnection();

    $item      = new Shooting($db);
    $stmt      = $item->getShootings();
    $itemCount = $stmt->rowCount();

    $itemTags     = new Tag($db);
    $stmtTags     = $itemTags->getTags();
    $itemCountTag = $stmtTags->rowCount();

    if ($itemCount > 0) {
        $shootings = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            // TODO gérer le mapping avec les tags
            /*
                SELECT * FROM shootings
                    INNER JOIN shootings_tags st ON (st.shooting_id = shootings.id)
                    INNER JOIN tags t ON (st.tag_id = t.id);
            */

            $shooting = array(
                "id"          => $id,
                "uuid"        => $uuid,
                "label"       => $label,
                "description" => $description,
                "image_path"  => $image_path,
                "date"        => $date,
                "hidden"      => $hidden,
                "tags"        => -1,
                "type"        => $type,
                "nb_photos"   => $nb_photos
            );
            array_push($shootings, $shooting);
        }
        http_response_code(200);
        echo json_encode($shootings);
    } else {
        $result = array(
            "error" =>   "NOT_FOUND",
            "message" => "No shoot found."
        );
        http_response_code(500);
        echo json_encode($result);
    }
    
?>