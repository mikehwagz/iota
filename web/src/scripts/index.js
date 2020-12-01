import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'

export const router = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Instant,
  },
})
