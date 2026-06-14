---
title: "エンティティのカウント | BYOC"
slug: /count-entities
sidebar_key: count-entities
sidebar_label: "カウント"
beta: FALSE
notebook: FALSE
description: "この記事では、コレクション内のエンティティをカウントする方法を示し、エンティティ数が実際の数と異なる理由を説明します。 | BYOC"
type: origin
token: OfUIwNWVuimZgFk3gBVc61GnnKW
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - cloud
  - コレクション
  - データ
  - upsert
  - 更新
  - カウント

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# エンティティのカウント

この記事では、コレクション内のエンティティをカウントする方法を説明し、エンティティ数が実際の数値と異なる理由を解説します。

## 概要\{#overview}

Zilliz Cloud では、コレクション内のエンティティをカウントする方法が 2 つ提供されています。

- **count(&ast;) を出力フィールドとして使用したクエリ**

    コレクション内の正確なエンティティ数を取得するには、この方法を使用し、以下を確実に行ってください。

    - 対象のコレクションをロードしていること。

    - クエリリクエストで `consistency_level` を `Strong` に設定していること。

    - `output_field` を `['count(*)']` に設定していること。

    このようなクエリを受信すると、Zilliz Cloud はクエリノードにリクエストを送信し、メモリに既にロードされているエンティティをカウントします。

    クエリで複数のパーティション名を指定して、これらのパーティション内の対応するエンティティ数を取得することもできます。詳細については、[count(*) を出力フィールドとして使用したクエリ](./count-entities) を参照してください。

- **get_collection_stats() の使用**

    上記の方法を使用してコレクションの正確なカウントを取得できますが、あらゆる場面で使用することは推奨されません。この処理は基本的にクエリであり、頻繁な呼び出しはネットワークのジッターを引き起こしたり、ビジネスに関連する検索やクエリに影響を与えたりする可能性があります。

    精度が主要な懸念事項でない場合は、代わりに `get_collection_stats()` および `get_partition_stats()` を使用してください。この呼び出しは推定エンティティ数を提供しますが、対象のコレクションをロードする必要がなく、内部トラッカーが記録している内容を報告するだけなので、コストは無視できるほど小さいです。

    参考までに、すべてのデータ操作は非同期であるため、内部トラッカーはエンティティ数をリアルタイムで反映できません。詳細については、[get_collection_stats() の使用](./count-entities#use-getcollectionstats) を参照してください。

<Admonition type="info" icon="📘" title="Notes">

上記の両方の方法では、同じプライマリキーを持つエンティティを別々のエンティティとしてカウントします。

</Admonition>

プログラムでエンティティ数を取得する代わりに、Zilliz Cloud コンソールでクラスター、コレクション、またはパーティションの数値にアクセスすることもできます。詳細については、[Zilliz Cloud コンソールでのエンティティ数](./count-entities) を参照してください。

## `count(*)` を出力フィールドとして使用したクエリ\{#query-with-count-as-the-output-field}

正確なエンティティ数を取得するには、コレクションをロードし、`count(*)` を出力フィールドとしてクエリを実行し、クエリの一貫性レベルを `Strong` に設定します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Count without the entities in growing segments
res = client.query(
    collection_name="test_collection",
    # highlight-next-line
    output_fields=['count(*)']
)

# Count with the entities in growing segments
res = client.query(
    collection_name="test_collection",
    # highlight-start
    output_fields=['count(*)'],
    consistency_level="Strong"
    # highlight-end
)

# Count the entities in a specific partition
res = client.query(
    collection_name="test_collection",
    # highlight-start
    output_fields=['count(*)'],
    partition_names=['_default']
    # highlight-end
)

# Get the entity count
print(res[0]['count(*)'])
# Output
# 20
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.QueryReq
import io.milvus.v2.service.vector.request.QueryResp

// Count without the entities in growing segments
QueryResp count = client.query(QueryReq.builder()
        .collectionName("test_collection")
        .filter("")
        // highlight-next-line
        .outputFields(Collections.singletonList("count(*)"))
        .build());

// Count with the entities in growing segments
count = client.query(QueryReq.builder()
        .collectionName("test_collection")
        .filter("")
        // highlight-start
        .outputFields(Collections.singletonList("count(*)"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        // highlight-end
        .build());

// Count the entities in a specific partition
countR = client.query(QueryReq.builder()
        .collectionName("test_collection")
        .filter("")
        // highlight-start
        .outputFields(Collections.singletonList("count(*)"))
        .partitionNames(Collections.singletonList("_default"))
        // highlight-end
        .build());

System.out.print(count.getQueryResults().get(0).getEntity().get("count(*)"));

// Output
// 20
```

</TabItem>

<TabItem value='java'>

```go
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("test_collection").
    WithFilter("").
    WithOutputFields("count(*)").
    WithConsistencyLevel(entity.ClStrong))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("count: ", resultSet.GetColumn("count").FieldData().GetScalars())

```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

// Count with the entities in growing segments
let res = await client.query({
    collection_name: "test_collection",
    output_fields: ["count(*)"],
    consistency_level: 'Strong'
});

// Count the entities in a specific partition
res = await client.query({
    collection_name: "test_collection",
    output_fields: ["count(*)"],
    partition_names: ['_default']
});

// Get the entity count
console.log(res.data[0]['count(*)'])
// Output
// 20

```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "test_collection",
    "filter": "",
    "outputFields": ["count(*)"]
}'
#{"code":0,"cost":0,"data":[{count: 20}]}
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

auto request = milvus::QueryRequest()
                       .WithCollectionName("test_collection")
                       .AddOutputField("count(*)");

milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

request = milvus::QueryRequest()
                   .WithCollectionName("test_collection")
                   .AddOutputField("count(*)")
                   .WithConsistencyLevel(milvus::ConsistencyLevel::STRONG);

status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

request = milvus::QueryRequest()
                   .WithCollectionName("test_collection")
                   .AddOutputField("count(*)")
                   .AddPartitionName("_default");

status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Results().GetRowCount() << std::endl;
```

## `get_collection_stats()` を使用する\{#use-getcollectionstats}

上記の説明の通り、`get_collection_stats()` はコレクション内のエンティティの推定数を返します。これは実際のエンティティ数とは異なる場合があります。コレクションをロードせずに参考として使用できます。

次の例では、`test_collection` という名前のコレクションが存在することを前提としています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# 2. Get the entity count of a collection
client.get_collection_stats(collection_name="test_collection") 

# Output
# 
# {
#     'row_count': 1000
# }

# 3. Get the entity count of a partition
client.get_partition_stats(
    collection_name="test_collection",
    partition_name="_default"
) 

# Output
# 
# {
#     'row_count': 1000
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetCollectionStatsReq;
import io.milvus.v2.service.collection.response.GetCollectionStatsResp;
import io.milvus.v2.service.partition.request.GetPartitionStatsReq;
import io.milvus.v2.service.partition.response.GetPartitionStatsResp;

// 1. Set up a milvus client
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

// 2. Get the entity count of a collection
GetCollectionStatsResp stats = client.getCollectionStats(GetCollectionStatsReq.builder()
        .collectionName("test_collection")
        .build());
System.out.print(stats.getNumOfEntities());

// 3. Get the entity count of a partition
GetPartitionStatsResp partitionStats = client.getPartitionStats(GetPartitionStatsReq.builder()
        .collectionName("test_collection")
        .partitionName("_default")
        .build());
System.out.print(partitionStats.getNumOfEntities());
```

</TabItem>

<TabItem value='java'>

```go
// go
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

// 1. Set up a milvus client
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN'
});

// 2. Get the entity count
milvusClient.getCollectionStats({
 collection_name: 'test_collection',
 partition_name: '_default'
});

// Output
//
// {
//      data: {'row_count': 1000 }
// }
```

</TabItem>

<TabItem value='java'>

```bash
# curl
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

milvus::GetCollectionStatsResponse response;
status = client->GetCollectionStats(milvus::GetCollectionStatsRequest()
                                    .WithCollectionName("test_collection")
                                    , response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->GetCollectionStats(milvus::GetCollectionStatsRequest()
                                    .WithCollectionName("test_collection")
                                    .WithPartitionName("_default")
                                    , response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Stats().RowCount() << std::endl;
```

## Zilliz Cloud コンソールでのエンティティ数\{#entity-counts-on-the-zilliz-cloud-console}

プログラムでエンティティを数える代わりに、Zilliz Cloud コンソールにアクセスして、以下のページでクラスター、コレクション、またはパーティションのエンティティ数を確認することもできます。

### メトリクス\{#metrics}

クラスターの**メトリクス**タブで、**エンティティ数**と**ロードされたエンティティ（概算）** を確認できます。どちらの値も推定値です。曲線の値は、[を使用して](./count-entities#use-getcollectionstats)[`get_collection_stats()`](./count-entities#use-getcollectionstats)取得されます。これ以上データの挿入や削除がない場合、**エンティティ数**の曲線は最終的に現在のコレクション内の実際のエンティティ数を反映します。

![ZVYcwdlqAhOUqDb4vC3c2Hf8n5e](https://zdoc-images.s3.us-west-2.amazonaws.com/ZVYcwdlqAhOUqDb4vC3c2Hf8n5e.png)

### コレクションの詳細\{#collection-details}

コレクションの詳細タブで、実際のエンティティ数を確認できます。この値は、[を使用したクエリ](./count-entities)[`count(*)`](./count-entities)[を出力フィールドとして](./count-entities)取得されます。

![PfXfwGQoLhW0OBbVMMfccM0Qnaf](https://zdoc-images.s3.us-west-2.amazonaws.com/PfXfwGQoLhW0OBbVMMfccM0Qnaf.png)

### パーティション\{#partitions}

コレクションの**パーティション**タブを使用して、子パーティション内のロードされたエンティティの推定数を見つけることもできます。この値は、`get_partition_stats()` を使用して取得されます。

![LKThwnS2fhTj8vbFJpEcjAMunwf](https://zdoc-images.s3.us-west-2.amazonaws.com/LKThwnS2fhTj8vbFJpEcjAMunwf.png)

## FAQ\{#faqs}

- **エンティティを挿入した後、get_collection_stats() または get_partition_stats() を使用して取得したエンティティ数が、対象のコレクションまたはパーティションの実際のエンティティ数を反映しないのはなぜですか？**

    これらのメソッドは内部トラッカーが記録するもののみを報告します。すべてのデータ操作は非同期であるため、実際のエンティティ数とは異なる場合があります。

- **コレクションのメトリクスタブにあるエンティティ数の曲線が、エンティティを挿入または削除しても変化しないのはなぜですか？**

    **エンティティ数**の曲線の値は、特定の時点で推定されます。すべてのデータ操作は非同期であるため、曲線に反映されるまでに遅延が生じる場合があります。

- **コレクションのパーティションタブにあるエンティティ数（概算）列に表示される値が、エンティティを挿入または削除しても変化しないのはなぜですか？**

    一覧表示されたパーティションの値はすべて推定値です。すべてのデータ操作は非同期であるため、曲線に反映されるまでに遅延が生じる場合があります。

- **コレクションの概要タブに表示されるロードされたエンティティの値が、コレクション内の実際のエンティティ数を反映しないのはなぜですか？**

    **ロードされたエンティティ**に表示される値は正確です。この値と通常のクエリから取得されたエンティティ数との間に差がある場合、コレクション内の一部のエンティティが同じプライマリーキーを持つ可能性があります。

    `count(*)` を出力フィールドとするクエリは、同じプライマリーキーを持つエンティティを別個のエンティティとして扱いますが、他のクエリは最終結果を返す前に同じプライマリーキーを持つエンティティを除外することに注意してください。

