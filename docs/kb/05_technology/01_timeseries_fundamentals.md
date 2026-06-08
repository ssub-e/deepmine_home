---
title: "시계열 데이터 기초 및 전처리"
title_en: "Time Series Fundamentals & Preprocessing"
category: "Technology"
keywords: [시계열, 정상성, 차분, KPSS, 스케일링, 전처리, 손실함수, MAE, MSE]
last_updated: "2026-06-08"
source_refs:
  - "gemini/04_forecasting_methodology_theory.md"
  - "gpt/05_forecasting_methodology.md"
  - "gpt/06_time_series_basics.md"
---

# 시계열 데이터 기초 및 전처리

시계열(Time Series) 데이터 분석 및 미래 예측은 시간에 따라 기록된 관측값을 활용하여 다음 시점의 변화를 모델링하는 과정입니다. 정밀한 예측 결과를 보장하기 위해서는 시계열 데이터가 가지는 특유의 통계적 정률(Moment)을 올바르게 제어하고, 기계학습 및 딥러닝 알고리즘에 적합하도록 정제하는 전처리(Preprocessing)와 스케일링(Scaling) 과정이 필수적입니다.

---

## 1. 정상성 (Stationarity) 확보

### 1-1. 정상성의 정의 및 특징
정상 시계열은 **시간의 흐름에 따라 통계적 성질(평균, 분산, 공분산 등)이 변하지 않는 시계열**을 말합니다.
- **평균의 일정성**: 일정한 추세(Trend)가 없이 중심선을 기준으로 위아래로 진동합니다.
- **분산의 일정성**: 진동의 폭이 일정하여 특정 기간에 진동이 극단적으로 커지거나 작아지지 않습니다.
- **자기공분산의 일정성**: 두 시점 사이의 공분산은 시점의 절대적인 위치와 무관하며, 오직 두 시점 간의 시간 간격(Lag, 시차)에 의해서만 결정됩니다.

우리가 현실에서 접하는 대부분의 비즈니스 데이터(수요, 매출, 환율 등)는 선형 추세가 존재하거나 시간이 지남에 따라 변동폭이 불규칙하게 발산하는 **비정상(Non-stationary) 시계열**입니다. 통계적 선형 모델(예: ARIMA)을 사용하기 위해서는 반드시 비정상 데이터를 변환하여 정상 시계열로 만드는 과정이 필요합니다.

### 1-2. 비정상 데이터의 변환 기법

#### 1) 로그 변환 (Logarithm Transformation)
시간 흐름에 비례하여 변동폭(분산)이 점점 커지거나 불규칙하게 변화하는 이분산성(Heteroscedasticity)을 안정화할 때 적용합니다.
$$y_t^* = \log(y_t)$$

#### 2) 차분 (Differencing)
시간에 따라 평균이 일정하지 않고 지속해서 상승하거나 하락하는 추세(Trend)가 있을 때, 인접한 시점 값의 차이를 도출하여 평균을 안정시키는 기법입니다.
- **1차 일반 차분(Ordinary Differencing)**:
  $$y_t' = y_t - y_{t-1}$$
- **2차 일반 차분(Second-order Differencing)**: 1차 차분 후에도 추세가 완전히 제어되지 않을 때 수행합니다.
  $$y_t'' = y_t' - y_{t-1}' = (y_t - y_{t-1}) - (y_{t-1} - y_{t-2}) = y_t - 2y_{t-1} + y_{t-2}$$
- **계절성 차분(Seasonal Differencing)**: 계절적 패턴(예: 12개월 주기로 반복되는 패턴)이 강할 때, 주기 $m$ 만큼 떨어진 관측값과의 차이를 구합니다.
  $$y_t' = y_t - y_{t-m}$$

---

## 2. 단위근 검정 (Unit Root Tests)

시계열 데이터의 정상성 여부를 수학적으로 검정하는 표준 기법입니다.

### 2-1. KPSS 검정 (Kwiatkowski-Phillips-Schmidt-Shin)
KPSS 검정은 데이터의 정상성을 판단하는 가설 검정 기법으로, ADF 검정 등과 반대의 귀무가설 구조를 가집니다.
- **귀무가설 ($H_0$)**: "해당 시계열 데이터는 정상(Stationary)성을 가진다."
- **대립가설 ($H_1$)**: "해당 시계열 데이터는 정상성을 결여하고 있다 (비정상 시계열)."
- **의사결정**: 분석 결과 산출된 유의확률 $p\text{-value}$가 기준 유의수준(예: $0.05$) 이하일 경우 귀무가설 $H_0$를 기각합니다. 즉, 추가적인 차분($d \ge 1$)이 강제됩니다.

### 2-2. 자동 차분 결정 함수
- **`ndiffs(x)`**: 시계열 `x`가 정상성을 갖추기 위해 필요한 최적의 일반 차분 차수 $d$를 KPSS 검정 등의 알고리즘을 통해 자동으로 추정해 주는 함수입니다.
- **`nsdiffs(x)`**: 계절성 강도 지표 $F_S$를 계산하여, 기준값인 $0.64$를 초과할 경우 계절성 차분이 필요한지 분석하고 적정 계절성 차분 차수 $D$를 반환하는 함수입니다.

---

## 3. 딥러닝 기반 데이터 스케일링 (Data Scaling)

전통 통계 모델과 달리 신경망(Neural Network) 모델은 입력 값의 크기(Scale) 및 가중치 활성화에 매우 예민합니다. 신속하고 안정적인 학습 수렴을 위해 전처리 스케일러 설정이 필수적입니다.

| 스케일러 명칭 | 변환 수학식 | 변환 특징 | 실무 적용 시나리오 |
|--------------|------------|-----------|--------------------|
| **Standard Scaler** | $$x_{\text{scaled}} = \frac{x - \mu}{\sigma}$$ | 평균 $\mu = 0$, 표준편차 $\sigma = 1$로 변환 | 데이터가 정규분포를 따르며 이상치가 비교적 적은 일반적인 예측 |
| **Robust Scaler** | $$x_{\text{scaled}} = \frac{x - \text{Median}}{\text{IQR}}$$ | 중앙값과 사분위수범위(IQR)를 기준으로 스케일링 | **강력 권장**. 신제품 출시 초기 결품, 생산 스파이크 등 극단적인 아웃라이어(Outlier) 왜곡 영향 차단 |

---

## 4. 예측 목적별 손실 함수 (Loss Function) 설계

모델 학습 단계에서 예측 오차를 줄여가기 위해 정의하는 목적 함수로, 비즈니스 예측의 성격에 부합하도록 적합한 함수를 선택해야 합니다.

### 4-1. MAE (Mean Absolute Error, 평균 절대 오차)
$$\text{MAE} = \frac{1}{N}\sum_{i=1}^{N} |Y_i - \hat{Y}_i|$$
- **특징**: 예측 오차의 절대값에 대한 평균값으로, 오차 분포의 **중앙값(Median)**을 최적화하는 특성이 있습니다. 
- **장점**: 제곱을 하지 않기 때문에 이상치(Outlier)에 민감하게 반응하지 않으며, 비즈니스 지표 상 직관적인 오차 해석이 가능하여 시계열 예측에서 디폴트로 가장 권장됩니다.

### 4-2. MSE (Mean Squared Error, 평균 제곱 오차)
$$\text{MSE} = \frac{1}{N}\sum_{i=1}^{N} (Y_i - \hat{Y}_i)^2$$
- **특징**: 예측 오차의 제곱합에 대한 평균값으로, 오차 분포의 **평균(Mean)**을 타겟팅합니다.
- **단점**: 오차가 커질수록 제곱 가중이 붙어 학습에 극단적인 벌점을 주므로, 이상치가 빈발하고 정제되지 않은 시계열 데이터셋의 경우 모델이 왜곡된 예측 결과로 수렴할 위험이 있습니다.

---

## 5. 연계 문서
- **통계적 시계열 모델 ARIMA**: [05_technology/02_statistical_models.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/02_statistical_models.md)
- **딥러닝 예측 모델 아키텍처**: [05_technology/03_deep_learning_forecasting.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/03_deep_learning_forecasting.md)
