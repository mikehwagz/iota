// this is simple-input-events by matt deslauriers but i've replaced the node
// EventEmitter with mitt to shrink the bundled output significantly
// github for original package: https://github.com/mattdesl/simple-input-events

import mitt from 'mitt'

export default function(opt) {
  const {
    target = window,
    parent = window,
    tapDistanceThreshold = 0.05,
    tapDelay = 300,
    preventDefault = false,
    filtered = true,
  } = opt

  const emitter = mitt()

  let initialIdentifier
  let dragging = false
  let tapDistanceThresholdSq = tapDistanceThreshold * tapDistanceThreshold
  let lastTime
  let lastPosition
  let attached = false

  attach()

  emitter.enable = attach
  emitter.disable = detach

  return emitter

  function mousedown(event) {
    // mark the drag event as having started
    dragging = true
    const touch = getCurrentEvent(event)
    const result = createEvent(event, touch, target)
    lastPosition = result.position.slice()
    lastTime = Date.now()
    emitter.emit('down', result)
  }

  function mouseup(event) {
    const wasDragging = dragging
    const touch = getCurrentEvent(event)
    let valid = true
    if (
      filtered &&
      event.changedTouches &&
      (!touch || touch.identifier !== initialIdentifier)
    ) {
      // skip entirely if this touch doesn't match expected
      valid = false
    }
    if (touch && valid) {
      const result = createEvent(event, touch, target)
      initialIdentifier = null
      if (wasDragging || result.inside) {
        // If the interaction was or is inside, emit an event
        emitter.emit('up', result)
      }
      if (lastPosition != null) {
        const nowTime = Date.now()
        const delta = nowTime - lastTime
        const dist = squaredDistance(result.position, lastPosition)
        const bounds = getElementBounds(target)
        const hypot = Math.sqrt(
          bounds.width * bounds.width + bounds.height * bounds.height,
        )
        const normalizedDist = dist / hypot
        if (delta <= tapDelay && normalizedDist < tapDistanceThresholdSq) {
          emitter.emit('tap', result)
        }
        lastPosition = null
      }
      dragging = false
    }
  }

  function mousemove(event) {
    const touch = getCurrentEvent(event)
    if (touch) {
      // we didn't have an identifier and now we do
      if (filtered && event.changedTouches && touch.identifier != null) {
        const bounds = getElementBounds(target)
        if (isInsideBounds(touch, bounds)) {
          // ensure dragging is set to true
          dragging = true
        }
      }
      const result = createEvent(event, touch, target)
      if (dragging || result.inside) {
        emitter.emit('move', result)
      }
    }
  }

  function attach() {
    if (attached) return
    attached = true
    target.addEventListener('touchstart', mousedown)
    parent.addEventListener('touchend', mouseup)
    parent.addEventListener('touchmove', mousemove)

    target.addEventListener('mousedown', mousedown)
    parent.addEventListener('mouseup', mouseup)
    parent.addEventListener('mousemove', mousemove)

    if (preventDefault) {
      window.addEventListener('dragstart', preventDefaultEvent, {
        passive: false,
      })
      document.addEventListener('touchmove', preventDefaultEvent, {
        passive: false,
      })
    }
  }

  function detach() {
    if (!attached) return
    attached = false
    target.removeEventListener('touchstart', mousedown)
    parent.removeEventListener('touchend', mouseup)
    parent.removeEventListener('touchmove', mousemove)

    target.removeEventListener('mousedown', mousedown)
    parent.removeEventListener('mouseup', mouseup)
    parent.removeEventListener('mousemove', mousemove)

    if (preventDefault) {
      window.removeEventListener('dragstart', preventDefaultEvent, {
        passive: false,
      })
      document.removeEventListener('touchmove', preventDefaultEvent, {
        passive: false,
      })
    }
  }

  function preventDefaultEvent(ev) {
    ev.preventDefault()
    return false
  }

  function getCurrentEvent(event) {
    if (event.changedTouches) {
      const list = event.changedTouches
      if (filtered) {
        if (initialIdentifier == null) {
          // first time tracking, mark identifier
          const first = getFirstTargetTouch(list) || list[0]
          initialIdentifier = first.identifier
          return first
        } else {
          // identifier exists, try to get it
          return getTouch(list, initialIdentifier)
        }
      } else {
        return list[0]
      }
    } else {
      return event
    }
  }

  function getFirstTargetTouch(touches) {
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i]
      if (t.target === target) return t
    }
    return null
  }

  function getTouch(touches, id) {
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i]
      if (t.identifier === id) {
        return t
      }
    }
    return null
  }

  function createEvent(event, touch, target) {
    const bounds = getElementBounds(target)
    const position = getPosition(touch, target, bounds)
    return {
      dragging,
      touch,
      inside: isInsideBounds(touch, bounds),
      position,
      event,
    }
  }
}

function squaredDistance(a, b) {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return x * x + y * y
}

function isInsideBounds(event, bounds) {
  const { clientX, clientY } = event
  return (
    clientX >= bounds.left &&
    clientX < bounds.right &&
    clientY >= bounds.top &&
    clientY < bounds.bottom
  )
}

function getPosition(event, target, bounds) {
  const { clientX, clientY } = event
  const x = clientX - bounds.left
  const y = clientY - bounds.top
  return [x, y]
}

function getElementBounds(element) {
  if (element === window || element === document || element === document.body) {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else {
    return element.getBoundingClientRect()
  }
}
