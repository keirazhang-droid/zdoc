---
title: "検索のためのデータモデル設計 | Cloud"
slug: /schema-design-hands-on
sidebar_key: schema-design-hands-on
sidebar_label: "データモデル設計"
beta: FALSE
notebook: FALSE
description: "情報検索システム（検索エンジンとも呼ばれます）は、RAG（検索拡張生成）、ビジュアル検索、商品レコメンデーションなど、さまざまなAIアプリケーションに不可欠です。これらのシステムの中核には、情報を整理、インデックス化、検索するための慎重に設計されたデータモデルがあります。 | Cloud"
type: origin
token: PV2bwNENViEjXWkOgzZcXoKHnce
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - スキーマ設計
  - ハンズオン

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 検索のためのデータモデル設計

情報検索システム、通称検索エンジンは、Retrieval-augmented generation (RAG)、ビジュアル検索、商品推薦など、さまざまなAIアプリケーションに不可欠です。これらのシステムの中核には、情報を整理、インデックス化、検索するための慎重に設計されたデータモデルがあります。

Zilliz Cloud では、コレクションスキーマを通じて検索データモデルを指定でき、非構造化データとその密ベクトルまたは疎ベクトル表現、および構造化メタデータを整理します。テキスト、画像、その他のデータタイプを扱う場合でも、この実践ガイドでスキーマの主要な概念を理解し、実際に検索データモデルを設計するのに役立ちます。

![Kc3Cweq1AhAmMGbrVgRcTlTKnUf](https://zdoc-images.s3.us-west-2.amazonaws.com/Kc3Cweq1AhAmMGbrVgRcTlTKnUf.png)

## データモデル\{#data-model}

検索システムのデータモデル設計には、ビジネスニーズの分析と、スキーマで表現されるデータモデルへの情報の抽象化が含まれます。明確に定義されたスキーマは、データモデルをビジネス目標に合わせ、データの一貫性とサービス品質を確保するために重要です。さらに、適切なデータタイプとインデックスの選択は、ビジネス目標を経済的に達成する上で重要です。

### ビジネスニーズの分析\{#analyzing-business-needs}

ビジネスニーズを効果的に解決するには、ユーザーが実行するクエリのタイプを分析し、最適な検索方法を決定することから始まります。

- **ユーザークエリ:** ユーザーが実行すると予想されるクエリのタイプを特定します。これにより、スキーマが実際のユースケースをサポートし、検索パフォーマンスを最適化できるようになります。これらには以下が含まれる場合があります：

    - 自然言語クエリに一致するドキュメントの取得

    - 参照画像に類似した画像、またはテキスト説明に一致する画像の検索

    - 名前、カテゴリ、ブランドなどの属性による商品検索

    - 構造化メタデータに基づくアイテムのフィルタリング（例：公開日、タグ、評価）

    - ハイブリッドクエリでの複数条件の組み合わせ（例：ビジュアル検索で、画像とそのキャプションの両方のセマンティック類似性を考慮）

- **検索方法:** ユーザーが実行するクエリのタイプに合わせて、適切な検索手法を選択します。異なる方法は異なる目的に役立ち、しばしば組み合わせてより強力な結果を得ることができます：

    - **セマンティック検索**: 密ベクトルの類似性を使用して、意味が類似したアイテムを見つけます。テキストや画像などの非構造化データに最適です。

    - **全文検索**: セマンティック検索をキーワードマッチングで補完します。全文検索は、字句解析を利用して長い単語を断片化されたトークンに分割するのを防ぎ、検索時に特殊な用語を把握できます。

    - **メタデータフィルタリング**: ベクトル検索に加えて、日付範囲、カテゴリ、タグなどの制約を適用します。

### ビジネス要件の検索データモデルへの変換\{#translates-business-requirements-into-a-search-data-model}

次のステップは、情報の中核となるコンポーネントとその検索方法を特定することで、ビジネス要件を具体的なデータモデルに変換することです：

- 保存する必要があるデータを定義します。例えば、生コンテンツ（テキスト、画像、音声）、関連メタデータ（タイトル、タグ、著者情報）、およびコンテキスト属性（タイムスタンプ、ユーザービヘイビアなど）

- 各要素に適切なデータタイプとフォーマットを決定します。例えば：

    - テキスト説明 → string

    - 画像またはドキュメントの埋め込み → 密ベクトルまたは疎ベクトル

    - カテゴリ、タグ、またはフラグ → string、array、および bool

    - 価格や評価などの数値属性 → integer または float

    - 著者詳細などの構造化情報 → json

これらの要素の明確な定義により、データの一貫性、正確な検索結果、および下流のアプリケーションロジックとの統合の容易さが確保されます。

## スキーマ設計\{#schema-design}

Zilliz Cloud では、データモデルはコレクションスキーマを通じて表現されます。コレクションスキーマ内で適切なフィールドを設計することは、効果的な検索を可能にする鍵です。各フィールドは、コレクションに保存される特定のタイプのデータを定義し、検索プロセスにおいて独自の役割を果たします。高レベルでは、Zilliz Cloud は2つの主要なフィールドタイプをサポートしています：**ベクトルフィールド** と **スカラーフィールド** です。

ここで、データモデルをベクトルおよび補助的なスカラーフィールドを含むフィールドのスキーマにマッピングできます。各フィールドがデータモデルの属性と相関していることを確認し、特にベクトルタイプ（密または疎）とその次元に注意してください。

### ベクトルフィールド\{#vector-field}

ベクトルフィールドは、テキスト、画像、音声などの非構造化データタイプの埋め込みを保存します。これらの埋め込みは、データタイプと使用される検索方法に応じて、密、疎、またはバイナリのいずれかになります。通常、密ベクトルはセマンティック検索に使用され、疎ベクトルは全文検索や字句マッチングにより適しています。バイナリベクトルは、ストレージと計算リソースが制限されている場合に有用です。コレクションには、マルチモーダルまたはハイブリッド検索戦略を可能にするために、複数のベクトルフィールドを含めることができます。このトピックの詳細ガイドについては、[マルチベクトルハイブリッド検索](./hybrid-search) を参照してください。

Zilliz Cloud は、以下のベクトルデータタイプをサポートしています：[密ベクトル](./use-dense-vector) 用の `FLOAT_VECTOR`、[疎ベクトル](./use-sparse-vector) 用の `SPARSE_FLOAT_VECTOR`、[バイナリベクトル](./use-binary-vector) 用の `BINARY_VECTOR` です。

### スカラーフィールドと複合フィールド\{#scalar-and-composite-fields}

スカラーフィールドは、数値、文字列、日付などのメタデータと一般的に呼ばれる原始的で構造化された値を保存します。これらの値は、ベクトル検索結果とともに返すことができ、フィルタリングとソートに不可欠です。これらにより、特定のカテゴリのドキュメントに限定する、または定義された時間範囲に絞り込むなど、特定の属性に基づいて検索結果を絞り込むことができます。

Zilliz Cloud は、`BOOL`、`INT8/16/32/64`、`FLOAT`、`DOUBLE`、`VARCHAR` などのスカラータイプ、および `JSON` や `ARRAY` などの複合タイプをサポートし、非ベクトルデータの保存とフィルタリングを行います。これらのタイプは、検索操作の精度とカスタマイズ性を高めます。

## スキーマ設計での高度な機能の活用\{#leverage-advanced-features-in-schema-design}

スキーマを設計する際、サポートされているデータタイプを使用してデータをフィールドにマッピングするだけでは不十分です。フィールド間の関係と、設定可能な戦略を徹底的に理解することが不可欠です。設計段階で主要な機能を念頭に置くことで、スキーマが即時のデータ処理要件を満たすだけでなく、将来のニーズに対してスケーラブルで適応可能であることを確保できます。これらの機能を慎重に統合することで、Zilliz Cloud の機能を最大限に活用し、より広範なデータ戦略と目標をサポートする強固なデータアーキテクチャを構築できます。以下は、コレクションスキーマを作成する際の主要な機能の概要です：

### プライマリキー\{#primary-key}

プライマリキーフィールドは、コレクション内の各エンティティを一意に識別するため、スキーマの基本的なコンポーネントです。プライマリキーの定義は必須です。これは整数または文字列タイプのスカラーフィールドで、`is_primary=True` とマークする必要があります。オプションで、プライマリキーに対して `auto_id` を有効にできます。これにより、コレクションにデータが取り込まれるにつれて単調に増加する整数が自動的に割り当てられます。

詳細については、[プライマリフィールドとAutoID](./primary-field-auto-id) を参照してください。

### パーティショニング\{#partitioning}

検索を高速化するために、オプションでパーティショニングを有効にできます。パーティショニング用の特定のスカラーフィールドを指定し、検索時にこのフィールドに基づいてフィルタリング条件を指定することで、検索範囲を関連するパーティションのみに効果的に限定できます。この方法により、検索ドメインを縮小することで、検索操作の効率が大幅に向上します。

詳細については、[パーティションキーの使用](./use-partition-key) を参照してください。

### アナライザー\{#analyzer}

アナライザーは、テキストデータを処理および変換するための不可欠なツールです。その主な機能は、生のテキストをトークンに変換し、インデックス化と検索のために構造化することです。これは、文字列をトークン化し、ストップワードを削除し、個々の単語をトークンにステミングすることで行います。

詳細については、[アナライザー概要](./analyzer-overview) を参照してください。

### 関数\{#function}

Zilliz Cloud では、スキーマの一部として組み込み関数を定義し、特定のフィールドを自動的に導出できます。例えば、組み込みの BM25関数 を追加して、`VARCHAR` フィールドから疎ベクトルを生成し、全文検索をサポートできます。これらの関数導出フィールドは、前処理を効率化し、コレクションが自己完結的でクエリ対応の状態を維持することを保証します。

詳細については、[全文検索](./full-text-search) を参照してください。

## 実世界の例\{#a-real-world-example}

このセクションでは、上記の図に示されたマルチメディアドキュメント検索アプリケーションのスキーマ設計とコード例を概説します。このスキーマは、以下のフィールドにマッピングされるデータを含む記事のデータセットを管理するように設計されています：

<table>
   <tr>
     <th><p><strong>フィールド</strong></p></th>
     <th><p><strong>データソース</strong></p></th>
     <th><p><strong>検索方法で使用</strong></p></th>
     <th><p><strong>プライマリキー</strong></p></th>
     <th><p><strong>パーティションキー</strong></p></th>
     <th><p><strong>アナライザー</strong></p></th>
     <th><p><strong>関数入力/出力</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code>INT64</code>)</p></td>
     <td><p><code>auto_id</code> 有効で自動生成</p></td>
     <td><p><a href="./get-and-scalar-query">Getを使用したクエリ</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>title (<code>VARCHAR</code>)</p></td>
     <td><p>記事タイトル</p></td>
     <td><p><a href="./text-match">テキストマッチ</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>timestamp (<code>INT32</code>)</p></td>
     <td><p>公開日</p></td>
     <td><p><a href="./use-partition-key">パーティションキーによるフィルタリング</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text (<code>VARCHAR</code>)</p></td>
     <td><p>記事の生テキスト</p></td>
     <td><p><a href="./hybrid-search">マルチベクトルハイブリッド検索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>input</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code>FLOAT_VECTOR</code>)</p></td>
     <td><p>テキスト埋め込みモデルによって生成された密ベクトル</p></td>
     <td><p><a href="./single-vector-search">基本ベクトル検索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code>SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>組み込みBM25関数によって自動生成された疎ベクトル</p></td>
     <td><p><a href="./full-text-search">全文検索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>output</p></td>
   </tr>
</table>

スキーマと、さまざまなタイプのフィールドを追加するための詳細なガイダンスについては、[スキーマの解説](./schema-explained) を参照してください。

### ステップ1: スキーマの初期化\{#step-1-initialize-schema}

まず、空のスキーマを作成する必要があります。このステップでは、データモデルを定義するための基礎構造を確立します。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

schema = MilvusClient.create_schema()
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create an empty schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

//Skip this step using JavaScript
```

</TabItem>

<TabItem value='java'>

```go
import "github.com/milvus-io/milvus/client/v2/entity"

schema := entity.NewSchema()
```

</TabItem>

<TabItem value='java'>

```bash
# Skip this step using cURL
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

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
```

### ステップ 2: フィールドを追加する\{#step-2-add-fields}

スキーマが作成されたら、次のステップはデータを構成するフィールドを指定することです。各フィールドには、それぞれのデータ型と属性が関連付けられます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import DataType

schema.add_field(field_name="article_id", datatype=DataType.INT64, is_primary=True, auto_id=True, description="article id")
schema.add_field(field_name="title", datatype=DataType.VARCHAR, enable_analyzer=True, enable_match=True, max_length=200, description="article title")
schema.add_field(field_name="timestamp", datatype=DataType.INT32, description="publish date")
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=2000, enable_analyzer=True, description="article text content")
schema.add_field(field_name="text_dense_vector", datatype=DataType.FLOAT_VECTOR, dim=768, description="text dense vector")
schema.add_field(field_name="text_sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR, description="text sparse vector")
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName("article_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(200)
        .enableAnalyzer(true)
        .enableMatch(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("timestamp")
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(2000)
        .enableAnalyzer(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("text_dense_vector")
        .dataType(DataType.FloatVector)
        .dimension(768)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("text_sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
const fields = [
    {
        name: "article_id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: true
    },
    {
        name: "title",
        data_type: DataType.VarChar,
        max_length: 200,
        enable_analyzer: true,
        enable_match: true
    },
    {
        name: "timestamp",
        data_type: DataType.Int32
    },
    {
        name: "text",
        data_type: DataType.VarChar,
        max_length: 2000,
        enable_analyzer: true
    },
    {
        name: "text_dense_vector",
        data_type: DataType.FloatVector,
        dim: 768
    },
    {
        name: "text_sparse_vector",
        data_type: DataType.SparseFloatVector
    }
]
```

</TabItem>

<TabItem value='java'>

```go
schema.WithField(entity.NewField().
    WithName("article_id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithIsAutoID(true).
    WithDescription("article id"),
).WithField(entity.NewField().
    WithName("title").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(200).
    WithEnableAnalyzer(true).
    WithEnableMatch(true).
    WithDescription("article title"),
).WithField(entity.NewField().
    WithName("timestamp").
    WithDataType(entity.FieldTypeInt32).
    WithDescription("publish date"),
).WithField(entity.NewField().
    WithName("text").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(2000).
    WithEnableAnalyzer(true).
    WithDescription("article text content"),
).WithField(entity.NewField().
    WithName("text_dense_vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768).
    WithDescription("text dense vector"),
).WithField(entity.NewField().
    WithName("text_sparse_vector").
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription("text sparse vector"),
)
```

</TabItem>

<TabItem value='java'>

```bash
export fields='[
    {
        "fieldName": "article_id",
        "dataType": "Int64",
        "isPrimary": true
    },
    {
        "fieldName": "title",
        "dataType": "VarChar",
        "elementTypeParams": {
            "max_length": 200,
            "enable_analyzer": true,
            "enable_match": true
        }
    },
    {
        "fieldName": "timestamp",
        "dataType": "Int32"
    },
    {
       "fieldName": "text",
       "dataType": "VarChar",
       "elementTypeParams": {
            "max_length": 2000,
            "enable_analyzer": true
        }
    },
    {
       "fieldName": "text_dense_vector",
       "dataType": "FloatVector",
       "elementTypeParams": {
            "dim": 768
        }
    },
    {
       "fieldName": "text_sparse_vector",
       "dataType": "SparseFloatVector",
    }
]'

export schema="{
    \"autoID\": true,
    \"fields\": $fields
}"
```

</TabItem>
</Tabs>

```c++
schema->AddField({"article_id", milvus::DataType::INT64, "", true, true});
schema->AddField(milvus::FieldSchema("title", milvus::DataType::VARCHAR)
                    .WithMaxLength(200).EnableAnalyzer(true).EnableMatch(true));
schema->AddField(milvus::FieldSchema("timestamp", milvus::DataType::INT32));
schema->AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR)
                    .WithMaxLength(2000).EnableAnalyzer(true));
schema->AddField(milvus::FieldSchema("text_dense_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(768));
schema->AddField(milvus::FieldSchema("text_sparse_vector", milvus::DataType::SPARSE_FLOAT_VECTOR));
```

この例では、フィールドに対して以下の属性が指定されています:

- プライマリキー: `article_id` がプライマリキーとして使用され、受信エンティティにプライマリキーを自動的に割り当てることができます。

- パーティションキー: `timestamp` がパーティションキーとして割り当てられ、パーティションによるフィルタリングが可能になります。

- テキストアナライザ: テキストアナライザは2つの文字列フィールド `title` と `text` に適用され、それぞれテキスト一致と全文検索をサポートします。

### Step 3: (Optional) Add functions\{#step-3-optional-add-functions}

データクエリ機能を強化するために、スキーマに関数を組み込むことができます。例えば、特定のフィールドに関連する処理を行う関数を作成できます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

bm25_function = Function(
    name="text_bm25",
    input_field_names=["text"],
    output_field_names=["text_sparse_vector"],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

import java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("text_sparse_vector"))
        .build());
```

</TabItem>

<TabItem value='java'>

```javascript
import FunctionType from "@zilliz/milvus2-sdk-node";

const functions = [
    {
      name: 'text_bm25',
      description: 'bm25 function',
      type: FunctionType.BM25,
      input_field_names: ['text'],
      output_field_names: ['text_sparse_vector'],
      params: {},
    },
]；
```

</TabItem>

<TabItem value='java'>

```go
function := entity.NewFunction().
    WithName("text_bm25").
    WithInputFields("text").
    WithOutputFields("text_sparse_vector").
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
```

</TabItem>

<TabItem value='java'>

```bash
export myFunctions='[
    {
        "name": "text_bm25",
        "type": "BM25",
        "inputFieldNames": ["text"],
        "outputFieldNames": ["text_sparse_vector"],
        "params": {}
    }
]'

export schema="{
    \"autoID\": true,
    \"fields\": $fields
    \"functions\": $myFunctions
}"
```

</TabItem>
</Tabs>

```c++
milvus::FunctionPtr function = std::make_shared<milvus::Function>("text_bm25", milvus::FunctionType::BM25);
function->AddInputFieldName("text");
function->AddOutputFieldName("text_sparse_vector");
schema->AddFunction(function);
```

この例では、スキーマに組み込みの BM25関数 を追加し、`text` フィールドを入力として使用し、結果の 疎ベクトル を `text_sparse_vector` フィールドに格納します。

## 次の手順\{#next-steps}

- [コレクションの作成](./manage-collections-sdks)

- [コレクションフィールドの変更](./alter-collection-field)

