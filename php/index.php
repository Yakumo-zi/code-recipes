<?php
function sendResponse($statusCode, $data) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
}
$request=$_SERVER['REQUEST_METHOD'];

sendResponse(200,$_SERVER)
// echo $request;
// foreach($_SERVER as$key=> $value){
//   echo '<p>';
//   echo $key.':'.$value;
//   echo '</p>';
// }
?>
