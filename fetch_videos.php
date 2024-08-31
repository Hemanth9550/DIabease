<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include the database connection file
require 'dbh.php';

// Get the IP address from the server
$serverIpAddress = $_SERVER['SERVER_ADDR'];

// Get the doctorId from the POST request
$input = json_decode(file_get_contents('php://input'), true);
$doctorId = isset($input['doctorId']) ? $input['doctorId'] : null;

if (!$doctorId) {
    echo json_encode(["success" => false, "message" => "doctorId is required"]);
    exit();
}

try {
    // Prepare SQL statement
    $sql = "SELECT id, doctorId, introduction, filename, video_url FROM videos WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':doctorId', $doctorId);
    
    // Execute SQL statement
    $stmt->execute();
    
    // Fetch results
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($videos) > 0) {
        foreach ($videos as &$row) {
            $file_extension = pathinfo($row['filename'], PATHINFO_EXTENSION);
            if (in_array($file_extension, ['mp4', 'jpg'])) {
                // Build the video URL
                $video_url = 'http://' . $serverIpAddress . '/demo/uploads/' . $row['filename'];
                
                // Check if the video URL is accessible
                $headers = get_headers($video_url);
                if (strpos($headers[0], '403') !== false) {
                    // If access is forbidden, provide an error message
                    echo json_encode(["success" => false, "message" => "Video loading error: Access to video {$row['filename']} is forbidden (403)"]);
                    exit();
                }
                // Add video path to the row
                $row['video_path'] = $video_url;
            }
        }
        // Return the list of videos as JSON
        echo json_encode(["success" => true, "data" => $videos]);
    } else {
        // No videos found
        echo json_encode(["success" => false, "message" => "No videos found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

// Close the database connection
$conn = null;

?>
