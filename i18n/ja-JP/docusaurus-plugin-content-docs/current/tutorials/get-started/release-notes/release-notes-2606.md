---
title: "2026年6月 リリースノート | Cloud"
slug: /release-notes-2606
sidebar_key: release-notes-2606
sidebar_label: "2026年6月"
beta: FALSE
notebook: FALSE
description: "2026年6月のリリースノート | Cloud"
type: origin
token: OZtawoDUci0CKokf9RlchvInnMf
sidebar_position: 2
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - リリースノート

---

import Admonition from '@theme/Admonition';


import Grid from '@site/src/components/Grid';

# 2026年6月 リリースノート

<Grid columnSize="2" widthRatios="14,85">

    <div>

        **2026-06-03**

    </div>

    <div>

        ## NULL許容ベクトル\{#nullable-vector}

        ベクトルフィールドが `nullable` 属性をサポートするようになり、既存のコレクションに新しいベクトルフィールドを追加できるようになりました。これは多くのお客様が待ち望んでいた機能です。NULL許容ベクトルを使用すると、コレクション作成後にベクトルカラムを追加してスキーマを進化させ、コレクションを完全に運用可能な状態に保ちながら、自分のペースでエンベッディングをバックフィルできます。

        <Admonition type="info" icon="📘" title="Notes">

        NULL許容ベクトルを使用するには、Serving Clusters で最新の Milvus 2.6.x バージョンが必要です。Milvus 3.0.x を実行している On-Demand Clusters はすでにこの機能をサポートしています。

        </Admonition>

        これは、6つのベクトルタイプすべてに適用されます — `FLOAT_VECTOR`、`FLOAT16_VECTOR`、`BFLOAT16_VECTOR`、`INT8_VECTOR`、`BINARY_VECTOR`、`SPARSE_FLOAT_VECTOR`。主なハイライト：

        - **既存のコレクションへのベクトルフィールドの追加** — `AddCollectionField` を使用して、既存のデータを再構築することなく、新しいNULL許容ベクトルカラムをオンラインで追加できます。既存のエンティティは NULL ベクトルで開始され、増分的にバックフィルできます。

        - **自動検索除外** — NULL ベクトルは、ベクトルインデックス構築および検索中に自動的にスキップされ、検索品質に影響を与えません。

        - **ほぼゼロのストレージ** — NULL ベクトルは事実上ストレージを消費しないため、エンベッディングがまだ利用できないエンティティをコスト効率よく保存できます。

        - **完全なワークフローカバレッジ** — NULL許容ベクトルは、Create Collection、Add Field、データプレビュー、Import、Backup & Restore、Migration のワークフロー全体でサポートされています。

        詳細については、[NULL許容フィールド](./nullable-fields) および [既存のコレクションへのフィールドの追加](./add-fields-to-an-existing-collection) を参照してください。

        ## 機能強化\{#enhancements}

        - **On-Demand Compute が プライベート Endpoint をサポート** — On-Demand Compute が プライベート Endpoint をサポートするようになり、オンデマンド検索ワークロードへの安全でプライベートなネットワークアクセスが可能になりました。セットアップは Serving Clusters と同じワークフローに従います。詳細については、[プライベートLink のセットアップ (AWS)](./setup-a-private-link-aws) を参照してください。

        - **データプレビューの強化** — データプレビューページが、個々のレコードのインプレース編集のための upsert、10件/50件/100件のサンプルレコードのワンクリック挿入、大規模データセットをスムーズにナビゲートするための無限ページングをサポートするようになりました。

        - **コレクション作成：フィールドセクションの再設計** — フィールド設定のためのより直感的なレイアウトにより、スキーマ設定がより速く、簡単になりました。詳細については、[コレクションの管理（コンソール）](./manage-collections-console) の「コレクションの作成 - コレクションスキーマ」セクションを参照してください。

    </div>

</Grid>

