$(document).ready(function() {
  $("#but").click(function(){
    var valore = $("#in").val();
    film(valore);
  })
  $(document).keydown(function(event){

       if (event.keyCode == 13 || event.which == 13) {
         var valore = $("#in").val();
           film(valore);
       }

   })
});
// FUNZIONE CHIAMATA AJAX
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
          if (risposta.total_results >= 1 ){
            print(risposta.results);
          }else {
            $(".cds-container").empty();
            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);
            $(".cds-container").html("film non è presente");
          }
      },
      'error': function () {
        alert("devi inserire il titolo");
      }
    }
  );
}
// FUNZIONE STAMPA A SCHERM
function print (data) {
  $(".cds-container").empty();
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
    for(var i=0; i<data.length; i++){
        var context= {
          "titolo": data[i].title,
          "titoloOriginale":data[i].original_title,
          "lingua":data[i].original_language,
          "voto":data[i].vote_average,
        };
          var html = template(context);
          $(".cds-container").append(html);
    }
  $("#in").val("");
}
