var myadmin = {}; 


myadmin.nav = function() {
  var changeElementBehaviour = function () {
    $('.headform select').change(function() {
        $(".headform select option:selected").each(function () {
          //alert($(this).val());
            $(this).val() != "" ? location.href = $(this).val() : "";
            
        });
    })
  }
  var defaultElementBehaviour = function () {

    $(".headform select option[value='"+window.location.pathname+"']").attr("selected", true);

  }
  return { 
    init : function () {
      
      defaultElementBehaviour();
      changeElementBehaviour();
    }  
  }
}();


$(document).ready(function() {
  myadmin.nav.init();
 // myadmin.cat.init();
});