$("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');

$(document).on("scroll",function(){
  if($(document).scrollTop()>100){
    $("head").append('<link rel="stylesheet" href="../css/header-small.css" type="text/css"/>');
  } else {
    $("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');          
  }
});

$(document).ready(function() {
  $('html').smoothScroll(500);
});

/******************************************/
/***************Dynamic tab***************/
/****************************************/

var tabChange = function () {
  var tabs = $('.nav-tabs > li');
  var active = tabs.filter('.active');
  var next = active.next('li').length ? active.next('li').find('a') : tabs.filter(':first-child').find('a');
  // Use the Bootsrap tab show method
  next.tab('show');
};
// Tab Cycle function
var tabCycle = setInterval(tabChange, 6000);

// Tab click event handler
$('a').on('click', function (e) {
  e.preventDefault();
  // Stop the cycle
  clearInterval(tabCycle);
  // Show the clicked tabs associated tab-pane
  $(this).tab('show');
  // Start the cycle again in a predefined amount of time
  setTimeout(function () {
    // tabCycle = setInterval(tabChange, 5000);
  }, 36000);
});

$('a[rel=popover]').popover().click(function(e) {
  e.preventDefault();        
  var open = $(this).attr('data-easein');
  if(open == 'shake') {
    $(this).next().velocity('callout.' + open);
  } else if(open == 'pulse') {
    $(this).next().velocity('callout.' + open);
  } else if(open == 'tada') {
    $(this).next().velocity('callout.' + open);
  } else if(open == 'flash') {
    $(this).next().velocity('callout.' + open);
  }  else if(open == 'bounce') {
   $(this).next().velocity('callout.' + open);
  } else if(open == 'swing') {
   $(this).next().velocity('callout.' + open);
  }else {
   $(this).next().velocity('transition.' + open); 
  }          
});