---
title: "スケール Query CU | Cloud"
slug: /scale-query-cu
sidebar_key: scale-query-cu
sidebar_label: "スケール Query CU"
beta: FALSE
notebook: FALSE
description: "ワークロードが増加し、より多くのデータが書き込まれるにつれて、サービングクラスターは容量制限に達する可能性があります。そのような場合、読み取り操作は引き続き機能しますが、新しい書き込み操作は失敗する可能性があります。 | Cloud"
type: origin
token: ExUFwDY1siCa2Bkp4incCvxFnlh
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - スケール
  - 管理
  - query cu

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# クエリCUのスケーリング

ワークロードが増加し、より多くのデータが書き込まれると、サービングクラスタが容量制限に達する可能性があります。このような場合、読み取り操作は引き続き機能しますが、新しい書き込み操作は失敗する可能性があります。

これを事前に管理するには、[メトリクス](./metrics-alerts-reference)ページで**クエリ** **CU容量**を監視して、クエリCUのスケーリングが必要なタイミングを判断できます。ビジネスニーズとパターンに基づいて、クエリCU数を増やしてクラスタ容量を拡大したり、需要が減少したときに減らしてコストを節約したりできます。

1～12 CUのサービングクラスタの場合は、クエリCUを直接スケーリングできることに注意してください。12 CUを超えるサービングクラスタの場合は、[レプリカ](./manage-replica)を増やしてください。

このガイドでは、変化するワークロードに合わせてサービングクラスタのサイズを変更する方法について説明します。

このページの内容は、サービングクラスタにのみ適用されます。オンデマンドクラスタは自動的にスケーリングされます。リクエストが到着すると起動し、アイドル時にはゼロにスケールバックするため、手動操作は不要です。

<Admonition type="info" icon="📘" title="Notes">

この機能は **Dedicated** クラスタでのみ利用可能です。

</Admonition>

## 考慮事項\{#considerations}

- **リソースの制限**: 

    - **スケールアップ**

        - Dedicated (Standard) クラスタ: 最大32 CU

            Dedicated (Enterprise) クラスタ: 最大1,024 CU

        - **クエリCU数** × **レプリカ数** の積は10,240を超えてはなりません

        より大きなクエリCUについては、[セールスに問い合わせ](http://zilliz.com/contact-sales)てください。

    - **スケールダウン**

        - レプリカを持つクラスタは12 CU未満にスケールダウンできません

        - スケールダウンリクエストは以下の場合にのみ成功します:

            - 現在のデータ量 < 新しいCUサイズのCU容量の80%

            - 現在のコレクション数とパーティション数 < 新しいCUサイズで許可される[コレクションとパーティションの最大数](./limits#collections)

- **スケーリング中**: クラスタのステータスは「変更中」に変わり、その間は操作を実行できません。複数のスケーリングタスクがトリガーされた場合、トリガータイムスタンプに基づいて順次処理されます。完了時間はデータ量に依存します。

- **スケーリング中の請求**: クエリCUのスケーリングジョブ中、Zilliz Cloud は以前のクエリCU設定に基づいてクラスタの請求を継続します。新しいクエリCU数は、スケーリングジョブが正常に完了した後にのみ請求に使用されます。スケーリングジョブが進行中または未完了の場合、請求は以前のクエリCU設定に基づいたままです。

- **パフォーマンスへの影響**: スケーリングにより、サービスにわずかなジッターが発生する可能性があります。

- **バックアップの制限**: 動的およびスケジュールされたスケーリング設定は、[バックアップ](./create-backup)には含まれません。クラスタを復元した後、これらの設定を手動で再構成してください。

## 手動スケーリング\{#manual-scaling}

Zilliz Cloud コンソールまたは RESTful API を使用して、クラスタを手動でスケールアップまたはスケールダウンできます。

次のデモでは、Zilliz Cloud Webコンソールでクラスタを手動でスケールアップおよびスケールダウンする方法を示します。

<Supademo id="cmd2r0jc634jlc4kju69onxyh?utm_source=link" title=""  />

さらに、RESTful API を使用してクエリCUを手動でスケーリングすることもできます。

次の例では、既存のクラスタを2 CUにスケーリングします。詳細については、[クラスタの変更](/reference/restful/modify-cluster-v2) を参照してください。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "cuSize": 2
}'
```

## Scheduled scaling\{#scheduled-scaling}

<Admonition type="info" icon="📘" title="Notes">

この機能は、**Enterprise** プロジェクトの **Dedicated** クラスターでのみ利用可能です。

</Admonition>

スケジュール間の間隔は30分以上である必要があります。

高度なモードを使用して cron 式を記述する方法の詳細については、[Cron Expression](./cron-expression) を参照してください。

<Supademo id="cmj8904vh05581w0jubkrtlqk" title=""  />

さらに、以下の方法で スケジュールされたスケーリング を有効にすることもできます。詳細については、[クラスターの変更](/reference/restful/modify-cluster-v2) を参照してください。

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
        "cu": {
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

<Admonition type="info" icon="📘" title="Notes">

この機能は、**Enterprise** プロジェクトの **Dedicated** クラスターでのみ使用可能です。

</Admonition>

Zilliz Cloud は動的スケーリングをサポートしており、手動による介入を排除しながらパフォーマンスを維持するのに役立ちます。有効にすると、システムはリアルタイムの **CU容量** メトリックに基づいて **クエリCU** リソースを自動的に調整し、サービスを中断することなくワークロードが効率的に処理されることを保証します。

動的スケーリングを設定する際には、以下の範囲を設定できます。

- **最小クエリCU**: デフォルトは現在のサイズです。

- **最大クエリCU**: デフォルトは現在の CU サイズの4倍です。

<Admonition type="info" icon="📘" title="Notes">

- 最大クエリCUに現在の値より低い値を選択すると、即座にスケールダウンがトリガーされます。

- 最小クエリCUに現在の値より高い値を選択すると、即座にスケールアップがトリガーされます。

</Admonition>

### トリガー条件\{#trigger-conditions}

- スケールアップ: CU容量が10分間80%を超えた場合にトリガーされます。または、CU容量が100%に達した場合、即座にスケールアップがトリガーされます。

- スケールダウン: CU容量が30分間60%を下回った場合にトリガーされます。

- スケールアップイベントの間は10分のクールダウン期間が適用され、スケールダウンイベントの間は30分のクールダウン期間が適用されます。スケールダウンは、目標のメトリック値に達するまで、サイズ単位で実行されます。

### スケーリングサイズの計算\{#scaling-size-calculation}

以下の式は、Zilliz Cloud が動的スケーリングイベントのターゲットクエリCU数をどのように計算するかを説明しています。動的スケーリングの式は、CU容量を目標値70%に維持することを目的としています。

```plaintext
Target Query CU Number = Current Query CU Number × (Current Metric Value / Target Metric Value) 
```

<table>
   <tr>
     <th><p>変数名</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>ターゲットクエリCU数</p></td>
     <td><p>システムがクラスターをスケーリングしようとする新しいサイズ。</p></td>
   </tr>
   <tr>
     <td><p>現在のクエリCU数</p></td>
     <td><p>クラスターの現在のクエリCU数。</p></td>
   </tr>
   <tr>
     <td><p>現在のメトリクス値</p></td>
     <td><p>CU容量メトリクスの現在の測定値。</p></td>
   </tr>
   <tr>
     <td><p>ターゲットメトリクス値</p></td>
     <td><p>スケーリング後の期待されるCU容量値で、これは70である。</p></td>
   </tr>
</table>

たとえば、クエリCUの動的スケーリングが有効になっており、以下の条件が満たされている場合：

- **現在のクエリCU数：** 60 CU

- **クラスターのCU容量：** 10分間80%を超える

動的スケーリングイベントがトリガーされます。このとき、ターゲットクエリCU数は次のように計算されます：

```plaintext
60 × (80 / 70) ≈ 68.57 CU
```

この値は次に利用可能な CU 数に切り上げられ、新しいサイズは **72 CU** となります。

### 手順\{#procedures}

以下のデモでは、Zilliz Cloud Web コンソールで動的オートスケーリングを設定する方法を示しています。

<Supademo id="cmd2r7eqb34nbc4kj3wly357s?utm_source=link" title=""  />

また、RESTful API を使用して動的スケーリングを設定することもできます。詳細については、[クラスターの変更](/reference/restful/modify-cluster-v2) を参照してください。

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
        "cu": {
            "min": 1,
            "max": 2
        }
    }
}'
```

## スケーリングの進行状況の表示\{#view-scaling-progress}

手動スケーリングリクエストが送信されるか、スケジュールされたまたは動的スケーリングイベントがトリガーされると、ジョブレコードが生成されます。[ジョブ](./job-center) ページで進行状況を確認できます。

スケーリングジョブが進行中の場合、クラスターのステータスは"変更中"に変わります。スケーリングジョブが成功すると、クラスターのステータスは"Running"に変わります。

## FAQ\{#faq}

**クラスターのスケールダウン時の制限は何ですか？**

レプリカを持つクラスターは、8 CU未満にスケールダウンできません。

スケールダウンリクエストが成功するのは、以下の両方の条件が満たされた場合のみです。

- 現在のデータ量が新しいCUサイズの容量の80%未満であること。

- コレクションとパーティションの数が新しいCUサイズで許可される制限内であること。

**専用クラスターをスケーリングする場合、スケーリング中は古い構成と新しい構成のどちらに基づいて課金されますか？**

[スケーリング](./scale-cluster)中は、以前の構成に基づいて課金されます。新しい構成は、スケーリングジョブが正常に完了した後にのみ課金に使用されます。 

