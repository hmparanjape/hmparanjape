/*global $:false */

// Responsive image script
var windowWidth = $(window).width();

$('.hp-responsive-img').each(function() {

  var imgLink = $(this).attr('href');
  var appropriateImageWidth = 'large';

  if(windowWidth <= 400) {
    appropriateImageWidth = 'x-small';
  } else if (windowWidth > 400 && windowWidth <= 800) {
    appropriateImageWidth = 'small';
  } else if (windowWidth > 800 && windowWidth <= 1600) {
    appropriateImageWidth = 'medium';
  } else if (windowWidth > 1600 && windowWidth <= 2400) {
    appropriateImageWidth = 'large';
  } else {
    appropriateImageWidth = 'x-large';
  }

  var updatedImgLink = imgLink.replace(/{width}/g, appropriateImageWidth);

  $(this).attr('href', updatedImgLink);

});


// Load imager.js ------------------------------------------------------------//
// new Imager('.delayed-img-load',
// {
//   availableWidths: {
//     300:  'x-small',
//     450:  'small',
//     600:  'medium'
//   }
// });

// Trigger on page load ------------------------------------------------------//
$(function() {
  // Responsive thumbnail replacement
  $('.hp-exhbit-thumb').each(function() {

    var imgLink = $(this).attr('data-src');
    console.log(imgLink);
    var thumbParentWidth = $(this).parent().parent().width();
    console.log(thumbParentWidth);
    var appropriateImageWidth = 'medium';

    if(thumbParentWidth <= 300) {
      appropriateImageWidth = 'x-small';
    } else if (thumbParentWidth > 300 && thumbParentWidth <= 450) {
      appropriateImageWidth = 'small';
    } else {
      appropriateImageWidth = 'medium';
    }

    var updatedImgLink = imgLink.replace(/{width}/g, appropriateImageWidth);

    $(this).attr('src', updatedImgLink);

    console.log($(this).attr('src'));

  });

  if($(window).width() > 768){
    // Equal height for div/image in spash
    $('.hp-splash-eq-h').matchHeight();
    $('.hp-bio-eq-h').matchHeight();
  }

  // Enable SVG -> fallback
  svgeezy.init(false, 'png');

  // Show a small notification about new blog posts at the bottom of main page.
  $('.hp-blog-notification').delay(1000).slideDown(700).delay(10000).slideUp(700);

  // Hover zoom effect for exhibit-a thumbs
  // Based on http://stanhub.com/how-to-create-zoom-effect-on-image-hover-with-css-and-jquery/
  $('.hp-exhbit-thumb').hover(function() {
        $(this).addClass('hp-exhbit-thumb-transition');
    }, function() {
        $(this).removeClass('hp-exhbit-thumb-transition');
    });
});
