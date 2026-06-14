---
title: "一貫性レベル | Cloud"
slug: /consistency-level
sidebar_key: consistency-level
sidebar_label: "一貫性レベル"
beta: FALSE
notebook: FALSE
description: "分散ベクトルデータベースである Zilliz Cloud は、各ノードまたはレプリカが読み取りおよび書き込み操作中に同じデータにアクセスできるように、複数の一貫性レベルを提供します。現在、サポートされている一貫性レベルには Strong、Bounded、Eventually、Session があり、Bounded がデフォルトの一貫性レベルとして使用されています。 | Cloud"
type: origin
token: Xx9EwWtekinLZfkWKqic37dDnFb
sidebar_position: 22
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - 一貫性レベル

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 一貫性レベル

分散ベクトルデータベースとして、Zilliz Cloud は複数の一貫性レベルを提供し、各ノードまたはレプリカが読み取りおよび書き込み操作中に同じデータにアクセスできるようにしています。現在サポートされている一貫性レベルには **Strong**、**Bounded**、**Eventually**、**Session** が含まれ、デフォルトで使用される一貫性レベルは **Bounded** です。

## 概要\{#overview}

Zilliz Cloud は、ストレージと計算を分離したシステムです。このシステムでは、**データNodes** がデータの永続化を担当し、最終的に MinIO/S3 などの分散オブジェクトストレージにデータを保存します。**QueryNodes** は Search などの計算タスクを処理します。これらのタスクでは、**バッチデータ** と **ストリーミングデータ** の両方を処理します。簡単に言えば、バッチデータはすでにオブジェクトストレージに保存されているデータと理解でき、ストリーミングデータはまだオブジェクトストレージに保存されていないデータを指します。ネットワーク遅延により、QueryNodes は最新のストリーミングデータを保持していないことが多いです。追加の保護策なしにストリーミングデータに対して直接 Search を実行すると、多くの未コミットのデータポイントが失われる可能性があり、検索結果の精度に影響を与えます。

![UlOJwpWuKhj5LAbGSp9cwMFznEb](https://zdoc-images.s3.us-west-2.amazonaws.com/UlOJwpWuKhj5LAbGSp9cwMFznEb.png)

上図に示すように、QueryNodes は Search リクエストを受信した後、ストリーミングデータとバッチデータの両方を同時に受信できます。ただし、ネットワーク遅延により、QueryNodes が取得するストリーミングデータは不完全である可能性があります。

この問題に対処するため、Zilliz Cloud はデータキュー内の各レコードにタイムスタンプを付与し、データキューに同期タイムスタンプを継続的に挿入します。同期タイムスタンプ（syncTs）を受信するたびに、QueryNodes はそれを ServiceTime として設定します。これは、QueryNodes がその Service Time より前のすべてのデータを確認できることを意味します。ServiceTime に基づいて、Zilliz Cloud は異なるユーザー要件の一貫性と可用性を満たすために保証タイムスタンプ（GuaranteeTs）を提供できます。ユーザーは、Search リクエストで GuaranteeTs を指定することにより、指定された時点より前のデータを検索範囲に含める必要があることを QueryNodes に通知できます。

![Owddb7D3Fo8zyFxJgWWcZCxanIf](https://zdoc-images.s3.us-west-2.amazonaws.com/owddb7d3fo8zyfxjgwwczcxanif.png "Owddb7D3Fo8zyFxJgWWcZCxanIf")

上図に示すように、GuaranteeTs が ServiceTime より小さい場合、指定された時点より前のすべてのデータが完全にディスクに書き込まれていることを意味し、QueryNodes はすぐに Search 操作を実行できます。GuaranteeTs が ServiceTime より大きい場合、QueryNodes は ServiceTime が GuaranteeTs を超えるまで待つ必要があり、その後で Search 操作を実行できます。

ユーザーは、クエリ精度とクエリレイテンシの間でトレードオフを行う必要があります。ユーザーが高い一貫性を要求し、クエリレイテンシに敏感でない場合、GuaranteeTs をできるだけ大きな値に設定できます。ユーザーが迅速に検索結果を受信したい場合、およびクエリ精度により寛容である場合、GuaranteeTs をより小さな値に設定できます。

![Y9YabwvmjoWMXhxt9kRc8Atmnid](https://zdoc-images.s3.us-west-2.amazonaws.com/y9yabwvmjowmxhxt9krc8atmnid.png "Y9YabwvmjoWMXhxt9kRc8Atmnid")

Zilliz Cloud は、異なる GuaranteeTs を持つ 4 種類の一貫性レベルを提供します。

- **Strong**

    最新のタイムスタンプが GuaranteeTs として使用され、QueryNodes は ServiceTime が GuaranteeTs を満たすまで待ってから Search リクエストを実行する必要があります。

- **Eventual**

    GuaranteeTs は 1 などの極めて小さな値に設定され、一貫性チェックを回避して、QueryNodes がすべてのバッチデータに対してすぐに Search リクエストを実行できるようにします。

- **Bounded Staleness**

    GuranteeTs は最新のタイムスタンプより前の時点に設定され、QueryNodes は一定のデータ損失を許容して検索を実行します。

- **Session**

    クライアントがデータを挿入した最新の時点が GuaranteeTs として使用され、QueryNodes はクライアントによって挿入されたすべてのデータに対して検索を実行できます。

Zilliz Cloud は、デフォルトの一貫性レベルとして Bounded Staleness を使用します。GuaranteeTs が指定されていない場合、最新の ServiceTime が GuaranteeTs として使用されます。

## 一貫性レベルの設定\{#set-consistency-level}

コレクションの作成時および Search や Query の実行時に、異なる一貫性レベルを設定できます。Search または Query で一貫性レベルが指定されていない場合、コレクション作成時に指定された一貫性レベルが適用されます。

### コレクション作成時の一貫性レベルの設定\{#set-consistency-level-upon-creating-collection}

コレクションを作成する際に、コレクション内の Search および Query の一貫性レベルを設定できます。次のコード例では、一貫性レベルを **Bounded** に設定しています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-next-line
    consistency_level="Bounded",
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        // highlight-next-line
        .consistencyLevel(ConsistencyLevel.Bounded)
        .build();
client.createCollection(createCollectionReq);
```

</TabItem>

<TabItem value='java'>

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithConsistencyLevel(entity.ClBounded))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            },
            {
                "fieldName": "my_varchar",
                "dataType": "VarChar",
                "isClusteringKey": true,
                "elementTypeParams": {
                    "max_length": 512
                }
            }
        ]
    }'

export params='{
    "consistencyLevel": "Bounded"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

</TabItem>

<TabItem value='java'>

```c++
auto status = client->CreateCollection(milvus::CreateSimpleCollectionRequest()
                                          .WithCollectionName("my_collection")
                                          .WithCollectionSchema(schema)
                                          .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

```

</TabItem>
</Tabs>

`consistency_level` パラメータの可能な値は、`Strong`、`Bounded`、`Eventually`、および `Session` です。

### Search での一貫性レベルの設定\{#set-consistency-level-in-search}

特定の検索に対して常に一貫性レベルを変更できます。次のコード例では、一貫性レベルを **Bounded** に設定し直しています。この変更は現在の検索リクエストにのみ適用されます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    limit=3
    # highlight-start
    consistency_level="Bounded",
    # highlight-next
)
```

</TabItem>

<TabItem value='java'>

```java
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

SearchResp searchResp = client.search(searchReq);
```

</TabItem>

<TabItem value='java'>

```go
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField("vector"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "limit": 3,
    "consistencyLevel": "Bounded"
}'
```

</TabItem>

<TabItem value='java'>

```c++
std::vector<float> query_vector = {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592};
auto request = milvus::SearchRequest()
                           .WithCollectionName("my_collection")
                           .WithLimit(3)
                           .AddFloatVector(std::move(query_vector))
                           .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>
</Tabs>

このパラメータはハイブリッド検索および検索イテレータでも利用可能です。`consistency_level` パラメータに指定可能な値は、`Strong`、`Bounded`、`Eventually`、および `Session` です。

### クエリでの一貫性レベルの設定\{#set-consistency-level-in-query}

特定の検索に対していつでも一貫性レベルを変更できます。以下のコード例では、一貫性レベルを **Eventually** に設定しています。この設定は現在のクエリリクエストにのみ適用されます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.query(
    collection_name="my_collection",
    filter="color like \"red%\"",
    output_fields=["vector", "color"],
    limit=3，
    # highlight-start
    consistency_level="Bounded",
    # highlight-next
)
```

</TabItem>

<TabItem value='java'>

```java
QueryReq queryReq = QueryReq.builder()
        .collectionName("my_collection")
        .filter("color like \"red%\"")
        .outputFields(Arrays.asList("vector", "color"))
        .limit(3)
        .consistencyLevel(ConsistencyLevel.Bounded)
        .build();
        
 QueryResp getResp = client.query(queryReq);
```

</TabItem>

<TabItem value='java'>

```go
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("color like \"red%\"").
    WithOutputFields("vector", "color").
    WithLimit(3).
    WithConsistencyLevel(entity.ClBounded))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "color like \"red_%\"",
    "consistencyLevel": "Bounded",
    "limit": 3
}'
```

</TabItem>

<TabItem value='java'>

```c++
auto request = milvus::QueryRequest()
                       .WithCollectionName("my_collection")
                       .WithFilter(R"(color like "red%")")
                       .WithLimit(3)
                       .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>
</Tabs>

このパラメータはクエリイテレータでも利用可能です。`consistency_level` パラメータの取り得る値は、`Strong`、`Bounded`、`Eventually`、および `Session` です。