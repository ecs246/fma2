/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
myadmin.map = function() {

google.maps.Map.prototype.markers = new Array();

google.maps.Map.prototype.addMarker = function(marker) {
    this.markers[this.markers.length] = marker;
};

google.maps.Map.prototype.getMarkers = function() {
    return this.markers
};

google.maps.Map.prototype.clearMarkers = function() {

    for(var i=0; i<this.markers.length; i++){
 
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};

  
  return {
    init:function() {
	    var longObj = $("#vendor_longitude");
	     var latObj = $("#vendor_latitude");
	     var deflatlngObj = null;
	     var zoom =10;
	     if (jQuery.trim(longObj.val() + latObj.val()) != "")  {
		  	
	          deflatlngObj = new google.maps.LatLng(latObj.val(),longObj.val());
		  zoom = 16;
	     } else {
	           deflatlngObj =  new google.maps.LatLng(40.7834345,-73.9662495);
	     }
	 
	    var myOptions = { 
	      zoom: zoom, 
	      center: deflatlngObj, 
	      mapTypeId: google.maps.MapTypeId.ROADMAP 
	    }; 
	    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
	    var marker = new google.maps.Marker({
              map: map, 
              position: deflatlngObj
          });	
	
	   var geocoder = null;		
	   $("#poplatlong").click(function() {
		var address = $("#vendor_address").val();
		geocoder = new google.maps.Geocoder(); 
		    if (geocoder) { 
		      geocoder.geocode( { 'address': address}, function(results, status) { 
			if (status == google.maps.GeocoderStatus.OK) { 

			  if (jQuery.trim(longObj.val() + latObj.val()) != "") 	{
				var ans = confirm("Are you sure you want to replace the following values? \n latitude:" + latObj.val() + "\n longitude:" + longObj.val());
				if (!ans) {
					return; 
				}
				
			  }	
			  latLngObj = results[0].geometry.location;	
			  longObj.val(latLngObj.lng());
			  latObj.val(latLngObj.lat());
			  
			  marker.setMap(null);
			  map.setZoom(16);
			  map.setCenter(latLngObj);
			  marker = new google.maps.Marker({
              map: map, 
              position: latLngObj
          });
			} else { 
			  alert("Geocode was not successful for the following reason: " + status); 
			} 
		      }); 
		    } 

	   })
		return;
      
    }
      
  }

}()


$(document).ready(function() {
  myadmin.map.init();
 // myadmin.cat.init();
});