var express = require('express');
var router = express.Router(); 
const request = require("request"); 

/* GET album details page. */
router.get('/:albumId', function(req, res) {
    res.render('albumdetails', {
        pageId: 'albumdetails',
        albumId: req.params.albumId
    });
});


router.get('/json/:albumId', function(req, res) {
    const jwtToken = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik05OVpGUEMyR1UifQ.eyJpYXQiOjE1MjAyODgwNDQsImV4cCI6MTUzNTg0MDA0NCwiaXNzIjoiUzJaUDI1NlBQSyJ9.aHYYWnOKFNxP-l5gXFq8SUurmtDuGvf_ZklQfFXgT-IlPrlXtXUIvHLDUz_psHQNyVwQeN8SxdEcgzMNR2x9Kg"
    var thisAlbum = req.params.albumId;
    request.get(  
      {  
        url: `https://api.music.apple.com/v1/catalog/us/albums/${thisAlbum}`,  
        auth: {  
            bearer: jwtToken  
        },  
        json: true  
    },  
    (err, httpResponse, body) => {  
        if (err) {  
            console.error(err);  
        } else { 
            res.json(body);
        }  
    })
});

router.get('/database/:albumId', function(req, res) {
    var db = req.db;
    var collection = db.get('musictags');
    var thisAlbum = req.params.albumId;
    collection.find({ "albumId" : thisAlbum }, function(e,docs){
        res.json(docs);
    })
});

module.exports = router;
