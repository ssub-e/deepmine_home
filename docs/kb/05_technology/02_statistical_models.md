---
title: "통계 기반 예측 모델 (ARIMA/SARIMA)"
title_en: "Statistical Forecasting Models"
category: "Technology"
keywords: [ARIMA, SARIMA, ACF, PACF, AICc, MLE, 자기회귀, 이동평균]
last_updated: "2026-06-08"
source_refs:
  - "gemini/04_forecasting_methodology_theory.md"
  - "gpt/07_arima.md"
---

# 통계 기반 예측 모델 (ARIMA/SARIMA)

통계 기반 시계열 모델은 데이터의 내재적 선형 상관 구조(Linear Autocorrelation)를 수학적으로 정립하여 미래 예측을 수행하는 고전적이고 강력한 방법론입니다. 딥마인 프레임워크는 딥러닝 모델의 복잡한 추론 과정 이전의 기준 모델(Baseline Model) 및 정상 계절성을 갖춘 안정적인 시계열에 대한 최종 엔진으로 **ARIMA** 및 **SARIMA** 모델을 긴밀하게 통합하여 사용하고 있습니다.

---

## 1. ARIMA (AutoRegressive Integrated Moving Average) 모델 개요

ARIMA 모델은 과거 관측값의 자기 상관 관계(AutoRegressive)와 과거 예측 오차(Moving Average)를 종합하고, 비정상 데이터를 정상화하기 위한 차분(Integrated) 단계를 결합한 선형 통계 모델입니다.

### 1-1. 모델 파라미터 정의
ARIMA 모델은 일반적으로 세 가지 하이퍼파라미터 $(p, d, q)$로 표현됩니다.
- **$p$ (AutoRegressive 차수)**: 자기회귀 부분의 차수로, 현재 시점의 값이 과거 몇 개 시점의 관측치에 선형적으로 의존하는지를 나타냅니다.
- **$d$ (Integration 차수)**: 정상 시계열 변환을 위해 수행된 일반 차분의 횟수입니다.
- **$q$ (Moving Average 차수)**: 이동평균 부분의 차수로, 현재 시점의 값이 과거 몇 개 시점의 예측 오차(Shock)의 가중 선형 결합으로 설명되는지를 나타냅니다.

### 1-2. 수학적 모델 표현식
지연 연산자 $B$ (Backshift Operator, $B y_t = y_{t-1}$)를 사용하여 수식을 축약하면 다음과 같이 표현할 수 있습니다.
$$(1 - \phi_1 B - \dots - \phi_p B^p)(1 - B)^d y_t = c + (1 + \theta_1 B + \dots + \theta_q B^q)\epsilon_t$$
여기서 $\epsilon_t$는 서로 독립이고 평균이 $0$이며 분산이 일정하여 예측이 불가능한 백색잡음(White Noise)이며, $\phi$는 AR 계수, $\theta$는 MA 계수를 의미합니다.

### 1-3. 주요 특수 모형 (Special Cases)
- **White Noise (백색잡음)**: $ARIMA(0, 0, 0)$  
  아무런 자기상관 구조도 존재하지 않는 임의의 노이즈 데이터 상태입니다.
- **Random Walk (임의 보행)**: $ARIMA(0, 1, 0)$  
  현재 시점의 값은 직전 시점의 값에 임의의 오차가 더해진 것으로, 주식 시세 등 예측이 극히 어려운 데이터의 기본 패턴입니다.
- **Damped Trend (감쇠 추세)**: $ARIMA(1, 1, 2)$  
  추세가 지속해서 상승/하락하되 특정 임계점 이후에는 감쇠(Damping)하는 형태를 모델링할 때 효과적입니다.

---

## 2. ACF 및 PACF 플롯을 통한 모델 식별

시계열의 선형 상관 계수를 도식화한 두 가지 그래프를 분석하여 최적의 $(p, d, q)$ 차수 후보군을 결정할 수 있습니다. (반드시 데이터가 정상성을 갖춘 후 분석을 진행해야 합니다.)

- **ACF (Autocorrelation Function, 자기상관함수)**: 시차 $k$에 따른 관측값들 간의 선형 상관관계를 나타내는 함수입니다.
- **PACF (Partial Autocorrelation Function, 부분자기상관함수)**: 두 시점 사이의 중간 시점들의 영향력을 배제하고, 순수하게 시차 $k$만큼 떨어진 두 관측값 사이의 직접적인 상관관계를 구하는 함수입니다.

### 2-1. 모델 차수 식별 규칙

| 모델 형태 | ACF (자기상관함수) | PACF (부분자기상관함수) |
|-----------|--------------------|------------------------|
| **$\text{AR}(p)$ 모형** | 기하급수적으로 감소(Decay)하거나 소멸하는 지수 함수 형태 | 시차 $p$ 이후 급격히 차단되며 $0$으로 수렴 ($\text{Spike cutoff}$) |
| **$\text{MA}(q)$ 모형** | 시차 $q$ 이후 급격히 차단되며 $0$으로 수렴 | 기하급수적으로 감소하거나 지수 함수 형태로 소멸 |
| **$\text{ARMA}(p,q)$ 혼합** | 시차 $q$ 이후 소멸 (기하급수적 감소) | 시차 $p$ 이후 소멸 (기하급수적 감소) |

---

## 3. SARIMA (Seasonal ARIMA) 모델로의 확장

현업 비즈니스 데이터는 기온, 명절, 요일 등 주기적인 계절성(Seasonality) 요인을 강하게 내포하고 있습니다. 이를 해결하기 위해 일반 ARIMA 모델에 계절성 요인을 추가한 **SARIMA** 모델을 적용합니다.

$$\text{SARIMA}(p,d,q)(P,D,Q)_m$$
- **$(P, D, Q)_m$**: 계절성 자기회귀 차수($P$), 계절성 차분 차수($D$), 계절성 이동평균 차수($Q$)를 의미하며, $m$은 계절 주기(예: 월간 데이터의 경우 $12$, 주간 데이터의 경우 $7$ 등)를 의미합니다.
- **예시**: $\text{SARIMA}(1,1,1)(1,1,1)_{12}$는 월간 주기($m=12$)의 계절성 요인과 1년 전 시점과의 연간 차분($D=1$) 및 일반 차분($d=1$)을 결합하여 분석합니다.

---

## 4. 파라미터 추정 및 평가지표 (AICc)

### 4-1. MLE (최대 우도 추정, Maximum Likelihood Estimation)
실제 수집된 시계열 데이터셋이 발생할 확률(Likelihood)을 수학적으로 극대화하는 최적의 계수 파라미터 $(\phi, \theta)$ 세트를 컴퓨터 수치해석적 최적화로 찾아내는 표준 기법입니다.

### 4-2. AICc (Akaike Information Criterion - Correction)
통계학에서 적합한 후보 모델들 중 최적의 모형을 선택하기 위한 기준 지표입니다.
$$\text{AICc} = -2\log(L) + 2(p+q+k+1) + \frac{2(p+q+k+1)(p+q+k+2)}{N - p - q - k - 2}$$
- **$L$**: 우도 함수(Likelihood) 최댓값.  
- **$p, q, k$**: 모델의 모수(Parameter) 개수.  
- **특징**: 모델의 적합성($\log L$)이 높을수록 감점되어 지표가 작아지지만, 불필요하게 파라미터 수가 늘어나면(과적합) 벌점 페널티가 가산되어 수치가 커집니다. 즉, **AICc 수치가 낮을수록 우수한 모델로 판정**합니다.

> [!WARNING]
> **차분 차수 $d$ 비교 시 주의사항**:  
> 일반 차분 차수 $d$가 다르면 데이터 자체의 스케일과 변동 정의가 완전히 변환되므로, $d$가 서로 다른 모델 간에 AICc 값을 직접 비교하여 성능의 우위를 판정하는 것은 수학적으로 불가능합니다. 차분 차수 $d$는 반드시 KPSS 검정이나 단위근 검정을 통해 사전에 먼저 고정한 뒤, 동일한 $d$ 상태에서 $p, q$ 조합에 따른 AICc를 비교해 모델을 선택해야 합니다.

---

## 5. 연계 문서
- **시계열 기초 및 차분 전처리**: [05_technology/01_timeseries_fundamentals.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/01_timeseries_fundamentals.md)
- **시계열 딥러닝 아키텍처**: [05_technology/03_deep_learning_forecasting.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/03_deep_learning_forecasting.md)
