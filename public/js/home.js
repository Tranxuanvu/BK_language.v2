$("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');

$(document).on("scroll",function(){
  if($(document).scrollTop()>100){
    $("head").append('<link rel="stylesheet" href="../css/header-small.css" type="text/css"/>');
  } else {
    $("head").append('<link rel="stylesheet" href="../css/header-large.css" type="text/css"/>');          
  }
});

/******************************************/
/***************tooltip bootstrap*********/
/****************************************/
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
  $('#sidebar a').click(function () {
    $(this).tooltip('hide');
  })
});

$(document).ready(function () {
  $('a[rel=popover]').popover().click(function(e) {
    e.originalEvent.preventDefault();        
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
});

/******************************************/
/***************Popup Modal***************/
/****************************************/
$(document).ready(function () {
  var ModalEffects = (function() {

    function init() {

      /*----------------login----------------*/
      var overlayLoginRes = document.querySelector( '.login-register .md-overlay' );

      [].slice.call( document.querySelectorAll( '.login-register .md-trigger' ) ).forEach( function( el, i ) {

        var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) )

        function removeModal( hasPerspective ) {
          classie.remove( modal, 'md-show' );

          if( hasPerspective ) {
            classie.remove( document.documentElement, 'md-perspective' );
          }
        }

        function removeModalHandler() {
          removeModal( classie.has( el, 'md-setperspective' ) ); 
        }

        el.addEventListener( 'click', function( ev ) {
          classie.add( modal, 'md-show' );
          overlayLoginRes.removeEventListener( 'click', removeModalHandler );
          overlayLoginRes.addEventListener( 'click', removeModalHandler );

          if( classie.has( el, 'md-setperspective' ) ) {
            setTimeout( function() {
              classie.add( document.documentElement, 'md-perspective' );
            }, 25 );
          }
        });

      } );

      /*----------------sidebar----------------*/
      var overlay = document.querySelector( '#sidebar .md-overlay' );

      [].slice.call( document.querySelectorAll( '#sidebar .md-trigger' ) ).forEach( function( el, i ) {

        var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
          close = modal.querySelector( '#sidebar .md-close' );

        function removeModal( hasPerspective ) {
          classie.remove( modal, 'md-show' );

          if( hasPerspective ) {
            classie.remove( document.documentElement, 'md-perspective' );
          }
        }

        function removeModalHandler() {
          removeModal( classie.has( el, 'md-setperspective' ) ); 
        }

        el.addEventListener( 'click', function( ev ) {
          classie.add( modal, 'md-show' );
          overlay.removeEventListener( 'click', removeModalHandler );
          overlay.addEventListener( 'click', removeModalHandler );

          if( classie.has( el, 'md-setperspective' ) ) {
            setTimeout( function() {
              classie.add( document.documentElement, 'md-perspective' );
            }, 25 );
          }
        });

        close.addEventListener( 'click', function( ev ) {
          ev.stopPropagation();
          removeModalHandler();
        });

      } );

    }

    init();

  })();
});


/******************************************/
/***************Form login/register*******/
/****************************************/
$(document).ready(function () {
  $('#navbar-top .md-content').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }

  });
});

$(document).ready(function () {
  $('.tab a').on('click', function (e) {
  
    e.originalEvent.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
});
