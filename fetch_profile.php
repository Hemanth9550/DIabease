<?php
header('Content-Type: application/json');

// Include the PDO connection file
include 'dbh.php';

// Dynamically fetch the server IP address
$serverIp = $_SERVER['SERVER_ADDR'];

// Base URL for image display
$baseURL = "http://$serverIp/demo/";

// Function to fetch doctor details
function fetchDoctorDetails($conn, $P_Id, $baseURL) {
    $sql = "SELECT name, mob, gender, age, occupation, address, image FROM loginp WHERE P_Id = :P_Id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Append base URL to image path if image exists
        if ($row['image']) {
            $row['image'] = $baseURL . $row['image'];
        }
        return $row;
    } else {
        return null;
    }
}

// Get the P_Id from the query parameters
if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];
    $doctorDetails = fetchDoctorDetails($conn, $P_Id, $baseURL);

    if ($doctorDetails) {
        echo json_encode($doctorDetails);
    } else {
        echo json_encode(["error" => "Doctor not found"]);
    }
} else {
    echo json_encode(["error" => "Doctor ID not provided"]);
}

// Close the connection
$conn = null;
?>
