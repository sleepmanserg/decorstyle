//
// Custom Scripts
// --------------------------------------------------

$(document).ready(function(){

// Sticky Header
//------------------------------------------------------------------------------
  function stickyHeader() {
    let $navbar = $('.site-header');
    if($navbar.length) {
      $(window).on('scroll', function() {
        if($(this).scrollTop() > 40) {
          $navbar.addClass('header-stuck');
          $('body').addClass('header-stucked');
        } else {
          $navbar.removeClass('header-stuck');
          $('body').removeClass('header-stucked');
        }
      });
    }
  }

  stickyHeader();

  // Slick Slider Init
  $('.slick-slider').slick({
    adaptiveHeight: true
  });

  // Forms Customisation Plugin
  $('.simple-select-drop').select2({
    minimumResultsForSearch: -1,
    containerCssClass : "simple-select-drop"
  });
  $('.search-complete select').select2({
    language: "es"
  });

  // Range Slider Init
  ionInit();

  // Single Product Preview Carousel
  $('.slider-preview').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  });

  $('.slider-nav > .slide').on('click', function() {
    $('.slider-nav > .slide').removeClass('active');
    $('.slider-preview').slick('slickGoTo',
      $(this).index(),
      $(this).addClass('active')
    );
  });

  // Input +/- increment
  $('.minus').on('click', function () {
    let $input = $(this).parent().find('input');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });

  $('.plus').on('click', function () {
    let $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});



// Mobile Menu Toggle
//---------------------------------------------------------------------
function menuToggle(openTrigger, closeTrigger) {
  let target = $('body');

  $(openTrigger).on('click', function(e) {
    $(target).addClass('mobileMenuOn');
    e.preventDefault();
  });

  $(closeTrigger).on('click', function(e) {
    $(target).removeClass('mobileMenuOn');
    e.preventDefault();
  });
}
menuToggle('.mobileMenuTrigger', '.closeTrigger, .site-backdrop');

// Data Attribute Toggle
//---------------------------------------------------------------------
// class="data-toggle" must be on trigger element
// data-target="#hereYourTarget" define target element
//data-classes="active" define class to toggle on target
// data-overflow="true" will activate overflow hidden on body, to prevent additional scroll
// data-backdrop="true" will activate site backdrop when active

$(document).on('click', '.data-toggle', function () {
  let $target = $($(this).data('target'));
  let classes = $(this).data('classes');
  let backdrop = $(this).data('backdrop');
  let overflow = $(this).data('overflow');
  $target.toggleClass(classes);

  if (backdrop === true) {
    $('.site-backdrop').toggleClass('active');
  }
  if (overflow === true) {
    $('body').toggleClass('overflow-hidden');
  }

  return false;
});

$('.site-backdrop').on('click', function () {
  $('.site-backdrop, #filters-sidebar').removeClass('active');
  $('body').removeClass('overflow-hidden')
});




// Range Slider
//---------------------------------------------------------------------
function ionInit() {

  let $range = $(".js-range-slider"),
    $from = $(".js-from"),
    $to = $(".js-to"),
    range,
    min = 0,
    max = 1000,
    postfix = " грн",
    from,
    to;

  let updateValues = function () {
    $from.prop("value", from + postfix);
    $to.prop("value", to + postfix);
  };

  $range.ionRangeSlider({
    type: "double",
    min: min,
    max: max,
    onChange: function (data) {
      from = data.from;
      to = data.to;

      updateValues();
    }
  });

  range = $range.data("ionRangeSlider");

  let updateRange = function () {
    range.update({
      from: from,
      to: to
    });
  };

  $from.on("change", function () {
    from = +$(this).prop("value");
    if (from < min) {
      from = min;
    }
    if (from > to) {
      from = to;
    }

    updateValues();
    updateRange();
  });

  $to.on("change", function () {
    to = +$(this).prop("value");
    if (to > max) {
      to = max;
    }
    if (to < from) {
      to = from;
    }

    updateValues();
    updateRange();
  });
}