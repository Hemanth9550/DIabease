<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include the database connection
include 'dbh.php';

// Get the doctorId from the POST request
$input = json_decode(file_get_contents('php://input'), true);
$doctorId = isset($input['doctorId']) ? $input['doctorId'] : null;

if (!$doctorId) {
    echo json_encode(["success" => false, "message" => "doctorId is required"]);
    exit();
}

// Prepare SQL statement
$sql = "SELECT id, doctorId, introduction, filename, video_url FROM videos WHERE doctorId = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare SQL statement"]);
    exit();
}

// Bind parameters
$stmt->bindParam(1, $doctorId, PDO::PARAM_STR);

// Execute SQL statement
if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to execute SQL statement"]);
    exit();
}

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Determine the server's IP address or hostname
$server_ip = $_SERVER['SERVER_ADDR'] ?? 'localhost';
$base_url = 'http://' . $server_ip . '/demo/uploads/';

// Check if there are any results
if ($result) {
    $videos = [];
    foreach ($result as $row) {
        $file_extension = pathinfo($row['filename'], PATHINFO_EXTENSION);
        if (in_array($file_extension, ['mp4', 'jpg'])) {
            // Build the video URL
            $video_url = $base_url . $row['filename'];
            
            // Check if the video URL is accessible
            $headers = @get_headers($video_url);
            if ($headers === false || strpos($headers[0], '403') !== false) {
                // If access is forbidden, provide an error message
                echo json_encode(["success" => false, "message" => "Video loading error: Access to video {$row['filename']} is forbidden (403)"]);
                exit();
            }
            // Add video path to the row
            $row['video_path'] = $video_url;
            $videos[] = $row;
        }
    }
    // Return the list of videos as JSON
    echo json_encode(["success" => true, "data" => $videos]);
} else {
    // No videos found
    echo json_encode(["success" => false, "message" => "No videos found"]);
}

// Close the connection
$conn = null;

?>
