$(window).load(function () {
  var tabChange = function () {
    var tabs = $('.nav-tabs > li');
    // console.log(tabs);
    var active = tabs.filter('.active');
    // console.log(active);
    var next = active.next('li').length ? active.next('li').find('a') : tabs.filter(':first-child').find('a');
    // console.log(next);
    // Use the Bootsrap tab show method
    next.tab('show');
  };
  // Tab Cycle function
    var tabCycle = setInterval(tabChange, 5000);

  var youtubeid = $('.youtubeimg img').attr("src").match(/[\w\-]{11,}/)[0];

  $(".youtubeiframe iframe").attr({
    src: "http://www.youtube.com/embed/" + youtubeid + "?rel=0",
  });

  $('body').on('show.bs.modal', function () {
    clearInterval(tabCycle);
  });

  $('body').on('hidden.bs.modal', function () {
    tabCycle = setInterval(tabChange, 5000)
    $('#video-show-sprogram iframe').attr("src", $('#video-show-sprogram iframe').attr("src"));
    $('#video-show-toiec iframe').attr("src", $('#video-show-toiec iframe').attr("src"));
    $('#video-show-ielst iframe').attr("src", $('#video-show-ielst iframe').attr("src"));
    $('#video-show-toeft iframe').attr("src", $('#video-show-toeft iframe').attr("src"));
    $('#video-show-japanese iframe').attr("src", $('#video-show-japanese iframe').attr("src"));
    $('#video-show-elt iframe').attr("src", $('#video-show-elt iframe').attr("src"));
  });
});