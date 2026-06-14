---
title: "構造体配列演算子 | Cloud"
slug: /struct-array-filtering
sidebar_key: struct-array-filtering
sidebar_label: "構造体配列"
beta: PRIVATE
notebook: FALSE
description: "構造体の配列（StructArray）は、各エンティティに順序付けられた構造体要素のセットを保存します。配列内の各構造体は、スカラーサブフィールドとベクトルサブフィールドを含むことができる同じ事前定義されたスキーマを共有します。 | Cloud"
type: origin
token: VmGMwsTliiGZdFkzzeBckRNlnCh
sidebar_position: 7
keywords: 
  - zilliz
  - ベクトルデータベース
  - cloud
  - コレクション
  - データ
  - フィルター
  - フィルタリング式
  - フィルタリング
  - 構造体配列演算子

---

import Admonition from '@theme/Admonition';


# 構造体配列 演算子

構造体の配列、つまり 構造体配列 は、各エンティティに順序付けられた構造体要素のセットを格納します。配列内の各構造体は同じ事前定義されたスキーマを共有し、スカラー副フィールドおよびベクトル副フィールドを含むことができます。

構造体配列 演算子を使用して、構造体配列 内のスカラー副フィールドに対する条件でエンティティをフィルタリングします。

構造体配列 フィルタリングには2つの演算子ファミリーがあります。

<table>
   <tr>
     <th><p>演算子ファミリー</p></th>
     <th><p>結果の粒度</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p><code>element_filter</code></p></td>
     <td><p>要素レベル</p></td>
     <td><p>一致する構造体要素とその <code>offset</code> 値を返します。</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_&ast;</code></p></td>
     <td><p>行レベル</p></td>
     <td><p>述語を満たす構造体要素の数に基づいてエンティティを返します。</p></td>
   </tr>
</table>

`$[subField]` に対して述語を構築する場合、サポートされていれば大規模データセットに対して副フィールドにインデックスを作成してください。これらの演算子は配列要素全体にわたって述語を評価するためです。

## 要素フィルター\{#element-filter}

構造体配列 フィールド内の個々の構造体要素を一致させる必要がある場合は、`element_filter(structField, predicate)` を使用します。

述語内では、`$[subField]` を使用して現在の構造体要素の副フィールドを参照します。

```plaintext
element_filter(chunks, $[text] LIKE "Red%")
```

この式は、`chunks` 内の構造体要素のうち、`text` サブフィールドが `Red` で始まるものに一致します。

述語内で複数の条件が使用される場合、すべての `$[subField]` 参照は同じ構造体要素に適用されます:

```plaintext
element_filter(chunks, $[score] > 0.8 && $[text] LIKE "Red%")
```

エンティティレベルの述語と `element_filter` を組み合わせる場合、式の末尾に `element_filter` を配置します:

```plaintext
# Correct
id > 0 && element_filter(chunks, $[score] > 0.8)

# Incorrect
element_filter(chunks, $[score] > 0.8) && id > 0
```

`element_filter` はフィルター式に一度だけ出現できます。`element_filter` や `MATCH_*` を別の `element_filter` の中にネストしないでください。

## Match ファミリー演算子\{#match-family-operators}

エンティティを選択する際に、いくつの構造体要素が述語を満たすかに基づいて選択する場合は、`MATCH_*` 演算子を使用します。Match ファミリー演算子は行レベルのフィルターであり、要素の `offset` 値は返しません。

<table>
   <tr>
     <th><p>演算子</p></th>
     <th><p>意味</p></th>
   </tr>
   <tr>
     <td><p><code>MATCH_ANY(field, predicate)</code></p></td>
     <td><p>少なくとも 1 つの構造体要素が述語を満たす。</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_ALL(field, predicate)</code></p></td>
     <td><p>すべての構造体要素が述語を満たす。</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_LEAST(field, predicate, threshold=N)</code></p></td>
     <td><p>少なくとも <code>N</code> 個の構造体要素が述語を満たす。</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_MOST(field, predicate, threshold=N)</code></p></td>
     <td><p>多くとも <code>N</code> 個の構造体要素が述語を満たす。</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_EXACT(field, predicate, threshold=N)</code></p></td>
     <td><p>ちょうど <code>N</code> 個の構造体要素が述語を満たす。</p></td>
   </tr>
</table>

`MATCH_ANY` と `element_filter` はどちらも、少なくとも 1 つの構造体要素が述語を満たすことを表現できます。行レベルのフィルタリングのみが必要な場合は `MATCH_ANY` を使用します。要素レベルの結果が必要な場合、または要素レベルのベクトル検索に参加する構造体要素を制限する必要がある場合は、`element_filter` を使用します。

### MATCH_ANY\{#matchany}

`MATCH_ANY` は、配列内の少なくとも 1 つの要素が述語を満たす場合に `true` と評価されます。

```plaintext
MATCH_ANY(chunks, $[text] LIKE "Red%")
```

### MATCH_ALL\{#matchall}

`MATCH_ALL` は、配列内のすべての要素が述語を満たす場合に `true` と評価されます。

```plaintext
MATCH_ALL(chunks, $[text] LIKE "Red%")
```

空の構造体配列に対して、`MATCH_ALL` は `true` を返します。

### MATCH_LEAST\{#matchleast}

`MATCH_LEAST` は、述語を満たす要素の数が `threshold` 以上である場合に `true` と評価されます。

```plaintext
MATCH_LEAST(chunks, $[text] LIKE "Red%", threshold=3)
```

`MATCH_LEAST` の場合、`threshold` は正の整数である必要があります。

### MATCH_MOST\{#matchmost}

`MATCH_MOST` は、述語を満たす要素の数が `threshold` 以下である場合に `true` に評価されます。

```plaintext
MATCH_MOST(chunks, $[text] LIKE "Red%", threshold=3)
```

`MATCH_MOST` については、`threshold` はゼロまたは正の整数に設定できます。

### MATCH_EXACT\{#matchexact}

`MATCH_EXACT` は、述語を満たす要素の数が `threshold` と完全に等しい場合に `true` と評価されます。

```plaintext
MATCH_EXACT(chunks, $[text] LIKE "Red%", threshold=3)
```

`MATCH_EXACT` の場合、`threshold` は 0 または正の整数に設定できます。

## 構文ルール\{#syntax-rules}

- `MATCH_*` の名前は大文字と小文字を区別しません。

- `$[subField]` は `element_filter` または `MATCH_*` 述語内でのみ使用できます。

- `element_filter` や `MATCH_*` を `MATCH_*` 述語の中にネストしないでください。

- 空の 構造体配列 に対する `MATCH_ALL` は `true` を返します。

- 空の 構造体配列 に対する `MATCH_ANY` は `false` を返します。

## 関連項目\{#see-also}

- [構造体配列 を使用した検索](./undefined)

