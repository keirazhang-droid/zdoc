---
title: "コレクションフィールドの変更 | Cloud"
slug: /alter-collection-field
sidebar_key: alter-collection-field
sidebar_label: "フィールドを変更"
beta: FALSE
notebook: FALSE
description: "コレクションフィールドのプロパティを変更することで、列制約を変更したり、より厳格なデータ整合性ルールを適用したりできます。 | Cloud"
type: origin
token: PLjFwlcT8ilFBakYXyfcg6S2n7d
sidebar_position: 18
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - フィールドプロパティ
  - コレクションフィールドの変更

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# コレクションフィールドの変更

コレクションフィールドのプロパティを変更することで、列の制約を変更したり、より厳格なデータ整合性ルールを適用したりできます。

このページでは、フィールドのプロパティ変更について説明します。スキーマの形状変更（フィールドの追加や削除など）については扱いません。既存のコレクションにスカラーフィールドを追加したり、フィールドを削除したりする方法については、[コレクションスキーマの変更](./add-fields-to-an-existing-collection) を参照してください。

<Admonition type="info" icon="📘" title="Notes">

- 各コレクションは1つのプライマリフィールドのみで構成されます。コレクション作成時に設定したプライマリフィールドは、後から変更したり、そのプロパティを変更したりすることはできません。

- 各コレクションは1つのパーティションキーのみを持つことができます。コレクション作成時に設定したパーティションキーは、後から変更することはできません。

</Admonition>

## VarChar フィールドの変更\{#alter-varchar-field}

VarChar フィールドには `max_length` というプロパティがあり、フィールド値に含めることができる最大文字数を制限します。この `max_length` プロパティを変更できます。

次の例は、コレクションに `varchar` という名前の VarChar フィールドがあることを前提とし、その `max_length` プロパティを設定します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

client.alter_collection_field(
    collection_name="my_collection",
    field_name="varchar",
    field_params={
        "max_length": 1024
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.service.collection.request.*;

ConnectConfig config = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("varchar")
        .property("max_length", "1024")
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
await client.alterCollectionFieldProperties({
  collection_name: LOAD_COLLECTION_NAME,
  field_name: 'varchar',
  properties: { max_length: 1024 },
});
```

</TabItem>

<TabItem value='java'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
    "github.com/milvus-io/milvus/pkg/v2/common"
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

err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    "my_collection", "varchar").WithProperty(common.MaxLengthKey, 1024))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/collections/fields/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
--data '{
    "collectionName": "my_collection",
    "field_name": "varchar",
    "properties": {
        "max_length": "1024"
    }
}'
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

status = client->AlterCollectionFieldProperties(milvus::AlterCollectionFieldPropertiesRequest()
                    .WithCollectionName("my_collection")
                    .WithFieldName("varchar")
                    .AddProperty("max_length", "1024"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## ARRAY フィールドの変更\{#alter-array-field}

ARRAY フィールドには `element_type` と `max_capacity` の 2 つのプロパティがあります。前者は配列内の要素のデータ型を決定し、後者は配列内の要素の最大数を制限します。変更できるのは `max_capacity` プロパティのみです。

次の例では、コレクションに `array` という名前の ARRAY フィールドがあり、その `max_capacity` プロパティを設定するものとします。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.alter_collection_field(
    collection_name="my_collection",
    field_name="array",
    field_params={
        "max_capacity": 64
    }
)
```

</TabItem>

<TabItem value='java'>

```java
client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("array")
        .property("max_capacity", "64")
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
await client.alterCollectionFieldProperties({
  collection_name: "my_collection",
  field_name: 'array',
  properties: { 
      max_capacity: 64 
  }
});
```

</TabItem>

<TabItem value='java'>

```go
err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    "my_collection", "array").WithProperty(common.MaxCapacityKey, 64))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/collections/fields/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
--data '{
    "collectionName": "my_collection",
    "field_name": "array",
    "properties": {
        "max_capacity": "64"
    }
}'
```

</TabItem>
</Tabs>

```c++
auto status = client->AlterCollectionFieldProperties(milvus::AlterCollectionFieldPropertiesRequest()
                                                .WithCollectionName("my_collection")
                                                .WithFieldName("array")
                                                .AddProperty("max_capacity", "64"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## フィールドレベルの mmap 設定の変更\{#alter-field-level-mmap-settings}

メモリマッピング（Mmap）を使用すると、ディスク上の大きなファイルに直接メモリアクセスできるようになり、Zilliz Cloud はインデックスやデータをメモリとハードドライブの両方に保存できるようになります。このアプローチにより、アクセス頻度に基づいてデータ配置ポリシーを最適化し、検索パフォーマンスに影響を与えることなくコレクションのストレージ容量を拡張できます。

次の例では、コレクションに `doc_chunk` というフィールドがあることを前提として、その `mmap_enabled` プロパティを設定しています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.alter_collection_field(
    collection="my_collection",
    field_name="doc_chunk",
    properties={"mmap.enabled": True}
)
```

</TabItem>

<TabItem value='java'>

```java
client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("doc_chunk")
        .property("mmap.enabled", "True")
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
await client.alterCollectionProperties({
  collection_name: "my_collection",
  field_name: 'doc_chunk',
  properties: { 
      'mmap.enabled': true, 
  }
});
```

</TabItem>

<TabItem value='java'>

```go
err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    "my_collection", "doc_chunk").WithProperty(common.MmapEnabledKey, true))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/collections/fields/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
--data '{
    "collectionName": "my_collection",
    "field_name": "doc_chunk",
    "properties": {
        "mmap.enabled": True
    }
}'
```

</TabItem>
</Tabs>

```c++
auto status = client->AlterCollectionFieldProperties(milvus::AlterCollectionFieldPropertiesRequest()
                                                    .WithCollectionName("my_collection")
                                                    .WithFieldName("doc_chunk")
                                                    .AddProperty("mmap.enabled", "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
