import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'

const H = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Instant,
  },
})

fetch('/.netlify/functions/hello-world')
  .then((res) => res.json())
  .then(console.log)
