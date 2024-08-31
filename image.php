<?php
header('Content-Type: application/json');

// Dynamically determine the server's IP address or hostname
$server_ip = $_SERVER['SERVER_ADDR'] ?? 'localhost';
$baseURL = "http://$server_ip/demo/";

// Include the database connection file
include 'dbh.php';

// Function to fetch doctor image
function fetchDoctorImage($conn, $P_Id) {
    $sql = "SELECT image FROM loginp WHERE P_Id = :P_Id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Append base URL to image path if image exists
        if ($row['image']) {
            $row['image'] = $GLOBALS['baseURL'] . $row['image'];
            return ["status" => "success", "image" => $row['image']];
        } else {
            return ["status" => "error", "message" => "Image not found"];
        }
    } else {
        return ["status" => "error", "message" => "Doctor not found"];
    }
}

// Get the P_Id from the query parameters
if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];
    $response = fetchDoctorImage($conn, $P_Id);
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Doctor ID not provided"]);
}

$conn = null; // Close the PDO connection
?>
