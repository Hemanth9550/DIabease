<?php
// Include the database connection file
require 'dbh.php';

// Set content type to JSON
header('Content-Type: application/json');

// Retrieve JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Check if filename is provided
if (isset($input['filename'])) {
    $filename = $input['filename'];

    try {
        // Prepare SQL statement
        $sql = "DELETE FROM videos WHERE filename = :filename";
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':filename', $filename);

        // Execute the statement
        $stmt->execute();

        // Check if a row was deleted
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Video deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No video found with the provided filename']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Execution failed: ' . $e->getMessage()]);
    }

    // Close the database connection
    $conn = null;
} else {
    echo json_encode(['success' => false, 'message' => 'Filename not provided']);
}
?>
