$(document).ready(function() {
  $("#but").click(function(){
    var valore = $("#in").val();
    film(valore);
    serieTv(valore);
  })
  $(document).keydown(function(event){

       if (event.keyCode == 13 || event.which == 13) {
         var valore = $("#in").val();
           film(valore);
           serieTv(valore);
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
            $(".cds-container").html("non è presente il libreria");
          }
      },
      'error': function () {
        alert("devi inserire il titolo");
      }
    }
  );
}

// FUNZIONE SERIE TV
function serieTv (data){
  $.ajax(
    {
      'url': "https://api.themoviedb.org/3/search/tv",
      'method': "GET",
      "data" : {
                  api_key: "0ddb3a09479589fbbf168ce8b9819f87",
                  query: data,
                  language: "it-IT",
      },
      'success': function (risposta) {
          if (risposta.total_results >= 1 ){
            printSerie(risposta.results);
          }else {
            $(".cds-container").empty();
            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);
            $(".cds-container").html("non è presente il libreria");
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
          "lingua":flag(data[i].original_language),
          "voto":stars(data[i].vote_average) ,
        };
          var html = template(context);
          $(".cds-container").append(html);
    }
  $("#in").val("");
}
// FUNZIONE STAMPA SERIE
function printSerie (data) {
  $(".cds-container").empty();
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
    for(var i=0; i<data.length; i++){
        var context= {
          "titolo": data[i].name,
          "titoloOriginale":data[i].original_name,
          "lingua":flag(data[i].original_language),
          "voto":stars(data[i].vote_average) ,
        };
          var html = template(context);
          $(".cds-container").append(html);
    }
  $("#in").val("");
}
// FUNZIONE STARS
function stars (num){
  // 1 divido num % 2
  var number = Math.ceil(num / 2);
  var stars = "";
  for ( var i = 0 ; i < 5 ; i++){
          if (i < number ){
            stars += '<i class="fas fa-star"></i>';
          }else {
            stars += '<i class="far fa-star"></i>';
          }
  }
  // 4 con if controllo se il numero è minore di num
  return stars;
}
// FUNZIONE BANDIERA
function flag(stringa) {
  // solo ita e en
  var lingue = ["en", "it"];
  if (lingue.includes(stringa)) {
        return '<img src="img/' + stringa + '.png">';
    }  else {
        return stringa;
    }
}
