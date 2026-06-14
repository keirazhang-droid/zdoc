---
title: "JSONインデックス | BYOC"
slug: /json-indexing
sidebar_key: json-indexing
sidebar_label: "インデックス作成"
beta: FALSE
notebook: FALSE
description: "JSONフィールドは、Zilliz Cloud で構造化メタデータを柔軟に保存する方法を提供します。インデックスがない場合、JSONフィールドに対するクエリは全コレクションスキャンが必要となり、データセットが大きくなるにつれて遅くなります。JSONインデックスは、JSONデータ内の特定のパスにインデックスを作成するため、そのパスに対する等価、範囲、その他のフィルタークエリが高速に実行されます。 | BYOC"
type: origin
token: MBVVww2Zii8k6Bk77GJcXbZJnpf
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - JSONフィールド
  - インデックス
  - パスインデックス
  - フラットインデックス

---

import Admonition from '@theme/Admonition';


# JSON インデックス

JSON フィールドは、Zilliz Cloud において構造化メタデータを柔軟に保存する方法を提供します。インデックスがない場合、JSON フィールドに対するクエリはコレクション全体のスキャンが必要となり、データセットが大きくなるにつれて低速になります。JSON インデックスを作成すると、JSON データ内の特定のパスに対してインデックスが作成されるため、そのパスに対する等価性、範囲、その他のフィルタークエリが高速に実行されます。

JSON インデックスは以下に最適です。

- 一貫性があり既知のキーを持つ構造化スキーマ
- 特定の JSON パスに対する等価性、`IN`、範囲、テキスト一致クエリ
- どのキーにインデックスを作成するかを正確に制御する必要があるシナリオ

多様なクエリパターンを持つ複雑な JSON ドキュメントの場合は、[JSON シュレッディング](./json-shredding) を代替手段として検討してください。

## インデックスタイプの概要\{#index-type-overview}

Zilliz Cloud は JSON パスに対して 4 つのインデックスタイプを提供します。それぞれが異なるクエリパターンに適しています。

インデックスタイプを選択する前に、JSON パスの **キャストタイプ** を特定してください。キャストタイプは、Zilliz Cloud がそのパスの値をどのように解釈し、どのインデックスタイプが利用可能かを決定します。

### キャストタイプを理解する\{#understand-cast-types}

`json_cast_type` は、`json_path` の値を解釈してインデックスを作成するために使用されるデータ型です。これはフィールドスキーマの型とは異なります。フィールドは依然として `JSON` フィールドですが、インデックス化された各パスは特定のスカラー、配列、または JSON オブジェクト型として扱われます。

パスに保存されている値に一致するキャストタイプを選択してください。キャストタイプが特定のインデックスタイプで機能するかどうかを確認するには、[互換性リファレンス](./json-indexing#compatibility-reference) を参照してください。

<table>
   <tr>
     <th><p>キャストタイプ</p></th>
     <th><p>パスの値が次の場合に使用</p></th>
     <th><p>値の例</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>真偽値</p></td>
     <td><p><code>true</code></p></td>
   </tr>
   <tr>
     <td><p><code>DOUBLE</code></p></td>
     <td><p>数値</p></td>
     <td><p><code>99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>文字列値</p></td>
     <td><p><code>"electronics"</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_BOOL</code></p></td>
     <td><p>真偽値の配列</p></td>
     <td><p><code>[true, false]</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_DOUBLE</code></p></td>
     <td><p>数値の配列</p></td>
     <td><p><code>[1.2, 3.14]</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_VARCHAR</code></p></td>
     <td><p>文字列の配列</p></td>
     <td><p><code>["tag1", "tag2"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>JSON</code></p></td>
     <td><p>JSON オブジェクト全体またはサブオブジェクト</p></td>
     <td><p><code>\{"supplier": \{"country": "USA"\}\}</code></p></td>
   </tr>
</table>

同じパスに値の型が一致しない場合、キャストタイプに一致する値のみがインデックス化されます。たとえば、`metadata["price"]` に `99.99` と `"99.99"` の両方が含まれている場合、`DOUBLE` キャストタイプのインデックスは数値のみを含み、文字列値はスキップされます。インデックス作成時に文字列値を変換するには、`json_cast_function` を使用します。[例5: インデックス作成時にデータ型を変換する](./json-indexing#example-5-convert-data-type-at-index-time) を参照してください。

### インデックスタイプを選択する\{#choose-an-index-type}

キャストタイプを選択したら、クエリパターンに応じてインデックスタイプを選択してください。

<table>
   <tr>
     <th><p>クエリパターン</p></th>
     <th><p>推奨インデックスタイプ</p></th>
     <th><p>キャストタイプの要件</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td><p>スカラー値に対する等価性と範囲フィルターの混合</p></td>
     <td><p><code>AUTOINDEX</code></p></td>
     <td><p><code>BOOL</code>、<code>DOUBLE</code>、または <code>VARCHAR</code> を使用。</p></td>
     <td><p>Zilliz Cloud が値のカーディナリティに基づいて内部インデックス構造を選択します。</p></td>
   </tr>
   <tr>
     <td><p>JSON 配列内の値に対するフィルター</p></td>
     <td><p><code>INVERTED</code></p></td>
     <td><p><code>ARRAY_BOOL</code>、<code>ARRAY_DOUBLE</code>、または <code>ARRAY_VARCHAR</code> を使用。</p></td>
     <td><p>すべての配列キャストタイプで必須です。</p></td>
   </tr>
   <tr>
     <td><p>オブジェクト全体またはサブオブジェクトのインデックス作成</p></td>
     <td><p><code>INVERTED</code> または <code>AUTOINDEX</code></p></td>
     <td><p><code>JSON</code> を使用。</p></td>
     <td><p><code>AUTOINDEX</code> は <code>JSON</code> キャストタイプの場合、カーディナリティベースの選択ではなく <code>INVERTED</code> を使用します。</p></td>
   </tr>
   <tr>
     <td><p>数値またはソート可能な文字列に対する範囲フィルター</p></td>
     <td><p><code>STL_SORT</code> または <code>AUTOINDEX</code></p></td>
     <td><p><code>DOUBLE</code> または <code>VARCHAR</code> を使用。</p></td>
     <td><p>ソートされた構造を強制するには <code>STL_SORT</code> を、自動選択が必要な場合は <code>AUTOINDEX</code> を使用します。</p></td>
   </tr>
   <tr>
     <td><p>低カーディナリティ値に対する等価性または <code>IN</code> フィルター</p></td>
     <td><p><code>BITMAP</code> または <code>AUTOINDEX</code></p></td>
     <td><p><code>BOOL</code> または <code>VARCHAR</code> を使用。</p></td>
     <td><p>ビットマップ構造を強制するには <code>BITMAP</code> を使用します。数値の場合は <code>AUTOINDEX</code> または <code>STL_SORT</code> を使用してください。</p></td>
   </tr>
</table>

迷った場合は、スカラーパスにはまず `AUTOINDEX` から始めてください。配列キャストタイプやテキスト一致クエリには明示的に `INVERTED` を使用します。オブジェクト全体の JSON インデックス作成には、`INVERTED` または `AUTOINDEX` のいずれかを使用します。

### AUTOINDEX\{#autoindex}

`AUTOINDEX` の動作は、指定した `json_cast_type` によって異なります。

<table>
   <tr>
     <th><p>キャストタイプ</p></th>
     <th><p><code>AUTOINDEX</code> の動作</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code>、<code>DOUBLE</code>、<code>VARCHAR</code></p></td>
     <td><p>値のカーディナリティに基づいて <code>BITMAP</code> と <code>STL_SORT</code> を選択します。</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_BOOL</code>、<code>ARRAY_DOUBLE</code>、<code>ARRAY_VARCHAR</code></p></td>
     <td><p>サポートされていません。インデックスタイプとして明示的に <code>INVERTED</code> を使用してください。</p></td>
   </tr>
   <tr>
     <td><p><code>JSON</code></p></td>
     <td><p>オブジェクト全体またはサブオブジェクトのインデックス作成に <code>INVERTED</code> を使用します。</p></td>
   </tr>
</table>

スカラーキャストタイプ（`BOOL`、`DOUBLE`、`VARCHAR`）の場合、`AUTOINDEX` は Zilliz Cloud に内部インデックス構造を任せたい場合の推奨開始点です。インデックス構築時に、Zilliz Cloud は JSON パスの値の **カーディナリティ**（そのパスにおける異なる値の数）を測定します。

カーディナリティに基づいて、Zilliz Cloud は以下の 2 つの内部構造のいずれかを選択します。

- **低カーディナリティ**: 値が頻繁に繰り返される場合（例: `metadata["in_stock"]` の `true` と `false`、または少数のステータス文字列を持つ `metadata["status"]`）。Zilliz Cloud は内部で `BITMAP` インデックスを構築し、等価性や `IN` フィルターを高速化します。

- **高カーディナリティ**: ほとんどの値が一意である場合（例: `metadata["price"]`、`metadata["created_at"]`、`metadata["product_id"]`）。Zilliz Cloud は内部で `STL_SORT` インデックスを構築し、`>`、`<`、`>=`、`<=` などの範囲フィルターを高速化します。

デフォルトの `BITMAP` 対 `STL_SORT` の閾値は **100 の異なる値** です。この閾値は `bitmap_cardinality_limit` で調整できます。[AUTOINDEX の BITMAP 対 STL_SORT の閾値を調整する方法](./json-indexing#how-do-i-tune-autoindexs-bitmap-vs-stlsort-threshold)[?](./json-indexing#how-do-i-tune-autoindexs-bitmap-vs-stlsort-threshold) を参照してください。

### INVERTED\{#inverted}

`INVERTED` は、テキスト一致クエリ、配列インデックス作成、またはオブジェクト全体の JSON インデックス作成が必要な場合に最適です。

以下の場合は明示的に `INVERTED` を指定してください。

- JSON 配列内の値にインデックスを作成する必要がある場合。
- JSON オブジェクト全体またはサブオブジェクトにインデックスを作成し、`INVERTED` の動作を明示したい場合。
- 等価性、`IN`、範囲、テキスト一致、配列、オブジェクトレベルのクエリを 1 つのインデックスタイプで処理したいが、インデックスサイズが大きくなることを許容する場合。

JSON オブジェクト全体（`json_cast_type="JSON"`）の場合、`INVERTED` または `AUTOINDEX` のいずれかを使用できます。`AUTOINDEX` はこのキャストタイプに対して `INVERTED` を使用します。

詳細については、[INVERTED](./inverted-index-type) を参照してください。

### STL_SORT\{#stlsort}

`STL_SORT` は JSON パスの値をソートされた順序で保存します。数値またはソート可能な文字列値に対する範囲フィルターに最適化されています。

`STL_SORT` は `DOUBLE` および `VARCHAR` キャストタイプのみをサポートします。以下の場合に使用してください。

- フィルターが `>`、`<`、`>=`、`<=` で値を比較する場合。
- インデックス化された値のカーディナリティが高い場合（価格、タイムスタンプ、ID、ソート可能なコードなど）。
- `AUTOINDEX` に任せる代わりにソートされた構造を強制したい場合。

`STL_SORT` は `BOOL`、`ARRAY_*`、`JSON` キャストタイプをサポートしません。配列やオブジェクト全体のインデックス作成には `INVERTED` を使用してください。

詳細については、[STL_SORT](./slt-sort-index-type) を参照してください。

### BITMAP\{#bitmap}

`BITMAP` は JSON パスの各異なる値に対してコンパクトなビットマップを作成します。頻繁に繰り返される値に対する等価性や `IN` フィルターに最適化されています。

`BITMAP` は `BOOL` および `VARCHAR` キャストタイプのみをサポートします。以下の場合に使用してください。

- フィルターが `==` または `IN` を使用する場合。
- インデックス化された値のカーディナリティが低い場合（真偽値、ステータス値、少数のカテゴリなど）。
- `AUTOINDEX` に任せる代わりにビットマップ構造を強制したい場合。

`BITMAP` は `DOUBLE`、`ARRAY_*`、`JSON` キャストタイプをサポートしません。数値の場合は、代わりに `AUTOINDEX`、`STL_SORT`、または `INVERTED` を使用してください。

詳細については、[BITMAP](./bitmap-index-type) を参照してください。

### 互換性リファレンス\{#compatibility-reference}

次のマトリックスは、サポートされている「(キャストタイプ, インデックスタイプ)」の組み合わせをすぐに確認できるリファレンスです。

<table>
   <tr>
     <th><p>キャストタイプ</p></th>
     <th><p>説明</p></th>
     <th><p>値の例</p></th>
     <th><p>AUTOINDEX</p></th>
     <th><p>INVERTED</p></th>
     <th><p>STL_SORT</p></th>
     <th><p>BITMAP</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>真偽値（<code>true</code>/<code>false</code>）。</p></td>
     <td><p><code>true</code></p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
     <td><p>✓</p></td>
   </tr>
   <tr>
     <td><p><code>DOUBLE</code></p></td>
     <td><p>数値（整数または浮動小数点数）。</p></td>
     <td><p><code>99.99</code></p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>文字列値。</p></td>
     <td><p><code>"electronics"</code></p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_BOOL</code></p></td>
     <td><p>真偽値の配列。</p></td>
     <td><p><code>[true, false]</code></p></td>
     <td><p>—</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_DOUBLE</code></p></td>
     <td><p>数値の配列。</p></td>
     <td><p><code>[1.2, 3.14]</code></p></td>
     <td><p>—</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_VARCHAR</code></p></td>
     <td><p>文字列の配列。</p></td>
     <td><p><code>["tag1", "tag2"]</code></p></td>
     <td><p>—</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>JSON</code></p></td>
     <td><p>JSON オブジェクト全体またはサブオブジェクト。自動型推論とフラット化が行われます。</p></td>
     <td><p>任意のネストされたオブジェクト</p></td>
     <td><p>✓</p></td>
     <td><p>✓</p></td>
     <td><p>—</p></td>
     <td><p>—</p></td>
   </tr>
</table>

`—` とマークされたセルについては、インデックス作成時に Zilliz Cloud がリクエストを拒否します。配列キャストタイプの場合は、明示的に `INVERTED` を使用してください（`AUTOINDEX` は配列をカバーしません）。

## JSON インデックスを作成する\{#create-a-json-index}

このセクションでは、さまざまな形状の JSON データのインデックス作成について説明します。すべての例では、以下のサンプル構造を使用し、`metadata` という名前の `JSON` フィールドを含むコレクションがすでにあることを前提としています。

### サンプル JSON 構造\{#sample-json-structure}

```json
{
  "metadata": {
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "price": 99.99,
    "string_price": "99.99",
    "tags": ["clearance", "summer_sale"],
    "supplier": {
      "name": "SupplierX",
      "country": "USA",
      "contact": {
        "email": "support@supplierx.com",
        "phone": "+1-800-555-0199"
      }
    }
  }
}
```

### 基本設定\{#basic-setup}

以下の例では、Zilliz Cloud デプロイメントに接続された `MilvusClient` という名前の `client` と、`metadata` という名前の `JSON` フィールドを既に含むコレクションがあることを前提としています。これらを最初から設定する必要がある場合は、以下のブロックを展開してください。

<details>

<summary>接続してサンプルコレクションを作成する</summary>

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# Define a schema with a JSON field
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field("pk", DataType.INT64, is_primary=True, auto_id=False)
schema.add_field("vec", DataType.FLOAT_VECTOR, dim=4)
schema.add_field("metadata", DataType.JSON, nullable=True)

# Minimal vector index so the collection can be loaded
vec_index = client.prepare_index_params()
vec_index.add_index(field_name="vec", index_type="AUTOINDEX", metric_type="L2")

client.create_collection(
    collection_name="your_collection_name",
    schema=schema,
    index_params=vec_index,
)

# Insert one row that matches the sample JSON structure above
client.insert(
    collection_name="your_collection_name",
    data=[{
        "pk": 1,
        "vec": [0.1, 0.2, 0.3, 0.4],
        "metadata": {
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
        }
    }],
)
```

</details>

以下の例で追加されたインデックス定義を収集するための、index-params オブジェクトを準備します。

```python
index_params = client.prepare_index_params()
```

以下に続く各例は、`index_params.add_index(...)` の呼び出しを示しています。データに合ったものを選択し、同じ `index_params` オブジェクトに対して呼び出した後、最後に単一の `client.create_index(...)` 呼び出しですべてを適用します（インデックスの適用を参照）。

### 例 1: トップレベルのキーを AUTOINDEX でインデックスする\{#example-1-index-a-top-level-key-with-autoindex}

`category` フィールドにインデックスを付けて、製品カテゴリによる高速フィルタリングを実現します。`AUTOINDEX` を使用すると、データ内の異なるカテゴリの数に基づいて、Zilliz Cloud が `BITMAP` または `STL_SORT` を選択します。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="category_index",
    # highlight-start
    params={
        "json_path": 'metadata["category"]',
        "json_cast_type": "VARCHAR",
    }
    # highlight-end
)
```

### 例 2: ネストされたキーのインデックス作成\{#example-2-index-a-nested-key}

サプライヤー連絡先の検索のために、深くネストされた `email` フィールドにインデックスを作成します。`json_path` パラメータは、任意の深さのブラケット記法を受け入れます。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="email_index",
    # highlight-start
    params={
        "json_path": 'metadata["supplier"]["contact"]["email"]',
        "json_cast_type": "VARCHAR",
    }
    # highlight-end
)
```

### 例3: STL_SORTを使用した範囲クエリ\{#example-3-range-queries-with-stlsort}

パス上のクエリが範囲比較（`>`、`<`、`>=`、`<=`）によって支配されるとわかっている場合は、直接 `STL_SORT` を選択します。これにより、カーディナリティ測定がバイパスされ、ソートされたレイアウトがすぐに構築されます。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="STL_SORT",
    index_name="price_index",
    params={
        "json_path": 'metadata["price"]',
        "json_cast_type": "DOUBLE",
    }
)
```

インデックス作成後、`metadata["price"] > 50 AND metadata["price"] < 100` のような範囲クエリは、フルスキャンの代わりに二分探索を使用します。

### 例4: BITMAPによる等価クエリ\{#example-4-equality-queries-with-bitmap}

低カーディナリティキー（ステータスコード、ブール値、列挙型のような文字列）の場合は、直接 `BITMAP` を選択します。等価クエリと `IN` クエリはビットマップ操作になります。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="BITMAP",
    index_name="in_stock_index",
    params={
        "json_path": 'metadata["in_stock"]',
        "json_cast_type": "BOOL",
    }
)
```

`BITMAP` は、少数の異なる文字列値を持つ `status` カラムのようなフィールドにも非常に適しています。

### 例5: インデックス時にデータ型を変換する\{#example-5-convert-data-type-at-index-time}

数値データが誤って文字列として保存されている場合、インデックス構築中に `STRING_TO_DOUBLE` を使用して値を数値に変換します。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="string_to_double_index",
    params={
        "json_path": 'metadata["string_price"]',
        "json_cast_type": "DOUBLE",
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE",
    }
)
```

行の変換に失敗した場合（例：`"invalid"` のような非数値の文字列）、その行はインデックス作成時にスキップされます。

### 例6：JSONオブジェクト全体のインデックス作成\{#example-6-index-entire-json-objects}

`json_cast_type="JSON"` を設定すると、指定されたパスにある完全な構造がインデックス化されます。Zilliz Cloud はネストされたオブジェクトをパスにフラット化し、各値の型を自動的に推測します。パス内のすべてのキーが検索可能になります。

`AUTOINDEX` は `JSON` キャストタイプに対して透過的に `INVERTED` を使用します。これは、フラット化と型推論が転置インデックスの機能であるためです。

`metadata` オブジェクト全体をインデックス化します。

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="metadata_full_index",
    params={
        # highlight-start
        "json_path": "metadata",
        "json_cast_type": "JSON",
        # highlight-end
    }
)
```

または、サブオブジェクトをインデックス化します — たとえば、すべての `supplier` 情報:

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="supplier_index",
    params={
        # highlight-start
        "json_path": 'metadata["supplier"]',
        "json_cast_type": "JSON",
        # highlight-end
    }
)
```

オブジェクト全体にインデックスを作成すると、インデックスサイズが大きくなります。多様なクエリパターンを持つ深くネストされたドキュメントの場合は、JSONシュレッディングを検討してください。

### インデックスの適用\{#apply-the-index}

すべてのインデックスパラメータを追加したら、コレクションに適用します：

```python
client.create_index(
    collection_name="your_collection_name",
    index_params=index_params
)
```

インデックスビルドは非同期で実行されます。`client.describe_index(...)` を使用して特定のインデックスのビルド状態を確認できます — `state` フィールドには、ビルドが完了すると `完了` と表示され、`total_rows` / `indexed_rows` / `pending_index_rows` で進行状況が示されます。

```python
client.describe_index(
    collection_name="your_collection_name",
    index_name="category_index",
)
```

サンプル応答:

```json
{
  "json_path": "metadata[\"category\"]",
  "json_cast_type": "VARCHAR",
  "index_type": "AUTOINDEX",
  "field_name": "metadata",
  "index_name": "category_index",
  "total_rows": 20,
  "indexed_rows": 20,
  "pending_index_rows": 0,
  "state": "Finished"
}
```

`state` が `完了ed` を報告すると、インデックス付きパスに対するクエリは自動的に新しいインデックスを使用します。

`AUTOINDEX` エントリの場合、このレスポンスの `index_type` フィールドは `AUTOINDEX` として報告されます。Zilliz Cloud は現在、ビルド時にどの基本レイアウト（`BITMAP` または `STL_SORT`）が選択されたかを公開していません。この選択は内部最適化として扱ってください。等価、`IN`、および範囲クエリは、どのレイアウトが選択されても動作します。

## FAQ\{#faq}

### AUTOINDEX と明示的なインデックスタイプの選択方法\{#how-do-i-choose-between-autoindex-and-an-explicit-index-type}

まずは `AUTOINDEX` から始めてください。データのカーディナリティから適切なレイアウトを選択し、JSONパス上のほとんどの等価、`IN`、範囲クエリをカバーします。以下の場合は明示的なタイプを選択してください:

- クエリパターンがわかっている場合（例：常に範囲→ `STL_SORT`、低カーディナリティの等価→ `BITMAP`）で、カーディナリティ測定をスキップしたい場合。
- テキストマッチや部分文字列クエリが必要な場合→ `INVERTED`。
- 配列キャスト型またはJSONオブジェクト全体をインデックスする場合→ `INVERTED`（オブジェクト全体の場合は `AUTOINDEX`）。

### クエリのフィルタ式がインデックスされたキャスト型と異なる型を使用する場合の影響\{#what-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type}

フィルタ式がインデックスの `json_cast_type` と異なる型を使用する場合、Zilliz Cloud はインデックスを使用せず、データが許せば低速なブルートフォーススキャンにフォールバックする可能性があります。最適なパフォーマンスを得るには、常にフィルタ式をインデックスのキャスト型に合わせてください。例えば、数値インデックスが `json_cast_type="DOUBLE"` で作成された場合、数値フィルタ条件のみがインデックスを活用します。

### JSONキーがエンティティ間で一貫性のないデータ型を持つ場合\{#what-if-a-json-key-has-inconsistent-data-types-across-different-entities}

型の不整合は **部分インデックス** を引き起こす可能性があります。例えば、`metadata["price"]` が数値（`99.99`）と文字列（`"99.99"`）の両方で保存され、`json_cast_type="DOUBLE"` でインデックスを作成した場合、数値のみがインデックスされます。文字列形式のエントリはスキップされ、フィルタ結果に表示されません。`json_cast_function="STRING_TO_DOUBLE"` を使用してインデックス作成時に文字列を数値に変換するか、ソースデータを修正してすべてのエントリが1つの型になるようにしてください。

### 同じJSONキーに複数のインデックスを作成できますか？\{#can-i-create-multiple-indexes-on-the-same-json-key}

いいえ。Zilliz Cloud は、キャスト型やインデックスタイプに関係なく、`(field, json_path)` ペアごとに最大1つのインデックスを許可します。同じパスに `INVERTED` と `BITMAP` の両方のインデックスを作成したり、異なるキャスト型で2つのインデックスを作成することはできません。ただし、JSONオブジェクト全体にインデックスを作成し、そのオブジェクト内のネストされたキーに別のインデックスを作成することは可能です — それらは異なるパスです。

### AUTOINDEX の BITMAP vs STL_SORT しきい値を調整する方法\{#how-do-i-tune-autoindexs-bitmap-vs-stlsort-threshold}

デフォルトでは、`AUTOINDEX` はインデックス値の **個別値が100以下** の場合に `BITMAP` を選択し、それ以外の場合は `STL_SORT` を選択します。このしきい値は、インデックスパラメータに `"bitmap_cardinality_limit"` を追加することでオーバーライドできます（範囲: 1–1000）。

```python
index_params.add_index(
    field_name="metadata",
    index_type="AUTOINDEX",
    index_name="string_to_double_index",
    params={
    "json_path": 'metadata["category"]',
    "json_cast_type": "VARCHAR",
    # highlight-next-line
    "bitmap_cardinality_limit": 200,  # use BITMAP up to 200 distinct values
    }
)
```

ほとんどのユーザーはこれを調整する必要はありません。適度なカーディナリティを持つフィールドをビットマップ化したい場合は値を上げ、`AUTOINDEX` をより早く `STL_SORT` へ移行させたい場合は値を下げてください。`INVERTED`、`STL_SORT`、または `BITMAP` を明示的に指定した場合、この設定は無視されます。