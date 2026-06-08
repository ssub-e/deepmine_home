# Skill: deepdemand-plan (기획 및 명세 정의)

본 스킬은 DeepDemand 신규 화면 설계 혹은 기존 화면의 레이아웃 개편 작업 착수 전에 구동되는 **기획 및 명세 설계 단계**입니다. 디자이너와 엔지니어링 그룹, 혹은 AI 에이전트가 화면 상태, 컴포넌트 매핑, 접근성 및 파일 범위를 설계하기 위한 구체적인 지침입니다.

---

## 📋 1. 핵심 과업 (Objective)
기획 단계에서 다음 사항을 도출하고 검증하는 것을 목표로 합니다:
1. **화면 및 컴포넌트 상태 정의** (State Spec)
2. **DDDS 및 KRDS 표준 컴포넌트 매핑** (Component Mapping)
3. **웹 접근성(KWCAG 2.2 / WCAG 2.1) 게이트 설정** (Accessibility Gate)
4. **작업 대상 파일 범위 및 검증 명세 설정** (Scope & Validation)

---

## 🏗️ 2. 화면 상태 정의 규격 (State Specifications)

DeepDemand 솔루션 뷰는 크게 **대고객 홍보 홈페이지**와 **AI 미래 예측 대시보드(PoC 포함)** 두 부분으로 나누어 상태를 상세히 정의합니다.

### 2.1. 랜딩 페이지 핵심 상태 (Landing Page States)
*   **Default State (기본 상태)**: 네비게이션 헤더, 히어로 섹션, 솔루션 요약, 연혁 타임라인, 파트너 그리드, 도입 문의 폼, 어두운 딥네이비 테마(#0B1120).
*   **Menu Open State (모바일 헤더 활성화)**: 모바일 뷰포트에서 우측 상단 햄버거 메뉴를 클릭 시 드롭다운 레이어가 활성화된 상태.
*   **Privacy Modal State (개인정보처리방침)**: 푸터의 링크 클릭 시 나타나는 팝업 창. 본문 내용이 정상적으로 표시되며 바깥 영역을 클릭하거나 X 버튼을 누르면 닫힘.
*   **Email Refusal Modal State (이메일무단수집거부)**: 푸터의 링크 클릭 시 나타나는 레이어 모달.
*   **Form Submission State (문의 제출 과정)**:
    *   *idle*: 기본 작성 중인 상태.
    *   *loading*: 제출 버튼 클릭 후 서버 응답 대기 상태 (스피너 아이콘 노출, 인풋 비활성화).
    *   *success*: 전송 완료 알림 노출 후 폼 초기화.
    *   *error*: 전송 실패 경고 메시지 노출.

### 2.2. AI 미래 예측 대시보드 상태 (Dashboard States)
*   **Onboarding State (상담-진단-PoC 3단계)**:
    *   *Step 1 (데이터 진단)*: 고객이 보유한 데이터의 행(Row) 개수, SKU 정보, 누락율을 스캔하고 품질(등급 A/B/C)을 리포팅하는 카드 상태.
    *   *Step 2 (PoC 개념 검증)*: 샘플 데이터를 기준으로 예측 아키텍처 모델군(MLP, RNN, Transformer, CNN)별 오차(MAE/MSE) 성능을 실시간 그래프로 비교하는 시뮬레이션 상태.
    *   *Step 3 (정식 연동)*: ERP/SCM 시스템과 API 파이프라인 연동 성공 여부를 보여주는 시스템 커넥션 연결 상태.
*   **Forecasting View (예측 시계열 모니터링)**:
    *   *Historical View*: 회색-블루 `#94A3B8` 선으로 구성된 과거 판매 실적 실선 그래프.
    *   *Forecast View*: 브랜드 프라이머리 `#1D4ED8` 선 및 신뢰 구간(90% Confidence Interval)을 옅은 반투명 푸른색 영역으로 시각화한 상태.
    *   *Safety Stock View*: 임계치 도달 여부를 감시하기 위한 대조적인 적색 점선 및 3색 알림등(🔴 품절 위험, 🟡 과적재 경고, 🟢 적정 재고).

---

## 📦 3. DDDS 및 KRDS 컴포넌트 매핑 테이블 (Component Mapping)

모든 신규 UI 개발은 임의의 인라인 테일윈드 태그를 남용하지 않고, 디자인 시스템 표준 컴포넌트 및 대한민국 정부 디지털 서비스 디자인 가이드라인(KRDS) 규격과 1:1로 매핑되어야 합니다.

| 개발 컴포넌트명 | KRDS 매핑 컴포넌트 | DDDS 스타일 및 적용 속성 | 주요 접근성 요구사항 |
| :--- | :--- | :--- | :--- |
| **`DM-Header`** | 헤더 (Header) | 높이 80px, `backdrop-blur`, 브랜드 네이비 배경 | 로고 이미지에 `alt="(주)딥마인"` 명기, 모바일 메뉴 `aria-expanded` 속성 추가 |
| **`DM-Hero-Banner`** | Callout/히어로 | 대형 에디토리얼 타이틀, Cormorant Garamond 폰트 | 제목은 반드시 `<h1>` 태그 사용 (페이지당 1개 제한) |
| **`DM-Tab-Nav`** | 카테고리 탭 (Tab) | `rounded-md`, 액티브 시 HSL `Primary` 배경 | 탭 요소에 `role="tab"`, `aria-selected` 속성 실시간 바인딩 |
| **`DM-Feature-Grid`** | 카드 그룹 (Card) | `rounded-lg` (12px), 테두리 1px `Border` | 카드 전체 클릭 시 포커스 이동을 고려해 내부에 `<a>` 또는 `<button>` 내포 |
| **`DM-Data-Table`** | 데이터 테이블 | 셀 간격 `p-4`, 헤더 어두운 그레이 처리, JetBrains Mono 서체 | `<caption>`을 통해 표의 목적 요약, `<th>`에 `scope="col/row"` 설정 |
| **`DM-Accordion`** | 아코디언 (FAQ) | 1px Border 구분선, 클릭 시 펼침 애니메이션 | 버튼 태그를 사용하여 질문을 선언하고 `aria-controls`로 답변 블록 연결 |
| **`DM-Input`** | 텍스트 입력 필드 | `rounded-sm` (6px), 포커스 시 3px `Primary` 링 | `<label>`과 `<input>`을 `id`/`htmlFor`로 매핑, 필수 필드 `required` 부여 |
| **`DM-Modal`** | 레이어 팝업 (Dialog) | `rounded-lg` (12px), `backdrop-blur` 오버레이 | 팝업 오픈 시 포커스를 팝업 내부 첫 버튼으로 강제 이동 (`Focus Trap`) |
| **`DM-Footer`** | 푸터 (Footer) | HSL `surface-dark`, 옅은 그레이 보조 텍스트 | 사업자 정보, 이메일 주소, 저작권 문구를 구조화된 주소 `<address>` 태그 내 정의 |

---

## ♿ 4. 웹 접근성 게이트 (Accessibility Gate)

*   **텍스트 명도 대비 (Contrast Ratio)**:
    *   모든 일반 텍스트는 배경과의 명도 대비가 최소 **4.5:1 이상**이어야 합니다.
    *   차트 범례 및 보조 텍스트(예: `#94A3B8`, `#6C6A64`)는 그보다 어두운 HSL 톤을 라이트 모드용으로 별도 설계하여 대비 규격을 준수합니다.
*   **키보드 네비게이션 (Keyboard Navigation)**:
    *   마우스 없이 Tab 키만으로 모든 링크, 버튼, 폼 요소에 접근할 수 있어야 합니다.
    *   포커스가 올려진 요소는 파란색 테두리(`focus:ring-2 focus:ring-blue-500 outline-none`)가 시각적으로 분명하게 드러나야 합니다.
*   **스크린 리더 대체 텍스트 (Alternative Text)**:
    *   문의 전송 중 상태 표시 스피너 SVG 이미지나 대시보드의 원형 차트 아이콘 등은 `aria-hidden="true"`를 주어 리더기 혼선을 방지하고, 화면에 나타나지 않는 보조용 설명은 `sr-only` 클래스로 텍스트를 제공합니다.

---

## 📐 5. 스킬 실행 체크리스트 (Planner checklist)

본 단계를 마칠 때 기획 결과물은 아래 양식에 맞추어 작성되어야 합니다.

```markdown
### [Plan Blueprint] DeepDemand <Page Name>
1. 화면 상태 명세
   - [ ] Default / Active / Loading / Error
2. 컴포넌트 매핑 목록
   - [ ] <컴포넌트명> -> <KRDS 표준 컴포넌트>
3. 접근성 게이트
   - [ ] 명도대비 통과 값
   - [ ] 스크린 리더 대체 텍스트 명세
4. 대상 파일 범위
   - [ ] 수정/추가 파일 경로 리스트
```
