import './style.css'
import { geoDistance, geoOrthographic, geoPath } from 'd3-geo'
import { mesh } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import landTopologyData from 'world-atlas/land-110m.json'
import { initTitleDust } from './titleDust'

const titleSurfaceEffectsEnabled = false
const cornerVerseEnabled = false

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="intro${titleSurfaceEffectsEnabled ? '' : ' title-surface-effects-off'}">
    <canvas class="title-dust" aria-hidden="true"></canvas>
    <div class="brand">
      <h1 aria-label="Wanseo's portfolio">
        <span class="brand-highlight" data-hover-text="Wanseo's">Wanseo's</span>
        <span class="brand-highlight" data-hover-text="portfolio">portfolio</span>
      </h1>
      <p class="role brand-highlight" data-hover-text="Designer &amp; Developer">Designer &amp; Developer</p>
    </div>
    <div class="theme-control">
      <div class="theme-labels" aria-hidden="true">
        <span>light</span>
        <span>dark</span>
      </div>
      <button
        class="theme-toggle"
        type="button"
        role="switch"
        aria-checked="false"
        aria-label="Switch to dark mode"
      >
        <span class="theme-toggle__thumb"></span>
      </button>
    </div>
    <div class="divider">
      <input
        class="divider-orb"
        type="range"
        min="0"
        max="100"
        step="1"
        value="50"
        aria-label="Roll the circle along the divider"
        aria-valuetext="50% along the divider"
      >
    </div>
    <nav class="menu" aria-label="Portfolio navigation" role="tablist">
      <a class="active" id="tab-introduce" href="#introduce" role="tab" aria-selected="true" aria-controls="introduce" data-panel="introduce">introduce myself</a>
      <a id="tab-work" href="#work" role="tab" aria-selected="false" aria-controls="work" data-panel="work">work</a>
      <a id="tab-beauty" href="#beauty" role="tab" aria-selected="false" aria-controls="beauty" data-panel="beauty">the beauty</a>
      <a id="tab-material" href="#material" role="tab" aria-selected="false" aria-controls="material" data-panel="material">material research</a>
      <a id="tab-traveling" href="#traveling" role="tab" aria-selected="false" aria-controls="traveling" data-panel="traveling">traveling</a>
      <a id="tab-bookshelf" href="#bookshelf" role="tab" aria-selected="false" aria-controls="bookshelf" data-panel="bookshelf">bookshelf</a>
      <a id="tab-drawing" href="#drawing" role="tab" aria-selected="false" aria-controls="drawing" data-panel="drawing">drawing</a>
      <a id="tab-shop" href="#shop" role="tab" aria-selected="false" aria-controls="shop" data-panel="shop">shop</a>
      <a id="tab-contact" href="#contact" role="tab" aria-selected="false" aria-controls="contact" data-panel="contact">contact</a>
    </nav>
    <section class="portfolio-panel introduce" id="introduce" role="tabpanel" aria-labelledby="tab-introduce">
      <h2 class="visually-hidden" id="introduce-title">Introduce myself</h2>
      <svg class="connection-lines" aria-hidden="true">
        <line class="connection-line" />
      </svg>
      <div class="image-board" aria-label="Introduction image board">
        <figure class="board-image board-image--1" data-note="1" tabindex="0">
          <div class="image-placeholder">image 01</div>
          <figcaption>01</figcaption>
        </figure>
        <figure class="board-image board-image--2" data-note="2" tabindex="0">
          <div class="image-placeholder">image 02</div>
          <figcaption>02</figcaption>
        </figure>
        <figure class="board-image board-image--3" data-note="3" tabindex="0">
          <div class="image-placeholder">image 03</div>
          <figcaption>03</figcaption>
        </figure>
        <figure class="board-image board-image--4" data-note="4" tabindex="0">
          <div class="image-placeholder">image 04</div>
          <figcaption>04</figcaption>
        </figure>
        <figure class="board-image board-image--5" data-note="5" tabindex="0">
          <div class="image-placeholder">image 05</div>
          <figcaption>05</figcaption>
        </figure>
        <figure class="board-image board-image--6" data-note="6" tabindex="0">
          <div class="image-placeholder">image 06</div>
          <figcaption>06</figcaption>
        </figure>
      </div>
      <ol class="introduce-notes">
        <li data-note="1">
          <span class="note-number">01</span>
          <div><h3>Who I am</h3><p>A designer and developer who enjoys turning ideas into clear visual experiences.</p></div>
        </li>
        <li data-note="2">
          <span class="note-number">02</span>
          <div><h3>How I think</h3><p>I observe small details, organize them, and look for a simple direction.</p></div>
        </li>
        <li data-note="3">
          <span class="note-number">03</span>
          <div><h3>What I make</h3><p>I build identities, interfaces, and interactive moments for the screen.</p></div>
        </li>
        <li data-note="4">
          <span class="note-number">04</span>
          <div><h3>What inspires me</h3><p>Everyday scenes, books, conversations, and unexpected visual rhythms.</p></div>
        </li>
        <li data-note="5">
          <span class="note-number">05</span>
          <div><h3>My process</h3><p>Research, collect, sketch, test, and refine until the idea feels natural.</p></div>
        </li>
        <li data-note="6">
          <span class="note-number">06</span>
          <div><h3>Let’s connect</h3><p>I am always open to thoughtful collaborations and new perspectives.</p></div>
        </li>
      </ol>
    </section>
    <section class="portfolio-panel work-panel" id="work" role="tabpanel" aria-labelledby="tab-work" hidden>
      <div class="work-grid">
        <article class="work-card">
          <div class="work-card__media">project image 01</div>
          <div class="work-card__body">
            <span class="work-card__number">01</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>IDENTITY · WEB · INTERACTION</span><span aria-hidden="true">↗</span>
          </div>
        </article>
        <article class="work-card">
          <div class="work-card__media">project image 02</div>
          <div class="work-card__body">
            <span class="work-card__number">02</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>GRAPHIC · MOTION · DIGITAL</span><span aria-hidden="true">↗</span>
          </div>
        </article>
        <article class="work-card">
          <div class="work-card__media">project image 03</div>
          <div class="work-card__body">
            <span class="work-card__number">03</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>EDITORIAL · TYPE · CREATIVE</span><span aria-hidden="true">↗</span>
          </div>
        </article>
        <article class="work-card">
          <div class="work-card__media">project image 04</div>
          <div class="work-card__body">
            <span class="work-card__number">04</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>BRANDING · SYSTEM · STRATEGY</span><span aria-hidden="true">↗</span>
          </div>
        </article>
        <article class="work-card">
          <div class="work-card__media">project image 05</div>
          <div class="work-card__body">
            <span class="work-card__number">05</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>OBJECT · RESEARCH · EXPERIENCE</span><span aria-hidden="true">↗</span>
          </div>
        </article>
        <article class="work-card">
          <div class="work-card__media">project image 06</div>
          <div class="work-card__body">
            <span class="work-card__number">06</span>
            <h2>Project title</h2>
            <p>Add a short description of the project, its purpose, and the experience you created.</p>
          </div>
          <div class="work-card__footer">
            <span>ART DIRECTION · IMAGE · SPACE</span><span aria-hidden="true">↗</span>
          </div>
        </article>
      </div>
    </section>
    <section class="portfolio-panel bookshelf-panel" id="bookshelf" role="tabpanel" aria-labelledby="tab-bookshelf" hidden>
      <div class="bookshelf-layout">
        <div class="bookshelf-grid" aria-label="Bookshelf">
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="0" aria-label="Open reading note for book 01">
              <span class="bookshelf-book__cover">cover image 01</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="1" aria-label="Open reading note for book 02">
              <span class="bookshelf-book__cover">cover image 02</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="2" aria-label="Open reading note for book 03">
              <span class="bookshelf-book__cover">cover image 03</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="3" aria-label="Open reading note for book 04">
              <span class="bookshelf-book__cover">cover image 04</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="4" aria-label="Open reading note for book 05">
              <span class="bookshelf-book__cover">cover image 05</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="5" aria-label="Open reading note for book 06">
              <span class="bookshelf-book__cover">cover image 06</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="6" aria-label="Open reading note for book 07">
              <span class="bookshelf-book__cover">cover image 07</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="7" aria-label="Open reading note for book 08">
              <span class="bookshelf-book__cover">cover image 08</span>
            </button>
          </article>
          <article class="bookshelf-book">
            <button class="bookshelf-book__button" type="button" data-book-index="8" aria-label="Open reading note for book 09">
              <span class="bookshelf-book__cover">cover image 09</span>
            </button>
          </article>
        </div>
        <aside class="bookshelf-note" aria-live="polite" hidden>
          <header class="bookshelf-note__header">
            <span>reading note</span>
            <button class="bookshelf-note__close" type="button">close</button>
          </header>
          <div class="bookshelf-note__book">
            <span class="bookshelf-note__number"></span>
            <h2 class="bookshelf-note__title"></h2>
            <p class="bookshelf-note__author"></p>
          </div>
          <section class="bookshelf-note__section">
            <h3>Good passages</h3>
            <div class="bookshelf-note__quotes"></div>
          </section>
          <section class="bookshelf-note__section">
            <h3>What I felt</h3>
            <p class="bookshelf-note__reflection"></p>
          </section>
        </aside>
      </div>
    </section>
    <section class="portfolio-panel beauty-panel" id="beauty" role="tabpanel" aria-labelledby="tab-beauty" hidden>
      <div class="beauty-grid">
        <article class="beauty-card">
          <header><span>01</span><span>an ordinary pattern</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 01</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Write a short note about the pattern, detail, or feeling that caught your attention.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>02</span><span>light and distance</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 02</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Write down how the light, shadow, and distance changed the way you saw this scene.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>03</span><span>unexpected color</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 03</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Describe the colors and the unexpected relationship that made you stop for a moment.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>04</span><span>quiet structure</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 04</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Record the balance, rhythm, or structure that makes this object feel quietly complete.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>05</span><span>a small gesture</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 05</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Write about the small human gesture or trace that gives this moment its warmth.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>06</span><span>collected memory</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 06</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Keep a note about the memory, place, or emotion that you want to return to later.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>07</span><span>surface and time</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 07</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Write about the marks, textures, and traces of time that make this surface feel alive.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>08</span><span>repeated rhythm</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 08</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Record how repetition, spacing, or a subtle change creates a rhythm worth remembering.</p><span class="punch-holes" aria-hidden="true"><i></i><i></i><i></i></span></div>
          </div>
        </article>
        <article class="beauty-card">
          <header><span>09</span><span>a passing moment</span></header>
          <div class="beauty-card__spread">
            <div class="beauty-card__image">image 09</div>
            <div class="beauty-card__note"><h2>Why it feels beautiful</h2><p>Keep the fleeting detail, atmosphere, or emotion that made this ordinary moment feel special.</p></div>
          </div>
        </article>
      </div>
    </section>
    <section class="portfolio-panel empty-panel" id="drawing" role="tabpanel" aria-labelledby="tab-drawing" hidden>
    </section>
    <section class="portfolio-panel traveling-panel" id="traveling" role="tabpanel" aria-labelledby="tab-traveling" hidden>
      <div class="space-stars" aria-hidden="true"></div>
      <div class="traveling-stage">
        <p class="traveling-kicker">spin the world</p>
        <aside class="globe-legend" aria-label="Places Wanseo has visited">
          <p class="globe-legend__title"><span aria-hidden="true"></span>Places Wanseo has visited</p>
          <div class="globe-legend__groups">
            <section>
              <h2>North America</h2>
              <p>
                <button type="button" data-globe-location="Florida">Florida</button> ·
                <button type="button" data-globe-location="Baltimore">Baltimore</button> ·
                <button type="button" data-globe-location="Washington, D.C.">Washington, D.C.</button> ·
                <button type="button" data-globe-location="New York">New York</button> ·
                <button type="button" data-globe-location="San Diego">San Diego</button> ·
                <button type="button" data-globe-location="Phoenix">Phoenix</button> ·
                <button type="button" data-globe-location="Atlanta">Atlanta</button> ·
                <button type="button" data-globe-location="Grand Canyon">Grand Canyon</button>
              </p>
            </section>
            <section>
              <h2>Europe</h2>
              <p>
                Italy —
                <button type="button" data-globe-location="Rome">Rome</button> ·
                <button type="button" data-globe-location="Florence">Florence</button> ·
                <button type="button" data-globe-location="Tuscany">Tuscany</button> ·
                <button type="button" data-globe-location="Furore">Furore</button> ·
                <button type="button" data-globe-location="Positano">Positano</button> ·
                <button type="button" data-globe-location="Milan">Milan</button>
              </p>
            </section>
            <section>
              <h2>Asia</h2>
              <p>Japan — <button type="button" data-globe-location="Fukuoka">Fukuoka</button></p>
            </section>
          </div>
        </aside>
        <div class="traveling-visual">
          <svg class="travel-connection" aria-hidden="true">
            <line class="travel-connection__line" />
          </svg>
          <div class="globe-shell">
            <canvas
              class="traveling-globe"
              width="640"
              height="640"
              tabindex="0"
              role="img"
              aria-label="Interactive globe. Drag in any direction to spin it and select a visited place."
            ></canvas>
          </div>
          <aside class="travel-detail" aria-live="polite">
            <p class="travel-detail__eyebrow">travel note</p>
            <h2 class="travel-detail__name"></h2>
            <p class="travel-detail__date"></p>
            <p class="travel-detail__places"></p>
            <div class="travel-detail__actions">
              <button class="travel-detail__close" type="button">close</button>
              <button class="travel-detail__album" type="button">album</button>
            </div>
          </aside>
        </div>
        <p class="globe-hint">drag to spin · grab to stop</p>
      </div>
    </section>
    <section class="portfolio-panel material-panel" id="material" role="tabpanel" aria-labelledby="tab-material" hidden>
      <div class="material-workbench">
        <nav class="material-index" aria-label="Material research tool index">
          <button type="button" data-material-index="0"><span>01</span><strong>Binder clip</strong></button>
          <button type="button" data-material-index="1"><span>02</span><strong>Masking tape</strong></button>
          <button type="button" data-material-index="2"><span>03</span><strong>Ruler</strong></button>
          <button type="button" data-material-index="3"><span>04</span><strong>Hole punch</strong></button>
          <button type="button" data-material-index="4"><span>05</span><strong>Magnifying glass</strong></button>
        </nav>
        <article class="material-sheet">
          <section class="material-specimen" data-object="clip">
            <div class="material-object" aria-hidden="true"><i></i></div>
          </section>
          <section class="material-analysis">
            <header><span class="material-specimen__number">01</span><h2 class="material-analysis__title">Binder clip</h2></header>
            <dl class="material-analysis__facts">
              <div><dt>Materiality</dt><dd class="material-analysis__materiality"></dd></div>
              <div><dt>Appearance</dt><dd class="material-analysis__appearance"></dd></div>
              <div><dt>Role</dt><dd class="material-analysis__role"></dd></div>
              <div><dt>Why it matters</dt><dd class="material-analysis__importance"></dd></div>
            </dl>
            <div class="material-related">
              <h3>Tools with a similar role</h3>
              <div class="material-related__items"></div>
            </div>
          </section>
          <section class="material-digital">
            <header><span>FROM PHYSICAL BEHAVIOR<br>TO DIGITAL INTERACTION</span></header>
            <div class="material-digital__flow">
              <div><small>01 · object</small><strong class="material-flow__object"></strong></div>
              <span aria-hidden="true">→</span>
              <div><small>02 · action</small><strong class="material-flow__action"></strong></div>
              <span aria-hidden="true">→</span>
              <div><small>03 · interface</small><strong class="material-flow__interface"></strong></div>
            </div>
            <section class="material-digital__note">
              <h3>NOTE</h3>
              <p class="material-digital__description"></p>
            </section>
          </section>
        </article>
      </div>
    </section>
    <section class="portfolio-panel empty-panel" id="shop" role="tabpanel" aria-labelledby="tab-shop" hidden>
    </section>
    <section class="portfolio-panel empty-panel" id="contact" role="tabpanel" aria-labelledby="tab-contact" hidden>
    </section>
    <div class="travel-album" role="dialog" aria-modal="true" aria-labelledby="travel-album-title" hidden>
      <button class="travel-album__nav travel-album__nav--previous" type="button" aria-label="Previous album page"><span aria-hidden="true">&lt;</span></button>
      <div class="travel-album__book">
        <section class="travel-album__photo-sheet" aria-label="Travel photo">
          <div class="travel-album__photo">
            <span class="travel-album__image-placeholder">image</span>
          </div>
        </section>
        <section class="travel-album__note-sheet">
          <p class="travel-album__eyebrow">travel album</p>
          <h2 id="travel-album-title" class="travel-album__title"></h2>
          <p class="travel-album__date"></p>
          <p class="travel-album__page-count" aria-live="polite"></p>
          <textarea class="travel-album__note" aria-label="Travel album note" placeholder="Write a memory, scene, or feeling from this journey..."></textarea>
        </section>
      </div>
      <button class="travel-album__nav travel-album__nav--next" type="button" aria-label="Next album page"><span aria-hidden="true">&gt;</span></button>
      <button class="travel-album__close" type="button" aria-label="Close travel album">close</button>
    </div>
    <div class="beauty-lightbox" role="dialog" aria-modal="true" aria-label="Beauty note viewer" hidden>
      <button class="beauty-lightbox__nav beauty-lightbox__nav--previous" type="button" aria-label="Previous note">
        <span aria-hidden="true">&lt;</span>
      </button>
      <div class="beauty-lightbox__card"></div>
      <button class="beauty-lightbox__nav beauty-lightbox__nav--next" type="button" aria-label="Next note">
        <span aria-hidden="true">&gt;</span>
      </button>
      <button class="beauty-lightbox__close" type="button" aria-label="Close note">close</button>
    </div>
    <blockquote class="corner-verse"${cornerVerseEnabled ? '' : ' hidden'}>
      <p>For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.</p>
      <cite>JOHN 3:16</cite>
    </blockquote>
  </main>
`

const titleDust = titleSurfaceEffectsEnabled ? initTitleDust() : undefined
const dividerOrb = titleSurfaceEffectsEnabled
  ? document.querySelector<HTMLInputElement>('.divider-orb')
  : null
let previousDividerOrbValue = Number(dividerOrb?.value ?? 50)
let dividerOrbRollTimer: number | null = null

const updateDividerOrb = (nextValue: number) => {
  if (!dividerOrb) return

  const value = Math.min(100, Math.max(0, nextValue))
  const hasMoved = value !== previousDividerOrbValue
  previousDividerOrbValue = value
  dividerOrb.value = String(value)
  dividerOrb.setAttribute('aria-valuetext', `${Math.round(value)}% along the divider`)
  titleDust?.moveOrb(value / 100)

  if (hasMoved) {
    dividerOrb.classList.add('is-rolling')
    if (dividerOrbRollTimer !== null) window.clearTimeout(dividerOrbRollTimer)
    dividerOrbRollTimer = window.setTimeout(() => {
      dividerOrb.classList.remove('is-rolling')
      dividerOrbRollTimer = null
    }, 180)
  }
}

window.addEventListener('keydown', (event) => {
  if (!dividerOrb || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return

  const target = event.target as HTMLElement | null
  const isTyping = target?.matches('textarea, [contenteditable="true"]')
    || (target?.matches('input') && target !== dividerOrb)
  const hasOpenViewer = Boolean(
    document.querySelector('.beauty-lightbox:not([hidden]), .travel-album:not([hidden])'),
  )
  const isGlobeControl = target?.matches('.traveling-globe')

  if (isTyping) return

  const direction = event.key === '<' || event.key === ',' || event.key === 'ArrowLeft'
    ? -1
    : event.key === '>' || event.key === '.' || event.key === 'ArrowRight'
      ? 1
      : 0

  if (direction === 0) return
  if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && (hasOpenViewer || isGlobeControl)) return

  event.preventDefault()
  updateDividerOrb(Number(dividerOrb.value) + direction * 4)
})

dividerOrb?.addEventListener('input', () => {
  updateDividerOrb(Number(dividerOrb.value))
})

type Theme = 'light' | 'dark'

const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle')

document.querySelectorAll<HTMLElement>('.brand-highlight').forEach((brandItem) => {
  brandItem.addEventListener('pointermove', (event) => {
    const bounds = brandItem.getBoundingClientRect()
    brandItem.style.setProperty('--brand-pointer-x', `${event.clientX - bounds.left}px`)
    brandItem.style.setProperty('--brand-pointer-y', `${event.clientY - bounds.top}px`)
  })
})

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
  themeToggle?.setAttribute('aria-checked', String(theme === 'dark'))
  themeToggle?.setAttribute(
    'aria-label',
    theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
  )
}

let initialTheme: Theme = 'light'

try {
  if (window.localStorage.getItem('portfolio-theme') === 'dark') {
    initialTheme = 'dark'
  }
} catch {
  // Keep light mode when storage is unavailable.
}

applyTheme(initialTheme)

themeToggle?.addEventListener('click', () => {
  const nextTheme: Theme = document.documentElement.dataset.theme === 'dark'
    ? 'light'
    : 'dark'

  applyTheme(nextTheme)

  try {
    window.localStorage.setItem('portfolio-theme', nextTheme)
  } catch {
    // The toggle still works even when storage is unavailable.
  }
})

const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu > a')
const portfolioPanels = document.querySelectorAll<HTMLElement>('.portfolio-panel')

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', (event) => {
    event.preventDefault()
    titleDust?.dropFromElement(menuLink)

    menuLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('role') === 'tab') {
        link.setAttribute('aria-selected', 'false')
      }
    })

    menuLink.classList.add('active')
    if (menuLink.getAttribute('role') === 'tab') {
      menuLink.setAttribute('aria-selected', 'true')
    }

    portfolioPanels.forEach((panel) => {
      panel.hidden = panel.id !== menuLink.dataset.panel
    })
  })
})

const bookshelfEntries = Array.from({ length: 9 }, (_, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: 'Book title',
  author: 'Author name',
  quotes: [
    'Add a passage that you would like to remember.',
    'Add another sentence that stayed with you after reading.',
  ],
  reflection: 'Write what you felt, what changed in your thinking, and what you want to carry with you after finishing this book.',
}))

const bookshelfLayout = document.querySelector<HTMLElement>('.bookshelf-layout')
const bookshelfNote = document.querySelector<HTMLElement>('.bookshelf-note')
const bookshelfNoteNumber = document.querySelector<HTMLElement>('.bookshelf-note__number')
const bookshelfNoteTitle = document.querySelector<HTMLElement>('.bookshelf-note__title')
const bookshelfNoteAuthor = document.querySelector<HTMLElement>('.bookshelf-note__author')
const bookshelfNoteQuotes = document.querySelector<HTMLElement>('.bookshelf-note__quotes')
const bookshelfNoteReflection = document.querySelector<HTMLElement>('.bookshelf-note__reflection')
const bookshelfNoteClose = document.querySelector<HTMLButtonElement>('.bookshelf-note__close')
const bookshelfButtons = document.querySelectorAll<HTMLButtonElement>('[data-book-index]')
let bookshelfHideTimer: number | null = null
let activeBookshelfButton: HTMLButtonElement | null = null

const positionBookshelfNote = (button: HTMLButtonElement) => {
  if (!bookshelfLayout || !bookshelfNote) return

  const layoutRect = bookshelfLayout.getBoundingClientRect()
  const buttonRect = button.getBoundingClientRect()
  const bookRect = button.closest<HTMLElement>('.bookshelf-book')?.getBoundingClientRect()
  const bookshelfGrid = button.closest<HTMLElement>('.bookshelf-grid')
  const gridGap = bookshelfGrid ? Number.parseFloat(getComputedStyle(bookshelfGrid).columnGap) || 0 : 0
  const coverWidth = buttonRect.width
  const coverHeight = buttonRect.height
  const noteWidth = coverWidth * 0.72
  const noteHeight = coverHeight * 1.32
  const spaceOnRight = layoutRect.right - buttonRect.right
  const placeOnRight = spaceOnRight >= coverWidth + gridGap - 1
  const adjacentCoverLeft = placeOnRight
    ? buttonRect.right - layoutRect.left + gridGap
    : buttonRect.left - layoutRect.left - coverWidth - gridGap
  const noteGapPull = gridGap * 0.58
  const noteLeft = placeOnRight
    ? adjacentCoverLeft - noteGapPull
    : adjacentCoverLeft + coverWidth - noteWidth + noteGapPull
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const selectedCoverTop = (bookRect?.top ?? buttonRect.top) - layoutRect.top - rootFontSize * 0.25
  const noteTop = selectedCoverTop

  bookshelfNote.style.setProperty('--bookshelf-note-left', `${Math.max(0, noteLeft)}px`)
  bookshelfNote.style.setProperty('--bookshelf-note-top', `${noteTop}px`)
  bookshelfNote.style.setProperty('--bookshelf-note-width', `${noteWidth}px`)
  bookshelfNote.style.setProperty('--bookshelf-note-height', `${noteHeight}px`)
}

const cancelBookshelfNoteHide = () => {
  if (bookshelfHideTimer === null) return
  window.clearTimeout(bookshelfHideTimer)
  bookshelfHideTimer = null
}

const closeBookshelfNote = () => {
  cancelBookshelfNoteHide()
  activeBookshelfButton = null
  bookshelfLayout?.classList.remove('has-selection')
  bookshelfNote?.setAttribute('hidden', '')
  bookshelfButtons.forEach((button) => {
    button.classList.remove('is-active')
    button.setAttribute('aria-expanded', 'false')
  })
}

const scheduleBookshelfNoteHide = () => {
  cancelBookshelfNoteHide()
  bookshelfHideTimer = window.setTimeout(closeBookshelfNote, 420)
}

const showBookshelfNote = (button: HTMLButtonElement) => {
  cancelBookshelfNoteHide()
  const bookIndex = Number(button.dataset.bookIndex)
  const book = bookshelfEntries[bookIndex]
  if (
    !book
    || !bookshelfLayout
    || !bookshelfNote
    || !bookshelfNoteNumber
    || !bookshelfNoteTitle
    || !bookshelfNoteAuthor
    || !bookshelfNoteQuotes
    || !bookshelfNoteReflection
  ) return

  bookshelfButtons.forEach((item) => {
    const isActive = item === button
    item.classList.toggle('is-active', isActive)
    item.setAttribute('aria-expanded', String(isActive))
  })
  bookshelfNoteNumber.textContent = book.number
  bookshelfNoteTitle.textContent = book.title
  bookshelfNoteAuthor.textContent = book.author
  bookshelfNoteQuotes.replaceChildren(...book.quotes.map((quoteText) => {
    const quote = document.createElement('blockquote')
    quote.textContent = quoteText
    return quote
  }))
  bookshelfNoteReflection.textContent = book.reflection
  bookshelfNote.hidden = false
  bookshelfLayout.classList.add('has-selection')
  activeBookshelfButton = button
  positionBookshelfNote(button)
}

bookshelfButtons.forEach((button) => {
  const cover = button.querySelector<HTMLElement>('.bookshelf-book__cover')
  button.setAttribute('aria-expanded', 'false')

  cover?.addEventListener('pointerenter', () => showBookshelfNote(button))
  cover?.addEventListener('pointerleave', scheduleBookshelfNoteHide)
  button.addEventListener('focus', () => showBookshelfNote(button))
  button.addEventListener('blur', scheduleBookshelfNoteHide)
  button.addEventListener('click', () => {
    if (window.matchMedia('(hover: none)').matches) showBookshelfNote(button)
  })
})

bookshelfNoteClose?.addEventListener('click', closeBookshelfNote)
bookshelfNote?.addEventListener('pointerenter', cancelBookshelfNoteHide)
bookshelfNote?.addEventListener('pointerleave', scheduleBookshelfNoteHide)
window.addEventListener('resize', () => {
  if (activeBookshelfButton) positionBookshelfNote(activeBookshelfButton)
})

const materialResearchEntries = [
  {
    number: '01',
    object: 'clip',
    name: 'Binder clip',
    material: 'spring steel',
    materiality: 'Thin steel stores tension. The handles transfer a small gesture into a strong, reversible grip.',
    appearance: 'A folded black body, two silver loops, and a compact symmetrical silhouette.',
    role: 'Temporarily gathers separate sheets and lets them become one movable unit.',
    importance: 'It creates order without permanently changing what it holds.',
    related: ['clothespin', 'clamp', 'paper clip', 'staple'],
    flow: ['separate sheets', 'hold together', 'group · pin · lock'],
    digital: 'Online, its material tension becomes a rule: selected items stay together until the user deliberately releases them.',
  },
  {
    number: '02',
    object: 'tape',
    name: 'Masking tape',
    material: 'paper · adhesive',
    materiality: 'Soft paper tears by hand while low-tack adhesive creates a temporary bond and leaves little trace.',
    appearance: 'A hollow roll that becomes a thin line, label, patch, or boundary when unspooled.',
    role: 'Marks a provisional area, attaches a note, or holds something in place during a process.',
    importance: 'Its temporary nature gives permission to test, move, revise, and remove.',
    related: ['sticky note', 'label', 'bandage', 'bookmark'],
    flow: ['loose element', 'attach temporarily', 'tag · draft · selection'],
    digital: 'Its online equivalent is a removable layer of context—a tag, annotation, draft state, or temporary grouping.',
  },
  {
    number: '03',
    object: 'ruler',
    name: 'Ruler',
    material: 'wood · acrylic',
    materiality: 'A rigid straight edge makes invisible intervals physical, comparable, and repeatable.',
    appearance: 'A long narrow body organized by evenly spaced ticks and numeric increments.',
    role: 'Measures distance and guides a hand toward a controlled line or alignment.',
    importance: 'It turns intuition into a shared reference that can be checked by someone else.',
    related: ['grid', 'set square', 'caliper', 'measuring tape'],
    flow: ['unknown distance', 'compare · align', 'grid · snap · spacing token'],
    digital: 'In an interface, the ruler survives as grids, guides, snapping behavior, and a reusable spacing system.',
  },
  {
    number: '04',
    object: 'punch',
    name: 'Hole punch',
    material: 'metal · plastic',
    materiality: 'A lever concentrates pressure so a metal edge can remove a precise circle from a soft sheet.',
    appearance: 'A weighted base, hinged upper arm, and a hidden chamber that collects the removed pieces.',
    role: 'Removes material in order to create a repeatable point of connection.',
    importance: 'The absence it makes becomes useful: a hole allows many pages to join a larger system.',
    related: ['awl', 'drill', 'perforator', 'die cutter'],
    flow: ['closed surface', 'remove · open', 'anchor · slot · attach'],
    digital: 'Digitally, the opening becomes an intentional slot where content can be linked, mounted, or extended.',
  },
  {
    number: '05',
    object: 'lens',
    name: 'Magnifying glass',
    material: 'glass · metal',
    materiality: 'Curved glass bends light while a handle lets the eye move enlargement across a surface.',
    appearance: 'A transparent circular lens held by a narrow frame and a directional handle.',
    role: 'Temporarily enlarges a detail without changing the original object.',
    importance: 'It reveals evidence that scale, distance, or attention previously concealed.',
    related: ['microscope', 'loupe', 'telescope', 'viewfinder'],
    flow: ['hidden detail', 'focus · enlarge', 'zoom · inspect · search'],
    digital: 'Its interface counterpart is not only zoom, but any interaction that reveals detail on demand while preserving context.',
  },
] as const

const materialButtons = document.querySelectorAll<HTMLButtonElement>('[data-material-index]')
const materialSpecimen = document.querySelector<HTMLElement>('.material-specimen')
const materialSpecimenNumber = document.querySelector<HTMLElement>('.material-specimen__number')
const materialTitle = document.querySelector<HTMLElement>('.material-analysis__title')
const materiality = document.querySelector<HTMLElement>('.material-analysis__materiality')
const materialAppearance = document.querySelector<HTMLElement>('.material-analysis__appearance')
const materialRole = document.querySelector<HTMLElement>('.material-analysis__role')
const materialImportance = document.querySelector<HTMLElement>('.material-analysis__importance')
const materialRelatedItems = document.querySelector<HTMLElement>('.material-related__items')
const materialFlowObject = document.querySelector<HTMLElement>('.material-flow__object')
const materialFlowAction = document.querySelector<HTMLElement>('.material-flow__action')
const materialFlowInterface = document.querySelector<HTMLElement>('.material-flow__interface')
const materialDigitalDescription = document.querySelector<HTMLElement>('.material-digital__description')

const renderMaterialResearch = (index: number) => {
  const entry = materialResearchEntries[index]
  if (
    !entry
    || !materialSpecimen
    || !materialSpecimenNumber
    || !materialTitle
    || !materiality
    || !materialAppearance
    || !materialRole
    || !materialImportance
    || !materialRelatedItems
    || !materialFlowObject
    || !materialFlowAction
    || !materialFlowInterface
    || !materialDigitalDescription
  ) return

  materialButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
  materialSpecimen.dataset.object = entry.object
  materialSpecimenNumber.textContent = entry.number
  materialTitle.textContent = entry.name
  materiality.textContent = entry.materiality
  materialAppearance.textContent = entry.appearance
  materialRole.textContent = entry.role
  materialImportance.textContent = entry.importance
  materialRelatedItems.replaceChildren(...entry.related.map((item) => {
    const tag = document.createElement('span')
    tag.textContent = item
    return tag
  }))
  materialFlowObject.textContent = entry.flow[0]
  materialFlowAction.textContent = entry.flow[1]
  materialFlowInterface.textContent = entry.flow[2]
  materialDigitalDescription.textContent = entry.digital
}

materialButtons.forEach((button, index) => {
  button.addEventListener('click', () => renderMaterialResearch(index))
})

renderMaterialResearch(0)

const introduceSection = document.querySelector<HTMLElement>('.introduce')
const connectionSvg = document.querySelector<SVGSVGElement>('.connection-lines')
const connectionLine = document.querySelector<SVGLineElement>('.connection-line')
const boardImages = document.querySelectorAll<HTMLElement>('.board-image[data-note]')
const noteItems = document.querySelectorAll<HTMLElement>('.introduce-notes li[data-note]')
let activeNote: string | null = null

const hideConnection = () => {
  activeNote = null
  connectionLine?.classList.remove('is-visible')
  noteItems.forEach((note) => note.classList.remove('is-linked'))
}

const drawConnection = (noteNumber: string) => {
  if (!introduceSection || !connectionSvg || !connectionLine) return

  const imageNumber = introduceSection.querySelector<HTMLElement>(
    `.board-image[data-note="${noteNumber}"] figcaption`,
  )
  const noteItem = introduceSection.querySelector<HTMLElement>(
    `.introduce-notes li[data-note="${noteNumber}"]`,
  )
  const noteLabel = noteItem?.querySelector<HTMLElement>('.note-number')

  if (!imageNumber || !noteItem || !noteLabel) return

  noteItems.forEach((note) => {
    note.classList.toggle('is-linked', note.dataset.note === noteNumber)
  })

  const sectionRect = introduceSection.getBoundingClientRect()
  const imageNumberRect = imageNumber.getBoundingClientRect()
  const noteLabelRect = noteLabel.getBoundingClientRect()

  connectionSvg.setAttribute('viewBox', `0 0 ${sectionRect.width} ${sectionRect.height}`)
  connectionLine.setAttribute('x1', String(imageNumberRect.right - sectionRect.left + 5))
  connectionLine.setAttribute('y1', String(imageNumberRect.top - sectionRect.top + imageNumberRect.height / 2))
  connectionLine.setAttribute('x2', String(noteLabelRect.left - sectionRect.left - 7))
  connectionLine.setAttribute('y2', String(noteLabelRect.top - sectionRect.top + noteLabelRect.height / 2))

  connectionLine.classList.add('is-visible')
}

boardImages.forEach((image) => {
  const showImageConnection = () => {
    activeNote = image.dataset.note ?? null
    if (activeNote) drawConnection(activeNote)
  }

  image.addEventListener('pointerenter', showImageConnection)
  image.addEventListener('pointerleave', hideConnection)
  image.addEventListener('focus', showImageConnection)
  image.addEventListener('blur', hideConnection)
})

window.addEventListener('resize', () => {
  if (activeNote) drawConnection(activeNote)
})

const cursorTrailEnabled = true
const canUseCursorTrail = cursorTrailEnabled
  && window.matchMedia('(pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (canUseCursorTrail) {
  const trailDots: HTMLSpanElement[] = []
  const dotSizes = [6.5, 6, 5.5, 5]
  const maxTrailDots = 9
  const minimumDistance = 7
  const trailLifetime = 480
  const trailFadeDuration = 260
  let lastX = Number.NaN
  let lastY = Number.NaN
  let dotIndex = 0

  const updateTrailOpacity = () => {
    const lastIndex = trailDots.length - 1

    trailDots.forEach((dot, index) => {
      const opacity = lastIndex <= 0 ? 1 : 0.28 + (index / lastIndex) * 0.72
      dot.style.setProperty('--trail-opacity', opacity.toFixed(2))
    })
  }

  const removeTrailDot = (dot: HTMLSpanElement, immediately = false) => {
    if (!dot.isConnected) return

    if (immediately) {
      const index = trailDots.indexOf(dot)
      if (index >= 0) trailDots.splice(index, 1)
      dot.remove()
      updateTrailOpacity()
      return
    }

    if (dot.classList.contains('is-leaving')) return

    dot.classList.add('is-leaving')
    window.setTimeout(() => {
      const index = trailDots.indexOf(dot)
      if (index >= 0) trailDots.splice(index, 1)
      dot.remove()
      updateTrailOpacity()
    }, trailFadeDuration)
  }

  window.addEventListener('pointermove', (event) => {
    const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY)

    if (!Number.isNaN(distance) && distance < minimumDistance) return

    lastX = event.clientX
    lastY = event.clientY

    if (trailDots.length >= maxTrailDots) {
      removeTrailDot(trailDots[0], true)
    }

    const dot = document.createElement('span')
    dot.className = 'cursor-trail-dot'
    dot.setAttribute('aria-hidden', 'true')
    dot.style.left = `${event.clientX}px`
    dot.style.top = `${event.clientY}px`
    dot.style.width = `${dotSizes[dotIndex % dotSizes.length] / 16}rem`
    document.body.append(dot)
    trailDots.push(dot)
    updateTrailOpacity()
    dotIndex += 1

    window.setTimeout(() => removeTrailDot(dot), trailLifetime)
  })

  document.documentElement.addEventListener('mouseleave', () => {
    trailDots.slice().forEach((dot) => removeTrailDot(dot))
    lastX = Number.NaN
    lastY = Number.NaN
  })
}

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

const spaceStars = document.querySelector<HTMLElement>('.space-stars')

if (spaceStars) {
  let randomSeed = 20260903
  const random = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0
    return randomSeed / 4294967296
  }

  for (let index = 0; index < 72; index += 1) {
    const star = document.createElement('i')
    const size = 1 + random() * 2.2
    star.className = 'space-star'
    star.style.left = `${random() * 100}%`
    star.style.top = `${random() * 100}%`
    star.style.setProperty('--space-star-size', `${size / 16}rem`)
    star.style.setProperty('--space-star-opacity', `${0.35 + random() * 0.65}`)
    star.style.setProperty('--space-star-duration', `${1.4 + random() * 3.6}s`)
    star.style.setProperty('--space-star-delay', `${-random() * 5}s`)
    spaceStars.append(star)
  }
}

const beautyCards = Array.from(document.querySelectorAll<HTMLElement>('.beauty-card'))
const beautyLightbox = document.querySelector<HTMLElement>('.beauty-lightbox')
const beautyLightboxCard = document.querySelector<HTMLElement>('.beauty-lightbox__card')
const previousBeautyButton = document.querySelector<HTMLButtonElement>('.beauty-lightbox__nav--previous')
const nextBeautyButton = document.querySelector<HTMLButtonElement>('.beauty-lightbox__nav--next')
const closeBeautyButton = document.querySelector<HTMLButtonElement>('.beauty-lightbox__close')
let activeBeautyIndex = 0
let beautyTrigger: HTMLElement | null = null

const showBeautyNote = (index: number) => {
  if (!beautyLightboxCard || beautyCards.length === 0) return

  activeBeautyIndex = (index + beautyCards.length) % beautyCards.length
  beautyLightboxCard.innerHTML = beautyCards[activeBeautyIndex].innerHTML
  beautyLightboxCard.setAttribute(
    'aria-label',
    `Beauty note ${activeBeautyIndex + 1} of ${beautyCards.length}`,
  )
}

const openBeautyLightbox = (index: number, trigger: HTMLElement) => {
  if (!beautyLightbox) return

  beautyTrigger = trigger
  showBeautyNote(index)
  beautyLightbox.hidden = false
  document.body.classList.add('beauty-lightbox-open')
  window.requestAnimationFrame(() => {
    beautyLightbox.classList.add('is-open')
    closeBeautyButton?.focus({ preventScroll: true })
  })
}

const closeBeautyLightbox = () => {
  if (!beautyLightbox || beautyLightbox.hidden) return

  beautyLightbox.classList.remove('is-open')
  document.body.classList.remove('beauty-lightbox-open')
  window.setTimeout(() => {
    beautyLightbox.hidden = true
    beautyTrigger?.focus({ preventScroll: true })
    beautyTrigger = null
  }, 220)
}

beautyCards.forEach((card, index) => {
  card.tabIndex = 0
  card.setAttribute('role', 'button')
  card.setAttribute('aria-label', `Open beauty note ${index + 1}`)
  card.addEventListener('click', () => openBeautyLightbox(index, card))
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    openBeautyLightbox(index, card)
  })
})

previousBeautyButton?.addEventListener('click', () => showBeautyNote(activeBeautyIndex - 1))
nextBeautyButton?.addEventListener('click', () => showBeautyNote(activeBeautyIndex + 1))
closeBeautyButton?.addEventListener('click', closeBeautyLightbox)

beautyLightbox?.addEventListener('click', (event) => {
  if (event.target === beautyLightbox) closeBeautyLightbox()
})

window.addEventListener('keydown', (event) => {
  if (!beautyLightbox || beautyLightbox.hidden) return

  if (event.key === 'Escape') closeBeautyLightbox()
  if (event.key === 'ArrowLeft') showBeautyNote(activeBeautyIndex - 1)
  if (event.key === 'ArrowRight') showBeautyNote(activeBeautyIndex + 1)
})
