const mongoose = require('mongoose'),
Song = mongoose.model('Song');

exports.get_songs = function(req, res) {
  Song.find({}, function(err, song) {
    if (err)
      res.send(err);
    res.json(song);
  });
};


exports.update_song = function(req, res) {
  Song.findOneAndUpdate({_id: req.params.songId}, req.body, {new: true}, function(err, song) {
    if (err)
      res.send(err);
    res.json(song);
  });
};

exports.seed_songs = function(req, res) {
  const songs = [
    { name: 'what a wonderful world', score: 0, player: "n/a" },
    { name: 'everlong', score: 0, player: "n/a" },
    { name: 'roar', score: 0, player: "n/a" },
    { name: 'gangster paradise', score: 0, player: "n/a" },
    { name: 'look at me now', score: 0, player: "n/a" }
    ];

  for(let song of songs){
    const newSong = new Song(song);
    newSong.save();
  }

  res.send('Database seeded!')
}
