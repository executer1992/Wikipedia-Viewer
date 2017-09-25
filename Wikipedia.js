 
$('#findText').bind('keypress',function(e){
         if (e.keyCode==13){
           $('#find').click();
         }
       }) 
function viewData(data){
  $(".wikipedia-item-container").html("");
  for(var i = 0; i < data[1].length; i++){
    if(window.CP.shouldStopExecution(1)){break;}
    $(".wikipedia-item-container").prepend("<li><a href= "+data[3][i]+">"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
    
  } 
  window.CP.exitedLoop(1);
}

$(document).ready(function(){
    $('#find').click(function(){
        var findText = $('#findText').val();
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ findText + "&format=json&callback=?";
     
        
        $.ajax({
            type:"GET",
            url: url,
            async:"false",
            dataType: "json",
            success: function(data){
              viewData(data);
            },
            error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        console.log(msg);
      }
            
         
            });
        }); 
    });    
