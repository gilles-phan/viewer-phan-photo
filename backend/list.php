<?php
    /**
     * Usage : https://viewer.gils.xyz/images/list.php?path=2025/2025-02-09
     */
    header('Content-Type: application/json');

    // Récupère le chemin passé en paramètre (ou "./" par défaut)
    $dir = isset($_GET['path']) ? realpath($_GET['path']) : "./";

    // Vérifie si le chemin est valide et est bien un dossier
    if ($dir && is_dir($dir)) {
        $list = [];

        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if ($file !== "." && $file !== "..") {
                    $list[] = $file;
                }
            }
            closedir($dh);
        }

        echo json_encode(["status" => "success", "files" => $list]);
    } else {
        echo json_encode(["status" => "error", "message" => "Répertoire invalide"]);
    }
?>