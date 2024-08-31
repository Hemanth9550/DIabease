<?php
// Database configuration
$servername = "localhost"; // Replace with your DB host
$username = "username"; // Replace with your DB username
$password = "password"; // Replace with your DB password
$dbname = "diabetes"; // Replace with your DB name

// Create connection
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
// Set PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Check if P_Id is provided in the POST request
if (isset($_POST['P_Id'])) {
    $P_Id = $_POST['P_Id'];

    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("SELECT date, beforefood, afterfood FROM sugarlevel WHERE P_Id = :P_Id");
        $stmt->bindParam(':P_Id', $P_Id);
        $stmt->execute();

        // Fetch all rows as associative array
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if there are results
        if (count($result) > 0) {
            // Return JSON response
            echo json_encode($result);
        } else {
            // Return empty array if no results found
            echo json_encode([]);
        }
    } catch (PDOException $e) {
        // Return error message on exception
        echo "Error: " . $e->getMessage();
    }
} else {
    // Return error if P_Id is not provided
    echo "Error: P_Id parameter is missing.";
}

// Close connection
$conn = null;
?>
