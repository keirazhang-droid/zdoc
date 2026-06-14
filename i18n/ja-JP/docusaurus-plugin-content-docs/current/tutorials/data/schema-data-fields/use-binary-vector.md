---
title: "バイナリベクトル | Cloud"
slug: /use-binary-vector
sidebar_key: use-binary-vector
sidebar_label: "バイナリベクトル"
beta: FALSE
notebook: FALSE
description: "バイナリベクトルは、従来の高次元浮動小数点ベクトルを0と1のみで構成されるバイナリベクトルに変換する、特殊なデータ表現形式です。この変換により、ベクトルのサイズが圧縮されるだけでなく、意味情報を保持しつつストレージと計算コストが削減されます。重要でない特徴の精度が必須でない場合、バイナリベクトルは元の浮動小数点ベクトルの完全性と有用性のほとんどを効果的に維持できます。 | Cloud"
type: origin
token: NTwawtvYdiXTkukbss7ccw2RnXc
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - バイナリベクトル

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# バイナリベクトル

バイナリベクトルは、従来の高次元浮動小数点ベクトルを0と1のみを含むバイナリベクトルに変換する特殊なデータ表現形式です。この変換により、ベクトルのサイズが圧縮されるだけでなく、ストレージと計算コストが削減されながらも、セマンティック情報が保持されます。非重要な特徴の精度が必須でない場合、バイナリベクトルは元の浮動小数点ベクトルの大部分の完全性と有用性を効果的に維持できます。

バイナリベクトルは幅広い応用があり、特に計算効率とストレージの最適化が重要な状況で有用です。大規模なAIシステム（検索エンジンや推薦システムなど）では、大量のデータのリアルタイム処理が鍵となります。ベクトルのサイズを削減することで、バイナリベクトルは精度を大きく犠牲にすることなく、レイテンシと計算コストを削減するのに役立ちます。さらに、バイナリベクトルは、メモリと処理能力が限られたモバイルデバイスや組み込みシステムなど、リソースが制約された環境でも有用です。バイナリベクトルを使用することで、これらの制約された環境でも複雑なAI機能を高いパフォーマンスを維持しながら実装できます。

## 概要\{#overview}

バイナリベクトルは、画像、テキスト、音声などの複雑なオブジェクトを固定長のバイナリ値にエンコードする方法です。Zilliz Cloud クラスタでは、バイナリベクトルは通常、ビット配列またはバイト配列として表現されます。例えば、8次元のバイナリベクトルは `[1, 0, 1, 1, 0, 0, 1, 0]` と表現できます。

以下の図は、バイナリベクトルがテキストコンテンツ内のキーワードの存在をどのように表現するかを示しています。この例では、10次元のバイナリベクトルを使用して2つの異なるテキスト（**テキスト1** と **テキスト2**）を表現しており、各次元は語彙内の単語に対応しています。1はテキスト内にその単語が存在することを示し、0は存在しないことを示します。

![TuIGwtyEkh9g04bvo0icsWdynBd](https://zdoc-images.s3.us-west-2.amazonaws.com/TuIGwtyEkh9g04bvo0icsWdynBd.png)

バイナリベクトルには以下の特徴があります。

- **効率的なストレージ:** 各次元には1ビットのストレージのみが必要であり、ストレージスペースを大幅に削減できます。

- **高速な計算:** ベクトル間の類似度は、XORなどのビット演算を使用して高速に計算できます。

- **固定長:** 元のテキストの長さに関わらず、ベクトルの長さは一定であり、インデックス作成と検索が容易になります。

- **シンプルで直感的:** キーワードの存在を直接的に反映し、特定の専門的な検索タスクに適しています。

バイナリベクトルは様々な方法で生成できます。テキスト処理では、事前定義された語彙を使用して単語の存在に基づいて対応するビットを設定できます。画像処理では、[pHash](https://en.wikipedia.org/wiki/Perceptual_hashing) などの知覚ハッシュアルゴリズムを使用して画像のバイナリ特徴を生成できます。機械学習アプリケーションでは、モデルの出力を二値化してバイナリベクトル表現を取得できます。

バイナリベクトル化後、データは Zilliz Cloud クラスタに保存され、管理およびベクトル検索が行われます。以下の図は基本的なプロセスを示しています。

![TF1uw4AQVhFdmBbrhyVcJO6WnXe](https://zdoc-images.s3.us-west-2.amazonaws.com/TF1uw4AQVhFdmBbrhyVcJO6WnXe.png)

<Admonition type="info" icon="📘" title="Notes">

バイナリベクトルは特定のシナリオで優れた性能を発揮しますが、表現能力には限界があり、複雑なセマンティック関係を捉えるのが難しい場合があります。そのため、実際のシナリオでは、バイナリベクトルは効率と表現力のバランスを取るために、他のベクトルタイプと併用されることが多いです。詳細については、[Dense Vector](./use-dense-vector) と [Sparse Vector](./use-sparse-vector) を参照してください。

</Admonition>

## バイナリベクトルの使用\{#use-binary-vectors}

### ベクトルフィールドの追加\{#add-vector-field}

Zilliz Cloud クラスタでバイナリベクトルを使用するには、コレクションの作成時にバイナリベクトルを保存するためのベクトルフィールドを定義する必要があります。このプロセスには以下が含まれます。

1. `datatype` をサポートされているバイナリベクトルデータタイプ、すなわち `BINARY_VECTOR` に設定します。

1. `dim` パラメータを使用してベクトルの次元を指定します。バイナリベクトルは挿入時にバイト配列に変換する必要があるため、`dim` は8の倍数である必要があることに注意してください。8つのブール値（0または1）が1バイトにパックされます。例えば、`dim=128` の場合、挿入には16バイトの配列が必要です。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="binary_vector", datatype=DataType.BINARY_VECTOR, dim=128)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);
schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(100)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("binary_vector")
        .dataType(DataType.BinaryVector)
        .dimension(128)
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

schema.push({
  name: "binary vector",
  data_type: DataType.BinaryVector,
  dim: 128,
});
```

</TabItem>

<TabItem value='java'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
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

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(true).
    WithIsPrimaryKey(true).
    WithMaxLength(100),
).WithField(entity.NewField().
    WithName("binary_vector").
    WithDataType(entity.FieldTypeBinaryVector).
    WithDim(128),
)
```

</TabItem>

<TabItem value='java'>

```bash
export primaryField='{
    "fieldName": "pk",
    "dataType": "VarChar",
    "isPrimary": true,
    "elementTypeParams": {
        "max_length": 100
    }
}'

export vectorField='{
    "fieldName": "binary_vector",
    "dataType": "BinaryVector",
    "elementTypeParams": {
        "dim": 128
    }
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField
    ],
    \"enableDynamicField\": true
}"

```

</TabItem>
</Tabs>

```c++
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"YOUR_CLUSTER_ENDPOINT"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->SetEnableDynamicField(true);
schema->AddField(milvus::FieldSchema("pk", milvus::DataType::VARCHAR, "", true, true).WithMaxLength(100));
schema->AddField(milvus::FieldSchema("binary_vector", milvus::DataType::BINARY_VECTOR).WithDimension(128));
```

この例では、バイナリベクトルを格納するために、`binary_vector` という名前のベクトルフィールドが追加されます。このフィールドのデータ型は `BINARY_VECTOR` で、次元は128です。

### ベクトルフィールドのインデックスパラメータを設定する\{#set-index-params-for-vector-field}

検索を高速化するには、バイナリベクトルフィールドにインデックスを作成する必要があります。インデックス作成により、大規模なベクトルデータの検索効率が大幅に向上します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="binary_vector",
    index_name="binary_vector_index",
    index_type="AUTOINDEX",
    metric_type="HAMMING"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexParams = new ArrayList<>();
Map<String,Object> extraParams = new HashMap<>();

indexParams.add(IndexParam.builder()
        .fieldName("binary_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
import { MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

const indexParams = {
  indexName: "binary_vector_index",
  field_name: "binary_vector",
  metric_type: MetricType.HAMMING,
  index_type: IndexType.AUTOINDEX
};
```

</TabItem>

<TabItem value='java'>

```go
idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption("my_collection", "binary_vector", idx)
```

</TabItem>

<TabItem value='java'>

```bash
export indexParams='[
        {
            "fieldName": "binary_vector",
            "metricType": "HAMMING",
            "indexName": "binary_vector_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

```c++
std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("binary_vector", "binary_vector_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::HAMMING)
}
```

上記の例では、`binary_vector` フィールドに対して `binary_vector_index` という名前のインデックスが作成され、インデックスタイプは `AUTOINDEX` が使用されています。`metric_type` は `HAMMING` に設定されており、類似度測定にハミング距離が使用されることを示しています。

さらに、Zilliz Cloud はバイナリベクトルに対して他の類似度メトリックもサポートしています。詳細については、[メトリックタイプ](./search-metrics-explained) を参照してください。

### コレクションの作成\{#create-collection}

バイナリベクトルとインデックスの設定が完了したら、バイナリベクトルを含むコレクションを作成します。以下の例では、`create_collection` メソッドを使用して `my_collection` という名前のコレクションを作成しています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

await client.createCollection({
    collection_name: 'my_collection',
    schema: schema,
    index_params: indexParams
});
```

</TabItem>

<TabItem value='java'>

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

```c++
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                        .WithCollectionName("my_collection")
                                        .WithIndexes(std::move(indexes))
                                        .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

### データの挿入\{#insert-data}

コレクションを作成した後、`insert` メソッドを使用してバイナリベクトルを含むデータを追加します。バイナリベクトルはバイト配列の形式で指定する必要があり、各バイトは8つのブール値を表します。

たとえば、128次元のバイナリベクトルの場合、16バイトの配列が必要です（128ビット ÷ 8ビット/バイト = 16バイト）。以下はデータを挿入するためのコード例です。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
def convert_bool_list_to_bytes(bool_list):
    if len(bool_list) % 8 != 0:
        raise ValueError("The length of a boolean list must be a multiple of 8")

    byte_array = bytearray(len(bool_list) // 8)
    for i, bit in enumerate(bool_list):
        if bit == 1:
            index = i // 8
            shift = i % 8
            byte_array[index] |= (1 << shift)
    return bytes(byte_array)

bool_vectors = [
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112,
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1] + [0] * 112,
]

data = [{"binary_vector": convert_bool_list_to_bytes(bool_vector)} for bool_vector in bool_vectors]

client.insert(
    collection_name="my_collection",
    data=data
)
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

private static byte[] convertBoolArrayToBytes(boolean[] booleanArray) {
    byte[] byteArray = new byte[booleanArray.length / Byte.SIZE];
    for (int i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i]) {
            int index = i / Byte.SIZE;
            int shift = i % Byte.SIZE;
            byteArray[index] |= (byte) (1 << shift);
        }
    }

    return byteArray;
}

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
{
    boolean[] boolArray = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
    JsonObject row = new JsonObject();
    row.add("binary_vector", gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}
{
    boolean[] boolArray = {false, true, false, true, false, true, false, false, true, true, false, false, true, true, false, true};
    JsonObject row = new JsonObject();
    row.add("binary_vector", gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
const data = [
  { binary_vector: [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1] },
  { binary_vector: [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1] },
];

client.insert({
  collection_name: "my_collection",
  data: data,
});
```

</TabItem>

<TabItem value='java'>

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithBinaryVectorColumn("binary_vector", 128, [][]byte{
        {0b10011011, 0b01010100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0b10011011, 0b01010101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    }))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='java'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"data\": $data,
    \"collectionName\": \"my_collection\"
}"
```

</TabItem>
</Tabs>

```c++
std::vector<uint8_t>
ConvertToBinaryVector(const std::vector<bool>& bools) {
    size_t num_bytes = (bools.size() + 7) / 8;
    std::vector<uint8_t> bytes(num_bytes, 0);
    for (size_t i = 0; i < bools.size(); ++i) {
        size_t byte_index = i / 8;
        size_t bit_pos = i % 8;

        if (bools[i]) {
            bytes[byte_index] |= (1U << bit_pos);
        }
    }

    return bytes;
}

std::vector<bool> vector1 = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
std::vector<bool> vector2 = {false, true, false, true, false, true, false, false, true, true, false, false, true, true, false, true};
milvus::EntityRows data = {{{"binary_vector", ConvertToBinaryVector(vector1)}},
                           {{"binary_vector", ConvertToBinaryVector(vector2)}}}};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("my_collection")
                                .WithRowsData(std::move(data)),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

### 類似性検索を実行する\{#perform-similarity-search}

類似性検索は、Zilliz Cloud クラスターの中核機能の一つであり、ベクトル間の距離に基づいてクエリベクトルに最も類似したデータを迅速に見つけることができます。バイナリベクトルを使用して類似性検索を実行するには、クエリベクトルと検索パラメータを準備し、`search` メソッドを呼び出します。

検索操作では、バイナリベクトルもバイト配列の形式で提供する必要があります。クエリベクトルの次元数が `dim` を定義する際に指定した次元と一致し、かつ8つのブール値ごとに1バイトに変換されていることを確認してください。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
search_params = {
    "params": {"nprobe": 10}
}

query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    anns_field="binary_vector",
    search_params=search_params,
    limit=5,
    output_fields=["pk"]
)

print(res)

# Output
# data: ["[{'id': '453718927992172268', 'distance': 10.0, 'entity': {'pk': '453718927992172268'}}]"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("nprobe",10);

boolean[] boolArray = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
BinaryVec queryVector = new BinaryVec(convertBoolArrayToBytes(boolArray));

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .annsField("binary_vector")
        .searchParams(searchParams)
        .topK(5)
        .outputFields(Collections.singletonList("pk"))
        .build());
        
 System.out.println(searchR.getSearchResults());
 
 // Output
 //
 // [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]
```

</TabItem>

<TabItem value='java'>

```javascript
query_vector = [1,0,1,0,1,1,1,1,1,1,1,1];

client.search({
    collection_name: 'my_collection',
    data: query_vector,
    limit: 5,
    output_fields: ['pk'],
    params: {
        nprobe: 10
    }
});
```

</TabItem>

<TabItem value='java'>

```go
queryVector := []byte{0b10011011, 0b01010100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,                      // limit
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField("binary_vector").
    WithOutputFields("pk").
    WithAnnParam(annSearchParams))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("Pks: ", resultSet.GetColumn("pk").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='java'>

```bash
export searchParams='{
        "params":{"nprobe":10}
    }'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"data\": $data,
    \"annsField\": \"binary_vector\",
    \"limit\": 5,
    \"searchParams\":$searchParams,
    \"outputFields\": [\"pk\"]
}"
```

</TabItem>
</Tabs>

```c++
std::vector<bool> query_vector = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
auto request = milvus::SearchRequest()
                   .WithCollectionName("my_collection")
                   .WithAnnsField("binary_vector")
                   .WithLimit(5)
                   .AddOutputField("pk")
                   .AddFloatVector(ConvertToBinaryVector(query_vector));

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto search_results = response.Results();
for (auto& result : search_results.Results()) {
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

類似度検索パラメータの詳細については、[基本ANN検索](./single-vector-search) を参照してください。

