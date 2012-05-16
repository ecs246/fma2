
myadmin.gallery = function () {
  var $selectedImages,$imageResults  = null;

  var handleSearch = function () {
    $('input[type=button][value=Search]').click(function() {
    
      var search = $('input[name=image_search]').attr('value')
            $.ajax({
                type: 'GET',
                url: '/admin/images',
                dataType: 'json',
                data:{search:search} ,
                success: function(data) {
                  $imageResults.empty();
                  $(data).each(function(index,item) {
                      
                      $imageResults.append('<li><img src="'+item.image.thumbnail+'">'+item.image.name+'\
<div class="id hidden">'+item.image.id+'</div>  </li>')
                    })
                    handleImageSelect();
                }
              });      
        
        
        
      })
  }
  var handleSubmit = function () {
      $('.edit_vendor').submit(function() {
          var count = 0;
          $('input[name*=rank]').each(function(index,el) {
              $(el).attr('value',count)
              count ++;
            });
          return true;
        }
      )  
    }
  var handleDelete = function () {
      $selectedImages.on('click','.image-delete',function(event) {
          event.preventDefault();
          $(this).closest("li").find('input[name*=_destroy]').attr("value",1)
          $(this).closest("li").hide();
          
          if ($selectedImages.find("li").size() == 0) {
            $selectedImages.append('<li class="default">Drop Images Here</li>');
          }
        });
    }
  var handleImageSelect = function () {
     $('#image-results li').draggable( {
         connectToSortable:"#selected-images",
         helper:'clone',
         revert: "invalid"

         })         
      $selectedImages.droppable({ hoverClass: "drophover" });
        $selectedImages.sortable({
            receive: function(event,ui) {
              var $currItem = $(this).data().sortable.currentItem
              var id = $currItem.find('.id').text();
              var selected = $(this);
                
              $.ajax({
                type: 'GET',
                url: '/admin/related_images/show_form_item/'+id,
                dataType: 'html',
                beforeSend: function() {
                  $('<div></div>')
                   .attr('class', 'spinner')
                    .hide()
                    .appendTo($('#selected-div'))
                    .fadeTo('slow', 0.6);
                },
                success: function(data) {
                  $currItem.replaceWith(data);
                },
                complete: function() {
                    
                  $('.spinner').fadeOut('slow', function() {
                    $(this).remove();
                  });
                  $('li.default').remove();
                 }
              });                           
            }  
          })
          //.disableSelection();             
    }
    
    

  return {
      init: function() {
       $selectedImages = $('#selected-images'); 
       $imageResults = $('#image-results');
       handleSearch();
       handleImageSelect();
       handleDelete();  
       handleSubmit();
       } 
 
    }
}()


$(document).ready(function() {
  
  
  myadmin.gallery.init();
});
