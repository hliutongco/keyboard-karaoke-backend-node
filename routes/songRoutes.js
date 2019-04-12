module.exports = function(app) {
  const song = require('../controllers/songController');

  app.route('/songs')
    .get(song.get_songs)

  app.route('/songs/seeds')
    .get(song.seed_songs);

  app.route('/songs/:songId')
    .put(song.update_song)
};
