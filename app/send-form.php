<?php
if(isset($_GET['email'])) {
     

    $email_to = "admin@furuholm.com";
     
    $email_subject = "Portfolio submitions";
     
    
    function died($error) {
      $error = array("message"=>$error, "code"=>400);
       echo(json_encode($error));
        die();
    }
     
    if (!isset($_SESSION)) {
      session_start();
    }

    if($_SESSION["form"]){
      if($_SESSION["form"]["email"] === $_GET['email'] &&
         $_SESSION["form"]["name"] === $_GET['name'] &&
         $_SESSION["form"]["comment"] === $_GET['comments']){
       died("Same as last message");
      }
     }else{
      $_SESSION["form"]["email"] = $_GET['email'];
      $_SESSION["form"]["name"] = $_GET['name'];
      $_SESSION["form"]["comment"] = $_GET['comments'];
     }

     


    // validation expected data exists
    if(!isset($_GET['name']) ||
        !isset($_GET['email']) ||
        !isset($_GET['comments'])) {
        died('I\'m sorry, but there appears to be a problem with the form you submitted.');       
    }
     
    $name = $_GET['name']; // required
    $email_from = $_GET['email']; // required
    $comments = $_GET['comments']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
    $string_exp = "/^[A-ZÅÄÖa-zåäö .'-]+$/";
  /*if(!preg_match($string_exp,$name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }*/
  if(strlen($comments) < 2) {
    $error_message .= 'The Comment you entered do not appear to be valid.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
  $email_message = "Form details below.\n\n";
   
  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }
   
  $email_message .= "Name: ".clean_string($name)."\n";
  $email_message .= "Email: ".clean_string($email_from)."\n";
  $email_message .= "Comments: ".clean_string($comments)."\n";
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  

// <!-- PHP success html -->

$message = array("message"=>"Thank you for contacting me! I will be in touch with you very soon.", "code"=>200);
echo(json_encode($message));
  
// var_dump($_GET);
// var_dump($_SESSION);
}
die();
?>