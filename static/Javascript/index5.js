$(document).ready(function()
{
  $("#user").blur(function()
  	{
  		if($(this).val()=="")
  		{
           $(".one").addClass("show");
           $(".two").removeClass("show");
  		}
  		else if($(this).val().length<5)
  			{
  				$(".two").addClass("show");
  				$(".one").removeClass("show");
  			}
  			else
  			{
  				$(".two").removeClass("show");
  				$(".one").removeClass("show");
  			}
  	});
});

$(document).ready(function()
{
  $("#pwd").blur(function()
  	{
  		if($(this).val()=="")
  		{
           $(".three").addClass("show");
           $(".four").removeClass("show");
  		}
  		else if($(this).val().length<6)
  			{
  				$(".four").addClass("show");
  				$(".three").removeClass("show");
  			}
  			else if($("#pwd").val()==$("#pwd1").val())
  			{
  				$(".five").removeClass("show");
  				$(".four").removeClass("show");
  				$(".three").removeClass("show");
  			}
  			else
  			{
  				$(".four").removeClass("show");
  				$(".three").removeClass("show");
  			}
  	});
});

$(document).ready(function()
{
  $("#pwd1").blur(function()
  	{
  		if($("#pwd").val()==""||$("#pwd1").val()!=$("#pwd").val())
  		{
           $(".five").addClass("show");
          
  		}    
  		else if($("#pwd").val()==$("#pwd1").val())
  		{
  			$(".five").removeClass("show");
  		}
  	});
});


$(document).ready(function()
{
  $("#num").blur(function()
  	{
  		if($(this).val()=="")
  		{
            $(".six").addClass("show");
            $(".seven").removeClass("show");
  		}
  		else if($(this).val().length<11)
  		{
           $(".six").removeClass("show");
            $(".seven").addClass("show");
  		}
  		else
  		{
  			$(".six").removeClass("show");
            $(".seven").removeClass("show");
  		}
  	});
});

$(document).ready(function()
{
   $("#sbm").click(function()
   	{
   		if($("form div").hasClass("hidden"))
   		{
   		  window.location.href="merchant.html";
   		}
   		else
   		{
   			alert("有错");
   		}
   	});
  
});