import blogUsNewsPostContent from './blogUsNewsPost.html?raw'
import blogPostContent from './blogPost.html?raw'
import blogIntroPostContent from './blogIntroPost.html?raw'
import everylifeDetail from './everylifeDetail.html?raw'

const personalProjects = [{"title": "SKYLRK", "asset": "moodroom-hd", "description": "Justin Bieber의 브랜드 SKYLRK에서 출시 예정인 뮤직 플레이어를 기대하면서 구성한 인터랙티브 웹사이트 개인작업입니다. Justin Bieber의 인스타그램 피드에서 샘플로 공개된 플레이어 외형을 사용했습니다. 플레이어 안에서는 Justin Bieber의 SWAG II 앨범을 미리듣기로 재생할 수 있으며, 음악의 분위기와 비트가 백그라운드의 색상에 반영되어 번지도록 했습니다. 플레이어의 버튼으로 곡 목록을 열거나 이전·다음 곡을 선택하고, 미리듣기를 재생할 수 있습니다.", "url": "https://wanseo.github.io/swag2/"}, {"title": "GLYF", "asset": "glyfing-detail", "description": "화장품 브랜드 GLYF의 바이럴콘텐츠로 활용할 인터렉티브 웹사이트를 기획하고 개발 및 디자인을 진행한 개인작업입니다. 브랜드 컨셉에 맞는 핑크 글리터 배경과 다양한 에셋들을 활용하여 웹사이트를 구성하였습니다. 방향키로 캐릭터를 움직일 수 있고, 화면을 구성하는 에셋을 누르면 게임 및 촬영 페이지로 연결됩니다.", "url": "https://wanseo.github.io/glyfing/"}, {"title": "Guestbook", "asset": "guestbook", "description": "픽셀 그래픽과 움직이는 배경으로 만든 작은 방명록입니다. 방문자들은 자신의 이름과 함께 방명록을 남길 수 있습니다. 말랑이 캐릭터는 랜덤으로 배정됩니다. 픽셀 형태의 말랑이, 말풍선, 배경, 입력창 등 웹사이트를 구성하는 모든 에셋을 디자인했습니다.", "url": "https://wanseo.github.io/myfirstweb/"}]

const personalDialog = document.createElement('dialog')
personalDialog.className = 'personal-project-dialog'
personalDialog.setAttribute('aria-labelledby', 'personal-dialog-title')
document.body.append(personalDialog)
let personalTrigger: HTMLAnchorElement | null = null
const closePersonalDialog = () => personalDialog.close()
personalDialog.addEventListener('close', () => {
  personalDialog.querySelector('video')?.pause()
  document.body.style.overflow = ''
  personalTrigger?.focus()
})
personalDialog.addEventListener('click', (event) => {
  if (event.target !== personalDialog) return
  const bounds = personalDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) closePersonalDialog()
})
document.querySelectorAll<HTMLAnchorElement>('[data-personal-project]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const project = personalProjects.find((item) => item.title === link.dataset.personalProject)
    if (!project) return
    personalTrigger = link
    personalDialog.innerHTML = `
      <button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
      <div class="personal-dialog-art${project.title === 'GLYF' ? ' personal-dialog-art--glyf' : ''}">
        <video src="./projects/${project.asset}.mp4" poster="./projects/${project.asset}.jpg" muted loop playsinline controls preload="metadata" aria-label="${project.title} 상세 미리보기"></video>
      </div>
      <div class="personal-dialog-copy">
        <h2 id="personal-dialog-title">${project.title}</h2>
        <p>${project.description}</p>
        <dl><dt>Role</dt><dd>Planning · Development · Graphic Design</dd><dt>Tool</dt><dd>GPT Codex, Adobe Illustrator</dd></dl>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer">VISIT WEBSITE <span aria-hidden="true">↗</span></a>
      </div>`
    personalDialog.querySelector('button')?.addEventListener('click', closePersonalDialog)
    personalDialog.showModal()
    personalDialog.scrollTop = 0
    document.body.style.overflow = 'hidden'
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      personalDialog.querySelector('video')?.play().catch(() => {})
    }
  })
})

const everylifeDialog = document.createElement('dialog')
everylifeDialog.className = 'personal-project-dialog everylife-dialog'
everylifeDialog.setAttribute('aria-labelledby', 'everylife-dialog-title')
everylifeDialog.innerHTML = '<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>' + everylifeDetail
document.body.append(everylifeDialog)
const everylifeTrigger = document.querySelector<HTMLButtonElement>('.everylife-preview:not(.institute-preview)')
everylifeTrigger?.addEventListener('click', () => {
  everylifeDialog.showModal()
  everylifeDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
everylifeDialog.querySelector('button')?.addEventListener('click', () => everylifeDialog.close())
everylifeDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  everylifeTrigger?.focus()
})
everylifeDialog.addEventListener('click', (event) => {
  if (event.target !== everylifeDialog) return
  const bounds = everylifeDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) everylifeDialog.close()
})

const bookletTrigger = document.querySelector<HTMLAnchorElement>('.work-booklet-preview')
const bookletDialog = document.createElement('dialog')
bookletDialog.className = 'personal-project-dialog booklet-dialog'
bookletDialog.setAttribute('aria-label', '연개청 책자 표지디자인 상세 화면')
bookletDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <img src="./projects/yeongae-booklet-white.svg" alt="2024년 연금개혁 책자 전체 표지">
  <img src="./projects/yeongae-booklet-photo.jpg" alt="연금개혁 행사 현장에서 촬영한 연개청 책자 실물" loading="lazy">`
document.body.append(bookletDialog)
bookletTrigger?.addEventListener('click', (event) => {
  event.preventDefault()
  bookletDialog.showModal()
  bookletDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
bookletDialog.querySelector('button')?.addEventListener('click', () => bookletDialog.close())
bookletDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  bookletTrigger?.focus()
})
bookletDialog.addEventListener('click', (event) => {
  if (event.target !== bookletDialog) return
  const bounds = bookletDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) bookletDialog.close()
})

const logoTrigger = document.querySelector<HTMLAnchorElement>('.work-logo-preview')
const logoDialog = document.createElement('dialog')
logoDialog.className = 'personal-project-dialog everylife-dialog logo-dialog'
logoDialog.setAttribute('aria-labelledby', 'logo-dialog-title')
logoDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero logo-case-hero">
      <h2>연금개혁<br>청년행동</h2>
    </header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">Brand Identity · Logo Design</span>
      <h2 id="logo-dialog-title">연금개혁청년행동</h2>
      <div>
        <p>연금개혁청년행동을 위한 로고 디자인입니다. 심볼과 한글 로고타입을 결합하고, 검정·초록의 두 가지 색상으로 구성했습니다. 심볼과 로고는 채택되어 사용 중입니다.</p>
        <dl class="goods-facts">
          <div><dt>Role</dt><dd>Logo Design · Graphic Design</dd></div><div><dt>Tool</dt><dd>Adobe Illustrator</dd></div>
        </dl>
      </div>
    </section>
    <section class="goods-section">
      <div class="goods-section-heading"><span class="goods-index">COLOR PALETTE</span></div>
      <div class="goods-palette logo-case-palette">
        <div><i style="background:#000000"></i><span>Black</span><small>검정</small></div>
        <div><i style="background:#00C853"></i><span>Green</span><small>초록</small></div>
      </div>
    </section>
    <section class="goods-section goods-design-board logo-case-board">
      <div class="goods-section-heading"><span class="goods-index">DESIGN BOARD</span></div>
      <div class="goods-board-link logo-case-two-colors">
        <img class="goods-board" src="./projects/yeongae-logo-sharp.png" alt="연금개혁청년행동 로고의 검정·초록 색상 버전" loading="lazy">
      </div>
      <div class="logo-construction">
        <div class="goods-section-heading"><span class="goods-index">LOGOTYPE CONSTRUCTION</span></div>
        <figure class="logo-construction-grid">
          <div class="logo-grid-labels"><span>SYMBOL</span><span>Typography</span></div>
          <svg viewBox="100 552 1050 172" role="img" aria-label="그린 로고의 세로 획과 가로 획에 맞춘 구성 가이드"><image href="./projects/yeongae-logo-sharp.png" width="1254" height="1254" /><g class="logo-stroke-guides"><line x1="130" y1="552" x2="130" y2="724" /><line x1="162" y1="552" x2="162" y2="724" /><line x1="191" y1="552" x2="191" y2="724" /><line x1="222" y1="552" x2="222" y2="724" /><line x1="269" y1="552" x2="269" y2="724" /><line x1="290" y1="552" x2="290" y2="724" /><line x1="334" y1="552" x2="334" y2="724" /><line x1="367" y1="552" x2="367" y2="724" /><line x1="430" y1="552" x2="430" y2="724" /><line x1="484" y1="552" x2="484" y2="724" /><line x1="505" y1="552" x2="505" y2="724" /><line x1="535" y1="552" x2="535" y2="724" /><line x1="557" y1="552" x2="557" y2="724" /><line x1="652" y1="552" x2="652" y2="724" /><line x1="671" y1="552" x2="671" y2="724" /><line x1="774" y1="552" x2="774" y2="724" /><line x1="790" y1="552" x2="790" y2="724" /><line x1="831" y1="552" x2="831" y2="724" /><line x1="839" y1="552" x2="839" y2="724" /><line x1="905" y1="552" x2="905" y2="724" /><line x1="1002" y1="552" x2="1002" y2="724" /><line x1="1013" y1="552" x2="1013" y2="724" /><line x1="1025" y1="552" x2="1025" y2="724" /><line x1="114" y1="566" x2="1138" y2="566" /><line x1="114" y1="598" x2="1138" y2="598" /><line x1="114" y1="638" x2="1138" y2="638" /><line x1="114" y1="652" x2="1138" y2="652" /><line x1="114" y1="680" x2="1138" y2="680" /><line x1="114" y1="701" x2="1138" y2="701" /></g></svg>
        </figure>
      </div>
    </section>
    <section class="goods-section logo-case-system">
      <div class="goods-section-heading"><span class="goods-index">DESIGN DETAILS</span></div>
      <div class="logo-detail-list">
        <div><h3>Color</h3><p>다양한 그린 계열 중 청년 단체의 젊고 역동적인 이미지를 반영하면서, 종이화폐를 연상시키는 컬러를 선정했습니다. 블랙과 화이트 배경 모두에서 높은 시인성과 대비를 확보할 수 있도록 고려했으며, 그린을 메인 컬러로 적용하고 블랙 버전을 추가해 활용성을 높였습니다.</p></div>
        <div><h3>Typography</h3><p>‘연’, ‘혁’, ‘년’ 등 획이 많은 한글의 구조적 특성을 고려해 불필요한 획을 최소화하고, 간결하면서도 명확한 형태의 커스텀 레터링을 제작했습니다. 이를 통해 시각적 복잡도를 낮추고 로고의 가독성과 완성도를 높이고자 했습니다.</p></div>
        <div><h3>Symbol</h3><p>청년 세대와 중장년 세대의 연대와 협력을 상징하는 맞잡은 손의 형태를 심볼에 반영했습니다. 동시에 지폐의 외곽 형태를 모티브로 활용해 연금 개혁이라는 단체의 정체성을 시각적으로 표현했습니다.</p></div>
      </div>
    </section>
  </article>`
document.body.append(logoDialog)
logoTrigger?.addEventListener('click', (event) => {
  event.preventDefault()
  logoDialog.showModal()
  logoDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
logoDialog.querySelector('button')?.addEventListener('click', () => logoDialog.close())
logoDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  logoTrigger?.focus()
})
logoDialog.addEventListener('click', (event) => {
  if (event.target !== logoDialog) return
  const bounds = logoDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) logoDialog.close()
})

const newsletterTrigger = document.querySelector<HTMLButtonElement>('.newsletter-preview')
const newsletterDialog = document.createElement('dialog')
newsletterDialog.className = 'personal-project-dialog newsletter-dialog'
newsletterDialog.setAttribute('aria-labelledby', 'newsletter-dialog-title')
newsletterDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <header class="newsletter-dialog-header"><span>BUILD UP KOREA</span><h2 id="newsletter-dialog-title">뉴스레터 기획/제작</h2></header>
  <div class="newsletter-dialog-pages">
    <figure><figcaption>01 · D-90</figcaption><img src="./projects/newsletter-1.png" alt="빌드업코리아2025 D-90 뉴스레터 전체" loading="lazy"></figure>
    <figure><figcaption>02 · D-49</figcaption><img src="./projects/newsletter-2.png" alt="빌드업코리아2025 D-49 뉴스레터 전체" loading="lazy"></figure>
    <figure><figcaption>03 · D-44</figcaption><img src="./projects/newsletter-3.png" alt="빌드업코리아2025 D-44 뉴스레터 전체" loading="lazy"></figure>
  </div>`
document.body.append(newsletterDialog)
newsletterTrigger?.addEventListener('click', () => {
  newsletterDialog.showModal()
  newsletterDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
newsletterDialog.querySelector('button')?.addEventListener('click', () => newsletterDialog.close())
newsletterDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  newsletterTrigger?.focus()
})
newsletterDialog.addEventListener('click', (event) => {
  if (event.target !== newsletterDialog) return
  const bounds = newsletterDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) newsletterDialog.close()
})

const firstNewsletter = newsletterDialog.querySelector('figure')
if (firstNewsletter) {
  firstNewsletter.innerHTML = `<figcaption>01 · D-90</figcaption>
    <article class="newsletter-readable">
      <header><span>Newsletter</span><h3>빌드업코리아2025 (D-90)</h3></header>
      <img class="newsletter-sample-envelope" src="./projects/newsletter-envelope.svg" alt="파란 봉투 뉴스레터 그래픽">
      <p><strong>빌드업코리아2025 (D-90)</strong><br>일시: 09.05-06, 장소: 킨텍스</p>
      <p>—<br>안녕하세요, 빌더님 😊<br>빌드업코리아의 여러 가지 소식 전달드립니다.</p>
      <p>🎉<strong>오늘(6.7) 15:00, BUK공식사이트에서 빌드업코리아2025 등록이 오픈되었습니다!</strong><br>6월 말까지 등록 시, BUK2025 참가 티켓에 대한 <strong>슈퍼얼리버드 50% 할인 혜택</strong>을 받아보실 수 있습니다.</p>
      <p>🎉 빌드업코리아 뉴스레터 구독자에게 드리는 <strong>10% 추가할인 혜택</strong>도 챙겨가세요!<br>아래에 10% 추가할인 코드 보내드립니다.<br><strong>추가할인 코드: <span style="color:#1648e8">BUK_2025</span></strong></p>
      <p>빌더님께서 오늘 바로 등록하시면 <strong>슈퍼얼리버드 50% 할인 뿐만 아니라<br>10% 추가할인까지</strong> 받아보실 수 있습니다!</p>
      <p>빠르게 등록하고 엄청난 혜택 받아가세요!<br><strong>공식사이트 등록하러가기 &gt;&gt;</strong> <a href="https://www.buildupkorea.org/Main.asp" target="_blank" rel="noopener noreferrer">https://www.buildupkorea.org/Main.asp</a></p>
      <footer class="newsletter-sample-footer">빌드업코리아 Build Up Korea<br>info@buildupkorea.org<br><span>수신거부 Unsubscribe</span></footer>
    </article>`
}

const thirdNewsletter = newsletterDialog.querySelectorAll('figure')[2]
if (thirdNewsletter) {
  thirdNewsletter.innerHTML = `<figcaption>03 · D-44</figcaption>
    <article class="newsletter-readable">
      <header><span>Newsletter</span><h3>빌드업코리아2025 (D-44)<br>[1차] 연사 라인업 안내</h3></header>
      <p><strong>빌드업코리아2025 (D-44)<br>[1차] 연사 라인업 안내</strong><br>일시: 09.05-06 (금-토) 9:00-18:00, 장소: 킨텍스 제2전시장 8홀</p>
      <p>-<br>안녕하세요, 빌더님😊<br>빌드업코리아2025 소식 전달드립니다.</p>
      <p>🎉<strong>빌드업코리아2025 공식 슬로건이 공개되었습니다!</strong><br><strong class="newsletter-slogan">Build the Future, Born to LEAD</strong><br>미래를 기다리지 않고, 직접 만들어가는 우리.<br>리더의 이름으로 행동하고, 변화의 중심에 서는 여러분을 위한 슬로건입니다.<br>세상을 바꿀 세대가 모이는 <strong>Build Up Korea 2025</strong> —이제, 여러분의 차례입니다.</p>
      <p>🔥미국 정치판을 뒤흔든 리더들이 한국에 온다!<br>미국 대학가에 정치 토론 열풍을 일으킨 <strong>터닝포인트USA 창립자 찰리 커크</strong>, 트럼프의 핵심 참모 <strong>알렉스 브루세위츠</strong>, 전 해군 정보장교이자 날카로운 정치논객 <strong>잭 포소비엑</strong>까지—지금 이 미국을 움직이는 정치인, 기업인, 언론인, 인플루언서들이 <strong>Build Up Korea 2025</strong> 무대에 총출동합니다!</p>
      <p>🚨통찰력 있는 비전, 현실을 꿰뚫는 메시지, 미래를 준비할 리더들을 위한 생생한 인사이트!<br>이 이야기를 들을 수 있는 단 하나의 무대, <strong>Build Up Korea 2025!</strong><br>미국을 움직이는 리더들의 인사이트, <strong>한국에서는 오직 이곳에서만</strong> 만날 수 있습니다.<br>특별한 이 기회를 놓치지 마세요!</p>
      <p>아래 링크된 사이트를 방문해 빌드업코리아2025의 더 많은 정보를 확인하세요!<br>빌드업코리아2025 사이트 방문 &gt;&gt; <a href="https://www.buildupkorea.org/" target="_blank" rel="noopener noreferrer">https://www.buildupkorea.org/</a></p>
      <p>🎁뉴스레터 구독자에게 <strong>빌드업코리아2025 10% 추가할인 티켓 링크</strong>를 보내드립니다.</p>
      <p>BUK2025 티켓 10% 추가할인 링크<br>&gt;&gt; <a href="https://booking.naver.com/booking/5/bizes/1102750/items/6875487?preview=1" target="_blank" rel="noopener noreferrer">https://booking.naver.com/booking/5/bizes/1102750/items/6875487?preview=1</a></p>
      <p>감사합니다.</p>
      <svg class="newsletter-speakers" viewBox="0 460 244 164" role="img" aria-label="빌드업코리아2025 연사 안내 포스터"><image href="./projects/newsletter-3.png" width="244" height="624" /></svg>
    </article>`
}

const secondNewsletter = newsletterDialog.querySelectorAll('figure')[1]
if (secondNewsletter) {
  secondNewsletter.innerHTML = `<figcaption>02 · D-49</figcaption>
    <article class="newsletter-readable">
      <header><span>Newsletter</span><h3>빌드업코리아2025 (D-49)</h3></header>
      <p><strong>빌드업코리아2025 (D-49) 연사 라인업 1차 오픈!</strong><br>일시: 09.05-06 (금-토) 9:00-18:00, 장소: 킨텍스 제2전시장 8홀</p>
      <p>-<br>안녕하세요, 빌더님😊<br>빌드업코리아2025 소식 전달드립니다.</p>
      <p>🎉공식사이트에서 <strong>빌드업코리아2025 연사 정보가 오픈</strong>되었습니다!<br>지금 바로 공식사이트를 방문해 빌드업코리아2025 연사정보를 확인하세요!</p>
      <p><strong>빌드업코리아2025 연사정보 확인 &gt;&gt; <a href="https://www.buildupkorea.org/" target="_blank" rel="noopener noreferrer">https://www.buildupkorea.org/</a></strong></p>
      <p>🎁뉴스레터 구독자에게 빌드업코리아2025 <strong>10% 추가할인 티켓 링크</strong>를 보내드립니다.</p>
      <p><strong>BUK 2025 티켓 10% 추가할인 링크 &gt;&gt; <a href="https://booking.naver.com/booking/5/bizes/1102750/items/6875487?preview=1" target="_blank" rel="noopener noreferrer">https://booking.naver.com/booking/5/bizes/1102750/items/6875487?preview=1</a></strong></p>
      <p>감사합니다.</p>
    </article>`
}

const fourthNewsletter = document.createElement('figure')
fourthNewsletter.innerHTML = `<figcaption>04 · D-23</figcaption>
  <article class="newsletter-readable">
    <header><span>Newsletter</span><h3>빌드업코리아2025 (D-23)<br>부스 신청 접수 마감 임박!</h3></header>
    <img class="newsletter-sample-envelope" src="./projects/newsletter-envelope.svg" alt="파란 봉투 뉴스레터 그래픽">
    <p><strong>[빌드업코리아 2025] D-23 !!!</strong><br>일시: 09.05-06 (금-토) 9:00-18:00<br>장소: 킨텍스 제2전시장 8홀</p>
    <p>—<br>안녕하세요, 빌더님😊</p>
    <p><strong>빌드업코리아 2025와 함께할 부스를 모집합니다! 🚀</strong></p>
    <p>자유의 가치 아래 모인 수많은 다음 세대에게 여러분의 기업·교회·학교·브랜드의 비전과 가치를 알릴 수 있는 부스 참여를 환영합니다.<br>여러분의 부스가 이 현장의 특별함을 채웁니다.</p>
    <p>많은 참여 부탁드립니다.</p>
    <p><strong>💡 부스 안내</strong><br>부스 사이즈별 부스·스폰서 안내: 빌드업코리아 사무국 문의<br>info@buildupkorea.org<br>010-4115-0509</p>
    <p><strong>📌부스 신청 안내</strong><br>신청 마감: 8월 14일(목) 자정<br>행사 일정: 9월 5일(금) ~ 9월 6일(토)<br>장소: 킨텍스 제2전시장 8홀<br>신청 방법: 공식 홈페이지</p>
    <p>부스 신청 바로가기: https://www.buildupkorea.org/main.asp</p>
    <p><strong>빌드업코리아 2025 ✨<br>Build the Future, Born to LEAD!</strong></p>
    <p>함께 만들어 갈 무대에 여러분을 초대합니다.<br>감사합니다.</p>
  </article>`
newsletterDialog.querySelector('.newsletter-dialog-pages')?.append(fourthNewsletter)

const newsletterSamples = Array.from(newsletterDialog.querySelectorAll<HTMLElement>('.newsletter-dialog-pages > figure'))
const newsletterViewer = document.createElement('dialog')
newsletterViewer.className = 'personal-project-dialog newsletter-sample-viewer'
newsletterViewer.setAttribute('aria-label', '뉴스레터 샘플 확대 보기')
newsletterViewer.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="확대 화면 닫기">×</button><div class="newsletter-viewer-toolbar"><button type="button" data-direction="-1" aria-label="이전 뉴스레터">‹</button><span aria-live="polite"></span><button type="button" data-direction="1" aria-label="다음 뉴스레터">›</button></div><div class="newsletter-viewer-content"></div>`
document.body.append(newsletterViewer)
let newsletterSampleIndex = 0
let newsletterSampleTrigger: HTMLButtonElement | null = null
const showNewsletterSample = (index: number) => {
  newsletterSampleIndex = (index + newsletterSamples.length) % newsletterSamples.length
  const sample = newsletterSamples[newsletterSampleIndex]!
  const content = sample.querySelector('.newsletter-readable, img')!.cloneNode(true)
  newsletterViewer.querySelector('.newsletter-viewer-content')!.replaceChildren(content)
  newsletterViewer.querySelector('.newsletter-viewer-toolbar span')!.textContent = `${sample.querySelector('figcaption')!.textContent} · ${newsletterSampleIndex + 1} / ${newsletterSamples.length}`
  newsletterViewer.scrollTop = 0
}
newsletterSamples.forEach((sample, index) => {
  const open = document.createElement('button')
  open.type = 'button'
  open.className = 'newsletter-sample-open'
  open.setAttribute('aria-label', `${sample.querySelector('figcaption')!.textContent} 뉴스레터 확대 보기`)
  sample.append(open)
  open.addEventListener('click', () => {
    newsletterSampleTrigger = open
    showNewsletterSample(index)
    newsletterViewer.showModal()
  })
})
newsletterViewer.querySelector('.personal-dialog-close')!.addEventListener('click', () => newsletterViewer.close())
newsletterViewer.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach((button) => {
  button.addEventListener('click', () => showNewsletterSample(newsletterSampleIndex + Number(button.dataset.direction)))
})
newsletterViewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    showNewsletterSample(newsletterSampleIndex + (event.key === 'ArrowLeft' ? -1 : 1))
  }
})
newsletterViewer.addEventListener('close', () => newsletterSampleTrigger?.focus({ preventScroll: true }))
newsletterViewer.addEventListener('click', (event) => {
  if (event.target !== newsletterViewer) return
  const bounds = newsletterViewer.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) newsletterViewer.close()
})

newsletterDialog.classList.add('everylife-dialog', 'newsletter-case-dialog')
const newsletterCase = document.createElement('article')
newsletterCase.className = 'goods-case'
newsletterCase.innerHTML = `
  <header class="goods-hero newsletter-case-hero">
    <h2>Newsletter</h2>
  </header>
  <section class="goods-section goods-overview dialog-copy">
    <span class="eyebrow">Content Planning · Newsletter</span>
    <h2>빌드업코리아 뉴스레터</h2>
    <div>
      <p><strong>빌드업코리아 2025 국제 컨퍼런스의 잠재 참가자 확보와 행사 등록 유도를 목적</strong>으로 기획·제작한 뉴스레터입니다.</p>
      <p>웹사이트 메인 페이지에 뉴스레터 구독 섹션을 신설하고, 얼리버드 할인 혜택과 행사 소식을 가장 먼저 받아볼 수 있다는 점을 강조해 구독 전환을 유도했습니다.</p>
      <p>뉴스레터는 행사 등록 안내, 얼리버드 혜택, 글로벌 연사 라인업, 공식 슬로건 등 주요 정보를 중심으로 구성해 잠재 참가자의 관심과 참여를 이끌어내고자 했습니다.</p>
      <p>또한 구독자 애칭인 ‘빌더(Builder)’를 활용해 친근하면서도 일관된 커뮤니케이션 톤을 구축하고, 구독자의 소속감과 브랜드에 대한 유대감을 강화하고자 했습니다.</p>
      <dl class="goods-facts">
        <div><dt>Role</dt><dd>뉴스레터 기획 · 콘텐츠 제작</dd></div>
        <div><dt>Tool</dt><dd>Stibee</dd></div>
        <div><dt>Period</dt><dd>2025.02 – 2025.09 · 8개월</dd></div>
      </dl>
    </div>
  </section>
  <section class="goods-section">
    <div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div>
    <div class="sns-project-board editorial-project-board">
      <div class="newsletter-board-sample">${firstNewsletter?.querySelector('.newsletter-readable')?.outerHTML ?? ''}</div>
      <div class="sns-board-copy"><h3>뉴스레터 기획 및 제작</h3>
        <dl><div><dt>주요목표</dt><dd>잠재 참가자 확보 및 행사 등록 유도</dd></div><div><dt>Tool</dt><dd>Stibee</dd></div><div><dt>WHY</dt><dd>컨퍼런스 주요 정보를 전달하고, 잠재 참가자와 지속적으로 소통할 접점 마련</dd></div><div><dt>HOW</dt><dd>웹사이트 메인 페이지에 뉴스레터 구독 섹션 신설. 얼리버드 혜택·행사 소식·글로벌 연사 라인업을 중심으로 콘텐츠 구성. 구독자 애칭 ‘빌더(Builder)’를 활용한 일관된 커뮤니케이션 톤 구축</dd></div><div><dt>RESULT</dt><dd>행사 정보와 브랜드 메시지를 담은 뉴스레터 시리즈 기획·제작 및 구독 채널 운영<br>*이메일을 통한 뉴스레터 발송 시 사용자 접근성이 떨어진다는 점을 발견했고, 이후 MMS와 카카오톡 채널을 통해 추가로 전달하는 방향으로 전략을 재수립했습니다.</dd></div></dl>
      </div>
    </div>
  </section>
  <section class="goods-section newsletter-case-work">
    <div class="goods-section-heading"><span class="goods-index">NEWSLETTER SAMPLE</span></div>
  </section>`
const newsletterPages = newsletterDialog.querySelector('.newsletter-dialog-pages')
if (newsletterPages) newsletterCase.querySelector('.newsletter-case-work')?.append(newsletterPages)
newsletterDialog.querySelector('.newsletter-dialog-header')?.remove()
newsletterDialog.append(newsletterCase)
newsletterDialog.setAttribute('aria-label', '빌드업코리아 뉴스레터 기획 및 제작')
newsletterDialog.removeAttribute('aria-labelledby')

bookletDialog.classList.add('everylife-dialog', 'booklet-case-dialog')
const bookletCloseButton = bookletDialog.querySelector('button')
const bookletCase = document.createElement('article')
bookletCase.className = 'goods-case'
bookletCase.innerHTML = `
  <header class="goods-hero booklet-case-hero">
    <h2>연금개혁</h2>
  </header>
  <section class="goods-section goods-overview dialog-copy">
    <span class="eyebrow">Cover Design</span>
    <h2 id="booklet-case-title">연개청 책자 표지디자인</h2>
    <div>
      <p>「MZ세대가 생각하는 국가 미래를 위한 연금개혁 방향」 책자의 표지 디자인입니다.</p>
      <p>‘MZ세대’, ‘국가 미래를 위한’, ‘연금개혁’ 세 가지 핵심 키워드에 대비감 있는 컬러를 적용해 제목의 시각적 주목도를 높이고, 국가의 미래를 위한 연금개혁이라는 메시지를 강조했습니다. 현행 연금제도가 유지될 경우 예상되는 기금의 변화를 직관적인 그래픽으로 시각화했으며, 클라이언트의 요청에 따라 젊은 세대에게 친숙한 그래픽 스타일을 활용해 무거운 정책 주제를 보다 쉽게 전달하고자 했습니다.</p>
      <dl class="goods-facts">
        <div><dt>Role</dt><dd>책자 표지디자인 · Graphic Design</dd></div><div><dt>Tool</dt><dd>Adobe Illustrator</dd></div>
      </dl>
    </div>
  </section>
  <section class="goods-section booklet-case-cover">
    <div class="goods-section-heading"><span class="goods-index">COVER DESIGN</span></div>
    <img class="goods-board" src="./projects/yeongae-booklet.png" width="2481" height="3508" alt="MZ세대가 생각하는 국가 미래를 위한 연금개혁 방향 책자 전체 표지" loading="lazy" decoding="async">
  </section>
  <section class="goods-section goods-application">
    <div class="goods-section-heading"><span class="goods-index">APPLICATION</span></div>
    <img class="goods-application-image" src="./projects/yeongae-booklet-photo.jpg" alt="연금개혁 행사 현장에서 촬영한 책자 실물" loading="lazy">
  </section>`
bookletDialog.replaceChildren(...(bookletCloseButton ? [bookletCloseButton] : []), bookletCase)
bookletDialog.setAttribute('aria-labelledby', 'booklet-case-title')
bookletDialog.removeAttribute('aria-label')

const blogTrigger = document.querySelector<HTMLButtonElement>('.blog-preview')
const blogDialog = document.createElement('dialog')
blogDialog.className = 'personal-project-dialog everylife-dialog blog-case-dialog'
blogDialog.setAttribute('aria-labelledby', 'blog-case-title')
blogDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero blog-case-hero"><h2>Naver Blog</h2></header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">Content Planning · Blog</span><h2 id="blog-case-title">빌드업코리아 공식 블로그</h2>
      <div><p>빌드업코리아의 행사 소식과 주요 콘텐츠를 전달하기 위해 개설한 네이버 블로그입니다.</p>
        <p>브랜드 아이덴티티를 반영한 메인 화면을 디자인하고, ABOUT, EVENTS, NEWSLETTER, NOTICE, CONTENTS로 메뉴를 구성해 정보 접근성을 높였습니다.</p>
        <p><strong>네이버 검색 트렌드와 주요 키워드를 활용한 미국 뉴스 연재를 통해 자연 검색을 통한 신규 방문자 유입을 유도하고, 공식 웹사이트에서 다루기 어려운 연사들의 강연 내용을 체계적으로 기록·보관하는 콘텐츠 아카이브로 활용</strong>하고자 했습니다.</p>
        <p>블로그 검색 유입의 80%가 모바일에서 발생한다는 점을 고려해, 세로형으로 글을 구성하여 가독성을 높였습니다.</p>
        <dl class="goods-facts"><div><dt>Role</dt><dd>블로그 기획 · 콘텐츠 제작 · 운영</dd></div><div><dt>Tool</dt><dd>Canva</dd></div></dl>
      </div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div>
      <div class="sns-project-board editorial-project-board">
        <img class="sns-board-screens" src="./projects/buildup-blog.png" alt="빌드업코리아 네이버 블로그 메인 화면과 콘텐츠 구성" loading="lazy">
        <div class="sns-board-copy"><h3>네이버 블로그 기획 및 운영</h3>
          <dl><div><dt>주요목표</dt><dd>행사 정보 전달 및 단체·브랜드 소개</dd></div><div><dt>Tool</dt><dd>Canva</dd></div><div><dt>WHY</dt><dd>네이버 검색 트렌드와 주요 키워드를 활용한 신규 방문자 유입<br>및 연사 강연 콘텐츠의 체계적인 기록·보관</dd></div><div><dt>HOW</dt><dd>행사 브랜드를 반영한 메인 화면 및 썸네일 화면 기획.<br>메뉴 구성 및 단체 소개·행사 관련 게시글 제작.<br>미국 뉴스 연재.</dd></div><div><dt>RESULT</dt><dd>브랜드 아이덴티티를 반영한 공식 블로그 구성<br>및 콘텐츠 기획·제작·운영</dd></div></dl>
        </div>
      </div>
    </section>
    <section class="goods-section blog-intro-post">
      <div class="goods-section-heading"><span class="goods-index">ABOUT BUILD UP KOREA</span></div>
      <div class="blog-post-controls"><span>단체 소개 · 주요연혁 · 비전 · 미션 · 주요활동</span></div>
      <div class="blog-post-viewport" tabindex="0" role="region" aria-label="빌드업코리아 소개 게시글. 스크롤하여 전체 내용을 볼 수 있습니다.">
        <article class="blog-readable"><h3>빌드업코리아 소개 주요연혁 비전 미션 주요활동</h3>${blogIntroPostContent}</article>
      </div>
      <a class="blog-original-post" href="https://blog.naver.com/PostView.naver?blogId=bukofficial&amp;logNo=224073747834" target="_blank" rel="noopener noreferrer">원문 보기 ↗</a>
    </section>
    <section class="goods-section blog-us-news-post">
      <div class="goods-section-heading"><span class="goods-index">US NEWS</span></div>
      <div class="blog-post-controls"><span>미국 뉴스 · 12.05 오늘 당신이 꼭 알아야 할 소식 Top 3</span></div>
      <div class="blog-post-viewport" tabindex="0" role="region" aria-label="미국 뉴스 게시글. 스크롤하여 전체 내용을 볼 수 있습니다.">
        <article class="blog-readable"><h3>[미국뉴스] 12.05 오늘 당신이 꼭 알아야 할 소식 Top 3</h3>${blogUsNewsPostContent}</article>
      </div>
      <a class="blog-original-post" href="https://blog.naver.com/PostView.naver?blogId=bukofficial&amp;logNo=224099549384&amp;categoryNo=7&amp;parentCategoryNo=7&amp;from=thumbnailList" target="_blank" rel="noopener noreferrer">원문 보기 ↗</a>
    </section>
    <section class="goods-section blog-case-link"><a href="https://blog.naver.com/bukofficial" target="_blank" rel="noopener noreferrer">VISIT BLOG <span aria-hidden="true">↗</span></a></section>
  </article>`
document.body.append(blogDialog)
blogTrigger?.addEventListener('click', () => {
  blogDialog.showModal()
  blogDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
blogDialog.querySelector('button')?.addEventListener('click', () => blogDialog.close())
blogDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  blogTrigger?.focus()
})
blogDialog.addEventListener('click', (event) => {
  if (event.target !== blogDialog) return
  const bounds = blogDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) blogDialog.close()
})

const blogScreen = blogDialog.querySelector('.blog-case-screen')
if (blogScreen) {
  blogScreen.innerHTML = `<div class="goods-section-heading"><span class="goods-index">FEATURED POST</span></div>
    <div class="blog-post-controls"><span>대표 글 · 자동 스크롤</span><button type="button" class="blog-scroll-toggle" aria-pressed="true">일시정지</button></div>
    <div class="blog-post-viewport" tabindex="0" aria-label="대표 블로그 글. 직접 스크롤하거나 자동 스크롤을 일시정지할 수 있습니다.">
      <article class="blog-readable"><span class="blog-post-category">미국뉴스</span><h3>[미국뉴스] 12.26 오늘 당신이 꼭 알아야 할 소식 Top 3</h3>${blogPostContent}</article>
    </div>
    <a class="blog-original-post" href="https://blog.naver.com/bukofficial/224123389917" target="_blank" rel="noopener noreferrer">원문 보기 ↗</a>`
}
const blogPostViewport = blogDialog.querySelector<HTMLElement>('.blog-post-viewport')
const blogScrollToggle = blogDialog.querySelector<HTMLButtonElement>('.blog-scroll-toggle')
let blogScrollEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
let blogScrollHovered = false
let blogScrollFrame: number | null = null
let blogScrollLastTime = 0
let blogScrollPosition = 0
const updateBlogScrollControl = () => {
  blogScrollToggle?.setAttribute('aria-pressed', String(blogScrollEnabled))
  if (blogScrollToggle) blogScrollToggle.textContent = blogScrollEnabled ? '일시정지' : '자동 스크롤'
}
const animateBlogPost = (time: number) => {
  const elapsed = Math.min(time - blogScrollLastTime, 50)
  blogScrollLastTime = time
  if (blogPostViewport && blogScrollEnabled && !blogScrollHovered && blogDialog.open) {
    blogScrollPosition += elapsed * 0.018
    blogPostViewport.scrollTop = blogScrollPosition
    if (blogPostViewport.scrollTop >= blogPostViewport.scrollHeight - blogPostViewport.clientHeight - 1) {
      blogScrollEnabled = false
      updateBlogScrollControl()
    }
  }
  if (blogDialog.open) blogScrollFrame = requestAnimationFrame(animateBlogPost)
}
blogTrigger?.addEventListener('click', () => {
  if (blogScrollFrame !== null) cancelAnimationFrame(blogScrollFrame)
  if (blogPostViewport) blogPostViewport.scrollTop = 0
  blogScrollPosition = 0
  blogScrollLastTime = performance.now()
  blogScrollEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  updateBlogScrollControl()
  blogScrollFrame = requestAnimationFrame(animateBlogPost)
})
blogDialog.addEventListener('close', () => {
  if (blogScrollFrame !== null) cancelAnimationFrame(blogScrollFrame)
  blogScrollFrame = null
})
blogScrollToggle?.addEventListener('click', () => {
  blogScrollEnabled = !blogScrollEnabled
  if (blogPostViewport) {
    if (blogPostViewport.scrollTop >= blogPostViewport.scrollHeight - blogPostViewport.clientHeight - 1) blogPostViewport.scrollTop = 0
    blogScrollPosition = blogPostViewport.scrollTop
  }
  updateBlogScrollControl()
})
blogPostViewport?.addEventListener('mouseenter', () => { blogScrollHovered = true })
blogPostViewport?.addEventListener('mouseleave', () => {
  blogScrollHovered = false
  blogScrollPosition = blogPostViewport.scrollTop
})
const pauseBlogPost = () => { blogScrollEnabled = false; updateBlogScrollControl() }
blogPostViewport?.addEventListener('wheel', pauseBlogPost, { passive: true })
blogPostViewport?.addEventListener('touchstart', pauseBlogPost, { passive: true })
blogPostViewport?.addEventListener('keydown', pauseBlogPost)
updateBlogScrollControl()

const mmsTrigger = document.querySelector<HTMLButtonElement>('.mms-preview')
const mmsDialog = document.createElement('dialog')
mmsDialog.className = 'personal-project-dialog everylife-dialog mms-case-dialog'
mmsDialog.setAttribute('aria-labelledby', 'mms-case-title')
mmsDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero mms-case-hero"><h2>MMS<br>Copywriting</h2></header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">Copywriting · Mobile Message</span><h2 id="mms-case-title">MMS 카피라이팅</h2>
      <div><p>이메일 뉴스레터만으로는 정보 전달과 사용자 접근성에 한계가 있다는 점을 파악하고, MMS와 카카오톡 채널을 추가로 활용하는 멀티채널 커뮤니케이션 전략으로 확대했습니다.</p>
      <p><strong>빌드업코리아의 행사 소식과 참여 안내를 효과적으로 전달하기 위해 핵심 정보를 중심으로 메시지를 구성했으며, 수신자가 내용을 쉽고 빠르게 이해할 수 있도록 직관적이고 친근한 톤앤매너의 카피라이팅을 진행했습니다.</strong></p><dl class="goods-facts"><div><dt>Role</dt><dd>문자 카피라이팅</dd></div><div><dt>Channel</dt><dd>MMS</dd></div></dl></div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div>
      <div class="sns-project-board editorial-project-board">
        <div class="project-board-message-pair"><img src="./projects/mms-10.png" alt="빌드업코리아 행사 안내 문자 예시" loading="lazy"><img src="./projects/mms-9.png" alt="빌드업코리아 참가 안내 문자 예시" loading="lazy"></div>
        <div class="sns-board-copy"><h3>MMS 카피라이팅</h3><dl><div><dt>주요목표</dt><dd>행사 정보 전달 및 참가 신청 유도</dd></div><div><dt>Channel</dt><dd>MMS</dd></div><div><dt>WHY</dt><dd>행사 소식과 참여 안내를 문자 메시지로 명확하게 전달</dd></div><div><dt>HOW</dt><dd>행사 소식과 참여 안내를 중심으로 문자 메시지 카피를 작성하고, 주요 정보와 신청 안내를 구성</dd></div><div><dt>RESULT</dt><dd>행사 홍보 및 참가 안내를 위한 문자 메시지 카피 제작</dd></div></dl></div>
      </div>
    </section>
    <section class="goods-section mms-case-gallery"><div class="goods-section-heading"><span class="goods-index">MESSAGE ARCHIVE</span></div>
      <div class="mms-gallery">${Array.from({ length: 9 }, (_, index) => 10 - index).map((number, index) => `<figure><figcaption>${String(index + 1).padStart(2, '0')}</figcaption><button class="mms-image-toggle" type="button" aria-label="문자 작업 ${index + 1} 확대" aria-pressed="false"><img src="./projects/mms-${number}.png" alt="MMS 카피라이팅 작업 ${index + 1}" loading="lazy"></button></figure>`).join('')}</div>
    </section>
  </article>`
document.body.append(mmsDialog)
mmsTrigger?.addEventListener('click', () => {
  mmsDialog.showModal()
  mmsDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
mmsDialog.querySelector('.personal-dialog-close')?.addEventListener('click', () => mmsDialog.close())
mmsDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  mmsTrigger?.focus()
})
mmsDialog.addEventListener('click', (event) => {
  if (event.target !== mmsDialog) return
  const bounds = mmsDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) mmsDialog.close()
})
const mmsImageButtons = Array.from(mmsDialog.querySelectorAll<HTMLButtonElement>('.mms-image-toggle'))
mmsImageButtons.forEach((button, index) => {
  const figure = button.closest('figure')!
  const close = document.createElement('button')
  close.type = 'button'
  close.className = 'mms-zoom-close'
  close.textContent = '×'
  close.setAttribute('aria-label', '확대 이미지 닫기')
  close.hidden = true
  button.before(close)
  const navigate = (direction: number) => {
    const next = (index + direction + mmsImageButtons.length) % mmsImageButtons.length
    mmsImageButtons[next]?.click()
  }
  for (const direction of [-1, 1]) {
    const arrow = document.createElement('button')
    arrow.type = 'button'
    arrow.className = `mms-zoom-nav mms-zoom-nav--${direction < 0 ? 'previous' : 'next'}`
    arrow.textContent = direction < 0 ? '‹' : '›'
    arrow.setAttribute('aria-label', direction < 0 ? '이전 문자 보기' : '다음 문자 보기')
    arrow.addEventListener('click', () => navigate(direction))
    figure.append(arrow)
  }
  figure.addEventListener('keydown', (event) => {
    if (!figure.classList.contains('is-expanded')) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      navigate(event.key === 'ArrowLeft' ? -1 : 1)
    }
  })
  const setExpanded = (expanded: boolean) => {
    figure.classList.toggle('is-expanded', expanded)
    button.setAttribute('aria-pressed', String(expanded))
    close.hidden = !expanded
  }
  button.addEventListener('click', () => {
    const expanded = !figure.classList.contains('is-expanded')
    if (expanded) {
      mmsDialog.querySelectorAll<HTMLElement>('.mms-gallery figure.is-expanded').forEach((previous) => {
        if (previous === figure) return
        previous.classList.remove('is-expanded')
        previous.querySelector('.mms-image-toggle')?.setAttribute('aria-pressed', 'false')
        const previousClose = previous.querySelector<HTMLButtonElement>('.mms-zoom-close')
        if (previousClose) previousClose.hidden = true
      })
    }
    setExpanded(expanded)
    if (expanded) {
      figure.scrollIntoView({ block: 'start', behavior: 'instant' })
      close.focus({ preventScroll: true })
    }
  })
  close.addEventListener('click', () => {
    setExpanded(false)
    button.focus({ preventScroll: true })
  })
})

const kakaoTrigger = document.querySelector<HTMLButtonElement>('.kakao-preview')
const kakaoDialog = document.createElement('dialog')
kakaoDialog.className = 'personal-project-dialog everylife-dialog kakao-case-dialog'
kakaoDialog.setAttribute('aria-labelledby', 'kakao-case-title')
kakaoDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero kakao-case-hero"><h2>Kakao<br>Channel</h2></header>
    <section class="goods-section goods-overview dialog-copy"><span class="eyebrow">Channel Management</span><h2 id="kakao-case-title">카카오톡 채널관리</h2>
      <div><p>빌드업코리아의 행사 정보를 효과적으로 전달하기 위해 카카오톡 채널을 운영했습니다. 초기에는 뉴스레터 중심으로 정보를 전달했지만, 실제 운영 과정에서 도달률과 사용자 반응이 기대보다 낮다는 점을 확인했습니다.</p>
        <p>이에 <strong>사용자 접근성이 높은 카카오톡 비즈니스 채널을 중심으로 정보 전달 전략을 전환</strong>했습니다. 채널에 맞는 콘텐츠를 기획·제작하고 SNS 홍보를 병행해, 행사 소식과 참여 안내를 보다 쉽게 받아볼 수 있도록 구성했습니다.</p>
        <p>그 결과 <strong>개설 당시 0명이었던 채널 친구 수가 1,000명 이상으로 증가</strong>했습니다. 같은 기간 뉴스레터 구독자가 0명에서 100명으로 증가한 것과 비교해, <strong>카카오톡 채널을 활용한 정보 전달과 구독자 확보의 효과</strong>를 확인했습니다.</p>
        <dl class="goods-facts"><div><dt>Role</dt><dd>카카오톡 채널 운영</dd></div><div><dt>Channel</dt><dd>KakaoTalk Channel</dd></div></dl>
      </div>
    </section>


    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div><div class="sns-project-board kakao-project-board">
      <img class="sns-board-screens" src="./projects/kakao-channel-board.svg" alt="2025년 개설 초기와 2026년 카카오톡 채널 비교 화면" loading="lazy">
      <div class="sns-board-copy"><h3>카카오톡 채널 운영</h3>
        <dl><div><dt>주요목표</dt><dd>효과적인 행사 정보 전달</dd></div><div><dt>기간</dt><dd>5개월 (2025.02 – 2026.01)</dd></div><div><dt>WHY</dt><dd>초기, 뉴스레터 중심의 정보전달을 진행했지만 실제 운영 과정에서 도달률과<br>사용자 반응이 기대보다 낮음을 확인</dd></div><div><dt>HOW</dt><dd>사용자 접근성이 높은 카카오 비즈니스 채널 중심으로 정보 전달 전략을 수정,<br>비즈니스 채널용 콘텐츠 기획 및 제작, SNS홍보</dd></div><div><dt>RESULT</dt><dd>친구 추가 수 0명 (개설 당시) → 1,000명 증가<br>(뉴스레터 구독자 0명 → 100명 대비 효과적인 결과)</dd></div></dl>
      </div></div></section>
    <section class="goods-section kakao-results"><div class="kakao-result-images"><div class="kakao-result-shot"><img src="./projects/kakao-result-1.png" alt="빌드업코리아 카카오톡 채널 프로필과 행사 소식 화면" loading="lazy" decoding="async"></div><div class="kakao-result-shot"><img src="./projects/kakao-result-2.png" alt="빌드업코리아 카카오톡 채널 소식과 영상·문의 안내 화면" loading="lazy" decoding="async"></div><div class="kakao-result-shot kakao-result-shot--full"><img src="./projects/kakao-result-3.jpg" alt="빌드업코리아 카카오톡 채널 채팅과 주요 채널 바로가기 메뉴" loading="lazy" decoding="async"></div></div></section>
  </article>`
document.body.append(kakaoDialog)
kakaoTrigger?.addEventListener('click', () => {
  kakaoDialog.showModal()
  kakaoDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
kakaoDialog.querySelector('button')?.addEventListener('click', () => kakaoDialog.close())
kakaoDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  kakaoTrigger?.focus()
})
kakaoDialog.addEventListener('click', (event) => {
  if (event.target !== kakaoDialog) return
  const bounds = kakaoDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) kakaoDialog.close()
})

const snsTrigger = document.querySelector<HTMLButtonElement>('.sns-preview')
const snsDialog = document.createElement('dialog')
snsDialog.className = 'personal-project-dialog everylife-dialog sns-case-dialog'
snsDialog.setAttribute('aria-labelledby', 'sns-case-title')
snsDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero sns-case-hero"><h2>SNS Content</h2></header>
    <section class="goods-section goods-overview dialog-copy"><span class="eyebrow">Social Media · Content Planning</span><h2 id="sns-case-title">SNS 콘텐츠 기획 및 제작</h2>
      <div><p>빌드업코리아의 <strong>행사 홍보와 인스타그램 팔로워 확보</strong>를 목표로, 2025년 2월부터 2026년 1월까지 12개월간 SNS 콘텐츠를 기획·제작하고 운영했습니다.</p>
      <p>초기 운영 당시 팔로워 수가 적었던 상황에서 신규 팔로워의 관심을 끌기 위해 <strong>이전 행사 연사들의 스피치, 행사 홍보 배너와 포스터를 활용한 콘텐츠</strong>를 기획했습니다. 연사들의 메시지와 행사 정보를 트렌드에 맞는 형식으로 제작·업로드하며 채널의 콘텐츠를 확장했습니다.</p>
      <p>운영 기간 동안 <strong>인스타그램 팔로워는 1,415명에서 1.2만 명으로 증가</strong>했습니다.</p><dl class="goods-facts"><div><dt>Role</dt><dd>콘텐츠 기획 · 제작 · 업로드</dd></div><div><dt>Channel</dt><dd>Instagram</dd></div><div><dt>Period</dt><dd>2025.02 – 2026.01 · 12개월</dd></div></dl></div>
    </section>


    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div><div class="sns-project-board">
      <svg class="sns-board-screens" viewBox="26 330 563 582" role="img" aria-label="2024년과 2025년 인스타그램 프로필 및 콘텐츠 편집 화면"><image href="./projects/sns-management-board.svg" width="1724" height="912" /></svg>
      <div class="sns-board-copy"><h3>SNS 콘텐츠 기획 및 제작</h3><p class="sns-board-growth">1,415명 → 1.2만 명</p>
        <dl><div><dt>주요목표</dt><dd>행사 홍보 및 팔로워 확보</dd></div><div><dt>기간</dt><dd>12개월 (2025.02 – 2026.01)</dd></div><div><dt>WHY</dt><dd>SNS 초기 운영 당시 팔로워 수가 적어 팔로워 확보를 위해 다양한<br>콘텐츠 중심의 홍보 기획 및 제작 필요</dd></div><div><dt>HOW</dt><dd>이전 행사 연사 스피치, 새로운 행사 홍보 배너, 행사 포스터 및 연사<br>스피치 내용을 중심으로 트렌디한 콘텐츠 기획 및 제작, 업로드</dd></div><div><dt>RESULT</dt><dd>팔로워 수 기준 1,415명 → 1.2만 증가</dd></div></dl>
      </div>
    </div></section>

    <section class="goods-section sns-sample-section"><div class="sns-sample-gallery">
      ${[5, 1, 2, 3, 4, 6].map((number) => `${number === 6 ? '<div class="sns-status-crop">' : ''}<img class="${number === 5 ? 'sns-sample-wide' : ''}" src="./projects/sns-sample-${number}.jpg" alt="빌드업코리아 SNS 콘텐츠 제작 예시 ${number}" loading="lazy" decoding="async">${number === 6 ? '</div>' : ''}`).join('')}
          <div class="sns-reel-embed">
        <iframe src="https://www.instagram.com/reel/DHVtDAwJ6iF/embed/" title="빌드업코리아 인스타그램 릴스" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <a href="https://www.instagram.com/reel/DHVtDAwJ6iF/" target="_blank" rel="noopener noreferrer">인스타그램에서 릴스 보기 ↗</a>
      </div>
</div></section>
  </article>`
document.body.append(snsDialog)
snsTrigger?.addEventListener('click', () => {
  snsDialog.showModal()
  snsDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
snsDialog.querySelector('button')?.addEventListener('click', () => snsDialog.close())
snsDialog.addEventListener('close', () => { document.body.style.overflow = ''; snsTrigger?.focus() })
snsDialog.addEventListener('click', (event) => {
  if (event.target !== snsDialog) return
  const bounds = snsDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) snsDialog.close()
})

const renewalScreens = (name: string, title: string, count: number) => `
  <div class="renewal-screen-bar"><span>${title}</span><small>화면 안에서 스크롤 ↓</small></div>
  <div class="renewal-scroll-frame"><div class="renewal-screen" tabindex="0" role="region" aria-label="${title} PDF 전체 ${count}페이지, 스크롤하여 보기">
    ${Array.from({ length: count }, (_, index) => `<img src="./projects/renewal/${name}-${index + 1}.jpg" alt="${title} 개편 시안 ${index + 1} / ${count}페이지" loading="lazy" decoding="async">`).join('')}
  </div><div class="renewal-scroll-track" aria-hidden="true"><div class="renewal-scroll-thumb"></div></div></div>`

const renewalTrigger = document.querySelector<HTMLElement>('.renewal-preview')
const renewalDialog = document.createElement('dialog')
renewalDialog.className = 'personal-project-dialog everylife-dialog renewal-case-dialog'
renewalDialog.setAttribute('aria-labelledby', 'renewal-case-title')
renewalDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero renewal-case-hero"><h2>Website<br>Renewal</h2></header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">Website Planning</span><h2 id="renewal-case-title">사이트 개편</h2>
      <div><p><strong>빌드업코리아 관련 구글 검색량이 일평균 100건 이상 발생한다는 점에 주목해, 검색을 통해 유입된 방문자에게 단체의 정체성과 주요 활동을 효과적으로 전달하고자 웹사이트 개편을 진행</strong>했습니다.</p>
<p>단체 소개와 미션, 주요 행사 정보를 직관적으로 탐색할 수 있도록 콘텐츠 구조를 재정비하고, 메인 페이지에 뉴스레터 구독 섹션을 배치해 지속적인 소통과 구독 전환을 유도했습니다.</p>
<p>또한 실제 행사 현장을 담은 영상을 직접 제작해 메인 화면에 적용함으로써, 방문자가 단체의 활동과 행사 분위기를 시각적으로 경험할 수 있도록 구성했습니다.</p><dl class="goods-facts"><div><dt>Role</dt><dd>페이지 구성 · 콘텐츠 기획</dd></div><div><dt>Tool</dt><dd>Canva, Adobe Illustrator</dd></div></dl></div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">PROJECT BOARD</span></div>
      <div class="sns-project-board editorial-project-board">
        <img class="sns-board-screens" src="./projects/previews/renewal-main.jpg" alt="빌드업코리아 웹사이트 메인 페이지 개편 시안" loading="lazy">
        <div class="sns-board-copy"><h3>사이트 개편 기획</h3><dl><div><dt>주요목표</dt><dd>행사 정보 접근성 개선 및 구독·등록 동선 구성</dd></div><div><dt>Tool</dt><dd>Canva, Adobe Illustrator</dd></div><div><dt>WHY</dt><dd>단체 소개와 행사·콘텐츠 정보를 정리하고, 방문자가 필요한 정보에 쉽게 접근할 수 있도록 페이지 구성 개선</dd></div><div><dt>HOW</dt><dd>메인·About Us·미디어 페이지의 콘텐츠와 이동 흐름 기획. 행사 영상·뉴스레터 구독·단체 소개·미디어 콘텐츠 배치</dd></div><div><dt>RESULT</dt><dd>개편 시안을 적용한 웹사이트 개설<br>*현재는 웹사이트를 사용하지 않아 링크 제공이 어렵습니다.</dd></div></dl></div>
      </div>
    </section>
    <section class="goods-section renewal-case-pages">
      <figure><figcaption><span>01</span><h3>Main</h3><p>행사 영상과 뉴스레터 구독을 첫 화면에 배치하고, 단체 소개·행사·콘텐츠·샵으로 연결했습니다.</p></figcaption>${renewalScreens('main', 'Main', 8)}</figure>
      <figure><figcaption><span>02</span><h3>About Us</h3><p>단체 소개와 미션·비전을 한영 콘텐츠로 정리하고, 지난 행사와 연도별 활동을 구성했습니다.</p></figcaption>${renewalScreens('about', 'About Us', 6)}</figure>
      <figure><figcaption><span>03</span><h3>Media</h3><p>인스타그램·유튜브 콘텐츠를 모아 보여주고, 뉴스레터 구독과 카카오톡 채널로 연결했습니다.</p></figcaption>${renewalScreens('media', 'Media', 3)}</figure>
    </section>
    <p class="renewal-site-note">*개편 내용을 적용해 웹사이트 개설했습니다. 현재는 사이트를 사용하지 않아 링크 제공이 어렵습니다.</p>
  </article>`
document.body.append(renewalDialog)

renewalDialog.querySelectorAll<HTMLElement>('.renewal-scroll-frame').forEach((frame) => {
  const viewport = frame.querySelector<HTMLElement>('.renewal-screen')!
  const track = frame.querySelector<HTMLElement>('.renewal-scroll-track')!
  const thumb = frame.querySelector<HTMLElement>('.renewal-scroll-thumb')!
  const update = () => {
    const height = track.clientHeight
    const thumbHeight = Math.min(height, Math.max(28, height * viewport.clientHeight / Math.max(1, viewport.scrollHeight)))
    const progress = viewport.scrollTop / Math.max(1, viewport.scrollHeight - viewport.clientHeight)
    thumb.style.height = `${thumbHeight}px`
    thumb.style.transform = `translateY(${progress * (height - thumbHeight)}px)`
  }
  viewport.addEventListener('scroll', update, { passive: true })
  viewport.querySelectorAll('img').forEach((image) => image.addEventListener('load', update))
  const observer = new ResizeObserver(update)
  observer.observe(viewport)
  let grabOffset = 0
  const move = (event: PointerEvent) => {
    const travel = track.clientHeight - thumb.offsetHeight
    const progress = Math.max(0, Math.min(1, (event.clientY - track.getBoundingClientRect().top - grabOffset) / Math.max(1, travel)))
    viewport.scrollTop = progress * (viewport.scrollHeight - viewport.clientHeight)
  }
  track.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    grabOffset = event.target === thumb ? event.clientY - thumb.getBoundingClientRect().top : thumb.offsetHeight / 2
    track.setPointerCapture(event.pointerId)
    move(event)
  })
  track.addEventListener('pointermove', (event) => {
    if (track.hasPointerCapture(event.pointerId)) move(event)
  })
  track.addEventListener('pointerup', (event) => {
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
  })
})

renewalTrigger?.addEventListener('click', () => {
  renewalDialog.showModal()
  renewalDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
renewalTrigger?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    renewalTrigger.click()
  }
})
renewalDialog.querySelector('.personal-dialog-close')?.addEventListener('click', () => renewalDialog.close())
renewalDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  renewalTrigger?.focus()
})
renewalDialog.addEventListener('click', (event) => {
  if (event.target !== renewalDialog) return
  const bounds = renewalDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) renewalDialog.close()
})

const instituteTrigger = document.querySelector<HTMLButtonElement>('.institute-preview')
const instituteDialog = document.createElement('dialog')
instituteDialog.className = 'personal-project-dialog everylife-dialog institute-dialog'
instituteDialog.setAttribute('aria-labelledby', 'institute-dialog-title')
instituteDialog.innerHTML = `<button class="personal-dialog-close" type="button" aria-label="닫기">×</button>
  <article class="goods-case">
    <header class="goods-hero"><h2>1776<br>Institute.</h2></header>
    <section class="goods-section goods-overview dialog-copy">
      <span class="eyebrow">Merch Sticker</span><h2 id="institute-dialog-title">1776연구소 굿즈작업</h2>
      <div><p>1776연구소를 위한 굿즈 스티커 디자인입니다. 1776연구소를 대표하는 자유의 종, 자유의 종을 캐릭터화한 일러스트, 연구소 문구를 활용한 일러스트, 타이포그래피를 각각 활용해 네 가지 스티커를 제작했습니다. 해당 스티커는 오프라인 부스에서 굿즈로 판매되었습니다.</p><dl class="goods-facts"><div><dt>Role</dt><dd>Illustration · Graphic Design</dd></div><div><dt>Tool</dt><dd>Adobe Illustrator</dd></div></dl></div>
    </section>
    <section class="goods-section"><div class="goods-section-heading"><span class="goods-index">COLOR PALETTE</span></div>
      <div class="goods-palette"><div><i style="background:#EFE8D5"></i><span>Cream</span><small>#EFE8D5</small></div><div><i style="background:#D8B128"></i><span>Gold</span><small>#D8B128</small></div><div><i style="background:#F6F5AF"></i><span>Lemon</span><small>#F6F5AF</small></div><div><i style="background:#E91D46"></i><span>Red</span><small>#E91D46</small></div><div><i style="background:#0B0D09"></i><span>Black</span><small>#0B0D09</small></div></div>
    </section>
    <section class="goods-section goods-design-board"><div class="goods-section-heading"><span class="goods-index">DESIGN BOARD</span></div>
      <div class="institute-sticker-grid">${[2, 3, 4, 7].map((number) => `<a href="./projects/1776/sticker-${number}-cutout.png" target="_blank" rel="noopener noreferrer" aria-label="1776 스티커 ${number} 크게 보기"><img src="./projects/1776/sticker-${number}-cutout.png" alt="1776연구소 스티커 ${number}" loading="lazy" decoding="async"></a>`).join('')}</div>
    </section>
  </article>`
document.body.append(instituteDialog)
instituteTrigger?.addEventListener('click', () => {
  instituteDialog.showModal()
  instituteDialog.scrollTop = 0
  document.body.style.overflow = 'hidden'
})
instituteDialog.querySelector('.personal-dialog-close')?.addEventListener('click', () => instituteDialog.close())
instituteDialog.addEventListener('close', () => {
  document.body.style.overflow = ''
  instituteTrigger?.focus()
})
instituteDialog.addEventListener('click', (event) => {
  if (event.target !== instituteDialog) return
  const bounds = instituteDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) instituteDialog.close()
})

const stickerZoomDialog = document.createElement('dialog')
stickerZoomDialog.className = 'institute-sticker-zoom'
stickerZoomDialog.setAttribute('aria-label', '1776 스티커 확대 보기')
stickerZoomDialog.innerHTML = '<button class="sticker-zoom-close" type="button" aria-label="확대 이미지 닫기">×</button><img alt="">'
document.body.append(stickerZoomDialog)
let stickerZoomTrigger: HTMLAnchorElement | null = null
instituteDialog.querySelectorAll<HTMLAnchorElement>('.institute-sticker-grid a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    stickerZoomTrigger = link
    const image = stickerZoomDialog.querySelector('img')!
    image.src = link.href
    image.alt = link.querySelector('img')?.alt ?? '1776 스티커'
    stickerZoomDialog.showModal()
  })
})
stickerZoomDialog.querySelector('button')?.addEventListener('click', () => stickerZoomDialog.close())
stickerZoomDialog.addEventListener('close', () => stickerZoomTrigger?.focus({ preventScroll: true }))
stickerZoomDialog.addEventListener('click', (event) => {
  if (event.target !== stickerZoomDialog) return
  const bounds = stickerZoomDialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) stickerZoomDialog.close()
})
