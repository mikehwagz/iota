export function loadVideo(src) {
  return fetch(src)
    .then((res) => res.blob())
    .then(URL.createObjectURL)
}
