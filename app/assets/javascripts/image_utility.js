myadmin.imageUtility = function () {
    var handleSubmit = function() {
    $('.image-utility-form')
    .bind("ajax:beforeSend", function(evt, xhr, settings){


    })
    .bind("ajax:success",function(evt,data,status,xhr) {
    
    })
    .bind('ajax:complete', function(evt, xhr, status){
      
      alert("Congrats. Successfully submitted")
    })
    .bind("ajax:error", function(evt, xhr, status, error){
        alert("There was an error with the submit");
    });
    
  }
  return {
      init : function() {
          handleSubmit();
        }
    }
}()


$(document).ready(function() {
  
  
  myadmin.imageUtility.init();
});
