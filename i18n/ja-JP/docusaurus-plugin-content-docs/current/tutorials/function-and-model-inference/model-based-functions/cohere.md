---
title: "Cohere | Cloud"
slug: /cohere
sidebar_key: cohere
sidebar_label: "Cohere"
beta: FALSE
notebook: FALSE
description: "このトピックでは、Milvus で Cohere 埋め込み関数を構成および使用する方法について説明します。 | Cloud"
type: origin
token: WVaVw8J7UiYZ52kaqVUcktqAnAf
sidebar_position: 8
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 関数
  - モデル
  - 推論
  - テキスト
  - 埋め込み
  - Cohere

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cohere

このトピックでは、MilvusでCohere埋め込み関数を設定および使用する方法について説明します。

## モデルの選択\{#model-choices}

MilvusはCohereが提供する埋め込みモデルをサポートしています。以下は、現在利用可能な埋め込みモデルのクイックリファレンスです。

<table>
   <tr>
     <th><p>モデル名</p></th>
     <th><p>次元数</p></th>
     <th><p>最大トークン数</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>embed-english-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>テキストを分類したり、埋め込みに変換したりできるモデル。英語のみ。</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>多言語の分類と埋め込みサポートを提供します。<a href="https://docs.cohere.com/docs/supported-languages">サポートされている言語はこちら</a>。</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>より小さく、より高速なバージョンの<code>embed-english-v3.0</code>。機能はほぼ同じですが、はるかに高速です。英語のみ。</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>より小さく、より高速なバージョンの<code>embed-multilingual-v3.0</code>。機能はほぼ同じですが、はるかに高速です。複数の言語をサポートしています。</p></td>
   </tr>
   <tr>
     <td><p>embed-english-v2.0</p></td>
     <td><p>4,096</p></td>
     <td><p>512</p></td>
     <td><p>古い埋め込みモデルで、テキストを分類したり埋め込みに変換したりできます。英語のみ。</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v2.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>embed-english-v2.0のより小さくより高速なバージョン。機能はほぼ同じですが、はるかに高速です。英語のみ。</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v2.0</p></td>
     <td><p>768</p></td>
     <td><p>256</p></td>
     <td><p>多言語の分類と埋め込みサポートを提供します。<a href="https://docs.cohere.com/docs/supported-languages">サポートされている言語はこちら</a>。</p></td>
   </tr>
</table>

詳細については、[Cohereの埋め込みモデル](https://docs.cohere.com/docs/cohere-embed) を参照してください。

## 始める前に\{#before-you-start}

テキスト埋め込み関数を使用する前に、以下の前提条件が満たされていることを確認してください。

- **埋め込みモデルを選択**

    使用する埋め込みモデルを決定します。この選択によって埋め込みの動作と出力形式が決まります。詳細については、[埋め込みモデルを選択](./cohere#model-choices) を参照してください。

- **Cohereと連携し、統合IDを取得**

    Cohereとのモデルプロバイダー連携を作成し、統合IDを取得する必要があります。詳細については、[モデルプロバイダーとの連携](./integrate-with-model-providers) を参照してください。

- **互換性のあるコレクションスキーマを設計**

    コレクションスキーマに以下を含めるように計画します。

    - 生の入力テキスト用のテキストフィールド（`VARCHAR`）

    - 選択した埋め込みモデルにデータ型と次元が一致するdenseベクトルフィールド

- **挿入時および検索時にrawテキストを扱う準備**

    テキスト埋め込み関数を有効にすると、生のテキストを直接挿入およびクエリできます。埋め込みはシステムによって自動的に生成されます。

## ステップ1: テキスト埋め込み関数を使用したコレクションの作成\{#step-1-create-a-collection-with-a-text-embedding-function}

### スキーマフィールドの定義\{#define-schema-fields}

埋め込み関数を使用するには、特定のスキーマでコレクションを作成します。このスキーマには、少なくとも3つの必須フィールドを含める必要があります。

- コレクション内の各エンティティを一意に識別するプライマリフィールド。

- 埋め込む生データを格納する`VARCHAR`フィールド。

- テキスト埋め込み関数が`VARCHAR`フィールドに対して生成するdenseベクトル埋め込みを格納するために予約されたベクトルフィールド。

次の例では、テキストデータを格納するスカラーフィールド`"document"`と、Functionモジュールによって生成される埋め込みを格納するベクトルフィールド`"dense"`を持つスキーマを定義しています。選択した埋め込みモデルの出力に合わせてベクトルの次元（`dim`）を設定することを忘れないでください。

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
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=1024)
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
        .dimension(1024)
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
schema->AddField(milvus::FieldSchema("dense", milvus::DataType::FLOAT_VECTOR).WithDimension(1024));

```

</TabItem>
</Tabs>

### テキスト埋め込み関数の定義\{#define-the-text-embedding-function}

Milvus の Function モジュールは、スカラー フィールドに格納された生データを自動的に埋め込みベクトルに変換し、明示的に定義されたベクトル フィールドに格納します。

以下の例では、スカラー フィールド `"document"` を埋め込みベクトルに変換する Function モジュール（`cohere_func`）を追加し、結果として得られるベクトルを前述の `"dense"` ベクトル フィールドに格納しています。

埋め込み関数を定義したら、それをコレクション スキーマに追加します。これにより、Milvus は指定された埋め込み関数を使用してテキスト データから埋め込みを処理・保存するよう指示されます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Define embedding function specifically for embedding model provider
text_embedding_function = Function(
    name="cohere_func",                                 # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,           # Indicates a text embedding function
    input_field_names=["document"],                     # Scalar field(s) containing text data to embed
    output_field_names=["dense"],                       # Vector field(s) for storing embeddings
    params={                                            # Provider-specific embedding parameters (function-level)
        "provider": "cohere",                           # Must be set to "cohere"
        "model_name": "embed-english-v3.0",             # Specifies the embedding model to use

        "integration_id": "YOUR_INTEGRATION_ID",    # Integration ID generated in the Zilliz Cloud console for the selected model provider

        # "url": "https://api.cohere.com/v2/embed",     # Defaults to the official endpoint if omitted
        # "truncate": "NONE",                           # Specifies how the API will handle inputs longer than the maximum token length.
    }
)

# Add the configured embedding function to your existing collection schema
schema.add_function(text_embedding_function)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

Function function = Function.builder()
        .functionType(FunctionType.TEXTEMBEDDING)
        .name("cohere_func")
        .inputFieldNames(Collections.singletonList("document"))
        .outputFieldNames(Collections.singletonList("dense"))
        .param("provider", "cohere")
        .param("model_name", "embed-english-v3.0")

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
milvus::FunctionPtr function = std::make_shared<milvus::Function>("cohere_func", milvus::FunctionType::TEXTEMBEDDING);
function->AddInputFieldName("document");
function->AddOutputFieldName("dense");
function->AddParam("provider", "cohere");
function->AddParam("model_name", "embed-english-v3.0");

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