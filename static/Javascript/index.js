$(document).ready(function()
{
   $("#headfootright a:lt(3)").each(function()
   	{
   		$(this).hover(function(){
    $(this).css("color","orange");
    },function(){
    $(this).css("color","#7b7b7b");
  });
   	});
});


$(document).ready(function()
{
   $("#navright a").each(function()
   	{
   		$(this).mousedown(function()
   			{
   				$(this).css("color","orange");
   				$("#navright a").not(this).css("color","#7b7b7b");
   				
   			});
   	});
});

$(document).ready(function()
{
   $("#navright1 li").each(function()
   	{
   		$(this).click(function()
   			{
   				$(this).css("background-color","orange");
   				$("#navright1 li").not(this).css("background-color","#6c6c6c");
   				
   			});
   	});
});
 
$(document).ready(function(){
	$("#navleft1").click(function(){
    $("#navright1").slideToggle("slow");
  });
});


