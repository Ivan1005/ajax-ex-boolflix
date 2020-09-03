$(document).ready(function() {
  $("#but").click(function(){
    var valore = $("#in").val();
    film(valore);
  })
});


function film (data){
  $.ajax(
    {
      'url': "https://api.themoviedb.org/3/search/movie",
      'method': "GET",
      "data" : {
                  api_key: "0ddb3a09479589fbbf168ce8b9819f87",
                  query: data,
                  language: "it-IT",
      },

      'success': function (risposta) {
          print(risposta);
      },
      'error': function () {
        alert("devi inserire il titolo");
      }
    }
  );

}

function print (data) {
  $(".cds-container").empty();
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  if (data.total_results >= 1 ){
    for(var i=0; i<data.results.length; i++){
        var context= {
          "titolo": data.results[i].title,
          "titoloOriginale":data.results[i].original_title,
          "lingua":data.results[i].original_language,
          "voto":data.results[i].vote_average,
        };
          var html = template(context);
          $(".cds-container").append(html);
    }
  }else {
    $(".cds-container").html("film non è presente");
  }
  $("#in").val("");
}
