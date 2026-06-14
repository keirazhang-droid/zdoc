---
title: "Zilliz Cloud を無料で試す | Cloud"
slug: /free-trials
sidebar_key: free-trials
sidebar_label: "Zilliz Cloud を無料で試す"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud は、強力なベクトルデータベース機能を評価またはテストし、Zilliz Cloud の使用コストを見積もるために、フリークラスターと無料トライアルの両方を提供しています。始めるには、Zilliz Cloud にアカウントを登録するだけです。支払い情報は不要です。| Cloud"
type: origin
token: LMfdwRwKIiJtywkwbHVcGnOFnRf
sidebar_position: 13
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 無料トライアル
  - milvus

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Zilliz Cloud を無料で試す

Zilliz Cloud では、**フリークラスター** と **無料トライアル** の両方を提供しており、強力なベクトルデータベース機能を評価・テストし、Zilliz Cloud の使用コストを見積もることができます。開始するには、Zilliz Cloud で[アカウントを登録](./register-with-zilliz-cloud)するだけです。支払い情報は必要ありません。

## フリークラスター\{#free-cluster}

Zilliz Cloud は、基本的なベクトルデータベース機能を無料で使用できる フリークラスター を提供しています。フリークラスター では以下を利用できます。

- 5 GB のストレージ（100万件の768次元ベクトルに十分）

- 月間 250 万 vCU

- 最大 5 つのコレクション

より多くのリソースが必要な場合、または高度な機能にアクセスしたい場合は、Serverless クラスターおよび Dedicated クラスターの[無料トライアル](./free-trials#free-trial) をご利用ください。

## 無料トライアル\{#free-trial}

Zilliz Cloud は、クラスターおよびベクトルデータベース機能の 無料トライアル を提供しています。以下のセクションでは、クレジットベースの 無料トライアル について説明します。ボリューム機能（構造化テーブルまたは非構造化データファイルのコレクションを保持するオブジェクトストア）を試したい場合は、ボリューム Explained を参照してください。

### 無料トライアル を使用する\{#use-free-trial}

職場のメールアドレスで Zilliz Cloud にサインアップすると、組織に **&#36;100** の無料クレジットが請求アカウントに追加されます。これらのクレジットは **30日** 後に期限切れとなり、Serverless および Dedicated クラスターの試用に使用できます。クレジットが使い切られるか期限切れになると、無料トライアル は終了します。

トライアル後、組織は凍結されます。この間、Serverless および Dedicated クラスターは[ごみ箱](./use-recycle-bin)に移動され、これらのクラスター専用の機能（バックアップと復元、アラートなど）にアクセスできなくなります。

組織の凍結を解除するには、[支払い方法を追加](./billing-management)するだけです。これにより、ごみ箱から削除されたデータを復元できます。凍結から30日以内に支払い方法を追加しない場合、Serverless および Dedicated クラスターは完全に削除されますが、組織は保持されます。

### クレジットを獲得し、クレジットの有効期限を延長する\{#earn-credits-and-extend-credit-expiration}

職場のメールアドレスで登録すると、&#36;100 の無料クレジットが受け取れます。Zilliz Cloud で[支払い方法を追加](./billing-management)することで、さらに &#36;100 を獲得できます。さらに、支払い方法を追加すると、クレジットの有効期限が **1年** に延長されます。

追加のクレジットが必要な場合、またはトライアル期間を延長したい場合は、[営業に連絡](https://zilliz.com/contact-sales)してください。

### クレジット残高を表示する\{#view-credit-balance}

クレジット残高を表示するには：

![FWMbwmjNKh6Qt3btRCyc4KKSnZf](https://zdoc-images.s3.us-west-2.amazonaws.com/FWMbwmjNKh6Qt3btRCyc4KKSnZf.png)

<Procedures>

1. Zilliz Cloud で組織に移動します。

1. **請求** に移動します。

1. **クレジット** セクションで残高を確認します。

</Procedures>

## クレジットアラートを監視する\{#monitor-credit-alerts}

<Admonition type="info" icon="📘" title="Notes">

クレジットの意図しない使用を避けるために、使用していないクラスターは手動で停止することをお勧めします。

</Admonition>

### 無料トライアル 通知\{#free-trial-notifications}

無料トライアル 期間中、Zilliz Cloud からそのステータスに関するいくつかのメール通知が届きます。これらのメールは組織オーナーに送信され、以下のイベントによってトリガーされます。

- クレジットが付与されてから最初の3日間、クレジットが消費されない。

- クレジットの60%が消費される。

- クレジットの有効期限が3日未満になる。

- 有効な支払い方法がないままトライアルが期限切れとなり、組織が凍結される。

- トライアル終了に伴い、Serverless および Dedicated クラスターが間もなく削除される。

- トライアル終了後、Serverless および Dedicated クラスターがごみ箱に移動される。

- すべてのクレジットが使い切られる。

## 関連トピック\{#related-topics}

- [Zilliz Cloud に登録する](./register-with-zilliz-cloud)

- [クラスターを作成する](./create-cluster)

