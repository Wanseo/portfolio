import './style.css'
import { initTitleDust } from './titleDust'

const titleSurfaceEffectsEnabled = false
const cornerVerseEnabled = false

if (!document.querySelector('#app > .intro')) document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="intro${titleSurfaceEffectsEnabled ? '' : ' title-surface-effects-off'}">
    <canvas class="title-dust" aria-hidden="true"></canvas>
    <div class="brand">
      <h1 aria-label="Wanseo's portfolio">
        <span class="brand-highlight" data-hover-text="Wanseo's">Wanseo's</span>
        <span class="brand-highlight" data-hover-text="portfolio">portfolio</span>
      </h1>
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
      <a class="active" id="tab-introduce" href="#introduce" role="tab" aria-selected="true" aria-controls="introduce" data-panel="introduce">Cover Letter</a>
      <a id="tab-cv" href="#cv" role="tab" aria-selected="false" aria-controls="cv" data-panel="cv">CV</a>
      <a id="tab-work" href="#work" role="tab" aria-selected="false" aria-controls="work" data-panel="work">Work</a>
      <a hidden id="tab-beauty" href="#beauty" role="tab" aria-selected="false" aria-controls="beauty" data-panel="beauty">the beauty</a>
      <a hidden id="tab-material" href="#material" role="tab" aria-selected="false" aria-controls="material" data-panel="material">material research</a>
      <a hidden id="tab-traveling" href="#traveling" role="tab" aria-selected="false" aria-controls="traveling" data-panel="traveling">traveling</a>
      <a hidden id="tab-bookshelf" href="#bookshelf" role="tab" aria-selected="false" aria-controls="bookshelf" data-panel="bookshelf">bookshelf</a>
      <a hidden id="tab-drawing" href="#drawing" role="tab" aria-selected="false" aria-controls="drawing" data-panel="drawing">drawing</a>
      <a hidden id="tab-shop" href="#shop" role="tab" aria-selected="false" aria-controls="shop" data-panel="shop">shop</a>
      <a id="tab-contact" href="#contact" role="button" aria-expanded="false" aria-controls="contact">contact</a>
    </nav>
    <section class="portfolio-panel about-panel" id="introduce" role="tabpanel" aria-labelledby="tab-introduce">
      <p class="about-eyebrow">COVER LETTER</p>
      <header class="about-header">
        <h2>기술을 이해하고,<br>그 가치를 전달하는 마케터.</h2>
      </header>
      <div class="about-story">
        <p>안녕하세요. 컴퓨터공학 전공과 개발·마케팅 실무 경험을 바탕으로, 기술의 핵심 가치를 발견하고 이를 효과적인 메시지와 콘텐츠로 전달할 수 있는 조완서입니다.</p>
        <h3 class="about-story__heading">기술을 만드는 현장에서 기술에 대한 이해와 문제 해결 역량을 쌓았습니다.</h3>
        <p>자율주행 기술 기업 스트라드비젼에서 인턴 근무 후 정규직 제안을 받아 입사했습니다.<br>차선 인식(LD) 딥러닝 알고리즘 개선, 모델 학습 및 테스트 모델 선별, 테스트 데이터베이스 구축 등을 담당하며 기술의 구조와 개발 프로세스를 이해하고, 데이터를 기반으로 문제를 분석하고 해결하는 역량을 쌓았습니다.</p>
        <h3 class="about-story__heading">기술을 구현하는 일에서, 가치를 전하는 일에 관심을 갖게 되었습니다.</h3>
        <p>개발자로 일하면서 기술을 구현하는 일뿐 아니라, 복잡한 내용을 다른 사람에게 이해하기 쉽게 전달하고 시각적으로 표현하는 일에 더 큰 흥미가 있음을 발견했습니다. 시사만화가인 아버지의 영향으로 어릴 때부터 관심을 가졌던 디자인 영역을 본격적으로 탐색했고, Illustrator와 Figma를 독학해 세 건의 외주 프로젝트를 수행했습니다. 이 과정을 통해 메시지를 시각적으로 구체화하는 경험을 쌓았습니다.</p>
        <h3 class="about-story__heading">다양한 채널의 콘텐츠를 기획하고 참여 확대로 연결했습니다.</h3>
        <p>이후 빌드업코리아에서 마케팅을 담당하며 콘텐츠 기획부터 브랜드 커뮤니케이션, 행사 홍보까지 폭넓은 실무 경험을 쌓았습니다. 특히 3,000명 규모의 컨퍼런스 마케팅과 행사·이벤트 기획을 담당하며 다양한 채널을 활용한 커뮤니케이션을 실행했습니다.</p>
        <p>뉴스레터, 블로그, 문자 광고, 카카오톡 채널, 홈페이지 리뉴얼, 인스타그램 릴스 및 홍보 배너, 책자 제작 등 여러 접점에서 콘텐츠를 기획·제작했으며, 담당 기간 중 인스타그램 팔로워는 약 5,000명에서 1만 명으로 증가했고, 컨퍼런스 참가자 수 역시 전년 2,000명에서 3,000명으로 늘어났습니다.</p>
        <h3 class="about-story__heading">기술의 가치를 시장에 전달하는 커뮤니케이션 전문가로 성장하겠습니다.</h3>
        <p>개발 현장에서 쌓은 기술적 이해, 디자인을 통한 시각적 표현 역량, 다양한 채널에서 축적한 마케팅 경험은 저만의 차별화된 강점입니다.</p>
        <p>이를 바탕으로 복잡한 기술과 제품의 핵심 가치를 명확한 메시지로 풀어내고, 다양한 콘텐츠와 커뮤니케이션 활동을 통해 기업의 기술 경쟁력과 브랜드 가치를 효과적으로 전달하는 Marketing Communications 전문가로 성장하고자 합니다.</p>
      </div>
    </section>
    <section class="portfolio-panel resume-panel" id="cv" role="tabpanel" aria-labelledby="tab-cv" hidden>
      <section class="resume-skills" aria-labelledby="skills-title">
        <header class="resume-heading"><span>01</span><h2 id="skills-title">기술 <small>SKILLS</small></h2></header>
        <ul class="resume-skill-list">
          <li>Adobe Illustrator</li>
          <li>Adobe Photoshop</li>
          <li>Figma</li>
          <li>ChatGPT Codex Design</li>
          <li>CapCut</li>
          <li>VLLO</li>
          <li>OPIc IH</li>
          <li>Python</li>
          <li>C++</li>
        </ul>
      </section>
      <div class="resume-career-column">
      <section class="resume-experience" aria-labelledby="experience-title">
        <header class="resume-heading"><span>02</span><h2 id="experience-title">경력 <small>EXPERIENCE</small></h2></header>
        <ol class="resume-timeline">
          <li class="resume-job">
            <p class="resume-job__date">2021.09 — 2024.06</p>
            <div class="resume-job__body">
              <p class="resume-job__company">STRADVISION <span>스트라드비젼</span></p>
              <h3>Lane Detection Algorithm Engineer</h3>
              <ul><li>LD Algorithm 개선</li><li>최적 모델 학습</li><li>데이터베이스 구축 및 관리</li></ul>
            </div>
          </li>
          <li class="resume-job">
            <p class="resume-job__date">2024.06 — 2024.12</p>
            <div class="resume-job__body">
              <p class="resume-job__company">Freelance Design Work <span>디자인 외주</span> <a class="resume-work-link" href="#work-freelance" data-work-link="work-freelance" aria-label="Freelance Design Work 작업 보기"><svg class="resume-work-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 8h8M8 4l4 4-4 4" /></svg></a></p>
              <ul class="resume-freelance-projects"><li>1776연구소 굿즈작업</li><li>연개청 로고제작</li><li>연개청 책자 표지디자인</li><li>에브리라이프 굿즈작업</li></ul>
            </div>
          </li>
          <li class="resume-job">
            <p class="resume-job__date">2025.02 - 2026.02</p>
            <div class="resume-job__body">
              <p class="resume-job__company">Build Up Korea <span>빌드업코리아</span> <a class="resume-work-link" href="#work-buildup" data-work-link="work-buildup" aria-label="빌드업코리아 작업 보기"><svg class="resume-work-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 8h8M8 4l4 4-4 4" /></svg></a></p>
              <h3>사원 (Marketing)</h3>
              <ul><li>뉴스레터 기획/제작</li><li>블로그 기획/제작</li><li>문자 카피라이팅</li><li>카카오톡 채널 운영</li><li>홈페이지 리뉴얼</li><li>SNS(인스타그램) 릴스 및 홍보 배너 기획 및 제작</li><li>영/한 홍보책자 제작</li><li>대행사 커뮤니케이션</li></ul>
            </div>
          </li>
          <li class="resume-job">
            <p class="resume-job__date">2026.05-Now</p>
            <div class="resume-job__body">
              <p class="resume-job__company">Personal Project <span>개인 프로젝트</span> <a class="resume-work-link" href="#work-personal" data-work-link="work-personal" aria-label="개인 프로젝트 작업 보기"><svg class="resume-work-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 8h8M8 4l4 4-4 4" /></svg></a></p>
              <ul class="resume-freelance-projects"><li>Interactive 웹 서비스 기획 및 제작</li></ul>
            </div>
          </li>
        </ol>
      </section>
      <section class="resume-education" aria-labelledby="education-title">
        <header class="resume-heading"><span>03</span><h2 id="education-title">학력 <small>EDUCATION</small></h2></header>
        <div class="resume-job resume-education__entry">
          <p class="resume-job__date">2017 — 2021</p>
          <div class="resume-job__body">
            <p class="resume-job__company">한동대학교 <span>Handong Global University</span></p>
            <p class="resume-education__degree">학사 <span aria-hidden="true">/</span> 컴퓨터공학심화 전공</p>
          </div>
        </div>
      </section>
      </div>
    </section>
    <section class="portfolio-panel work-panel" id="work" role="tabpanel" aria-labelledby="tab-work" hidden>
      <header class="work-overview-heading">
        <h2 id="work-freelance" tabindex="-1">Freelance Design Work</h2>
      </header>
      <div class="work-project-grid work-project-grid--freelance">
        <article class="work-project">
          <h3>1776연구소 굿즈작업</h3>
          <div class="work-project__placeholder" role="img" aria-label="1776연구소 굿즈작업 대표 이미지 준비 중"></div>
        </article>
        <article class="work-project">
          <h3>연개청 로고제작</h3>
          <a class="work-logo-preview" href="./projects/yeongae-logo-sharp.png" target="_blank" rel="noopener noreferrer" aria-label="연금개혁청년행동 로고 크게 보기"><img src="./projects/yeongae-logo-green-transparent.png" alt="연금개혁청년행동 초록색 로고" loading="eager" decoding="async"></a>
        </article>
        <article class="work-project">
          <h3>연개청 책자 표지디자인</h3>
          <a class="work-booklet-preview" href="./projects/yeongae-booklet.png" target="_blank" rel="noopener noreferrer" aria-label="연개청 책자 표지 크게 보기"><svg class="booklet-preview-badge" viewBox="875 390 700 140" role="img" aria-label="2024년 연금개혁"><image href="./projects/previews/yeongae-booklet.jpg" width="2481" height="3508" /></svg><img src="./projects/previews/yeongae-booklet.jpg" alt="2024년 연금개혁 — MZ세대가 생각하는 국가 미래를 위한 연금개혁 방향 책자 표지" loading="eager" decoding="async"></a>
        </article>
        <article class="work-project">
          <h3>에브리라이프 굿즈작업</h3>
          <button class="everylife-preview" type="button" aria-label="everylife 굿즈 프로젝트 상세 보기">
            <img src="./projects/everylife-card.webp" alt="everylife 로고와 기저귀·아기 스티커" loading="eager" decoding="async">
            <span class="everylife-card-number">01</span>
            <span class="everylife-card-caption"><strong>everylife</strong><span>Merch Sticker ↗</span></span>
          </button>
        </article>
      </div>
      <header class="work-overview-heading">
        <h2 id="work-buildup" tabindex="-1">Build Up Korea</h2>
      </header>
      <div class="work-project-grid work-project-grid--freelance">
        <article class="work-project">
          <h3>사이트 개편</h3>
          <div class="renewal-preview" aria-label="빌드업코리아 메인, About Us, 미디어 페이지 개편 시안">
            <span class="renewal-preview-title">Website Renewal</span>
            <div class="renewal-preview-browser">
              <div class="renewal-preview-toolbar" aria-hidden="true"><i></i><i></i><i></i><span>BUILD UP KOREA</span></div>
              <img class="renewal-preview-main" src="./projects/previews/renewal-main.jpg" alt="메인 페이지 개편 시안" loading="lazy" decoding="async">
              <div class="renewal-preview-pages">
                <figure><img src="./projects/previews/renewal-about.jpg" alt="단체 소개와 미션·비전 페이지 시안" loading="lazy" decoding="async"><figcaption>About Us</figcaption></figure>
                <figure><img src="./projects/previews/renewal-media.jpg" alt="인스타그램·유튜브 콘텐츠를 모은 미디어 페이지 시안" loading="lazy" decoding="async"><figcaption>Media</figcaption></figure>
              </div>
            </div>
            <span class="renewal-preview-caption">메인 · About Us · 미디어 페이지 기획</span>
          </div>
        </article>
        <article class="work-project">
          <h3>뉴스레터 기획/제작</h3>
          <button class="newsletter-preview" type="button" aria-label="빌드업코리아 뉴스레터 세 편 상세 보기">
            <span class="newsletter-preview-title">Newsletter</span>
            <svg class="newsletter-envelope" viewBox="60 85 275 205" role="img" aria-label="파란 봉투 메시지 그래픽"><image href="./projects/newsletter-1.png" width="397" height="689" /></svg>
            <img class="newsletter-platform-logo" src="./projects/stibee-logo-transparent.png" alt="stibee" loading="eager" decoding="async">
          </button>
        </article>
        <article class="work-project">
          <h3>네이버 블로그 관리</h3>
          <button class="blog-preview" type="button" aria-label="빌드업코리아 네이버 블로그 작업 상세 보기">
            <img class="blog-preview-logo" src="./projects/naver-blog-logo-transparent.png" alt="네이버 블로그" loading="eager" decoding="async">
            <span class="blog-preview-window"><span class="blog-preview-toolbar"><i></i><i></i><i></i><span>blog.naver.com/bukofficial</span></span><svg viewBox="0 29 1040 467" role="img" aria-label="빌드업코리아2025 블로그 메인 배너"><image href="./projects/previews/buildup-blog.jpg" width="1040" height="882" /></svg><span class="blog-preview-window-bottom">BUILD UP KOREA 2025</span></span>
          </button>
        </article>
        <article class="work-project">
          <h3>MMS 카피라이팅</h3>
          <button class="mms-preview" type="button" aria-label="MMS 카피라이팅 작업 10개 상세 보기">
            <img class="mms-preview-logo" src="./projects/messages-logo.svg" alt="메시지" loading="eager" decoding="async">
            <span class="mms-preview-screens"><img src="./projects/previews/mms-2.jpg" alt="문자 카피라이팅 작업 예시" loading="eager" decoding="async"><img src="./projects/previews/mms-1.jpg" alt="빌드업코리아 문자 메시지" loading="eager" decoding="async"><img src="./projects/previews/mms-3.jpg" alt="문자 카피라이팅 작업 예시" loading="eager" decoding="async"></span>
          </button>
        </article>
        <article class="work-project">
          <h3>카카오톡 채널관리</h3>
          <button class="kakao-preview" type="button" aria-label="빌드업코리아 카카오톡 채널 운영 상세 보기">
            <img class="kakao-preview-logo" src="./projects/kakao-channel-bubble.png" alt="카카오톡 채널" loading="eager" decoding="async">
            <span class="kakao-preview-title">카카오톡 채널</span>
            <span class="kakao-preview-count"><span>273<small>2025 개설 초</small></span><span class="kakao-preview-arrow">→</span><span>1,089<small>2026</small></span></span>
          </button>
        </article>
        <article class="work-project">
          <h3>SNS관리</h3>
          <button class="sns-preview" type="button" aria-label="SNS 콘텐츠 기획 및 제작 상세 보기"><img class="sns-preview-instagram" src="./projects/instagram-transparent.png" alt="Instagram" loading="eager" decoding="async"><strong>SNS 콘텐츠 기획 및 제작</strong><span class="sns-preview-result"><span>1,415<small>운영 초기</small></span><span class="sns-preview-arrow">→</span><span>1.2만<small>팔로워</small></span></span></button>
        </article>
      </div>
      <header class="work-overview-heading">
        <h2 id="work-personal" tabindex="-1">Personal Project</h2>
      </header>
      <div class="work-project-grid">
        <article class="work-project">
          <h3>SKYLRK</h3>
          <a class="personal-project-preview" href="https://wanseo.github.io/swag2/" target="_blank" rel="noopener noreferrer" data-personal-project="SKYLRK" aria-label="SKYLRK 프로젝트 상세 보기">
            <video data-preview-src="./projects/moodroom.mp4" data-preview-poster="./projects/moodroom.jpg" muted loop playsinline preload="none" aria-label="SKYLRK 미리보기"></video>
            <span class="personal-project-arrow" aria-hidden="true">↗</span>
          </a>
        </article>
        <article class="work-project">
          <h3>Guestbook</h3>
          <a class="personal-project-preview" href="https://wanseo.github.io/myfirstweb/" target="_blank" rel="noopener noreferrer" data-personal-project="Guestbook" aria-label="Guestbook 프로젝트 상세 보기">
            <video data-preview-src="./projects/guestbook.mp4" data-preview-poster="./projects/guestbook.jpg" muted loop playsinline preload="none" aria-label="Guestbook 미리보기"></video>
            <span class="personal-project-arrow" aria-hidden="true">↗</span>
          </a>
        </article>
        <article class="work-project">
          <h3>GLYF</h3>
          <a class="personal-project-preview" href="https://wanseo.github.io/glyfing/" target="_blank" rel="noopener noreferrer" data-personal-project="GLYF" aria-label="GLYF 프로젝트 상세 보기">
            <video data-preview-src="./projects/glyfing-main.mp4" data-preview-poster="./projects/glyfing-main.jpg" muted loop playsinline preload="none" aria-label="GLYF 미리보기"></video>
            <span class="personal-project-arrow" aria-hidden="true">↗</span>
          </a>
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
    <section class="contact-panel" id="contact" aria-label="Contact details" hidden>
      <a href="mailto:wanseo1206@gmail.com">wanseo1206@gmail.com</a>
      <a href="tel:+821084413231">010-8441-3231</a>
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

const contactToggle = document.querySelector<HTMLAnchorElement>('#tab-contact')
const contactDropdown = document.querySelector<HTMLElement>('#contact')

const positionContactDropdown = () => {
  if (!contactToggle || !contactDropdown || contactDropdown.hidden) return
  const anchor = contactToggle.getBoundingClientRect()
  const container = contactDropdown.offsetParent?.getBoundingClientRect()
  if (!container) return
  const left = Math.max(0, Math.min(
    anchor.left - container.left,
    container.width - contactDropdown.offsetWidth - 16,
  ))
  contactDropdown.style.left = `${left}px`
  contactDropdown.style.top = `${anchor.bottom - container.top + 8}px`
}

const closeContactDropdown = () => {
  if (contactDropdown) contactDropdown.hidden = true
  contactToggle?.setAttribute('aria-expanded', 'false')
}

contactToggle?.addEventListener('click', (event) => {
  event.preventDefault()
  if (!contactDropdown) return
  contactDropdown.hidden = !contactDropdown.hidden
  contactToggle.setAttribute('aria-expanded', String(!contactDropdown.hidden))
  positionContactDropdown()
})
contactToggle?.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault()
    contactToggle.click()
  }
})
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Node)) return
  if (contactToggle?.contains(event.target) || contactDropdown?.contains(event.target)) return
  closeContactDropdown()
})
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || contactDropdown?.hidden !== false) return
  closeContactDropdown()
  contactToggle?.focus({ preventScroll: true })
})
window.addEventListener('resize', positionContactDropdown)
document.fonts.ready.then(positionContactDropdown)

const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu > a[data-panel]')
const portfolioPanels = document.querySelectorAll<HTMLElement>('.portfolio-panel')

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', (event) => {
    event.preventDefault()
    titleDust?.dropFromElement(menuLink)
    closeContactDropdown()
    if (menuLink.dataset.panel === 'work') void import('./workDetails')
    if (menuLink.dataset.panel === 'traveling') void import('./travelGlobe')

    menuLinks.forEach((link) => {
      link.classList.remove('active')
      link.setAttribute('aria-selected', 'false')
    })
    menuLink.classList.add('active')
    menuLink.setAttribute('aria-selected', 'true')
    portfolioPanels.forEach((panel) => {
      panel.hidden = panel.id !== menuLink.dataset.panel
    })
    try {
      window.sessionStorage.setItem('portfolio-panel', menuLink.dataset.panel ?? 'introduce')
    } catch {
      // Navigation works even when browser storage is unavailable.
    }
  })
})

try {
  const savedPanel = window.sessionStorage.getItem('portfolio-panel')
  Array.from(menuLinks).find((link) => !link.hidden && link.dataset.panel === savedPanel)?.click()
} catch {
  // Use the default Cover Letter when browser storage is unavailable.
}

document.querySelectorAll<HTMLAnchorElement>('[data-work-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    document.querySelector<HTMLAnchorElement>('#tab-work')?.click()
    const target = document.getElementById(link.dataset.workLink ?? '')
    target?.focus({ preventScroll: true })
    target?.scrollIntoView({ block: 'start', behavior: 'instant' })
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


const previewVideoObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const video = entry.target as HTMLVideoElement
    if (entry.isIntersecting && !document.hidden) {
      if (!video.src) {
        video.poster = video.dataset.previewPoster ?? ''
        video.src = video.dataset.previewSrc ?? ''
      }
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) void video.play().catch(() => {})
    } else video.pause()
  }
}, { threshold: 0.05 })
document.querySelectorAll<HTMLVideoElement>('video[data-preview-src]').forEach((video) => previewVideoObserver.observe(video))
document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.querySelectorAll<HTMLVideoElement>('video[data-preview-src]').forEach((video) => video.pause())
  else document.querySelectorAll<HTMLVideoElement>('video[data-preview-src]').forEach((video) => {
    previewVideoObserver.unobserve(video)
    previewVideoObserver.observe(video)
  })
})
