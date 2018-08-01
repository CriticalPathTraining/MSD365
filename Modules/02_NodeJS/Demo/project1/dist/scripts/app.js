

$( function(){

console.log("App code is now running");

  $("#response").text("Hello world with jQuery");

  $("#Command1").click(function(){
    $("#response").text("Command 1");
  });

  $("#Command2").click(function(){
    $("#response").text("Command 2");
  });

});
