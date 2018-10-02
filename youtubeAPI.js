const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
    const settings = {
        url: YOUTUBE_SEARCH_URL,
        data: {
            q: `${searchTerm} in:name`,
            part: "snippet",
            key: "AIzaSyC68NGJp8YjxtvckrxeRGQ3JvCf3E4MJVU",
            maxResults: 32
        },
        dataType: "json",
        type: "GET",
        success: callback
        };
        $.ajax(settings);
}

function renderResult(result){
    return `
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}"  target="_blank"><img src="${result.snippet.thumbnails.medium.url}"/></a>
  `;
}

function displayYouTubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }

function watchSubmit(){
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();

        queryTarget.val("");
        getDataFromApi(query, displayYouTubeSearchData); 
    })
}

$(watchSubmit);