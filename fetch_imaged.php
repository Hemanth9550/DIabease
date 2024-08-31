<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Get the server IP address
$serverIP = $_SERVER['SERVER_ADDR'];

// Construct the base URL using the server IP address
$baseURL = "http://$serverIP/demo/";

// Get the doctorId from the request
$doctorId = isset($_GET['doctorId']) ? $_GET['doctorId'] : '';

if (empty($doctorId)) {
    // Invalid doctorId
    $response = array("status" => "error", "message" => "Invalid or missing doctorId parameter");
    echo json_encode($response);
    exit();
}

try {
    // Prepare SQL query to fetch data for the specified doctorId with concatenated image path
    $sql = "SELECT *, CONCAT(:baseURL, image) AS image_path FROM `logind` WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':baseURL', $baseURL, PDO::PARAM_STR);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Return data as JSON response
        echo json_encode(array("status" => "success", "image" => $result['image_path']));
    } else {
        // No data found
        $response = array("status" => "error", "message" => "No data found for the specified doctorId");
        echo json_encode($response);
    }
} catch (PDOException $e) {
    // Error handling
    $response = array("status" => "error", "message" => "Error: " . $e->getMessage());
    echo json_encode($response);
}

// Close connection
$conn = null;
?>
