---
title: "RRF Ranker | Cloud"
slug: /reranking-rrf
sidebar_key: reranking-rrf
sidebar_label: "RRF Ranker"
beta: FALSE
notebook: FALSE
description: "Reciprocal Rank Fusion (RRF) Ranker は、Zilliz Cloud のハイブリッド検索におけるリランキング戦略であり、生の類似度スコアではなく、複数のベクトル検索パスでの順位に基づいて結果のバランスを取ります。スポーツ大会が個々の統計ではなく選手の順位を考慮するように、RRF Ranker は各アイテムが異なる検索パスでどの程度高くランク付けされているかに基づいて検索結果を結合し、公平でバランスの取れた最終的な順位を生成します。 | Cloud"
type: origin
token: Nqguwf6ikiKrHEkGKgAc8g7Lnnh
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - 検索結果のリランキング
  - リランキング
  - RRF

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RRF Ranker

Reciprocal Rank Fusion (RRF) Ranker は、Zilliz Cloud ハイブリッド検索のための再ランキング戦略であり、生の類似度スコアではなく、複数のベクター検索パスからの結果をそのランキング位置に基づいてバランスさせます。個別の統計ではなく選手のランキングを考慮するスポーツ大会のように、RRF Ranker は各アイテムが異なる検索パスでどの程度上位にランクされているかに基づいて検索結果を結合し、公平でバランスの取れた最終ランキングを作り出します。

## RRF Ranker を使用する場合\{#when-to-use-rrf-ranker}

RRF Ranker は、明示的な重要度の重みを割り当てずに、複数のベクター検索パスからの結果をバランスさせたいハイブリッド検索シナリオ向けに特別に設計されています。特に以下のシナリオで効果的です：

<table>
   <tr>
     <th><p>ユースケース</p></th>
     <th><p>例</p></th>
     <th><p>RRF Ranker が有効な理由</p></th>
   </tr>
   <tr>
     <td><p>同等の重要度を持つマルチモーダル検索</p></td>
     <td><p>両方のモダリティが同等に重要な画像とテキストの検索</p></td>
     <td><p>任意の重み割り当てを必要とせずに結果をバランスさせる</p></td>
   </tr>
   <tr>
     <td><p>アンサンブルベクター検索</p></td>
     <td><p>異なる埋め込みモデルからの結果を組み合わせる</p></td>
     <td><p>特定のモデルのスコア分布に偏ることなく、ランキングを民主的に統合する</p></td>
   </tr>
   <tr>
     <td><p>クロスリンガル検索</p></td>
     <td><p>複数の言語にわたるドキュメントを検索する</p></td>
     <td><p>言語固有の埋め込み特性に関係なく、結果を公平にランク付けする</p></td>
   </tr>
   <tr>
     <td><p>エキスパートレコメンデーション</p></td>
     <td><p>複数のエキスパートシステムからのレコメンデーションを組み合わせる</p></td>
     <td><p>異なるシステムが比較不可能なスコアリング方法を使用する場合にコンセンサスランキングを作成する</p></td>
   </tr>
</table>

ハイブリッド検索アプリケーションで、明示的な重みを割り当てずに複数の検索パスを民主的にバランスさせる必要がある場合、RRF Ranker が理想的な選択肢です。

## RRF Ranker の仕組み\{#mechanism-of-rrf-ranker}

RRFRanker 戦略の主なワークフローは次のとおりです：

1. **検索ランキングを収集**：各ベクター検索パスからの結果のランキング (rank_1、rank_2) を収集します。

1. **ランキングを統合**：各パスからのランキング (rank_rrf_1、rank_rrf_2) を数式に従って変換します。

    計算式には、検索回数を表す *N* が含まれます。*ranki*(*d*) は、*i* 番目のリトリーバーによって生成されたドキュメント *d* のランキング位置です。*k* は通常 60 に設定される平滑化パラメータです。

1. **ランキングを集計**：統合されたランキングに基づいて検索結果を再ランク付けし、最終結果を生成します。

![M2SawupkSh2NZxbX7SAcwqZZnxd](https://zdoc-images.s3.us-west-2.amazonaws.com/M2SawupkSh2NZxbX7SAcwqZZnxd.png)

## RRF Ranker の例\{#example-of-rrf-ranker}

この例は、疎ベクトルと密ベクトルに対するハイブリッド検索 (topK=5) を示し、RRFRanker 戦略が 2 つの ANN 検索の結果をどのように再ランク付けするかを説明します。

- テキストの疎ベクトルに対する ANN 検索の結果 (topK=5)：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>ランク（疎）</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>1</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>2</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>3</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>4</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>5</p></td>
       </tr>
    </table>

- テキストの密ベクトルに対する ANN 検索の結果 (topK=5)：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>ランク（密）</strong></p></th>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>1</p></td>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>2</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>3</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>4</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>5</p></td>
       </tr>
    </table>

- RRF を使用して 2 セットの検索結果のランキングを再配置します。平滑化パラメータ `k` は 60 に設定されていると仮定します。

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>スコア（疎）</strong></p></th>
         <th><p><strong>スコア（密）</strong></p></th>
         <th><p><strong>最終スコア</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>1</p></td>
         <td><p>2</p></td>
         <td><p>1/(60+1)+1/(60+2) = 0.03252247</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>4</p></td>
         <td><p>1</p></td>
         <td><p>1/(60+4)+1/(60+1) = 0.03201844</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>5</p></td>
         <td><p>4</p></td>
         <td><p>1/(60+5)+1/(60+4) = 0.03100962</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>2</p></td>
         <td><p>N/A</p></td>
         <td><p>1/(60+2) = 0.01612903</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>3</p></td>
         <td><p>N/A</p></td>
         <td><p>1/(60+3) = 0.01587302</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>N/A</p></td>
         <td><p>3</p></td>
         <td><p>1/(60+3) = 0.01587302</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>N/A</p></td>
         <td><p>5</p></td>
         <td><p>1/(60+5) = 0.01538462</p></td>
       </tr>
    </table>

- 再ランク付け後の最終結果 (topK=5)：

    <table>
       <tr>
         <th><p><strong>ランク</strong></p></th>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>最終スコア</strong></p></th>
       </tr>
       <tr>
         <td><p>1</p></td>
         <td><p>101</p></td>
         <td><p>0.03252247</p></td>
       </tr>
       <tr>
         <td><p>2</p></td>
         <td><p>198</p></td>
         <td><p>0.03201844</p></td>
       </tr>
       <tr>
         <td><p>3</p></td>
         <td><p>175</p></td>
         <td><p>0.03100962</p></td>
       </tr>
       <tr>
         <td><p>4</p></td>
         <td><p>203</p></td>
         <td><p>0.01612903</p></td>
       </tr>
       <tr>
         <td><p>5</p></td>
         <td><p>150</p></td>
         <td><p>0.01587302</p></td>
       </tr>
       <tr>
         <td><p>5</p></td>
         <td><p>110</p></td>
         <td><p>0.01587302</p></td>
       </tr>
    </table>

## RRF Ranker の使用方法\{#usage-of-rrf-ranker}

RRF 再ランキング戦略を使用する場合、パラメータ `k` を設定する必要があります。これは平滑化パラメータであり、全文検索とベクター検索の相対的な重みを効果的に変更できます。このパラメータのデフォルト値は 60 で、(0, 16384) の範囲で調整できます。値は浮動小数点数にする必要があります。推奨値は [10, 100] の間です。`k=60` は一般的な選択ですが、最適な `k` の値は特定のアプリケーションやデータセットによって異なります。最適なパフォーマンスを得るために、特定のユースケースに基づいてこのパラメータをテストおよび調整することをお勧めします。

### RRF Ranker の作成\{#create-an-rrf-ranker}

複数のベクトルフィールドでコレクションが設定された後、適切な平滑化パラメータで RRF Ranker を作成します：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

rerank = Function(
    name="rrf",
    input_field_names=[], # Must be an empty list
    function_type=FunctionType.RERANK,
    params={
        "reranker": "rrf", 
        "k": 100  # Optional
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.Function rerank = CreateCollectionReq.Function.builder()
        .name("rrf")
        .functionType(FunctionType.RERANK)
        .param("reranker", "rrf")
        .param("k", "100")
        .build();
```

</TabItem>

<TabItem value='java'>

```javascript
import { FunctionType } from "@zilliz/milvus2-sdk-node";

const rerank = {
  name: "rrf",
  input_field_names: [],
  function_type: FunctionType.RERANK,
  params: {
    reranker: "rrf",
    k: 100,
  },
};

```

</TabItem>

<TabItem value='java'>

```go
// Go
```

</TabItem>

<TabItem value='java'>

```bash
# Restful
```

</TabItem>

<TabItem value='java'>

```c++
auto rerank = std::make_shared<milvus::Function>("rrf", milvus::FunctionType::RERANK);
rerank->AddParam("reranker", "rrf");
rerank->AddParam("k", "100");
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須?</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>はい</p></td>
     <td><p>このFunctionの一意な識別子</p></td>
     <td><p><code>"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>この関数を適用するベクトルフィールドのリスト（RRF Rankerの場合は空にする必要があります）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>呼び出すFunctionのタイプ。再ランキング戦略を指定するには<code>RERANK</code>を使用します。</p></td>
     <td><p><code>FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用する再ランキング手法を指定します。</p><p>RRF Rankerを使用するには、<code>rrf</code>に設定する必要があります。</p></td>
     <td><p><code>"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.k</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>ドキュメントの順位への影響を制御するスムージングパラメータ。高い<code>k</code>値は上位の順位に対する感度を低下させます。範囲: (0, 16384)。デフォルト: <code>60</code>。</p><p>詳細については、<a href="./reranking-rrf#mechanism-of-rrf-ranker">RRF Rankerの仕組み</a>を参照してください。</p></td>
     <td><p><code>100</code></p></td>
   </tr>
</table>

### ハイブリッド検索への適用\{#apply-to-hybrid-search}

RRF Rankerは、複数のベクトルフィールドを組み合わせたハイブリッド検索操作のために特別に設計されています。以下はハイブリッド検索でこれを使用する方法です：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, AnnSearchRequest

# Connect to Milvus server
milvus_client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# Assume you have a collection setup

# Define text vector search request
text_search = AnnSearchRequest(
    data=["modern dining table"],
    anns_field="text_vector",
    param={},
    limit=10
)

# Define image vector search request
image_search = AnnSearchRequest(
    data=[image_embedding],  # Image embedding vector
    anns_field="image_vector",
    param={},
    limit=10
)

# Apply RRF Ranker to product hybrid search
# The smoothing parameter k controls the balance
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  # Multiple search requests
    # highlight-next-line
    ranker=rerank,  # Apply the RRF ranker
    limit=10,
    output_fields=["product_name", "price", "category"]
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.data.FloatVec;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());
        
List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("text_vector")
        .vectors(Collections.singletonList(new EmbeddedText("\"modern dining table\"")))
        .limit(10)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("image_vector")
        .vectors(Collections.singletonList(new FloatVec(imageEmbedding)))
        .limit(10)
        .build());
        
HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(10)
                .outputFields(Arrays.asList("product_name", "price", "category"))
                .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient, FunctionType } from "@zilliz/milvus2-sdk-node";

const milvusClient = new MilvusClient({ address: "YOUR_CLUSTER_ENDPOINT" });

const text_search = {
    data: ["modern dining table"],
    anns_field: "text_vector",
    param: {},
    limit: 10,
};

const image_search = {
  data: [image_embedding],
  anns_field: "image_vector",
  param: {},
  limit: 10,
};

const search = await milvusClient.search({
  collection_name: collection_name,
  data: [text_search, image_search],
  output_fields: ["product_name", "price", "category"],
  limit: 10,
  rerank: rerank,
});
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
auto text_search = milvus::SubSearchRequest()
                    .WithLimit(10)
                    .WithAnnsField("text_vector")
                    .AddEmbeddedText("modern dining table");

auto image_search = milvus::SubSearchRequest()
                    .WithLimit(10)
                    .WithAnnsField("image_vector")
                    .AddFloatVector(image_embedding);

auto request = milvus::HybridSearchRequest()
                    .WithCollectionName(collection_name)
                    .WithLimit(10)
                    .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(text_search)))
                    .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(image_search)))
                    .WithRerank(rerank)
                    .AddOutputField("product_name")
                    .AddOutputField("price")
                    .AddOutputField("category");

milvus::SearchResponse response;
auto status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

</TabItem>
</Tabs>

ハイブリッド検索の詳細については、[マルチベクターハイブリッド検索](./hybrid-search) を参照してください。