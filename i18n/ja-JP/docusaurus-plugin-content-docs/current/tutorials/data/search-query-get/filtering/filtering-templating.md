---
title: "フィルターテンプレート | Cloud"
slug: /filtering-templating
sidebar_key: filtering-templating
sidebar_label: "テンプレート"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud では、多くの要素を含む複雑なフィルター式、特にCJK文字のような非ASCII文字を含む場合、クエリのパフォーマンスに大きな影響を与える可能性があります。これに対処するため、Zilliz Cloud はフィルター式テンプレート化メカニズムを導入し、複雑な式の解析に要する時間を削減して効率を向上させます。このページでは、検索、クエリ、および削除操作でのフィルター式テンプレートの使用方法について説明します。 | Cloud"
type: origin
token: TumJwDYrhiDYcUkKsUIcuSnbnCf
sidebar_position: 4
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - フィルター
  - フィルター式
  - フィルタリング
  - フィルタリングテンプレート

---

import Admonition from '@theme/Admonition';


# フィルターテンプレート

Zilliz Cloud では、多数の要素を含む複雑なフィルター式、特に CJK 文字などの非 ASCII 文字を含むフィルター式がクエリー性能に大きな影響を与える可能性があります。この問題に対処するため、Zilliz Cloud ではフィルター式のテンプレート機能を導入し、複雑な式のパースにかかる時間を削減することで効率を向上させています。このページでは、検索・クエリー・削除操作におけるフィルター式テンプレートの使用方法について説明します。

## 概要\{#overview}

フィルター式テンプレート機能を使用すると、プレースホルダーを含むフィルター式を作成し、クエリー実行時にそのプレースホルダーを動的に値で置き換えることができます。テンプレートを使用することで、大きな配列や複雑な式をフィルター内に直接埋め込む必要がなくなり、パース時間を短縮してクエリー性能を向上させることができます。

たとえば、`age` および `city` の 2 つのフィールドを含むフィルター式があり、「年齢が 25 歳より大きく、かつ居住地が『北京』または『上海』である」人物をすべて検索したいとします。このような場合、フィルター式に直接値を埋め込む代わりに、以下のようなテンプレートを使用できます：

```python
filter = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
```

ここでは、`{age}` および `{city}` はプレースホルダーであり、クエリ実行時に `filter_params` の実際の値に置き換えられます。

Zilliz Cloud でフィルター式のテンプレート機能を使用することには、いくつかの重要な利点があります。

- **パース時間の短縮**: 大規模または複雑なフィルター式をプレースホルダーに置き換えることで、システムがフィルターのパースおよび処理に費やす時間を短縮できます。

- **クエリパフォーマンスの向上**: パースのオーバーヘッドが軽減されることで、クエリパフォーマンスが向上し、QPS が高まり、応答時間が短縮されます。

- **Scalability**: データセットが拡大し、フィルター式がより複雑になっても、テンプレート機能によりパフォーマンスを効率的かつスケーラブルに維持できます。

## Search 運用\{#search-operations}

Zilliz Cloud の検索運用では、`filter` 式を使用してフィルタリング条件を定義し、`filter_params` パラメータを使用してプレースホルダーの値を指定します。`filter_params` 辞書には、Zilliz Cloud がフィルター式内に置き換える動的な値が含まれています。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.search(
    "hello_milvus",
    vectors[:nq],
    filter=expr,
    limit=10,
    output_fields=["age", "city"],
    search_params={"params": {"search_list": 100}},
    filter_params=filter_params,
)
```

この例では、検索実行時に Zilliz Cloud が `{age}` を `25` に、`{city}` を `["北京", "上海"]` に動的に置き換えます。

## Query 運用\{#query-operations}

同じテンプレート機構を、Zilliz Cloud のクエリ運用にも適用できます。`query` 関数内でフィルター式を定義し、`filter_params` を使って置換する値を指定します。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.query(
    "hello_milvus",
    filter=expr,
    output_fields=["age", "city"],
    filter_params=filter_params
)
```

`filter_params` を使用することで、Zilliz Cloud は動的な値の挿入を効率的に処理し、クエリ実行の速度を向上させます。

## Delete 運用\{#delete-operations}

削除操作でもフィルター式のテンプレート機能を使用できます。検索およびクエリと同様に、`filter` 式で条件を定義し、`filter_params` でプレースホルダー用の動的値を提供します。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.delete(
    "hello_milvus",
    filter=expr,
    filter_params=filter_params
)
```

このアプローチにより、特に複雑なフィルター条件を扱う場合に、削除操作のパフォーマンスが向上します。

## Regex filter templates\{#regex-filter-templates}

フィルター式のテンプレートを正規表現フィルターと一緒に使用することができます。これは、リクエスト時に正規表現パターンが提供される場合に便利です。

```python
expr = "message =~ {pattern}"
filter_params = {"pattern": "E[0-9]{4}"}
res = client.query(
    "hello_milvus",
    filter=expr,
    output_fields=["message"],
    filter_params=filter_params,
)
```

テンプレートパラメーターを `!~` と一緒に使用することもできます:

```python
expr = "message !~ {pattern}"
filter_params = {"pattern": "^DEBUG"}
```

テンプレート値は、有効な RE2 正規表現パターンを含む文字列でなければなりません。Zilliz Cloud は、フィルターを実行する前にパターンを検証します。

フィルターテンプレートは、正規表現パターンをフィルター式に連結するのではなく、値として渡します。これにより、式の解析オーバーヘッドが軽減され、パターンに引用符や演算子が含まれている場合に誤ってフィルター構造が変更されるのを防ぎます。

## Conclusion\{#conclusion}

フィルター式のテンプレート化は、Zilliz Cloud でのクエリパフォーマンスを最適化するための必須ツールです。プレースホルダーと `filter_params` 辞書を使用することで、複雑なフィルター式の解析にかかる時間を大幅に削減できます。これにより、クエリの実行速度が向上し、全体的なパフォーマンスが向上します。