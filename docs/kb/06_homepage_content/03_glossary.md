---
title: "용어집"
title_en: "Glossary"
category: "Homepage Content"
keywords: [용어, 정의, 시계열, ARIMA, 딥러닝, 파운데이션모델, 수요예측]
last_updated: "2026-06-08"
source_refs:
  - "gemini/04_forecasting_methodology_theory.md"
  - "D:\\for_antigravity\\deepmine_home\\src\\App.jsx (SOLUTIONS 데이터)"
---

# 용어집 (Glossary)

본 용어집은 (주)딥마인의 미래 예측 솔루션 설명, 기술적 방법론, 그리고 비즈니스 활용사례 전반에서 사용되는 핵심 통계 기법, 딥러닝 알고리즘 및 비즈니스 SCM 전문 용어의 정의와 의미를 담고 있습니다.

---

## 1. 통계 및 데이터 기초 용어

### 시계열 데이터 (Time Series Data)
시간의 흐름에 따라 순차적으로 기록된 데이터의 모음입니다. 일반적인 정형 데이터와 달리 데이터 포인트 간의 순서(Order)와 시간적 간격(Interval)이 분석의 핵심 요소입니다.

### 정상성 (Stationarity)
시간의 추이와 상관없이 시계열 데이터의 통계적 정률(평균, 분산, 공분산 등)이 일정한 상태를 나타냅니다. 고전 선형 시계열 모델(ARIMA 등)을 적용하기 위한 전제 조건입니다.

### 차분 (Differencing)
현재 시점의 값에서 이전 시점의 값을 빼주어 데이터의 평균 변화(추세)를 정제하고 정상 시계열로 변환하는 전처리 기법입니다.

### 백색잡음 (White Noise)
시계열 모델로 더 이상 예측할 수 없는 임의의 불규칙한 오차 성분입니다. 평균이 $0$이고 분산이 일정하며, 시점 간 상관관계가 전혀 없는 상태를 의미합니다.

### 단위근 검정 (Unit Root Test)
시계열 데이터가 추세를 가지며 비정상성을 띠는지 수학적으로 확인하기 위한 가설 검정 방법론입니다. (예: KPSS 검정)

---

## 2. 예측 모델 및 알고리즘 용어

### ARIMA (AutoRegressive Integrated Moving Average)
과거 관측값의 선형 결합(자기회귀, AR)과 과거 예측 오차의 결합(이동평균, MA), 그리고 정상화를 위한 차분(Integrated, I) 단계를 융합한 가장 표준적인 클래식 시계열 예측 모델입니다.

### SARIMA (Seasonal ARIMA)
일반 ARIMA 모델에 주별, 월별, 연별로 반복되는 주기적인 계절성(Seasonal) 요인을 결합하여 모델링할 수 있도록 확장한 통계 모델입니다.

### 딥러닝 (Deep Learning)
다층의 인공신경망(Artificial Neural Network) 구조를 활용하여 데이터에 내재된 복잡한 비선형 특징(Feature)과 시공간적 패턴을 자율적으로 학습하는 기계학습의 한 분류입니다.

### LSTM (Long Short-Term Memory)
전통적인 순환 신경망(RNN)의 치명적인 문제점인 장기 기억 소실(Gradient Vanishing) 문제를 해결하기 위해 Cell State와 Gate 구조(Input, Forget, Output Gate)를 도입한 시계열 특화 딥러닝 아키텍처입니다.

### DeepAR
아마존에서 개발한 자가회귀 순환 신경망 모델로, 단일 미래 예측 수치만을 제공하는 대신 예측의 확률 분포 밀도 함수를 모델링하여 상위/하위 신뢰 구간의 리스크 시나리오를 산출해 줍니다.

### TFT (Temporal Fusion Transformer)
구글에서 개발한 최첨단 시계열 전용 트랜스포머 아키텍처로, 복잡한 외생 변수들과 정적 메타데이터를 유기적으로 융합하며 다중 미래 수평선을 장기적으로 예측하는 데 탁월합니다. 게이트 네트워크를 통해 어떤 변수가 예측에 가장 기여했는지 설명할 수 있는 특징(Explainable AI)이 있습니다.

### 파운데이션 모델 (Foundation Model)
특정 태스크에 종속되지 않고, 수천억 개 규모의 초대형 시계열 데이터를 바탕으로 사전에 일반적인 시간 역학 관계를 미리 다량 학습해 둔 대형 사전학습(Pre-trained) 모델입니다. (예: TimeGPT, Moirai, Chronos)

### 제로샷 추론 (Zero-shot Inference)
파운데이션 모델이 학습 시점에 한 번도 접하지 못한 새로운 도메인의 시계열 타겟 데이터를 마주하더라도, 추가적인 미세조정(Fine-tuning)이나 가중치 업데이트 없이 즉각적으로 정확한 예측 결과를 산출해 내는 능력입니다.

### HPO (Hyperparameter Optimization)
예측 모델의 구조와 학습 알고리즘을 제어하는 하이퍼파라미터(예: 학습률, 레이어 수, 윈도우 크기 등)의 최적 조합을 자동화된 수치 탐색 기법(예: Bayesian Optimization, Optuna)을 통해 자동으로 도출하는 기술입니다.

---

## 3. 비즈니스 및 SCM 용어

### SCM (Supply Chain Management, 공급망 관리)
원부자재의 조달부터 완제품의 제조, 물류, 유통 및 최종 소비자에게 전달되기까지의 전체 제품 공급 사슬을 효율적으로 통합 관리하고 운영 프로세스를 최적화하는 경영 기법입니다.

### SKU (Stock Keeping Unit, 최소 재고 관리 단위)
개별 상품이나 자재를 식별하기 위한 고유한 최소 분류 단위입니다. 디자인, 사이즈, 색상 등의 세부 옵션에 따라 개별적으로 부여됩니다.

### 리드타임 (Lead Time)
상품이나 자재를 발주(주문)한 시점부터 실제로 물류센터에 입고되어 판매나 생산이 가능해질 때까지 소요되는 총 대기 시간입니다.

### 결품 (Stockout)
고객의 구매 수요나 공정의 생산 수요가 발생했으나, 창고 내에 가용한 재고가 존재하지 않아 판매 기회나 생산 일정 손실이 발생하는 상태입니다.

### NPI (New Product Introduction, 신제품 출시)
신규 제품을 시장에 처음 론칭하는 단계로, 참조할 만한 과거 판매 및 수리 소요 데이터가 없어 전통적인 수요 예측 기법 적용이 가장 곤란한 구간입니다.

---

## 4. 용어 매핑 요약표

| 약어/용어 | 원어 풀네임 | 핵심 설명 분류 | 연계 상세 문서 |
|-----------|-------------|----------------|----------------|
| **ARIMA** | AutoRegressive Integrated Moving Average | 통계 예측 모델 | [05_technology/02_statistical_models.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/02_statistical_models.md) |
| **TFT** | Temporal Fusion Transformer | 딥러닝 아키텍처 | [05_technology/03_deep_learning_forecasting.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/05_technology/03_deep_learning_forecasting.md) |
| **SCM** | Supply Chain Management | 비즈니스/운영 | [03_use_cases/01_industry_use_cases.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/03_use_cases/01_industry_use_cases.md) |
| **NPI** | New Product Introduction | 비즈니스/SCM | [04_customer_cases/01_samsung_case_study.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/04_customer_cases/01_samsung_case_study.md) |
| **HPO** | Hyperparameter Optimization | 모델 학습 기법 | [02_solution/02_tech_stack_and_architecture.md](file:///d:/for_antigravity/DeepDemand-project-root/Deepmine/kb/02_solution/02_tech_stack_and_architecture.md) |
