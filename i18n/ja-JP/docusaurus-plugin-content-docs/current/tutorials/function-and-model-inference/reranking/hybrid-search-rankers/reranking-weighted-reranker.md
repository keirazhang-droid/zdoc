---
title: "Weighted Ranker | Cloud"
slug: /reranking-weighted-reranker
sidebar_key: reranking-weighted-reranker
sidebar_label: "Weighted Ranker"
beta: FALSE
notebook: FALSE
description: "Weighted Ranker は、各検索パスに異なる重要度の重みを割り当てることで、複数の検索パスからの結果をインテリジェントに結合し、優先順位を付けます。熟練したシェフが完璧な料理を作るために複数の材料をバランスよく使うのと同様に、Weighted Ranker は異なる検索結果をバランスさせ、最も関連性の高い結合結果を提供します。このアプローチは、複数のベクトルフィールドやモダリティにわたって検索する場合に理想的で、特定のフィールドが最終ランキングにおいて他のフィールドよりも大きな貢献をする必要がある場合に最適です。 | Cloud"
type: origin
token: Oyy6w5DYJiVCMYkdduEc6eD9nZg
sidebar_position: 1
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - データ
  - 検索結果の再ランキング
  - 結果の再ランキング
  - 重み付き再ランキング

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Weighted Ranker

Weighted Ranker は、複数の検索パスからの結果に異なる重要度の重みを割り当てることで、それらをインテリジェントに結合し優先順位を付けます。熟練したシェフが完璧な料理を作るために複数の材料をバランスするように、Weighted Ranker は異なる検索結果をバランスし、最も関連性の高い結合結果を提供します。このアプローチは、複数のベクトルフィールドやモダリティを検索する場合に最適で、特定のフィールドが最終的なランキングに他のフィールドよりも大きく貢献する必要がある場合に特に効果的です。

## When to use Weighted Ranker\{#when-to-use-weighted-ranker}

Weighted Ranker は、複数のベクトル検索パスからの結果を結合する必要があるハイブリッド検索シナリオ向けに特別に設計されています。特に以下の場合に効果的です。

<table>
   <tr>
     <th><p>ユースケース</p></th>
     <th><p>例</p></th>
     <th><p>Weighted Ranker が適している理由</p></th>
   </tr>
   <tr>
     <td><p>電子商取引検索</p></td>
     <td><p>画像類似性とテキスト記述を組み合わせた商品検索</p></td>
     <td><p>小売業者はファッションアイテムでは視覚的類似性を優先し、技術製品ではテキスト記述を重視できる</p></td>
   </tr>
   <tr>
     <td><p>メディアコンテンツ検索</p></td>
     <td><p>視覚的特徴と音声トランスクリプトの両方を使用した動画検索</p></td>
     <td><p>クエリの意図に基づいて視覚コンテンツと音声対話の重要度をバランスする</p></td>
   </tr>
   <tr>
     <td><p>ドキュメント検索</p></td>
     <td><p>異なるセクションに複数の埋め込みを使用したエンタープライズドキュメント検索</p></td>
     <td><p>タイトルとアブストラクトの埋め込みに高い重みを与えつつ、全文埋め込みも考慮する</p></td>
   </tr>
</table>

ハイブリッド検索アプリケーションで複数の検索パスを結合し、それらの相対的な重要度を制御する必要がある場合、Weighted Ranker は理想的な選択肢です。

## Mechanism of Weighted Ranker\{#mechanism-of-weighted-ranker}

The main workflow of the WeightedRanker strategy is as follows:

1. **検索スコアを収集**: ベクトル検索の各パスからの結果とスコア（score_1, score_2）を収集します。

1. **スコアの正規化**: 各検索では異なる類似度指標が使用される可能性があり、その結果スコア分布が異なります。例えば、類似度タイプとして内積（IP）を使用するとスコアは[−∞,+∞]の範囲になり、ユークリッド距離（L2）を使用するとスコアは[0,+∞]の範囲になります。異なる検索からのスコア範囲は異なり直接比較できないため、各検索パスのスコアを正規化する必要があります。通常、`arctan` 関数を適用してスコアを[0,1]の範囲に変換します（score_1_normalized, score_2_normalized）。1に近いスコアほど類似度が高いことを示します。

1. **重みの割り当て**: 異なるベクトルフィールドに割り当てられた重要度に基づいて、正規化されたスコア（score_1_normalized, score_2_normalized）に重み（**wi**）を割り当てます。各パスの重みは[0,1]の範囲である必要があります。重み付けされたスコアは score_1_weighted および score_2_weighted となります。

1. **スコアのマージ**: 重み付けされたスコア（score_1_weighted, score_2_weighted）を高いものから低いものへ順位付けし、最終的なスコアセット（score_final）を生成します。

![GdmNwbkN8haZO8bpQkOc2NIWnqF](https://zdoc-images.s3.us-west-2.amazonaws.com/GdmNwbkN8haZO8bpQkOc2NIWnqF.png)

## Example of Weighted Ranker\{#example-of-weighted-ranker}

この例では、画像とテキストを含むマルチモーダルハイブリッド検索（topK=5）を示し、WeightedRanker 戦略が2つのANN検索の結果をどのように再ランク付けするかを説明します。

- 画像のANN検索結果（topK=5）：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>スコア（画像）</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>0.92</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>0.88</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>0.85</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>0.83</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>0.8</p></td>
       </tr>
    </table>

- テキストのANN検索結果（topK=5）：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>スコア（テキスト）</strong></p></th>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>0.91</p></td>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>0.87</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>0.85</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>0.82</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>0.78</p></td>
       </tr>
    </table>

- WeightedRanker を使用して画像とテキストの検索結果に重みを割り当てます。画像ANN検索の重みを0.6、テキスト検索の重みを0.4と仮定します。

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>スコア（画像）</strong></p></th>
         <th><p><strong>スコア（テキスト）</strong></p></th>
         <th><p><strong>重み付けスコア</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>0.92</p></td>
         <td><p>0.87</p></td>
         <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>0.88</p></td>
         <td><p>N/A</p></td>
         <td><p>0.6×0.88+0.4×0=0.528</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>0.85</p></td>
         <td><p>N/A</p></td>
         <td><p>0.6×0.85+0.4×0=0.51</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>0.83</p></td>
         <td><p>0.91</p></td>
         <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>0.80</p></td>
         <td><p>0.82</p></td>
         <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>画像に含まれない</p></td>
         <td><p>0.85</p></td>
         <td><p>0.6×0+0.4×0.85=0.34</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>画像に含まれない</p></td>
         <td><p>0.78</p></td>
         <td><p>0.6×0+0.4×0.78=0.312</p></td>
       </tr>
    </table>

- 再ランク付け後の最終結果（topK=5）：

    <table>
       <tr>
         <th><p><strong>順位</strong></p></th>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>最終スコア</strong></p></th>
       </tr>
       <tr>
         <td><p>1</p></td>
         <td><p>101</p></td>
         <td><p>0.90</p></td>
       </tr>
       <tr>
         <td><p>2</p></td>
         <td><p>198</p></td>
         <td><p>0.86</p></td>
       </tr>
       <tr>
         <td><p>3</p></td>
         <td><p>175</p></td>
         <td><p>0.81</p></td>
       </tr>
       <tr>
         <td><p>4</p></td>
         <td><p>203</p></td>
         <td><p>0.528</p></td>
       </tr>
       <tr>
         <td><p>5</p></td>
         <td><p>150</p></td>
         <td><p>0.51</p></td>
       </tr>
    </table>

## Usage of Weighted Ranker\{#usage-of-weighted-ranker}

WeightedRanker 戦略を使用する場合、重み値を入力する必要があります。入力する重み値の数は、ハイブリッド検索内の基本ANN検索リクエストの数に対応する必要があります。入力する重み値は[0,1]の範囲内である必要があり、1に近い値ほど重要度が高いことを示します。

### Create a Weighted Ranker\{#create-a-weighted-ranker}

例えば、ハイブリッド検索にテキスト検索と画像検索の2つの基本ANN検索リクエストがあるとします。テキスト検索がより重要であると考えられる場合、それにより大きな重みを割り当てる必要があります。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

rerank = Function(
    name="weight",
    input_field_names=[], # Must be an empty list
    function_type=FunctionType.RERANK,
    params={
        "reranker": "weighted", 
        "weights": [0.1, 0.9],
        "norm_score": True  # Optional
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.Function rerank = CreateCollectionReq.Function.builder()
                .name("weight")
                .functionType(FunctionType.RERANK)
                .param("reranker", "weighted")
                .param("weights", "[0.1, 0.9]")
                .param("norm_score", "true")
                .build();
```

</TabItem>

<TabItem value='java'>

```javascript
import { FunctionType } from '@zilliz/milvus2-sdk-node';

const rerank = {
    name: "weight",
    input_field_names: [],
    function_type: FunctionType.RERANK,
    params: {
        reranker: "weighted",
        weights: [0.1, 0.9],
        norm_score: true
    }
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
auto rerank = std::make_shared<milvus::Function>("weight", milvus::FunctionType::RERANK);
rerank->AddParam("reranker", "weighted");
rerank->AddParam("weights", "[0.1, 0.9]");
rerank->AddParam("norm_score", "true");
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
     <td><p><code>"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>この関数を適用するベクトルフィールドのリスト（Weighted Rankerの場合は空にする必要があります）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>呼び出すFunctionのタイプ。リランキング戦略を指定するには<code>RERANK</code>を使用します。</p></td>
     <td><p><code>FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>使用するリランキング方法を指定します。</p><p>Weighted Rankerを使用するには、必ず<code>weighted</code>に設定してください。</p></td>
     <td><p><code>"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.weights</code></p></td>
     <td><p>はい</p></td>
     <td><p>各検索パスに対応する重みの配列。値は[0,1]の範囲内です。</p><p>詳細については、<a href="./reranking-weighted-reranker#mechanism-of-weighted-ranker">Weighted Rankerの仕組み</a>を参照してください。</p></td>
     <td><p><code>[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.norm_score</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>重み付け前に生スコアを（arctanを使って）正規化するかどうかを指定します。</p><p>詳細については、<a href="./reranking-weighted-reranker#mechanism-of-weighted-ranker">Weighted Rankerの仕組み</a>を参照してください。</p></td>
     <td><p><code>True</code></p></td>
   </tr>
</table>

### ハイブリッド検索への適用\{#apply-to-hybrid-search}

Weighted Rankerは、複数のベクトルフィールドを組み合わせたハイブリッド検索操作のために特別に設計されています。ハイブリッド検索を実行する際には、各検索パスの重みを指定する必要があります：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, AnnSearchRequest

# Connect to Milvus server
milvus_client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

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

# Apply Weighted Ranker to product hybrid search
# Text search has 0.8 weight, image search has 0.3 weight
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  # Multiple search requests
    # highlight-next-line
    ranker=rerank,  # Apply the weighted ranker
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
        .token("YOUR_CLUSTER_TOKEN")
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
                .ranker(ranker)
                .limit(10)
                .outputFields(Arrays.asList("product_name", "price", "category"))
                .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient, FunctionType } from "@zilliz/milvus2-sdk-node";

const milvusClient = new MilvusClient({ 
    address: "YOUR_CLUSTER_ENDPOINT",
    token: "YOUR_CLUSTER_TOKEN"
});

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
  limit: 10,
  data: [text_search, image_search],
  rerank: rerank,
  output_fields = ["product_name", "price", "category"],
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