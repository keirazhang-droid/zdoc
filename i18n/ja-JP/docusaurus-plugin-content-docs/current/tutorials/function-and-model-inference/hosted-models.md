---
title: "ホステッドモデル | Cloud"
slug: /hosted-models
sidebar_key: hosted-models
sidebar_label: "ホステッドモデル"
beta: PRIVATE
notebook: FALSE
description: "Zilliz Cloud は、Zilliz 管理のインフラストラクチャ上で埋め込みモデルと再ランキングモデルをホストできます。専用のフルマネージドモデルインスタンスをデプロイし、Zilliz Cloud から直接使用することで、安定した高性能な推論を実現できます。 | Cloud"
type: origin
token: DMrCwn4LXi1uKBkbHGfcpGnsnyh
sidebar_position: 6
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - モデル
  - 推論
  - ホステッドモデル

---

import Admonition from '@theme/Admonition';


# ホステッドモデル

Zilliz Cloud は、Zilliz 管理のインフラ上で **埋め込み** モデルと **再ランキング** モデルをホストできます。専用の完全管理型モデルインスタンスをデプロイし、Zilliz Cloud から直接使用することで、安定した高性能な推論が可能です。

管理されたモデルインスタンスを使用すると、コレクションに生データを挿入できます。Zilliz Cloud は、データ取り込み時にデプロイされたモデルを使用して自動的にベクトル埋め込みを生成します。セマンティック検索では、生のクエリテキストのみを提供します。Zilliz Cloud は同じモデルを使用してクエリベクトルを作成し、保存されたベクトルと比較して、最も関連性の高い結果を返します。

次の図は、ホステッドモデルの使用手順を示しています。

![NkgEwmrJDhyXiubY6HpcssaynHg](https://zdoc-images.s3.us-west-2.amazonaws.com/NkgEwmrJDhyXiubY6HpcssaynHg.png)

## モデルのデプロイ \{#deploy-a-model}

現在、Zilliz Cloud は以下のリージョン、インスタンスタイプ、モデルをサポートしています。

<Admonition type="info" icon="📘" title="Notes">

ホステッドモデルに関する特定の要件がある場合は、[お問い合わせください](http://support.zilliz.com)。

</Admonition>

### サポート対象リージョン \{#supported-regions}

モデルのデプロイリージョンは、クラスターのリージョンと一致している必要があります。利用可能なオプションは次のとおりです。

<table>
   <tr>
     <th><p><strong>リージョン</strong></p></th>
     <th><p><strong>場所</strong></p></th>
   </tr>
   <tr>
     <td><p>aws-us-west-2</p></td>
     <td><p>米国オレゴン州</p></td>
   </tr>
</table>

### サポート対象インスタンスタイプ \{#supported-instance-type}

インスタンスタイプは、利用可能なコンピューティングリソースを決定します。利用可能なオプションは次のとおりです。

<table>
   <tr>
     <th><p><strong>インスタンスタイプ</strong></p></th>
     <th><p><strong>リソース</strong></p></th>
   </tr>
   <tr>
     <td><p>g6.xlarge </p></td>
     <td><ul><li><p>1 Nvidia L4 GPU</p></li><li><p>8 vCPU</p></li><li><p>32 GB RAM</p></li></ul></td>
   </tr>
</table>

### サポート対象モデル \{#supported-models}

利用可能なオプションは次のとおりです。

<table>
   <tr>
     <th><p><strong>タイプ</strong></p></th>
     <th><p><strong>モデル</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td rowspan="9"><p>Embedding</p></td>
     <td><p><code>Qwen/Qwen3-Embedding-0.6B</code></p></td>
     <td><p>効率的なセマンティック検索、コード検索、分類、クラスタリングのための軽量マルチリンガル埋め込みモデル。100以上の言語、32Kのコンテキスト、最大1024次元の埋め込みをサポート。</p></td>
   </tr>
   <tr>
     <td><p><code>Qwen/Qwen3-Embedding-4B</code></p></td>
     <td><p>バランスの取れたQwen3埋め込みモデル。8Bモデルよりもデプロイコストを抑えつつ、より強力な多言語・言語横断検索品質を実現。32Kコンテキストと最大2560次元の埋め込みをサポート。</p></td>
   </tr>
   <tr>
     <td><p><code>Qwen/Qwen3-Embedding-8B</code></p></td>
     <td><p>最高容量のQwen3埋め込みモデル。精度重視の多言語、長文、コード検索ワークロード向け。32Kコンテキストと最大4096次元の埋め込みをサポート。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-small-en-v1.5</code></p></td>
     <td><p>低コスト・低レイテンシのセマンティック検索と検索のためのコンパクトな英語BGE埋め込みモデル。384次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-small-zh-v1.5</code></p></td>
     <td><p>効率的な中国語セマンティック検索と検索のためのコンパクトな中国語BGE埋め込みモデル。512次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-base-en-v1.5</code></p></td>
     <td><p>検索品質と効率のバランスが取れた中規模の英語BGE埋め込みモデル。768次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-base-zh-v1.5</code></p></td>
     <td><p>中国語検索ワークロードの品質と効率のバランスが取れた中規模の中国語BGE埋め込みモデル。768次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-large-en-v1.5</code></p></td>
     <td><p>精度重視のセマンティック検索、RAG、検索ワークロード向けの高品質な英語BGE埋め込みモデル。1024次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-large-zh-v1.5</code></p></td>
     <td><p>精度重視の中国語セマンティック検索と検索向けの高品質な中国語BGE埋め込みモデル。1024次元の埋め込みを使用。</p></td>
   </tr>
   <tr>
     <td rowspan="5"><p>Reranking</p></td>
     <td><p><code>BAAI/bge-reranker-base</code></p></td>
     <td><p>高速推論と簡単なデプロイを実現する、軽量の英語・中国語クロスエンコーダー再ランキングモデル。検索候補の再順序付けに使用。</p></td>
   </tr>
   <tr>
     <td><p><code>BAAI/bge-reranker-large</code></p></td>
     <td><p>より高い品質の再ランキングを実現する、より大規模な英語・中国語クロスエンコーダー再ランキングモデル。推論コストよりも精度が重要な場合に最適。</p></td>
   </tr>
   <tr>
     <td><p><code>Qwen/Qwen3-Reranker-0.6B</code></p></td>
     <td><p>効率的な多言語・コード関連検索ワークフローのための軽量Qwen3テキスト再ランキングモデル。100以上の言語、32Kコンテキスト、命令認識型再ランキングをサポート。</p></td>
   </tr>
   <tr>
     <td><p><code>Qwen/Qwen3-Reranker-4B</code></p></td>
     <td><p>バランスの取れたQwen3再ランキングモデル。8Bモデルよりもデプロイコストを抑えながら、多言語、言語横断、長文、コード検索品質を強化。</p></td>
   </tr>
   <tr>
     <td><p><code>Qwen/Qwen3-Reranker-8B</code></p></td>
     <td><p>最高容量のQwen3再ランキングモデル。強力な多言語、長文脈、命令認識型のランキング性能が必要な、精度重視の検索シナリオ向け。</p></td>
   </tr>
   <tr>
     <td><p>セマンティックハイライター</p></td>
     <td><p><code>zilliz/semantic-highlight-bilingual-v1</code></p></td>
     <td><p>RAGや検索ワークフロー向けの軽量バイリンガルセマンティックハイライトモデル。クエリと意味的に関連する英語または中国語のテキストセグメントを特定し、ユーザーが有用なコンテキストを強調表示し、生成前に不要なトークンを削減するのに役立ちます。</p></td>
   </tr>
</table>

## デプロイメントIDの取得 \{#obtain-a-deployment-id}

提供された情報に基づいて、Zilliz がモデルをデプロイします。これには約15分かかります。デプロイの準備が整うと、Zilliz Cloud サポートから **デプロイメントID** が返されます。これは、埋め込み関数または再ランキング関数を作成するときに使用します。

```bash
"deploymentId": "68f8889be4b01215a275972a"
```

## 関数でデプロイ済みモデルを使用する\{#use-the-deployed-model-in-a-function}

**デプロイメントID** を取得したら、埋め込み（embedding）関数またはリランキング（reranking）関数を通じて、そのデプロイ済みモデルを使用するコレクションを作成できます。

### 埋め込み関数を使用する\{#use-an-embedding-function}

1. 埋め込み関数付きのコレクションを作成します。

    - 生テキスト用に少なくとも1つの `VARCHAR` フィールドを定義します。

    - モデルによって生成される埋め込みベクトル用に少なくとも1つのベクトルフィールドを定義します。

    - ベクトルフィールドの次元を、モデルの出力次元と一致するように設定します。

    ```python
    schema = milvus_client.create_schema()
    schema.add_field("id", DataType.INT64, is_primary=True, auto_id=False)
    schema.add_field("document", DataType.VARCHAR, max_length=9000)
    schema.add_field("dense", DataType.FLOAT_VECTOR, dim=384) # important, the dimension must be supported by the deployed model.
    
    # define embedding function
    text_embedding_function = Function(
        name="zilliz-bge-small-en-v1.5",
        function_type=FunctionType.TEXTEMBEDDING,
        input_field_names=["document"], # Scalar field(s) containing text data to embed
        output_field_names="dense", # Vector field(s) for storing embeddings
     # highlight-start
        params={
            "provider": "zilliz",
            "model_deployment_id": "...", # Use the model deployment ID we provide you
            "truncation": True, # Optional: if true, inputs greater than the max supported input length of the model will be truncated
            "dimension": "384",                # Optional: Shorten the output vector dimension, only if supported by the model
        }
    # highlight-end
    )
    
    schema.add_function(text_embedding_function)
    
    index_params = milvus_client.prepare_index_params()
    index_params.add_index(
        field_name="dense",
        index_name="dense_index",
        index_type="AUTOINDEX",
        metric_type="IP",
    )
    
    ret = milvus_client.create_collection(collection_name, schema=schema, index_params=index_params, consistency_level="Strong")
    ```

1. 生のテキストデータを挿入します。

    生のテキストのみをコレクションに挿入します。Zilliz Cloud は自動的に埋め込み関数を呼び出し、ベクトルフィールドを設定します。

    ```python
    rows = [
            {"id": 1, "document": "Artificial intelligence was founded as an academic discipline in 1956."},
            {"id": 2, "document": "Alan Turing was the first person to conduct substantial research in AI."},
            {"id": 3, "document": "Born in Maida Vale, London, Turing was raised in southern England."},
    ]
    
    insert_result = milvus_client.insert(collection_name, rows, progress_bar=True)
    
    ```

1. 生のテキストデータを使用して類似性検索を実行します。

    クエリを生のテキストとして提供します。Zilliz Cloud は同じモデルを使用してクエリベクトルを生成し、類似性検索を実行します。

    ```python
    search_params = {
        "params": {"nprobe": 10},
    }
    queries = ["When was artificial intelligence founded", 
               "Where was Alan Turing born?"]
    
    result = milvus_client.search(collection_name, data=queries, anns_field="dense", search_params=search_params, limit=3, output_fields=["document"], consistency_level="Strong")
    ```

### リランキング関数を使用する\{#use-a-reranking-function}

検索結果をリランキングするためにデプロイ済みのモデルを使用するリランキング関数を設定することもできます。

```python
import numpy as np
rng = np.random.default_rng(seed=19530)
vectors_to_search = rng.random((1, dim))

# define reranking function
ranker = Function(
    name="model_rerank_fn",
    input_field_names=["document"],
    function_type=FunctionType.RERANK,
    params={
        "reranker": "model", 
        "provider": "zilliz",
        "model_deployment_id": "...", # Use the model deployment ID we provide you,
        "queries": ["machine learning for time series"] * len(vectors_to_search),  # Query text, the number of query strings must match exactly the number of queries in your search operation
    }
)

# Use it during search
result = milvus_client.search(collection_name, vectors_to_search, limit=3, output_fields=["*"], ranker=ranker)
```

### セマンティックハイライター関数を使用する\{#use-a-semantic-highlighter-function}

検索中に、ホストされたハイライターモデルを使用して検索結果を後処理し、ユーザーのクエリと意味的に関連するテキストセグメントをハイライト表示できます。  

```python
from pymilvus import SemanticHighlighter

# Define the search query
queries = ["When was artificial intelligence founded"]

# Configure semantic highlighter
# highlight-start
highlighter = SemanticHighlighter(
    queries,
    ["document"],                           # Fields to highlight
    pre_tags=["<mark>"],                    # Tag before highlighted text
    post_tags=["</mark>"],                  # Tag after highlighted text
    model_deployment_id="YOUR_MODEL_ID",    # Deployed highlight model ID
)
# highlight-end

# Perform search with highlighting
results = milvus_client.search(
    collection_name,
    data=queries,
    anns_field="dense",
    search_params={"params": {"nprobe": 10}},
    limit=3,
    output_fields=["document"],
    highlighter=highlighter
)

# Process results
for hits in results:
    for hit in hits:
        highlight = hit.get("highlight", {}).get("document", {})
        print(f"ID: {hit['id']}")
        print(f"Search Score: {hit['distance']:.4f}")      # Vector similarity score
        print(f"Fragments: {highlight.get('fragments', [])}")
        print(f"Highlight Confidence: {highlight.get('scores', [])}")  # Semantic relevance score
        print()
```

## 請求\{#billing}

ホストモデルの使用には、関数およびモデルサービスの料金のみが発生します。推論は Zilliz Cloud 内で実行されるため、データはパブリックインターネットを経由せず、データ転送料金は発生しません。

リージョン別のモデル単価については、[営業部門にお問い合わせ](http://zilliz.com/contact-sales)ください。

### コスト計算\{#cost-calculation}

```plaintext
Function and Model Services Cost = Model Unit Price x Usage Time
```

- **Model 単価**: 詳細については、[営業にお問い合わせ](http://zilliz.com/contact-sales) ください。

- **使用時間**: モデルがアクティブに使用されているかどうかに関わらず、モデルデプロイメントが実行されている総時間を時間単位で測定します。

