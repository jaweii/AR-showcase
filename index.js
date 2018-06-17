import 'babel-polyfill'
import Tracker from './tracker.js'
Tracker.onLoop = (deltaX, deltaY) => {
  const x = deltaX.toFixed(2)
  const y = deltaY.toFixed(2)
  let transform = 'perspective(100px)'
  transform += `rotateX(${y}deg)`
  transform += `rotateY(${x}deg)`
  transform += 'scale3d(1,1,1)'
  const el = document.querySelector('.container')
  el.style.transform = transform
}