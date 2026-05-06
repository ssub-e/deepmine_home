import React, { useState } from 'react';
import { Menu, X, ChevronRight, BarChart3, Database, BrainCircuit, LineChart, Building2, MapPin, Mail, Phone } from 'lucide-react';

// ==========================================
// 📝 데이터 수정 영역 (이곳의 텍스트만 바꾸면 홈페이지 내용이 변경됩니다)
// ==========================================

const COMPANY_INFO = {
  name: '(주)딥마인',
  slogan: 'We predict future',
  description: '제조/유통/금융 데이터 분석, 인공 지능 개발(수요 예측, LLM 등), 공간 정보 예측을 전문으로 하며, 다수의 프로젝트에서 축적된 노하우로 고객 맞춤형 AI 솔루션을 제공합니다.',
  ceo: '박경원',
  address: '서울특별시 금천구 벚꽃로 298, 1301호-12',
  founded: '2021년 12월 20일',
  email: 'contact@deepmine.co.kr', // 필요시 수정
  phone: '02-000-0000' // 필요시 수정
};

const SOLUTIONS = [
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    title: '제조/유통 수요 예측',
    description: '대기업 및 중소기업의 상품 수요와 부품 자재의 수요를 예측합니다. 제조업체의 수율 예측 및 분석을 지원합니다.'
  },
  {
    icon: <LineChart className="w-8 h-8 text-emerald-500" />,
    title: '금융/경제 지표 예측',
    description: '수입/수출 회사를 위한 원달러 환율 및 원자재 가격 예측, 금융회사의 상품 수요 및 가격 예측 모델을 제공합니다.'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
    title: 'Advanced AI 아키텍처',
    description: 'TimeGPT, Transformer, MLP, RNN, CNN 기반의 앙상블 모델을 활용하여 장단기 시계열 패턴을 완벽하게 학습합니다.'
  },
  {
    icon: <Database className="w-8 h-8 text-orange-500" />,
    title: '빅데이터 기반 프레임워크',
    description: '내부 데이터와 외부 크롤링 데이터를 결합하고, 1,000억 개 이상의 데이터 포인트가 학습된 파운데이션 모델을 활용합니다.'
  }
];

const HISTORY = [
  { year: '2023. 10', title: '서비스 자재 수요예측 GPU 실사용 적용' },
  { year: '2022. 09', title: '서비스 자재 수요예측 GPU 도입 PoC' },
  { year: '2021. 12', title: '(주)딥마인 법인 설립' },
  { year: '2020. 01 ~', title: '삼성전자 ASAP 데이터 과학자 지원 (수요예측 정확도 개선 운영)' },
  { year: '2019. 05 ~', title: '삼성전자 무선사업부 서비스 자재 수요예측 시스템 구축' },
];

const CLIENTS = [
  '삼성전자', '삼성SDS', '현대자동차', '기아자동차', '한국거래소', '국토교통부', '한국정보화진흥원', '삼성증권', '롯데면세점', '동부화재'
];

// ==========================================
// 💻 UI 컴포넌트 영역 (디자인 및 레이아웃 구조)
// ==========================================

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mr-3 font-bold text-white tracking-tighter">
                DM
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">DeepMine</span>
            </div>

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Solutions', 'History', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#111827] border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Solutions', 'History', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* 1. Hero 섹션 */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* 배경 그라데이션 장식 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider mb-6 border border-blue-500/20">
              AI FUTURE DEMAND FORECASTING
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight break-keep">
              데이터 기반 미래 예측 솔루션 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                {COMPANY_INFO.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
              "{COMPANY_INFO.slogan}"
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('solutions')}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all flex items-center justify-center"
              >
                솔루션 보기 <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#111827] border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-all"
              >
                도입 문의
              </button>
            </div>
          </div>
        </section>

        {/* 2. About 섹션 */}
        <section id="about" className="py-24 bg-[#0a0f1c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Us</h2>
                <div className="w-20 h-1 bg-blue-500 mb-8 rounded"></div>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  {COMPANY_INFO.description}
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
                <div className="relative bg-[#111827] border border-slate-800 p-8 rounded-2xl aspect-square flex flex-col justify-center">
                  {/* 대시보드 뉘앙스의 일러스트/UI 표현 */}
                  <div className="space-y-4">
                    <div className="h-8 w-1/3 bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-slate-800 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                    <div className="h-32 w-full bg-gradient-to-t from-blue-900/50 to-transparent border-b border-blue-500/50 mt-8 rounded flex items-end">
                      <div className="w-full flex justify-between items-end px-2 space-x-2 h-full opacity-50">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                          <div key={i} className="w-full bg-blue-500 rounded-t" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Solutions 섹션 */}
        <section id="solutions" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI 미래 수요 예측 솔루션</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                데이터 수집부터 모델링, 시각화까지 고객사의 도메인에 최적화된 예측 모델을 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SOLUTIONS.map((solution, idx) => (
                <div key={idx} className="bg-[#111827] border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group">
                  <div className="bg-[#0B1120] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. History & Clients 섹션 */}
        <section id="history" className="py-24 bg-[#0a0f1c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* 연혁 */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-10">History</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {HISTORY.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0B1120] bg-slate-700 group-hover:bg-blue-500 text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111827] border border-slate-800 p-5 rounded-xl shadow">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-blue-400">{item.year}</div>
                        </div>
                        <div className="text-slate-300">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주요 고객사 */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-10">Trusted By</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {CLIENTS.map((client, idx) => (
                    <div key={idx} className="bg-[#111827] border border-slate-800 rounded-lg p-4 flex items-center justify-center text-center h-24 hover:bg-slate-800/50 transition-colors">
                      <span className="font-medium text-slate-300 group-hover:text-white">
                        {client}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">주요 도입 성과</h3>
                  <ul className="space-y-4 text-slate-300">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-400">•</div>
                      <span className="break-keep">삼성전자 무선사업부 서비스 자재 수요 예측 모델 도입 초기 <b>수 십억원 절감</b></span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-400">•</div>
                      <span className="break-keep">지속적인 개선 및 고도화를 통해 <b>매년 수 억원의 비용 절감</b> 효과 발생</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-400">•</div>
                      <span className="break-keep">LTB 장단기 수요 예측 정확도 <b>최대 84.7% 달성</b></span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Contact 섹션 */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row gap-12">

              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">프로젝트 문의하기</h2>
                <p className="text-slate-400 mb-10">
                  기업의 데이터를 활용한 맞춤형 AI 수요예측 솔루션 도입에 대해 상담해 드립니다. 아래 연락처로 편하게 문의주세요.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Building2 className="w-6 h-6 text-blue-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">본사 위치</h4>
                      <p className="text-slate-400">{COMPANY_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">이메일</h4>
                      <p className="text-slate-400">{COMPANY_INFO.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">연락처</h4>
                      <p className="text-slate-400">{COMPANY_INFO.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("문의가 접수되었습니다. (데모 버전)"); }}>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">회사명 / 담당자명</label>
                    <input type="text" className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="예: (주)딥마인 / 홍길동" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">이메일</label>
                    <input type="email" className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="company@email.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">문의 내용</label>
                    <textarea rows="4" className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="도입을 희망하시는 데이터 분야나 솔루션에 대해 간략히 적어주세요." required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    문의 남기기
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050810] border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center mr-2 font-bold text-slate-400 text-xs">DM</div>
            <span className="font-bold text-xl text-slate-300">DeepMine</span>
          </div>
          <div className="text-slate-500 text-sm text-center md:text-left">
            <p>대표자: {COMPANY_INFO.ceo} | {COMPANY_INFO.address}</p>
            <p className="mt-2">© {new Date().getFullYear()} DeepMine Corp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}