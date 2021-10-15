import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'
import ToDetail from '@/transitions/ToDetail'

export const router = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Instant,
    contextual: {
      toDetail: ToDetail,
    },
  },
})
