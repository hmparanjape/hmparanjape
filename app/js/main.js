// Load imager.js ------------------------------------------------------------//
new Imager({ availableWidths: [50, 100, 200, 300], availablePixelRatios: [1, 2] });

// Trigger on page load ------------------------------------------------------//
$(function() {
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
