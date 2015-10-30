/*global $:false */

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

  // Render Mapbox maps
  if ( $( "#hp-map-rmnp" ).length ) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaG1wYXJhbmphcGUiLCJhIjoiY2lnOHJ3dGt2MHE5d3RobTA4bG1kNzcwOSJ9.a-n4ERL-LSgzsQv0RBbMfQ';
    $.getJSON($( "#hp-map-rmnp" ).attr('data-geojson'), function(jsondata){
      var map_1 = L.mapbox.map('hp-map-rmnp', 'mapbox.streets').setView([40.35, -105.7], 11);
      var myLayer = L.mapbox.featureLayer().addTo(map_1);

      myLayer.on('layeradd', function(e) {
        var marker = e.layer, feature = marker.feature;
        // Create custom popup content
        var popupContent =  '<p>' + feature.properties.Name + '<\/p>';
        // http://leafletjs.com/reference.html#popup
        marker.bindPopup(popupContent,{
            closeButton: false,
            minWidth: 220
        });
      });

      myLayer.setGeoJSON(jsondata);

      if($(window).width() < 768){
        // Disable drag and zoom handlers.
        map_1.scrollWheelZoom.disable();
      }

    });

  }

  if ( $( "#hp-map-colorado-misc" ).length ) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaG1wYXJhbmphcGUiLCJhIjoiY2lnOHJ3dGt2MHE5d3RobTA4bG1kNzcwOSJ9.a-n4ERL-LSgzsQv0RBbMfQ';
    $.getJSON($( "#hp-map-colorado-misc" ).attr('data-geojson'), function(jsondata){
      var map_2 = L.mapbox.map('hp-map-colorado-misc', 'mapbox.streets')
        .setView([38.5, -106.0], 8);
        var myLayer = L.mapbox.featureLayer().addTo(map_2);

        myLayer.on('layeradd', function(e) {
          var marker = e.layer, feature = marker.feature;
          // Create custom popup content
          var popupContent =  '<p>' + feature.properties.Name + '<\/p>';
          // http://leafletjs.com/reference.html#popup
          marker.bindPopup(popupContent,{
              closeButton: false,
              minWidth: 220
          });
        });

        myLayer.setGeoJSON(jsondata);

      if($(window).width() < 768){
        // Disable drag and zoom handlers.
        map_2.scrollWheelZoom.disable();
      }
    });

  }

});

// BrewPF app AJAX request. Need to move this elsewhere. ---------------------//
$('#hp-brew-random-beer').click(function() {
  $('.hp-brew-svg-container-spinner').show();
  $.get("http://api.harshadparanjape.com/brewpf" + "?cachebuster=" + new Date().getTime(), function(data) {
    $('.hp-brew-svg-container-spinner').hide();
    $('#hp-brew-svg-container').html(data);
  }, 'text');
});
