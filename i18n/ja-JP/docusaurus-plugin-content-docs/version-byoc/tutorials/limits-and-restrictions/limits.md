---
title: "Zilliz Cloud 制限 | BYOC"
slug: /limits
sidebar_key: limits
sidebar_label: "Zilliz Cloud 制限"
beta: FALSE
notebook: FALSE
description: "このページでは、Zilliz Cloud プラットフォームの制限について説明します。Zilliz が提供する OPS system を使用して、このページで言及されているほとんどの設定を調整できます。さらにサポートが必要な場合は、お問い合わせください。 | BYOC"
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

このページでは、Zilliz Cloud プラットフォームの制限に関する情報を提供します。Zilliz が提供する OPS システムを使用して、このページに記載されている設定のほとんどを調整できます。さらにサポートが必要な場合は、[お問い合わせ](https://support.zilliz.com/hc/en-us)ください。

## 組織とプロジェクト\{#organizations-and-projects}

次の表に、1 人のユーザーに許可される組織とプロジェクトの最大数の制限を示します。

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>プロジェクト</p></td>
     <td><p>100</p></td>
     <td><p>各ユーザーは 1 つの組織内に最大 100 個のプロジェクトを作成できます。</p></td>
   </tr>
</table>

## ユーザーとロール\{#users-and-roles}

次の表に、Zilliz Cloud で許可されるユーザーとロールの最大数の制限を示します。

<table>
   <tr>
     <th><p><strong>項目</strong></p></th>
     <th><p><strong>最大数</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>クラスターユーザー</p></td>
     <td><p>500</p></td>
     <td><p>1 つのクラスターには合計で最大 500 人のユーザーを含めることができます。</p></td>
   </tr>
   <tr>
     <td><p>クラスターカスタムロール</p></td>
     <td><p>500</p></td>
     <td><p>1 つのクラスターには合計で最大 500 個のカスタムロールを含めることができます。この制限を解除するには、<a href="http://support.zilliz.com">お問い合わせ</a>ください。</p></td>
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
     <td><p>各組織には、リソースの最適な活用とセキュリティのために、最大 100 個のカスタマイズされた APIキーを含めることができます。</p></td>
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

## クラスター\{#clusters}

### CU\{#cus}

CU はデータの並列処理に使用されるコンピューティングリソースの基本単位であり、CU タイプによって CPU、メモリ、ストレージの組み合わせが異なります。CU の概念は Dedicated クラスターにのみ適用されます。

<table>
   <tr>
     <th><p><strong>プロジェクトプランとクラスターデプロイオプション</strong></p></th>
     <th><p><strong>制限</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td><p>Standard プロジェクト内の Dedicated サービングクラスター</p></td>
     <td><p>CU サイズ &lt;=32</p></td>
     <td><p>コンソール上で、1 つのクラスターに最大 32 CU を作成できます。</p></td>
   </tr>
   <tr>
     <td><p>Enterprise プロジェクト内の Dedicated サービングクラスター</p></td>
     <td><p>CU サイズ x レプリカ数 &lt;=10,240</p></td>
     <td><p>コンソール上で、1 つのクラスターに最大 1,024 CU を作成できます。</p><p>ただし、レプリカが追加された場合、制限は CU サイズ x レプリカ数 &lt;=10,240 です。</p></td>
   </tr>
</table>

以下の場合は、[お問い合わせ](https://support.zilliz.com/hc/en-us)ください。

- Standard プロジェクトの Dedicated クラスターで 32 CU を超える必要がある場合

- Enterprise プロジェクトの Dedicated クラスターで 1,024 CU を超える必要がある場合

## レプリカ\{#replicas}

レプリカを追加するには、クラスターに **12 CU 以上**必要です。以下の制限も適用されます。

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
     <td><p>クラスターのレプリカ x クエリ CU は 10,240 を超えないようにしてください。</p></td>
   </tr>
</table>

## データベース\{#databases}

- 各 Serving-Dedicated クラスターは最大 1024 個のデータベースを持つことができます。

- デフォルトデータベースは削除できません。

## コレクション\{#collections}

Zilliz Cloud クラスター内のコレクションとパーティションの最大数は、割り当てられた CU の数と互換性のある Milvus バージョンによって異なります。以下の説明を参照し、クラスター内のコレクションとパーティションの最大数を計算できます。

CU ごとに最大 **1,024** のコレクションまたは **4,096** のパーティションを作成でき、1 つのコレクションあたり最大 **1,024** のパーティションが許可されます。次の式を使用して、クラスター内のコレクション数とパーティション数の上限を計算できます。

![I1aJwA2LShihxQbyG30cFm14ngf](https://zdoc-images.s3.us-west-2.amazonaws.com/I1aJwA2LShihxQbyG30cFm14ngf.png)

- クラスター内のコレクションの総数は、クラスター内の CU 数の 1,024 倍、または 16,384 のいずれか低い方未満である必要があります。

- クラスター内のすべてのコレクションにわたるパーティションの総数は、クラスターに割り当てられた CU 数の 4,096 倍、または 65,536 のいずれか低い方未満である必要があります。

- 両方の条件を満たす必要があります。

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
     <td><p>10</p></td>
   </tr>
</table>

フィールドに関するその他の制限:

- VarChar や JSON などの一部のフィールドは、予想よりも多くのメモリを使用し、クラスターがいっぱいになる可能性があります。

### 次元数\{#dimensions}

ベクトルフィールドの次元数の最大値は **32,768** です。

### シャード\{#shards}

許可されるシャードの最大数は、クラスターの CU サイズによって異なります。

<table>
   <tr>
     <th><p>CU サイズ</p></th>
     <th><p>最大数</p></th>
   </tr>
   <tr>
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

Zilliz Cloud は、コレクションとパーティションのデータ定義言語（DDL）操作（作成、ロード、リリース、削除を含む）にもレート制限を課します。次のレート制限は、Serverless クラスターと Dedicated クラスターの両方のコレクションに適用されます。

<table>
   <tr>
     <th></th>
     <th><p><strong>レート制限</strong></p></th>
   </tr>
   <tr>
     <td><p>コレクション DDL 操作 </p><p>(作成、ロード、リリース、削除)</p></td>
     <td><p>クラスターあたり 20 req/s</p></td>
   </tr>
   <tr>
     <td><p>パーティション DDL 操作</p><p>(作成、ロード、リリース、削除)</p></td>
     <td><p>クラスターあたり 20 req/s</p></td>
   </tr>
</table>

## 運用\{#operations}

このセクションでは、Zilliz Cloud クラスターにおける一般的なデータ操作のレート制限に焦点を当てます。

### Insert と Upsert\{#insert-and-upsert}

Insert 操作と Upsert 操作のレート制限は、クラスターデプロイオプションと使用中の CU の数によって異なります。

<table>
   <tr>
     <th></th>
     <th><p>最大 Insert および Upsert レート制限</p></th>
   </tr>
   <tr>
     <td><p>Dedicated クラスター</p></td>
     <td><p>16 MB/s + 1 MB/s × CU</p><p>最大 256 MB/s。</p></td>
   </tr>
</table>

例:

- `1 CU`: `17 MB/s`

- `8 CUs`: `24 MB/s`

- `64 CUs`: `80 MB/s`

- `240 CUs`: `256 MB/s`

- `>= 240 CUs`: 最大 `256 MB/s`

さらに、次の追加制限が適用されます:

- 単一シャードの書き込みレートは **32 MB/s** を超えてはなりません。

- データを挿入するときは、スキーマで定義されたすべてのフィールドを含めます。コレクションで AutoID が有効になっている場合は、主キーを除外します。

- Upsert データを実行するときは、スキーマで定義されたすべてのフィールドを含めます。

- 挿入または upsert されたエンティティを検索やクエリですぐに取得できるようにするには、検索またはクエリリクエストの一貫性レベルを **Strong** に変更することを検討してください。詳細については、[一貫性レベル](./consistency-level) を参照してください。

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
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>Int8/16/32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>Float32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

### Flush\{#flush}

Flush リクエストのレート制限は 1 秒あたり 0.1 リクエストで、特定のクラスタタイプのコレクションレベルで課されます。このレート制限は、Milvus v2.4.x 以降と互換性のあるクラスターに適用されます。

<Admonition type="info" icon="📘" title="Notes">

Flush 操作は手動で実行しないことをお勧めします。Zilliz Cloud クラスターが自動的に適切に処理します。

</Admonition>

### Load\{#load}

Load リクエストのレート制限は、クラスターあたり **20** req/s です。

<Admonition type="info" icon="📘" title="Notes">

既にロードされているコレクションに対しては、新しいデータがそのコレクションに到着している場合でも、ロードコレクションを実行する必要はありません。

</Admonition>

### Search\{#search}

各検索リクエスト/レスポンスは **64** MB を超えてはなりません。

各検索リクエストが運ぶクエリベクトルの数（通常 **nq** として知られる）は **16,384** を超えてはならず、各検索レスポンスが運ぶ数（通常 **topK** として知られる）は **16,384** エンティティを超えてはなりません。

### Query\{#query}

各クエリリクエスト/レスポンスは **64** MB を超えてはなりません。

各クエリレスポンスは、最大 16,384 エンティティ（通常 **topK** として知られる）を返します。

### Delete\{#delete}

各削除リクエスト/レスポンスは **64** MB を超えてはなりません。

削除リクエストのレート制限は、クラスターあたり **0.5** MB/s です。

### Drop\{#drop}

Drop リクエストのレート制限は、クラスターあたり **20** req/s です。

### データインポート\{#data-import}

1 つのコレクションで、実行中または保留中のインポートジョブを最大 **10,000** 個持つことができます。

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
     <td><p>最大合計インポートサイズは 1 TB、各ファイルの最大サイズは 10 GB、ファイル数は最大 1,000 です。</p></td>
   </tr>
   <tr>
     <td><p>Parquet</p></td>
     <td><p>1 GB</p></td>
     <td><p>最大合計インポートサイズは 1 TB、各ファイルの最大サイズは 10 GB、ファイル数は最大 1,000 です。</p></td>
   </tr>
   <tr>
     <td><p>Numpy</p></td>
     <td><p>サポートしていません</p></td>
     <td><p>最大合計インポートサイズは 1 TB、各サブディレクトリの最大サイズは 10 GB、サブディレクトリ数は最大 1,000 です。</p></td>
   </tr>
</table>

詳細については、[ストレージオプション](./data-import-storage-options) と [フォーマットオプション](./data-import-format-options) を参照してください。

## コンソールでのバックアップ\{#backup-on-console}

手動で作成されたバックアップは永続的に保持されます。

自動的に作成されたバックアップの最大保持期間は 30 日です。

## コンソールでの復元\{#restore-on-console}

バックアップファイルを、そのバックアップファイルの元のクラスターと同じリージョンに復元できます。復元先のクラスターは、元のクラスターと同じ CU タイプを使用する必要があります。

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
</table>

## 移行\{#migration}

他のベンダーから Zilliz Cloud クラスターにデータを移行できます。移行あたりの最大コレクション数は、Zilliz Cloud クラスターによって異なります。移行中に一度に移行できるコレクションは最大 **10** 個です。

