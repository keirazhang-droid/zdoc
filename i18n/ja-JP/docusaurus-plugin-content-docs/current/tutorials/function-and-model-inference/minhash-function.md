---
title: "MinHash 関数 | Cloud"
slug: /minhash-function
sidebar_key: minhash-function
sidebar_label: "MinHash 関数"
beta: PRIVATE
notebook: FALSE
description: "MinHash 関数は、生のテキストをバイナリベクトルに変換し、文書間の Jaccard 類似度を近似します。テキストシャングリングと複数のハッシュ関数を適用して固定長のシグネチャベクトルを生成し、高速な近似重複検出と大規模な文書重複排除を可能にします。 | Cloud"
type: origin
token: EAwdw2ZbtiBKttk66FTctUebn7f
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 関数
  - モデル
  - 推論
  - テキスト
  - minhash lsh
  - minhash 関数

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MinHash 関数

**MinHash 関数**は、生のテキストを**バイナリベクトル**に変換し、ドキュメント間の [Jaccard 類似度](https://en.wikipedia.org/wiki/Jaccard_index) を近似します。テキストのシャイングリングと複数のハッシュ関数を適用して固定長のシグネチャベクトルを生成し、大規模な高速ニアデュプリケート検出とドキュメント重複排除を可能にします。

組み込み関数として、MinHash は Zilliz Cloud 内で実行され、外部のモデル推論や前処理を必要としません。生のテキストを挿入するだけで、Zilliz Cloud が自動的に MinHash シグネチャベクトルを生成します。

## 制限\{#limits}

- 出力フィールドは `BINARY_VECTOR` であり、`dim % 32 == 0` を満たす次元を持つ必要があります。これは、各 MinHash シグネチャが 32 ビットのハッシュ値であるためです。

- バイナリベクトルフィールドの `dim` は `32 * num_hashes` と等しくなる必要があります。不一致の場合はエラーが発生します。

- MinHash 関数の出力に `MINHASH_LSH` インデックスを使用する場合、`mh_element_bit_width` は `32` に設定する必要があります。

## MinHash の動作原理\{#how-minhash-works}

<details>

<summary>動作原理を展開して表示</summary>

[MinHash](https://en.wikipedia.org/wiki/MinHash) は、集合間の [Jaccard 類似度](https://en.wikipedia.org/wiki/Jaccard_index) を推定する局所性に敏感なハッシュ化手法です。Zilliz Cloud では、MinHash 関数は次のパイプラインに従います：入力として生のテキストを提供し、Zilliz Cloud は出力としてバイナリベクトルを生成します — 中間のすべてのステップは内部的に処理されます。

全体的なワークフローは、ドキュメントの取り込みとクエリ処理の両方で使用される**共有テキスト処理パイプライン**と、ストレージと取得のためのフェーズ固有の操作で構成されます。

![IaqkbFEh8oQgGSx6NsocFoSOnDo](https://zdoc-images.s3.us-west-2.amazonaws.com/iaqkbfeh8oqggsx6nsocfosondo.png "IaqkbFEh8oQgGSx6NsocFoSOnDo")

### 共有テキスト処理パイプライン\{#shared-text-processing-pipeline}

ドキュメントの取り込みとクエリ処理の両方が、生のテキストを同じ 4 段階の変換を通じて処理します：

1. **テキスト分析**: テキストは（`token_level` が `"word"` の場合）[アナライザー](./analyzer-overview) によって処理されるか、（`token_level` が `"char"` の場合）直接使用されます。単語レベルのトークン化では、入力フィールドに設定されたアナライザーを適用してテキストを用語に分割します — 例えば、`"milvus is vector db"` は `["milvus", "is", "vector", "db"]` になります。

1. **シャイングリング**: トークンは `shingle_size` サイズの重複する n-gram（シャイングル）に分割されます。例えば、単語レベルで 3-gram を使用する場合、トークン `["information", "retrieval", "is", "a", "field"]` は `["information retrieval is", "retrieval is a", "is a field"]` のようなシャイングルになります。

1. **MinHashシグネチャ生成**: 複数のハッシュ関数（H1, H2, ..., Hn、ここで n = `num_hashes`）がシャイングル集合に適用されます。各ハッシュ関数について、すべてのシャイングルを通じて最小のハッシュ値が選択されます。これらの最小値の集合が MinHash シグネチャを形成します — これは元のドキュメントの Jaccard 類似度を近似する固定長の表現です。

1. **バイナリベクトルエンコーディング**: 各シグネチャ値は 32 ビットのハッシュであり、完全なシグネチャは次元 `32 * num_hashes` の `BINARY_VECTOR` にパックされます。

### ドキュメントの取り込み\{#document-ingestion}

挿入時に、共有パイプラインによって生成されたバイナリベクトルは `MINHASH_LSH` インデックスに格納されます。このインデックスは、類似したシグネチャを同じバケットにグループ化する LSH（局所性に敏感なハッシュ化）テーブルを維持し、クエリ時の高速な候補取得を可能にします。

### クエリ処理\{#query-processing}

検索時に、クエリテキストは同じ共有パイプラインを通じてバイナリベクトルを生成します。このベクトルは `MINHASH_LSH` インデックスでの LSH ルックアップに使用され、類似している可能性の高い候補ペアを迅速に特定します。候補は推定 Jaccard 類似度でランク付けされ、上位 K 件の結果が返されます。

両方のパスが同じ変換ロジックを共有するため、内容が高度に重複する 2 つのドキュメントは類似した MinHash シグネチャを生成します。これにより、単語の順序、書式、またはわずかな言い回しが異なる場合でも、ニアデュプリケートを見つけることができます。

</details>

## 開始前に\{#before-you-start}

MinHash 関数を使用する前に、コレクションスキーマに以下を含めるように計画してください：

- **生のコンテンツ用のテキストフィールド**

    コレクションには、生のテキストを格納する `VARCHAR` フィールドを含める必要があります。このフィールドは MinHash 関数への入力として機能します。

- **テキストフィールド用のアナライザー**（単語レベルトークン化を使用する場合）

    `token_level` が `"word"`（デフォルト）に設定されている場合、テキストフィールドにはアナライザーが有効になっている必要があります。アナライザーは、シャイングリング前にテキストがどのようにトークン化されるかを定義します。デフォルトでは、Zilliz Cloud は `standard` アナライザーをテキスト分析に使用します。異なるアナライザーを設定するには、[ユースケースに適したアナライザーの選択](./choose-the-right-analyzer-for-your-use-case) を参照してください。

- **MinHash 出力用のバイナリベクトルフィールド**

    コレクションには、MinHash 関数によって生成されたバイナリベクトルを格納する `BINARY_VECTOR` フィールドを含める必要があります。次元は `32 * num_hashes` と等しくなる必要があります。

## ステップ 1: MinHash 関数を持つコレクションを作成する\{#step-1-create-a-collection-with-a-minhash-function}

MinHash 関数を使用するには、コレクションの作成時に定義します。この関数はコレクションスキーマの一部となり、データ挿入時と検索時に自動的に適用されます。

### スキーマフィールドの定義\{#define-schema-fields}

コレクションスキーマには、少なくとも 3 つのフィールドを含める必要があります：

- **プライマリフィールド**: コレクション内の各エンティティを一意に識別します。

- **テキストフィールド** (`VARCHAR`): 生のテキストドキュメントを格納します。`enable_analyzer=True` を設定して、Zilliz Cloud が MinHashシグネチャ生成のためにテキストを処理できるようにします。デフォルトでは、Zilliz Cloud はテキスト分析に `standard` アナライザーを使用します。異なるアナライザーを設定するには、[ユースケースに適したアナライザーの選択](./choose-the-right-analyzer-for-your-use-case) を参照してください。

- **バイナリベクトルフィールド** (`BINARY_VECTOR`): MinHash 関数によって自動的に生成されたバイナリベクトルを格納します。次元は `32 * num_hashes` と等しくなる必要があります。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT", token="YOUR_CLUSTER_TOKEN")

schema = client.create_schema()

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True, auto_id=True)
schema.add_field(field_name="document_content", datatype=DataType.VARCHAR, max_length=9000, enable_analyzer=True)
schema.add_field(field_name="binary_vector", datatype=DataType.BINARY_VECTOR, dim=8192)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

### MinHash 関数の定義\{#define-the-minhash-function}

MinHash 関数は、解析されたテキストをバイナリベクトルに変換し、ドキュメント間の Jaccard 類似度を近似します。

関数を定義し、スキーマに追加します:

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
minhash_function = Function(
    name="minhash_function",
    input_field_names=["document_content"], # Name of the VARCHAR field containing raw text
    output_field_names=["binary_vector"], # Name of the BINARY_VECTOR field for generated signatures
    function_type=FunctionType.MINHASH,
    params={
        "num_hashes": 256, # Number of hash functions; produces dim = 32 * 256 = 8192
        "shingle_size": 3, # N-gram size for shingling
    }
)

schema.add_function(minhash_function)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

**設定オプション**

MinHash 関数の `params` ディクショナリは、以下のパラメータを受け入れます。すべてのパラメータ名は **大文字と小文字を区別しません**。

<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>型</strong></p></th>
     <th><p><strong>デフォルト</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p><code>num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p><code>dim / 32</code> から導出</p></td>
     <td><p>シグネチャ生成のためのハッシュ関数の数。出力されるバイナリベクトルの次元は <code>32 &ast; num_hashes</code> に等しい。値を大きくすると、類似度推定の分散は減少しますが、計算量は増加します。推奨値: <code>256</code>（dim = 8192）。</p></td>
   </tr>
   <tr>
     <td><p><code>shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code>3</code></p></td>
     <td><p>シングリングの N-gram サイズ。単語レベル: 通常 1-3。文字レベル: 通常 2-6。</p></td>
   </tr>
   <tr>
     <td><p><code>hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code>"xxhash"</code></p></td>
     <td><p>使用するハッシュ関数。オプション: </p><ul><li><p><code>"xxhash"</code>（高速）</p></li><li><p><code>"sha1"</code>（低速、衝突耐性が高い）。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code>"word"</code></p></td>
     <td><p>トークン化レベル。オプション:</p><ul><li><p><code>"word"</code>: フィールドのアナライザーを使用してトークン化し、その後 n-gram シングリングを適用します。</p></li><li><p><code>"char"</code> / <code>"character"</code>: 生の文字に直接 n-gram シングリングを適用します（アナライザーは使用しません）。</p><p>単語レベルはより強いセマンティクスとより高い効率性を提供しますが、言語固有のトークン化に依存します。文字レベルは言語に依存しませんが、より高次元のシングルを生成し、セマンティクスは弱くなります。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code>1234</code></p></td>
     <td><p>MinHash 関数の初期化に使用するランダムシード。</p></td>
   </tr>
</table>

### インデックスの設定\{#configure-the-index}

MinHash バイナリベクトルに推奨されるインデックスタイプは `MINHASH_LSH` で、メトリックタイプは `MHJACCARD` です。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="binary_vector",
    index_type="MINHASH_LSH",
    metric_type="MHJACCARD",
    params={
        "mh_lsh_band": 128,
        "mh_element_bit_width": 32,
        "with_raw_data": True,
    },
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

### コレクションを作成する\{#create-the-collection}

上記で定義したスキーマとインデックスパラメータを使用してコレクションを作成します：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="dedup_collection",
    schema=schema,
    index_params=index_params,
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

## Step 2: ドキュメントを挿入する\{#step-2-insert-documents}

コレクションのセットアップが完了したら、テキストデータを挿入します。生のテキストを提供するだけでよく、MinHash 関数が各ドキュメントのバイナリベクトルを自動的に生成します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.insert(
    "dedup_collection",
    [
        {"document_content": "information retrieval is a field of study that helps users find relevant information in large datasets"},
        {"document_content": "information retrieval is a research field focused on helping users find relevant data in large collections"},
        {"document_content": "information retrieval is a field of research helping users search for relevant information in large datasets"},
    ],
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

## ステップ 3: MinHash を使用した検索\{#step-3-search-with-minhash}

データを挿入したら、生のテキストクエリを提供してニアデュプリケート（近似重複）ドキュメントを検索します。Zilliz Cloud はクエリテキストを自動的に MinHash バイナリベクトルに変換し、推定 Jaccard 類似度を使用して最も類似したドキュメントを取得します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
search_params = {
    "metric_type": "MHJACCARD",
    "params": {},
}

results = client.search(
    collection_name="dedup_collection",
    data=["information retrieval is a research field focused on helping users find relevant data in large collections"],
    anns_field="binary_vector",
    limit=3,
    output_fields=["document_content"],
    search_params=search_params,
)

for hits in results:
    for hit in hits:
        print(f"ID: {hit['id']}, Distance: {hit['distance']}")
        print(f"Document: {hit['entity']['document_content']}")
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>

<TabItem value='java'>

```c++
// cpp
```

</TabItem>
</Tabs>

## What's next\{#whats-next}

- [Full Text Search](./full-text-search): BM25 を使用して、ニアデュプリケート検出ではなく語彙的な関連性ランキングを行います。

- [Analyzer Overview](./analyzer-overview): テキストのトークン化のためのカスタムアナライザーを設定します。

- [MINHASH_LSH Index](./minhash-lsh): 再現率とパフォーマンスのための LSH パラメーターのチューニングについて学びます。

