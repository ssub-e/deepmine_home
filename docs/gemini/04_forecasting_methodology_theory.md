title: 고전 통계 모델부터 파운데이션 모델까지의 예측 방법론
category: Forecasting Methodology
keywords: [정상성, 차분, ARIMA, SARIMA, 딥러닝 스케일링, 파운데이션 모델, TimeGPT, Moirai, 외생 변수]

시계열 미래 예측 이론 및 방법론 실무

1. 시계열 데이터 기초 및 전처리

정밀한 예측을 위해서는 수집된 시계열 데이터가 통계적 분석을 견디도록 정제하는 작업이 선행되어야 합니다.

1) 정상성 (Stationarity)의 확보

개념: 시간의 추이에 상관없이 평균, 분산 등 통계적 정률 특성이 일정한 상태를 의미합니다. 예측 가능한 장기 패턴(추세, 계절성)이 배제된 상태입니다.

비정상성 데이터의 변환:

로그 변환 (Logarithms): 시간 흐름에 비례하여 변동 폭이 커지는 비정상적 분산(Variance) 안정화

차분 (Differencing): 인접한 시점값의 차를 활용하여 평균(Mean)을 안정화하고 선형 추세 제거


$$y_t' = y_t - y_{t-1}$$

2) 단위근 검정 (Unit Root Tests)

KPSS 검정:

귀무가설 $H_0$: "해당 데이터는 정상(Stationary)이다."

검정값의 $p\text{-value} \le 0.05$일 경우 귀무가설을 기각하여 정상성 결여 판단 $\rightarrow$ 추가 차분 수행 필수.

ndiffs(x): 정상 시계열로 변환하는 데 필요한 최적 1차 차분 횟수 $d$를 자동 계산하는 함수.

nsdiffs(x): 계절성 강도 지표 $F_S$가 기준값인 $0.64$를 초과할 경우 계절성 차분이 필요한지 분석하는 함수.

2. ARIMA (AutoRegressive Integrated Moving Average) 모델

과거 관측값의 자기 상관 관계와 과거 예측 오차를 종합하여 선형 예측을 수행하는 가장 표준적인 선형 통계 예측 기법입니다.

1) 모델 표현식

지연 연산자 $B$ (Backshift Operator, $By_t = y_{t-1}$)를 사용하여 복잡한 차분 및 자기회귀식을 다음과 같이 축약해 표현합니다.

$$(1 - \phi_1 B - \dots - \phi_p B^p)(1 - B)^d y_t = c + (1 + \theta_1 B + \dots + \theta_q B^q)\epsilon_t$$

AR($p$): 자기회귀 부분. 현재 값을 과거 $p$개 시점의 가중 선형 결합으로 설명.

I($d$): 정상화 단계. $d$회 차분을 수행함을 의미.

MA($q$): 이동평균 부분. 과거 예측 오차(Shock) $\epsilon_{t-q}$의 가중 선형 결합을 통해 미래를 보정.

2) 주요 특수 모형 (Special Cases)

White Noise (백색잡음): $\text{ARIMA}(0,0,0)$

Random Walk (임의 보행): $\text{ARIMA}(0,1,0)$

Damped Trend (감쇠 추세): $\text{ARIMA}(1,1,2)$

3) ACF 및 PACF 플롯을 통한 모델 식별

상관관계 그래프를 분석해 최적의 $p, q$ 후보군을 초기 추정할 수 있습니다. (반드시 데이터가 정상성을 갖춘 후 분석 진행)

$\text{AR}(p)$ 후보: ACF가 기하급수적으로 감소(Decay)하며, PACF 그래프에서 시차 $p$ 이후 급격히 차단(Spike cutsoff)되는 형태.

$\text{MA}(q)$ 후보: PACF가 기하급수적으로 감소하며, ACF 그래프에서 시차 $q$ 이후 급격히 차단되는 형태.

4) 파라미터 추정 및 평가지표

MLE (최대 우도 추정): 실제 얻어진 데이터를 수집할 확률이 수학적으로 가장 높은 파라미터 $(\phi, \theta)$ 세트를 도출.

$\text{AICc}$ (Akaike Information Criterion - Correction):


$$\text{AICc} = -2\log(L) + 2(p+q+k+1) + \text{correction}$$

모델의 적합도($\log L$)를 높이는 동시에 파라미터 개수($p, q, k$)에 대한 벌점을 부여해 낮을수록 우수한 모델로 판정.

주의: 차분 차수 $d$는 데이터 범위 자체를 직접 변조하므로 $\text{AICc}$ 계산을 통해 상호 비교하는 것은 원천적으로 불가함.

3. 딥러닝 기반 시계열 모델 설계 전략

1) 필수 데이터 스케일링 (Data Scaling)

신경망은 입력값의 활성화 스케일에 매우 민감하므로 학습 가속을 위해 반드시 표준화가 필요합니다.

Standard Scaler: 평균과 표준편차를 사용하여 왜곡률 조정.

Robust Scaler (강력 권장): 중앙값(Median)과 사분위수범위(IQR)를 기준으로 변환하여 갑작스러운 결품이나 생산 스파이크 같은 이상치(Outlier) 왜곡 영향을 격리함.

2) 예측 목적에 따른 손실함수 (Loss Function)의 지정

MAE (Mean Absolute Error):


$$\text{MAE} = \frac{1}{N}\sum |Y_i - \hat{Y}_i|$$

예측 분포의 중앙값(Median)을 최적화하며 이상치 오차 증폭에 영향을 덜 받으므로 디폴트로 권장됨.

MSE (Mean Squared Error):


$$\text{MSE} = \frac{1}{N}\sum (Y_i - \hat{Y}_i)^2$$

예측 분포의 평균(Mean)을 타겟팅하며 제곱 가중으로 인해 이상치가 극심한 정제되지 않은 데이터셋에는 비권장.

4. 파운데이션 미래 예측 모델 (Foundation Forecasting Models)

학습하지 않은 시계열 데이터를 사전 제로샷(Zero-shot) 추론으로 정밀 예측해내는 전이 학습(Transfer Learning) 패러다임입니다.

┌────────────────────────────────────────────────────────┐
│             Pre-training on massive datasets           │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│         Zero-shot Inference on unseen targets          │
└───────────────┬────────────────────────┬───────────────┘
                ▼                        ▼
     [Deterministic Point]      [Probabilistic PDF]
          - TimesFM                  - Moirai
          - TimeGPT                  - Lag-Llama


1) 주요 파운데이션 모델 스택

TimeGPT (Nixtla):

구조: 인코더-디코더(Encoder-Decoder) 트랜스포머.

학습 스케일: 금융, 에너지, IoT 도메인 전반의 1,000억 개가 넘는 초대규모 시점 이력으로 사전 학습 수행.

특징: 입력 윈도우에 로컬 위치 인코딩(Local positional encoding) 및 지름길 잔차 연결(Residual connections) 결합.

파인튜닝(Fine-tuning): 제로샷 성능(기본 MAE 1.902)에 미세 조정(Fine-tuning) 단계를 추가하면 데이터의 고유 동역학(Dynamics)을 전이 학습하여 오차율이 개선(MAE 1.886)됩니다.

Moirai (Salesforce):

구조: 인코더 전용 트랜스포머 모델.

특징: 혼합 확률 분포(Mixture distribution)를 출력하여 단일 미래 값 대신 전체 분포의 두께와 구간 예측을 수행.

Chronos (Amazon):

특징: 연속적인 시계열 변량을 고정 이산 값(Vocabulary)으로 변환하는 토큰화(Tokenization) 처리를 수행하여 기 구축된 대형 텍스트 생성 모델(T5 계열)을 시계열 예측 목적에 맞춤식 변형(Repurposing)함.

Lag-Llama:

특징: 인코더 없이 지연 피처(Lagged features)만을 입력받아 스튜던트 t-분포(Student's t-distribution) 기반의 조건부 미래 확률 밀도를 연산하는 디코더 전용 확률적 아키텍처.

Tiny Time Mixers (TTM, IBM):

특징: 1M 이하의 극소 파라미터 구조로 경량화하여 모바일 및 CPU 인프라 환경에서도 제로샷 예측이 구동되도록 최적화.

5. 외생 변수(Exogenous Variables) 결합 전략

미래의 변동성은 과거 이력만으로 예측할 수 없는 이벤트(날씨, 프로모션 등)에 크게 좌우됩니다. 딥마인 프레임워크는 외생 Context를 3가지로 정의하여 수용합니다.

정적 변수 (Static Variables): 시간이 지나도 영구적으로 변하지 않는 특성 컨텍스트 (예: 매장 지점 고유 주소, 자재 제조 협력사 등)

과거 시계열 변수 (Historic Variables): 오직 과거 이력 시점만 관측 가능하고 미래 시점에는 정보가 없는 변수 (예: 실제 관측 장비 온도, 전력 과부하 트래픽 로그 등)

미래 유도 시계열 변수 (Future Variables): 미래 시점의 예정 스케줄을 명확하게 파악할 수 있는 핵심 지시 정보 (예: 예정된 마케팅 행사 일정, 법정 공휴일 계획, 미래 일출 시각 등)

📈 외생 변수 적용 효과 사례 (Nord Pool 전력가 예측)

미래 부하 예측량(Load forecast) 및 풍력 발전 생산 예보량(Wind generation)을 미래 변수(Future Variables)로 통합 주입한 결과, 기온 급변 등으로 인해 발생하는 예측 불가 수준의 수요 스파이크(Spike) 현상을 오차 없이 매끄럽게 포착해내는 실시간 SCM 예측 우수성을 실증했습니다.