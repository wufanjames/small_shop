$(document).ready(function(){
	$("#logo button").each(function()
		{
			$(this).click(function()
				{
					$(this).css("background-color","white");
				});
		});
});

$(document).ready(function()
{
    $("#judge span").addClass("hide");
});

 $(document).ready(function()
 	{
 		$("#warn span").addClass("hide");
 	});

$(document).ready(function()
{
  $("#user").blur(function()
  	{
  		if($("#user").val()=="")
  		{
           $("#judge1 span:eq(2)").addClass("show yellow");
           $("#judge1 span:eq(1)").removeClass("show red");
           $("#user").removeClass("redborder greenborder");
           $("#user").addClass("yellowborder");
           $("#judge1 span:eq(0)").removeClass("show green");
  			
  			$("#warn1 span:eq(1)").addClass("show");
  			$("#warn1 span:eq(0)").removeClass("show");
  		}
  		else if($("#user").val().length<6)
  		{
  			$("#judge1 span:eq(1)").addClass("show red");
  			$("#judge1 span:eq(2)").removeClass("show yellow");
  			$("#user").addClass("redborder");
  			$("#user").removeClass("yellowborder greenborder");
  			$("#judge1 span:eq(0)").removeClass("show green");
  			
  			$("#warn1 span:eq(0)").addClass("show");
  			$("#warn1 span:eq(1)").removeClass("show");
  		}
  		else
  		{
  			$("#judge1 span:eq(0)").addClass("show green");
  			$("#user").addClass("greenborder");
  			$("#judge1 span:eq(1)").removeClass("show red");
  			$("#judge1 span:eq(2)").removeClass("show yellow");
  			$("#user").removeClass("redborder yellowborder");
  		
  			$("#warn1 span:eq(0)").removeClass("show");
  			$("#warn1 span:eq(1)").removeClass("show");
  		}
  	});
});
$(document).ready(function()
{
  $("#phone").blur(function()
  	{
  		if($("#phone").val()=="")
  		{
           $("#judge2 span:eq(2)").addClass("show yellow");
           $("#judge2 span:eq(1)").removeClass("show red");
           $("#phone").removeClass("redborder greenborder");
           $("#phone").addClass("yellowborder");
           $("#judge2 span:eq(0)").removeClass("show green");
  	
  			$("#warn2 span:eq(1)").addClass("show");
  			$("#warn2 span:eq(0)").removeClass("show");
  		}
  		else if($("#phone").val().length<11)
  		{
  			$("#judge2 span:eq(1)").addClass("show red");
  			$("#judge2 span:eq(2)").removeClass("show yellow");
  			$("#phone").addClass("redborder");
  			$("#phone").removeClass("yellowborder greenborder");
  			$("#judge2 span:eq(0)").removeClass("show green");
  			$
  			$("#warn2 span:eq(0)").addClass("show");
  			$("#warn2 span:eq(1)").removeClass("show");
  		}
  		else
  		{
  			$("#judge2 span:eq(0)").addClass("show green");
  			$("#phone").addClass("greenborder");
  			$("#judge2 span:eq(1)").removeClass("show red");
  			$("#judge2 span:eq(2)").removeClass("show yellow");
  			$("#phone").removeClass("redborder yellowborder");
  			
  			$("#warn2 span:eq(0)").removeClass("show");
  			$("#warn2 span:eq(1)").removeClass("show");
  		}
  	});
});

$(document).ready(function()
{
  $("#pwd").blur(function()
  	{
  		if($("#pwd").val()=="")
  		{
           $("#judge3 span:eq(2)").addClass("show yellow");
           $("#judge3 span:eq(1)").removeClass("show red");
           $("#pwd").removeClass("redborder greenborder");
           $("#pwd").addClass("yellowborder");
           $("#judge3 span:eq(0)").removeClass("show green");
  			
  			$("#warn3 span:eq(1)").addClass("show");
  			$("#warn3 span:eq(0)").removeClass("show");
  		}
  		else if($("#pwd").val().length<6)
  		{
  			$("#judge3 span:eq(1)").addClass("show red");
  			$("#judge3 span:eq(2)").removeClass("show yellow");
  			$("#pwd").addClass("redborder");
  			$("#pwd").removeClass("yellowborder");
  			$("#judge3 span:eq(0)").removeClass("show green");
  			$("#pwd").removeClass("greenborder");
  			$("#warn3 span:eq(0)").addClass("show");
  			$("#warn3 span:eq(1)").removeClass("show");
  		}
  		else
  		{
  			$("#judge3 span:eq(0)").addClass("show green");
  			$("#pwd").addClass("greenborder");
  			$("#judge3 span:eq(1)").removeClass("show red");
  			$("#judge3 span:eq(2)").removeClass("show yellow");
  			
  			$("#pwd").removeClass("yellowborder redborder");
  			$("#warn3 span:eq(1)").removeClass("show");
  			$("#warn3 span:eq(0)").removeClass("show");
  		}
  	});
});
$(document).ready(function()
	{
		$("#pwd").blur(function()
			{
				if($("#pwd").val().length>0 && $("#pwd1").val().length>0 && $("#pwd").val()==$("#pwd1").val())
				{
					$("#judge4 span:eq(0)").addClass("show green");
  			$("#pwd1").addClass("greenborder");
  			$("#judge4 span:eq(1)").removeClass("show red");
  			$("#judge4 span:eq(2)").removeClass("show yellow");
  			$("#pwd1").removeClass("redborder yellowborder");
  			
  			$("#warn4 span:eq(1)").removeClass("show");
  			$("#warn4 span:eq(0)").removeClass("show");
				}
			
			});
	});
$(document).ready(function()
{
  $("#pwd1").blur(function()
  	{
  		if($("#pwd1").val()=="")
  		{
           $("#judge4 span:eq(2)").addClass("show yellow");
           $("#judge4 span:eq(1)").removeClass("show red");
           $("#pwd1").removeClass("redborder greenborder");
           $("#pwd1").addClass("yellowborder");
           $("#judge4 span:eq(0)").removeClass("show green");
  			
  			$("#warn4 span:eq(1)").addClass("show");
  			$("#warn4 span:eq(0)").removeClass("show");
  		}
  		else if($("#pwd1").val().length<6 || $("#pwd1").val()!=$("#pwd").val())
  		{
  			$("#judge4 span:eq(1)").addClass("show red");
  			$("#judge4 span:eq(2)").removeClass("show yellow");
  			$("#pwd1").addClass("redborder");
  			$("#pwd1").removeClass("yellowborder greenborder");
  			$("#judge4 span:eq(0)").removeClass("show green");
  			
  			$("#warn4 span:eq(0)").addClass("show");
  			$("#warn4 span:eq(1)").removeClass("show");
  		}
  		
  		else
  		{
  			$("#judge4 span:eq(0)").addClass("show green");
  			$("#pwd1").addClass("greenborder");
  			$("#judge4 span:eq(1)").removeClass("show red");
  			$("#judge4 span:eq(2)").removeClass("show yellow");
  			$("#pwd1").removeClass("redborder yellowborder");
  			
  			$("#warn4 span:eq(1)").removeClass("show");
  			$("#warn4 span:eq(0)").removeClass("show");
  		}
  	});
});
$(document).ready(function()
{
  $("#txt").blur(function()
  	{
  		if($("#txt").val()=="")
  		{
           $("#judge5 span:eq(2)").addClass("show yellow");
          
           
           $("#txt").addClass("yellowborder");
           $("#judge5 span:eq(0)").removeClass("show green");
  			$("#txt").removeClass("greenborder");
  			$("#warn5 span").addClass("show");
  		}
  		
  		
  		else
  		{
  			$("#judge5 span:eq(0)").addClass("show green");
  			$("#txt").addClass("greenborder");
  			
  			$("#judge5 span:eq(2)").removeClass("show yellow");
  			
  			$("#txt").removeClass("yellowborder");
  			$("#warn5 span").removeClass("show");
  		}
  	});
});

$(document).ready(function()
{
   $("#sbm").click(function()
   	{
   	    var formobj =  document.getElementByid("myform");
   		if($("#user").val().length>=6 && $("#phone").val().length>=11 && $("#pwd").val().length>=6 && $("#pwd1").val()==$("#pwd").val() && $("#txt").val().length>0)
   		{
   			$("#judge>div span:eq(0)").addClass("show")
   		}
        if($("#judge1 span:eq(0)").hasClass("show") && $("#judge2 span:eq(0)").hasClass("show") && $("#judge3 span:eq(0)").hasClass("show") && $("#judge4 span:eq(0)").hasClass("show") && $("#judge5 span:eq(0)").hasClass("show"))
   		{
   			//alert("信息注册成功,请点击确定!");
           formobj.submit();
   		}
   		else if($("#judge1 span:eq(1)").hasClass("show") || $("#judge2 span:eq(1)").hasClass("show") || $("#judge3 span:eq(1)").hasClass("show") || $("#judge4 span:eq(1)").hasClass("show") || $("#judge5 span:eq(1)").hasClass("show"))
   		{
   			alert("注册信息可能有不合法的部分,请重新注册!");
   			 window.location.href="/regist";
   		}
        else if($("#judge1 span:eq(2)").hasClass("show") || $("#judge2 span:eq(2)").hasClass("show") || $("#judge3 span:eq(2)").hasClass("show") || $("#judge4 span:eq(2)").hasClass("show") || $("#judge5 span:eq(2)").hasClass("show"))
        {
        	alert("请填满注册信息!");
   			 window.location.href="/regist";
        }
   	});
});