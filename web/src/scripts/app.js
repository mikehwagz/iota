import { picoapp } from 'picoapp'
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
import productThumb from '@/components/productThumb'
import productForm from '@/components/productForm'
import bag from '@/components/bag'
import bagCount from '@/components/bagCount'

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
  productThumb,
  productForm,
  bag,
  bagCount,
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
  checkout: { lineItems: [] },
}

export default picoapp(components, state)
