console.log('The custom script for the favorites page is running');

function getAlbumInfo(albumNumber, cardNumber) {
    
    $.getJSON( '/favorites/album/' + albumNumber)
    .done(function(rawData) {     
    // send album info to populateCard
    populateCard(albumNumber, rawData.data[0].attributes, cardNumber);
    // populateList(albumNumber, rawData.data[0].attributes);

    // Ben's Suggestions:
    // try fetch
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // note: make sure to handle successful case and rejected case
    })
    .fail(function() { 
        console.log("error");
    });
};

function createCard(cardNumber) {
    $('#all_cards').append(`<div id="card${cardNumber}" class="card"><a class="album_details_link" href=""><img class="card-img-top" src="" alt=""><a/><div class="card-body"><h4 class="card-title"></h4><span class="album"><span class="text-primary">Loading Album Details...</span></span><br /><br /><div class="release_and_label"><small class="label"></small><small class="release"></small></div></div></div>`);
}


function populateCard(albumNumber, results, cardNumber) {
    
    // artist name
    $(`#card${cardNumber} .card-body h4`).html(
        results.artistName);
    // album name
    $(`#card${cardNumber} .card-body .album`).html(
        ' ' + results.name); 
    // record label       
    $(`#card${cardNumber} .card-body .label`).html(
        ' ' + results.recordLabel);
    // copywrite symbol, release year
    $(`#card${cardNumber} .card-body .release`).html(
        ' ' + results.copyright.slice(0, 6));
    // album cover
    $(`#card${cardNumber} img`).attr(
        'src', results.artwork.url.replace('{w}', 350).replace('{h}', 350));
    $(`#card${cardNumber} .album_details_link`).attr(
        'href', `/albumdetails/${albumNumber}`);
};

var favoriteAlbums;

dbRefrence = firebase.database().ref().child('Ol5d5mjWi9eQ7HoANLhM4OFBnso2/My Favorites');
dbRefrence.on('value', snap => {
    favoriteAlbums = snap.val();
    startFavoritesPage();
});


function startFavoritesPage() {
    $('#all_cards').html("");
    for (let index = 0; index < favoriteAlbums.length; index++) {
        let album = favoriteAlbums[index];
        let card = (index + 1);
        
        createCard(card)
        getAlbumInfo(album, card) 
    }
};




// build a unordered list of albums for smaller screens
// this works I'm just not using it right now
// function populateList(albumNumber, results) {
//     $('.album_list').append(`<li><a href="/albumdetails/${albumNumber}"><img src="${results.artwork.url.replace('{w}', 30).replace('{h}', 30)}">&nbsp; ${results.name}</a> <span class="text-secondary font-italic">- ${results.artistName}</span></li>`);
// };