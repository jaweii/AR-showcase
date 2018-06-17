import clmtrackr from 'clmtrackr'

const Tracker = { onLoop: () => { } }
export default Tracker

const trackr = new clmtrackr.tracker
const WIDTH = 400, HEIGHT = 300

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement('video')
    video.srcObject = stream
    video.style.transform = 'scaleX(-1)'
    video.style.position = 'fixed'
    video.style.bottom = '10px'
    video.style.right = '10px'
    video.style.transform = 'scale(0.2)'
    // video.style.visibility = 'hidden'
    // video.style.top = '-9999px'
    video.width = WIDTH
    video.height = HEIGHT
    video.play()
    document.body.appendChild(video)
    return new Promise(r => video.onloadedmetadata = _ => r(video))
  })
  .then(video => {
    trackr.init()
    trackr.start(video)
    positionLoop()
  })
  .catch(console.error)

let center = { x: 0, y: 0 }
let isFirst = true
function positionLoop() {
  requestAnimationFrame(positionLoop)
  const positions = trackr.getCurrentPosition()
  if (!positions) return
  let [x, y] = positions[41]
  x = -x
  if (isFirst) {
    isFirst = false
    center = { x, y }
    return
  }
  Tracker.onLoop(x - center.x, y - center.y)
}

