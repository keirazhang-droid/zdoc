---
title: "オンデマンド DQL 運用 | Cloud"
slug: /dql-sessions-external-collection
sidebar_key: dql-sessions-external-collection
sidebar_label: "DQL セッション"
beta: PUBLIC
notebook: FALSE
description: "オンデマンドコンピューティングのためのコレクション内のDQL操作（検索、クエリ、取得、ハイブリッド検索など）は、オンデマンドクラスターからコンピューティングリソースをアタッチする必要があります。Zilliz Cloudでは、オンデマンドのコンピューティングニーズを満たすためにセッションを作成できます。 | Cloud"
type: origin
token: T23Rwd19Dixzh8kugLfc7RZSnMe
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 外部コレクション
  - セッション

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# オンデマンド DQL 運用

オンデマンドコンピューティングにおけるコレクションの DQL 運用（検索、クエリ、取得、ハイブリッド検索など）には、オンデマンドクラスタからコンピュートリソースをアタッチする必要があります。Zilliz Cloud では、オンデマンドコンピュートニーズに対応するためのセッションを作成できます。

この記事では、プロジェクトエンドポイントを使用してデータベースにコレクションを作成済みであることを前提としています。詳細については、[外部コレクションの作成](XURL0X) を参照してください。

## プロジェクトエンドポイントへの接続\{#connect-to-a-project-endpoint}

プロジェクトエンドポイントは、オンデマンドコンピュートリソースへのアクセスを提供するために設計されています。これを使用して、オンデマンドクラスタやデータベースの管理、およびコレクションに格納されたデータの操作を行うことができます。

以下のコード例では、デフォルトデータベースに `my_collection` という名前の外部コレクションがあることを前提としています。また、接続を設定するには、十分な権限を持つ有効な API キーを常に使用する必要があります。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client = MilvusClient(
    uri="https://{project-id}.{region}.vectordb.zillizcloud.com",
    token="YOUR_API_KEY"
)

client.has_collection(
    collection_name="my_collection"
)
```

</TabItem>

<TabItem value='java'>

```javascript
const client = new MilvusClient({
    address: "https://{project-id}.{region}.vectordb.zillizcloud.com",
    token: "YOUR_API_KEY"
});

client.has_collection({
    collection_name: "my_collection"
});
```

</TabItem>

<TabItem value='java'>

```bash
export PROJECT_ENDPOINT='https://{project-id}.{region}.vectordb.zillizcloud.com'
export TOKEN="YOUR_API_KEY"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/has" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection"
}'
```

</TabItem>
</Tabs>

## セッションを作成する\{#create-a-session}

プロジェクトエンドポイントへの接続を確立したら、指定したオンデマンドクラスターからコンピュートリソースをアタッチするためのセッションを作成します。

次の例では、IDが`inxx-xxxxxxxxxxxxxxxxx`のオンデマンドクラスターがすでに作成されていることを前提としています。

<Admonition type="info" icon="📘" title="Notes">

RESTful リクエストの場合、セッションを作成する代わりに、クラスター ID をクエリパラメータとして DQL 呼び出しに渡す必要があります。

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
session = client.session(
    cluster_id="inxx-xxxxxxxxxxxxxxxxx"
)
```

</TabItem>

<TabItem value='java'>

```javascript
const session = client.session("inxx-xxxxxxxxxxxxxxxxx");
```

</TabItem>

<TabItem value='java'>

```bash
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxxxx"
```

</TabItem>
</Tabs>

## DQL 操作の実行\{#conduct-dql-operations}

セッションの準備ができたら、検索を実行できます。次の例では、基本的なベクトル検索を例として使用しています。これはクエリ、get、およびハイブリッド検索にも適用されます。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, ..., 0.9029438446296592]
res = session.search(
    db_name="my_database",
    collection_name="my_collection",
    anns_field="vector",
    data=[query_vector],
    limit=3,
    output_fields=["product_id", "title", "main_category", "price", "average_rating", "rating_number"]
)
```

</TabItem>

<TabItem value='java'>

```javascript
const query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, ..., 0.9029438446296592];
const res = session.search({
    db_name: "my_database",
    collection_name: "my_collection",
    anns_field: "vector",
    data: [query_vector],
    limit: 3,
    output_fields: ["product_id", "title", "main_category", "price", "average_rating", "rating_number"],
});
```

</TabItem>

<TabItem value='java'>

```bash
curl --request POST \
--url "${PROJECT_ENDPOINT}/v2/vectordb/entities/search?cluster_id=inxx-xxxxxxxxxxxxxxxxx" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database",
    "collectionName": "my_collection",
    "data": [
        [
            0.3580376395471989,
            -0.6023495712049978,
            0.18414012509913835,
            -0.26286205330961354,
            0.9029438446296592
        ]
    ],
    "annsField": "vector",
    "limit": 3,
    "outputFields": [
        "product_id",
        "title",
        "main_category",
        "price",
        "average_rating",
        "rating_number"
    ]
}'
```

</TabItem>
</Tabs>

## セッションを閉じる\{#close-a-session}

オンデマンドコンピューティングタスクが完了したら、セッションを閉じることができます。閉じられたセッションは、それ以降のDQL操作には使用できません。

<Admonition type="info" icon="📘" title="Notes">

RESTful 呼び出しはこれを必要としない。

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
session.close()
```

</TabItem>

<TabItem value='java'>

```javascript
session.close();
```

</TabItem>
</Tabs>

