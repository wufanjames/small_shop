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

