type DustParticle = {
  x: number
  y: number
  restY: number
  velocityX: number
  velocityY: number
  size: number
  opacity: number
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value))

export const initTitleDust = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('.title-dust')
  const intro = document.querySelector<HTMLElement>('.intro')
  const divider = document.querySelector<HTMLElement>('.divider')
  const context = canvas?.getContext('2d')

  if (!canvas || !intro || !divider || !context) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const particles: DustParticle[] = []
  let canvasWidth = 0
  let canvasHeight = 0
  let particleColor = '#000'
  let minimumX = 0
  let maximumX = 0
  let animationFrame = 0
  let lastPointerX = Number.NaN
  let lastPointerY = Number.NaN
  let pointerX = -1_000
  let pointerY = -1_000
  let pointerVelocityX = 0
  let pointerVelocityY = 0
  let pointerActiveUntil = 0
  let particleLimit = 0
  let nextPassiveDeposit = performance.now() + 3_200
  let rollingOrbRatio = 0.5
  let rollingOrbX = 0
  let rollingOrbTargetX = 0
  let rollingOrbVelocity = 0

  const updateParticleColor = () => {
    particleColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--foreground')
      .trim() || '#000'
  }

  const getRestY = (restX: number, includeScatteredParticle = true) => {
    const usableWidth = Math.max(1, maximumX - minimumX)
    const horizontalRatio = (restX - minimumX) / usableWidth
    const pileEnvelope = canvasHeight * (0.075 + Math.pow(horizontalRatio, 1.9) * 0.22)
    const packedHeight = Math.pow(Math.random(), 2.4) * pileEnvelope
    const scatteredHeight = includeScatteredParticle && Math.random() < 0.14
      ? Math.pow(Math.random(), 2) * canvasHeight * 0.22
      : 0

    return canvasHeight - 1 - Math.min(
      canvasHeight * 0.46,
      packedHeight + scatteredHeight,
    )
  }

  const createParticles = () => {
    particles.length = 0
    const styles = getComputedStyle(intro)
    minimumX = Number.parseFloat(styles.paddingLeft) || 0
    maximumX = canvasWidth - (Number.parseFloat(styles.paddingRight) || 0)
    rollingOrbX = minimumX + rollingOrbRatio * Math.max(1, maximumX - minimumX)
    rollingOrbTargetX = rollingOrbX
    const usableWidth = Math.max(1, maximumX - minimumX)
    const particleCount = Math.round(clamp(usableWidth * 1.35, 450, 2_100))
    particleLimit = particleCount + 900

    for (let index = 0; index < particleCount; index += 1) {
      const horizontalSeed = Math.random()
      const biasedSeed = Math.random() < 0.38
        ? 1 - Math.pow(1 - horizontalSeed, 2.4)
        : horizontalSeed
      const restX = minimumX + biasedSeed * usableWidth
      const restY = getRestY(restX)
      const sizeSeed = Math.random()

      particles.push({
        x: restX,
        y: restY,
        restY,
        velocityX: 0,
        velocityY: 0,
        size: sizeSeed > 0.88 ? 2.4 : sizeSeed > 0.45 ? 1.7 : 1.15,
        opacity: 0.52 + Math.random() * 0.48,
      })
    }
  }

  const dropParticles = (
    originX: number,
    amount: number,
    spread: number,
    coverFullWidth = false,
  ) => {
    const availableSlots = Math.max(0, particleLimit - particles.length)
    const dropCount = Math.min(amount, availableSlots)
    const usableWidth = Math.max(1, maximumX - minimumX)

    for (let index = 0; index < dropCount; index += 1) {
      const startX = coverFullWidth
        ? minimumX + ((index + Math.random()) / dropCount) * usableWidth
        : clamp(
          originX + (Math.random() - 0.5) * spread * 1.5,
          minimumX,
          maximumX,
        )
      const restX = clamp(
        coverFullWidth
          ? startX + (Math.random() - 0.5) * spread * 0.55
          : originX + (Math.random() - 0.5) * spread * 2,
        minimumX,
        maximumX,
      )
      const restY = getRestY(restX, false)
      const sizeSeed = Math.random()

      particles.push({
        x: startX,
        y: 3 + Math.random() * Math.max(7, canvasHeight * 0.08),
        restY,
        velocityX: coverFullWidth
          ? (Math.random() - 0.5) * 0.34
          : (startX - originX) * 0.006 + (Math.random() - 0.5) * 0.34,
        velocityY: 0.08 + Math.random() * 0.2,
        size: sizeSeed > 0.88 ? 2.4 : sizeSeed > 0.45 ? 1.7 : 1.15,
        opacity: 0.58 + Math.random() * 0.42,
      })
    }
  }

  const drawParticles = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    context.fillStyle = particleColor

    particles.forEach((particle) => {
      context.globalAlpha = particle.opacity
      context.fillRect(
        Math.round(particle.x),
        Math.round(particle.y),
        particle.size,
        particle.size,
      )
    })

    context.globalAlpha = 1
  }

  const resizeCanvas = () => {
    const introBounds = intro.getBoundingClientRect()
    const dividerBounds = divider.getBoundingClientRect()
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    const nextWidth = introBounds.width
    const nextHeight = Math.max(72, dividerBounds.top - introBounds.top)
    const headerSizeIsUnchanged =
      Math.abs(nextWidth - canvasWidth) < 0.5
      && Math.abs(nextHeight - canvasHeight) < 0.5

    if (headerSizeIsUnchanged) return

    canvasWidth = nextWidth
    canvasHeight = nextHeight
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.width = Math.round(canvasWidth * pixelRatio)
    canvas.height = Math.round(canvasHeight * pixelRatio)
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    createParticles()
    drawParticles()
  }

  const moveParticles = (time: number) => {
    if (time >= nextPassiveDeposit) {
      dropParticles(
        minimumX + Math.random() * Math.max(1, maximumX - minimumX),
        3,
        42,
        true,
      )
      nextPassiveDeposit = time + 2_800 + Math.random() * 1_200
    }

    const isPointerActive = time < pointerActiveUntil
    const brushRadius = clamp(canvasWidth * 0.038, 34, 58)
    const pointerSpeed = clamp(Math.hypot(pointerVelocityX, pointerVelocityY), 0, 18)
    const previousOrbX = rollingOrbX
    rollingOrbX += (rollingOrbTargetX - rollingOrbX) * 0.32
    rollingOrbVelocity = rollingOrbX - previousOrbX
    const orbIsRolling = Math.abs(rollingOrbVelocity) > 0.025
    const orbRadius = 7.5
    const orbY = canvasHeight - orbRadius
    const orbInfluenceRadius = 18

    particles.forEach((particle) => {
      if (isPointerActive) {
        const distanceX = particle.x - pointerX
        const distanceY = particle.y - pointerY
        const distance = Math.hypot(distanceX, distanceY)

        if (distance < brushRadius) {
          const safeDistance = Math.max(distance, 0.5)
          const pressure = 1 - distance / brushRadius
          const push = pressure * (0.72 + pointerSpeed * 0.055)
          particle.velocityX += (distanceX / safeDistance) * push + pointerVelocityX * pressure * 0.055
          particle.velocityY += (distanceY / safeDistance) * push - pressure * 0.34
        }
      }

      if (orbIsRolling) {
        const distanceX = particle.x - rollingOrbX
        const distanceY = particle.y - orbY
        const distance = Math.hypot(distanceX, distanceY)

        if (distance < orbInfluenceRadius) {
          const safeDistance = Math.max(distance, 0.5)
          const pressure = 1 - distance / orbInfluenceRadius
          const movementDirection = Math.sign(rollingOrbVelocity)
          particle.velocityX += rollingOrbVelocity * pressure * 0.34
            + (distanceX / safeDistance) * pressure * 0.52
          particle.velocityY -= pressure * (0.42 + Math.abs(rollingOrbVelocity) * 0.13)
          particle.x += movementDirection * pressure * Math.min(2.2, Math.abs(rollingOrbVelocity) * 0.18)
        }
      }

      particle.velocityY += 0.045
      particle.velocityX *= 0.947
      particle.velocityY *= 0.982
      particle.x += particle.velocityX
      particle.y += particle.velocityY

      if (particle.y > particle.restY) {
        particle.y = particle.restY
        particle.velocityY *= -0.16
      }

      if (particle.x < minimumX || particle.x > maximumX) {
        particle.x = clamp(particle.x, minimumX, maximumX)
        particle.velocityX *= -0.28
      }
    })

    drawParticles()
    animationFrame = window.requestAnimationFrame(moveParticles)
  }

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect()
    const nextX = event.clientX - bounds.left
    const nextY = event.clientY - bounds.top

    if (nextX < 0 || nextX > bounds.width || nextY < 0 || nextY > bounds.height) {
      lastPointerX = Number.NaN
      lastPointerY = Number.NaN
      return
    }

    pointerVelocityX = Number.isNaN(lastPointerX) ? 0 : nextX - lastPointerX
    pointerVelocityY = Number.isNaN(lastPointerY) ? 0 : nextY - lastPointerY
    pointerX = nextX
    pointerY = nextY
    lastPointerX = nextX
    lastPointerY = nextY
    pointerActiveUntil = performance.now() + 110
  }

  const themeObserver = new MutationObserver(() => {
    updateParticleColor()
    if (reduceMotion) drawParticles()
  })

  updateParticleColor()
  resizeCanvas()
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  if (!reduceMotion) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    animationFrame = window.requestAnimationFrame(moveParticles)
  }

  const resizeObserver = new ResizeObserver(resizeCanvas)
  resizeObserver.observe(intro)
  resizeObserver.observe(divider)
  document.fonts.ready.then(resizeCanvas)

  const visitedMenus = new Set(['tab-introduce'])

  const dropFromElement = (element: HTMLElement) => {
    const visitKey = element.id || element.dataset.panel

    if (!visitKey || visitedMenus.has(visitKey)) return
    visitedMenus.add(visitKey)

    const canvasBounds = canvas.getBoundingClientRect()
    const elementBounds = element.getBoundingClientRect()
    const originX = elementBounds.left + elementBounds.width / 2 - canvasBounds.left

    dropParticles(originX, 22, 72, true)
    if (reduceMotion) {
      particles.slice(-22).forEach((particle) => {
        particle.y = particle.restY
      })
      drawParticles()
    }
  }

  const moveOrb = (positionRatio: number) => {
    rollingOrbRatio = clamp(positionRatio, 0, 1)
    rollingOrbTargetX = minimumX
      + rollingOrbRatio * Math.max(1, maximumX - minimumX)
  }

  window.addEventListener('pagehide', () => {
    window.cancelAnimationFrame(animationFrame)
    resizeObserver.disconnect()
    themeObserver.disconnect()
  }, { once: true })

  return { dropFromElement, moveOrb }
}
