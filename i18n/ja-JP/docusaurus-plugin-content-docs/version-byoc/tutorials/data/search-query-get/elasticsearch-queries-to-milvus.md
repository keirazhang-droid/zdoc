---
title: "Elasticsearch クエリから Milvus へ | BYOC"
slug: /elasticsearch-queries-to-milvus
sidebar_key: elasticsearch-queries-to-milvus
sidebar_label: "Elasticsearch クエリから Milvus へ"
beta: FALSE
notebook: FALSE
description: "Elasticsearch は Apache Lucene 上に構築された主要なオープンソース検索エンジンです。しかしながら、現代の AI アプリケーションにおいて、高い更新コスト、リアルタイム性能の低さ、非効率なシャード管理、クラウドネイティブではない設計、そして過剰なリソース要求といった課題に直面しています。クラウドネイティブなベクトルデータベースとして、Milvus はストレージとコンピューティングの分離、高次元データに対する効率的なインデックス作成、そして現代のインフラとのシームレスな統合により、これらの問題を克服します。AI ワークロードに対して優れたパフォーマンスとスケーラビリティを提供します。 | BYOC"
type: origin
token: OFl9wHXpriM8aEkoONScpU1lnIf
sidebar_position: 17
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - フィルター
  - フィルター式
  - フィルタリング
  - Elasticsearch クエリ
  - クエリマッピング

---

import Admonition from '@theme/Admonition';


# Elasticsearch クエリから Milvus への移行

Apache Lucene 上に構築された Elasticsearch は、主要なオープンソース検索エンジンです。しかし、現代の AI アプリケーションにおいては、更新コストの高さ、リアルタイム性能の低さ、シャード管理の非効率性、クラウドネイティブでない設計、過剰なリソース要求といった課題に直面しています。一方、クラウドネイティブなベクトルデータベースである Milvus は、ストレージとコンピューティングの分離、高次元データ向けの効率的なインデックス、モダンなインフラストラクチャとのシームレスな統合により、これらの課題を克服します。Milvus は AI ワークロードに対して優れたパフォーマンスとスケーラビリティを提供します。

この記事では、Elasticsearch から Milvus へのコードベースの移行を支援し、両者間でのクエリ変換例をいくつか紹介します。

## 概要\{#overview}

Elasticsearch では、クエリコンテキスト内の操作は関連性スコアを生成しますが、フィルターコンテキスト内の操作はスコアを生成しません。同様に、Milvus の検索は類似度スコアを生成しますが、フィルターのようなクエリはスコアを生成しません。Elasticsearch から Milvus へのコードベース移行における重要な原則は、Elasticsearch のクエリコンテキストで使用されていたフィールドをベクトルフィールドに変換し、類似度スコアの生成を可能にすることです。

以下の表は、Elasticsearch のクエリパターンと Milvus における対応する同等機能の概要を示しています。

<table>
   <tr>
     <th><p>Elasticsearch Queries</p></th>
     <th><p>Milvus Equivalents</p></th>
     <th><p>Remarks</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Full-text queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#match-query">Match query</a></p></td>
     <td><p>全文検索</p></td>
     <td><p>Both provide similar sets of capabilities.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Term-level queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#ids">IDs</a></p></td>
     <td><p><code>in</code> operator</p></td>
     <td rowspan="6"><p>Both provide the same or similar set of capabilities when these Elasticsearch queries are used in the filter context.</p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#prefix-query">Prefix query</a></p></td>
     <td><p><code>like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#range-query">Range query</a></p></td>
     <td><p>Comparison operators like <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#term-query">Term query</a></p></td>
     <td><p>Comparison operators like <code>==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#terms-query">規約 query</a></p></td>
     <td><p><code>in</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#wildcard-query">Wildcard query</a></p></td>
     <td><p><code>like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#boolean-query">Boolean query</a></p></td>
     <td><p>Logical operators like <code>AND</code></p></td>
     <td><p>Both provide similar sets of capabilities when used in the filter context.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Vector queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#knn-query">kNN query</a></p></td>
     <td><p>Search</p></td>
     <td><p>Milvus provides more advanced vector search capabilities.</p></td>
   </tr>
   <tr>
     <td><p><a href="./elasticsearch-queries-to-milvus#reciprocal-rank-fusion">Reciprocal rank fusion</a></p></td>
     <td><p>Hybrid Search</p></td>
     <td><p>Milvus supports multiple reranking strategies.</p></td>
   </tr>
</table>

## 全文検索クエリ\{#full-text-queries}

Elasticsearch では、全文検索クエリを使用して、メール本文などの分析済みテキストフィールドを検索できます。クエリ文字列は、インデックス作成時にそのフィールドに適用されたのと同じアナライザーを使用して処理されます。

### Match クエリ\{#match-query}

Elasticsearch では、match クエリは指定されたテキスト、数値、日付、またはブール値に一致するドキュメントを返します。指定されたテキストはマッチング前に分析されます。

以下は、match クエリを使用した Elasticsearch 検索リクエストの例です。

```bash
resp = client.search(
    query={
        "match": {
            "message": {
                "query": "this is a test"
            }
        }
    },
)

```

Milvus は、全文検索機能を通じて同様の機能を提供します。上記の Elasticsearch クエリを次のように Milvus に変換できます。

```python
res = client.search(
    collection_name="my_collection",
    data=['How is the weather in Jamaica?'],
    anns_field="message_sparse",
    output_fields=["id", "message"]
)
```

上記の例では、`message_sparse` は `message` という名前の VarChar フィールドから派生したスパースベクトルフィールドです。Milvus は BM25 埋め込みモデルを使用して、`message` フィールドの値をスパースベクトル埋め込みに変換し、`message_sparse` フィールドに保存します。検索リクエストを受信すると、Milvus は同じ BM25 モデルを使用してプレーンテキストのクエリペイロードを埋め込み、スパースベクトル検索を実行し、`output_fields` パラメータで指定された `id` および `message` フィールドと、対応する類似性スコアを返します。

この機能を使用するには、`message` フィールドでアナライザーを有効にし、そこから `message_sparse` フィールドを派生させる関数を定義する必要があります。Milvus でアナライザーを有効にし、派生関数を作成する詳細な手順については、[全文検索](./full-text-search) を参照してください。

## Term-level queries\{#term-level-queries}

Elasticsearch では、term-level クエリは、日付範囲、IPアドレス、価格、製品 ID などの構造化データ内の正確な値に基づいてドキュメントを検索するために使用されます。このセクションでは、いくつかの Elasticsearch term-level クエリの Milvus での可能な同等機能について説明します。このセクションのすべての例は、Milvus の機能に合わせてフィルターコンテキスト内で動作するように調整されています。

### IDs\{#ids}

Elasticsearch では、フィルターコンテキストで ID に基づいてドキュメントを次のように検索できます。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "ids": {
                    "values": [
                        "1",
                        "4",
                        "100"
                    ]
                }            
            }
        }
    },
)
```

Milvus では、以下のように ID に基づいてエンティティを検索することもできます。

```python
# Use the filter parameter
res = client.query(
    collection_name="my_collection",
    filter="id in [1, 4, 100]",
    output_fields=["id", "title"]
)

# Use the ids parameter
res = client.query(
    collection_name="my_collection",
    ids=[1, 4, 100],
    output_fields=["id", "title"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html) で確認できます。Milvus のクエリおよび取得リクエスト、およびフィルタ式の詳細については、[Query](./get-and-scalar-query) および [Filtering](./filtering) を参照してください。

### Prefix query\{#prefix-query}

Elasticsearch では、フィルタコンテキスト内で指定されたフィールドに特定のプレフィックスが含まれるドキュメントを次のように検索できます。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                 "prefix": {
                    "user": {
                        "value": "ki"
                    }
                }           
            }
        }
    },
)

```

Milvus では、次のように指定したプレフィックスで始まる値を持つエンティティを検索できます。

```python
res = client.query(
    collection_name="my_collection",
    filter='user like "ki%"',
    output_fields=["id", "user"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html) で確認できます。Milvus の `like` 演算子の詳細については、[Using ](./basic-filtering-operators#example-2-using-like-for-pattern-matching)[`LIKE`](./basic-filtering-operators#example-2-using-like-for-pattern-matching)[ for Pattern Matching](./basic-filtering-operators#example-2-using-like-for-pattern-matching) を参照してください。

### Range query\{#range-query}

Elasticsearch では、指定した範囲内の語句を含むドキュメントを以下のように検索できます。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "range": {
                    "age": {
                        "gte": 10,
                        "lte": 20
                    }
                }           
            }
        }
    },
)

```

Milvus では、特定のフィールドの値が指定された範囲内にあるエンティティを次のように検索できます。

```python
res = client.query(
    collection_name="my_collection",
    filter='10 <= age <= 20',
    output_fields=["id", "user", "age"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html) で確認できます。Milvus の比較演算子の詳細については、[比較演算子](./basic-filtering-operators#comparison-operators) を参照してください。

### Term query\{#term-query}

Elasticsearch では、指定したフィールドに **完全一致** する用語を含むドキュメントを以下のように検索できます:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "term": {
                    "status": {
                        "value": "retired"
                    }
                }            
            }
        }
    },
)

```

Milvus では、指定されたフィールドの値が指定された用語と完全に一致するエンティティを次のように検索できます。

```python
# use ==
res = client.query(
    collection_name="my_collection",
    filter='status=="retired"',
    output_fields=["id", "user", "status"]
)

# use TEXT_MATCH
res = client.query(
    collection_name="my_collection",
    filter='TEXT_MATCH(status, "retired")',
    output_fields=["id", "user", "status"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html) で確認できます。Milvus の比較演算子の詳細については、[比較演算子](./basic-filtering-operators#comparison-operators) を参照してください。

### 規約 query\{#terms-query}

Elasticsearch では、指定したフィールドに 1 つ以上の **完全一致** する用語が含まれるドキュメントを以下のように検索できます。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "terms": {
                    "degree": [
                        "graduate",
                        "post-graduate"
                    ]
                }        
            }
        }
    }
)

```

Milvus にはこれと完全に等価な機能はありません。ただし、指定フィールドの値が指定された用語のいずれかに一致するエンティティを次のように検索できます。

```python
# use in
res = client.query(
    collection_name="my_collection",
    filter='degree in ["graduate", "post-graduate"]',
    output_fields=["id", "user", "degree"]
)

# use TEXT_MATCH
res = client.query(
    collection_name="my_collection",
    filter='TEXT_MATCH(degree, "graduate post-graduate")',
    output_fields=["id", "user", "degree"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html) で確認できます。Milvus の範囲演算子の詳細については、[範囲演算子](./basic-filtering-operators#range-operators) を参照してください。

### ワイルドカードクエリ\{#wildcard-query}

Elasticsearch では、次のようにワイルドカードパターンに一致する用語を含むドキュメントを検索できます。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "wildcard": {
                    "user": {
                        "value": "ki*y"
                    }
                }          
            }
        }
    },
)

```

Milvus はフィルタリング条件でワイルドカードをサポートしていません。ただし、以下のように `like` 演算子を使用して同様の効果を得ることができます。

```python
res = client.query(
    collection_name="my_collection",
    filter='user like "ki%" AND user like "%y"',
    output_fields=["id", "user"]
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html) で確認できます。Milvus の範囲演算子の詳細については、[範囲演算子](./basic-filtering-operators#range-operators) を参照してください。

## Boolean query\{#boolean-query}

Elasticsearch では、ブールクエリは他のクエリのブールの組み合わせに一致するドキュメントを検索するクエリです。

以下の例は、Elasticsearch ドキュメントの [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) にある例を基に作成しています。このクエリは、名前に `kimchy` を含み、`production` タグを持つユーザーを返します。

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "term": {
                    "user": "kimchy"
                }
            },
            "filter": {
                "term": {
                    "tags": "production"
                }
            }
        }
    },
)

```

Milvus では、次のように同様の操作が可能です。

```python
filter = 

res = client.query(
    collection_name="my_collection",
    filter='user like "%kimchy%" AND ARRAY_CONTAINS(tags, "production")',
    output_fields=["id", "user", "age", "tags"]
)
```

上記の例では、対象のコレクションに **VarChar** 型の `user` フィールドと **配列** 型の `tags` フィールドが存在することを前提としています。このクエリは、名前に `kimchy` を含み、かつ `production` タグを持つユーザーを返します。

## Vector queries\{#vector-queries}

Elasticsearch では、ベクトルフィールドに対して動作する特殊なクエリとしてベクトルクエリが提供されており、セマンティック検索を効率的に実行できます。

### Knn query\{#knn-query}

Elasticsearch は、近似 kNN クエリと厳密（ブルートフォース）kNN クエリの両方をサポートしています。以下の方法で、類似度メトリクスに基づき、クエリベクトルに対して最も近い *k* 個のベクトルをいずれかの方式で取得できます。

```python
resp = client.search(
    index="my-image-index",
    size=3,
    query={
        "knn": {
            "field": "image-vector",
            "query_vector": [
                -5,
                9,
                -12
            ],
            "k": 10
        }
    },
)

```

Milvusは、専用のベクトルデータベースとして、ベクトル検索を最適化するためにインデックスタイプを使用します。通常、高次元ベクトルデータの近似最近傍（ANN）検索を優先します。FLATインデックスタイプを使用した総当たりのkNN検索は正確な結果を提供しますが、時間とリソースの両方を大量に消費します。対照的に、AUTOINDEXやその他のインデックスタイプを使用したANN検索は、速度と精度のバランスを取り、kNNよりも大幅に高速でリソース効率の高いパフォーマンスを提供します。インデックスタイプとAUTOINDEXの詳細については、[インデックスの管理](./manage-indexes)および[AUTOINDEXの解説](./autoindex-explained)を参照してください。

上記のベクトルクエリに相当するMilvusのクエリは以下のようになります。

```python
res = client.search(
    collection_name="my_collection",
    anns_field="image-vector"
    data=[[-5, 9, -12]],
    limit=10
)
```

Elasticsearch の例は [このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html) で確認できます。Milvus での ANN 検索の詳細については、[基本的な ANN 検索](./single-vector-search) を参照してください。

### Reciprocal Rank Fusion\{#reciprocal-rank-fusion}

Elasticsearch は Reciprocal Rank Fusion (RRF) を提供しており、異なる関連性指標を持つ複数の結果セットを単一のランク付けされた結果セットに統合します。

次の例は、従来の用語ベースの検索と k-nearest neighbors (kNN) ベクトル検索を組み合わせて、検索の関連性を向上させる方法を示しています。

```python
client.search(
    index="my_index",
    size=10,
    query={
        "retriever": {
            "rrf": {
                "retrievers": [
                    {
                        "standard": {
                            "query": {
                                "term": {
                                    "text": "shoes"
                                }
                            }
                        }
                    },
                    {
                        "knn": {
                            "field": "vector",
                            "query_vector": [1.25, 2, 3.5],  # Example vector; replace with your actual query vector
                            "k": 50,
                            "num_candidates": 100
                        }
                    }
                ],
                "rank_window_size": 50,
                "rank_constant": 20
            }
        }
    }
)
```

この例では、RRF は 2 つのリトリーバーからの結果を組み合わせます。

- `text` フィールドに `"shoes"` という用語を含むドキュメントを検索する、標準的な用語ベースの検索。

- 提供されたクエリベクトルを使用して `vector` フィールド上で実行される kNN 検索。

各リトリーバーは最大 50 件の上位一致を提供し、RRF によって再ランク付けされた後、最終的な上位 10 件の結果が返されます。

Milvus では、複数のベクトルフィールドにわたる検索を組み合わせ、再ランク付け戦略を適用し、組み合わされたリストから上位 K 件の結果を取得することで、同様のハイブリッド検索を実現できます。Milvus は RRF と重み付き再ランカーの両方の戦略をサポートしています。詳細については、[再ランク付け](./reranking) を参照してください。

以下は、上記の Elasticsearch の例を Milvus で実現した非厳密な等価例です。

```python
search_params_dense = {
    "data": [[1.25, 2, 3.5]],
    "anns_field": "vector",
    "limit": 100
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    "data": ["shoes"],
    "anns_field": "text_sparse"
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name="my_collection",
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=10
)
```

この例では、Milvus における以下の要素を組み合わせたハイブリッド検索を紹介します。

1. **密ベクトル検索**: `vector` フィールドに対して内積（IP）メトリクスを使用した近似最近傍（ANN）検索を実行します。

1. **疎ベクトル検索**: `text_sparse` フィールドに対して BM25 類似度メトリクスを使用します。

これらの検索は個別に実行され、結果が統合された後、相互順位融合（Reciprocal Rank Fusion; RRF）ランカーを用いて再ランキングされます。ハイブリッド検索は、再ランキング済みリストの上位10件のエンティティを返します。

Elasticsearch の RRF ランキングが標準的なテキストベースのクエリと kNN 検索の結果をマージするのとは異なり、Milvus は疎ベクトル検索と密ベクトル検索の結果を組み合わせることで、マルチモーダルデータ向けに最適化された独自のハイブリッド検索機能を提供します。

## まとめ\{#recap}

本記事では、Elasticsearch の代表的なクエリを Milvus での同等のクエリに変換する方法について説明しました。これには、用語レベルクエリ、ブールクエリ、全文検索クエリ、およびベクトルクエリが含まれます。その他の Elasticsearch クエリの変換方法についてさらに質問がある場合は、お気軽にお問い合わせください。