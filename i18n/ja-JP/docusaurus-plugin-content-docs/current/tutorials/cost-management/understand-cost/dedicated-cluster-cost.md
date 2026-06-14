---
title: "専用クラスターのコスト | Cloud"
slug: /dedicated-cluster-cost
sidebar_key: dedicated-cluster-cost
sidebar_label: "専用クラスター"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud の専用クラスターは、従量課金モデルを採用しており、主にクラスターが消費するコンピューティングリソースに対して課金されます。これにより、実際に使用した分だけを支払うことができ、事前にリソースを過剰にプロビジョニングする必要はありません。 | Cloud"
type: origin
token: J2prwh2KLis9oqkqNIAcU1d6nsd
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 専用
  - コスト
  - 請求

---

import Admonition from '@theme/Admonition';


# Dedicated Cluster Cost

Dedicated clusters in Zilliz Cloud follows a pay-as-you-go model, where you are mainly charged for the compute resources consumed by your clusters. This ensures you only pay for what you actually use, without the need to over-provision resources in advance.

The total cost of a Dedicated cluster is the sum of the following components:

- [ベクトルデータベース費用](./dedicated-cluster-cost#vector-database-cost)

- [ストレージ費用](./dedicated-cluster-cost#storage-cost)

In addition to the two primary billing items above, the following optional add-on charges may apply:

- [データ転送費用](./data-transfer-cost)

- [監査ログ費用](./audit-log-cost)

## Vector database cost\{#vector-database-cost}

ベクトルデータベース費用には、Dedicated cluster のコンピューティングリソース使用に対する料金が含まれます。

### Cost calculation\{#cost-calculation}

```plaintext
Vector Database Cost = Query CU Unit Price x Total Number of Query CU x Cluster Runtime
```

- **クエリCU 単価**: クラスタのリージョン、タイプ、およびプロジェクトプランによって決定されます。詳細な料金については、[Zilliz Cloud Pricing](http://zilliz.com/pricing) を参照してください。

- **クエリCU数の合計**: レプリカを考慮したクラスタ内のクエリCUの総数です。

    ```plaintext
    Total Number of Query CU = Number of Query CU × Replica Count
    ```

    例えば、2つのクエリCUと2つのレプリカを持つクラスターは、合計で4 CUになります。

- **クラスター実行時間**: クラスターが請求対象ステータスにある合計時間（時間単位）：

    - 請求対象ステータス: 実行中、変更中、移行中など

    - 非請求対象ステータス: 作成中、一時停止中、再開中、一時停止済みなど。非請求対象ステータス中はCU料金は停止しますが、ストレージ料金は引き続き適用されます。

    <Admonition type="info" icon="📘" title="Note">

    [スケーリング](./scale-cluster)ジョブ中、Zilliz Cloudは以前の構成に基づいてクラスターへの請求を継続します。新しい構成が請求に使用されるのは、スケーリングジョブが正常に完了した後です。これはスケールアップとスケールダウンの両方の操作に適用されます。ジョブが進行中の場合、クラスターは以前の利用可能な構成で引き続きサービスを提供します。

    </Admonition>

### 例\{#example}

クラスター構成が次のようになっていると仮定します。

- **プロジェクトプラン:** Enterprise

- **クラスターデプロイオプション**: Dedicated

- **クラウドプロバイダーとリージョン:** AWS us-east-1 (バージニア)

- **クラスタータイプ:** パフォーマンス最適化済み

- **クエリCU数:** 8 CU

- **レプリカ数:** 2

- **クラスター** **実行時間:** 720時間 (1ヶ月)。

プラン、クラウドプロバイダーとリージョン、クラスタータイプの情報をもとに、[料金ページ](https://zilliz.com/pricing)でCU単価が **&#36;0.248/時間** であることがわかります。

![find-cu-unit-price](https://zdoc-images.s3.us-west-2.amazonaws.com/find-cu-unit-price.png "find-cu-unit-price")

クエリCU数とレプリカ数に従って、クエリCUの総数は `8 CU x 2 レプリカ = 16 CU` です。

この例のDedicatedクラスターのベクトルデータベースの総コストは `$0.248 x 16 x 720 = $2856.96` です。

## ストレージ費用\{#storage-cost}

ストレージ費用はCU費用とは別に請求され、以下に依存します：

- クラスターのクラウドプロバイダーとリージョン、タイプ、プラン

- ストレージ使用量

詳細については、[ストレージ](./storage-cost)を参照してください。

## FAQ\{#faqs}

**Dedicatedクラスターを一時停止した場合、料金は発生しますか？**

Dedicatedクラスターが一時停止されると、ベクトルデータベースのコストは停止しますが、クラスターを削除するまでストレージ料金は継続されます。

**クラスター作成中または一時停止中に請求は発生しますか？**

作成中、一時停止中、再開中、または一時停止済みのステータスでは、ベクトルデータベースのコストは請求されません。ただし、ストレージ費用は引き続き適用されます。

**Dedicatedクラスターをスケーリングする場合、スケーリング中は旧構成と新構成のどちらに基づいて請求されますか？**

[スケーリング](./scale-cluster)中は、以前の構成に基づいて請求されます。新しい構成が請求に使用されるのは、スケーリングジョブが正常に完了した後です。 