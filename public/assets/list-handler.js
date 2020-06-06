$(document).on('ready', function(){

  $('form').on('submit', function(){
      event.preventDefault();
      var formData = $('form').serialize();
      var input = $('form input'); //this grabs the item in the field
      var items = {item: input.val()}; //this adds this as an item in the todo variable


      $.ajax({
        type: 'POST',
        url: '/',
        data: formData,
        success: function(data){
          //do something with the data via front-end framework
          formData.qty = Number(formData.qty)
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var input = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + input,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
