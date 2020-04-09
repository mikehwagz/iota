import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import overlay from '@/components/overlay'
import overlayMask from '@/components/overlayMask'
import overlayLetters from '@/components/overlayLetters'
import secrets from '@/components/secrets'
import flag from '@/components/flag'
import video from '@/components/video'

const components = {
  overlay,
  overlayMask,
  overlayLetters,
  secrets,
  flag,
  video,
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
