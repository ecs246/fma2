myadmin.selectCat = function () {

  var handleAddCategory = function () {
   $('#available-categories').on('click','.add-category',function(event) {
     
     event.preventDefault() 
     $item = $(this).closest('li');
     val = $item.find('.hidden-value').text();
     if ($('#selected-categories').find('input[value='+ val +']').length == 0) {
      
      $('#selected-categories').append($item.clone().find('a').attr('class','remove-category')
      .text('remove').end().append($('<input type="hidden" name="vendor[category_ids][]">').attr('value',val)))
     } else {
       alert("Already Selected");
     }
 
    })
  }  
  
  var handleRemoveCategory = function () {
   $('#selected-categories').on('click','.remove-category',function(event) {
     
     event.preventDefault() 
     $(this).closest('li').remove();

 
    })
  } 
  
  
  return {
    init : function() {
      
      
      handleAddCategory();
      handleRemoveCategory();
    }
  }
}()///

myadmin.cat=function() {


  var handleItemOver = function() {
    
    $('#map').on('hover','.cell-name',function(event) {
      var $actionDiv = $(this).find('.item-action:first')
      if (event.type == 'mouseenter') {
        $actionDiv.css('visibility','visible')
      } else {
        $actionDiv.css('visibility','hidden')  
      }
    })
  }

  var resetIndex = function() {
     var $indexForm = $('#index-form')
    $indexForm.find('.inline-edit').each(function(index,element) {
      $(element).remove()
    })
    $indexForm.find('tr:hidden').each(function(index,element) {
      $(element).show()
      })
  }

   var handleQuickCancel = function(formRow) {

      formRow.find('input[type=button][value=Cancel]').click(function(){
        
      resetIndex();
    })
   }
   var handleQuickSubmit = function(formRow,catItem) {

      formRow.find('input[type=button][value=Submit]').click(function(){
        id = formRow.attr('id').split('-')[1]
        var url = '/admin/categories/' + id + ".json"


        cname = formRow.find('input[name=category_name]').attr('value')
        sd = formRow.find('input[name=category_short_description]').attr('value')
        //data[$('meta[name=csrf-param]').attr('content')] = $('meta[name=csrf-token]').attr('content')



        $.ajax({
          type: 'POST',
          url: url,
          data: {_method:'PUT',category:{short_description:sd,name:cname}},
          success: function(data) {
            resetIndex();
            html = data.html
            catItem.replaceWith(html);
            },
          dataType: 'json'
        });

      })

   }  
   var createQuickForm = function($catItem) {
    $catItem.hide()
     var $quickForm = $('#quick-edit-form tr')
    id = 'edit-' + $catItem.find('.data .id').text()
    name = $catItem.find('.data .name').text()
    shortDescription = $catItem.find('.data .short-description').text()
    $qclone = $quickForm.clone().attr('id',id);
    $qclone.insertAfter($catItem);
    handleQuickCancel($qclone)
    
    $qclone.find('input[name=category_name]').attr('value',name)
    $qclone.find('input[name=category_short_description]').attr('value',shortDescription)
    handleQuickSubmit($qclone,$catItem)
    return $qclone
   }


  var handleQuickEditClick = function() {

    
    $('#map').on('click','.quick-edit',function(event) {
      event.preventDefault() 

      resetIndex();
      $catItem = $(this).closest('.cat-item')
      $form = createQuickForm($catItem)  
      
    })
  }  
  
  var handleSubmit = function() {
    $('#create_category_form')
    .bind("ajax:beforeSend", function(evt, xhr, settings){
      var $submitButton = $(this).find('input[name="commit"]');

      // Update the text of the submit button to let the user know stuff is happening.
      // But first, store the original text of the submit button, so it can be restored when the request is finished.
      $submitButton.data( 'origText',$submitButton.attr('value') );

      
      $submitButton.attr('value',"Submitting..." );
      $submitButton.attr('disabled',true );

    })
    .bind("ajax:success",function(evt,data,status,xhr) {
      id = data.category.id; 
      name = data.category.name;
      html = data.html;
      level = data.level;
      if (isNaN(id)) {
        alert("Problem with id");
      } else {
        popt = $('#category_parent_id option:selected')
        $(html).insertAfter($('#map').find('tr#tag-' + popt.attr('value')))
        $('<option></option>').html(Array(level+1).join('-')+name).attr('value',id).insertAfter(popt)
      }

    })
    .bind('ajax:complete', function(evt, xhr, status){
     
      var $submitButton = $(this).find('input[name="commit"]');
      
      
      // Restore the original submit button text
      $submitButton.attr('value',$submitButton.data('origText') );
      $submitButton.attr('disabled',false );
    })
    .bind("ajax:error", function(evt, xhr, status, error){
        
            var $form = $(this),
          errors,
          errorText;
      try {
        // Populate errorText with the comment errors
        errors = $.parseJSON(xhr.responseText);
      } catch(err) {
        // If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.
        errors = {message: "Please reload the page and try again"};
      }

      // Build an unordered list from the list of errors
      errorText = "There were errors with the submission: \n<ul>";

      for ( error in errors ) {
        errorText += "<li>" + error + ': ' + errors[error] + "</li> ";
      }

      errorText += "</ul>";

      // Insert error list into form
      $form.find('div.validation-error').html(errorText);
    });
    
  }
  
  return {
    init: function() {
      handleSubmit();
      handleItemOver();
      handleQuickEditClick();
    }
  }
}();

$(document).ready(function() {

  
  myadmin.cat.init();
  myadmin.selectCat.init();
});