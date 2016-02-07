$(function(){

  $('button').click(function() {

      $('#movies').submit(function(event) {

        event.preventDefault();
        
        var searchTerm = $('#query').val();

        var getRequest = function (searchTerm) {

          var params = {
            part: 'snippet',
            key: 'AIzaSyDUtUb1zcoiioR0zOXYU5uzDr4FY1cwIRg',
            q: searchTerm,
            maxResults: 15
          };

          var url = 'https://www.googleapis.com/youtube/v3/search';

          $.getJSON(url, params, function(data) {

            var items = data.items;

            $.each(items, function(index, value) {
              
              var str = value.snippet.thumbnails.medium.url;

              var w = value.snippet.thumbnails.medium.width;

              var h = value.snippet.thumbnails.medium.height;

              var videoId = value.id.videoId;

              var showResults = function (str, videoId) {

                  $('#movies').append('<img src="' + str + '">');

                  var currentImg = $('img:last');

                  currentImg.css({'width':w,'height':h});

                  currentImg.wrap("<a href='https://www.youtube.com/watch?v=" + videoId + "'</a>");

              };

              showResults(str, videoId);

            });

          });
              
        };

        getRequest(searchTerm);

      });
  })


})