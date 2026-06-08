# Skill: deepdemand-transform (디자인 시스템 변환 및 코드 마이그레이션)

본 스킬은 기획안([Plan Blueprint](file:///c:/Users/김준섭/Desktop/workspace/DeepDemand-project-root/deepmine_home/skills/deepdemand-plan/instructions.md))을 바탕으로, 기존의 하드코딩된 테일윈드 스타일이나 기존 웹 소스코드(`App.jsx` 등)를 **DeepDemand 디자인 시스템(DDDS) 및 KRDS 웹 접근성 규격으로 전환**하는 마이그레이션 실무 지침입니다.

---

## 🎨 1. 핵심 변환 규칙 (Transformation Rules)

### 1.1. 색상 체계 변환: HSL CSS Variables 바인딩
기존의 인라인 하드코딩 헥스코드 및 테일윈드 빌트인 컬러를 `:root`에 선언된 CSS Variables 테마 값으로 리디렉션합니다.

*   **배경 색상 변환**:
    *   `bg-[#0B1120]` (레거시 어두운 배경) ➔ `bg-[hsl(var(--background))]` (혹은 테일윈드 테마 확장 명칭 `bg-background` 사용)
    *   `bg-[#111827]` (레거시 카드/어두운 엘리먼트) ➔ `bg-[hsl(var(--card))]` (혹은 `bg-card`)
*   **텍스트 색상 변환**:
    *   `text-slate-200` / `text-white` ➔ `text-[hsl(var(--ink))]` (라이트/다크에 맞게 글자 색상 자동 변환되도록)
    *   `text-slate-400` ➔ `text-[hsl(var(--muted))]`
*   **브랜드 포인트 컬러 변환**:
    *   `bg-blue-600` / `text-blue-500` ➔ `bg-[hsl(var(--primary))]` / `text-[hsl(var(--primary))]`

### 1.2. 타이포그래피 클래스 매핑
*   **에디토리얼 표제어**:
    *   모든 메인 헤드라인(`h1`, `h2`, `h3` 중 주요 타이틀)에는 명세서에 정의된 세리프체(`font-display` 또는 `font-serif`)를 추가하고, 자간 조절 클래스(`tracking-tight` 또는 `tracking-[-0.02em]`)를 삽입합니다. 볼드 가중치는 해제하고 regular/medium(`font-medium` 또는 `font-normal`)으로 낮춥니다.
    *   *예시*: `<h1 className="text-5xl font-extrabold text-white">` ➔ `<h1 className="text-5xl font-normal font-serif text-ink tracking-tight">`
*   **수치 및 고정폭 영역**:
    *   통계 수치, 날짜 연도(`year`), 이메일 주소 및 연락처, 코드 스니펫에는 고정폭 폰트인 JetBrains Mono (`font-mono`)를 부여하여 숫자 가독성을 높입니다.

### 1.3. 테두리 곡률 및 여백 리팩토링
*   레거시 컴포넌트의 제각각인 모서리 둥글기 값을 디자인 스케일로 통일합니다.
    *   기본 버튼: `rounded-lg` ➔ `rounded-md` (8px)
    *   위젯 카드, 모달 컨테이너: `rounded-2xl` ➔ `rounded-lg` (12px)
    *   이벤트 타임라인 박스: `rounded-xl` ➔ `rounded-lg` (12px)

---

## ♿ 2. 접근성(KRDS) 마크업 적용 가이드

*   **상호작용 버튼(Button)과 앵커(Anchor) 태그의 명확한 구분**:
    *   단순 페이지 내 이동이나 스크롤 앵커링, 모달 열기/닫기 등 JS 함수를 트리거하는 요소는 `<a>` 태그 대신 `<button type="button">`으로 교체합니다.
*   **폼 레이블(Label)과 인풋(Input) 1:1 결합**:
    *   `htmlFor`와 `id` 값이 일치하도록 보장하고, 스크린 리더가 인풋의 역할을 바르게 이해할 수 있도록 명확히 레이블 텍스트를 기입합니다.
    *   *레거시*:
        ```html
        <label className="block text-sm">회사명</label>
        <input type="text" className="w-full" />
        ```
    *   *변환 후*:
        ```html
        <label htmlFor="company-name" className="block text-sm text-muted">회사명 / 담당자명</label>
        <input
          id="company-name"
          type="text"
          className="w-full bg-background border border-border rounded-sm px-4 py-3"
          required
        />
        ```
*   **모달/레이어 다이얼로그 접근성**:
    *   모달이 열렸을 때 오버레이 뒷배경 영역은 `aria-hidden="true"`를 동적으로 부여하여 스크린 리더 포커스가 뒤로 새는 것을 방지합니다.
    *   모달 컨테이너 자체에 `role="dialog"`와 `aria-modal="true"`, 그리고 모달 제목을 가리키는 `aria-labelledby` 속성을 필수 매핑합니다.

---

## 💻 3. 변환 템플릿 예시 (Tailwind Config 공유)

새로운 디자인 시스템이 원활하게 빌드되도록 `tailwind.config.js` 또는 `postcss.config.js`를 다음과 같이 확장 바인딩합니다.

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 다크모드 대응을 위한 설정
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          active: 'hsl(var(--primary-active))',
          disabled: 'hsl(var(--primary-disabled))',
        },
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        danger: 'hsl(var(--danger))',
        warning: 'hsl(var(--warning))',
        success: 'hsl(var(--success))',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Tiempos Headline', 'Georgia', 'serif'],
        sans: ['Pretendard', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)', // 6px
        md: 'var(--radius-md)', // 8px
        lg: 'var(--radius-lg)', // 12px
        xl: 'var(--radius-xl)', // 16px
      }
    },
  },
  plugins: [],
}
```

---

## 📐 4. 마이그레이션 품질 검토 가이드 (Transformer validation)

코드를 변환한 후에는 다음 사항이 유지/변경되었는지 교차 검증해야 합니다:
1. **기능적 무결성**: 문의 폼 제출 이벤트, 에러 처리 분기, 모달 온/오프 상태 관리가 정상 동작하는지 테스트합니다.
2. **반응형 동작**: 브레이크포인트(`< 768px`, `768px~1024px`, `> 1024px`) 전환 시 모바일 메뉴 오버레이와 2단 그리드가 깨지지 않고 세로 적층되는지 점검합니다.
3. **스타일 격리**: 페이지 전체 바디의 기본 서체와 HSL 변수가 `index.css` (:root 설정)를 통해 최상위 컴포넌트에서 바르게 상속되는지 개발자 도구로 스캔합니다.
