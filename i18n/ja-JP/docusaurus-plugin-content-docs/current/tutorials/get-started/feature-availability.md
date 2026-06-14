---
title: "機能の利用可能性 | Cloud"
slug: /feature-availability
sidebar_key: feature-availability
sidebar_label: "機能の利用可能性"
beta: FALSE
notebook: FALSE
description: "最終更新日: 2025年10月13日 | Cloud"
type: origin
token: HpbSwzS6kiW9gikHpQ0cUZLWnlc
sidebar_position: 20
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 機能の利用可能性

---

import Admonition from '@theme/Admonition';


# 機能の利用可否

*最終更新日: 2025年10月13日*

機能の**利用可能フェーズ**は、Zilliz Cloud におけるその機能の成熟度、安定性、および推奨される使用方法を示します。以下に、機能のライフサイクル段階の概要と、ユーザーとしての意味について説明します。

![YBh6wiorGhbetoba42DchATjnVm](https://zdoc-images.s3.us-west-2.amazonaws.com/YBh6wiorGhbetoba42DchATjnVm.png)

- **プライベートプレビュー:** 

    - **定義:** プライベートプレビューの機能は、積極的に開発中であり、変更される可能性があります。Zilliz Cloud 内で実装およびテストはされていますが、完全な使いやすさ、安定性、およびコーナーケースの網羅性は完了していない場合があります。

    - **アクセス**: デフォルトでは利用できません。アクセスをリクエストするには、[Zilliz Support](http://support.zilliz.com) にお問い合わせください。

    - **使用方法**: 本番ワークロードを目的としていません。

- **パブリックプレビュー:** 

    - **定義:** パブリックプレビューの機能は、本番環境に近い状態であり、一般提供 (GA) に到達する前に大幅に変更される可能性は低いです。

    - **アクセス**: クラスタの Milvus バージョンをアップグレードした後、一般的にデフォルトで有効になります。クラスタが古いバージョンの Milvus を実行している場合、一部の機能にアクセスできないことがあります。そのような場合は、[サポートにお問い合わせ](http://support.zilliz.com) いただき、クラスタのアップグレードをリクエストしてください。

    - **使用方法:** 本番環境での使用は推奨されません。

- **一般提供 (GA):** 

    - **定義:** GA の機能は、完全にリリースされ、本番環境で使用可能であり、積極的にサポートされています。

    - **アクセス**: ほとんどのユーザーに対してデフォルトで有効になっていますが、価格に関する考慮事項のあるエンタープライズ機能など、一部の機能は [営業部門へのお問い合わせ](https://zilliz.com/contact-sales) によるアクティベーションが必要です。

    - **使用方法**: 本番環境での使用を目的としています。

- **廃止予告:** 

    - **定義:** このフェーズの機能は、まだ機能し、アクセス可能ですが、重大なバグ修正を除き、積極的な開発は行われていません。

    - **アクセス**: まだ利用可能ですが、正式な廃止の発表がメールで行われています。

    - **使用方法**: 将来の日付に機能が削除されるため、[専門家に相談](https://zilliz.com/contact-sales) して新しいソリューションへの移行を開始してください。

- **廃止済み:** 

    - **定義:** 機能は Zilliz Cloud から完全に削除され、アクセスまたはサポートは行われていません。

    - **アクセス**: 利用不可。

## 機能の利用可能フェーズを確認する方法\{#how-to-identify-a-features-availability-phase}

各機能の利用可能フェーズは、Zilliz Cloud ドキュメント内で対応するラベルで示されています。特に記載がない場合、機能は一般提供と見なされます。

## 現在の機能の利用可否\{#current-feature-availability}

### プライベートプレビュー\{#private-preview}

- [バックアップファイルのエクスポート](./export-backup-files)

- [ホストモデル](./hosted-models)

<Admonition type="info" icon="📘" title="Notes">

これらの機能へのアクセスをリクエストするには、[Zilliz Support](http://support.zilliz.com) にお問い合わせください。

</Admonition>

### パブリックプレビュー\{#public-preview}

- [Embedding](./model-based-functions) および [Rerank](./reranking) Functions

<Admonition type="info" icon="📘" title="Notes">

これらの機能にアクセスするには、クラスタの Milvus バージョンをアップグレードしてください。

</Admonition>

- [アクセスログ](./access-logs)

- [オンデマンドコンピュート](./on-demand-compute)

<Admonition type="info" icon="📘" title="Notes">

ご利用のリージョンがこの機能をサポートしている場合は、[お問い合わせ](http://support.zilliz.com) いただき、さらに多くのリージョンをリクエストしてください

</Admonition>

### 廃止予告\{#deprecation-notice}

- [NumPy ファイルからのデータインポート](./data-import-numpy)

- [RESTful API (V1)](/reference/restful/v1)

- [データのマージ](./merge-data)

### 廃止済み\{#deprecated}

- Pipelines

