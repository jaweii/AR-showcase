export async function getRatio(src) {
  const video = document.createElement('video')
  video.srcObject = src
  video.style.visibility = 'hidden'
  video.style.position = 'position'
  video.style.top = '-9999px'
  document.body.appendChild(video)
  await new Promise(resolve => video.onloadeddata = resolve)
  const { videoWidth, videoHeight } = video
  document.body.removeChild(video)
  return videoWidth / videoHeight
}