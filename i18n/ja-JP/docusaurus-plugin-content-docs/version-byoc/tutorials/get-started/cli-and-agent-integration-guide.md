---
title: "CLI & Agent インテグレーションのクイックスタート | BYOC"
slug: /cli-and-agent-integration-guide
sidebar_key: cli-and-agent-integration-guide
sidebar_label: "CLI & Agent インテグレーションのクイックスタート"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz CLI とエージェントのインテグレーションをローカルでセットアップする方法を説明します。セットアップ後は、自然言語で Zilliz Cloud を操作するためにエージェントを使用できるほか、ターミナル、スクリプト、CI ワークフローで直接 CLI を使用することもできます。 | BYOC"
type: shortcut
token: HxWmwteOEi1Egukx26pcBnnknSd
sidebar_position: 8
keywords: 
  - zilliz
  - ベクトルデータベース
  - クイックスタート
  - クラウド
  - milvus
  - cli
  - agent
  - インテグレーション

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Procedures from '@site/src/components/Procedures';

# CLI とエージェント統合のクイックスタート

このガイドでは、Zilliz CLI とエージェント統合をローカルにセットアップする方法を説明します。セットアップ後、エージェントを使用して自然言語で Zilliz Cloud を操作したり、ターミナル、スクリプト、CI ワークフローで CLI を直接使用したりできます。

## インストール\{#installation}

始める前に、以下が整っていることを確認してください。

- [Zilliz Cloud アカウント](https://cloud.zilliz.com/login)

- [Claude Code Plugin](/docs/agents/zilliz-plugin) を使用する場合は、Claude Code

- [Zilliz Skill](https://github.com/zilliztech/zilliz-skill) をインストールする場合は、Node.js

### Claude Code Plugin のインストール\{#install-claude-code-plugin}

Claude Code から直接 Zilliz Cloud を操作したい場合は、[Claude Code Plugin](/docs/agents/zilliz-plugin) を使用します。

<Procedures>

1. Claude Code を実行します

    ```bash
    > claude
    ```

1. プラグインマーケットプレイスを開く

    ```bash
    /plugin
    ```

1. Zilliz プラグインを見つけてインストールする

    **Discover** タブに移動し、`zilliz` を検索します。インストールするために `zilliz` プラグインを選択します。

    ![TqS3b4z7Ho9xcXxHJaIc7HTZn1e](https://zdoc-images.s3.us-west-2.amazonaws.com/tqs3b4z7ho9xcxxhjaic7htzn1e.png "TqS3b4z7Ho9xcXxHJaIc7HTZn1e")

1. クイックスタートウィザードを実行します。このウィザードは、CLI のインストール、認証、クラスター接続、および最初の操作をガイドします。

    ```plaintext
    /zilliz:quickstart
    ```

</Procedures>

### 一般的なエージェントフレームワーク向けの Zilliz Skill のインストール\{#install-zilliz-skill-for-common-agent-frameworks}

Codex、Gemini CLI、カーソル、またはその他のスキル互換エージェントなどのコーディングエージェントがエージェントスキルをサポートしている場合は、次のように [Zilliz Skill](https://github.com/zilliztech/zilliz-skill) をインストールします。

```bash
npx skills add zilliztech/zilliz-skill
```

このコマンドは、ターゲットエージェントフレームワークとインストール範囲を選択するように促します。

### Zilliz CLI のインストール\{#install-zilliz-cli}

[Zilliz CLI](/reference/cli/overview) は、Plugin と Skill で使用される基本的なコマンドラインツールです。

<Procedures>

1. Zilliz CLI をインストールします。

    <Tabs groupId="cli-install" defaultValue='linux' values={[{"label":"macOS / Linux","value":"linux"},{"label":"Windows","value":"windows"}]}>

    <TabItem value="linux">

    ```bash
    curl -fsSL https://zilliz.com/cli/install.sh | bash
    ```

    </TabItem>

    <TabItem value='java'>

    ```bash
    irm https://zilliz.com/cli/install.ps1 | iex
    ```

    </TabItem>

    </Tabs>

    インストールの確認:

    ```bash
    zilliz --version
    ```

1. 認証。

    Zilliz Cloud アカウントで認証します。

    ```bash
    zilliz login
    ```

    これによりブラウザが開き認証が行われます。ログイン後、認証情報はローカルに保存されます。

</Procedures>

## CLI、プラグイン、スキルを使用するタイミング\{#when-to-use-cli-plugin-or-skill}

以下の場合にこれらのツールを使用します。

- ローカル環境から手動で開発・テストする。
- 繰り返し可能なワークフローのために自動化スクリプトを作成する。
- エージェントがVector データベースまたはVector Lakebaseサービスを自動的に呼び出せるようにする。

### ツール比較\{#tool-comparison}

Claude Code Plugin、Zilliz Skill、Zilliz CLIは同じ主要機能をカバーする必要があります。機能範囲ではなくワークフローに基づいて選択してください。

<table>
   <tr>
     <th></th>
     <th><p><strong>Claude Code Plugin</strong></p></th>
     <th><p><strong>Zilliz Skill</strong></p></th>
     <th><p><strong>Zilliz CLI</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>最適な用途</strong></p></td>
     <td><p>Claude Codeの自然言語ワークフロー</p></td>
     <td><p>スキル互換のコーディングエージェント</p></td>
     <td><p>ターミナル使用、スクリプト、CI</p></td>
   </tr>
   <tr>
     <td><p><strong>セットアップ</strong></p></td>
     <td><p><code>/zilliz:quickstart</code></p></td>
     <td><p><code>npx skills add zilliztech/zilliz-skill</code></p></td>
     <td><p>インストールスクリプト + <code>zilliz login</code></p></td>
   </tr>
   <tr>
     <td><p><strong>自然言語</strong></p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>いいえ</p></td>
   </tr>
   <tr>
     <td><p><strong>自動化</strong></p></td>
     <td><p>エージェント支援</p></td>
     <td><p>エージェント支援</p></td>
     <td><p>スクリプト優先</p></td>
   </tr>
   <tr>
     <td><p><strong>構造化出力</strong></p></td>
     <td><p>エージェントが読み取り可能な応答</p></td>
     <td><p>エージェントが読み取り可能な応答</p></td>
     <td><p>スクリプト用の<code>--output json</code></p></td>
   </tr>
</table>

### サポートされる機能\{#supported-capabilities}

以下の表は、CLI、プラグイン、スキルの機能を説明しています。

<table>
   <tr>
     <th><p>エリア</p></th>
     <th><p>できること</p></th>
   </tr>
   <tr>
     <td><p>クラスター</p></td>
     <td><p>作成、削除、一時停止、再開、変更</p></td>
   </tr>
   <tr>
     <td><p>コレクション</p></td>
     <td><p>カスタムスキーマで作成、ロード、リリース、リネーム、削除</p></td>
   </tr>
   <tr>
     <td><p>ベクトル</p></td>
     <td><p>検索、クエリ、挿入、アップサート、削除、ハイブリッド検索</p></td>
   </tr>
   <tr>
     <td><p>インデックス</p></td>
     <td><p>作成(AUTOINDEX)、一覧表示、説明、削除</p></td>
   </tr>
   <tr>
     <td><p>データベース</p></td>
     <td><p>作成、一覧表示、説明、削除</p></td>
   </tr>
   <tr>
     <td><p>ユーザーとロール</p></td>
     <td><p>RBAC設定、権限管理</p></td>
   </tr>
   <tr>
     <td><p>バックアップ</p></td>
     <td><p>作成、復元、エクスポート、ポリシー管理</p></td>
   </tr>
   <tr>
     <td><p>インポート</p></td>
     <td><p>S3/GCS/Azure Blob Storageからの一括データインポート</p></td>
   </tr>
   <tr>
     <td><p>パーティション</p></td>
     <td><p>作成、ロード、リリース、管理</p></td>
   </tr>
   <tr>
     <td><p>監視</p></td>
     <td><p>クラスターステータス、コレクション統計、ロード状態</p></td>
   </tr>
   <tr>
     <td><p>プロジェクト</p></td>
     <td><p>プロジェクトとリージョン管理</p></td>
   </tr>
   <tr>
     <td><p>請求</p></td>
     <td><p>使用量クエリ、請求書</p></td>
   </tr>
</table>

## エージェントに依頼できること\{#what-you-can-ask-your-agent-to-do}

インストール後、タスクを直接説明してください。エージェントはリクエストを対応するZilliz CLIコマンドに変換します。以下の例は、自然言語のリクエストがエージェントが実行するCLIコマンドにどのようにマッピングされるかを示しています。

- **クラスターを一覧表示し、現在アクティブなものを表示する。**

    期待されるCLIコマンド:

    ```bash
    zilliz cluster list
    zilliz context current
    ```

- **商品埋め込み用の768次元ベクトルフィールドを持つコレクションを作成します。**

    ```bash
    zilliz collection create --name product_embeddings --dimension 768
    ```

- **S3からデータを自分のコレクションにインポートし、インポートジョブのステータスを確認します。**

    期待されるCLIコマンド:

    ```bash
    zilliz import start --cluster-id <cluster-id> --collection product_embeddings --body '{"files": [["s3://bucket/path/data.json"]]}'
    ```

- **本番クラスターのバックアップを作成します。**

    期待されるCLIコマンド:

    ```bash
    zilliz backup create --cluster-id <cluster-id>
    ```

- **メタデータフィルターを使用してコレクションを検索し、上位10件の結果を返します。**

期待されるCLIコマンド:

    ```bash
    zilliz vector search --collection product_embeddings --data '[[0.1, 0.2, 0.3]]' --filter 'age > 20' --limit 10 --output-fields '["name", "age"]'
    ```

- **アナリティクスコレクションへの読み取り専用アクセス権を持つロールを作成します。**

    期待されるCLIコマンド：

    ```bash
    zilliz role create --role analytics_readonly
    zilliz role grant-privilege --role analytics_readonly --object-type Collection --object-name analytics --privilege Search
    zilliz role grant-privilege --role analytics_readonly --object-type Collection --object-name analytics --privilege Query
    ```

