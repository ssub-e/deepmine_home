---
title: "딥러닝 기반 시계열 예측"
title_en: "Deep Learning Time Series Forecasting"
category: "Technology"
keywords: [딥러닝, NHITS, NBEATS, LSTM, DeepAR, TFT, PatchTST, BiTCN]
last_updated: "2026-06-08"
source_refs:
  - "gemini/04_forecasting_methodology_theory.md"
  - "gpt/08_deep_learning_forecasting.md"
---

# 딥러닝 기반 시계열 예측

비즈니스 시계열 데이터의 복잡성(비선형 추세, 급격한 이벤트 변화, 풍부한 외생 변수 등)이 증가함에 따라, 고전 통계 모델의 한계를 극복하고 대규모 시점 데이터를 유연하게 포착할 수 있는 **딥러닝 기반 시계열 예측 알고리즘**이 현대 SCM 시스템의 주류 기술로 자리 잡았습니다. 딥마인 예측 프레임워크는 데이터 특성과 추론 사양에 따라 최적의 연산을 수행하도록 설계된 **4대 모델군**을 내장하여 운용하고 있습니다.

---

## 1. 예측 아키텍처 모델군 분류

딥마인 프레임워크는 크게 네 가지 아키텍처 계열의 예측 인공 신경망을 동적으로 선택 및 조합하여 앙상블을 수행합니다.

### 1-1. MLP Family (Multi-Layer Perceptron 계열)
다층 퍼셉트론 기반 구조로, 다중 블록 적층 방식을 취해 입출력을 선형적으로 매핑하는 매우 직관적이고 가벼운 신경망 계열입니다.
- **대표 모델**: **N-BEATS**(Neural Basis Expansion Analysis for interpretable Time Series), **N-HiTS**(Neural Hierarchical Interpolation for multi-horizon Time Series)
- **예측 방식**: **Direct Forecasting**  
  단일 신경망 추론 프로세스 내에서 목표하는 미래 모든 시점(예: 향후 1~12개월 후)의 예측값을 한 번에 병렬 연산합니다.
- **핵심 강점**:
  - 중간 시점의 예측 오차가 다음 예측의 입력으로 재활용되지 않기 때문에 오차가 지속해서 확대되는 **오류 누적(Error Propagation) 현상이 근본적으로 방지**됩니다.
  - 연산 병렬성이 뛰어나 CPU/GPU 상의 학습 및 추론 속도가 압도적으로 빠릅니다.
- **적합 시나리오**: 수만 개 이상의 품목(SKU)에 대해 대규모 배치(Batch) 수요 예측 리포트를 단시간 내에 발행해야 하는 물류센터 및 이커머스 발주 시스템.

### 1-2. RNN Family (Recurrent Neural Network 계열)
시계열의 순차적(Sequential)인 흐름과 시간 역학적 연결을 모델 가중치 상태에 담아 전달하는 전통적인 순환 신경망 계열입니다.
- **대표 모델**: **LSTM**(Long Short-Term Memory), **GRU**(Gated Recurrent Unit), **DeepAR**(Amazon Deep Autoregressive)
- **예측 방식**: **Recursive Forecasting**  
  직전 시점의 예측치를 다음 시점 예측을 위한 모델 입력으로 다시 주입하는 순환 구조를 활용하여 원하는 미래 시점까지 예측을 이어 나갑니다.
- **핵심 강점**:
  - 입력 가용 데이터의 역사적 길이가 각 시점마다 불규칙하더라도 유연하게 수용할 수 있습니다.
  - 특히 DeepAR의 경우 점(Point) 예측에 그치지 않고 미래 예측 구간의 확률 밀도 분포(PDF, Student's t-distribution 등)를 직접 학습하여 리스크 시나리오를 산출합니다.
- **적합 시나리오**: 과거 가용 이력 길이가 유동적이거나, 특정 재고 결품을 방지하기 위해 상위 95% 확률 하에서의 안전 재고 수준 가이드가 필요한 정밀 재고 조달 시나리오.

### 1-3. Transformer Family (Self-Attention 계열)
입력 문맥 전체에서 중요한 시간적 특징 간의 연관 관계를 가중 어텐션(Attention) 맵으로 도출하여 모델링하는 최첨단 딥러닝 계열입니다.
- **대표 모델**: **TFT**(Temporal Fusion Transformer), **PatchTST**(Patch Time Series Transformer)
- **예측 방식**: **Multi-Head Self-Attention**  
  순차 처리를 하지 않고 전체 입력 시퀀스를 어텐션 메커니즘을 통해 한 번에 분석합니다.
- **핵심 강점**:
  - 장기 의존성(Long-term dependency) 파악 성능이 시계열 모델 중 가장 독보적입니다.
  - TFT의 경우 정적 메타데이터(예: 매장 위치)와 가변 외생 변수(예: 날씨, 할인 프로모션)를 각각 독립된 게이트 네트워크(GRN)로 제어하여 영향도를 정량적으로 해석(Explainable AI)할 수 있는 해석력을 제공합니다.
- **적합 시나리오**: 프로모션 일정, 경쟁사 동향, 거시 지표 등 외생 변수의 영향이 복잡하게 얽혀 있는 엔터프라이즈 수요 예측 및 장기 전략 기획.

### 1-4. CNN Family (Convolutional Neural Network 계열)
이미지 처리에 사용되는 필터 합성곱 연산을 시계열 시간 축 방향으로 적용하여 국소 패턴을 빠르게 추출하는 계열입니다.
- **대표 모델**: **BiTCN**(Bilateral Temporal Convolutional Network), **TCN**
- **예측 방식**: **Dilated Convolution**  
  필터가 건너뛰는 간격(Dilation)을 지수적으로 넓혀가며 합성곱 연산을 수행하여 적은 파라미터로도 넓은 수용 영역(Receptive Field)을 커버합니다.
- **핵심 강점**:
  - RNN에 비해 가중치 역전파 시 기울기 소실(Vanishing Gradient) 문제가 없고, 합성곱 연산 특성상 병렬화가 가능하여 실시간 추론 속도가 대단히 신속합니다.
  - 시간 역방향으로의 정보 유출이 차단되는 인과적(Causal) 필터를 사용하여 실질적 인과 관계를 보장합니다.
- **적합 시나리오**: 단기 추세 반전이 빈번한 거래량, 에너지 수요, 하드웨어 실시간 센서 로그 모니터링.

---

## 2. 예측 방식 비교 요약

각 딥러닝 모델군은 예측을 생성하는 전개 방식에 따라 고유의 Trade-off 관계를 가집니다.

| 예측 방식 (Horizon 전개) | 주요 매커니즘 | 핵심 장점 | 한계 및 극복 방안 |
|-------------------------|--------------|-----------|-------------------|
| **Direct Forecasting** <br>(NHITS, NBEATS 등) | $$[\hat{y}_{t+1}, \dots, \hat{y}_{t+H}] = f(y_{t-L}, \dots, y_t)$$ | 오차 누적이 발생하지 않음. <br>대규모 연산 및 분산 학습에 특화. | 미래 예측 수평선 $H$가 사전에 강제되며 고정되어야 함. |
| **Recursive Forecasting** <br>(DeepAR, LSTM 등) | $$\hat{y}_{t+1} = f(y_t, \dots, y_{t-L})$$ <br>$$\hat{y}_{t+2} = f(\hat{y}_{t+1}, y_t, \dots)$$ | 무제한의 긴 미래 예측 $H$ 전개 가능. <br>입력 데이터 길이에 제약이 적음. | 순환 단계마다 예측 오차가 누적되어 장기로 갈수록 신뢰도 급감. |

---

## 3. 모델군별 기술적 성능 비교표

| 모델 계열 | 속도 | 장기 예측 성능 | 외생 변수 융합력 | 주요 특징 |
|-----------|------|---------------|-----------------|-----------|
| **MLP Family** | ⚡ 매우 빠름 | 보통 | 보통 | 경량화, 해석이 직관적이고 직렬 병렬 처리 강함 |
| **RNN Family** | 🟡 보통 | 보통 | 좋음 | 순차적 변화 반영, 확률적 밀도 함수 출력 강점 (DeepAR) |
| **Transformer**| 🟡 보통 | 🟢 매우 우수 | 🟢 매우 우수 | 어텐션 활용 장기 패턴 추적, 변수 중요도 분석 (XAI) |
| **CNN Family** | 🟢 빠름 | 좋음 | 보통 | 인과성 보장 필터 활용, 빠른 실시간 분석에 유리 |

---

## 4. 연계 문서
- **시계열 전처리 및 정상성 확보**: [05_technology/01_timeseries_fundamentals.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/01_timeseries_fundamentals.md)
- **최신 시계열 파운데이션 모델**: [05_technology/04_foundation_models.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/04_foundation_models.md)
