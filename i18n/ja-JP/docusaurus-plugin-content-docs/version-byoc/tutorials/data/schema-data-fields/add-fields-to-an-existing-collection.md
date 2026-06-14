---
title: "コレクションスキーマの変更 | BYOC"
slug: /add-fields-to-an-existing-collection
sidebar_key: add-fields-to-an-existing-collection
sidebar_label: "コレクションスキーマの変更"
beta: FALSE
notebook: FALSE
description: "コレクションが開発から本番環境に移行するにつれて、各エンティティのフィールドは頻繁に変更されます。フィルタリングやアプリケーションロジックのために、`sourceuri` や `reviewstatus` などのスカラーフィールドを追加したり、アプリケーションが生成する埋め込み用の新しいベクトルフィールドを追加する場合があります。Alter Collection Schema を使用すると、コレクションを再作成することなく、サポートされているフィールドの変更をその場で行うことができます。 | BYOC"
type: origin
token: UR9SwucAIiQ2TYkc9EucsgvSnng
sidebar_position: 19
keywords: 
  - zilliz
  - ベクトルデータベース
  - cloud
  - コレクション
  - スキーマ
  - フィールドプロパティ
  - コレクションフィールドの追加

---

import Admonition from '@theme/Admonition';


# コレクションスキーマの変更

コレクションが開発から本番に移行するにつれて、各エンティティに関連するフィールドは頻繁に変更されます。フィルタリングやアプリケーションロジックのために `source_uri` や `review_status` などのスカラーフィールドを追加したり、アプリケーションが生成する埋め込みのために新しいベクトルフィールドを追加したりする場合があります。Alter Collection Schema を使用すると、コレクションを再作成する代わりに、サポートされているフィールドの変更をその場で行うことができます。

<Admonition type="info" icon="📘" title="Notes">

このガイドでは、既存のコレクションにおけるフィールドレベルのスキーマ変更について説明します。`VARCHAR` フィールドの `max_length` や `ARRAY` フィールドの `max_capacity` などのフィールドプロパティの変更については、Alter Collection Field を参照してください。動的フィールドの動作については、[Dynamic Field](./enable-dynamic-field) および [Modify Collection](./modify-collections) を参照してください。

</Admonition>

## 制限\{#limits}

- 追加するユーザー定義フィールドは NULL 許容である必要があります。`add_collection_field()` を呼び出すときに `nullable=True` を設定してください。既存のエンティティの場合、`default_value` を持つスカラーフィールドを追加しない限り、追加されたフィールドは `NULL` になります。

- ユーザー定義のスカラーフィールドの追加は Milvus 2.6.x 以降でサポートされています。ユーザー定義のベクトルフィールドの追加は Milvus 2.6.18 以降でサポートされています。

- フィールド名はコレクション内のフィールド間で一意である必要があります。

<Admonition type="info" icon="📘" title="Notes">

サポートされている追加および削除操作以外のスキーマ変更については、コレクションを再作成するか移行してください。

</Admonition>

## 既存のコレクションにフィールドを追加する\{#add-fields-to-an-existing-collection}

フィールド値の生成方法に基づいて、フィールド追加の方法を選択してください：

- フィルタリング、クエリ出力、またはアプリケーションロジックのために新しいメタデータが必要な場合は、[ユーザー定義のスカラーフィールドを追加](./add-fields-to-an-existing-collection#add-user-defined-scalar-fields) します。

- アプリケーションが埋め込みを生成し、ベクトル値を Zilliz Cloud に書き込む場合は、[ユーザー定義のベクトルフィールドを追加](./add-fields-to-an-existing-collection#add-user-defined-vector-fields) します。

これらの場合、フィールドの総数は Zilliz Cloud のフィールド数制限を超えることはできません。詳細については、[Zilliz Cloud の制限](./limits#fields) を参照してください。

### ユーザー定義のスカラーフィールドを追加する\{#add-user-defined-scalar-fields}

`add_collection_field()` を使用して、既存のコレクションにユーザー定義のスカラーフィールドを追加します。

これは、動的フィールドに任意のキーを保存するのとは異なります。スキーマ更新が利用可能になると、新しいスカラーフィールドはコレクションスキーマの通常の一部になります。このフィールドに値を挿入または upsert したり、サポートされている場合はインデックスを作成したり、クエリや検索フィルターで使用したり、クエリや検索の出力で返したりすることができます。

既存のエンティティは新しいフィールドが存在する前に挿入されたため、追加するすべてのユーザー定義スカラーフィールドは NULL 許容である必要があります：

- `nullable=True` で `default_value` なしでスカラーフィールドを追加した場合、既存のエンティティは新しいフィールドに対して `NULL` を返します。

- `nullable=True` で `default_value` ありでスカラーフィールドを追加した場合、既存のエンティティは `NULL` の代わりにデフォルト値を返します。

スカラーフィルター式は `NULL` のスカラー値と一致しません。詳細については、[NULL 許容フィールド](./nullable-fields) を参照してください。

**例: NULL 許容のスカラーフィールドを追加する**

次の例では、`product_catalog` という名前の既存のコレクションに、NULL 許容の `source` フィールドを追加します。

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# highlight-start
client.add_collection_field(
    collection_name="product_catalog",
    field_name="source",
    data_type=DataType.VARCHAR,
    max_length=128,
    nullable=True,
)
# highlight-end
```

フィールドが追加された後、コレクションに既に存在していたエンティティは、`source` に対して `NULL` を返します。新しいエンティティは、挿入またはアップサートの際に `source` を設定できます。

**例: デフォルト値を持つスカラーフィールドの追加**

既存のエンティティが `NULL` の代わりに具体的な値を返す必要がある場合は、フィールドを追加する際に `default_value` を指定します。次の例では、`review_status` フィールドを追加し、デフォルト値として `"unreviewed"` を使用します。

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# highlight-start
client.add_collection_field(
    collection_name="product_catalog",
    field_name="review_status",
    data_type=DataType.VARCHAR,
    max_length=32,
    nullable=True,
    default_value="unreviewed",
)
# highlight-end
```

フィールドが追加された後、コレクションに既存のエンティティは、`review_status` に対して `"unreviewed"` を返します。新しいエンティティは、異なる値を設定するか、値が提供されない場合はデフォルト値を使用できます。

### ユーザー定義のベクトルフィールドを追加する\{#add-user-defined-vector-fields}

アプリケーションが埋め込みを生成し、ベクトル値を Zilliz Cloud に書き込む場合、`add_collection_field()` を使用してユーザー定義のベクトルフィールドを追加します。

追加されるすべてのユーザー定義ベクトルフィールドはNULL許容である必要があります。既存のエンティティは、upsertまたはバックフィルワークフローを通じてベクトル値を書き込むまで、新しいベクトルフィールドに対して `NULL` を持ちます。新しいエンティティは挿入時にベクトルフィールドを含めることができます。ベクトル検索は、ベクトル値が `NULL` のエンティティをスキップします。詳細については、[NULL許容フィールド](./nullable-fields) を参照してください。

**例: NULL許容ベクトルフィールドの追加**

次の例では、既存のコレクションに `embedding_v2` という名前のNULL許容の密ベクトルフィールドを追加します。`dim` をアプリケーションが生成する埋め込みの次元数に設定します。

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# highlight-start
client.add_collection_field(
    collection_name="product_catalog",
    field_name="embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    dim=768,
    nullable=True,
)
# highlight-end
```

フィールドが追加された後、新しいベクトルフィールドにインデックスを作成してから検索してください:

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="embedding_v2",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_index(
    collection_name="product_catalog",
    index_params=index_params,
)
```

既存のエンティティは `embedding_v2` に対して `NULL` を持ち、このフィールドで検索するとスキップされます。既存のエンティティを `embedding_v2` で検索可能にするには、upsert ワークフローを通じて NULL ではないベクトル値を書き込みます。新しいエンティティは挿入時に `embedding_v2` を含めることができます。

## FAQ\{#faq}

### 追加されたユーザー定義フィールドが nullable でなければならないのはなぜですか？\{#why-must-added-user-defined-fields-be-nullable}

既存のエンティティは新しいフィールドが存在する前に挿入されたため、そのフィールドの値を持たない。`nullable=True` を設定すると、Zilliz Cloud はアプリケーションが値を書き込むまで、またはスカラーフィールドの場合はデフォルト値が適用されるまで、欠損値を `NULL` として表現できる。

このルールは、`add_collection_field()` で追加されたユーザー定義スカラーフィールドとユーザー定義ベクトルフィールドに適用する。関数によって生成されたベクトルフィールドには適用しない。これらは nullable にできない。

### ユーザー定義フィールドを追加した後、既存のエンティティはどうなりますか？\{#what-happens-to-existing-entities-after-i-add-a-user-defined-field}

ユーザー定義スカラーフィールドの場合、`default_value` を設定しない限り、既存のエンティティは `NULL` を返す。`default_value` を設定すると、既存のエンティティはそのデフォルト値を返す。

ユーザー定義ベクトルフィールドの場合、既存のエンティティは新しいベクトルフィールドに対して `NULL` を持つ。追加されたフィールドでのベクトル検索は、ベクトル値が `NULL` のエンティティをスキップする。既存のエンティティを新しいベクトルフィールドで検索可能にするには、upsert またはバックフィルワークフローを通じて NULL ではないベクトル値を書き込む。新しいエンティティは挿入時に新しいベクトルフィールドを含めることができる。

### コレクションスキーマを変更した後、待つ必要がありますか？\{#do-i-need-to-wait-after-altering-a-collection-schema}

通常、手動で待つ必要はない。次の操作が更新されたスキーマに依存する場合は、最初に `describe_collection()` を呼び出して、Zilliz Cloud が現在返すスキーマを確認できる。

分散デプロイメントでは、Zilliz Cloud のコンポーネントがコレクションメタデータを更新する間に短い伝搬ウィンドウが存在する可能性がある。スキーマ変更直後の操作がスキーマ関連のエラーで失敗した場合は、スキーマをリフレッシュして操作を再試行する。

### 動的フィールドキーと同じ名前のスカラーフィールドを追加するとどうなりますか？\{#what-happens-if-i-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key}

動的フィールドが有効な場合、既存の動的フィールドキーと同じ名前のスカラーフィールドを追加できる。新しいスカラーフィールドは、通常のクエリ出力で動的フィールドキーを隠すが、元の動的データは `$meta` に保持される。

例えば、既存のエンティティが `source` という名前の動的キーを保存しており、後で `source` という名前のスカラーフィールドを追加した場合、`source` の通常の出力はスカラーフィールドを参照する。元の動的値にアクセスするには、`$meta["source"]` などの $meta パス構文を使用する。