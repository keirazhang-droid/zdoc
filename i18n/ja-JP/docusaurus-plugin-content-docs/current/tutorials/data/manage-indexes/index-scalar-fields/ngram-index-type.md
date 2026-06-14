---
title: "NGRAM | Cloud"
slug: /ngram-index-type
sidebar_key: ngram-index-type
sidebar_label: "NGRAM"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud の `NGRAM` インデックスは、`VARCHAR` フィールドまたは `JSON` フィールド内の特定の JSON パスに対する `LIKE` クエリと該当する正規表現フィルターを高速化します。インデックスを構築する前に、Zilliz Cloud はテキストを固定長 n の短い重なり合う部分文字列（n-gram と呼ばれます）に分割します。例えば、n=3 の場合、「Zilliz Cloud」は 3-gram 「Zil」「ill」「lli」「liz」「iz 」」「z C」「 Cl」「Clo」「lou」「oud」に分割されます（実際の例に合わせるため修正が必要かもしれませんが、原文の例は「Mil」「ilv」「lvu」「vus」とされています）。それらの n-gram は各グラムをそれが現れるドキュメント ID にマッピングする転置インデックスに格納されます。クエリ時に、このインデックスにより Zilliz Cloud は元のフィルター条件を検証する前に、検索対象を少数の候補に迅速に絞り込むことができます。 | Cloud"
type: origin
token: Q0wpw4xZiimaUsk4GvScAg2un1d
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - スカラーフィールド
  - VARCHAR
  - n-gram

---

import Admonition from '@theme/Admonition';


# NGRAM

Zilliz Cloud の `NGRAM` インデックスは、`VARCHAR` フィールド、または `JSON` フィールド内の特定の JSONパスに対する `LIKE` クエリおよび該当する正規表現フィルターを高速化します。インデックスを構築する前に、Zilliz Cloud はテキストを固定長 *n* の短い重複する部分文字列（*n-gram*）に分割します。例えば、*n = 3* の場合、単語 *"Zilliz Cloud"* は 3-gram に分割されます: *"Mil"*, *"ilv"*, *"lvu"*, *"vus"*。これらの n-gram は、各グラムが出現するドキュメント ID にマッピングする転置インデックスに格納されます。クエリ時には、このインデックスにより Zilliz Cloud は元のフィルター条件を検証する前に、検索範囲を少数の候補に迅速に絞り込むことができます。

次のような高速な接頭辞、接尾辞、中間一致、ワイルドカード、または該当する正規表現フィルタリングが必要な場合に使用します。

- `name LIKE "data%"`

- `title LIKE "%vector%"`

- `path LIKE "%json"`

- `message =~ "error.*timeout"`

- `url =~ "/api/v[0-9]+/users"`

<Admonition type="info" icon="📘" title="Notes">

`LIKE` および正規表現フィルター式の構文の詳細については、[パターンマッチング](./undefined) を参照してください。

</Admonition>

## 仕組み\{#how-it-works}

Zilliz Cloud は、`NGRAM` インデックスを 2 段階のプロセスで実装します。

1. **インデックスの構築**: 各ドキュメントに対して n-gram を生成し、取り込み時に転置インデックスを構築します。

1. **クエリの高速化**: インデックスを使用して少数の候補セットにフィルタリングし、その後完全一致を検証します。

### フェーズ 1: インデックスの構築\{#phase-1-build-the-index}

データ取り込み中、Zilliz Cloud は次の 2 つの主要な手順を実行して NGRAM インデックスを構築します。

1. **テキストを n-gram に分解する**: Zilliz Cloud は、ターゲットフィールド内の各文字列にわたって *n* のウィンドウをスライドさせ、重複する部分文字列（*n-gram*）を抽出します。これらの部分文字列の長さは、設定可能な範囲 `[min_gram, max_gram]` 内に収まります。

- `min_gram`: 生成する最短の n-gram。これは、インデックスの恩恵を受けられる最小のクエリ部分文字列の長さも定義します。

- `max_gram`: 生成する最長の n-gram。クエリ時には、長いクエリ文字列を分割する際の最大ウィンドウサイズとしても使用されます。

例えば、`min_gram=2`、`max_gram=3` の場合、文字列 `"AI database"` は次のように分解されます。

![Ngram インデックスの構築](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png)

- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

<div class="alert note">

- 範囲 `[min_gram, max_gram]` の場合、Zilliz Cloud はその間のすべての長さ（両端を含む）の n-gram を生成します。例えば、`[2,4]` と単語 `"text"` の場合、Zilliz Cloud は以下を生成します。

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- n-gram 分解は文字ベースであり、言語に依存しません。例えば、中国語では、`"向量数据库"` を `min_gram = 2` で分解すると、`"向量"`、`"量数"`、`"数据"`、`"据库"` となります。

- スペースや句読点も分解時には文字として扱われます。

- 分解時は元の大文字小文字が保持され、マッチングは大文字小文字を区別します。例えば、`"データベース"` と `"database"` は異なる n-gram を生成し、クエリ時には正確な大文字小文字の一致が必要です。

</div>

1. **転置インデックスを構築する**: 生成された各 n-gram を、その n-gram を含むドキュメント ID のリストにマッピングする **転置インデックス** が作成されます。

例えば、2-gram `"AI"` がドキュメント ID 1、5、6、8、9 に出現する場合、インデックスは `{"AI": [1, 5, 6, 8, 9]}` を記録します。このインデックスはクエリ時に検索範囲を迅速に絞り込むために使用されます。

![Ngram インデックスの構築 2](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png)

<div class="alert note">

`[min_gram, max_gram]` の範囲が広いほど、より多くのグラムと大きなマッピングリストが作成されます。メモリが不足している場合は、非常に大きなポスティングリストに対して mmap モードの使用を検討してください。詳細については、[mmap の使用](./use-mmap) を参照してください。

</div>

### フェーズ 2: クエリの高速化\{#phase-2-accelerate-queries}

`LIKE` フィルターまたは該当する正規表現フィルターが実行されると、Zilliz Cloud は次の手順で NGRAM インデックスを使用してクエリを高速化します。

![クエリの高速化](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png)

1. **クエリ用語の抽出**: `LIKE` 式からワイルドカードを含まない連続した部分文字列が抽出されます（例: `"%database%"` は `"database"` になります）。正規表現フィルターの場合、Zilliz Cloud は可能な限り正規表現パターンから固定のリテラル部分文字列を抽出します。例えば、`message =~ "error.*timeout"` にはリテラル `error` と `timeout` が含まれます。

1. **クエリ用語の分解**: クエリ用語は、その長さ (`L`) と `min_gram` および `max_gram` の設定に基づいて *n-gram* に分解されます。

- `L < min_gram` の場合、インデックスは使用できず、クエリはフルスキャンにフォールバックします。

- `min_gram ≤ L ≤ max_gram` の場合、クエリ用語全体が単一の n-gram として扱われ、それ以上の分解は不要です。

- `L > max_gram` の場合、クエリ用語は `max_gram` に等しいウィンドウサイズを使用して重複するグラムに分割されます。

例えば、`max_gram` が `3` に設定され、クエリ用語が長さ **8** の `"database"` の場合、`"dat"`、`"ata"`、`"tab"` などの 3-gram 部分文字列に分解されます。

1. **各グラムの検索と積集合の取得**: Zilliz Cloud は、転置インデックス内の各クエリグラムを検索し、結果のドキュメント ID リストの積集合を計算して、少数の候補ドキュメントセットを見つけます。これらの候補には、クエリのすべてのグラムが含まれています。

1. **結果の検証と返却**: 元の `LIKE` または正規表現フィルターが、少数の候補セットに対してのみ最終チェックとして適用され、完全一致を見つけます。

## NGRAM インデックスの作成\{#create-an-ngram-index}

`VARCHAR` フィールド、または `JSON` フィールド内の特定のパスに対して NGRAM インデックスを作成できます。

### 例 1: VARCHAR フィールドに作成\{#example-1-create-on-a-varchar-field}

`VARCHAR` フィールドの場合、単に `field_name` を指定し、`min_gram` と `max_gram` を構成します。

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT") # Replace with your server address

# Assume you have defined a VARCHAR field named "text" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add NGRAM index on the "text" field
# highlight-start
index_params.add_index(
    field_name="text",   # Target VARCHAR field
    index_type="NGRAM",           # Index type is NGRAM
    index_name="ngram_index",     # Custom name for the index
    min_gram=2,                   # Minimum substring length (e.g., 2-gram: "st")
    max_gram=3                    # Maximum substring length (e.g., 3-gram: "sta")
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="Documents",
    index_params=index_params
)
```

この設定により、`text` 内の各文字列に対して 2-gram および 3-gram が生成され、転置インデックスに格納されます。

### 例 2: JSONパス上に作成する\{#example-2-create-on-a-json-path}

`JSON` フィールドの場合、gram 設定に加えて、以下の項目も指定する必要があります。

- `params.json_path` – インデックスを作成したい値を指す JSONパス。

- `params.json_cast_type` – NGRAM インデックスは文字列に対して動作するため、`"varchar"`（大文字小文字を区別しない）でなければなりません。

```python
# Assume you have defined a JSON field named "json_field" in your collection schema, with a JSON path named "body"

# Prepare index parameters
index_params = client.prepare_index_params()

# Add NGRAM index on a JSON field
# highlight-start
index_params.add_index(
    field_name="json_field",              # Target JSON field
    index_type="NGRAM",                   # Index type is NGRAM
    index_name="json_ngram_index",        # Custom index name
    min_gram=2,                           # Minimum n-gram length
    max_gram=4,                           # Maximum n-gram length
    params={
        "json_path": "json_field[\"body\"]",  # Path to the value inside the JSON field
        "json_cast_type": "varchar"                  # Required: cast the value to varchar
    }
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="Documents",
    index_params=index_params
)
```

この例では:

- インデックスが作成されるのは、`json_field["body"]` の値のみです。

- 値は n-gram トークン化の前に `VARCHAR` にキャストされます。

- Zilliz Cloud は長さ 2 から 4 の部分文字列を生成し、それらを転置インデックスに格納します。

JSON フィールドのインデックス作成方法の詳細については、[JSON インデックス作成](./json-indexing) を参照してください。

## NGRAM によって高速化されるクエリ\{#queries-accelerated-by-ngram}

NGRAM インデックスを適用するには:

- クエリは `NGRAM` インデックスを持つ `VARCHAR` フィールド (または JSONパス) を対象とする必要があります。

- `LIKE` パターンのリテラル部分は少なくとも `min_gram` 文字の長さが必要です。

    *(例えば、最短のクエリ用語が 2 文字の場合は、インデックス作成時に min_gram=2 に設定します。)*

サポートされているクエリタイプ:

- **前方一致**

```python # Match any string that starts with the substring "database" filter = 'text LIKE "database%"'` ``

- **Suffix match**

```python # "database" で終わる任意の文字列に一致 filter = 'text LIKE "%database"'` ``

- **中間一致**

```python # Match any string that contains the substring "database" anywhere filter = 'text LIKE "%database%"'` ``

- **Wildcard match**

Zilliz Cloud supports both `%` (zero or more characters) and `_` (exactly one character).

```python # "st"が最初に現れ、後で"um"が現れる任意の文字列にマッチ filter = 'text LIKE "%st%um%"'` ``

- **JSONパス クエリ**

```python filter = 'json_field["body"] LIKE "%database%"'` ``

- **Regex filter**

```python # "error" を含み、その後に "timeout" が続くログメッセージをマッチさせる filter = 'text =~ "error.*timeout"'` ``

- **JSONパスに対する正規表現フィルター**

```python filter = 'json_field["body"] =~ "error.*timeout"'` ``

For more information on filter expression syntax, refer to [Pattern Matching](./undefined).

## Drop an index\{#drop-an-index}

Use the `drop_index()` method to remove an existing index from a collection.

<Admonition type="info" icon="📘" title="Notes">

In your cluster compatible with **Milvus v2.6.x**, you can drop a scalar index directly once it’s no longer needed—no need to release the collection first.

</Admonition>

```python
client.drop_index(
    collection_name="Documents",   # コレクションの名前
    index_name="ngram_index" # 削除するインデックスの名前
)
```

## 使用上の注意\{#usage-notes}

- **フィールド型**: `VARCHAR` フィールドおよび `JSON` フィールドでサポートされます。JSON の場合は、`params.json_path` と `params.json_cast_type="varchar"` の両方を指定してください。

- **正規表現の高速化**: NGRAM は、Zilliz Cloud が正規表現パターンから固定のリテラル部分文字列を抽出できる場合にのみ、regex フィルターを高速化します。`[a-z]+` のようなパターンは固定リテラルを含まないため、スキャンにフォールバックする可能性があります。

- **大文字小文字を区別しない正規表現**: `(?i)` を含む正規表現パターンはサポートされますが、インデックスが元の大文字小文字を保持するため、NGRAM 最適化がスキップされる場合があります。

- **検証ステップ**: 正規表現フィルターの場合、NGRAM が候補を生成し、Zilliz Cloud が完全な RE2 正規表現パターンでそれらを検証するため、インデックス高速化によってマッチ結果が変更されることはありません。

- **Unicode**: NGRAM 分解は文字ベースで言語に依存せず、空白や句読点も含まれます。

- **空間的・時間的トレードオフ**: `[min_gram, max_gram]` のグラム範囲が広いほど、より多くのグラムとより大きなインデックスが生成されます。メモリが不足している場合は、大きなポスティングリストに対して `mmap` モードを検討してください。詳細については、[mmap の使用](./use-mmap) を参照してください。

- **不変性**: `min_gram` と `max_gram` はその場で変更できません。調整するにはインデックスを再構築してください。

## ベストプラクティス\{#best-practices}

- **検索動作に合わせて min_gram と max_gram を選択する**

    - `min_gram=2`、`max_gram=3` から始めてください。

    - `min_gram` は、ユーザーが入力すると思われる最短のリテラルに設定します。

    - `max_gram` は、意味のある部分文字列の典型的な長さに近い値を設定します。`max_gram` が大きいとフィルタリングが改善されますが、スペースが増加します。

- **選択性の低いグラムを避ける**

    繰り返しが多いパターン（例: `"aaaaaa"`）はフィルタリング効果が弱く、改善が限定的になる可能性があります。

- **一貫して正規化する**

    ユースケースで必要な場合は、取り込んだテキストとクエリリテラルに同じ正規化（例: 小文字化、トリミング）を適用します。

