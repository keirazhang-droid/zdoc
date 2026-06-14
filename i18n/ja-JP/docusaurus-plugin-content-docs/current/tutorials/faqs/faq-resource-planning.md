---
title: "FAQ: リソース計画 | CLOUD"
slug: /faq-resource-planning
sidebar_label: "FAQ: リソース計画"
beta: FALSE
notebook: FALSE
description: "このトピックでは、Zilliz Cloud でリソースを計画する際に発生する可能性のある問題とその解決策を紹介します。 | CLOUD"
type: origin
token: EV41wG08BiOWW8kbo9xcTGoPnKd
sidebar_position: 6

---

# FAQ: リソース計画

このトピックでは、Zilliz Cloud でリソースを計画する際に発生する可能性のある問題と、その解決策を紹介します。

## 目次

- [コンピュートユニット (CU) とは何ですか？](#what-is-a-compute-unit-cu)
- [vCU とは何ですか？ どのように計算されますか？](#what-is-a-vcu-how-does-it-get-calculated)
- [未使用のクラスターにかかる費用を抑えるにはどうすればよいですか？](#how-can-i-avoid-expenses-on-unused-clusters)
- [Zilliz Cloud の使用コストを見積もるにはどうすればよいですか？](#how-can-i-estimate-the-cost-of-using-zilliz-cloud)
- [Zilliz Cloud は Azure へのデプロイをサポートしていますか？](#does-zilliz-cloud-support-deployment-on-azure)
- [新しいクラウドリージョンをリクエストするにはどうすればよいですか？](#how-can-i-request-a-new-cloud-region)
- [自分がどのプランに加入しているか確認するにはどうすればよいですか？](#how-can-i-know-which-plan-i-am-on)
- [特定のコレクションに必要なクエリ CU の数は？](#how-many-query-cus-do-i-need-for-a-given-collection)
- [どのタイプのクラスターを選択すべきですか？](#which-type-of-cluster-should-i-pick)

## FAQ

### コンピュートユニット (CU) とは何ですか？\{#what-is-a-compute-unit-cu}

コンピュートユニット (CU) は、インデックスと検索リクエストを処理するためのハードウェアリソースのグループです。CU は、検索サービスをデプロイするための完全管理型の物理ノードと考えることができます。

詳細については、[適切な CU の選択](./cu-types-explained) を参照してください。

### vCU とは何ですか？ どのように計算されますか？\{#what-is-a-vcu-how-does-it-get-calculated}

vCU は、読み取り操作（検索やクエリなど）および書き込み操作（挿入、アップサート、一括挿入、削除など）によって消費されるリソースを測定するために使用される仮想コンピュートユニットです。書き込みまたは読み取りされるデータ量は、GB から vCU に変換されます。詳細については、[Serverless Cluster Cost](./serverless-cluster-cost) を参照してください。

### 未使用のクラスターにかかる費用を抑えるにはどうすればよいですか？\{#how-can-i-avoid-expenses-on-unused-clusters}

未使用のクラスターを一時停止して、コンピューティングコストを節約することをお勧めします。必要に応じて後で再開できます。

### Zilliz Cloud の使用コストを見積もるにはどうすればよいですか？\{#how-can-i-estimate-the-cost-of-using-zilliz-cloud}

[計算ツール](https://zilliz.com/pricing) を使用してコストを見積もるか、[コストの理解](./understand-cost) を参照して詳細を確認してください。

### Zilliz Cloud は Azure へのデプロイをサポートしていますか？\{#does-zilliz-cloud-support-deployment-on-azure}

はい。Zilliz Cloud は現在 Azure へのデプロイをサポートしています。[クラウドプロバイダーとリージョン](./cloud-providers-and-regions) を参照してください。

### 新しいクラウドリージョンをリクエストするにはどうすればよいですか？\{#how-can-i-request-a-new-cloud-region}

Zilliz Cloud の新しいクラウドサービスプロバイダーリージョンをリクエストするには、[フォームに記入](https://zilliz.com/cloud-region-request) してください。

### 自分がどのプランに加入しているか確認するにはどうすればよいですか？\{#how-can-i-know-which-plan-i-am-on}

プランを確認するには、プロジェクト一覧に移動します。各プロジェクトのプランが表示されます。

![XMRtb3eYsoWUnsxQM0ecyjj2nqf](https://zdoc-images.s3.us-west-2.amazonaws.com/xmrtb3eysowunsxqm0ecyjj2nqf.png "XMRtb3eYsoWUnsxQM0ecyjj2nqf")

### 特定のコレクションに必要なクエリ CU の数は？\{#how-many-query-cus-do-i-need-for-a-given-collection}

- パフォーマンス最適化済み: 最大 200 万件の 768 次元ベクトルをサポートします。
- 容量最適化済み: 最大 800 万件の 768 次元ベクトルをサポートします。
- Tiered-storage: 最大 4000 万件の 768 次元ベクトルをサポートします。

これらの見積もりは、主キーのみを持つベクトルに基づいています。ID やラベルなどの追加のスカラーフィールドがあると、容量が減少する可能性があります。正確な評価には、ご自身でのテストを推奨します。

### どのタイプのクラスターを選択すべきですか？\{#which-type-of-cluster-should-i-pick}

リアルタイムアプリケーションのために瞬時の検索結果と高い同時トラフィックが必要な場合は、パフォーマンス最適化済みを選択してください。
信頼性の高い検索速度を維持しながら大規模なベクトルデータセットを処理する必要がある場合は、容量最適化済みを選択してください。
超大規模でコスト重視のワークロードを処理する必要がある場合は、Tiered-storage クラスターを選択してください。Tiered-storage クラスターを選択するには、クラスターに少なくとも 8 つのクエリ CU が必要です。
