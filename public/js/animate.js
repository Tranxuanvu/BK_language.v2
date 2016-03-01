$(document).ready(function() {
  $('.ani-course').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated fadeInDownBig', // Class to add to the elements when they are visible
    offset: 100
  });

  $('.course-left-item').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated slideInLeft', // Class to add to the elements when they are visible
    offset: 230    
  });

  $('.course-right-item').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated slideInRight', // Class to add to the elements when they are visible
    offset: 230   
  });

  $('.ani-our-team').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated rollIn', // Class to add to the elements when they are visible
    offset: 250    
  });

  $('#our-team .our-team-box-model').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated fadeInDown', // Class to add to the elements when they are visible
    offset: 300
  });

  $('.ani-field').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated fadeInUp', // Class to add to the elements when they are visible
    offset: 320
  });

  $('.ani-services').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated rotateIn', // Class to add to the elements when they are visible
    offset: 350
  });

  $('.services-item').addClass("hidden_class").viewportChecker({
    classToAdd: 'visible animated flipInY', // Class to add to the elements when they are visible
    offset: 300
  });
});