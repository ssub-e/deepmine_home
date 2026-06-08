import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, BarChart3, Database, BrainCircuit, LineChart, Building2, Mail, Phone, Settings, Check, ArrowRight, ArrowDown } from 'lucide-react';

// ==========================================
// 📝 데이터 영역 (DeepMine 및 수치 정보)
// ==========================================

const COMPANY_INFO = {
  name: '(주)딥마인',
  slogan: 'We predict future',
  description: '제조/유통/금융 데이터 분석, 인공 지능 개발(수요 예측, LLM 등), 공간 정보 예측을 전문으로 하며, 다수의 프로젝트에서 축적된 노하우로 고객 맞춤형 AI 솔루션을 제공합니다.',
  ceo: '박경원',
  address: '서울특별시 금천구 벚꽃로 298, 1301호-12',
  founded: '2021년 12월 20일',
  email: 'kwpark@deepmine.co.kr',
  phone: '010-4231-4907',
  businessNumber: '116-81-78909'
};

const STATS = [
  { label: '초기 도입 직접 절감액', value: '약 38억 원', desc: '2019년 모델 구축 초기 가동 단계에서 재고 과다/부족 문제 최소화로 이룬 공급망 재고 비용 직접 절감액.' },
  { label: '안정적 장기 예측 정확도', value: '84.7 %', desc: '과거 24개월 이력 데이터 축적 시 달성되는 향후 최대 7년(84개월) 장기 소요량 예측 수렴 정확도.' },
  { label: '신규 제품(NPI) 초기 적중률', value: '70% 이상', desc: '과거 판매 데이터가 전무한 초기 론칭 상황(3개월)에서도 높은 사용률 예측으로 결품/과잉 발주 방어.' }
];

const PIPELINE = [
  { step: 'Step 1', title: '외생 변수 결합 (Exogenous)', desc: '정적 변수(매장 정보 등), 과거 시계열, 미래 일정 변량(마케팅 행사) 등 다차원 컨텍스트 통합.' },
  { step: 'Step 2', title: '데이터 증강 & 전처리', desc: 'Tsaug/SMOTE를 통한 이상 스파이크 노이즈 왜곡 보강 및 Robust Scaler 적용.' },
  { step: 'Step 3', title: 'Core AI 예측 엔진', desc: '시간적 가변성에 대응하는 TFT/DeepAR 및 Zero-shot 파운데이션 모델(TimeGPT) 구동.' },
  { step: 'Step 4', title: 'HPO & Loss 최적화', desc: 'Optuna 기반 베이지안 최적화 및 이상치 증폭 방지를 위한 MAE 손실함수 튜닝.' }
];

const MODELS = [
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: 'MLP Family (NHITS, NBEATS)',
    desc: '단일 학습 프로세스 내에서 모든 미래 예측 시점을 한 번에 산출하는 Direct Forecasting을 수행합니다. 오차가 누적 전파되지 않고 병렬 연산이 매우 신속합니다.'
  },
  {
    icon: <LineChart className="w-8 h-8 text-accent" />,
    title: 'RNN Family (LSTM, GRU, DeepAR)',
    desc: '이전 예측값을 다시 다음 시점의 입력으로 취하는 Recursive Forecasting 구조입니다. 시계열의 순차적 흐름 파악과 가변적인 장기 이력 수용 능력이 뛰어납니다.'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary opacity-80" />,
    title: 'Transformer Family (Autoformer, TFT)',
    desc: '멀티 헤드 셀프 어텐션 구조를 내포하여 시간 흐름상 특정 구간에 가중치를 동적으로 집중시킵니다. 장기 의존성 분석과 외생 변수 융합에 탁월합니다.'
  },
  {
    icon: <Database className="w-8 h-8 text-accent opacity-80" />,
    title: 'CNN Family (BiTCN, Dilated Filters)',
    desc: '시간 도메인을 따라 팽창 합성곱 필터를 병렬 처리하여 연산 효율을 높입니다. 국소적인 시계열 변동 패턴을 초고속으로 스캔하는 데 강합니다.'
  }
];

const ACCURACY_DATA = [
  { label: 'M06 (6개월)', val: 73.6 },
  { label: 'M12 (12개월)', val: 75.1 },
  { label: 'M24 (24개월)', val: 84.7 },
  { label: 'M36 (36개월)', val: 84.0 },
  { label: 'M48 (48개월)', val: 83.6 },
  { label: 'M60 (60개월)', val: 84.2 },
  { label: 'M72 (72개월)', val: 84.3 },
  { label: 'M78 (78개월)', val: 81.7 }
];

const PROJECTS = [
  { client: '삼성전자', cat: '삼성', name: 'ASAP(마케팅 분석 시스템) 데이터 과학자 지원', desc: '서비스 자재 AI 수요예측 정확도 개선, Installed Base AI 수요예측 모델 구축 및 고도화, 마케팅 데이터 다차원 분석' },
  { client: '삼성전자', cat: '삼성', name: '무선사업부 서비스 자재 수요예측', desc: '서비스 자재 인공지능 기반 수요예측 시스템 모델 구축 및 현장 GPU 실적용' },
  { client: '삼성SDS', cat: '삼성', name: 'ASAP 데이터 과학자 지원', desc: 'ASAP S21 Sellout 예측을 위한 SLBF(Low Bound Forecasting) AI 예측 모델링 구현' },
  { client: '한국정보화진흥원', cat: '공공', name: '범정부 데이터플랫폼 구축 1차 사업', desc: 'ASAP 데이터 거버넌스 및 표준화 제안, 데이터 연관도 분석 및 국가 데이터맵 아키텍처 개발' },
  { client: '기아자동차', cat: '공공', name: '해외 데이터 체계 고도화 사업', desc: '글로벌 데이터 Taxonomy 정립 및 인공지능 기반 텍스트 마이닝 분석' },
  { client: '현대자동차', cat: '공공', name: '낙찰가율 예측 및 분석', desc: '자동차 부품 조달을 위한 낙찰가율 시계열 예측 및 요인 분석' },
  { client: '한국거래소', cat: '공공', name: '인공지능 기술의 시장감시 적용모델 개발', desc: '주식 시장 내 이상 징후 감시 및 지수 예측 인공지능 모델 개발' },
  { client: '한국총판', cat: '공공', name: '인공지능 기반 영업기회 추천 솔루션 개발', desc: '뉴스 기사 및 트렌드 데이터 크롤링 기반 B2B 영업기회 자동 추천 솔루션 구축' },
  { client: '삼성전자 캐나다/싱가포르', cat: '삼성', name: 'Marketing Mix Modeling', desc: '북미 및 아시아 법인 대상 마케팅 효과 및 ROI 최적화 분석' },
  { client: '삼성전자 인도법인', cat: '삼성', name: '서남아법인 Sellout Forecasting & MMM', desc: 'HHP Sellout 수요예측 모델 설계 및 마케팅 믹스 최적화 모델 개발' },
  { client: '국토교통부', cat: '공공', name: '공간 빅데이터 구축 및 AI 모델링', desc: '토지 비축을 위한 공간 통계 및 인공지능 예측 모델링 구현' },
  { client: '삼성디스플레이', cat: '삼성', name: 'R 통계학 전문 교육', desc: '시각화, 데이터 프로그래밍, 시계열 통계 모델링 역량 강화 교육' },
  { client: '롯데면세점', cat: '공공', name: '마케팅 시스템 구축', desc: '면세점 상품군 분류 및 실적/매출 기여도 분석' },
  { client: '알리안츠생명', cat: '공공', name: '보험사기 및 언더라이팅 분석', desc: '이상징후 탐지 알고리즘 기반 통계 분석 모델 설계' },
  { client: '동부화재', cat: '공공', name: '고객 세분화 분석', desc: '이탈 예측 알고리즘 기반 고객 세분화 및 방지책 수립' },
  { client: '삼성증권', cat: '삼성', name: '퇴직연금 시스템 개발', desc: '퇴직연금 분석 모듈 설계 및 데이터 모델 개발' }
];

const HISTORY = [
  { year: '2026. 03 ~', title: '2026 AI바우처 지원사업 공급기업 등록' },
  { year: '2023. 10', title: '서비스 자재 수요예측 GPU 실사용 적용' },
  { year: '2022. 09', title: '서비스 자재 수요예측 GPU 도입 PoC' },
  { year: '2021. 12', title: '(주)딥마인 법인 설립' },
  { year: '2020. 01 ~', title: '삼성전자 ASAP 데이터 과학자 지원 (수요예측 정확도 개선 운영)' },
  { year: '2019. 05 ~', title: '삼성전자 무선사업부 서비스 자재 수요예측 시스템 구축' },
];

const CLIENTS = [
  '삼성전자', '삼성SDS', '현대자동차', '기아자동차', '한국거래소', '국토교통부', '한국정보화진흥원', '삼성증권', '롯데면세점', '동부화재'
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // 화면 스타일 상태 (기본 다크테마, 보통 폰트 스케일)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSizeScale, setFontSizeScale] = useState('medium');

  // 예측 솔루션 탭 및 프로젝트 필터 상태
  const [activeTab, setActiveTab] = useState('foundation');
  const [projectFilter, setProjectFilter] = useState('all');

  // SVG 차트 호버 상태
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const privacyRef = useRef(null);
  const emailRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPrivacyModalOpen(false);
        setIsEmailModalOpen(false);
        setIsSettingsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFocusTrap = (e, modalRef, closeFn) => {
    if (!modalRef.current) return;
    const focusableEls = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    }
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        alert("문의가 성공적으로 접수되었습니다.");
      } else {
        setStatus('error');
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      setStatus('error');
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setStatus('idle');
    }
  };

  // ==========================================
  // 📈 SVG 선 차트 좌표 계산 함수
  // ==========================================
  const svgWidth = 800;
  const svgHeight = 280;
  const paddingX = 60;
  const paddingY = 40;

  // 값의 매핑 (Y축: 70 ~ 90, X축: 8개 포인트)
  const getCoordinates = () => {
    return ACCURACY_DATA.map((d, i) => {
      const x = paddingX + (i / (ACCURACY_DATA.length - 1)) * (svgWidth - paddingX * 2);
      const y = svgHeight - paddingY - ((d.val - 70) / (90 - 70)) * (svgHeight - paddingY * 2);
      return { x, y, label: d.label, val: d.val };
    });
  };

  const points = getCoordinates();
  
  // SVG 라인 패스 생성 (Smooth Curve - Catmull-Rom 기법 약식 적용)
  const linePath = points.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    // 부드러운 곡선을 위해 조절점 계산
    const cpX1 = prev.x + (p.x - prev.x) / 3;
    const cpY1 = prev.y;
    const cpX2 = prev.x + 2 * (p.x - prev.x) / 3;
    const cpY2 = p.y;
    return `${path} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  // 차트 면적 채우기 패스 생성
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`
    : '';

  // 필터링된 프로젝트 데이터
  const filteredProjects = PROJECTS.filter(p => {
    if (projectFilter === 'all') return true;
    return p.cat === projectFilter;
  });

  return (
    <div className={`min-h-screen bg-background text-ink font-sans transition-colors duration-300 scale-${fontSizeScale}`}>
      
      {/* 본문 바로가기 (KRDS 키보드 사용자 접근성 필수 항목) */}
      <div id="skip-link" className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[999] focus-within:bg-primary focus-within:text-white focus-within:px-4 focus-within:py-2 focus-within:rounded-md focus-within:font-semibold">
        <a href="#main-content">본문 바로가기</a>
      </div>

      {/* 네비게이션 바 (DM-Top-Nav) */}
      <nav className="fixed top-0 w-full h-20 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-3 font-bold text-white tracking-tighter shadow-sm">
              DM
            </div>
            <span className="font-bold text-2xl tracking-tight text-ink">DeepMine</span>
          </div>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Solutions', 'History', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                {item}
              </button>
            ))}
            
            {/* 글자·화면 설정 유틸리티 트리거 버튼 (KRDS 대응) */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-md hover:bg-border/40 text-ink/70 hover:text-ink transition-all"
              aria-label="글자 및 화면 표시 설정 열기"
              title="글자·화면 설정"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* 모바일 메뉴 및 설정 버튼 */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-md hover:bg-border/40 text-ink/70 hover:text-ink"
              aria-label="글자 및 화면 표시 설정 열기"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ink hover:text-primary p-2"
              aria-expanded={isMenuOpen}
              aria-label="전체 메뉴 토글"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-b border-border animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Solutions', 'History', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-4 text-base font-medium text-ink/80 hover:text-primary hover:bg-border/20 rounded-md transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ==========================================
          🔍 모달 컴포넌트 영역 (접근성 표준 규격 적용)
          ========================================== */}

      {/* 1. 글자·화면 표시 설정 모달 (KRDS 공공 규약) */}
      {isSettingsModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-modal-title"
          ref={settingsRef}
          onKeyDown={(e) => handleFocusTrap(e, settingsRef, setIsSettingsModalOpen)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSettingsModalOpen(false)}></div>
          <div className="relative bg-surface border border-border w-full max-w-md rounded-xl p-6 shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-border/60 pb-3">
              <h3 id="settings-modal-title" className="text-lg font-bold text-ink flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                글자 &middot; 화면 표시 설정
              </h3>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="text-ink/60 hover:text-ink p-1 rounded-md hover:bg-border/40"
                aria-label="설정 닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 글자 크기 조절 */}
              <div>
                <h4 className="text-sm font-semibold text-ink/70 mb-3">글자 크기 설정</h4>
                <div className="grid grid-cols-5 gap-1.5 bg-background p-1.5 rounded-lg border border-border">
                  {[
                    { id: 'small', label: '작게' },
                    { id: 'medium', label: '보통' },
                    { id: 'large', label: '크게' },
                    { id: 'xlarge', label: '더크게' },
                    { id: 'xxlarge', label: '가장크게' }
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      onClick={() => setFontSizeScale(scale.id)}
                      className={`text-xs py-2 rounded-md font-medium transition-all ${
                        fontSizeScale === scale.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-ink/70 hover:text-ink hover:bg-border/30'
                      }`}
                    >
                      {scale.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 화면 표시 모드 (라이트/선명하게) */}
              <div>
                <h4 className="text-sm font-semibold text-ink/70 mb-3">화면 표시 모드</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsDarkMode(false)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm font-medium transition-all ${
                      !isDarkMode
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background text-ink/80 hover:border-ink/30'
                    }`}
                  >
                    <span>기본 (밝은 배경)</span>
                    {!isDarkMode && <Check className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsDarkMode(true)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm font-medium transition-all ${
                      isDarkMode
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-ink/80 hover:border-ink/30'
                    }`}
                  >
                    <span>선명하게 (어두운 배경)</span>
                    {isDarkMode && <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-8 pt-4 border-t border-border/60">
              <button
                onClick={() => {
                  setFontSizeScale('medium');
                  setIsDarkMode(true);
                  setIsSettingsModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-md border border-border text-xs text-ink/70 hover:bg-border/30 font-medium transition-all"
              >
                초기화
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="flex-1 py-2.5 rounded-md bg-primary hover:bg-primary/95 text-xs text-white font-medium transition-all shadow-sm"
              >
                설정 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 개인정보처리방침 모달 */}
      {isPrivacyModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          ref={privacyRef}
          onKeyDown={(e) => handleFocusTrap(e, privacyRef, setIsPrivacyModalOpen)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPrivacyModalOpen(false)}></div>
          <div className="relative bg-surface border border-border w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl p-8 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-border/60 pb-3">
              <h3 id="privacy-modal-title" className="text-xl font-bold text-ink">개인정보처리방침</h3>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-ink/60 hover:text-ink p-2 rounded-md hover:bg-border/40"
                aria-label="방침 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-ink/80 text-sm leading-relaxed space-y-4">
              <p className="text-ink/60 italic mb-4">(주)딥마인(이하 '회사')은 고객의 개인정보를 소중하게 생각하며, "개인정보 보호법" 등 관련 법령을 준수하고 있습니다.</p>

              <section>
                <h4 className="font-bold text-ink mb-2">1. 개인정보의 수집 및 이용 목적</h4>
                <p>회사는 홈페이지 내 '프로젝트 문의하기' 기능을 통해 접수된 고객의 문의 사항에 대한 확인 및 답변, 상담 서비스 제공을 목적으로 개인정보를 처리합니다.</p>
              </section>

              <section>
                <h4 className="font-bold text-ink mb-2">2. 수집하는 개인정보 항목</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>필수 항목: 회사명/담당자명, 이메일 주소, 문의 내용</li>
                  <li>수집 방법: 홈페이지 문의 폼을 통한 이용자 직접 입력</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-ink mb-2">3. 개인정보의 보유 및 이용 기간</h4>
                <p>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 다음과 같이 일정 기간 보관합니다.</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                  <li>홈페이지 방문 기록: 3개월</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-ink mb-2">4. 정보주체의 권리 및 행사 방법</h4>
                <p>고객은 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제 및 처리 정지를 요구할 수 있습니다. 권리 행사는 회사(kwpark@deepmine.co.kr)를 통해 서면 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
              </section>

              <section>
                <h4 className="font-bold text-ink mb-2">5. 개인정보 보호책임자</h4>
                <p>성명: 박경원 (대표) | 연락처: 010-4231-4907 / kwpark@deepmine.co.kr</p>
              </section>

              <p className="text-xs text-ink/50 mt-8 pt-4 border-t border-border/60">공고일자: 2026년 5월 11일 / 시행일자: 2026년 5월 11일</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. 이메일무단수집거부 모달 */}
      {isEmailModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          ref={emailRef}
          onKeyDown={(e) => handleFocusTrap(e, emailRef, setIsEmailModalOpen)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsEmailModalOpen(false)}></div>
          <div className="relative bg-surface border border-border w-full max-w-md rounded-xl p-8 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-border/60 pb-3">
              <h3 id="email-modal-title" className="text-xl font-bold text-ink">이메일무단수집거부</h3>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="text-ink/60 hover:text-ink p-2 rounded-md hover:bg-border/40"
                aria-label="무단수집 거부 안내 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-ink/80 text-sm leading-relaxed space-y-4">
              <p>본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.</p>
              <p>이를 위반 시 <span className="text-primary font-semibold">정보통신망 이용촉진 및 정보보호 등에 관한 법률</span>에 의해 형사 처벌될 수 있음을 유념하시기 바랍니다.</p>
              <p className="text-xs text-ink/50 mt-8 pt-4 border-t border-border/60 text-center italic">게시일자: 2026년 5월 11일</p>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          🌊 메인 콘텐츠 영역 (에디토리얼 & 캔버스 교차 구조)
          ========================================== */}
      <main id="main-content" className="pt-20">
        
        {/* 1. Hero 섹션 (배경: Background) */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-[96px] lg:py-48 flex flex-col items-center justify-center text-center overflow-hidden bg-background transition-colors duration-300">
          {isDarkMode && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
          )}

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider mb-6 border border-primary/20">
              AI FUTURE DEMAND FORECASTING
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight text-ink mb-8 leading-[1.1] break-keep">
              데이터 기반 미래 예측 솔루션 <br />
              <span className="text-primary font-medium">
                {COMPANY_INFO.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-serif italic text-ink/75 mb-10 max-w-2xl mx-auto">
              "{COMPANY_INFO.slogan}"
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-primary text-white font-semibold hover:bg-primary/95 transition-all flex items-center justify-center shadow-md shadow-primary/10"
              >
                도입 성과 보기 <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-surface border border-border text-ink/80 font-semibold hover:bg-border/30 transition-all"
              >
                도입 문의
              </button>
            </div>
          </div>
        </section>

        {/* 2. About & 성과 섹션 (배경: Cream Canvas 교차) */}
        <section id="about" className="py-[96px] bg-cream transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-wider uppercase text-xs">Customer Case Study</span>
              <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-ink mt-2 mb-4">삼성전자 모델 적용 성과</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
              <p className="text-base text-ink/80 leading-relaxed max-w-2xl mx-auto">
                (주)딥마인은 세계 최고 수준의 SCM 환경에서 데이터 기반 AI 수요 예측 모델을 안정적으로 운영하여, 부품 자재 조달 효율을 극대화하고 있습니다.
              </p>
            </div>

            {/* 정량 지표 3대 빅 넘버 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-surface border border-border/80 p-8 rounded-lg text-center shadow-sm">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="text-4xl font-extrabold text-primary my-3 tracking-tight">{stat.value}</div>
                  <p className="text-xs text-ink/65 leading-relaxed mt-4 pt-4 border-t border-border/40">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* AI 학습 파이프라인 가로 다이어그램 (버전 4 결합) */}
            <div className="bg-surface border border-border/80 p-8 lg:p-12 rounded-lg mt-12 shadow-sm">
              <h3 className="text-xl font-bold text-ink mb-2 text-center">딥마인 AI 학습 & 전처리 파이프라인</h3>
              <p className="text-xs text-ink/65 text-center mb-10">데이터 수집부터 HPO 탐색까지의 유기적인 시계열 머신러닝 프로세스</p>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
                {PIPELINE.map((pipe, i) => (
                  <React.Fragment key={i}>
                    <div className="flex-1 w-full bg-background border border-border/60 p-5 rounded-lg text-center lg:text-left transition-all hover:border-primary/40 duration-300">
                      <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-2">{pipe.step}</span>
                      <h4 className="font-bold text-sm text-ink mb-1.5">{pipe.title}</h4>
                      <p className="text-xs text-ink/70 leading-relaxed">{pipe.desc}</p>
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <div className="flex items-center justify-center text-slate-400 shrink-0" aria-hidden="true">
                        <ArrowRight className="hidden lg:block w-5 h-5" />
                        <ArrowDown className="lg:hidden w-5 h-5 my-1" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Solutions & AI 아키텍처 섹션 (배경: Background) */}
        <section id="solutions" className="py-[96px] bg-background transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider uppercase text-xs">Advanced AI Architecture</span>
              <h2 class="text-3xl md:text-4xl font-serif font-normal tracking-tight text-ink mt-2 mb-4">파운데이션 모델 및 예측 엔진군</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-ink/70 max-w-2xl mx-auto">
                딥마인은 초대형 사전 학습 시계열 Zero-shot 모델과 고성능 딥러닝 알고리즘을 융합하여 정밀한 예측력을 제공합니다.
              </p>
            </div>

            {/* 2대 기술 탭 UI (버전 5 차용) */}
            <div className="flex justify-center border-b border-border/80 mb-10 gap-2">
              <button 
                onClick={() => setActiveTab('foundation')}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === 'foundation' 
                    ? 'border-primary text-primary font-bold' 
                    : 'border-transparent text-ink/60 hover:text-ink'
                }`}
              >
                파운데이션 모델 스택
              </button>
              <button 
                onClick={() => setActiveTab('traditional')}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === 'traditional' 
                    ? 'border-primary text-primary font-bold' 
                    : 'border-transparent text-ink/60 hover:text-ink'
                }`}
              >
                기반 딥러닝 아키텍처
              </button>
            </div>

            {/* 탭 콘텐츠 렌더링 */}
            <div className="min-h-[220px]">
              {activeTab === 'foundation' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="bg-surface border border-border border-t-4 border-t-primary p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-ink mb-2">TimeGPT (Nixtla)</h4>
                    <p className="text-xs text-ink/70 leading-relaxed mb-4">금융, 날씨, 에너지 등 1,000억 개 이상의 시점 이력으로 사전 학습된 인코더-디코더 트랜스포머. 로컬 위치 인코딩 및 잔차 연결 결합.</p>
                    <span className="inline-block bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-semibold">Deterministic Point 예측</span>
                  </div>
                  <div className="bg-surface border border-border border-t-4 border-t-accent p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-ink mb-2">Moirai (Salesforce)</h4>
                    <p className="text-xs text-ink/70 leading-relaxed mb-4">혼합 확률 분포를 출력하여 단일 미래 값 대신 전체 분포의 두께와 신뢰 구간 예측을 수행하는 확률적 아키텍처.</p>
                    <span className="inline-block bg-accent/15 text-accent text-[10px] px-2 py-0.5 rounded font-semibold">Probabilistic PDF 예측</span>
                  </div>
                  <div className="bg-surface border border-border border-t-4 border-t-slate-500 p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-ink mb-2">Chronos (Amazon)</h4>
                    <p className="text-xs text-ink/70 leading-relaxed mb-4">연속 시계열 변량을 고정 이산 값으로 토큰화하여 대형 언어 모델(LLM)을 시계열 예측용으로 변환.</p>
                    <span className="inline-block bg-border text-ink/70 text-[10px] px-2 py-0.5 rounded font-semibold">LLM 기반 시계열 예측</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MODELS.map((model, i) => (
                    <div key={i} className="bg-surface border border-border p-6 rounded-lg flex flex-col hover:border-primary/50 transition-colors duration-300">
                      <div className="bg-background w-14 h-14 rounded-lg flex items-center justify-center mb-5 shrink-0">
                        {model.icon}
                      </div>
                      <h4 className="font-bold text-base text-ink mb-2">{model.title}</h4>
                      <p className="text-xs text-ink/75 leading-relaxed">{model.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Performance Section (예측 성능 시각화 - 신규) */}
        <section id="performance" className="py-[96px] bg-cream transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-wider uppercase text-xs">AI Performance Chart</span>
              <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-ink mt-2 mb-4">데이터 축적에 따른 모델 성능 추이</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
              <p className="text-base text-ink/75 leading-relaxed max-w-2xl mx-auto">
                가용 데이터 축적 기간이 길어질수록, 딥마인의 예측 모델이 장기 추세 변동을 완벽히 인지하여 향후 최대 84개월(7년) 후의 장기 예측 정확도가 비약적으로 향상됩니다.
              </p>
            </div>

            {/* SVG 기반 커스텀 꺾은선 차트 (의존성 없이 HSL 테마와 100% 호환) */}
            <div className="bg-surface p-6 sm:p-10 rounded-lg border border-border shadow-sm max-w-4xl mx-auto relative overflow-hidden">
              <h3 className="text-base font-bold text-ink mb-2">종합 예측 정확도 (%) 추세 분석</h3>
              <p className="text-xs text-ink/60 mb-6">M06(6개월) ~ M78(78개월) 가용 데이터 축적에 따른 정확도 변동</p>
              
              <div className="relative w-full overflow-x-auto">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full min-w-[640px] h-auto overflow-visible select-none">
                  {/* Y축 격자선 및 눈금 텍스트 */}
                  {[70, 75, 80, 85, 90].map((yVal, i) => {
                    const y = svgHeight - paddingY - ((yVal - 70) / (90 - 70)) * (svgHeight - paddingY * 2);
                    return (
                      <g key={i} className="opacity-80">
                        <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="hsl(var(--border))" strokeDasharray="3,3" strokeWidth="1" />
                        <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[11px] fill-ink/60 font-mono">{yVal}%</text>
                      </g>
                    );
                  })}

                  {/* 그라데이션 정의 */}
                  <defs>
                    <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* 면적 패스 */}
                  <path d={areaPath} fill="url(#chartAreaGradient)" />

                  {/* 꺾은선 패스 */}
                  <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* 데이터 포인트 원 표시 및 인터랙션 */}
                  {points.map((p, i) => (
                    <g 
                      key={i} 
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer"
                    >
                      {/* 외부 포커스 원 (호버 시 활성화) */}
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r={hoveredPoint === i ? 12 : 0} 
                        fill="hsl(var(--primary))" 
                        className="transition-all duration-300 opacity-20"
                      />
                      {/* 메인 테두리 원 */}
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r={hoveredPoint === i ? 7 : 5} 
                        fill="hsl(var(--surface))" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={hoveredPoint === i ? 3 : 2.5} 
                        className="transition-all duration-200"
                      />
                      {/* X축 텍스트 라벨 */}
                      <text 
                        x={p.x} 
                        y={svgHeight - 12} 
                        textAnchor="middle" 
                        className={`text-[10px] font-sans transition-all duration-200 ${
                          hoveredPoint === i ? 'fill-primary font-bold' : 'fill-ink/60'
                        }`}
                      >
                        {p.label.split(' ')[0]}
                      </text>
                    </g>
                  ))}

                  {/* X축 기본 라인 */}
                  <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="hsl(var(--border))" strokeWidth="1" />
                </svg>
              </div>

              {/* 실시간 SVG 호버 툴팁 */}
              {hoveredPoint !== null && (
                <div 
                  className="absolute bg-surface border border-border/80 px-4 py-2.5 rounded-md shadow-lg pointer-events-none transition-all duration-150 ease-out z-20 text-left"
                  style={{
                    left: `${((points[hoveredPoint].x - paddingX) / (svgWidth - paddingX * 2)) * 80 + 10}%`,
                    top: '20%'
                  }}
                >
                  <p className="text-[10px] text-ink/60">{points[hoveredPoint].label}</p>
                  <p className="text-sm font-extrabold text-primary mt-0.5">정확도: {points[hoveredPoint].val}%</p>
                </div>
              )}

              {/* 성능 분석 디스크립션 카드 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-t border-border/60">
                <div>
                  <span className="text-primary font-bold text-xs block mb-1">💡 24개월 시점의 안정화 임계점</span>
                  <p className="text-xs text-ink/75 leading-relaxed">
                    이력 데이터가 최소 24개월 이상 안정적으로 누적되는 시점부터 **84%대의 고도의 안정적인 정확도 구간**으로 수렴합니다.
                  </p>
                </div>
                <div>
                  <span className="text-primary font-bold text-xs block mb-1">💡 최대 7년 후의 장기 예측 정밀도</span>
                  <p className="text-xs text-ink/75 leading-relaxed">
                    최장기 단계인 78개월 활용 예측에서도 **81.7%**의 높은 정밀도를 유지하여 장기 부품 조달 계획 수립에 즉각 연계 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. History & Clients 섹션 (배경: Background) */}
        <section id="history" className="py-[96px] bg-background transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

              {/* 연혁 타임라인 */}
              <div>
                <h2 className="text-3xl font-serif font-normal tracking-tight text-ink mb-10">History</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {HISTORY.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-border group-hover:bg-primary text-ink/50 group-hover:text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border p-5 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-primary text-sm">{item.year}</div>
                        </div>
                        <div className="text-xs text-ink/80 leading-relaxed">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주요 고객사 배지 */}
              <div>
                <h2 className="text-3xl font-serif font-normal tracking-tight text-ink mb-10">Trusted By</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {CLIENTS.map((client, idx) => (
                    <div key={idx} className="bg-surface border border-border rounded-lg p-4 flex items-center justify-center text-center h-24 hover:bg-border/20 transition-colors duration-300">
                      <span className="font-medium text-xs text-ink/80 group-hover:text-ink">
                        {client}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8">
                  <h3 className="text-base font-bold text-ink mb-4">대표 구축 이력</h3>
                  <ul className="space-y-4 text-xs text-ink/85 leading-relaxed">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1.5 text-primary shrink-0 font-bold">•</div>
                      <span className="break-keep">삼성전자 무선사업부 서비스 자재 수요 예측 시스템 PoC부터 GPU 실사용 운영화 완료.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1.5 text-primary shrink-0 font-bold">•</div>
                      <span className="break-keep">삼성전자 마케팅 분석 시스템(ASAP) 데이터 분석 및 데이터 과학 역량 전담 지원.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1.5 text-primary shrink-0 font-bold">•</div>
                      <span className="break-keep">한국거래소, 국토교통부 등 공공/금융 인공지능 공간 통계 & 모니터링 시스템 구축.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 필터 가능한 주요 사업 실적 테이블 (버전 5 차용) */}
            <div className="bg-surface border border-border rounded-lg p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 border-b border-border pb-3">
                <h3 className="text-lg font-bold text-ink">상세 사업 및 프로젝트 수행 실적</h3>
                <span className="text-xs text-ink/50">2011년 6월 ~ 현재</span>
              </div>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: '전체 내역' },
                  { id: '삼성', label: '삼성 그룹사' },
                  { id: '공공', label: '공공 / 금융 / 기타' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setProjectFilter(btn.id)}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 ${
                      projectFilter === btn.id
                        ? 'bg-primary/15 text-primary'
                        : 'bg-background text-ink/70 hover:bg-border/30'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* 데이터 테이블 */}
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto pr-2 border rounded-md border-border/40">
                <table className="min-w-full divide-y divide-border/60">
                  <thead className="bg-background sticky top-0 z-10">
                    <tr>
                      <th scope="col" class="px-4 py-3 text-left text-xs font-bold text-ink/75 uppercase w-1/4">고객사</th>
                      <th scope="col" class="px-4 py-3 text-left text-xs font-bold text-ink/75 uppercase w-1/3">프로젝트명</th>
                      <th scope="col" class="px-4 py-3 text-left text-xs font-bold text-ink/75 uppercase hidden md:table-cell">수행 요약</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface divide-y divide-border/40">
                    {filteredProjects.map((p, i) => (
                      <tr key={i} className="hover:bg-border/10 transition-colors duration-150">
                        <td className="px-4 py-4 text-xs font-bold text-primary align-top whitespace-nowrap">{p.client}</td>
                        <td className="px-4 py-4 text-xs font-semibold text-ink align-top">{p.name}</td>
                        <td className="px-4 py-4 text-xs text-ink/75 hidden md:table-cell align-top leading-relaxed">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact 섹션 (배경: Background) */}
        <section id="contact" className="py-[96px] bg-background transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface border border-border rounded-2xl p-8 lg:p-16 flex flex-col lg:flex-row gap-12">

              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-ink mb-6">프로젝트 문의하기</h2>
                <p className="text-ink/70 mb-10 leading-relaxed text-sm">
                  기업의 데이터를 활용한 맞춤형 AI 수요예측 솔루션 도입에 대해 상담해 드립니다. 아래 연락처로 편하게 문의주세요.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Building2 className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-ink font-semibold mb-1 text-sm">본사 위치</h4>
                      <p className="text-ink/70 text-xs">{COMPANY_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-ink font-semibold mb-1 text-sm">이메일</h4>
                      <p className="text-ink/70 text-xs">{COMPANY_INFO.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-ink font-semibold mb-1 text-sm">연락처</h4>
                      <p className="text-ink/70 text-xs">{COMPANY_INFO.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DM-Contact-Form (KRDS 접근성 매핑 및 필수 마크업 적용) */}
              <div className="lg:w-1/2">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label id="label-name" htmlFor="input-name" className="block text-xs font-semibold text-ink/75 mb-1.5">
                      회사명 / 담당자명 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-labelledby="label-name"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="예: (주)딥마인 / 홍길동"
                      required
                    />
                  </div>
                  
                  <div>
                    <label id="label-email" htmlFor="input-email" className="block text-xs font-semibold text-ink/75 mb-1.5">
                      이메일 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-labelledby="label-email"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="company@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label id="label-message" htmlFor="input-message" className="block text-xs font-semibold text-ink/75 mb-1.5">
                      문의 내용 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="input-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      aria-labelledby="label-message"
                      rows="4"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="도입을 희망하시는 데이터 분야나 솔루션에 대해 간략히 적어주세요."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full ${status === 'loading' ? 'bg-primary/80 cursor-wait' : 'bg-primary hover:bg-primary/95'} text-white text-sm font-semibold py-3 px-4 rounded-md transition-all flex items-center justify-center shadow-md shadow-primary/10`}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        전송 중...
                      </>
                    ) : '문의 남기기'}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer (DM-Footer - 항상 다크 테마 고정) */}
      <footer className="dark bg-[#050810] text-slate-400 border-t border-slate-800/60 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* 브랜드 정보 */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-3 font-bold text-white text-sm">DM</div>
                <span className="font-bold text-2xl text-white">DeepMine</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                제조/유통/금융 데이터 분석 및 인공 지능 개발 전문 기업입니다.
                다양한 프로젝트 경험을 바탕으로 고객 맞춤형 AI 솔루션을 제공합니다.
              </p>
            </div>

            {/* 빠른 네비게이션 링크 */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Navigation</h4>
              <ul className="space-y-4 text-sm">
                {['About', 'Solutions', 'History', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="hover:text-primary transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 법적 링크 및 정보 고지 */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="hover:text-primary transition-colors font-semibold text-slate-300"
                  >
                    개인정보처리방침
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsEmailModalOpen(true)}
                    className="hover:text-primary transition-colors"
                  >
                    이메일무단수집거부
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 세부 법인 정보 라인 및 WA 접근성 마크 홀더 */}
          <div className="border-t border-slate-800/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs leading-loose text-center md:text-left text-slate-500">
              <p>상호: {COMPANY_INFO.name} | 대표: {COMPANY_INFO.ceo} | 사업자등록번호: {COMPANY_INFO.businessNumber}</p>
              <p>주소: {COMPANY_INFO.address} | 연락처: {COMPANY_INFO.phone} | 이메일: {COMPANY_INFO.email}</p>
              <p className="mt-2 text-slate-600">© {new Date().getFullYear()} DeepMine Corp. All rights reserved.</p>
            </div>
            
            {/* WA(웹 접근성) 우수 마크 공간 확보 (KRDS 준수) */}
            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 px-4 py-2.5 rounded-lg shrink-0" aria-hidden="true">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">WA</div>
              <div className="text-[10px] leading-tight text-slate-500">
                <p className="font-semibold text-slate-400">웹 접근성 준수</p>
                <p>WA 품질 마크 인증 대기</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}