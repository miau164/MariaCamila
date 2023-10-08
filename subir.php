<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["imagen"])) {
        $base64Data = $_POST["imagen"];
        $data       = explode(',', $base64Data);
        $imageData  = base64_decode($data[1]);

        // Guardar la imagen en el servidor (por ejemplo, con un nombre único)
        $nombreArchivo = 'img/' . uniqid() . '.png';
        file_put_contents($nombreArchivo, $imageData);

        echo $nombreArchivo;
    } else {
        echo "Error";
    }
}
