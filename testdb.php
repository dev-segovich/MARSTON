<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=zero9111_form_submissions_db", "zero9111_jesusrey", "TU_PASSWORD");
    echo "✅ Conexión exitosa.";
} catch (PDOException $e) {
    echo "❌ Error en la conexión: " . $e->getMessage();
}
?>
