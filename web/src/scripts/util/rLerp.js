import { lerp, round } from '@selfaware/martha'

export default function rLerp(c, t, e, p = 1000, f = 0.0001) {
  let v = round(lerp(c, t, e), p)

  let d = v - t
  if (d < 0) d *= -1
  if (d < f) v = t

  return v
}
