---
title: "変更ログ | Cloud"
slug: /changelogs
sidebar_key: changelogs
sidebar_label: "変更ログ"
beta: FALSE
notebook: FALSE
description: "最終更新日: 2026年6月3日 | Cloud"
type: origin
token: MUL3wkn7Yi3YoFkYk59csf8bnNc
sidebar_position: 1
keywords: 
  - zillip
  - ベクトルデータベース
  - クラウド
  - 変更ログ

---

import Admonition from '@theme/Admonition';


import Grid from '@site/src/components/Grid';

# 変更履歴

**最終更新日:** 2026年6月3日

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **次期リリース**

    </div>

    <div>

        - さらなる vector lakebase 機能が今後提供される予定です。

    </div>

</Grid>

## 2026\{#2026}

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年6月3日](./release-notes-2606#nullable-vector)**

    </div>

    <div>

        - 📅 ベクターフィールドが `nullable` 属性をサポートするようになり、既存のコレクションに新しいベクターフィールドを追加できるようになりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年5月13日](./release-notes-2605#byoc-multi-dataplane-support)**

    </div>

    <div>

        - 🔒 BYOC プロジェクトで、異なるリージョンに複数のデータプレーンを配置できるようになりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年5月7日](./release-notes-2605)**

    </div>

    <div>

        - 🏠 Zilliz Cloud がベクトルデータベース製品から Vector Lakebase プラットフォームへと進化し、以下のハイライト機能を提供します。

            - [オンデマンド検索](./on-demand-compute)

            - [外部データレイク検索](./external-collection)

        - 🐦 Zilliz Cloud で Milvus v3.0.x がパブリックレビューに入り、以下の機能を提供します。

            - [外部コレクションとバックフィル](./external-collection)

            - [NULL 許容ベクター](./nullable-fields)

            - [埋め込みリストの検索とフィルタリング](./use-array-of-structs)

            - [MinHash 関数](./minhash-function)

            - [検索](./single-vector-search#sort-search-results-by-scalar-fields-or-private)と[クエリ](./get-and-scalar-query#sort-query-results-or-private)の Order by

            - [スナップショット](./snapshots)

            - [エンティティ TTL](./set-collection-ttl)

            - Force merge

            - カスタム辞書とトークナイザー

            - Spark セマンティック重複排除と異常検出

        - 💾 読み取り専用の[外部ボリューム](./external-volume)がインポート、マイグレーション、外部コレクションワークフローでオンラインになりました。

        - 🔍︎ コレクションレベルの[大規模 top-K](./use-large-topk) が利用可能になり、有効なコレクションで返されるエンティティの最大数が 16,384 から 1,000,000 に拡張されました。

        - 🗺️ [プロジェクトでリージョン制約が利用可能](./manage-projects#add-project-regions)になり、企業がデータの保存場所を管理し、リージョナルデータプレーンへのアクセスを明示的に保つことができます。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年4月11日](./release-notes-2604)**

    </div>

    <div>

        - [🌎 グローバルクラスター](./global-cluster-explained)が、洗練されたプラットフォーム機能により、リージョナルディザスタリカバリ障害を完全にサポートするようになりました。

        - 📈 より細かい[メトリクスがコレクションレベルで利用可能](./metrics-alerts-reference#cluster-and-collection-metrics)になりました。

        - 📋 [アクセスログ](./access-logs)がパブリックプレビューで利用可能になりました。

        - ⚙️ [メンテナンスウィンドウ](./organization-settings#set-up-preferred-maintenance-window)が再設計され、より予測可能なアップグレードスケジュールとプロアクティブな通知を提供します。

        - 👥 新しい[クラスター管理者](./project-users#cluster-admin)ロールにより、チームメンバーがプロジェクトレベルの管理者権限なしで特定のクラスターへの運用アクセス権を持てるようになりました。

        - 💾 BYOC プロジェクトのクラスターで階層型ストレージが利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年2月9日](./release-notes-2602#sso-enforcement)**

    </div>

    <div>

        - 🔐 [SSO 強制適用](./enforce-sso-in-your-organization)により、非 SSO 認証からのアクセスを制限します。

        - 👥 [組織レベル](./organization-users#organization-role)および[プロジェクトレベル](./project-users#project-access)で設定されたクラスターレベルのアクセス制御により、きめ細かなデータアクセスを実現します。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年2月4日](./release-notes-2602#new-region-aws-ireland)**

    </div>

    <div>

        - **新しいリージョン**: 🇮🇪 AWS アイルランド (eu-west-1)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年1月29日](./release-notes-2601#another-milvus-v26x-new-feature)**

    </div>

    <div>

        - 🚀   もう一つの新しい Milvus v2.6.x 機能が Zilliz Cloud で利用可能になりました。

            - [プライマリーキー検索](./primary-key-search)

        - 🔒 BYOC-I が [Microsoft Azure](/docs/byoc/deploy-byoc-i-azure) で利用可能になりました。

        - 🔐 [カスタマーマネージド暗号化キー](./cmek)が、Zilliz Cloud クラスターでの保存データの暗号化に利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年1月23日](./release-notes-2601#milvus-v26x-new-feature)**

    </div>

    <div>

        - 🚀   新しい Milvus v2.6.x 機能が Zilliz Cloud で利用可能になりました。

            - [セマンティックハイライター](./semantic-highlighter)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2026年1月15日](./release-notes-2601)**

    </div>

    <div>

        - 🚀   新しい Milvus v2.6.x 機能が Zilliz Cloud で利用可能になりました。

            - [TIMESTAMPTZ フィールド](./use-timestamptz-field)

            - [テキストハイライター](./text-highlighter)

        - 🤖 [モデルベースの埋め込み](./model-based-functions)および[再ランク関数](./model-ranker)がパブリックプレビューで提供されます。

        - 🤖 [ホステッドモデル](./hosted-models)がプライベートプレビューで提供されます。

        - 🛠️ [インテリジェントな動的レプリカ自動スケーリング](./manage-replica#dynamic-scaling)

        - 📅 使い慣れた cron 設定による高度な[スケジュールされたスケーリング](./scale-query-cu#scheduled-scaling)

        - 🌎 [グローバルクラスター](./global-cluster-explained)が稼働を開始しました。アクセスするには[お問い合わせ](https://support.zilliz.com/hc/en-us)ください。

        - ☁️ BYOC が以下の拡張によりさらにユーザーフレンドリーになりました。

            - [完全な自動スケーリング機能](/docs/byoc/scale-cluster)

            - [テクニカルサポートアクセス制御](/docs/byoc/deploy-byoc-aws#technical-support-access)

    </div>

</Grid>

## 2025\{#2025}

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年12月26日](./release-notes-2512#milvus-v26-ga)**

    </div>

    <div>

        - 🚀   Milvus v2.6.x が一般提供（GA）になりました。

        - 💾  階層型ストレージが GA になり、[課金が開始](./storage-cost)されました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,75">

    <div>

        **[2025年12月1日](./release-notes-2512#volume-ga-formerly-stage)**

    </div>

    <div>

        - 📦  ステージは[ボリューム](./volume)に名称変更され、GA になりました。

        - [🔐  組織レベルの IP ホワイトリスト](./setup-console-ip-allowlist)が利用可能になりました。

        - [🔐  TOTP ベースの MFA](./multi-factor-auth)が利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年11月6日](./release-notes-2511#business-critical-plan-availability)**

    </div>

    <div>

        - 🚀  Zilliz Cloud で Milvus v2.6.x が利用可能になり、以下のデータタイプが追加されました。

            - [ジオメトリ](./use-geometry-field)

            - [構造体の配列](./use-array-of-structs)

        - 🔍  [マイグレーション](./via-endpoint#getting-started)中に全文検索機能が利用可能になりました。

        - ⏰  繰り返しのアラートを抑制するために[通知間隔](./manage-project-alerts#alert-settings)をカスタマイズできます。

        - 🔧  コレクションを再作成せずに、[既存のコレクションで動的フィールドを有効化](./modify-collections#example-5-enable-dynamic-field)できるようになりました。

        - 💳  サブスクリプションプランがプロジェクトレベルになり、クラスターにはいくつかのデプロイメントオプションがあります。詳細な比較は[プラン比較詳細](./select-zilliz-cloud-service-plans)をご覧ください。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,75">

    <div>

        **[2025年10月9日](./release-notes-2510#milvus-v26x-public-preview)**

    </div>

    <div>

        - 🚀  Zilliz Cloud で Milvus v2.6.x が利用可能になりました。

            - [ダウンタイムなしのフィールド追加](./add-fields-to-an-existing-collection)

            - [多言語アナライザー](./multi-language-analyzers)と[フレーズ一致](./phrase-match)による強化された全文検索

            - [JSON インデックス](./json-indexing)と[シュレッディング](./json-shredding)による高速化された JSON フィルタリング

            - 検索結果の絞り込みのための[ブーストランカー](./boost-ranker)と[減衰ランカー](./decay-ranker)

            - [INT8_VECTOR データタイプ](./use-dense-vector)のサポート

        - 💾  容量拡張クラスター向けの階層型ストレージアップグレード

        - [🔄 ビジネス継続性戦略のためのクロスリージョンバックアップ](./backup-to-other-regions)

        - [⚙️  インデックスビルドレベル](./tune-index-build-level)により、シナリオに合わせてインデックス設定を調整可能

        - 🚧 パイプラインは非推奨になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年8月20日](./release-notes-2508#autoscaling-upgrade)**

    </div>

    <div>

        - [📈  設定が簡素化された自動スケーリングのアップグレード](./scale-query-cu#dynamic-scaling)

        - [📋  監査ログ](./audit-logs)が一般提供になりました。

        - [🔐  SSO](./single-sign-on) のエクスペリエンスが向上しました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年8月13日](./release-notes-2508#support-aws-sydney-region)**

    </div>

    <div>

        - **新しいリージョン**: 🇦🇺 AWS シドニー (ap-southeast-2)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年7月15日](./release-notes-2180)**

    </div>

    <div>

        - [🔗  スキーマ進化のためのマージデータ API](./merge-data)

        - [📦  マイグレーションとデータインポートのための共有ステージングレイヤーとしてのステージ](./volume)

        - [📅  スケジュールベースのクラスター自動スケーリング](./scale-query-cu)

        - [🔄  クラスターの部分復元](./restore-from-backup-files#restore-a-partial-cluster)

        - [⚙️  Zilliz Cloud コンソールでの JSON インデックス](./json-indexing)設定

        - 📊  BYOC プロジェクトのクォータ設定

        - 🔐  クラスター復元中の RBAC 設定の復元

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年6月9日](./release-notes-2170)**

    </div>

    <div>

        - [📚  マイグレーションドキュメントとベストプラクティス](./migrations)をリファクタリング

        - [🚨  きめ細かく柔軟なモニタリングのためのポリシーベースのアラート](./manage-project-alerts)

        - ⚙️  Zilliz Cloud コンソールでの mmap 設定

        - ☁️  Google Cloud Platform (GCP) で BYOC が利用可能に

        - 🤖  コマンド操作に対応する設計の優れた AI アシスタント

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年4月24日](./release-notes-2150)**

    </div>

    <div>

        - ⚙️  BYOC プロジェクトのインスタンス設定と AWS プライベートLink サポート

        - 🔍  [JSON インデックス](./use-json-fields)を使用した JSON フィールドのきめ細かなフィルタリング

        - 🛠️  RESTful API を使用して、[クラスターのレプリカ数を変更](/reference/restful/modify-cluster-replica-v2)できます。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年3月27日](./release-notes-2140)**

    </div>

    <div>

        - 🔒 BYOC-I は完全なデータ主権を提供します。

        - [📋  クラスターの監査ログ](./audit-logs)が利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2025年1月27日](./release-notes-2130)**

    </div>

    <div>

        - 🚀  Zilliz Cloud で Milvus v2.5.x が利用可能になりました。

        - [🔍  全文検索](./full-text-search)が既存のセマンティック検索機能を補完します。

        - [📋  クラスターの監査ログ](./audit-logs)が利用可能になりました。

        - [☁ー 強化されたセキュリティを備えた AWS 上の BYOC](/docs/byoc/deploy-byoc-aws)

    </div>

</Grid>

## 2024\{#2024}

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年12月26日](./release-notes-2120)**

    </div>

    <div>

        - 🎯  [検索レベルを調整](./tune-recall-rate)することで高いリコール率を実現

        - [🔐  コレクションレベルの RBAC サポート](./cluster-privileges#collection-level-privilege-groups)

        - [💾  データ容量拡大のための mmap サポート](./use-mmap)

        - [🗂ー  マルチテナントのためのデータベース](/docs/database)が利用可能に

        - **新しいリージョン**: 🇺🇸 GCP us-central1 (アイオワ)

        - [☁ー  AWS 上で BYOC](/docs/byoc/deploy-byoc-aws)が利用可能に

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年11月6日](./release-notes-2110)**

    </div>

    <div>

        - 🎨  Zilliz Cloud コンソールをリファクタリング

        - 🔄  拡張されたソースからのデータマイグレーション:

            - [Qdrant](./migrate-from-qdrant)

            - [Pinecone](./migrate-from-pinecone)

            - [Tencent Cloud](./migrate-from-tencent-cloud)

        - 💳  改善された支払いプロセスと再設計された[請求書ページ](./view-invoice)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年10月14日](./release-notes-2102)**

    </div>

    <div>

        - [📚  ノートブックギャラリー](https://zilliz.com/learn/milvus-notebooks)がオンラインに

        - ⚡  容量拡張されたパフォーマンス最適化済みクラスター

        - [🔄  マルチレプリカ](./manage-replica)が一般提供に

        - **新しいリージョン**: 🇯🇵 AWS 東京 (ap-northeast-1)

        - [📊  Prometheus との統合](./prometheus-monitoring)

        - [🔑  Auth0 を使用したシングルサインオン (SSO)](./single-sign-on)

        - 🎁  AWS Marketplace を使用した無料トライアル

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年9月14日](./release-notes-2100)**

    </div>

    <div>

        - ☁ー サーバーレスクラスターが一般提供に

        - [🔄  マルチレプリカ](./manage-replica)がパブリックプレビューで利用可能に

        - 📦  Zilliz Cloud へのデータマイグレーションサービス:

            - [Milvus](./migrate-from-milvus)

            - [Elasticsearch](./migrate-from-elasticsearch)

            - [PostgreSQL](./migrate-from-pgvector)

            - [Zilliz Cloud クラスター間](./offline-migration)

        - 🛠️  バックアップ、復元、マイグレーション、ジョブ管理のための RESTful API エンドポイント

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年7月23日](./release-notes-291)**

    </div>

    <div>

        - 🛠️  RESTful API エンドポイントをリファクタリング

        - 🤖  簡単な情報検索のためのチャットボット

        - [📋  バックアップ、復元、マイグレーション、データインポートのためのワンストップジョブモニタリング](./job-center)

        - [📈  自動スケーリング](./manage-cluster)がプライベートプレビューで利用可能に

        - 🖼️  画像検索で強化されたパイプライン

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年6月18日](./release-notes-290)**

    </div>

    <div>

        - 🚀  Zilliz Cloud で Milvus v2.4.x が利用可能に

            - [スパースベクター](./use-sparse-vector)データタイプのサポート

            - Float16 および BFloat16 ベクターデータタイプのサポート

            - [マルチベクターハイブリッド検索](./hybrid-search)

            - [転置インデックス](./index-scalar-fields)と[ファジーマッチ](./basic-filtering-operators)

            - [グループ化検索](./grouping-search)

            - 洗練された MilvusClient インターフェース

        - 📊  パイプラインがトークン使用量を監視するようになりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年5月15日](./release-notes-280)**

    </div>

    <div>

        - ☁ー サーバーレスクラスターがベータ版になりました。

        - **新しいリージョン**: 🇩🇪 Azure ドイツ中西部 (フランクフルト)

        - **新しいリージョン**: 🇩🇪 GCP europe-west3 (フランクフルト) および 🇺🇸 us-east-4 (バージニア)

        - 🧠  テキストパイプラインと画像パイプラインが利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年4月13日](./release-notes-270)**

    </div>

    <div>

        - [🛒  Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/zillizinc1703056661329.zilliz_cloud?tab=PlansAndPrice) がオンラインになりました。

        - 🔌  パイプラインがコネクターをサポートするようになりました。

        - 🔄  パイプラインが検索パイプラインに再ランカーを導入しました。

        - [📊  RESTful API を通じたメトリクスモニタリング](/reference/restful/query-metrics)が利用可能になりました。

        - 🌐  クロスクラウド[データインポート](./data-import)および[マイグレーション](./migrations)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年3月13日](./release-notes-260)**

    </div>

    <div>

        - 🧠  パイプラインがより多くの埋め込みモデルをサポートするようになりました。

        - 🎮  Zilliz Cloud コンソールでコレクションプレイグラウンドが利用可能になりました。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2024年1月18日](./release-notes-250)**

    </div>

    <div>

        - [📥  Parquet ファイルからのデータインポート](./data-import)

        - [🔐  RBAC 原則により強化された API キー](./manage-api-keys)

        - [📊  メトリクスボードとアラートシステム](./metrics-and-alerts)をリファクタリング

    </div>

</Grid>

## 2023\{#2023}

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年12月11日](./release-notes-240)**

    </div>

    <div>

        - ☁ー Zilliz Cloud が Azure で利用可能になり、以下のリージョンに対応:

            - **新しいリージョン**: 🇺🇸 Azure East US

        - 🚀  パイプラインがベータ版で利用可能に

        - 🔐  クラスター内の RBAC と認証情報管理

        - 🛠️  クラスター関連の RESTful API エンドポイント

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年10月17日](./release-notes-230)**

    </div>

    <div>

        - **新しいリージョン**: 🇩🇪 AWS フランクフルト (aws-en-central-1)

        - 🚀  Milvus v2.3.x がパブリックプレビューで利用可能に

            - [レンジ検索](./range-search)

            - [Upsert](./upsert-entities)

            - [コサインメトリックタイプ](./search-metrics-explained)

            - [アクセス制御](./access-control)

            - 返り値としての生ベクター

            - [JSON_CONTAINS フィルター](./json-filtering-operators)

            - [エンティティ数](./count-entities)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年9月27日](./release-notes-221)**

    </div>

    <div>

        - 💰  前払いのサポート

        - **新しいリージョン**: 🇺🇸 AWS US East 1 (aws-us-east-1)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年9月13日](./release-notes-220)**

    </div>

    <div>

        - [🔄  Zilliz Cloud クラスター間のデータマイグレーション](./offline-migration)

        - [🚀  Elasticsearch からの簡単なマイグレーション](./migrate-from-elasticsearch)

        - [📥  データインポートの拡張](./prepare-data-import)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年8月16日](./release-notes-210)**

    </div>

    <div>

        - **新しいリージョン**: 🇸🇬 AWS シンガポール (ap-southeast-1)

        - **新しいリージョン**: 🇸🇬 GCP シンガポール (asia-southeast-1)

        - 🔄  サーバーレスクラスターから専用クラスターへのマイグレーションサポート

        - 📤  バルクインサートのサポート

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年6月11日](./release-notes-200)**

    </div>

    <div>

        - ☁ー サーバーレスクラスターが利用可能に

        - [💰  Zilliz Cloud のプラン階層を導入](https://zilliz.com/pricing)

        - 👥  [アクセス制御](./access-control)のための組織、コラボレーション、RBAC

        - 🏷ー  名前空間のためのパーティションキーを導入

        - 📝  動的スキーマが利用可能に

        - 📊  新しいデータタイプ: JSON

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年4月6日](./release-notes-110)**

    </div>

    <div>

        - [💰  料金計算機](https://zilliz.com/pricing#calculator)

        - [💾  GCP でのバックアップと復元](./backup-and-restore)

        - [⏰  カスタムタイムゾーン](./organization-settings#manage-timezone)

        - [🔄  コレクションのリネーム](./manage-collections-console)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年3月6日](./release-notes-100)**

    </div>

    <div>

        - **新しいリージョン**: 🇺🇸 GCP オレゴン (us-west1)

        - ☁ー Zilliz Cloud が [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-iqbidum7feuio) で利用可能に

        - [💾  AWS でバックアップと復元](./backup-and-restore)が利用可能に

        - [🗑ー  データ継続性戦略のためのごみ箱](./use-recycle-bin)

        - [🔄  Milvus からのマイグレーション](./migrations)

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年2月13日](./release-notes-011)**

    </div>

    <div>

        - 📧  Eメール通知

        - 📚  初心者向けのインラインヘルプ

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2023年1月10日](./release-notes-010)**

    </div>

    <div>

        - 👁ー  コレクションのデータプレビュー

        - 📚  初心者がベクトルデータベースに慣れるためのデモデータセット

    </div>

</Grid>

## 2022\{#2022}

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2022年12月5日](./release-notes-009)**

    </div>

    <div>

        - 🎨  新しいデザインの Zilliz Cloud コンソール

        - **新しいリージョン**: 🇺🇸 AWS オハイオ (us-east-2)

        - [🔐  プライベートリンク](./setup-a-private-link)が利用可能に

        - [📥  データインポート](./data-import)が利用可能に

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **[2022年11月18日](./release-notes-008)**

    </div>

    <div>

        - 🚀  Zilliz Cloud が招待なしで一般公開

        - ⚡  容量最適化済み CU がオンラインに

        - 📊  QPS とクエリレイテンシのリソースモニター

        - 🛠️  AUTOINDEX によるインデックス作成の簡素化

        - ⚡  より良いユーザーエクスペリエンスのための UI パフォーマンス最適化

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **2022年9月15日**

    </div>

    <div>

        - 🎨  コレクションビューをリファクタリング

        - 🔍  ベクター検索ビューをリファクタリング

        - 🧑‍💻  Google アカウントでのサインアップが可能に

        - [⚙ー  システムメンテナンス設定](./organization-settings)が利用可能に

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **2022年8月30日**

    </div>

    <div>

        - 📊  より大規模な標準ベクトルデータベース。

        - ⚙ー  Cloud UI でのコレクション管理。

        - ⚙ー  Cloud UI でのインデックス管理。

        - 🔍  Cloud UI でのベクター検索の実行。

        - 🔐  セキュリティ上の理由から、デフォルトでインターネットからのデータベースアクセスを無効化。

        - 🔐  ホワイトリストのエクスペリエンスを改善。

        - 💰  クレジットをサポート。

        - 🚀  Cloud UI を改善し、操作性を向上。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **2022年8月1日**

    </div>

    <div>

        - 👁ー  Cloud UI でのコレクションの表示。

        - 👁ー  Cloud UI でのコレクションスキーマの表示。

        - ➕  Cloud UI でのコレクションの作成。

        - ➖  Cloud UI でのコレクションの削除。

        - 👁ー  Cloud UI でのインデックスの表示。

        - 🚀  より良い操作性のための Cloud UI。

    </div>

</Grid>

<Grid columnSize="2" widthRatios="25,74">

    <div>

        **2022年7月22日**

    </div>

    <div>

        - **新しいリージョン**: 🇺🇸 AWS オレゴン (us-west-2)

        - ✅  すべての Core Milvus 機能をサポート。

        - ⏸ー  ベクトルデータベースの一時停止と再開をサポート。

        - 📊  ベクトルデータベースの基本的なメトリクス表示をサポート。

        - 👥  データベースのユーザー管理をサポート。

        - ➕  複数プロジェクトの作成をサポート。

        - 🔐  プロジェクトレベルでの IP ホワイトリスト設定をサポート。

        - 👁ー  ユーザー操作イベントの表示をサポート。

        - 🔐  メールによる MFA 有効化をサポート。

    </div>

</Grid>

