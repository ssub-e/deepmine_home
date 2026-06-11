# DeepDemand Design System (DDDS) Specification

이 문서는 (주)딥마인의 B2B AI 미래 수요 예측 솔루션 'DeepDemand' 및 대고객 홈페이지 전반에 적용되는 프리미엄 디자인 시스템(DDDS) 명세서입니다. 본 명세서는 디자이너와 엔지니어링 그룹이 별도의 참조 코드나 완성된 프로젝트 소스코드를 확인하지 않고도 일관된 브랜드 아이덴티티와 대한민국 디지털 정부 서비스 가이드라인(KRDS)의 웹 접근성 기준을 충족하는 화면을 완벽히 구현 및 재현할 수 있도록 설계되었습니다.

---

## 🏗️ 1. 디자인 철학 및 원칙 (Core Principles)

DeepDemand 디자인 시스템은 **"신뢰성(Trust)"**, **"초저마찰(Zero-Friction)"**, **"포용성(Accessibility)"**의 세 가지 핵심 기둥을 바탕으로 동작합니다.

1. **초저마찰 데이터 인지 (Zero-Friction Cognitive Load)**
   * 수만 개의 SKU 테이블과 시계열 예측 데이터 속에서 사용자가 **3초 이내**에 '내일 추천 발주량'과 '품절/과적재 리스크 신호'를 시각적으로 인지할 수 있도록 그리드 밀도와 시각적 위계를 극대화합니다.
2. **신뢰감을 주는 프리미엄 에디토리얼 (Premium Editorial & Intelligent)**
   * 차가운 블루-그레이 톤의 획일화된 SaaS 레이아웃에서 탈피하여, 깊은 신뢰감을 주는 **딥마인 딥네이비(Navy Blue)**를 주 기조로 하고, 부드러운 **슬레이트(Slate)와 크림(Cream) 캔버스**를 교차하여 지적인 고급 저널의 가독성과 세련된 감각을 연출합니다.
3. **국가 디지털 서비스 표준(KRDS) 및 접근성 준수 (Inclusive & Semantic)**
   * 스크린 리더 대체 텍스트 제공, 명도 대비 4.5:1 준수, 키보드 단독 포커스 이동 및 표시 링 보장 등 장애인과 고령자를 포함한 모든 사용자가 장벽 없이 엔터프라이즈 AI 대시보드를 탐색할 수 있도록 설계 규격을 강제합니다.

---

## 🎨 2. 색상 시스템 및 테마 토큰 (Color Palette)

DDDS는 CSS Variables(HSL)와 Tailwind CSS의 하이브리드 바인딩 모델을 준수하여, 다크 모드와 라이트 모드 간의 명도 전환을 일관되게 처리합니다.

### 2.1. HSL CSS variables 선언 (`src/index.css` 기준)

```css
@layer base {
  :root {
    --primary: 221 83% 53%;       /* #1D4ED8 (신뢰의 딥블루) */
    --accent: 191 78% 64%;        /* #5ACAE8 (강조 시안 블루) */
    --background: 210 20% 98%;    /* #F8FAFC (라이트 본문 배경) */
    --canvas-cream: 48 24% 97%;   /* #FAF9F5 (에디토리얼 크림 캔버스) */
    --surface: 0 0% 100%;         /* #FFFFFF (위젯 카드 배경) */
    --border: 214 32% 91%;        /* #E2E8F0 (경계선 피드백) */
    --text-ink: 60 3% 8%;         /* #141413 (오프블랙 본문 글씨) */
    
    color-scheme: light;
  }

  .dark {
    --primary: 217 91% 60%;       /* #3B82F6 (다크용 브랜드 블루) */
    --accent: 191 78% 64%;        /* #5ACAE8 (동일 시안 블루) */
    --background: 222 47% 11%;    /* #0B1120 (저자극 다크 딥블루) */
    --canvas-cream: 222 35% 15%;   /* #1E2533 (다크 크림 보조 배경) */
    --surface: 217 33% 17%;       /* #1E293B (다크 카드 위젯 배경) */
    --border: 215 25% 27%;        /* #334155 (다크 경계선) */
    --text-ink: 210 20% 98%;      /* #F8FAFC (다크 화이트 텍스트) */
    
    color-scheme: dark;
  }
}
```

### 2.2. Tailwind 테마 바인딩 예제 (`tailwind.config.js`)

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        cream: "hsl(var(--canvas-cream) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        ink: "hsl(var(--text-ink) / <alpha-value>)",
      }
    }
  }
}
```

---

## 📐 3. 타이포그래피, 여백 및 레이아웃 규격 (Typography & Layout)

### 3.1. 타이포그래피 규칙 (Typography Scale)

*   **Display Headline (대형 표제어)**:
    *   **Cormorant Garamond** 세리프 서체를 메인으로 지정합니다.
    *   시각적 위계를 위해 절대 **bold 가중치(700+)를 지양**하며, `font-normal` (400) 또는 `font-medium` (500) 두께를 고수합니다.
    *   느슨한 자간을 방지하기 위해 반드시 자간 좁힘 속성(`tracking-tight` 또는 자간 `-0.02em`~`-0.025em`)을 명시하여 인쇄된 잡지와 같은 프리미엄 느낌을 연출합니다.
    *   *HTML 예시*:
        ```html
        <h2 className="font-serif font-normal tracking-tight text-ink text-3xl md:text-4xl">
          삼성전자 모델 적용 성과
        </h2>
        ```
*   **Body & UI (본문/컨트롤)**:
    *   국문에는 가독성이 입증된 **Pretendard-gov** 폰트를, 영문 및 숫자 혼용 영역에는 **Inter** 산세리프 서체를 조합하여 깨짐 없는 UI를 제공합니다.
*   **Telemetry & Data (데이터 수치 및 날짜)**:
    *   차트 범례, 데이터 표 내 수치 및 코드 표현, 날짜 등은 고정폭 폰트인 **JetBrains Mono**(`font-mono`)를 필수 적용하여 정렬 가독성을 확보합니다.

### 3.2. 화면 크기 스케일 (Font Size Scale)

사용자가 사이트 유틸리티를 통해 직접 크기를 조절할 수 있도록 아래 CSS 클래스군과 연동하여 스케일을 제공합니다.

*   `scale-small` (작게): `font-size: 14px;`
*   `scale-medium` (보통): `font-size: 16px;`
*   `scale-large` (크게): `font-size: 18px;`
*   `scale-xlarge` (더크게): `font-size: 20px;`
*   `scale-xxlarge` (가장크게): `font-size: 22px;`

### 3.3. 모서리 곡률 (Border Radius) 및 간격 (Spacing)

*   **Border Radius**:
    *   `rounded-sm` (6px): 버튼, 입력 폼 필드, 탭 버튼, 툴팁
    *   `rounded-md` (8px): 모바일 메뉴 드롭다운, 테이블 래퍼
    *   `rounded-lg` (12px): 일반 위젯 카드, 타임라인 박스, 아코디언 패널
    *   `rounded-xl` (16px): 히어로 배너 캔버스, 대형 차트 카드, 모달 팝업 레이어
*   **Spacing**:
    *   **섹션 간 상하 여백**: 일관된 페이지 호흡을 위해 상하 섹션 패딩은 반드시 `py-[96px]` (96px)로 통일합니다.
    *   **최대 너비 정책 (Max-Width)**: 랜딩페이지 및 소개 영역은 시선의 좌우 분산을 방지하기 위해 가로 너비를 최대 `max-w-[1200px]`로 제약하며, B2B 대시보드는 `max-w-[1440px]`를 활용합니다.

---

## 📦 4. 콘텐츠 유형별 컴포넌트 명세 (Component Specs)

### 4.1. `DM-Header` (헤더 네비게이션)
상단 고정(Fixed) 및 블러 투명 처리를 갖춘 KRDS 표준 상단 영역 헤더 명세입니다.
*   **구조**: 로고(파비콘) 및 브랜드 문구(좌측), 네비게이션 버튼군 및 화면 제어 툴(우측).
*   **키보드 접근성**: 네비게이션 메뉴 및 유틸리티 버튼 클릭에 대응하는 명확한 포커스 표시링(`focus-visible:ring-2`) 탑재.
*   **구현 코드**:
```html
<nav className="fixed top-0 w-full h-20 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors duration-300">
  <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    <!-- 브랜드 로고 및 텍스트 (클릭 시 스무스 탑 스크롤) -->
    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick="scrollToTop()">
      <img src="/logotest.png" alt="딥마인 로고" className="w-8 h-8 mr-3 object-contain" />
      <img src="/deepmine logo dark.png" alt="DeepMine" className="h-5 object-contain" />
    </div>

    <!-- 데스크탑 유틸리티 제어 메뉴 -->
    <div className="hidden md:flex items-center space-x-8">
      <button className="text-sm font-medium text-ink/80 hover:text-ink transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        About
      </button>
      <button aria-label="글자 및 화면 표시 설정 열기" className="p-2 rounded-sm hover:bg-border/40 text-ink/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <SettingsIcon />
      </button>
    </div>
  </div>
</nav>
```

### 4.2. `DM-Hero-Banner` (히어로 배너)
첫 로드 시 신뢰도 형성을 위해 에디토리얼 무드로 디자인된 메인 타이틀 배너입니다.
*   **구조**: 대문자 안내 라벨, `<h1>` 표제어, 부제목, 액션 버튼(Primary / Secondary).
*   **구현 코드**:
```html
<section className="relative px-4 sm:px-6 lg:px-8 py-[96px] flex flex-col items-center justify-center text-center overflow-hidden bg-background">
  <div className="relative z-10 max-w-4xl mx-auto">
    <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider mb-6 border border-primary/20">
      AI FUTURE DEMAND FORECASTING
    </span>
    
    <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight text-ink mb-8 leading-[1.1] break-keep">
      데이터 기반 미래 예측 솔루션
    </h1>
    
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button className="w-full sm:w-auto px-8 py-4 rounded-sm bg-primary text-white font-semibold hover:bg-primary/95 transition-all flex items-center justify-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        도입 성과 보기
      </button>
      <button className="w-full sm:w-auto px-8 py-4 rounded-sm bg-surface border border-border text-ink/80 font-semibold hover:bg-border/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        도입 문의
      </button>
    </div>
  </div>
</section>
```

### 4.3. `DM-Widget-Card` (수치 및 정량 지표 카드)
중요한 정량적 성과를 표현하는 고대비 3단 위젯 카드 레이아웃입니다.
*   **구조**: 라벨(상단), 강조 수치 데이터(중앙), 상세 분석 설명(하단).
*   **접근성 요구사항**: 라벨의 회색 농도가 배경과 4.5:1 이상 대비를 이루도록 설계하고(`text-ink/60`), 수치는 `font-mono`로 정렬 가동합니다.
*   **구현 코드**:
```html
<div className="bg-surface border border-border/80 p-8 rounded-lg text-center shadow-sm">
  <div className="text-ink/60 text-xs font-semibold uppercase tracking-wider mb-2">
    안정적 장기 예측 정확도
  </div>
  <div className="text-4xl font-mono font-extrabold text-primary my-3 tracking-tight">
    84.7 %
  </div>
  <p className="text-xs text-ink/65 leading-relaxed mt-4 pt-4 border-t border-border/40">
    24개월 이력 데이터 축적 시 달성되는 최대 7년 장기 소요량 예측 정확도.
  </p>
</div>
```

### 4.4. `DM-Pipeline-Group` (프로세스 진행 단계)
AI 학습 및 전처리 등 단계별 순차 흐름을 표현하는 가로 펜스형 다이어그램입니다.
*   **구조**: 카드 박스(단계명, 제목, 내용) + 단계 연결 화살표 아이콘.
*   **반응형**: 모바일 등 좁은 뷰포트에서는 세로형 적층(Vertical Stack) 및 화살표의 아래 방향 전환 처리 진행.
*   **구현 코드**:
```html
<div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
  <div className="flex-1 w-full bg-background border border-border/60 p-5 rounded-lg text-center lg:text-left transition-all hover:border-primary/40 duration-300">
    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-2">Step 1</span>
    <h4 className="font-bold text-sm text-ink mb-1.5">외생 변수 결합 (Exogenous)</h4>
    <p className="text-xs text-ink/70 leading-relaxed">과거 시계열, 미래 행사 일정 등 다차원 컨텍스트 통합.</p>
  </div>
  
  <!-- 단계 전환 화살표 (스크린 리더 생략용 aria-hidden) -->
  <div className="flex items-center justify-center text-ink/40 shrink-0" aria-hidden="true">
    <ArrowRight className="hidden lg:block w-5 h-5" />
    <ArrowDown className="lg:hidden w-5 h-5 my-1" />
  </div>
</div>
```

### 4.5. `DM-Tab-Nav` (기술 아키텍처용 카테고리 탭)
여러 예측 알고리즘이나 기능 스택 정보를 카테고리별로 정돈하여 보여주는 탭 전환 명세입니다.
*   **구조**: 탭 전환 버튼 라인(가로) + 선택된 카테고리 정보 컨텐츠 패널.
*   **접근성 요구사항**: 키보드로 탭 이동이 가능하도록 `aria-selected` 속성이 실시간으로 제어되며, 탭에 포커스 링을 제공합니다.
*   **구현 코드**:
```html
<div className="flex justify-center border-b border-border/80 mb-10 gap-2">
  <button 
    onClick="setActiveTab('foundation')"
    className="px-6 py-3 text-sm font-semibold border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm border-primary text-primary font-bold"
    role="tab"
    aria-selected="true"
  >
    파운데이션 모델 스택
  </button>
  <button 
    onClick="setActiveTab('traditional')"
    className="px-6 py-3 text-sm font-semibold border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm border-transparent text-ink/60 hover:text-ink"
    role="tab"
    aria-selected="false"
  >
    기반 딥러닝 아키텍처
  </button>
</div>
```

### 4.6. `DM-Data-Table` (수행 실적 상세 그리드)
프로젝트 수행 실적이나 데이터 수치를 바둑판 형태의 테이블로 나열하는 뷰입니다.
*   **구조**: 가로 스크롤 가능형 테이블 래퍼(Wrapper), sticky 속성이 부여된 테이블 헤더, 호버 이펙트가 포함된 로우(Row)들.
*   **디자인 규칙**: 데이터 수치의 가독성 확보를 위해 테이블 내의 `client`명이나 중요 프로젝트명, 일자 등은 `font-mono`를 부여하고, 셀 텍스트가 줄바꿈되어 정렬이 뭉개지지 않도록 `whitespace-nowrap` 처리를 유지합니다.
*   **구현 코드**:
```html
<div className="overflow-x-auto max-h-[350px] overflow-y-auto pr-2 border rounded-md border-border/40">
  <table className="min-w-full divide-y divide-border/60">
    <thead className="bg-background sticky top-0 z-10">
      <tr>
        <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-ink/75 uppercase w-1/4">고객사</th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-ink/75 uppercase w-1/3">프로젝트명</th>
      </tr>
    </thead>
    <tbody className="bg-surface divide-y divide-border/40">
      <tr className="hover:bg-border/10 transition-colors duration-150">
        <td className="px-4 py-4 text-xs font-mono font-bold text-primary align-top whitespace-nowrap">삼성전자</td>
        <td className="px-4 py-4 text-xs font-semibold text-ink align-top">무선사업부 서비스 자재 수요예측</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4.7. `DM-Contact-Form` (문의 입력 폼)
고객으로부터 상담이나 문의 내용을 입력받아 전송하는 폼 영역입니다.
*   **구조**: `<label>`과 `<input>`/`<textarea>` 1:1 매핑, 필수 작성 인디케이터(`*`), 비활성화 처리용 전송 버튼.
*   **웹 접근성**: 레이블을 명시하고 `htmlFor`와 인풋의 `id`를 일치시키며, 에러나 특수 라벨에는 `aria-labelledby`를 설정하여 스크린 리더와 입력창이 단단히 묶이도록 보장합니다.
*   **구현 코드**:
```html
<form className="space-y-5" onSubmit="handleSubmit()">
  <div>
    <label id="label-email" htmlFor="input-email" className="block text-xs font-semibold text-ink/75 mb-1.5">
      이메일 <span className="text-red-500" aria-hidden="true">*</span>
    </label>
    <input
      id="input-email"
      type="email"
      required
      aria-labelledby="label-email"
      placeholder="company@email.com"
      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary transition-all"
    />
  </div>
  
  <button
    type="submit"
    disabled={status === 'loading'}
    className="w-full bg-primary hover:bg-primary/95 disabled:bg-primary/80 text-white text-sm font-semibold py-3 px-4 rounded-sm transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  >
    문의 남기기
  </button>
</form>
```

---

## ⚡ 5. 이미지, 모달, 차트의 상세 처리 지침

### 5.1. 이미지 대체 텍스트 처리 규칙 (Alternative Media Rule)
*   **브랜드 로고 및 의미를 가진 이미지**: 반드시 명확한 브랜드/콘텐츠 대체 텍스트(`alt`)를 부여합니다.
    *   *예시*: `<img src="/logotest.png" alt="딥마인 로고" />`
*   **배경 데코레이션 아이콘 및 단계 화살표**: 스크린 리더가 흐름을 방해하지 않고 그냥 건너뛸 수 있도록 반드시 `aria-hidden="true"` 속성을 부여합니다.
    *   *예시*: `<ArrowRight className="..." aria-hidden="true" />`

### 5.2. 모달 팝업 및 키보드 초점 제어 규칙 (Modal Focus Control)
모달 다이얼로그는 열릴 때 포커스가 뒷배경 밖으로 나가지 못하게 잠그는 **포커스 트랩(Focus Trap)**과 모달 최초 로드 시 모달 내부의 첫 닫기 버튼 또는 초점 영역으로 포커스를 강제하는 **최초 포커스 바인딩(Initial Focus)**을 탑재해야 합니다.

*   **HTML 모달 필수 마크업 구조**:
```html
<div 
  className="fixed inset-0 z-[100] flex items-center justify-center px-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="settings-modal-title"
  ref={settingsRef}
  onKeyDown="handleFocusTrap(e)"
>
  <!-- 반투명 흐림 처리 배경막 (클릭 시 닫기 트리거) -->
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick="closeModal()"></div>
  
  <!-- 모달 알림창 바디 -->
  <div className="relative bg-surface border border-border w-full max-w-md rounded-xl p-6 shadow-xl">
    <h3 id="settings-modal-title" className="text-lg font-bold text-ink">설정 타이틀</h3>
    <button aria-label="설정 닫기" onClick="closeModal()">
      <XIcon />
    </button>
  </div>
</div>
```

*   **React 포커스 제어 및 스킵 스크립트 규격**:
```javascript
// 1. 모달 활성화 시 내부 첫 요소로 강제 초점 이동 (Initial Focus)
useEffect(() => {
  if (isOpen && modalRef.current) {
    const focusableEls = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (focusableEls.length > 0) {
      focusableEls[0].focus();
    }
  }
}, [isOpen]);

// 2. 키보드 Tab 키 누를 때 모달 밖으로 나가지 않고 맴돌게 하는 Focus Trap
const handleFocusTrap = (e, modalRef) => {
  if (!modalRef.current || e.key !== 'Tab') return;
  
  const focusableEls = modalRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex="0"]'
  );
  if (focusableEls.length === 0) return;

  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  if (e.shiftKey) { // Shift + Tab (역순 탐색 시 첫 번째에서 마지막으로)
    if (document.activeElement === firstEl) {
      lastEl.focus();
      e.preventDefault();
    }
  } else { // Tab (정순 탐색 시 마지막에서 첫 번째로)
    if (document.activeElement === lastEl) {
      firstEl.focus();
      e.preventDefault();
    }
  }
};
```

### 5.3. 데이터 시각화 차트 상세 명세 (Chart Visualization Rule)
소개용 꺾은선(Line) 또는 영역(Area) 그래프를 SVG로 빌드할 때의 세부 디자인 설정값입니다.

```
                    [ 90% (최대 상한 임계값) ]
  yVal % ──┐ ---------------------------- ── hsl(var(--border)) 눈금 격자선
           │      / \    / \     
           │     /   \--/   \            ── hsl(var(--primary)) 꺾은선 (strokeWidth: 3.5)
           │    /     \      \           
  yVal % ──┼─-o---------o-------o------- ── HSL 그라데이션 반투명 면적 영역 채우기
           │                             
  yVal % ──┴───────────────────────────── ── hsl(var(--border)) 축 기준선
            M06  M12   M24   M48  (X축)
```

*   **차트 격자 눈금선 (Y-Axis Grid)**: `stroke="hsl(var(--border))"`, `strokeDasharray="3,3"` 점선을 사용해 세련되고 튀지 않는 기준선을 제공합니다. 눈금 텍스트는 `font-mono`를 부여하여 정확한 정렬을 보장합니다.
*   **면적 영역 그라데이션 (Area Fill Gradient)**:
    *   차트 아래의 면적은 단일 색상으로 칠하지 않고, 점차 옅어지는 그라데이션을 사용합니다.
    *   `hsl(var(--primary))` 색상으로 시작하여 투명도를 `0.15` (Offset 0%)에서 `0.0` (Offset 100%)로 서서히 낮춰 입체감을 강조합니다.
*   **꺾은선 (Line Path)**: 선 두께는 `strokeWidth="3.5"`, 선 끝 모서리는 `strokeLinecap="round"`를 처리하여 가독성을 극대화합니다.
*   **데이터 포인트 점 (Data Points)**:
    *   기본 상태: `stroke="hsl(var(--primary))"`, `fill="hsl(var(--surface))"`, `r="5"`, 테두리 `strokeWidth="2.5"`.
    *   마우스 호버 상태: 반지름을 `r="7"`로 넓히고 `strokeWidth="3"`으로 키우며, 바깥에 투명도 `0.2`를 가진 `r="12"`의 `fill="hsl(var(--primary))"` 반투명 도넛 효과를 주어 사용자 조작 피드백을 전달합니다.
*   **툴팁 (Tooltip Box)**: 마우스가 위치한 특정 축 위에 `rounded-sm` 모서리, `bg-surface`, `border-border` 경계선을 가진 카드를 플로팅하고 내부 정확도 수치는 `font-mono`를 사용합니다.

---

## ♿ 6. 스킵 링크 (Skip Link) 규격

시각 장애인 및 키보드 전용 사용자가 긴 내비게이션 메뉴를 여러 번 Tab 키로 건너뛸 수 있도록 본문으로 바로 이동 가능한 `skip-link`를 페이지 최상단 본문 진입부 바로 위에 숨김 상태로 필수 배치합니다.

*   **기본 특징**: 일반 마우스 사용자 화면에는 노출되지 않다가 키보드 Tab 키를 1회 이상 눌렀을 때만 최상단 좌측에 파란색 포커스 링을 두른 채 등장합니다.
*   **구현 코드**:
```html
<!-- Body 태그 최상단에 배치 -->
<div id="skip-link" className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[999] focus-within:bg-primary focus-within:text-white focus-within:px-4 focus-within:py-2 focus-within:rounded-sm focus-within:font-semibold">
  <a href="#main-content">본문 바로가기</a>
</div>
```
