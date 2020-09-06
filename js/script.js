$(document).ready(function() {
  $("#but").click(function(){
    $(".cds-container").empty();
    var valore = $("#in").val();
    var url1 = "https://api.themoviedb.org/3/search/movie";
    var url2 = "https://api.themoviedb.org/3/search/tv";
    ricerca(valore, url1,"film");
    ricerca(valore,url2,"tv");
  })
  $(document).keydown(function(event){

       if (event.keyCode == 13 || event.which == 13) {
         var valore = $("#in").val();
         var url1 = "https://api.themoviedb.org/3/search/movie";
         var url2 = "https://api.themoviedb.org/3/search/tv";
         ricerca(valore, url1,"film");
         ricerca(valore,url2,"tv");
       }
   })
});
// FUNZIONE CHIAMATA AJAX
function ricerca (data , url , type){
  $.ajax(
    {
      'url': url,
      'method': "GET",
      "data" : {
                  api_key: "0ddb3a09479589fbbf168ce8b9819f87",
                  query: data,
                  language: "it-IT",
      },
      'success': function (risposta) {
          if (risposta.total_results >= 1 ){
            print(risposta.results, type);
          }else {
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
function print (data, type) {
  $(".cds-container").empty();
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
    for(var i=0; i<data.length; i++){
      if (type == "film"){
        var title =data[i].title;
        var origine = data[i].original_title;
      }else if ( type == "tv"){
        var title =data[i].name;
        var origine = data[i].original_name;
      }
        var context= {
          "poster":checkke(poster (data[i].poster_path)),
          "tipo": type,
          "titolo": title,
          "titoloOriginale":origine,
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
  var resto = num % 2 ;

  var number = Math.floor(num / 2);
  var stars = "";
  for ( var i = 0 ; i < 5 ; i++){
          if (i < number ){
            stars += '<i class="fas fa-star"></i>';
          }else if ( resto != 0 ){
            stars += '<i class="fas fa-star-half-alt"></i>';
            resto = 0;
          }
          else {
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
        return '<img src="img/' + stringa + '.png" class="star">';
    }  else {
        return stringa;
    }
}
// FUNZIONE poster
function poster (poster) {

  var url3 = "https://image.tmdb.org/t/p/w342" + poster ;
      return  url3 ;
}
// CONTROLLO URL
function checkke (pos){
  if (pos == "https://image.tmdb.org/t/p/w342null")
  return "https://image.tmdb.org/t/p/w342/eQNNg0Ny6m0mRQDf0X4rf2U33AM.jpg";
  else {
    return pos;
  }
}
