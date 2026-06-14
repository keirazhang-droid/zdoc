---
title: "Zilliz Cloud 制限 | Cloud"
slug: /limits
sidebar_key: limits
sidebar_label: "Zilliz Cloud 制限"
beta: FALSE
notebook: FALSE
description: "このページでは、Zilliz Cloud プラットフォームの制限についての情報を提供します。これらの制限に関連する問題を報告する必要がある場合は、リクエストを送信してください。 | Cloud"
type: origin
token: PuxkwMWvbiHxvTkHsVkcMZP9n5f
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - milvus
  - 制限

---

import Admonition from '@theme/Admonition';


# Zilliz Cloud の制限

このページでは、Zilliz Cloud プラットフォームの制限について説明します。これらの制限に関する問題を報告する必要がある場合は、[リクエストを送信](https://support.zilliz.com/hc/en-us) してください。

## 組織とプロジェクト\{#organizations-and-projects}

次の表は、1 人のユーザーに許可される組織とプロジェクトの最大数の制限を示しています。

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>組織</p></td>
     <td><p>1</p></td>
     <td><p>Zilliz Cloud は、アカウント登録が成功すると自動的に 1 つの組織を作成します。さらに組織が必要な場合は、<a href="http://support.zilliz.com">サポートチケットを作成</a> してください。ユーザーは複数の組織に参加できます。</p></td>
   </tr>
   <tr>
     <td><p>プロジェクト</p></td>
     <td><p>100</p></td>
     <td><p>各ユーザーは、1 つの組織内に最大 100 個のプロジェクトを作成できます。</p></td>
   </tr>
</table>

## ユーザーとロール\{#users-and-roles}

次の表は、Zilliz Cloud で許可されるユーザーとロールの最大数の制限を示しています。

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>組織ユーザー</p></td>
     <td><p>100</p></td>
     <td><p>1 つの組織には、合計で最大 100 人の組織ユーザーを含めることができます。</p></td>
   </tr>
   <tr>
     <td><p>クラスターユーザー</p></td>
     <td><p>500</p></td>
     <td><p>1 つのクラスターには、合計で最大 500 人のユーザーを含めることができます。</p></td>
   </tr>
   <tr>
     <td><p>クラスターカスタムロール</p></td>
     <td><p>500</p></td>
     <td><p>1 つのクラスターには、合計で最大 500 個のカスタムロールを含めることができます。この制限を解除するには、<a href="http://support.zilliz.com">お問い合わせください</a>。</p></td>
   </tr>
</table>

## APIキー\{#api-keys}

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>APIキー</p></td>
     <td><p>100</p></td>
     <td><p>最適なリソース使用率とセキュリティのために、各組織には最大 100 個のカスタマイズされた APIキーを含めることができます。</p></td>
   </tr>
</table>

## コンソール IP 許可リスト\{#console-ip-allowlist}

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>組織のコンソール IP 許可リスト内の IP</p></td>
     <td><p>100</p></td>
     <td><p>各組織のコンソール IP 許可リストには、最大 100 個の IP または CIDR ブロックを含めることができます。</p></td>
   </tr>
</table>

## ボリューム\{#volumes}

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>管理ボリューム</p></td>
     <td><p>100</p></td>
     <td><p>各組織には、最大 100 個の管理ボリュームを含めることができます。</p></td>
   </tr>
   <tr>
     <td><p>外部ボリューム</p></td>
     <td><p>100</p></td>
     <td><p>各組織には、最大 100 個の外部ボリュームを含めることができます。</p></td>
   </tr>
</table>

## クラスター\{#clusters}

### クラスター数\{#number-of-clusters}

クラスターの最大数は、お支払い方法とデプロイオプションによって異なります。

- **有効なお支払い方法がない場合**

    <table>
       <tr>
         <th><p><strong>クラスターデプロイオプション</strong></p></th>
         <th><p><strong>最大数</strong></p></th>
         <th><p><strong>備考</strong></p></th>
       </tr>
       <tr>
         <td><p>無料</p></td>
         <td><p>1</p></td>
         <td><p>各組織では、無料クラスターは 1 つだけ許可されています。必要に応じて、既存の無料クラスターを削除して新しいものと置き換えることができます。</p></td>
       </tr>
       <tr>
         <td><p>Serverless/専用</p></td>
         <td><p>1</p></td>
         <td><p>無料トライアル中は、Serverless/専用クラスターを 1 つだけ作成できます。追加のクラスターが必要な場合は、お支払い方法を追加してください。</p></td>
       </tr>
    </table>

- **有効なお支払い方法がある場合**

    <table>
       <tr>
         <th><p><strong>クラスターデプロイオプション</strong></p></th>
         <th><p><strong>最大数</strong></p></th>
         <th><p><strong>備考</strong></p></th>
       </tr>
       <tr>
         <td><p>Serving - 無料</p></td>
         <td><p>1</p></td>
         <td><p>各組織では、無料クラスターは 1 つだけ許可されています。必要に応じて、既存の無料クラスターを削除して新しいものと置き換えることができます。</p></td>
       </tr>
       <tr>
         <td><p>Serving - Serverless</p></td>
         <td><p>100</p></td>
         <td><p>各プロジェクトで作成できる Serverless クラスターは最大 100 個までです。</p></td>
       </tr>
       <tr>
         <td><p>Serving - 専用</p></td>
         <td><p>100</p></td>
         <td><p>各プロジェクトで作成できる専用クラスターは最大 100 個までです。</p></td>
       </tr>
       <tr>
         <td><p>オンデマンド</p></td>
         <td><p>20</p></td>
         <td><p>各プロジェクトで作成できるオンデマンドクラスターは最大 20 個までです。</p></td>
       </tr>
    </table>

### CU\{#cus}

CU はデータの並列処理に使用されるコンピューティングリソースの基本単位であり、CU タイプによって CPU、メモリ、ストレージの組み合わせが異なります。CU の概念は専用クラスターにのみ適用されます。

<table>
   <tr>
     <th><p><strong>プロジェクトプランとクラスターデプロイオプション</strong></p></th>
     <th><p><strong>制限</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>Standard プロジェクトの専用サービングクラスター</p></td>
     <td><p>CU サイズ &lt;= 32</p></td>
     <td><p>コンソールでは、1 つのクラスターに対して最大 32 CU を作成できます。</p></td>
   </tr>
   <tr>
     <td><p>Enterprise プロジェクトの専用サービングクラスター</p></td>
     <td><p>CU サイズ x レプリカ数 &lt;= 10,240</p></td>
     <td><p>コンソールでは、1 つのクラスターに対して最大 1,024 CU を作成できます。</p><p>ただし、レプリカが追加された場合の制限は CU サイズ x レプリカ数 &lt;= 10,240 です。</p></td>
   </tr>
   <tr>
     <td><p>Enterprise プロジェクトのオンデマンドクラスター</p></td>
     <td><p>8 &lt;= CU サイズ &lt;= 256</p></td>
     <td><p>コンソールでは、1 つのオンデマンドクラスターは 8 ～ 256 CU をサポートします。</p><p>8 CU ごとに最大 3 TB のデータに対する検索が可能になります。</p></td>
   </tr>
</table>

ぜひ[お問い合わせください](https://support.zilliz.com/hc/en-us)

- Standard プロジェクトの専用クラスターで 32 CU を超える必要がある場合
- Enterprise プロジェクトの専用クラスターで 1,024 CU を超える必要がある場合

### vCU\{#vcus}

仮想コンピューティングユニット (vCU) は、読み取り操作 (検索やクエリなど) および書き込み操作 (挿入、アップサート、削除など) によって消費されるリソースを測定するために使用されます。vCU の概念は、無料クラスターと Serverless クラスターにのみ適用されます。

<table>
   <tr>
     <th><p><strong>クラスタープラン</strong></p></th>
     <th><p><strong>制限</strong></p></th>
   </tr>
   <tr>
     <td><p>無料</p></td>
     <td><p>月間 250 万 vCU</p></td>
   </tr>
   <tr>
     <td><p>Serverless</p></td>
     <td><p>該当なし</p></td>
   </tr>
</table>

### 容量\{#capacity}

次の表は、各タイプのクラスタープランの容量の制限を示しています。

<table>
   <tr>
     <th><p><strong>クラスタープラン</strong></p></th>
     <th><p><strong>制限</strong></p></th>
   </tr>
   <tr>
     <td><p>無料</p></td>
     <td><p>クラスターあたり 5 GB (クラスターあたり 100 万個の 768 次元ベクトルに相当)</p></td>
   </tr>
   <tr>
     <td><p>Serverless</p></td>
     <td><p>Zilliz Cloud の Serverless クラスターには容量制限はありません。</p></td>
   </tr>
   <tr>
     <td><p>専用 (CU あたり)</p></td>
     <td><p>Zilliz Cloud の専用クラスターには容量制限はありません。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="Notes">

専用クラスターの容量の上限は、使用する CU タイプとサイズによって異なります。クラスターの容量が十分でない場合は、CU タイプとサイズの調整を検討してください。詳細については、[クラスターのスケーリング](./scale-query-cu) を参照してください。

</Admonition>

## レプリカ\{#replicas}

レプリカを追加するには、クラスターに **12 CU 以上** が必要です。以下の制限も適用されます。

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>制限</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>レプリカ</p></td>
     <td><p>10</p></td>
     <td><p>最大 10 個のレプリカを作成できます。</p></td>
   </tr>
   <tr>
     <td><p>クエリ CU x レプリカ数</p></td>
     <td><p>10,240</p></td>
     <td><p>クラスターのレプリカ数 x クエリ CU は 10,240 を超えてはなりません。</p></td>
   </tr>
</table>

## データベース\{#databases}

- 各 Serving-専用クラスターは、最大 1024 個のデータベースを持つことができます。
- プロジェクトとリージョンごとに、最大 64 個のオンデマンドコンピュートデータベースを作成できます。
- デフォルトのデータベースは削除できません。

## コレクション\{#collections}

Zilliz Cloud クラスター内のコレクションとパーティションの最大数は、割り当てられた CU の数と互換性のある Milvus バージョンによって異なります。以下の説明を参照して、クラスター内のコレクションとパーティションの最大数を計算できます。

CU あたり最大 **1,024** 個のコレクションまたは **4,096** 個のパーティションを作成でき、コレクションあたり最大 **1,024** 個のパーティションが許可されます。次の式を使用して、クラスター内のコレクションとパーティションの数の上限を計算できます。

![I1aJwA2LShihxQbyG30cFm14ngf](https://zdoc-images.s3.us-west-2.amazonaws.com/I1aJwA2LShihxQbyG30cFm14ngf.png)

- クラスター内のコレクションの総数は、クラスター内の CU 数の 1,024 倍または 16,384 のいずれか小さい方未満である必要があります。
- クラスター内のすべてのコレクションにわたるパーティションの総数は、クラスターに割り当てられた CU 数の 4,096 倍または 65,536 のいずれか小さい方未満である必要があります。
- 両方の条件を満たす必要があります。

<Admonition type="info" icon="📘" title="Notes">

**無料** クラスターと **Serverless** クラスターには、代わりに次の制限が適用されます。

- **無料** クラスターでは最大 **5** 個のコレクションが許可されます。
- **Serverless** クラスターでは最大 **100** 個のコレクションがサポートされます。

</Admonition>

### フィールド\{#fields}

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
   </tr>
   <tr>
     <td><p>コレクションあたりのフィールド数</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p>コレクションあたりのベクトルフィールド数</p></td>
     <td><ul><li><p>無料 & Serverless: 4</p></li><li><p>専用: 10</p></li></ul></td>
   </tr>
</table>

フィールドに関するその他の制限：

- VarChar や JSON などの一部のフィールドは、予想よりも多くのメモリを使用し、クラスターが満杯になる可能性があります。

### 次元\{#dimensions}

ベクトルフィールドの次元の最大数は **32,768** です。

### シャード\{#shards}

許可されるシャードの最大数は、クラスタープランとクラスターの CU サイズによって異なります。

<table>
   <tr>
     <th colspan="2"><p><strong>クラスタープランと CU サイズ</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
   </tr>
   <tr>
     <td colspan="2"><p>無料</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td colspan="2"><p>Serverless</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td rowspan="4"><p>専用</p></td>
     <td><p>1 - 2 CU</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>4 - 8 CU</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>12 - 64 CU</p></td>
     <td><p>8</p></td>
   </tr>
   <tr>
     <td><p>> 64 CU</p></td>
     <td><p>16</p></td>
   </tr>
</table>

### レート制限\{#rate-limit}

Zilliz Cloud は、コレクションとパーティションのデータ定義言語 (DDL) 操作 (コレクションの作成、ロード、解放、削除を含む) にもレート制限を課します。次のレート制限は、Serverless クラスターと専用クラスターの両方のコレクションに適用されます。

<table>
   <tr>
     <th></th>
     <th><p><strong>レート制限</strong></p></th>
   </tr>
   <tr>
     <td><p>コレクション DDL 操作</p><p>(作成、ロード、解放、削除)</p></td>
     <td><p>クラスターあたり 20 req/s</p></td>
   </tr>
   <tr>
     <td><p>パーティション DDL 操作</p><p>(作成、ロード、解放、削除)</p></td>
     <td><p>クラスターあたり 20 req/s</p></td>
   </tr>
</table>

## 運用\{#operations}

このセクションでは、Zilliz Cloud クラスターでの一般的なデータ操作のレート制限に焦点を当てます。

### 挿入とアップサート\{#insert-and-upsert}

挿入およびアップサート操作のレート制限は、クラスターデプロイオプションと使用中の CU 数によって異なります。

<table>
   <tr>
     <th></th>
     <th><p>挿入とアップサートの最大レート制限</p></th>
   </tr>
   <tr>
     <td><p>無料クラスター</p></td>
     <td><p>2 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Serverless クラスター</p></td>
     <td><p>10 MB/s</p></td>
   </tr>
   <tr>
     <td><p>専用クラスター</p></td>
     <td><p>16 MB/s + 1 MB/s × CU</p><p>最大 256 MB/s。</p></td>
   </tr>
</table>

例：

- `1 CU`：`17 MB/s`
- `8 CUs`：`24 MB/s`
- `64 CUs`：`80 MB/s`
- `240 CUs`：`256 MB/s`
- `>= 240 CUs`：`256 MB/s` 最大

さらに、次の追加制限が適用されます：

- 単一シャードの書き込みレートは **32 MB/s** を超えてはなりません。
- データを挿入するときは、スキーマで定義されたすべてのフィールドを含めます。コレクションで AutoID が有効になっている場合は、プライマリキーを除外します。
- データをアップサートするときは、スキーマで定義されたすべてのフィールドを含めます。
- 挿入またはアップサートされたエンティティを検索やクエリですぐに取得できるようにするには、検索またはクエリリクエストの一貫性レベルを **Strong** に変更することを検討してください。詳細については、[一貫性レベル](./consistency-level) を参照してください。

### インデックス\{#index}

インデックスタイプはフィールドタイプによって異なります。次の表に、インデックス可能なフィールドタイプと対応するインデックスタイプを示します。

<table>
   <tr>
     <th><p><strong>フィールドタイプ</strong></p></th>
     <th><p><strong>インデックスタイプ</strong></p></th>
     <th><p><strong>メトリックタイプ</strong></p></th>
   </tr>
   <tr>
     <td><p>ベクトルフィールド</p></td>
     <td><p>AUTOINDEX</p></td>
     <td><p>L2、IP、COSINE</p></td>
   </tr>
   <tr>
     <td><p>VarChar フィールド</p></td>
     <td><p>TRIE</p></td>
     <td><p>該当なし</p></td>
   </tr>
   <tr>
     <td><p>Int8/16/32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>該当なし</p></td>
   </tr>
   <tr>
     <td><p>Float32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>該当なし</p></td>
   </tr>
</table>

### フラッシュ\{#flush}

フラッシュリクエストのレート制限は 0.1 リクエスト/秒で、特定のクラスタータイプのコレクションレベルで課されます。このレート制限は以下に適用されます：

- Milvus v2.4.x 以降と互換性のある Serverless クラスター。
- ベータ版にアップグレードされた、Milvus v2.4.x 以降と互換性のある専用クラスター。

<Admonition type="info" icon="📘" title="Notes">

フラッシュ操作を手動で実行することはお勧めしません。Zilliz Cloud クラスターは自動的に適切に処理します。

</Admonition>

### ロード\{#load}

ロードリクエストのレート制限は、クラスターあたり **20** req/s です。

<Admonition type="info" icon="📘" title="Notes">

新しいデータがこれらのコレクションに取り込まれている場合でも、すでにロードされているコレクションに対してロードコレクションを実行する必要はありません。

</Admonition>

### 検索\{#search}

各検索リクエスト/レスポンスは **64** MB 以下である必要があります。

各検索リクエストが運ぶクエリベクトルの数 (通常 **nq** と呼ばれます) は、サブスクリプションプランによって異なります：

- 無料クラスターと Serverless クラスターの場合、**nq** は **10** 以下です。
- 専用クラスターの場合、**nq** は **16,384** 以下です。

各検索レスポンスが運ぶ数 (通常 **topK** と呼ばれます) は、サブスクリプションプランによって異なります：

- 無料クラスターと Serverless クラスターの場合、**topK** は返されるエンティティ数 **1,024** 以下です。
- 専用クラスターの場合、**topK** は返されるエンティティ数 **16,384** 以下です。

### クエリ\{#query}

各クエリリクエスト/レスポンスは **64** MB 以下である必要があります。

各クエリレスポンスは、返されるエンティティ数が 16,384 以下です (通常 **topK** と呼ばれます)。

### 削除\{#delete}

各削除リクエスト/レスポンスは **64** MB 以下である必要があります。

削除リクエストのレート制限は、クラスターあたり **0.5** MB/s です。

### ドロップ\{#drop}

ドロップリクエストのレート制限は、クラスターあたり **20** req/s です。

### データインポート\{#data-import}

コレクション内で実行中または保留中のインポートジョブは最大 **10,000** 個まで許可されます。

Zilliz Cloud は、Web コンソールでインポートするファイルにも制限を課します。

<table>
   <tr>
     <th><p>ファイルタイプ</p></th>
     <th><p>ローカルアップロード</p></th>
     <th><p>オブジェクトストレージから</p></th>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>1 GB</p></td>
     <td><p><strong>無料</strong>：各インポートリクエストは最大 1 GB のデータをインポートでき、ファイルあたり最大 1 GB、インポートあたり最大 1,000 ファイルまでです。</p><p><strong>Serverless & 専用</strong>：最大インポートサイズは 1 TB、各ファイルの最大サイズは 10 GB、最大 1,000 ファイルまでです。</p></td>
   </tr>
   <tr>
     <td><p>Parquet</p></td>
     <td><p>1 GB</p></td>
     <td><p><strong>無料</strong>：各インポートリクエストは最大 1 GB のデータをインポートでき、ファイルあたり最大 1 GB、インポートあたり最大 1,000 ファイルまでです。</p><p><strong>Serverless & 専用</strong>：最大インポートサイズは 1 TB、各ファイルの最大サイズは 10 GB、最大 1,000 ファイルまでです。</p></td>
   </tr>
   <tr>
     <td><p>Numpy</p></td>
     <td><p>サポートされていません</p></td>
     <td><p><strong>無料</strong>：各インポートリクエストは最大 1 GB のデータをインポートでき、サブディレクトリあたり最大 1 GB、インポートあたり最大 1,000 サブディレクトリまでです。</p><p><strong>Serverless & 専用</strong>：最大インポートサイズは 1 TB、各サブディレクトリの最大サイズは 10 GB、最大 1,000 サブディレクトリまでです。</p></td>
   </tr>
</table>

詳細については、[ストレージオプション](./data-import-storage-options) および [フォーマットオプション](./data-import-format-options) を参照してください。

## コンソールでのバックアップ\{#backup-on-console}

手動で作成されたバックアップは永続的に保持されます。

自動的に作成されたバックアップの最大保持期間は 30 日間です。

## コンソールでの復元\{#restore-on-console}

バックアップファイルと同じリージョンでバックアップファイルを復元できます。復元のターゲットクラスターは、元のクラスターと同じ CU タイプを使用する必要があります。

## IP アクセスリスト\{#ip-access-list}

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>コンソール IP アクセス</p></td>
     <td><p>100</p></td>
     <td><p>コンソール IP 許可リストに最大 100 個の IP アドレスを追加できます。</p></td>
   </tr>
   <tr>
     <td><p>クラスター IP アクセス</p></td>
     <td><p>100</p></td>
     <td><p>クラスター IP 許可リストに最大 100 個の IP アドレスを追加できます。</p></td>
   </tr>
</table>

## 移行\{#migration}

他のベンダーから Zilliz Cloud クラスターにデータを移行でき、移行ごとの最大コレクション数は、Zilliz Cloud クラスターのサブスクリプションプランによって異なります。

<table>
   <tr>
     <th><p>ターゲットクラスターのサブスクリプションプラン</p></th>
     <th><p>移行ごとの最大コレクション数</p></th>
   </tr>
   <tr>
     <td><p>無料</p></td>
     <td><p>5</p></td>
   </tr>
   <tr>
     <td><p>Serverless / 専用</p></td>
     <td><p>10</p></td>
   </tr>
</table>

