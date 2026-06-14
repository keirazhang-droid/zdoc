---
title: "レプリカのスケーリング | Cloud"
slug: /manage-replica
sidebar_key: manage-replica
sidebar_label: "レプリカのスケーリング"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud はクラスターレベルのレプリケーションをサポートしています。各レプリカはクラスター内のリソースとデータの正確なコピーです。レプリカを使用することで、クエリスループットと可用性を向上させることができます。 | Cloud"
type: origin
token: W8Mhwa4faiQqtRkH4t9cdexCnlf
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - 管理

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# レプリカのスケーリング

Zilliz Cloud はクラスターレベルのレプリケーションをサポートしています。各レプリカは、クラスター内のリソースとデータの完全なコピーです。レプリカを使用することで、クエリスループットと可用性を向上させることができます。

QPS のボトルネックが発生しているユーザーにとって、レプリカを追加することでクエリのワークロードを分散し、全体的なクエリスループットを向上させることができます。パフォーマンスを積極的に最適化するには、[メトリクス](./metrics-alerts-reference) ページで **Query** **CU計算** を監視し、レプリカのスケーリングが必要なタイミングを判断できます。

レプリカを追加してもクラスターの容量は増加しないことに注意してください。容量は各クラスターのクエリ CU の数によってのみ決まります。クラスターの容量を増やしたい場合は、[クラスターのスケーリング](./scale-query-cu) を参照してください。

このガイドでは、Zilliz Cloud で **サービングクラスター** のレプリカを構成する手順について説明します。

このページの内容は、サービングクラスターにのみ適用されます。オンデマンドクラスターは自動的にスケーリングされます。リクエストが到着すると起動し、アイドル状態になるとゼロに戻ります。手動介入は必要ありません。

<Admonition type="info" icon="📘" title="Notes">

この機能は、**Enterprise** プロジェクトの **Dedicated** クラスターでのみ利用可能です。

</Admonition>

## 考慮事項\{#considerations\}

- **リソースの制限**: 以下の条件を満たしていれば、既存の Dedicated クラスターのレプリカを構成できます。

    - クラスターに12以上のクエリ CU があること

    - クラスターのクエリ CU 数 × レプリカ数の積が10,240を超えないこと

- **スケーリング中の請求:** レプリカのスケーリングジョブ中、Zilliz Cloud は以前のレプリカ構成に基づいてクラスターの請求を続行します。新しいレプリカ数が請求に使用されるのは、スケーリングジョブが正常に完了した後のみです。スケーリングジョブがまだ進行中であるか、完了していない場合、請求は以前のレプリカ構成に基づいたままになります。

- **パフォーマンスへの影響**: スケーリングにより、サービスにわずかな揺らぎが発生し、データの読み取りに一時的に影響を与える可能性があります。

## 手動スケーリング\{#manual-scaling\}

既存の Dedicated クラスターのレプリカ数は、コンソール上で手動で、またはプログラムで調整できます。

次のデモは、Zilliz Cloud Web コンソールでレプリカを構成する方法を示しています。

<Supademo id="cmd2rwczv35ktc4kjyxwa5xwr" title=""  />

また、RESTful API を使用してクラスター内のレプリカ数を手動で調整することもできます。詳細については、[クラスターレプリカの変更](/reference/restful/modify-cluster-replica-v2) を参照してください。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "replica": 2
}'
```

## スケジュールされたスケーリング\{#scheduled-scaling}

Zilliz Cloud Web コンソールまたは RESTful API を使用して、事前に定義された時間スケジュールに基づいてレプリカのスケーリングを構成できます。

スケジュール間の間隔は 30 分以上である必要があります。

高度なモードを使用して cron 式を記述する方法の詳細については、[Cron 式](./cron-expression) を参照してください。

次のデモでは、レプリカの自動スケーリングを有効にする方法を示しています。

<Supademo id="cmd2s33ac35zhc4kjj2zemejj" title=""  />

RESTful API を使用してレプリカのスケジュールされたスケーリングを構成することもできます。詳細については、[クラスターの変更](/reference/restful/modify-cluster-v2) を参照してください。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "autoscaling": {
        "replica": {
            "schedules": [
                {
                    "cron": "10 0 0 0 0 ?",
                    "target": 2
                }
            ]
        }
    }
}'
```

## 動的スケーリング\{#dynamic-scaling}

Zilliz Cloud は、手動での介入を不要にしながらパフォーマンスを維持するためのレプリカの動的スケーリングをサポートしています。有効にすると、システムはリアルタイムの **CU計算** メトリクスに基づいて **レプリカ数** を自動的に調整し、サービスの中断なくワークロードを効率的に処理します。

動的スケーリングを設定する際、以下の制約を設定できます:

- **最小レプリカ**: デフォルトでは現在の数値が設定されます。

- **最大レプリカ**: デフォルトでは現在の CU サイズの 1 倍が設定されます。最大レプリカは 10 を超えることはできません。この制限を引き上げる必要がある場合は、[サポートにお問い合わせ](http://support.zilliz.com) ください。

<Admonition type="info" icon="📘" title="Notes">

- 現在の値より低い最大レプリカを選択すると、即時のスケールインがトリガーされます。

- 現在の値より高い最小レプリカを選択すると、即時のスケールアウトがトリガーされます。

</Admonition>

### トリガー条件\{#trigger-conditions}

- スケールアウト: CU計算が 2 分間 60% を超えた場合にトリガーされます。

- スケールイン: CU計算が 10 分間 40% を下回り続けた場合にトリガーされます。

### スケーリングサイズの計算\{#scaling-size-calculation}

以下の式は、Zilliz Cloud が動的スケーリングイベントの目標レプリカ数を計算する方法を説明しています。動的スケーリングの式は、CU計算を目標値の 50% に維持することを目的としています。

```plaintext
Target Replica Count = Current Replica Count × (Current Metric Value / Target Metric Value) 
```

<table>
   <tr>
     <th><p>変数名</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>ターゲットレプリカ数</p></td>
     <td><p>システムがスケーリングを試みる新しいレプリカ数。</p></td>
   </tr>
   <tr>
     <td><p>現在のレプリカ数</p></td>
     <td><p>クラスターの現在のレプリカ数。</p></td>
   </tr>
   <tr>
     <td><p>現在のメトリクス値</p></td>
     <td><p>CU計算メトリクスの現在の測定値。</p></td>
   </tr>
   <tr>
     <td><p>ターゲットメトリクス値</p></td>
     <td><p>スケーリング後の期待されるCU計算値で、50%となる。</p></td>
   </tr>
</table>

たとえば、レプリカの動的スケーリングが有効になっており、以下の条件が満たされている場合：

- **現在のレプリカ数：1**

- **クラスターのCU計算：** 10分間60%を超える

動的スケーリングイベントがトリガーされます。ターゲットクエリCU数は次のように計算されます：

```plaintext
1 × (60 / 50) = 1.2
```

この値は切り上げられて 2 となり、新しい **レプリカ数** は **2** になります。

### 手順\{#procedures}

以下のデモでは、Zilliz Cloud Web コンソールで動的オートスケーリングを設定する方法を示しています。

<Supademo id="cmk2agfmh01n4zk0iy6iu4vix" title=""  />

さらに、RESTful API を使用して動的スケーリングを設定することもできます。詳細については、[クラスターの変更](/reference/restful/modify-cluster-v2) を参照してください。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "autoscaling": {
        "replica": {
            "min": 1,
            "max": 2
        }
    }
}'
```

## スケーリングの進捗を確認する\{#view-scaling-progress}

手動スケーリングのリクエストが送信された、またはスケジュールされたスケーリングまたは動的スケーリングのイベントがトリガーされると、ジョブのレコードが生成されます。進捗は [ジョブ](./job-center) ページで確認できます。

スケーリング ジョブが進行中の場合、クラスターのステータスは "変更中" に変わります。スケーリング ジョブが成功すると、クラスターのステータスは "Running" に変わります。