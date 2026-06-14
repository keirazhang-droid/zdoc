---
title: "基本的なベクトル検索 | Cloud"
slug: /single-vector-search
sidebar_key: single-vector-search
sidebar_label: "基本的なベクトル検索"
beta: FALSE
notebook: FALSE
description: "ベクトル埋め込みのソート順を記録したインデックスファイルに基づき、近似最近傍（ANN）検索は受信した検索リクエストに含まれるクエリベクトルをもとにベクトル埋め込みのサブセットを特定し、そのサブグループ内でクエリベクトルと比較して最も類似した結果を返します。ANN検索により、Zilliz Cloudは効率的な検索体験を提供します。このページでは、基本的なANN検索を実行する方法を学ぶことができます。 | Cloud"
type: origin
token: BaGlwzDmyiyVvVk6NurcFclInCd
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - ベクトル検索
  - ANN

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 基本ベクトル検索

ベクトル埋め込みのソート順を記録したインデックスファイルに基づき、近似最近傍（ANN）検索は、受信した検索リクエストに含まれるクエリベクトルに基づいてベクトル埋め込みのサブセットを特定し、クエリベクトルとサブグループ内のベクトルを比較して、最も類似した結果を返します。ANN検索により、Zilliz Cloudは効率的な検索体験を提供します。このページでは、基本的なANN検索を実行する方法を学ぶことができます。

<Admonition type="info" icon="📘" title="Notes">

コレクション作成後に新しいフィールドを追加した場合、これらのフィールドを含む検索は、明示的に値を設定していないエンティティに対して、定義されたデフォルト値または`NULL`を返します。詳細については、[コレクションスキーマの変更](./add-fields-to-an-existing-collection)を参照してください。

</Admonition>

## 概要\{#overview}

ANN検索とk-最近傍（kNN）検索は、ベクトル類似性検索における一般的な手法です。kNN検索では、検索リクエストに含まれるクエリベクトルとベクトル空間内のすべてのベクトルを比較して最も類似したものを見つける必要があり、時間とリソースを消費します。

kNN検索とは異なり、ANN検索アルゴリズムは、ベクトル埋め込みのソート順を記録した**インデックス**ファイルを必要とします。検索リクエストが届くと、インデックスファイルを参照として使用して、クエリベクトルに最も類似したベクトル埋め込みを含む可能性が高いサブグループを迅速に特定できます。次に、指定された**メトリックタイプ**を使用して、クエリベクトルとサブグループ内のベクトル間の類似性を測定し、サブグループメンバーをクエリベクトルへの類似性に基づいてソートし、**上位K**個のグループメンバーを特定します。

ANN検索は事前構築されたインデックスに依存しており、検索スループット、メモリ使用量、検索精度は選択するインデックスタイプによって異なる場合があります。検索パフォーマンスと精度のバランスを取る必要があります。

学習曲線を緩和するために、Zilliz Cloudは**AUTOINDEX**を提供しています。**AUTOINDEX**を使用すると、Zilliz Cloudはインデックス構築中にコレクション内のデータ分布を分析し、分析結果に基づいて最も最適化されたインデックスパラメータを設定し、検索パフォーマンスと精度のバランスを取ります。

AUTOINDEXおよび適用可能なメトリックタイプの詳細については、[AUTOINDEXの解説](./autoindex-explained)および[メトリックタイプ](./search-metrics-explained)を参照してください。このセクションでは、以下のトピックに関する詳細情報を見つけることができます。

- [単一ベクトル検索](./single-vector-search#single-vector-search)

- [バルクベクトル検索](./single-vector-search#bulk-vector-search)

- [パーティション内のANN検索](./single-vector-search#ann-search-in-partition)

- [出力フィールドの使用](./single-vector-search#use-output-fields)

- [limitとoffsetの使用](./single-vector-search#use-limit-and-offset)

- [レベルの使用](./single-vector-search#use-level)

- [再現率の取得](./single-vector-search#get-recall-rate)

- [ANN検索の強化](./single-vector-search#enhancing-ann-search)

## 単一ベクトル検索\{#single-vector-search}

ANN検索において、単一ベクトル検索とは、1つのクエリベクトルのみを含む検索を指します。事前構築されたインデックスと検索リクエストに含まれるメトリックタイプに基づいて、Zilliz Cloudはクエリベクトルに最も類似した上位K個のベクトルを見つけます。

このセクションでは、単一ベクトル検索を実行する方法を学びます。検索リクエストは1つのクエリベクトルを含み、Zilliz Cloudに内積（IP）を使用してクエリベクトルとコレクション内のベクトル間の類似性を計算し、最も類似した3つを返すよう要求します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
res = client.search(
    collection_name="quick_setup",
    anns_field="vector",
    data=[query_vector],
    limit=3
)

for hits in res:
    for hit in hits:
        print(hit)

# [
#     [
#         {
#             "id": 551,
#             "distance": 0.08821295201778412,
#             "entity": {}
#         },
#         {
#             "id": 296,
#             "distance": 0.0800950899720192,
#             "entity": {}
#         },
#         {
#             "id": 43,
#             "distance": 0.07794742286205292,
#             "entity": {}
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());
    
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(Collections.singletonList(queryVector))
        .annsField("vector")
        .topK(3)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)
// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)
// SearchResp.SearchResult(entity={}, score=0.866088, id=7)
```

</TabItem>

<TabItem value='java'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"
token := "YOUR_CLUSTER_TOKEN"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vector"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}

```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: query_vector,
    limit: 3, // The number of results to return
})

console.log(res.results)

// [
//   { score: 0.08821295201778412, id: '551' },
//   { score: 0.0800950899720192, id: '296' },
//   { score: 0.07794742286205292, id: '43' }
// ]
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3
}'

# {
#     "code": 0,
#     "data": [
#         {
#             "distance": 0.08821295201778412,
#             "id": 551
#         },
#         {
#             "distance": 0.0800950899720192,
#             "id": 296
#         },
#         {
#             "distance": 0.07794742286205292,
#             "id": 43
#         }
#     ]
# }
```

</TabItem>
</Tabs>

```c++
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"YOUR_CLUSTER_ENDPOINT", "YOUR_CLUSTER_TOKEN"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

Milvus は、検索結果をクエリベクトルに対する類似度スコアの降順でランク付けします。類似度スコアはクエリベクトルまでの距離とも呼ばれ、その値の範囲は使用中のメトリックタイプによって異なります。

次の表は、適用可能なメトリックタイプと対応する距離範囲を示しています。

<table>
   <tr>
     <th><p>メトリックタイプ</p></th>
     <th><p>特性</p></th>
     <th><p>距離範囲</p></th>
   </tr>
   <tr>
     <td><p><code>L2</code></p></td>
     <td><p>値が小さいほど類似度が高いことを示します。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code>IP</code></p></td>
     <td><p>値が大きいほど類似度が高いことを示します。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>COSINE</code></p></td>
     <td><p>値が大きいほど類似度が高いことを示します。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>JACCARD</code></p></td>
     <td><p>値が小さいほど類似度が高いことを示します。</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>HAMMING</code></p></td>
     <td><p>値が小さいほど類似度が高いことを示します。</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
</table>

## 一括ベクトル検索\{#bulk-vector-search}

同様に、検索リクエストに複数のクエリベクトルを含めることができます。Zilliz Cloud は、クエリベクトルに対して ANN 検索を並行して実行し、2 つの結果セットを返します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 7. Search with multiple vectors
# 7.1. Prepare query vectors
query_vectors = [
    [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648],
    [0.0039737443, 0.003020432, -0.0006188639, 0.03913546, -0.00089768134]
]

# 7.2. Start search
res = client.search(
    collection_name="quick_setup",
    data=query_vectors,
    limit=3,
)

for hits in res:
    print("TopK results:")
    for hit in hits:
        print(hit)

# Output
#
# [
#     [
#         {
#             "id": 551,
#             "distance": 0.08821295201778412,
#             "entity": {}
#         },
#         {
#             "id": 296,
#             "distance": 0.0800950899720192,
#             "entity": {}
#         },
#         {
#             "id": 43,
#             "distance": 0.07794742286205292,
#             "entity": {}
#         }
#     ],
#     [
#         {
#             "id": 730,
#             "distance": 0.04431751370429993,
#             "entity": {}
#         },
#         {
#             "id": 333,
#             "distance": 0.04231833666563034,
#             "entity": {}
#         },
#         {
#             "id": 232,
#             "distance": 0.04221535101532936,
#             "entity": {}
#         }
#     ]
# ]

```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.BaseVector;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

List<BaseVector> queryVectors = Arrays.asList(
        new FloatVec(new float[]{0.041732933f, 0.013779674f, -0.027564144f, -0.013061441f, 0.009748648f}),
        new FloatVec(new float[]{0.0039737443f, 0.003020432f, -0.0006188639f, 0.03913546f, -0.00089768134f})
);
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(queryVectors)
        .topK(3)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)
// SearchResp.SearchResult(entity={}, score=0.320147, id=3)
// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)
// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)
// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)
```

</TabItem>

<TabItem value='java'>

```go
queryVectors := []entity.Vector{
    entity.FloatVector([]float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}),
    entity.FloatVector([]float32{0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104}),
}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    queryVectors,
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 7. Search with multiple vectors
const query_vectors = [
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], 
    [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
]

res = await client.search({
    collection_name: "quick_setup",
    vectors: query_vectors,
    limit: 3,
})

console.log(res.results)

// Output
// 
// [
//   [
//     { score: 0.08821295201778412, id: '551' },
//     { score: 0.0800950899720192, id: '296' },
//     { score: 0.07794742286205292, id: '43' }
//   ],
//   [
//     { score: 0.04431751370429993, id: '730' },
//     { score: 0.04231833666563034, id: '333' },
//     { score: 0.04221535101532936, id: '232' },
//   ]
// ]
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    "annsField": "vector",
    "limit": 3
}'

# {
#     "code": 0,
#     "data": [
#         [
#           {
#               "distance": 0.08821295201778412,
#               "id": 551
#           },
#           {
#               "distance": 0.0800950899720192,
#               "id": 296
#           },
#           {
#               "distance": 0.07794742286205292,
#               "id": 43
#           }
#         ],
#         [
#           {
#               "distance": 0.04431751370429993,
#               "id": 730
#           },
#           {
#               "distance": 0.04231833666563034,
#               "id": 333
#           },
#           {
#               "distance": 0.04221535101532936,
#               "id": 232
#           }
#        ]
#     ],
#     "topks":[3]
# }
```

</TabItem>
</Tabs>

```c++
std::vector<std::vector<float>> query_vectors = {
    {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
    {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104}
};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .WithFloatVector(std::move(query_vectors));

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## プライマリーキー検索\{#primary-key-search}

クエリベクトルを設定する代わりに、クエリベクトルがターゲットコレクション内に既に存在する場合、プライマリーキーを使用できます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="quick_setup",
    anns_field="vector",
    # highlight-start
    ids=[551, 296, 43],
    # highlight-end
    limit=3
)

for hits in res:
    for hit in hits:
        print(hit)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='java'>

```javascript
// node.js
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
curl -X POST "YOUR_CLUSTER_ENDPOINT/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLUSTER_TOKEN" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "quick_setup",
    "annsField": "vector",
    "ids": [551, 296, 43],
    "limit": 3
  }'
```

</TabItem>
</Tabs>

## パーティション内でのANN検索\{#ann-search-in-partition}

コレクション内に複数のパーティションを作成している場合、検索範囲を特定のパーティションに限定できます。その場合は、検索リクエストにターゲットとなるパーティション名を指定することで、検索範囲をそのパーティション内に制限できます。検索対象のパーティション数を減らすことで、検索パフォーマンスが向上します。

以下のコードスニペットでは、コレクション内に **PartitionA** という名前のパーティションが存在することを前提としています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
res = client.search(
    collection_name="quick_setup",
    # highlight-next-line
    partition_names=["partitionA"],
    data=[query_vector],
    limit=3,
)

for hits in res:
    print("TopK results:")
    for hit in hits:
        print(hit)

# [
#     [
#         {
#             "id": 551,
#             "distance": 0.08821295201778412,
#             "entity": {}
#         },
#         {
#             "id": 296,
#             "distance": 0.0800950899720192,
#             "entity": {}
#         },
#         {
#             "id": 43,
#             "distance": 0.07794742286205292,
#             "entity": {}
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .partitionNames(Collections.singletonList("partitionA"))
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)
// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)
// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithPartitions("partitionA").
    WithANNSField("vector"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    // highlight-next-line
    partition_names: ["partitionA"],
    data: query_vector,
    limit: 3, // The number of results to return
})

console.log(res.results)

// [
//   { score: 0.08821295201778412, id: '551' },
//   { score: 0.0800950899720192, id: '296' },
//   { score: 0.07794742286205292, id: '43' }
// ]
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "partitionNames": ["partitionA"],
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3
}'

# {
#     "code": 0,
#     "data": [
#         {
#             "distance": 0.08821295201778412,
#             "id": 551
#         },
#         {
#             "distance": 0.0800950899720192,
#             "id": 296
#         },
#         {
#             "distance": 0.07794742286205292,
#             "id": 43
#         }
#     ],
#     "topks":[3]
# }
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .AddPartitionName("partitionA")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## 出力フィールドの使用\{#use-output-fields}

検索結果では、Zilliz Cloud はデフォルトで、上位 K 個のベクトル埋め込みを含むエンティティのプライマリフィールド値と類似度距離/スコアを返します。出力フィールドとして検索リクエストに対象フィールド名（ベクトルフィールドとスカラーフィールドの両方を含む）を含めることで、これらのエンティティの他のフィールドの値を検索結果に含めることができます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=3, # The number of results to return
    # highlight-next-line
    output_fields=["color"]
)

print(res)

# [
#     [
#         {
#             "id": 551,
#             "distance": 0.08821295201778412,
#             "entity": {
#                 "color": "orange_6781"
#             }
#         },
#         {
#             "id": 296,
#             "distance": 0.0800950899720192,
#             "entity": {
#                 "color": "red_4794"
#             }
#         },
#         {
#             "id": 43,
#             "distance": 0.07794742286205292,
#             "entity": {
#                 "color": "grey_8510"
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .outputFields(Collections.singletonList("color"))
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)
// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)
// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector").
    WithOutputFields("color"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("color: ", resultSet.GetColumn("color").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: query_vector,
    limit: 3, // The number of results to return
    // highlight-next-line
    output_fields: ["color"]
})

console.log(res.results)

// [
//   { score: 0.08821295201778412, id: '551', entity: {"color": "orange_6781"}},
//   { score: 0.0800950899720192, id: '296' entity: {"color": "red_4794"}},
//   { score: 0.07794742286205292, id: '43' entity: {"color": "grey_8510"}}
// ]
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3,
    "outputFields": ["color"]
}'

# {
#     "code": 0,
#     "data": [
#         {
#             "distance": 0.08821295201778412,
#             "id": 551,
#             "color": "orange_6781"
#         },
#         {
#             "distance": 0.0800950899720192,
#             "id": 296,
#             "color": "red_4794"
#         },
#         {
#             "distance": 0.07794742286205292,
#             "id": 43
#             "color": "grey_8510"
#         }
#     ],
#     "topks":[3]
# }
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddOutputField("color")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## Sort Search 結果 by Scalar Fields | PRIVATE\{#sort-search-results-by-scalar-fields}

デフォルトでは、Zilliz Cloudは検索結果をクエリベクトルとの類似度スコアで並べ替えます。返されるエンティティをスカラーフィールドの順序に従わせたい場合は、検索リクエストに `order_by_fields` を追加します。

`order_by_fields` の各項目は、スカラーフィールドとソート方向を指定します。昇順の場合は `"asc"`、降順の場合は `"desc"` を使用します。`order` を省略した場合、Zilliz Cloud はそのフィールドを昇順でソートします。

次の例では、`price` を低いものから高いものの順に検索結果を並べ替えます。レスポンス内でそのフィールドの値を確認したい場合は、ソートフィールドを `output_fields` に含めてください。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="product_catalog",
    data=query_vectors,
    anns_field="embedding",
    limit=20,
    output_fields=["id", "price", "rating", "category"],
    # highlight-start
    order_by_fields=[
        {"field": "price", "order": "asc"}
    ],
    # highlight-end
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

複数のスカラーフィールドでソートすることもできます。Zilliz Cloud は、指定された順序でフィールドを適用します。以下の例では、Zilliz Cloud が結果を `price` の昇順でソートします。`price` が同じエンティティについては、さらに `rating` の降順でソートされます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="product_catalog",
    data=query_vectors,
    anns_field="embedding",
    limit=20,
    output_fields=["id", "price", "rating", "category"],
    # highlight-start
    order_by_fields=[
        {"field": "price", "order": "asc"},
        {"field": "rating", "order": "desc"},
    ],
    # highlight-end
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

すべての指定された order-by フィールドの値が同じエンティティの場合、Zilliz Cloud は元の類似度スコアの順序を維持します。

## 制限 と オフセット の使用\{#use-limit-and-offset}

検索リクエストに含まれる `limit` パラメータが、検索結果に含まれるエンティティの数を決定することに気づかれたかもしれません。このパラメータは、1 回の検索で返されるエンティティの最大数を指定するもので、通常 **top-K** と呼ばれます。

ページネーションされたクエリを実行したい場合は、ループを使用して複数の Search リクエストを送信し、各クエリリクエストに **制限** および **オフセット** パラメータを含めることができます。具体的には、**制限** パラメータを現在のクエリ結果に含めたいエンティティの数に設定し、**オフセット** をすでに返されたエンティティの総数に設定します。

以下の表は、1 回あたり 100 個のエンティティを返す場合の、ページネーションされたクエリにおける **制限** および **オフセット** パラメータの設定方法を示しています。

<table>
   <tr>
     <th><p>クエリ</p></th>
     <th><p>クエリごとに返されるエンティティ</p></th>
     <th><p>これまでに返されたエンティティの総数</p></th>
   </tr>
   <tr>
     <td><p><strong>1 回目</strong>のクエリ</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p><strong>2 回目</strong>のクエリ</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p><strong>3 回目</strong>のクエリ</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p><strong>n 回目</strong>のクエリ</p></td>
     <td><p>100</p></td>
     <td><p>100 x (n-1)</p></td>
   </tr>
</table>

なお、1 回の ANN 検索における `limit` と `offset` の合計は 16,384 未満である必要があります。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=3, # The number of results to return
    search_params={
        # highlight-next-line
        "offset": 10 # The records to skip
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .offset(10)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)
// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)
// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector").
    WithOffset(10))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: query_vector,
    limit: 3, // The number of results to return,
    // highlight-next-line
    offset: 10 // The record to skip.
})
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3,
    "offset": 10
}'
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .WithOffset(10)
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## レベルの使用\{#use-level\}

ANN検索を最適化するために、Zilliz Cloud は簡略化された検索最適化により検索精度を制御するパラメータ `level` を提供します。

このパラメータの範囲は `1` から `10` で、デフォルトは `1` です。値を大きくすると検索性能が低下しますが、検索再現率が向上します。一般的なケースでは、デフォルト値で最大90%の再現率が得られます。必要に応じて値を大きくすることができます。

<Admonition type="info" icon="📘" title="Notes">

`level` パラメータはまだ **パブリックプレビュー** です。値が `5` より大きい値に設定できない場合、お使いのクラスターがこの機能を完全にサポートしていない可能性があります。回避策として、値を `1` から `5` の範囲内に設定するか、[Zilliz Cloud サポート](https://zilliz.com/contact-sales) にお問い合わせください。

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=3, # The number of results to return
    search_params={
        "params": {
            # highlight-next-line
            "level": 10 # The precision control
        }
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
Map<String, Object> params = new HashMap<>();
params.put("level", 10);
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .searchParams(params)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)
// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)
// SearchResp.SearchResult(entity={}, score=0.866088, id=7)
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector").
    WithSearchParam("level", "10"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: query_vector,
    limit: 3, // The number of results to return,
    params: {
        // highlight-next-line
        "level": 10 // The precision control
    }
})
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    "annsField": "vector",
    "limit": 3,
    "searchParams":{
        "params":{
            "level":10
        }
    }
}'

# {"code":0,"cost":0,"data":[{"distance":1,"id":0},{"distance":0.6290165,"id":1},{"distance":0.5975797,"id":4},{"distance":0.9999999,"id":1},{"distance":0.7408552,"id":7},{"distance":0.6290165,"id":0}],"topks":[3]}
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddFloatVector(query_vector)
                   .AddExtraParam("level", "10");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## リコール率の取得\{#get-recall-rate}

`level` パラメータを調整する際に `enable_recall_calculation` を `true` に設定すると、異なる `level` 値での検索の精度を評価できます。

<Admonition type="info" icon="📘" title="Notes">

`enable_recall_calculation` パラメータはまだ **パブリックプレビュー** であり、互換性の問題により使用できない場合があります。サポートについては、[Zilliz Cloud サポート](https://zilliz.com/contact-sales) までお問い合わせください。

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=3, # The number of results to return
    search_params={
        "params": {
            # highlight-next-line
            "level": 10 # The precision control,
            "enable_recall_calculation": True # Ask to return recall rate
        }
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
Map<String, Object> params = new HashMap<>();
params.put("level", 10);
params.put("enable_recall_calculation", true)
SearchReq searchReq = SearchReq.builder()
        .collectionName("quick_setup")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .searchParams(params)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)
// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)
// SearchResp.SearchResult(entity={}, score=0.866088, id=7)
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector").
    WithSearchParam("enable_recall_calculation", "true"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

</TabItem>

<TabItem value='java'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: query_vector,
    limit: 3, // The number of results to return,
    params: {
        // highlight-next-line
        "level": 10 // The precision control
        "enable_recall_calculation": true // Ask to return recall rate
    }
})
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    "annsField": "vector",
    "limit": 3,
    "searchParams":{
        "params":{
            "level":10,
            "enable_recall_calculation": true
        }
    }
}'

# {"code":0,"cost":0,"data":[{"distance":1,"id":0},{"distance":0.6290165,"id":1},{"distance":0.5975797,"id":4},{"distance":0.9999999,"id":1},{"distance":0.7408552,"id":7},{"distance":0.6290165,"id":0}],"topks":[3]}
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddFloatVector(query_vector)
                   .AddExtraParam("level", "10")
                   .AddExtraParam("enable_recall_calculation", "true");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "TopK results:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

## 検索のタイムゾーンを一時的に設定する\{#temporarily-set-a-timezone-for-a-search}

コレクションに `TIMESTAMPTZ` フィールドがある場合、検索呼び出しで `timezone` パラメータを設定することで、データベースまたはコレクションのデフォルトのタイムゾーンを一時的に上書きできます。これにより、操作中に `TIMESTAMPTZ` 値がどのように表示され比較されるかが制御されます。

`timezone` の値は、有効な [IANA タイムゾーン識別子](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)（例：**Asia/Shanghai**、**America/Chicago**、**UTC**）である必要があります。`TIMESTAMPTZ` フィールドの使用方法の詳細については、[TIMESTAMPTZ フィールド](./use-timestamptz-field) を参照してください。

以下の例は、検索操作のタイムゾーンを一時的に設定する方法を示しています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="quick_setup",
    anns_field="vector",
    data=[query_vector],
    limit=3,
    # highlight-next-line
    timezone="America/Havana",
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
// js
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
export QUERY_VECTOR='[0.1, 0.2, 0.3, 0.4]'                                                                                                                                                                                                              
                                                                                                                                                                                                                                                          
curl -X POST "YOUR_CLUSTER_ENDPOINT/v2/vectordb/entities/search" \                                                                                                                                                                                     
-H "Content-Type: application/json" \  
-H "Request-Timeout: 10" \                                                                                                                                                                                                               
-d '{                                                                                                                                                                                                                                                 
  "collectionName": "quick_setup",                                                                                                                                                                                                                    
  "annsField": "vector",                                                                                                                                                                                                                              
  "data": ['"$QUERY_VECTOR"'],                                                                                                                                                                                                                        
  "limit": 3,                                                                                                                                                                                                                                         
  "searchParams": {                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    "timezone": "America/Havana"                                                                                                                                                                                                                      
  }                                                                                                                                                                                                                                                   
}'
```

</TabItem>
</Tabs>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                   .WithCollectionName("quick_setup")
                   .WithLimit(3)
                   .WithAnnsField("vector")
                   .AddFloatVector(query_vector)
                   .WithMetricType(milvus::MetricType::IP)
                   .WithTimezone("America/Havana");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## ANN 検索の強化\{#enhancing-ann-search}

AUTOINDEX は ANN 検索の学習曲線を大幅に緩和します。しかし、top-K が増加するにつれて、検索結果が常に正確であるとは限りません。検索範囲を狭め、検索結果の関連性を向上させ、検索結果を多様化することにより、Zilliz Cloud は以下の検索拡張機能を提供しています。

- フィルター検索

    検索リクエストにフィルタリング条件を含めることで、Zilliz Cloud は ANN 検索を実行する前にメタデータフィルタリングを実行し、検索範囲をコレクション全体から指定されたフィルタリング条件に一致するエンティティのみに絞り込みます。

    メタデータフィルタリングとフィルタリング条件の詳細については、[フィルター検索](./filtered-search) および [フィルタリング](./filtering) を参照してください。

- 範囲検索

    返されるエンティティの距離やスコアを特定の範囲内に制限することで、検索結果の関連性を向上させることができます。Zilliz Cloud では、範囲検索は、クエリベクトルに最も類似したベクトル埋め込みを中心とする2つの同心円を描くことを含みます。検索リクエストでは両方の円の半径を指定し、Zilliz Cloud は外側の円内にあるが内側の円にはないすべてのベクトル埋め込みを返します。

    範囲検索の詳細については、[範囲検索](./range-search) を参照してください。

- グループ化検索

    返されたエンティティが特定のフィールドで同じ値を持つ場合、検索結果がベクトル空間内のすべてのベクトル埋め込みの分布を表していない可能性があります。検索結果を多様化するには、グループ化検索の使用を検討してください。

    グループ化検索の詳細については、[グループ化検索](./grouping-search)、

- ハイブリッド検索

    コレクションには複数のベクトルフィールドを含めることができ、異なる埋め込みモデルを使用して生成されたベクトル埋め込みを保存できます。これにより、ハイブリッド検索を使用してこれらのベクトルフィールドからの検索結果を再ランク付けし、再現率を向上させることができます。

    ハイブリッド検索の詳細については、[ハイブリッド検索](./hybrid-search) を参照してください。

    コレクションで許可されるベクトルフィールド数の制限の詳細については、[Zilliz Cloud の制限](./limits#fields) を参照してください。

- 検索イテレータ

    単一の ANN 検索では最大 16,384 エンティティが返されます。1回の検索でより多くのエンティティを返す必要がある場合は、検索イテレータの使用を検討してください。

    検索イテレータの詳細については、[検索イテレータ](./with-iterators) を参照してください。

- 全文検索

    全文検索は、テキストデータセット内の特定の用語やフレーズを含むドキュメントを取得し、関連性に基づいて結果をランク付けする機能です。この機能は、正確な用語を見落とす可能性があるセマンティック検索の制限を克服し、最も正確で文脈に関連した結果を受け取ることを保証します。さらに、生のテキスト入力を受け付け、テキストデータを自動的にスパース埋め込みに変換することでベクトル検索を簡素化し、手動でベクトル埋め込みを生成する必要がありません。

    全文検索の詳細については、[全文検索](./full-text-search) を参照してください。

- テキストマッチ

    Zilliz Cloud のキーワードマッチにより、特定の用語に基づいて正確なドキュメント取得が可能になります。この機能は主にフィルター検索で特定の条件を満たすために使用され、スカラーフィルタリングを組み込んでクエリ結果を絞り込み、スカラー条件を満たすベクトル内での類似検索を可能にします。

    キーワードマッチの詳細については、[キーワードマッチ](./text-match) を参照してください。

- パーティションキーの使用

    メタデータフィルタリングに複数のスカラーフィールドを含め、かなり複雑なフィルタリング条件を使用すると、検索効率に影響を与える可能性があります。スカラーフィールドをパーティションキーとして設定し、検索リクエストでパーティションキーを含むフィルタリング条件を使用すると、指定されたパーティションキー値に対応するパーティション内に検索範囲を制限するのに役立ちます。

    パーティションキーの詳細については、[パーティションキーの使用](./use-partition-key) を参照してください。

- Use mmap

    mmap 設定の詳細については、[mmap の使用](./use-mmap) を参照してください。

