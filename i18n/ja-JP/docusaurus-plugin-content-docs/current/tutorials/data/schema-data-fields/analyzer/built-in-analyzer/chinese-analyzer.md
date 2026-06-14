---
title: "中国語 | Cloud"
slug: /chinese-analyzer
sidebar_key: chinese-analyzer
sidebar_label: "中国語"
beta: FALSE
notebook: FALSE
description: "`chinese` アナライザーは中国語テキストを処理するために特別に設計されており、効果的なセグメンテーションとトークン化を提供します。 | Cloud"
type: origin
token: Of8PwuunCihBfxksNJJcSCRYnsf
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - アナライザー
  - ビルトインアナライザー
  - 中国語アナライザー

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Chinese

`chinese` アナライザーは、中国語テキストを処理するために特別に設計されており、効果的なセグメンテーションとトークン化を提供します。

### 定義\{#definition}

`chinese` アナライザーは以下で構成されています：

- **トークナイザー**: `jieba` トークナイザーを使用して、語彙とコンテキストに基づいて中国語テキストをトークンに分割します。詳細については、[Jieba](./jieba-tokenizer) を参照してください。

- **フィルター**: `cnalphanumonly` フィルターを使用して、中国語以外の文字を含むトークンを削除します。詳細については、[Cnalphanumonly](./cnalphanumonly-filter) を参照してください。

`chinese` アナライザーの機能は、以下のカスタムアナライザー設定と同等です：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("cnalphanumonly"));
```

</TabItem>

<TabItem value='java'>

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
};
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"tokenizer": "jieba", "filter": []any{"cnalphanumonly"}}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba",
  "filter": [
    "cnalphanumonly"
  ]
}'

```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"cnalphanumonly"}}
};
```

### 設定\{#configuration}

`chinese` アナライザーをフィールドに適用するには、`analyzer_params` で `type` を `chinese` に設定するだけです。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "chinese",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "chinese");
```

</TabItem>

<TabItem value='java'>

```javascript
const analyzer_params = {
    "type": "chinese",
}
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"type": "chinese"}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
analyzerParams='{
  "type": "chinese"
}'
```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

<Admonition type="info" icon="📘" title="Notes">

`chinese` アナライザーはオプションパラメーターを受け付けません。

</Admonition>

## 例\{#examples}

アナライザー構成をコレクションスキーマに適用する前に、`run_analyzer` メソッドを使用してその動作を確認してください。

### アナライザー構成\{#analyzer-configuration}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "chinese",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "chinese");
```

</TabItem>

<TabItem value='java'>

```javascript
analyzer_params = {
    "type": "chinese",
}
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"type": "chinese"}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
analyzerParams='{"type": "chinese"}'
```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

### `run_analyzer` を使用した検証\{#verification-using-runanalyzer}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import (
    MilvusClient,
)

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Sample text to analyze
sample_text = "Milvus 是一个高性能、可扩展的向量数据库！"

# Run the standard analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("English analyzer output:", result)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;

ConnectConfig config = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

List<String> texts = new ArrayList<>();
texts.add("Milvus 是一个高性能、可扩展的向量数据库！");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
```

</TabItem>

<TabItem value='java'>

```javascript
import { MilvusClient } from "@zilliz/milvus2-node-sdk";

const sampleText = "Milvus 是一个高性能、可扩展的向量数据库！";

const client = new MilvusClient({
  address: "YOUR_CLUSTER_ENDPOINT",
});

const result = await client.runAnalyzer({
    ...analyzerParams,
    text: sampleText
});

```

</TabItem>

<TabItem value='java'>

```go
import (
    "context"
    "encoding/json"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "YOUR_CLUSTER_ENDPOINT",
    APIKey:  "YOUR_CLUSTER_TOKEN",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

bs, _ := json.Marshal(analyzerParams)
texts := []string{"Milvus 是一个高性能、可扩展的向量数据库！"}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(string(bs))

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
curl -X POST "YOUR_CLUSTER_ENDPOINT/v2/vectordb/common/run_analyzer" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLUSTER_TOKEN" \
  -d '{
    "analyzerParams": "{\"type\": \"chinese\"}",
    "text": ["Milvus 是一个高性能、可扩展的向量数据库！"]
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

std::string text = "Milvus 是一个高性能、可扩展的向量数据库！";
auto request = milvus::RunAnalyzerRequest()
                       .AddText(text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

### 期待される出力\{#expected-output}

```python
Chinese analyzer output: ['Milvus', '是', '一个', '高性', '性能', '高性能', '可', '扩展', '的', '向量', '数据', '据库', '数据库']
```

