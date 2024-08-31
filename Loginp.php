<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection file
require "dbh.php";

// Initialize response array
$response = array();

try {
    // Get the raw POST data as a string
    $json_data = file_get_contents("php://input");

    // Decode the JSON data into an associative array
    $request_data = json_decode($json_data, true);

    // Check if 'id' and 'password' keys exist in $request_data
    if (isset($request_data['id']) && isset($request_data['password'])) {
        // Get the id and password from the decoded JSON data
        $id = $request_data['id'];
        $password = $request_data['password'];

        // Query to check login credentials using prepared statements
        $sql = "SELECT id, name, P_Id, mail, doctorId, age, mob, occupation FROM loginp WHERE id = :id AND password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $response['status'] = "success";
            $response['message'] = "Login successful!";
            $response['id'] = $result['id'];
            $response['name'] = $result['name'];
            $response['P_Id'] = $result['P_Id'];
            $response['mail'] = $result['mail'];
            $response['doctorId'] = $result['doctorId'];
            $response['age'] = $result['age'];
            $response['mob'] = $result['mob'];
            $response['occupation'] = $result['occupation'];
        } else {
            $response['status'] = "error";
            $response['message'] = "Invalid id or password";
        }
    } else {
        // Handle the case where 'id' or 'password' is missing
        $response['status'] = "error";
        $response['message'] = "Invalid request data";
    }
} catch (Exception $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Respond with JSON
echo json_encode($response);
?>
