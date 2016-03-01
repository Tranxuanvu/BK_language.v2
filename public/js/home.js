// Dropdown Menu Fade    
$(document).ready(function(){

  $(".dropdown").hover(
    function() { $('.dropdown-menu', this).stop().fadeIn("fast");
  },
    function() { $('.dropdown-menu', this).stop().fadeOut("fast");
  });

});

$(document).ready(function() {

  $("#owl-carousel").owlCarousel({

    autoPlay: 3000, //Set AutoPlay to 3 seconds

    singleItem: true,
    // items: 2,
    itemsDesktop: [1199,3],
    itemsDesktopSmall: [979,3]

  });

});
