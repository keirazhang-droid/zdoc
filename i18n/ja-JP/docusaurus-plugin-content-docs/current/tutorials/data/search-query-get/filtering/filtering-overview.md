---
title: "フィルタリングの解説 | Cloud"
slug: /filtering-overview
sidebar_key: filtering-overview
sidebar_label: "概要"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloudは強力なフィルタリング機能を提供し、データの正確なクエリを可能にします。フィルター式を使用すると、特定のスカラーフィールドを対象にし、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、Zilliz Cloudクラスターでフィルター式を使用する方法を、クエリ操作に焦点を当てた例とともに説明します。これらのフィルターは検索や削除リクエストにも適用できます。 | Cloud"
type: origin
token: AIb1wNAE3iiKVSk8MHAcVA4QnJb
sidebar_position: 1
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - フィルター
  - フィルター式
  - フィルタリング

---

import Admonition from '@theme/Admonition';


# フィルタリングの説明

Zilliz Cloud は、データの正確なクエリを可能にする強力なフィルタリング機能を提供します。フィルター式を使用すると、特定のスカラーフィールドを対象とし、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、Zilliz Cloud クラスターでのフィルター式の使用方法を、クエリ操作に焦点を当てた例とともに説明します。これらのフィルターは、検索リクエストや削除リクエストにも適用できます。

## 基本演算子\{#basic-operators}

Zilliz Cloud は、データフィルタリングのためのいくつかの基本演算子をサポートしています。

- **比較演算子**: `==`、`!=`、`>`、`<`、`>=`、`<=` を使用すると、数値フィールドまたはテキストフィールドに基づいてフィルタリングできます。

- **範囲フィルターとパターンフィルター**: `IN`、`LIKE`、`=~`、`!~` は、値、ワイルドカードパターン、または正規表現パターンに一致します。文字列パターンの詳細については、[パターンマッチング](./undefined) を参照してください。

- **算術演算子**: `+`、`-`、`*`、`/`、`%`、`**` は、数値フィールドを含む計算に使用されます。

- **論理演算子**: `AND`、`OR`、`NOT` は、複数の条件を組み合わせて複雑な式を作成します。

- **IS NULL および IS NOT NULL 演算子**: `IS NULL` および `IS NOT NULL` 演算子は、フィールドに null 値（データの欠如）が含まれているかどうかに基づいてフィルタリングするために使用されます。詳細については、[基本演算子](./basic-filtering-operators) を参照してください。

### 例：色によるフィルタリング\{#example-filtering-by-color}

スカラーフィールド `color` に原色（赤、緑、青）を持つエンティティを見つけるには、次のフィルター式を使用します。

```python
filter='color in ["red", "green", "blue"]'
```

### 例：正規表現パターンでのフィルタリング\{#example-filtering-by-regex-pattern}

`message` フィールドに `E1001` などのエラーコードが含まれるエンティティを見つけるには、正規表現マッチ演算子 `=~` を使用します。

```python
filter='message =~ "E[0-9]{4}"'
```

Regex フィルターは部分一致を使用します。フィールド値全体がパターンに一致する必要がある場合は、`^` と `$` アンカーを追加します。詳細については、[パターンマッチング](./undefined) を参照してください。

### 例：JSON フィールドのフィルタリング\{#example-filtering-json-fields}

Zilliz Cloud では、JSON フィールド内のキーを参照できます。たとえば、`product` という JSON フィールドに `price` と `model` のキーがあり、特定のモデルで価格が 1,850 未満の製品を検索したい場合、次のフィルター式を使用します。

```python
filter='product["model"] == "JSN-087" AND product["price"] < 1850'
```

### 例: 配列フィールドのフィルタリング\{#example-filtering-array-fields}

`history_temperatures` という配列フィールドに、2000年以降の観測所が報告した平均気温の記録が含まれており、2009年（10番目に記録された値）の気温が23°Cを超える観測所を見つけたい場合、次の式を使用します:

```python
filter='history_temperatures[10] > 23'
```

これらの基本演算子の詳細については、[基本演算子](./basic-filtering-operators) を参照してください。

## Filter expression templates\{#filter-expression-templates}

CJK 文字を使用したフィルタリングでは、文字セットが大きくエンコーディングの違いがあるため、処理が複雑になる可能性があります。特に `IN` 演算子を使用する場合、パフォーマンスが低下する可能性があります。

Zilliz Cloud では、CJK 文字を扱う際のパフォーマンスを最適化するために、フィルター式テンプレートを導入しています。動的な値をフィルター式から分離することで、クエリエンジンはパラメータの挿入をより効率的に処理します。

年齢が `25` 歳以上で、`"北京"`（北京）または `"上海"`（上海）に住んでいる個人を検索するには、次のテンプレート式を使用します。

```python
filter = "age > 25 AND city IN ['北京', '上海']"
```

パフォーマンスを向上させるには、このパラメータ付きのバリエーションを使用してください:

```python
filter = "age > {age} AND city in {city}",
filter_params = {"age": 25, "city": ["北京", "上海"]}
```

このアプローチは解析オーバーヘッドを削減し、クエリ速度を向上させます。詳細については、[フィルタテンプレート](./filtering-templating) を参照してください。

## データ型固有の演算子\{#data-type-specific-operators}

Zilliz Cloud は、JSON、ARRAY、VARCHAR フィールドなどの特定のデータ型に対する高度なフィルタリング演算子を提供しています。

### JSON フィールド固有の演算子\{#json-field-specific-operators}

Zilliz Cloud は、JSON フィールドをクエリするための高度な演算子を提供し、複雑な JSON 構造内での正確なフィルタリングを可能にします。

- **JSON_CONTAINS(identifier, jsonExpr)**: JSON 式がフィールド内に存在するかどうかを確認します。

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter='json_contains(tags, "sale")'
```

**JSON_CONTAINS_ALL(identifier, jsonExpr)**: JSON 式のすべての要素が存在することを保証します。

```python
# JSON data: {"tags": ["electronics", "sale", "new", "discount"]}
filter='json_contains_all(tags, ["electronics", "sale", "new"])'
```

**JSON_CONTAINS_ANY(identifier, jsonExpr)**: JSON 式に少なくとも 1 つの要素が存在するエンティティをフィルターします。

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter='json_contains_any(tags, ["electronics", "new", "clearance"])'
```

JSON オペレーターの詳細については、[JSON オペレーター](./json-filtering-operators) を参照してください。

### ARRAY フィールド固有のオペレーター\{#array-field-specific-operators}

Zilliz Cloud は、配列フィールド向けの高度なフィルタリングオペレーターを提供しています。例えば、`ARRAY_CONTAINS`、`ARRAY_CONTAINS_ALL`、`ARRAY_CONTAINS_ANY`、`ARRAY_LENGTH` などがあり、配列データを細かく制御できます。

**ARRAY_CONTAINS**: 特定の要素を含むエンティティをフィルターします。

```python
filter="ARRAY_CONTAINS(history_temperatures, 23)"
```

**ARRAY_CONTAINS_ALL**: リスト内のすべての要素が存在するエンティティをフィルターします。

```python
filter="ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])"
```

**ARRAY_CONTAINS_ANY**: リスト内のいずれかの要素を含むエンティティをフィルターします。

```python
filter="ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])"
```

**ARRAY_LENGTH**: 配列の長さに基づいてフィルターします。

```python
filter="ARRAY_LENGTH(history_temperatures) < 10"
```

配列演算子の詳細については、[ARRAY 演算子](./array-filtering-operators)を参照してください。

### VARCHAR フィールド固有の演算子\{#varchar-field-specific-operators}

Zilliz Cloud は、VARCHAR フィールドでのテキストベースの精密な検索のために専用の演算子を提供しています。

#### パターンマッチング演算子\{#pattern-matching-operators}

`LIKE`、`=~`、`!~` 演算子は、`VARCHAR` フィールド、JSON 文字列パス、特定の `ARRAY<VARCHAR>` 要素に対して文字列パターンを照合します。単純なワイルドカードパターンには `LIKE` を使用します。RE2 正規表現には `=~` と `!~` を使用します。

詳細については、[パターンマッチング](./undefined)を参照してください。

#### `TEXT_MATCH` 演算子\{#textmatch-operator}

`TEXT_MATCH` 演算子を使用すると、特定のクエリ用語に基づいて正確なドキュメント検索が可能になります。これは、スカラーフィルターとベクトル類似度検索を組み合わせたフィルタリング検索に特に役立ちます。セマンティック検索とは異なり、Text Match は正確な用語の出現に焦点を当てます。

Zilliz Cloud は Tantivy を使用して、転置インデックスと用語ベースのテキスト検索をサポートしています。プロセスは次のとおりです。

1. **アナライザー**: 入力テキストをトークン化して処理します。

1. **インデックス作成**: 一意のトークンをドキュメントにマッピングする転置インデックスを作成します。

詳細については、Text Match を参照してください。

#### `PHRASE_MATCH` 演算子 \{#phrasematch-operator}

**PHRASE_MATCH** 演算子を使用すると、クエリ用語の順序と隣接性の両方を考慮して、正確なフレーズ一致に基づいてドキュメントを正確に取得できます。

詳細については、Phrase Match を参照してください。