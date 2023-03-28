<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/hardware_pos_system/util/path_config/LinkGenerator.php";
require_once LinkGenerator::getFilePath("expenses_db_works");

if(isset($_POST["description"]) && isset($_POST["category"])){
    $description = $_POST["description"];
   
    $category = $_POST["category"];
    if(!Util::isInputsEmpty(array($description,$category))){
    
        
    }else{
        echo "input is empyt";
    }
    
}
?>