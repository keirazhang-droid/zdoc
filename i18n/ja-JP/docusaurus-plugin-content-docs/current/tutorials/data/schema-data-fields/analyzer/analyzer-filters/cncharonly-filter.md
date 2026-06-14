---
title: "Cncharonly | Cloud"
slug: /cncharonly-filter
sidebar_key: cncharonly-filter
sidebar_label: "Cncharonly"
beta: FALSE
notebook: FALSE
description: "`cncharonly` フィルターは、非中国語文字を含むトークンを削除します。このフィルターは、中国語テキストのみに焦点を当て、他の文字、数字、記号を含むトークンを除外する場合に便利です。 | Cloud"
type: origin
token: X16rw3C4giUT6bkPLXAcsBapnpe
sidebar_position: 5
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - アナライザー
  - 組み込みフィルター
  - cncharonly

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cncharonly

`cncharonly` フィルターは、非中国語文字を含むトークンを削除します。このフィルターは、中国語テキストのみに焦点を当てたい場合に便利で、他のスクリプト、数字、または記号を含むトークンをフィルタリングします。

## 設定\{#configuration}

`cncharonly` フィルターは Zilliz Cloud に組み込まれています。使用するには、`analyzer_params` 内の `filter` セクションでその名前を指定するだけです。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cncharonly"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("cncharonly"));
```

</TabItem>

<TabItem value='java'>

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cncharonly"],
};
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"tokenizer": "jieba", "filter": []any{"cncharonly"}}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba",
  "filter": [
    "cncharonly"
  ]
}'

```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"cncharonly"}}
};

```

`cncharonly` フィルターは、トークナイザーによって生成されたトークンに対して動作するため、トークナイザーと組み合わせて使用する必要があります。Zilliz Cloud で利用可能なトークナイザーの一覧については、[トークナイザーリファレンス](./analyzer-tokenizers) を参照してください。

`analyzer_params` を定義したら、コレクションスキーマを定義する際に、`VARCHAR` フィールドに適用できます。これにより、Zilliz Cloud は指定されたアナライザーを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを実現します。詳細については、[使用例](./analyzer-overview#example-use) を参照してください。

## 例\{#examples}

アナライザー構成をコレクションスキーマに適用する前に、`run_analyzer` メソッドを使用してその動作を確認してください。

### アナライザー構成\{#analyzer-configuration}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cncharonly"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("cncharonly"));
```

</TabItem>

<TabItem value='java'>

```javascript
// javascript
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"tokenizer": "jieba", "filter": []any{"cncharonly"}}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"cncharonly"}}
};
```

### `run_analyzer` を使用した検証\{#verification-using-runanalyzer}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import (
    MilvusClient,
)

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# Sample text to analyze
sample_text = "Milvus 是 LF AI & Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。"

# Run the jieba tokenizer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Analyzer output:", result)
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
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

List<String> texts = new ArrayList<>();
texts.add("Milvus 是 LF AI & Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
```

</TabItem>

<TabItem value='java'>

```javascript
// javascript
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
texts := []string{"Milvus 是 LF AI & Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。"}
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

std::string text = "Milvus 是 LF AI & Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。";
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
['是', '下的一个开源项目', '以', '许可发布']
```
