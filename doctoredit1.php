<?php
header('Content-Type: application/json');

// Include the database connection file
require "dbh.php";

// Function to fetch doctor details
function fetchDoctorDetails($conn, $doctorId) {
    $sql = "SELECT doctorname, phoneno, email, gender, age, experience, specialization, image FROM logind WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Append base URL to image path if image exists
        if ($result['image']) {
            // Dynamic base URL
            $result['image'] = $GLOBALS['baseURL'] . $result['image'];
        }
        return $result;
    } else {
        return null;
    }
}

// Get the base URL dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . "://" . $host . "/demo/";

// Initialize response array
$response = [];

// Get the doctorId from the query parameters
if (isset($_GET['doctorId'])) {
    $doctorId = $_GET['doctorId'];
    $doctorDetails = fetchDoctorDetails($conn, $doctorId);

    if ($doctorDetails) {
        $response = $doctorDetails;
    } else {
        $response = ["error" => "Doctor not found"];
    }
} else {
    $response = ["error" => "Doctor ID not provided"];
}

// Add server IP address to response
if (isset($_SERVER['SERVER_ADDR'])) {
    $server_ip = $_SERVER['SERVER_ADDR'];
} else {
    $server_ip = 'IP address not available'; // Fallback if SERVER_ADDR is not set
}
$response['server_ip'] = $server_ip;

// Return response as JSON
echo json_encode($response);

// Close connection
$conn = null;
?>
