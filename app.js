const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
require("./models/lyricModel")
require("./models/songModel")

const cors = require('cors');
app.use(cors({ credentials: true, origin: true }));

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hliutongco:%40Silencer3@helencluster-lfpcv.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const lyricRoutes = require('./routes/lyricRoutes'); //importing route
const songRoutes = require('./routes/songRoutes'); //importing route

lyricRoutes(app); //register the route
songRoutes(app); //register the route

function helper(req, res, path){
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

app.get('/waww-video', function(req, res) {
  const path = 'video/what-a-wonderful-world.mp4'
  helper(req, res, path)
})

app.get('/everlong-video', function(req, res) {
  const path = 'video/everlong.mp4'
  helper(req, res, path)
})

app.get('/roar-video', function(req, res) {
  const path = 'video/Roar.mp4'
  helper(req, res, path)
})

app.get('/gangster-video', function(req, res) {
  const path = 'video/gangster.mp4'
  helper(req, res, path)
})

app.get('/busta-video', function(req, res) {
  const path = 'video/busta.mp4'
  helper(req, res, path)
})

app.get('/waww-mp3', function(req, res) {
  const path = 'mp3s/what-a-wonderful-world.mp3'
  helper(req, res, path)
})

app.get('/everlong-mp3', function(req, res) {
  const path = 'mp3s/everlong.mp3'
  helper(req, res, path)
})

app.get('/roar-mp3', function(req, res) {
  const path = 'mp3s/roar.mp3'
  helper(req, res, path)
})

app.get('/gangster-mp3', function(req, res) {
  const path = 'mp3s/gangster.mp3'
  helper(req, res, path)
})

app.get('/busta-mp3', function(req, res) {
  const path = 'mp3s/busta.wav'
  helper(req, res, path)
})



server.listen(process.env.PORT || 3000)
