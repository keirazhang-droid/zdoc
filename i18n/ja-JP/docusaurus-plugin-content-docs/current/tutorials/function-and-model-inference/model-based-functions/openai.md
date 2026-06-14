---
title: "OpenAI | Cloud"
slug: /openai
sidebar_key: openai
sidebar_label: "OpenAI"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud で OpenAI のエンベディングモデルを使用するには、エンベディングモデルを選択し、テキストエンベディング関数を使用してコレクションを作成します。 | Cloud"
type: origin
token: IrQ2wm2oaiAWl4kqQhkc303Rnlg
sidebar_position: 2
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - 関数
  - モデル
  - 推論
  - テキスト
  - エンベディング
  - OpenAI

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OpenAI

Zilliz CloudでOpenAIの埋め込みモデルを使用するには、埋め込みモデルを選択し、テキスト埋め込み関数を使用してコレクションを作成します。

## モデルの選択\{#model-choices}

Zilliz CloudはOpenAIが提供するすべての埋め込みモデルをサポートしています。以下は、すぐに参照できるOpenAIの埋め込みモデルです。

<table>
   <tr>
     <th><p>モデル名</p></th>
     <th><p>次元数</p></th>
     <th><p>最大トークン数</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-3-small</p></td>
     <td><p>デフォルト: 1,536 (1,536未満の次元サイズに短縮可能)</p></td>
     <td><p>8,191</p></td>
     <td><p>コスト重視でスケーラブルなセマンティック検索に最適—低価格で高いパフォーマンスを提供します。</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-3-large</p></td>
     <td><p>デフォルト: 3,072 (3,072未満の次元サイズに短縮可能)</p></td>
     <td><p>8,191</p></td>
     <td><p>検索精度の向上とよりリッチなセマンティック表現が求められるアプリケーションに最適です。</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-ada-002</p></td>
     <td><p>固定: 1,536 (短縮不可)</p></td>
     <td><p>8,191</p></td>
     <td><p>レガシーパイプラインや下位互換性が必要なシナリオに適した従来世代のモデルです。</p></td>
   </tr>
</table>

第3世代の埋め込みモデル（**text-embedding-3**）は、`dim`パラメータを使用して埋め込みのサイズを縮小することをサポートしています。通常、より大きな埋め込みは、計算、メモリ、ストレージの観点からコストが高くなります。次元数を調整できることで、全体的なコストとパフォーマンスをより細かく制御できます。各モデルの詳細については、[埋め込みモデル](https://platform.openai.com/docs/guides/embeddings#embedding-models)および[OpenAI発表ブログ記事](https://openai.com/blog/new-embedding-models-and-api-updates)を参照してください。

## 始める前に\{#before-you-start}

テキスト埋め込み関数を使用する前に、以下の前提条件を満たしていることを確認してください。

- **埋め込みモデルを選択**

    使用する埋め込みモデルを決定します。この選択により、埋め込みの動作と出力形式が決まります。詳細については、[埋め込みモデルを選択](./openai#model-choices) を参照してください。

- **OpenAIと統合し、統合IDを取得**

    OpenAIとのモデルプロバイダー連携を作成し、その統合IDを取得する必要があります。詳細については、[モデルプロバイダーとの連携](./integrate-with-model-providers) を参照してください。

- **互換性のあるコレクションスキーマを設計**

    コレクションスキーマに以下を含めるように計画してください：

    - 生の入力テキスト用のテキストフィールド（`VARCHAR`）
    - 選択した埋め込みモデルにデータ型と次元が一致する密ベクトルフィールド

- **挿入時および検索時に生テキストを扱う準備**

    テキスト埋め込み関数を有効にすると、生テキストを直接挿入およびクエリできます。埋め込みはシステムによって自動的に生成されます。

## ステップ1: テキスト埋め込み関数を使用したコレクションの作成\{#step-1-create-a-collection-with-a-text-embedding-function}

### スキーマフィールドの定義\{#define-schema-fields}

埋め込み関数を使用するには、特定のスキーマを持つコレクションを作成します。このスキーマには、少なくとも次の3つの必須フィールドを含める必要があります。

- コレクション内の各エンティティを一意に識別するプライマリフィールド。
- 埋め込む生データを保存する`VARCHAR`フィールド。
- テキスト埋め込み関数が`VARCHAR`フィールドに対して生成する密ベクトル埋め込みを保存するために予約されたベクトルフィールド。

次の例では、テキストデータを保存するための1つの`VARCHAR`フィールド`"document"`と、テキスト埋め込み関数によって生成される密埋め込みを保存するための1つのベクトルフィールド`"dense"`を持つスキーマを定義しています。選択した埋め込みモデルの出力に合わせてベクトル次元（`dim`）を設定することを忘れないでください。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

# Initialize Milvus client
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Create a new schema for the collection
schema = client.create_schema()

# Add primary field "id"
schema.add_field("id", DataType.INT64, is_primary=True, auto_id=False)

# Add scalar field "document" for storing textual data
schema.add_field("document", DataType.VARCHAR, max_length=9000)

# Add vector field "dense" for storing embeddings.
# IMPORTANT: Set dim to match the exact output dimension of the embedding model.
# For instance, OpenAI's text-embedding-3-small model outputs 1536-dimensional vectors.
# For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=1536)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_CLUSTER_TOKEN";

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CreateCollectionReq.CollectionSchema schema = client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("document")
        .dataType(DataType.VarChar)
        .maxLength(9000)
        .build());
        
schema.addField(AddFieldReq.builder()
        .fieldName("dense")
        .dataType(DataType.FloatVector)
        .dimension(1536)
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

<TabItem value='java'>

```c++
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"YOUR_CLUSTER_ENDPOINT", "YOUR_CLUSTER_TOKEN"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"id", milvus::DataType::INT64, "", true, false});
schema->AddField(milvus::FieldSchema("document", milvus::DataType::VARCHAR).WithMaxLength(9000));
schema->AddField(milvus::FieldSchema("dense", milvus::DataType::FLOAT_VECTOR).WithDimension(1536));

```

</TabItem>
</Tabs>

### テキスト埋め込み関数の定義\{#define-the-text-embedding-function}

テキスト埋め込み関数は、`VARCHAR`フィールドに格納された生データを自動的に埋め込みに変換し、明示的に定義されたベクトルフィールドに格納します。

以下の例では、スカラーフィールド `"document"` を埋め込みに変換し、その結果得られたベクトルを事前に定義した `"dense"` ベクトルフィールドに格納するFunctionモジュール（`openai_embedding`）を追加しています。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Define embedding function (example: OpenAI provider)
text_embedding_function = Function(
    name="openai_embedding",                  # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING, # Type of embedding function
    input_field_names=["document"],           # Scalar field to embed
    output_field_names=["dense"],             # Vector field to store embeddings
    params={                                  # Provider-specific configuration (highest priority)
        "provider": "openai",                 # Embedding model provider
        "model_name": "text-embedding-3-small",     # Embedding model

        "integration_id": "YOUR_INTEGRATION_ID",    # Integration ID generated in the Zilliz Cloud console for the selected model provider

        # "dim": "1536",       # Optional: shorten the vector dimension
        # "user": "user123"    # Optional: identifier for API tracking
    }
)

# Add the embedding function to your schema
schema.add_function(text_embedding_function)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

Function function = Function.builder()
        .functionType(FunctionType.TEXTEMBEDDING)
        .name("openai_embedding")
        .inputFieldNames(Collections.singletonList("document"))
        .outputFieldNames(Collections.singletonList("dense"))
        .param("provider", "openai")
        .param("model_name", "text-embedding-3-small")

        .param("integration_id", "YOUR_INTEGRATION_ID")

        .build();
schema.addFunction(function);
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
milvus::FunctionPtr function = std::make_shared<milvus::Function>("openai_embedding", milvus::FunctionType::TEXTEMBEDDING);
function->AddInputFieldName("document");
function->AddOutputFieldName("dense");
function->AddParam("provider", "openai");
function->AddParam("model_name", "text-embedding-3-small");

function->AddParam("integration_id", "YOUR_INTEGRATION_ID");

collection_schema->AddFunction(function);
```

</TabItem>
</Tabs>

### インデックスの設定\{#configure-the-index}

必要なフィールドとビルトイン関数を使用してスキーマを定義した後、コレクション用のインデックスを設定します。このプロセスを簡略化するために、`index_type` として `AUTOINDEX` を使用してください。このオプションにより、Zilliz Cloud がデータの構造に基づいて最も適切なインデックスタイプを自動的に選択・設定します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Prepare index parameters
index_params = client.prepare_index_params()

# Add AUTOINDEX to automatically select optimal indexing method
index_params.add_index(
    field_name="dense",
    index_type="AUTOINDEX",
    metric_type="COSINE" 
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("dense")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
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

<TabItem value='java'>

```c++
std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("dense", "", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)
}

```

</TabItem>
</Tabs>

### コレクションの作成\{#create-the-collection}

定義済みのスキーマとインデックスパラメータを使用して、コレクションを作成します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Create collection named "demo"
client.create_collection(
    collection_name='demo', 
    schema=schema, 
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("demo")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
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
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                    .WithCollectionName("demo")
                                    .WithIndexes(std::move(indexes))
                                    .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>
</Tabs>

## ステップ 2: データの挿入\{#step-2-insert-data}

コレクションとインデックスの設定が完了したら、生データを挿入できます。このプロセスでは、生のテキストを提供するだけで済みます。先ほど定義した Function モジュールが、各テキストエントリに対応するスパースベクトルを自動的に生成します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Insert sample documents
client.insert('demo', [
    {'id': 1, 'document': 'Milvus simplifies semantic search through embeddings.'},
    {'id': 2, 'document': 'Vector embeddings convert text into searchable numeric data.'},
    {'id': 3, 'document': 'Semantic search helps users find relevant information quickly.'},
])
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
List<JsonObject> rows = Arrays.asList(
        gson.fromJson("{\"id\": 0, \"document\": \"Milvus simplifies semantic search through embeddings.\"}", JsonObject.class),
        gson.fromJson("{\"id\": 1, \"document\": \"Vector embeddings convert text into searchable numeric data.\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"document\": \"Semantic search helps users find relevant information quickly.\"}", JsonObject.class),
);

client.insert(InsertReq.builder()
        .collectionName("demo")
        .data(rows)
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

<TabItem value='java'>

```c++
milvus::EntityRows data = {
    {{"id", 1}, {"document", "Milvus simplifies semantic search through embeddings."}},
    {{"id", 2}, {"document", "Vector embeddings convert text into searchable numeric data."}},
    {{"id", 3}, {"document", "Semantic search helps users find relevant information quickly."}}
};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("demo")
                                .WithRowsData(std::move(data))
                                , response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>
</Tabs>

## Step 3: Search with text\{#step-3-search-with-text}

データの挿入後、生のクエリテキストを使用してセマンティック検索を実行します。Milvusは自動的にクエリを埋め込みベクトルに変換し、類似性に基づいて関連ドキュメントを取得し、最も一致する結果を返します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Perform semantic search
results = client.search(
    collection_name='demo', 
    data=['How does Milvus handle semantic search?'], # Use text query rather than query vector
    anns_field='dense',   # Use the vector field that stores embeddings
    limit=1,
    output_fields=['document'],
)

print(results)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.response.SearchResp;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("demo")
        .data(Collections.singletonList(new EmbeddedText("How does Milvus handle semantic search?")))
        .limit(1)
        .outputFields(Collections.singletonList("document"))
        .build());
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
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
auto request = milvus::SearchRequest()
                   .WithCollectionName("demo")
                   .AddEmbeddedText("How does Milvus handle semantic search?")
                   .WithLimit(1)
                   .WithAnnsField("dense")
                   .AddOutputField("document");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>

</Tabs>

詳細については、[基本ベクトル検索](./single-vector-search) と [クエリ](./get-and-scalar-query) を参照してください。