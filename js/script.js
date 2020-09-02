$(document).ready(function() {
  $("#but").click(function(){
    var valore = $("#in").val();
    $.ajax(
      {
        'url': "https://api.themoviedb.org/3/search/movie",
        'method': "GET",
        "data" : {
                    api_key: "0ddb3a09479589fbbf168ce8b9819f87",
                    query: valore,
                    language: "it-IT",
        },

        'success': function (risposta) {
          $(".cds-container").empty();
          var source = $('#entry-template').html();
 	        var template = Handlebars.compile(source);
          if (risposta.total_results >= 1 ){
            for(var i=0; i<risposta.results.length; i++){
                var context= {
                  "titolo": risposta.results[i].title,
                  "titoloOriginale":risposta.results[i].original_title,
                  "lingua":risposta.results[i].original_language,
                  "voto":risposta.results[i].vote_average,
                };
                  var html = template(context);
                  $(".cds-container").append(html);
            }
          }else {
            $(".cds-container").html("film non è presente");
          }

        },
        'error': function () {
          alert("E' avvenuto un errore ");
        }
      }
    );
  })
});


// if ( data.query.includes(valore)) {
//
// } else {
//   var source = $('#entry-template').html();
//   var template = Handlebars.compile(source);
//
//   var html = "FILM NON PRESENTE";
//   $(".cds-container").append(html);
// }
