import { geoDistance, geoOrthographic, geoPath } from 'd3-geo'
import { mesh } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import landTopologyData from 'world-atlas/land-110m.json'

type GeoPoint = [longitude: number, latitude: number]

const landTopology = landTopologyData as unknown as Topology<{
  land: GeometryCollection
}>
const worldCoastline = mesh(landTopology, landTopology.objects.land)

const simplifyCoastlineRing = (ring: number[][], minimumDistance = 0.55) => {
  if (ring.length <= 4) return ring

  const simplified = [ring[0]]
  let previousPoint = ring[0]

  for (let index = 1; index < ring.length - 1; index += 1) {
    const point = ring[index]
    const rawLongitudeDistance = Math.abs(point[0] - previousPoint[0])
    const longitudeDistance = Math.min(rawLongitudeDistance, 360 - rawLongitudeDistance)
    const latitudeDistance = point[1] - previousPoint[1]

    if (Math.hypot(longitudeDistance, latitudeDistance) < minimumDistance) continue

    simplified.push(point)
    previousPoint = point
  }

  simplified.push(ring[ring.length - 1])
  return simplified.length >= 4 ? simplified : ring
}

const simplifiedWorldCoastline = {
  ...worldCoastline,
  coordinates: worldCoastline.coordinates.map((line) => simplifyCoastlineRing(line)),
}

type GlobeLocation = {
  name: string
  country: string
  coordinates: GeoPoint
  labelOffset: [number, number]
  markerOffset?: [number, number]
  visited: string
  places?: string
}

const globeLocations: GlobeLocation[] = [
  { name: 'Milan', country: 'Italy', coordinates: [9.19, 45.46], markerOffset: [0, -5], labelOffset: [8, -8], visited: 'May–early June 2026' },
  { name: 'Florence', country: 'Italy', coordinates: [11.26, 43.77], markerOffset: [-3, -1], labelOffset: [8, -2], visited: 'May–early June 2026' },
  { name: 'Tuscany', country: 'Italy', coordinates: [11.25, 43.35], markerOffset: [3, 1], labelOffset: [8, 6], visited: 'May–early June 2026' },
  { name: 'Rome', country: 'Italy', coordinates: [12.5, 41.9], markerOffset: [-2, 4], labelOffset: [8, 12], visited: 'May–early June 2026' },
  { name: 'Furore', country: 'Italy', coordinates: [14.54, 40.62], markerOffset: [3, 7], labelOffset: [8, 20], visited: 'May–early June 2026' },
  { name: 'Positano', country: 'Italy', coordinates: [14.49, 40.63], markerOffset: [-3, 10], labelOffset: [8, 28], visited: 'May–early June 2026' },
  { name: 'Florida', country: 'USA', coordinates: [-81.52, 27.66], labelOffset: [8, 20], visited: 'July 2025' },
  { name: 'Atlanta', country: 'USA', coordinates: [-84.39, 33.75], labelOffset: [8, 7], visited: 'December 2024' },
  { name: 'Baltimore', country: 'USA', coordinates: [-76.61, 39.29], labelOffset: [8, -4], visited: '2002 · 2007' },
  {
    name: 'Washington, D.C.',
    country: 'USA',
    coordinates: [-77.04, 38.91],
    labelOffset: [8, 12],
    visited: '2004 · 2013 · 2023 · 2024',
  },
  { name: 'New York', country: 'USA', coordinates: [-74.01, 40.71], labelOffset: [8, -20], visited: '2002 · 2007 · 2024' },
  { name: 'San Diego', country: 'USA', coordinates: [-117.16, 32.72], labelOffset: [8, 20], visited: '2007' },
  { name: 'Phoenix', country: 'USA', coordinates: [-112.07, 33.45], labelOffset: [8, 5], visited: 'December 2024' },
  { name: 'Grand Canyon', country: 'USA', coordinates: [-112.11, 36.11], labelOffset: [8, -13], visited: 'December 2024' },
  { name: 'Fukuoka', country: 'Japan', coordinates: [130.4, 33.59], labelOffset: [8, -7], visited: 'November 2024' },
]

const equatorLine = {
  type: 'LineString' as const,
  coordinates: Array.from({ length: 181 }, (_, index) => [-180 + index * 2, 0]),
}

const globeCanvas = document.querySelector<HTMLCanvasElement>('.traveling-globe')
const globeContext = globeCanvas?.getContext('2d') ?? null
const travelingPanelElement = globeCanvas?.closest<HTMLElement>('.traveling-panel') ?? null
const travelingVisual = document.querySelector<HTMLElement>('.traveling-visual')
const travelConnection = document.querySelector<SVGSVGElement>('.travel-connection')
const travelConnectionLine = document.querySelector<SVGLineElement>('.travel-connection__line')
const travelDetail = document.querySelector<HTMLElement>('.travel-detail')
const travelDetailName = document.querySelector<HTMLElement>('.travel-detail__name')
const travelDetailDate = document.querySelector<HTMLElement>('.travel-detail__date')
const travelDetailPlaces = document.querySelector<HTMLElement>('.travel-detail__places')
const travelDetailClose = document.querySelector<HTMLButtonElement>('.travel-detail__close')
const travelDetailAlbum = document.querySelector<HTMLButtonElement>('.travel-detail__album')
const travelAlbum = document.querySelector<HTMLElement>('.travel-album')
const travelAlbumBook = document.querySelector<HTMLElement>('.travel-album__book')
const travelAlbumPhoto = document.querySelector<HTMLElement>('.travel-album__photo')
const travelAlbumTitle = document.querySelector<HTMLElement>('.travel-album__title')
const travelAlbumDate = document.querySelector<HTMLElement>('.travel-album__date')
const travelAlbumPageCount = document.querySelector<HTMLElement>('.travel-album__page-count')
const travelAlbumNote = document.querySelector<HTMLTextAreaElement>('.travel-album__note')
const travelAlbumClose = document.querySelector<HTMLButtonElement>('.travel-album__close')
const travelAlbumPrevious = document.querySelector<HTMLButtonElement>('.travel-album__nav--previous')
const travelAlbumNext = document.querySelector<HTMLButtonElement>('.travel-album__nav--next')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let globeDisplaySize = 0
let globeRotation = 96
let globeVerticalRotation = 0
const maximumVerticalRotation = 30
let globeVelocity = 0
let globeVerticalVelocity = 0
let globeDragging = false
let previousPointerX = 0
let previousPointerY = 0
let previousPointerTime = 0
let pointerStartX = 0
let pointerStartY = 0
let pressedGlobeLocation: string | null = null
let inertiaFrame: number | null = null
let focusRotationFrame: number | null = null
let connectionFrame: number | null = null
let themeRedrawFrame: number | null = null
let limitFeedbackTimer: number | null = null
let lastLimitFeedback = 0
let hoveredGlobeLocation: string | null = null
let selectedGlobeLocation: string | null = null
let selectedProjectedPosition: [number, number] | null = null
let travelAlbumCloseTimer: number | null = null
let travelAlbumIsTurning = false
let activeTravelAlbumPage = 0
const totalTravelAlbumPages = 3
const travelAlbumNotes = new Map<string, string>()
let globeLocationHitAreas: Array<{
  name: string
  left: number
  right: number
  top: number
  bottom: number
  centerX: number
  centerY: number
}> = []

const findGlobeLocationAt = (clientX: number, clientY: number) => {
  if (!globeCanvas) return null

  const canvasRect = globeCanvas.getBoundingClientRect()
  const renderedScale = globeDisplaySize > 0 ? canvasRect.width / globeDisplaySize : 1
  const pointerX = (clientX - canvasRect.left) / renderedScale
  const pointerY = (clientY - canvasRect.top) / renderedScale

  return globeLocationHitAreas
    .filter((area) => (
      pointerX >= area.left
      && pointerX <= area.right
      && pointerY >= area.top
      && pointerY <= area.bottom
    ))
    .sort((first, second) => {
      const firstDistance = Math.hypot(pointerX - first.centerX, pointerY - first.centerY)
      const secondDistance = Math.hypot(pointerX - second.centerX, pointerY - second.centerY)
      return firstDistance - secondDistance
    })[0] ?? null
}

const updateTravelConnection = () => {
  connectionFrame = null

  if (
    !travelingVisual
    || !travelConnection
    || !travelConnectionLine
    || !travelDetail
    || !globeCanvas
    || !selectedGlobeLocation
    || !selectedProjectedPosition
  ) {
    travelConnectionLine?.classList.remove('is-visible')
    return
  }

  const visualRect = travelingVisual.getBoundingClientRect()
  const canvasRect = globeCanvas.getBoundingClientRect()
  const detailRect = travelDetail.getBoundingClientRect()
  const renderedScale = globeDisplaySize > 0 ? canvasRect.width / globeDisplaySize : 1
  const markerX = canvasRect.left - visualRect.left + selectedProjectedPosition[0] * renderedScale
  const markerY = canvasRect.top - visualRect.top + selectedProjectedPosition[1] * renderedScale
  const detailIsBelowGlobe = detailRect.top >= canvasRect.bottom - 4
  const endX = detailIsBelowGlobe
    ? detailRect.left - visualRect.left + detailRect.width / 2
    : detailRect.left - visualRect.left - 10
  const endY = detailIsBelowGlobe
    ? detailRect.top - visualRect.top - 10
    : detailRect.top - visualRect.top + Math.min(62, detailRect.height / 2)
  const connectionLength = Math.max(Math.hypot(endX - markerX, endY - markerY), 1)
  const markerEdgeOffset = Math.max(3.5, (globeDisplaySize / 150) * renderedScale)
  const startX = markerX + ((endX - markerX) / connectionLength) * markerEdgeOffset
  const startY = markerY + ((endY - markerY) / connectionLength) * markerEdgeOffset

  travelConnection.setAttribute('viewBox', `0 0 ${visualRect.width} ${visualRect.height}`)
  travelConnectionLine.setAttribute('x1', String(startX))
  travelConnectionLine.setAttribute('y1', String(startY))
  travelConnectionLine.setAttribute('x2', String(endX))
  travelConnectionLine.setAttribute('y2', String(endY))
  travelConnectionLine.classList.add('is-visible')
}

const scheduleTravelConnection = () => {
  if (connectionFrame !== null) window.cancelAnimationFrame(connectionFrame)
  connectionFrame = window.requestAnimationFrame(updateTravelConnection)
}

const drawGlobe = () => {
  if (!globeCanvas || !globeContext || globeDisplaySize <= 0) return

  const center = globeDisplaySize / 2
  const radius = globeDisplaySize * 0.455
  const globeLineWidth = Math.max(0.5, globeDisplaySize / 800)
  const lineColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--foreground')
    .trim() || '#000'
  const axisColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--muted')
    .trim() || '#929292'
  const travelingPanel = globeCanvas.closest<HTMLElement>('.traveling-panel')
  const globeFill = travelingPanel
    ? getComputedStyle(travelingPanel).backgroundColor
    : getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
  const visibleLocations: Array<{
    location: (typeof globeLocations)[number]
    x: number
    y: number
  }> = []
  const markerSeparationScale = Math.max(0.72, globeDisplaySize / 500)
  const projection = geoOrthographic()
    .translate([center, center])
    .scale(radius)
    .rotate([globeRotation, globeVerticalRotation, 0])
    .clipAngle(90)
    .precision(0.2)
  const globePath = geoPath(projection, globeContext)
  const sphere = { type: 'Sphere' } as const

  globeContext.clearRect(0, 0, globeDisplaySize, globeDisplaySize)
  globeContext.beginPath()
  globePath(sphere)
  globeContext.fillStyle = globeFill || '#fff'
  globeContext.fill()

  const northPole = projection([0, 90])
  const southPole = projection([0, -90])
  if (northPole && southPole) {
    globeContext.save()
    globeContext.beginPath()
    globeContext.moveTo(northPole[0], northPole[1])
    globeContext.lineTo(southPole[0], southPole[1])
    globeContext.strokeStyle = axisColor
    globeContext.lineWidth = globeLineWidth
    globeContext.setLineDash([2, 6])
    globeContext.stroke()
    globeContext.restore()
  }

  globeContext.save()
  globeContext.beginPath()
  globePath(equatorLine)
  globeContext.strokeStyle = axisColor
  globeContext.lineWidth = globeLineWidth
  globeContext.setLineDash([2, 6])
  globeContext.stroke()
  globeContext.restore()

  globeContext.strokeStyle = lineColor
  globeContext.lineWidth = globeLineWidth
  globeContext.lineCap = 'round'
  globeContext.lineJoin = 'round'

  globeContext.beginPath()
  globePath(simplifiedWorldCoastline)
  globeContext.stroke()

  selectedProjectedPosition = null
  const visibleCenter = projection.invert?.([center, center])
  globeLocations.forEach((location) => {
    if (!visibleCenter || geoDistance(location.coordinates, visibleCenter) > Math.PI / 2) return

    const projected = projection(location.coordinates)
    if (!projected) return

    const markerX = projected[0] + (location.markerOffset?.[0] ?? 0) * markerSeparationScale
    const markerY = projected[1] + (location.markerOffset?.[1] ?? 0) * markerSeparationScale
    visibleLocations.push({ location, x: markerX, y: markerY })
    if (location.name === selectedGlobeLocation) {
      selectedProjectedPosition = [markerX, markerY]
    }
  })

  const orderedLocations = [...visibleLocations].sort((first, second) => {
    const firstPriority = first.location.name === hoveredGlobeLocation
      ? 2
      : Number(first.location.name === selectedGlobeLocation)
    const secondPriority = second.location.name === hoveredGlobeLocation
      ? 2
      : Number(second.location.name === selectedGlobeLocation)
    return firstPriority - secondPriority
  })
  const baseDotRadius = Math.max(2.5, globeDisplaySize / 175)

  globeContext.beginPath()
  globePath(sphere)
  globeContext.strokeStyle = lineColor
  globeContext.lineWidth = globeLineWidth
  globeContext.stroke()

  const labelScale = Math.max(0.82, globeDisplaySize / 500)
  const baseLabelSize = Math.max(8, globeDisplaySize / 52)
  globeContext.textAlign = 'left'
  globeContext.textBaseline = 'middle'
  globeContext.lineJoin = 'round'
  globeLocationHitAreas = []

  orderedLocations.forEach(({ location, x, y }) => {
    const isHovered = location.name === hoveredGlobeLocation
    const isSelected = location.name === selectedGlobeLocation
    const labelSize = baseLabelSize * (isHovered ? 1.35 : isSelected ? 1.16 : 1)
    const labelX = x + location.labelOffset[0] * labelScale
    const labelY = y + location.labelOffset[1] * labelScale
    globeContext.font = `${labelSize}px "Space Mono", monospace`
    globeContext.lineWidth = Math.max(2.5, globeDisplaySize / 150)
    globeContext.strokeStyle = globeFill || '#fff'
    globeContext.strokeText(location.name, labelX, labelY)
    globeContext.fillStyle = lineColor
    globeContext.fillText(location.name, labelX, labelY)

    let labelWidth = globeContext.measureText(location.name).width
    let labelBottom = labelY + labelSize / 2

    if (isHovered) {
      const visitSize = baseLabelSize * 0.82
      const visitY = labelY + labelSize * 1.05
      globeContext.font = `${visitSize}px "Space Mono", monospace`
      globeContext.lineWidth = Math.max(2.5, globeDisplaySize / 150)
      globeContext.strokeStyle = globeFill || '#fff'
      globeContext.strokeText(location.visited, labelX, visitY)
      globeContext.fillStyle = lineColor
      globeContext.fillText(location.visited, labelX, visitY)
      labelWidth = Math.max(labelWidth, globeContext.measureText(location.visited).width)
      labelBottom = visitY + visitSize / 2
    }

    const hitPadding = 3
    globeLocationHitAreas.push({
      name: location.name,
      left: Math.min(x - baseDotRadius, labelX) - hitPadding,
      right: Math.max(x + baseDotRadius, labelX + labelWidth) + hitPadding,
      top: Math.min(y - baseDotRadius, labelY - labelSize / 2) - hitPadding,
      bottom: Math.max(y + baseDotRadius, labelBottom) + hitPadding,
      centerX: labelX + labelWidth / 2,
      centerY: labelY,
    })
  })

  globeContext.fillStyle = lineColor
  orderedLocations.forEach(({ location, x, y }) => {
    const isHovered = location.name === hoveredGlobeLocation
    const isSelected = location.name === selectedGlobeLocation
    globeContext.beginPath()
    globeContext.arc(
      x,
      y,
      baseDotRadius * (isHovered || isSelected ? 1.45 : 1),
      0,
      Math.PI * 2,
    )
    globeContext.fill()
  })

  scheduleTravelConnection()
}

const redrawGlobeDuringThemeTransition = () => {
  if (themeRedrawFrame !== null) window.cancelAnimationFrame(themeRedrawFrame)

  const transitionEndsAt = performance.now() + 260
  const redrawFrame = () => {
    drawGlobe()

    if (performance.now() < transitionEndsAt) {
      themeRedrawFrame = window.requestAnimationFrame(redrawFrame)
    } else {
      themeRedrawFrame = null
    }
  }

  themeRedrawFrame = window.requestAnimationFrame(redrawFrame)
}

const resizeGlobe = () => {
  if (!globeCanvas || !globeContext) return

  const nextSize = globeCanvas.clientWidth
  if (nextSize < 2) return

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  globeDisplaySize = nextSize
  globeCanvas.width = Math.round(nextSize * pixelRatio)
  globeCanvas.height = Math.round(nextSize * pixelRatio)
  globeContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  drawGlobe()
}

const stopGlobeInertia = () => {
  if (inertiaFrame !== null) {
    window.cancelAnimationFrame(inertiaFrame)
    inertiaFrame = null
  }
  if (focusRotationFrame !== null) {
    window.cancelAnimationFrame(focusRotationFrame)
    focusRotationFrame = null
  }
  globeVelocity = 0
  globeVerticalVelocity = 0
}

const rotateGlobeToLocation = (location: (typeof globeLocations)[number]) => {
  const startRotation = globeRotation
  const startVerticalRotation = globeVerticalRotation
  const rawTargetRotation = -location.coordinates[0]
  const shortestRotation = ((rawTargetRotation - startRotation + 540) % 360) - 180
  const targetRotation = startRotation + shortestRotation
  const targetVerticalRotation = Math.min(
    maximumVerticalRotation,
    Math.max(-maximumVerticalRotation, -location.coordinates[1]),
  )

  if (prefersReducedMotion.matches) {
    globeRotation = targetRotation
    globeVerticalRotation = targetVerticalRotation
    drawGlobe()
    return
  }

  const angularDistance = Math.hypot(
    shortestRotation,
    targetVerticalRotation - startVerticalRotation,
  )
  const duration = Math.min(900, Math.max(420, angularDistance * 5.5))
  const startedAt = performance.now()

  const animateRotation = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    globeRotation = startRotation + shortestRotation * easedProgress
    globeVerticalRotation = startVerticalRotation
      + (targetVerticalRotation - startVerticalRotation) * easedProgress
    drawGlobe()

    if (progress < 1) {
      focusRotationFrame = window.requestAnimationFrame(animateRotation)
    } else {
      focusRotationFrame = null
    }
  }

  focusRotationFrame = window.requestAnimationFrame(animateRotation)
}

const showVerticalLimitFeedback = (direction: 'top' | 'bottom') => {
  if (!globeCanvas || prefersReducedMotion.matches) return

  const now = performance.now()
  if (now - lastLimitFeedback < 75) return
  lastLimitFeedback = now

  if (limitFeedbackTimer !== null) window.clearTimeout(limitFeedbackTimer)
  globeCanvas.classList.remove('is-limit-top', 'is-limit-bottom')
  void globeCanvas.offsetWidth
  globeCanvas.classList.add(direction === 'top' ? 'is-limit-top' : 'is-limit-bottom')
  scheduleTravelConnection()

  limitFeedbackTimer = window.setTimeout(() => {
    globeCanvas.classList.remove('is-limit-top', 'is-limit-bottom')
    limitFeedbackTimer = null
    scheduleTravelConnection()
  }, 70)
}

const continueGlobeInertia = () => {
  if (
    globeDragging
    || (Math.abs(globeVelocity) < 0.01 && Math.abs(globeVerticalVelocity) < 0.01)
  ) {
    stopGlobeInertia()
    return
  }

  globeRotation += globeVelocity
  const attemptedVerticalRotation = globeVerticalRotation + globeVerticalVelocity
  const nextVerticalRotation = Math.min(
    maximumVerticalRotation,
    Math.max(-maximumVerticalRotation, attemptedVerticalRotation),
  )
  if (attemptedVerticalRotation > maximumVerticalRotation) showVerticalLimitFeedback('top')
  if (attemptedVerticalRotation < -maximumVerticalRotation) showVerticalLimitFeedback('bottom')
  if (
    nextVerticalRotation === maximumVerticalRotation
    || nextVerticalRotation === -maximumVerticalRotation
  ) {
    globeVerticalVelocity = 0
  }
  globeVerticalRotation = nextVerticalRotation
  globeVelocity *= 0.982
  globeVerticalVelocity *= 0.982
  drawGlobe()
  inertiaFrame = window.requestAnimationFrame(continueGlobeInertia)
}

const selectGlobeLocation = (locationName: string, bringIntoView = true) => {
  const location = globeLocations.find((item) => item.name === locationName)
  if (!location || !travelingVisual || !travelDetailName || !travelDetailDate || !travelDetailPlaces) return

  stopGlobeInertia()
  if (bringIntoView) {
    rotateGlobeToLocation(location)
  }
  selectedGlobeLocation = location.name
  hoveredGlobeLocation = location.name
  travelDetailName.textContent = `${location.country} - ${location.name}`
  travelDetailDate.textContent = location.visited
  travelDetailPlaces.textContent = location.places ?? ''
  travelDetailPlaces.hidden = !location.places
  travelingVisual.classList.add('has-selection')
  drawGlobe()
  scheduleTravelConnection()
}

const closeTravelDetail = () => {
  selectedGlobeLocation = null
  selectedProjectedPosition = null
  travelingVisual?.classList.remove('has-selection')
  travelConnectionLine?.classList.remove('is-visible')
  drawGlobe()
}

travelDetailClose?.addEventListener('click', closeTravelDetail)

const getTravelAlbumNoteKey = () => (
  selectedGlobeLocation ? `${selectedGlobeLocation}::${activeTravelAlbumPage}` : null
)

const saveTravelAlbumNote = () => {
  const noteKey = getTravelAlbumNoteKey()
  if (noteKey && travelAlbumNote) travelAlbumNotes.set(noteKey, travelAlbumNote.value)
}

const renderTravelAlbumPage = () => {
  const noteKey = getTravelAlbumNoteKey()
  const pageLayouts = ['full', 'collage', 'split'] as const
  const imageCounts = [1, 4, 3]
  const activeLayout = pageLayouts[activeTravelAlbumPage]

  if (travelAlbumPhoto) {
    travelAlbumPhoto.className = `travel-album__photo travel-album__photo--${activeLayout}`
    travelAlbumPhoto.innerHTML = Array.from(
      { length: imageCounts[activeTravelAlbumPage] },
      () => '<span class="travel-album__image-placeholder">image</span>',
    ).join('')
  }
  if (travelAlbumPageCount) {
    travelAlbumPageCount.textContent = `${String(activeTravelAlbumPage + 1).padStart(2, '0')} / ${String(totalTravelAlbumPages).padStart(2, '0')}`
  }
  if (travelAlbumNote) travelAlbumNote.value = noteKey ? travelAlbumNotes.get(noteKey) ?? '' : ''
}

const turnTravelAlbumPage = (direction: -1 | 1) => {
  if (!travelAlbumBook || travelAlbumIsTurning || travelAlbum?.hidden) return

  saveTravelAlbumNote()
  travelAlbumIsTurning = true
  travelAlbumBook.classList.add(direction < 0 ? 'is-turning-up' : 'is-turning-down')

  window.setTimeout(() => {
    activeTravelAlbumPage = (
      activeTravelAlbumPage + direction + totalTravelAlbumPages
    ) % totalTravelAlbumPages
    renderTravelAlbumPage()
  }, 130)

  window.setTimeout(() => {
    travelAlbumBook.classList.remove('is-turning-up', 'is-turning-down')
    travelAlbumIsTurning = false
  }, 280)
}

const openTravelAlbum = () => {
  if (
    !selectedGlobeLocation
    || !travelAlbum
    || !travelAlbumTitle
    || !travelAlbumDate
    || !travelAlbumNote
  ) return

  const location = globeLocations.find((item) => item.name === selectedGlobeLocation)
  if (!location) return

  if (travelAlbumCloseTimer !== null) {
    window.clearTimeout(travelAlbumCloseTimer)
    travelAlbumCloseTimer = null
  }

  travelAlbumTitle.textContent = `${location.country} - ${location.name}`
  travelAlbumDate.textContent = location.visited
  activeTravelAlbumPage = 0
  renderTravelAlbumPage()
  travelAlbum.hidden = false
  document.body.classList.add('travel-album-open')

  window.requestAnimationFrame(() => {
    travelAlbum.classList.add('is-open')
    travelAlbumClose?.focus({ preventScroll: true })
  })
}

const closeTravelAlbum = () => {
  if (!travelAlbum || travelAlbum.hidden) return

  saveTravelAlbumNote()

  travelAlbum.classList.remove('is-open')
  document.body.classList.remove('travel-album-open')
  travelAlbumCloseTimer = window.setTimeout(() => {
    travelAlbum.hidden = true
    travelAlbumCloseTimer = null
    travelDetailAlbum?.focus({ preventScroll: true })
  }, 220)
}

travelDetailAlbum?.addEventListener('click', openTravelAlbum)
travelAlbumClose?.addEventListener('click', closeTravelAlbum)
travelAlbumPrevious?.addEventListener('click', () => turnTravelAlbumPage(-1))
travelAlbumNext?.addEventListener('click', () => turnTravelAlbumPage(1))
travelAlbumNote?.addEventListener('input', () => {
  const noteKey = getTravelAlbumNoteKey()
  if (noteKey) travelAlbumNotes.set(noteKey, travelAlbumNote.value)
})
travelAlbum?.addEventListener('click', (event) => {
  if (event.target === travelAlbum) closeTravelAlbum()
})
document.addEventListener('click', (event) => {
  if (
    !selectedGlobeLocation
    || travelingPanelElement?.hidden
    || (travelAlbum && !travelAlbum.hidden)
    || !(event.target instanceof Element)
  ) return

  if (event.target.closest('.travel-detail, [data-globe-location], .traveling-globe')) return
  closeTravelDetail()
})
document.addEventListener('keydown', (event) => {
  if (!travelAlbum || travelAlbum.hidden) return

  if (event.key === 'Escape') closeTravelAlbum()
  if (event.key === 'ArrowUp') turnTravelAlbumPage(-1)
  if (event.key === 'ArrowDown') turnTravelAlbumPage(1)
  if (['ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault()
})

document.querySelectorAll<HTMLButtonElement>('[data-globe-location]').forEach((locationButton) => {
  locationButton.addEventListener('click', () => {
    const locationName = locationButton.dataset.globeLocation
    if (locationName) selectGlobeLocation(locationName, true)
  })
})

globeCanvas?.addEventListener('pointerdown', (event) => {
  stopGlobeInertia()
  pressedGlobeLocation = findGlobeLocationAt(event.clientX, event.clientY)?.name ?? null
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  hoveredGlobeLocation = null
  globeDragging = true
  previousPointerX = event.clientX
  previousPointerY = event.clientY
  previousPointerTime = performance.now()
  globeCanvas.setPointerCapture(event.pointerId)
  globeCanvas.classList.remove('has-hovered-location')
  globeCanvas.classList.add('is-dragging')
  drawGlobe()
})

globeCanvas?.addEventListener('pointermove', (event) => {
  if (!globeDragging) {
    const hoveredArea = findGlobeLocationAt(event.clientX, event.clientY)
    const nextHoveredLocation = hoveredArea?.name ?? null

    if (nextHoveredLocation !== hoveredGlobeLocation) {
      hoveredGlobeLocation = nextHoveredLocation
      globeCanvas.classList.toggle('has-hovered-location', hoveredGlobeLocation !== null)
      drawGlobe()
    }
    return
  }

  const canvasRect = globeCanvas.getBoundingClientRect()
  const globeCenterX = canvasRect.left + canvasRect.width / 2
  const globeCenterY = canvasRect.top + canvasRect.height / 2
  const globeRadius = Math.min(canvasRect.width, canvasRect.height) * 0.455
  const pointerDistanceFromCenter = Math.hypot(
    event.clientX - globeCenterX,
    event.clientY - globeCenterY,
  )

  if (pointerDistanceFromCenter > globeRadius) {
    releaseGlobe(event)
    return
  }

  const now = performance.now()
  const horizontalDistance = event.clientX - previousPointerX
  const verticalDistance = event.clientY - previousPointerY
  const elapsed = Math.max(now - previousPointerTime, 8)
  globeRotation += horizontalDistance * 0.42
  const attemptedVerticalRotation = globeVerticalRotation - verticalDistance * 0.36
  if (attemptedVerticalRotation > maximumVerticalRotation) showVerticalLimitFeedback('top')
  if (attemptedVerticalRotation < -maximumVerticalRotation) showVerticalLimitFeedback('bottom')
  globeVerticalRotation = Math.min(
    maximumVerticalRotation,
    Math.max(-maximumVerticalRotation, attemptedVerticalRotation),
  )
  globeVelocity = (horizontalDistance / elapsed) * 12
  globeVerticalVelocity = (-verticalDistance / elapsed) * 10
  previousPointerX = event.clientX
  previousPointerY = event.clientY
  previousPointerTime = now
  drawGlobe()
})

globeCanvas?.addEventListener('pointerleave', () => {
  if (globeDragging || hoveredGlobeLocation === null) return

  hoveredGlobeLocation = null
  globeCanvas.classList.remove('has-hovered-location')
  drawGlobe()
})

const releaseGlobe = (event: PointerEvent) => {
  if (!globeDragging || !globeCanvas) return

  globeDragging = false
  globeCanvas.classList.remove('is-dragging')
  if (globeCanvas.hasPointerCapture(event.pointerId)) {
    globeCanvas.releasePointerCapture(event.pointerId)
  }

  const pointerTravel = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY)
  const clickedLocation = pointerTravel < 6 ? pressedGlobeLocation : null
  pressedGlobeLocation = null

  if (clickedLocation) {
    selectGlobeLocation(clickedLocation, true)
    return
  }

  if (pointerTravel < 6 && selectedGlobeLocation) {
    closeTravelDetail()
    return
  }

  if (
    !prefersReducedMotion.matches
    && (Math.abs(globeVelocity) >= 0.01 || Math.abs(globeVerticalVelocity) >= 0.01)
  ) {
    inertiaFrame = window.requestAnimationFrame(continueGlobeInertia)
  }
}

globeCanvas?.addEventListener('pointerup', releaseGlobe)
globeCanvas?.addEventListener('pointercancel', releaseGlobe)
globeCanvas?.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return

  event.preventDefault()
  stopGlobeInertia()
  if (event.key === 'ArrowLeft') globeRotation -= 8
  if (event.key === 'ArrowRight') globeRotation += 8
  if (event.key === 'ArrowUp') {
    const attemptedVerticalRotation = globeVerticalRotation + 8
    if (attemptedVerticalRotation > maximumVerticalRotation) showVerticalLimitFeedback('top')
    globeVerticalRotation = Math.min(maximumVerticalRotation, attemptedVerticalRotation)
  }
  if (event.key === 'ArrowDown') {
    const attemptedVerticalRotation = globeVerticalRotation - 8
    if (attemptedVerticalRotation < -maximumVerticalRotation) showVerticalLimitFeedback('bottom')
    globeVerticalRotation = Math.max(-maximumVerticalRotation, attemptedVerticalRotation)
  }
  drawGlobe()
})

if (globeCanvas) {
  new ResizeObserver(resizeGlobe).observe(globeCanvas)
  window.addEventListener('resize', resizeGlobe)
  globeCanvas.closest('.globe-shell')?.addEventListener('transitionend', scheduleTravelConnection)
  document.fonts.ready.then(drawGlobe)
  new MutationObserver(redrawGlobeDuringThemeTransition).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
}

