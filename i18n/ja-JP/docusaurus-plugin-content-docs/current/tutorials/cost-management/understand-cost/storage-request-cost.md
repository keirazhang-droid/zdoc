---
title: "ストレージリクエストコスト | Cloud"
slug: /storage-request-cost
sidebar_key: storage-request-cost
sidebar_label: "ストレージリクエスト"
beta: FALSE
notebook: FALSE
description: "ストレージリクエストコストは、オンデマンド検索、インデックス構築タスク、およびボリュームファイルの読み取りまたは書き込みによって生成される操作をカバーする一種のストレージコストです。 | Cloud"
type: origin
token: YMYFwJhUuibUTxkJ1lTcNVSxnhg
sidebar_position: 5
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コスト
  - 課金

---

import Admonition from '@theme/Admonition';


# ストレージリクエストコスト

ストレージリクエストコストは、オンデマンド検索、インデックスの構築タスク、およびボリュームファイルの読み取りや書き込みによって生成される操作をカバーするストレージコストの一種です。

## ストレージリクエストコストの発生源\{#sources-of-storage-request-cost}

リクエストは2つのクラスに分類されます。

- **クラス1**: `PUT`, `COPY`, `POST`, `LIST`

- **クラス2**: `GET`, `SELECT`

以下の操作は、Zilliz Cloud でストレージリクエストコストを発生させます。

- オンデマンドシナリオで使用されるデータベース内のマネージドコレクションでインデックスの構築を行う場合。これにより、クラス1およびクラス2の両方のリクエストコストが発生します。

- オンデマンドシナリオで使用されるデータベース内のマネージドコレクションで、インデックスのみがロードされている状態で検索を実行する場合。これにより、クラス2のリクエストコストが発生します。

- 階層型ストレージのサービングクラスターで、コールドデータがオブジェクトストレージから読み取られる際に検索を実行する場合。これにより、クラス2のリクエストコストが発生します。

- 読み取りおよび書き込みを含むボリュームファイル操作。これにより、クラス1およびクラス2の両方のリクエストコストが発生します。

以下の操作は、ストレージリクエストコストを発生させません。

- 外部コレクションに対するすべての操作。

- オブジェクトストレージからオンデマンドシナリオで使用されるデータベースへのデータインポート。

- パフォーマンス最適化または容量最適化のサービングクラスターでのインデックスの構築/検索。

### コスト計算\{#cost-calculation}

```plaintext
Storage Requests Cost = (Class 1 Request Count x Class 1 Unit Price)
                      + (Class 2 Request Count x Class 2 Unit Price)
```

- **Class 1 Request Count**: Class 1 のリクエスト数。

- **Class 2 Request Count**: Class 2 のリクエスト数。

- **単価**: クラウドリージョンとリクエストクラスによって決定されます。詳細については、[Zilliz Cloud Pricing](https://zilliz.com/pricing/pricing-guide) を参照してください。

## Example\{#example}

ある請求期間の使用量が以下の場合を想定します。

- **Region**: AWS us-east-1

- **Class 1 Request Count**: 200,000

- **Class 2 Request Count**: 1,200,000

単価は以下の通りです。

- **Class 1 単価** = &#36;5.00 / 1M リクエスト

- **Class 2 単価** = &#36;0.4 / 1M リクエスト

この場合、ストレージリクエストの総コストは `(0.2 x 5.00) + (1.2 x 0.40) = $1.48` となります。