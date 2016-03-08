$("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');

$(document).on("scroll",function(){
  if($(document).scrollTop()>100){
    $("head").append('<link rel="stylesheet" href="../css/header-small.css" type="text/css"/>');
  } else {
    $("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');          
  }
});