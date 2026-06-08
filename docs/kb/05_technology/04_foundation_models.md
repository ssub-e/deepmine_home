---
title: "파운데이션 예측 모델"
title_en: "Foundation Forecasting Models"
category: "Technology"
keywords: [파운데이션모델, TimeGPT, Moirai, Chronos, Lag-Llama, TTM, 제로샷, 파인튜닝]
last_updated: "2026-06-08"
source_refs:
  - "gemini/04_forecasting_methodology_theory.md"
  - "gpt/09_foundation_models.md"
  - "gpt/10_timegpt.md"
---

# 파운데이션 예측 모델

최근 시계열 미래 예측 연구는 자연어 처리(NLP) 분야의 LLM 패러다임과 유사하게, 대규모 도메인 데이터를 기반으로 사전 학습(Pre-training)된 대형 모델을 구축하고 이를 활용하여 미확습 시계열에 대해 정밀한 예측을 수행하는 **시계열 파운데이션 모델(Time Series Foundation Models)** 전이 학습 패러다임으로 빠르게 진화하고 있습니다. 

딥마인 미래 예측 프레임워크는 신제품 출시 초기나 학습 데이터가 부족한 환경에서도 즉시 구동될 수 있는 최첨단 시계열 파운데이션 모델 스택을 확보하여 시스템에 반영하고 있습니다.

---

## 1. 사전 학습 및 제로샷 추론 메커니즘

시계열 파운데이션 모델의 핵심은 **제로샷 추론(Zero-shot Inference)**과 **미세 조정(Fine-tuning)**입니다.

```
┌────────────────────────────────────────────────────────┐
│             Pre-training on massive datasets           │
│             (금융, 에너지, SCM 등 1,000억+ 시점)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│         Zero-shot Inference on unseen targets          │
│         (학습 이력 없는 새로운 데이터에 즉각 대입)    │
└───────────────┬────────────────────────┬───────────────┘
                ▼                        ▼
     [Deterministic Point]      [Probabilistic PDF]
          - TimesFM                  - Moirai
          - TimeGPT                  - Lag-Llama
```

- **사전 학습(Pre-training)**: 금융, 에너지, 물류, IoT, 교통 등 다양한 도메인에서 수집된 대규모 시점 이력 데이터를 토대로 시간의 보편적 상관 패턴을 사전에 다량으로 학습해 둡니다.
- **제로샷 추론(Zero-shot Inference)**: 모델 입장에서 이전에 단 한 번도 보지 못한 완전히 새로운 비즈니스 시계열이 입력되더라도, 추가 학습 프로세스 없이 입력 데이터의 트렌드와 주기를 포착해 즉시 높은 신뢰도의 예측 결과를 냅니다.
- **미세 조정(Fine-tuning)**: 제로샷으로 추론한 기본 모델 위에 고객 도메인 고유의 세부 동역학(Dynamics)을 학습시키는 미세 조정 단계를 결합하여 오차율을 추가적으로 극대화합니다.
  - *실제 성능 지표 예시*: TimeGPT 기본 제로샷 MAE 오차율 **1.902** $\rightarrow$ 현장 미세 조정(Fine-tuning)을 적용할 경우 MAE 오차율 **1.886** 수준으로 개선.

---

## 2. 주요 파운데이션 모델 스택

### 2-1. TimeGPT (Nixtla)
- **아키텍처**: Transformer 기반의 인코더-디코더(Encoder-Decoder) 구조를 채택하고 있습니다.
- **사전 학습 스케일**: 다양한 산업 분야에서 발생한 1,000억 개 이상의 시계열 데이터 포인트를 바탕으로 학습이 완료되었습니다.
- **주요 특징**: 입력 윈도우에 로컬 위치 인코딩(Local positional encoding)과 지름길 잔차 연결(Residual connections)을 결합하여 다양한 주기를 고속으로 추적합니다.

### 2-2. Moirai (Salesforce)
- **아키텍처**: 인코더 전용(Encoder-only) 트랜스포머 아키텍처입니다.
- **주요 특징**: 단일 예측값을 생성하는 점(Point) 예측 대신, 혼합 확률 분포(Mixture distribution)를 출력하여 장기 미래 예측 수평선 전반의 불확실성 구간(Prediction Interval)을 두께 분포 형태로 파악할 수 있는 강점을 지닙니다.

### 2-3. Chronos (Amazon)
- **아키텍처**: T5(Text-to-Text Transfer Transformer) 계열 언어 모델을 시계열 영역에 최적화하여 차용합니다.
- **주요 특징**: 연속적인 시계열 수치를 이산화(Quantization)하여 텍스트 토큰(Vocabulary)처럼 변환하는 고유의 토큰화(Tokenization) 전처리를 도입하여, 기존 대규모 언어 모델의 사전 학습 능력을 시계열 도메인으로 자연스럽게 전이하였습니다.

### 2-4. Lag-Llama
- **아키텍처**: 디코더 전용(Decoder-only) 확률적 예측 모델입니다.
- **주요 특징**: 지연 피처(Lagged features)만을 입력받아 스튜던트 t-분포(Student's t-distribution) 기반의 조건부 미래 확률 밀도를 정교하게 연산해 내며, 다양한 주기성에 매우 유연하게 대응합니다.

### 2-5. Tiny Time Mixers (TTM, IBM)
- **아키텍처**: 극도로 가벼운 구조를 가진 채널 혼합형 다층 퍼셉트론(MLP) 기반 모델입니다.
- **주요 특징**: 전체 파라미터 크기를 1M 이하 수준으로 대폭 경량화하여 모바일 장비나 CPU 및 보급형 서버 환경에서도 빠르고 저비용으로 제로샷 수요 예측을 구동할 수 있도록 최적화되었습니다.

---

## 3. 외생 변수 (Exogenous Variables) 결합 전략

미래의 변동성은 과거 판매 이력만으로 설명되지 않는 외적 요인(날씨, 이벤트, 거시 경제 등)에 크게 좌우됩니다. 딥마인 미래 예측 프레임워크는 파운데이션 모델에 외생 변수를 결합할 때 다음과 같이 3개 카테고리로 나누어 정렬하고 주입합니다.

```
┌────────────────────────────────────────────────────────┐
│                  Exogenous Variables                   │
└───────────────────────────┬────────────────────────────┘
                            │
     ┌──────────────────────┼──────────────────────┐
     ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  정적 변수   │      │ 과거 시계열   │      │ 미래 시계열   │
│  (Static)    │      │  (Historic)  │      │   (Future)   │
└──────────────┘      └──────────────┘      └──────────────┘
```

1. **정적 변수 (Static Variables)**
   - **개요**: 시간이 지나도 형태나 특성이 변하지 않는 대상의 물리적 컨텍스트 정보입니다.
   - **예시**: 자재 제조사 고유 정보, 매장 지점 주소, 카테고리 종류 등.
2. **과거 시계열 변수 (Historic Variables)**
   - **개요**: 오직 과거의 실제 측정 시점에만 데이터가 축적되어 존재하고, 예측 시점 이후의 미래 시점에는 수치를 사전에 알 수 없는 외부 변수입니다.
   - **예시**: 물류창고 온도 모니터링 로그, 기계 설비 진동수, 웹사이트 실시간 트래픽 등.
3. **미래 유도 시계열 변수 (Future Variables)**
   - **개요**: 미래 예측 도래 시점의 스케줄이나 예정 수치를 명확하게 미리 정의할 수 있는 가장 가치가 높은 외생 선행 지표입니다.
   - **예시**: 익월 마케팅 할인 프로모션 스케줄, 법정 공휴일 계획, 일출/일몰 시각 등.

### 3-1. 외생 변수 주입 성공 사례 (Nord Pool 전력가 예측)
실제 전력 거래 시장인 Nord Pool에서 미래 전력 수요 예측치(Load forecast)와 풍력 발전 생산 예보량(Wind generation)을 미래 유도 시계열 변수(Future Variables)로 분류하여 파운데이션 모델에 통합 주입한 결과, 기상 이변이나 급격한 수급 변동으로 인한 예측하기 어려운 **수요 스파이크(Spike) 현상을 실시간으로 완벽하게 추적 및 탐지**하여 오차율을 크게 방어하는 데 성공하였습니다.

---

## 4. 연계 문서
- **시계열 전처리 및 정상성 확보**: [05_technology/01_timeseries_fundamentals.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/01_timeseries_fundamentals.md)
- **딥러닝 기반 아키텍처**: [05_technology/03_deep_learning_forecasting.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/03_deep_learning_forecasting.md)
