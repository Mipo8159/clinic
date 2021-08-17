$(document).ready(function () {
  // jQuery code

  $('[data-trigger]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var offcanvas_id = $(this).attr('data-trigger');
    $(offcanvas_id).toggleClass('show');
    $('body').toggleClass('offcanvas-active');
    $('.screen-overlay').toggleClass('show');
  });

  // Close menu when pressing ESC
  $(document).on('keydown', function (event) {
    if (event.keyCode === 27) {
      $('.mobile-offcanvas').removeClass('show');
      $('body').removeClass('overlay-active');
    }
  });

  $('.btn-close, .screen-overlay').click(function (e) {
    $('.screen-overlay').removeClass('show');
    $('.mobile-offcanvas').removeClass('show');
    $('body').removeClass('offcanvas-active');
  });
});
