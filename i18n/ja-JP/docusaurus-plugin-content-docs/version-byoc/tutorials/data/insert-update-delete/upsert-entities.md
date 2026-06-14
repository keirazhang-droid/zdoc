---
title: "エンティティのアップサート | BYOC"
slug: /upsert-entities
sidebar_key: upsert-entities
sidebar_label: "アップサート"
beta: FALSE
notebook: FALSE
description: "`upsert` 操作は、コレクション内のエンティティを挿入または更新する便利な方法を提供します。 | BYOC"
type: origin
token: YtJPwEVETiTaPMkWSfAccjXTnge
sidebar_position: 2
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - アップサート
  - 更新
  - 挿入

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upsert エンティティ

`upsert` 操作は、コレクション内のエンティティを挿入または更新する便利な方法を提供します。

## 概要\{#overview}

upsert リクエストで指定された主キーがコレクション内に存在するかどうかに応じて、新しいエンティティを挿入するか、既存のエンティティを更新するために `upsert` を使用できます。主キーが見つからない場合は挿入操作が実行され、見つかった場合は更新操作が実行されます。

upsert リクエストは、挿入と削除を組み合わせたものです。既存のエンティティに対して `upsert` リクエストを受信すると、Zilliz Cloud はリクエストペイロードに含まれるデータを挿入すると同時に、データ内で指定された元の主キーを持つ既存のエンティティを削除します。

![Q3LawAQIKht1FKbsM3EcoQAHnvc](https://zdoc-images.s3.us-west-2.amazonaws.com/Q3LawAQIKht1FKbsM3EcoQAHnvc.png)

ターゲットコレクションの主フィールドで `autoID` が有効になっている場合でも、`upsert` リクエストにはターゲットエンティティの主キーを含める必要があります。Zilliz Cloud は、指定された主キーを使用して置き換えるエンティティを特定し、リクエストペイロードに含まれるデータに対して新しい主キーを生成してから挿入します。

`nullable` が有効なフィールドの場合、更新が必要ない場合は `upsert` リクエストで省略できます。

### マージモードでの Upsert\{#upsert-in-merge-mode}

また、`partial_update` フラグを使用して upsert リクエストをマージモードで動作させることもできます。これにより、更新が必要なフィールドのみをリクエストペイロードに含めることができます。

![NZNKwxm9ahmi87b487TcuCrNn4c](https://zdoc-images.s3.us-west-2.amazonaws.com/NZNKwxm9ahmi87b487TcuCrNn4c.png)

マージを実行するには、`upsert` リクエストで `partial_update` を `True` に設定し、主キーと新しい値で更新するフィールドを指定します。

このようなリクエストを受信すると、Zilliz Cloud は強整合性でクエリを実行してエンティティを取得し、リクエスト内のデータに基づいてフィールド値を更新し、変更されたデータを挿入し、その後、リクエストに含まれる元の主キーを持つ既存のエンティティを削除します。

`ARRAY` フィールドの場合、マージモードは `ARRAY_APPEND` と `ARRAY_REMOVE` の 2 つの演算子をサポートします。これらの演算子を使用すると、既存の `ARRAY` フィールドに要素を追加したり、一致する要素を削除したりできます。この際、エンティティをクエリして現在の値を取得する必要はありません。詳細については、[部分更新演算子を使用した Upsert ARRAY フィールド](./upsert-entities#upsert-array-fields-with-partial-update-operators) を参照してください。

### フィールド値の更新\{#update-field-values}

既存のエンティティのフィールド値を更新するには、[マージモードでの upsert](./upsert-entities#upsert-entities-in-merge-mode) を使用します。このモードでは、リクエストに含まれるフィールドのみが更新され、他のすべてのフィールドは既存の値を保持します。

### Upsert の動作：特別な注意事項\{#upsert-behaviors-special-notes}

マージ機能を使用する前に、考慮すべきいくつかの特別な注意事項があります。以下のケースでは、`title` と `issue` という 2 つのスカラーフィールド、主キー `id`、および `vector` というベクトルフィールドを持つコレクションがあると仮定します。

- **`nullable` が有効なフィールドの Upsert。**

    `issue` フィールドが null 可能であるとします。これらのフィールドを upsert する際に注意すべき点：

    - `upsert` リクエストで `issue` フィールドを省略し、`partial_update` を無効にすると、`issue` フィールドは元の値を保持せずに `null` に更新されます。

    - `issue` フィールドの元の値を保持するには、`partial_update` を有効にして `issue` フィールドを省略するか、`upsert` リクエストに `issue` フィールドを元の値とともに含める必要があります。

- **動的フィールドのキーの Upsert。**

    サンプルコレクションで動的キーが有効になっており、エンティティの動的フィールドのキーと値のペアが `{"author": "John", "year": 2020, "tags": ["fiction"]}` のようなものであるとします。

    `author`、`year`、`tags` などのキーでエンティティを upsert する場合、または他のキーを追加する場合、次の点に注意してください：

    - `partial_update` を無効にして upsert する場合、デフォルトの動作は **上書き** です。つまり、動的フィールドの値は、リクエストに含まれるすべてのスキーマ未定義フィールドとその値によって上書きされます。

        たとえば、リクエストに含まれるデータが `{"author": "Jane", "genre": "fantasy"}` の場合、ターゲットエンティティの動的フィールドのキーと値のペアはそれに更新されます。

    - `partial_update` を有効にして upsert する場合、デフォルトの動作は **マージ** です。つまり、動的フィールドの値は、リクエストに含まれるすべてのスキーマ未定義フィールドとその値とマージされます。

        たとえば、リクエストに含まれるデータが `{"author": "John", "year": 2020, "tags": ["fiction"]}` の場合、upsert 後、ターゲットエンティティの動的フィールドのキーと値のペアは `{"author": "John", "year": 2020, "tags": ["fiction"], "genre": "fantasy"}` になります。

- **JSON フィールドの Upsert。**

    サンプルコレクションにスキーマで定義された JSON フィールド `extras` があり、この JSON フィールド内のエンティティのキーと値のペアが `{"author": "John", "year": 2020, "tags": ["fiction"]}` のようなものであるとします。

    変更された JSON データでエンティティの `extras` フィールドを upsert する場合、JSON フィールドは全体として扱われ、個々のキーを選択的に更新することはできません。つまり、JSON フィールドは **マージ** モードでの upsert を **サポートしません**。

- **`ARRAY` フィールドの Upsert。**

    デフォルトでは、マージモードの `ARRAY` フィールドは **REPLACE** セマンティクスに従います。リクエストに含まれる値が既存の配列を上書きします。より細かい更新のために、Zilliz Cloud は 2 つの演算子もサポートしています：

    - `ARRAY_APPEND` は、リクエストペイロード内の要素を既存の配列に追加します。

    - `ARRAY_REMOVE` は、リクエストペイロード内の値と一致するすべての要素を既存の配列から削除します。

    演算子の構文、サポートされる要素タイプ、その他の制約については、[部分更新演算子を使用した Upsert 配列フィールド](./upsert-entities#upsert-array-fields-with-partial-update-operators) を参照してください。

### 制限と制約\{#limits-and-restrictions}

上記の内容に基づき、いくつかの制限と制約に従う必要があります：

- `upsert` リクエストには、`autoID` が有効な場合でも、常にターゲットエンティティの主キーを含める必要があります。`autoID` コレクションの場合、リクエスト内の主キーは置き換える既存のエンティティを識別します。Milvus は挿入された置換エンティティに対して新しい主キーを生成します。

- ターゲットコレクションはロードされ、クエリで使用可能である必要があります。

- リクエストで指定されたすべてのフィールドは、ターゲットコレクションのスキーマに存在する必要があります。

- リクエストで指定されたすべてのフィールドの値は、スキーマで定義されたデータ型と一致する必要があります。

- 関数を使用して別のフィールドから派生したフィールドの場合、Zilliz Cloud は upsert 中に派生フィールドを削除して再計算を可能にします。

## コレクション内のエンティティの Upsert\{#upsert-entities-in-a-collection}

このセクションでは、`my_collection` という名前のコレクションにエンティティを upsert します。このコレクションには、`id`、`vector`、`title`、`issue` という 2 つのフィールドのみがあります。`id` フィールドは主フィールドであり、`title` と `issue` フィールドはスカラーフィールドです。

これらの 3 つのエンティティがコレクション内に存在する場合、upsert リクエストに含まれるエンティティによって上書きされます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

data=[
    {
        "id": 0, 
        "vector": [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911],
        "title": "Artificial Intelligence in Real Life", 
        "issue": "vol.12"
    }, {
        "id": 1, 
        "vector": [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], 
        "title": "Hollow Man", 
        "issue": "vol.19"
    }, {
        "id": 2, 
        "vector": [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], 
        "title": "Treasure Hunt in Missouri", 
        "issue": "vol.12"
    }
]

res = client.upsert(
    collection_name='my_collection',
    data=data
)

print(res)

# Output
# {'upsert_count': 3}
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 0, \"vector\": [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \"title\": \"Artificial Intelligence in Real Life\", \"issue\": \"\vol.12\"}", JsonObject.class),
        gson.fromJson("{\"id\": 1, \"vector\": [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \"title\": \"Hollow Man\", \"issue\": \"vol.19\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"vector\": [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \"title\": \"Treasure Hunt in Missouri\", \"issue\": \"vol.12\"}", JsonObject.class),
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=3)
```

</TabItem>

<TabItem value='java'>

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

data = [
    {id: 0, vector: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], title: "Artificial Intelligence in Real Life", issue: "vol.12"},
    {id: 1, vector: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], title: "Hollow Man", issue: "vol.19"},
    {id: 2, vector: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], title: "Treasure Hunt in Missouri", issue: "vol.12"},
]

res = await client.upsert({
    collection_name: "my_collection",
    data: data,
})

console.log(res.upsert_cnt)

// Output
// 
// 3
// 
```

</TabItem>

<TabItem value='java'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

titleColumn := column.NewColumnString("title", []string{
    "Artificial Intelligence in Real Life", "Hollow Man", "Treasure Hunt in Missouri", 
})

issueColumn := column.NewColumnString("issue", []string{
    "vol.12", "vol.19", "vol.12"
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("id", []int64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
    }).
    WithColumns(titleColumn, issueColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "title": "Artificial Intelligence in Real Life", "issue": "vol.12"},
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "title": "Hollow Man", "issue": "vol.19"},
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "title": "Treasure Hunt in Missouri", "issue": "vol.12"},
],
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 3,
#         "upsertIds": [
#             0,
#             1,
#             2,
#         ]
#     }
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

milvus::EntityRows data = {
    {{"id", 0}, {"vector", std::vector<float>{-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911}}, {"title", "Artificial Intelligence in Real Life"}, {"issue", "vol.12"}},
    {{"id", 1}, {"vector", std::vector<float>{0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965}}, {"title", "Hollow Man"}, {"issue", "vol.19"}},
    {{"id", 2}, {"vector", std::vector<float>{-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827}}, {"title", "Treasure Hunt in Missouri"}, {"issue", "vol.12"}}
};

milvus::UpsertResponse resp_upsert;
status = client->Upsert(milvus::UpsertRequest()
                            .WithCollectionName("my_collection")
                            .WithRowsData(std::move(data)),
                        resp_upsert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## パーティション内のエンティティをアップサートする\{#upsert-entities-in-a-partition}

指定されたパーティションにエンティティをアップサートすることもできます。以下のコードスニペットは、コレクション内に **PartitionA** という名前のパーティションがあることを前提としています。

パーティション内にすでに存在する 3 つのエンティティは、リクエストに含まれるエンティティで上書きされます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data=[
    {
        "id": 10, 
        "vector": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], 
        "title": "Layour Design Reference", 
        "issue": "vol.34"
    },
    {
        "id": 11, 
        "vector": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], 
        "title": "Doraemon and His Friends", 
        "issue": "vol.2"
    },
    {
        "id": 12, 
        "vector": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], 
        "title": "Pikkachu and Pokemon", 
        "issue": "vol.12"
    },
]

res = client.upsert(
    collection_name="my_collection",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
# {'upsert_count': 3}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 10, \"vector\": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \"title\": \"Layour Design Reference\", \"issue\": \"vol.34\"}", JsonObject.class),
        gson.fromJson("{\"id\": 11, \"vector\": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \"title\": \"Doraemon and His Friends\", \"issue\": \"vol.2\"}", JsonObject.class),
        gson.fromJson("{\"id\": 12, \"vector\": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \"title\": \"Pikkachu and Pokemon\", \"issue\": \"vol.12\"}", JsonObject.class),
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=3)
```

</TabItem>

<TabItem value='java'>

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

// 6. Upsert data in partitions
data = [
    {id: 10, vector: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], title: "Layour Design Reference", issue: "vol.34"},
    {id: 11, vector: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], title: "Doraemon and His Friends", issue: "vol.2"},
    {id: 12, vector: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], title: "Pikkachu and Pokemon", issue: "vol.12"},
]

res = await client.upsert({
    collection_name: "my_collection",
    data: data,
    partition_name: "partitionA"
})

console.log(res.upsert_cnt)

// Output
// 
// 3
// 
```

</TabItem>

<TabItem value='java'>

```go
titleColumn = column.NewColumnString("title", []string{
    "Layour Design Reference", "Doraemon and His Friends", "Pikkachu and Pokemon", 
})
issueColumn = column.NewColumnString("issue", []string{
    "vol.34", "vol.2", "vol.12", 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithPartition("partitionA").
    WithInt64Column("id", []int64{10, 11, 12, 13, 14, 15, 16, 17, 18, 19}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
    }).
    WithColumns(titleColumn, issueColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"id": 10, "vector": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], "title": "Layour Design Reference", "issue": "vol.34"},
        {"id": 11, "vector": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], "title": "Doraemon and His Friends", "issue": "vol.2"},
        {"id": 12, "vector": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], "title": "Pikkachu and Pokemon", "issue": "vol.12"},
    ],
    "collectionName": "my_collection",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 3,
#         "upsertIds": [
#             10,
#             11,
#             12,
#         ]
#     }
# }
```

</TabItem>
</Tabs>

```c++
milvus::EntityRows data = {
    {{"id", 10}, {"vector", std::vector<float>{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}}, {"title", "Layour Design Reference"}, {"issue", "vol.34"}},
    {{"id", 11}, {"vector", std::vector<float>{0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104}}, {"title", "Doraemon and His Friends"}, {"issue", "vol.2"}},
    {{"id", 12}, {"vector", std::vector<float>{0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592}}, {"title", "Pikkachu and Pokemon"}, {"issue", "vol.12"}}
};

milvus::UpsertResponse resp_upsert;
auto status = client->Upsert(milvus::UpsertRequest()
                                .WithCollectionName("my_collection")
                                .WithPartitionName("partitionA")
                                .WithRowsData(std::move(data)),
                            resp_upsert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## マージモードでのエンティティのアップサート\{#upsert-entities-in-merge-mode}

次のコード例は、部分更新でエンティティをアップサートする方法を示しています。更新が必要なフィールドとその新しい値のみを、明示的な部分更新フラグとともに指定します。

次の例では、アップサートリクエストで指定されたエンティティの `issue` フィールドが、リクエストに含まれる値に更新されます。

<Admonition type="info" icon="📘" title="Notes">

マージモードでアップサートを実行する場合、リクエストに含まれるエンティティが同じフィールドセットを持つことを確認してください。次のコードスニペットに示すように、2つ以上のエンティティをアップサートする場合は、エラーを防ぎデータの整合性を維持するために、それらが同一のフィールドを含むことが重要です。

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data=[
    {
        "id": 1,
        "issue": "vol.14"
    },
    {
        "id": 2, 
        "issue": "vol.7"
    }
]

res = client.upsert(
    collection_name="my_collection",
    data=data,
    partial_update=True
)

print(res)

# Output
# {'upsert_count': 2}
```

</TabItem>

<TabItem value='java'>

```java
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1);
row1.addProperty("issue", "vol.14");

JsonObject row2 = new JsonObject();
row2.addProperty("id", 2);
row2.addProperty("issue", "vol.7");

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .data(Arrays.asList(row1, row2))
        .partialUpdate(true)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=2)
```

</TabItem>

<TabItem value='java'>

```go
pkColumn := column.NewColumnInt64("id", []int64{1, 2})
issueColumn = column.NewColumnString("issue", []string{
    "vol.17", "vol.7",
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(true),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='java'>

```javascript
const data=[
    {
        "id": 1,
        "issue": "vol.14"
    },
    {
        "id": 2, 
        "issue": "vol.7"
    }
];

const res = await client.upsert({
    collection_name: "my_collection",
    data,
    partial_update: true
});

console.log(res)

// Output
// 
// 2
// 
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

export COLLECTION_NAME="my_collection"
export UPSERT_DATA='[
  {
    "id": 1,
    "issue": "vol.14"
  },
  {
    "id": 2,
    "issue": "vol.7"
  }
]'

curl -X POST "YOUR_CLUSTER_ENDPOINT/v2/vectordb/entities/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Request-Timeout: 10" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"data\": ${UPSERT_DATA},
    \"partialUpdate\": true
  }"

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 2,
#         "upsertIds": [
#              3,
#             12,
#         ]
#     }
# }
```

</TabItem>
</Tabs>

```c++
milvus::EntityRows data = {{{"id", 1}, {"issue", "vol.14"}},
                           {{"id", 2}, {"issue", "vol.7"}}};
auto status = client->Upsert(milvus::UpsertRequest()
                                .WithCollectionName("my_collection")
                                .WithRowsData(std::move(data))
                                .WithPartialUpdate(true),
                             resp_upsert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## 部分更新オペレーターを使用した ARRAY フィールドの Upsert\{#upsert-array-fields-with-partial-update-operators}

部分更新オペレーター（`ARRAY_APPEND` および `ARRAY_REMOVE`）が導入される前は、`ARRAY` フィールドの一部を更新するには、クライアント側で読み取り-変更-書き込みのフローが必要でした。既存の配列をクエリし、アプリケーションコードで変更し、完全な置き換え値を upsert します。部分更新オペレーターを使用すると、追加または削除する要素のみを送信できるため、クライアント側のロジックが削減され、upsert 前の余分な読み取りが不要になります。

プライマリーキーが `1` のエンティティに既に `tags = ["new", "trial"]` があるとします。部分更新オペレーターが導入される前は、要素 `"premium"` を配列に追加するには、完全な置き換え配列を upsert する必要がありました。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.upsert(
    collection_name="users",
    # highlight-start
    data=[{"pk": 1, "tags": ["new", "trial", "premium"]}],
    partial_update=True,
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
List<JsonObject> replacementData = Collections.singletonList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"new\", \"trial\", \"premium\"]}", JsonObject.class)
);

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .partialUpdate(true)
        .data(replacementData)
        // highlight-end
        .build());
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
</Tabs>

`ARRAY_APPEND` を使用して、追加する要素のみを送信します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.upsert(
    collection_name="users",
    # highlight-start
    data=[{"pk": 1, "tags": ["premium"]}],
    field_ops={"tags": FieldOp.array_append()},
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
List<JsonObject> appendData = Collections.singletonList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"premium\"]}", JsonObject.class)
);

UpsertReq.FieldPartialUpdateOp appendTags = UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .data(appendData)
        .fieldOps(Collections.singletonList(appendTags))
        // highlight-end
        .build());

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
</Tabs>

<Admonition type="info" icon="📘" title="Notes">

`field_ops`を介してフィールドにオペレータをアタッチすると、暗黙的に部分更新セマンティクスが有効になります。したがって、`field_ops`と一緒に`partial_update=True`を渡す必要は**ありません**。

</Admonition>

### 制限\{#limits}

- ペイロード値は、ターゲットの`ARRAY`フィールドの`element_type`と一致する必要があります。たとえば、ターゲットフィールドが`ARRAY<VARCHAR>`の場合、ペイロードは文字列値を含む必要があります。

- このリリースでは、`ARRAY_APPEND`および`ARRAY_REMOVE`は、`element_type`が`BOOL`、`INT8`、`INT16`、`INT32`、`INT64`、`FLOAT`、`DOUBLE`、または`VARCHAR`である`ARRAY`フィールドをサポートします。

- `ARRAY_APPEND`操作後、結果の配列長がフィールドの`max_capacity`を超えてはなりません。

- 同じエンティティへの同時アップサートはリクエスト間でアトミックではありません。2つのリクエストが同時に同じ`ARRAY`フィールドを更新すると、後からの書き込みが先の書き込みを上書きする可能性があります。すべての同時変更を保持する必要がある場合は、アプリケーションレベルの調整を使用してください。

### 例\{#example}

次の例では、プライマリキー`pk`、`ARRAY<VARCHAR>`型の`tags`フィールド、および`embedding`ベクトルフィールドを持つ小さな`users`コレクションを使用します。最初に2つのエンティティを初期`tags`値で挿入し、次に`ARRAY_APPEND`と`ARRAY_REMOVE`を使用して、各オペレータが保存された配列をどのように変更するかを示します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import DataType, FieldOp, MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# 1. Create a collection with an ARRAY<VARCHAR> field
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field("pk", DataType.INT64, is_primary=True)
schema.add_field("embedding", DataType.FLOAT_VECTOR, dim=5)
schema.add_field(
    "tags",
    DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=8,
    max_length=32,
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="L2",
)

client.create_collection(
    collection_name="users",
    schema=schema,
    index_params=index_params
)

# 2. Seed two entities
client.insert(
    collection_name="users",
    data=[
        {"pk": 1, "embedding": [0.1, 0.2, 0.3, 0.4, 0.5], "tags": ["new"]},
        {"pk": 2, "embedding": [0.6, 0.7, 0.8, 0.9, 1.0], "tags": ["new", "trial"]},
    ],
)

# 3. Append tags without reading the existing ARRAY values
client.upsert(
    collection_name="users",
    # highlight-start
    data=[
        {"pk": 1, "tags": ["premium", "vip"]},
        {"pk": 2, "tags": ["premium"]},
    ],
    field_ops={"tags": FieldOp.array_append()},
    # highlight-end
)

res = client.query(
    collection_name="users",
    filter="pk in [1, 2]",
    output_fields=["pk", "tags"],
)
print(res)

# Example output:
# data: [
#   "{'pk': 1, 'tags': ['new', 'premium', 'vip']}",
#   "{'pk': 2, 'tags': ['new', 'trial', 'premium']}"
# ]

# 4. Remove matching tags without replacing the full ARRAY field
client.upsert(
    collection_name="users",
    # highlight-start
    data=[
        {"pk": 1, "tags": ["new"]},
        {"pk": 2, "tags": ["trial"]},
    ],
    field_ops={"tags": FieldOp.array_remove()},
    # highlight-end
)

res = client.query(
    collection_name="users",
    filter="pk in [1, 2]",
    output_fields=["pk", "tags"],
)
print(res)

# Example output:
# data: [
#   "{'pk': 1, 'tags': ['premium', 'vip']}",
#   "{'pk': 2, 'tags': ['new', 'premium']}"
# ]
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.QueryResp;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());
Gson gson = new Gson();

// 1. Create a collection with an ARRAY<VARCHAR> field
CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(false)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("tags")
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(8)
        .maxLength(32)
        .build());

List<IndexParam> indexParams = Collections.singletonList(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName("users")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

// 2. Seed two entities
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"pk\": 1, \"embedding\": [0.1, 0.2, 0.3, 0.4, 0.5], \"tags\": [\"new\"]}", JsonObject.class),
        gson.fromJson("{\"pk\": 2, \"embedding\": [0.6, 0.7, 0.8, 0.9, 1.0], \"tags\": [\"new\", \"trial\"]}", JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName("users")
        .data(data)
        .build());

// 3. Append tags without reading the existing ARRAY values
List<JsonObject> appendData = Arrays.asList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"premium\", \"vip\"]}", JsonObject.class),
        gson.fromJson("{\"pk\": 2, \"tags\": [\"premium\"]}", JsonObject.class)
);

UpsertReq.FieldPartialUpdateOp appendTags = UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .data(appendData)
        .fieldOps(Collections.singletonList(appendTags))
        // highlight-end
        .build());

QueryResp res = client.query(QueryReq.builder()
        .collectionName("users")
        .filter("pk in [1, 2]")
        .outputFields(Arrays.asList("pk", "tags"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

// Example output:
// [
//   {"pk": 1, "tags": ["new", "premium", "vip"]},
//   {"pk": 2, "tags": ["new", "trial", "premium"]}
// ]

// 4. Remove matching tags without replacing the full ARRAY field
List<JsonObject> removeData = Arrays.asList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"new\"]}", JsonObject.class),
        gson.fromJson("{\"pk\": 2, \"tags\": [\"trial\"]}", JsonObject.class)
);

UpsertReq.FieldPartialUpdateOp removeTags = UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .data(removeData)
        .fieldOps(Collections.singletonList(removeTags))
        // highlight-end
        .build());

res = client.query(QueryReq.builder()
        .collectionName("users")
        .filter("pk in [1, 2]")
        .outputFields(Arrays.asList("pk", "tags"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

// Example output:
// [
//   {"pk": 1, "tags": ["premium", "vip"]},
//   {"pk": 2, "tags": ["new", "premium"]}
// ]

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
</Tabs>

