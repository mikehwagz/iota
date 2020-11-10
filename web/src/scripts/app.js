import { picoapp } from '@/lib/picoapp'
import { size } from '@selfaware/martha'

import overlay from '@/components/overlay'
import overlayMask from '@/components/overlayMask'
import overlayLetters from '@/components/overlayLetters'
import overlayBorders from '@/components/overlayBorders'
import secrets from '@/components/secrets'
import flag from '@/components/flag'
import video from '@/components/video'
import smooth from '@/components/smooth'
import newsletter from '@/components/newsletter'

const components = {
  overlay,
  overlayMask,
  overlayLetters,
  overlayBorders,
  secrets,
  flag,
  video,
  smooth,
  newsletter,
}

const state = {
  ...size(),
  index: -1,
  sx: 0,
  sy: 0,
  dx: 0,
  dy: 0,
  min: null,
  ease: 0.2,
  paused: false,
}

export default picoapp(components, state)
