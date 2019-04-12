module.exports = function(app) {
  const lyric = require('../controllers/lyricController');

  app.route('/lyrics')
    .get(lyric.get_lyrics)

  app.route('/lyrics/seeds')
    .get(lyric.seed_lyrics);

};
