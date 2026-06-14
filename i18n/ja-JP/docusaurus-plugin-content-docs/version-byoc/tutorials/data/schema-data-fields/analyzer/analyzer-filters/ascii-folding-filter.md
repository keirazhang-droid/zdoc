---
title: "ASCII フォールディング | BYOC"
slug: /ascii-folding-filter
sidebar_key: ascii-folding-filter
sidebar_label: "ASCII フォールディング"
beta: FALSE
notebook: FALSE
description: "`asciifolding` フィルターは、Basic Latin Unicode ブロック外の文字を ASCII の同等文字に変換します。例えば、`í` を `i` に変換することで、特に多言語コンテンツのテキスト処理をよりシンプルで一貫性のあるものにします。 | BYOC"
type: origin
token: SFLCweOuaiChuVkjazqcqyE7neb
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - コレクション
  - スキーマ
  - アナライザー
  - 組み込みフィルター
  - ASCII フォールディング

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ASCII フォールディング

`asciifolding` フィルターは、[Basic Latin Unicode ブロック](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block))（最初の127 ASCII 文字）の外側の文字を、それらの ASCII 相当の文字に変換します。例えば、`í` から `i` のような文字を変換し、テキスト処理をよりシンプルかつ一貫性のあるものにします。特に多言語コンテンツに有効です。

## 設定\{#configuration}

`asciifolding` フィルターは Zilliz Cloud に組み込まれています。使用するには、`analyzer_params` 内の `filter` セクションに名前を指定するだけです。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["asciifolding"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("asciifolding"));
```

</TabItem>

<TabItem value='java'>

```javascript
const analyzer_params = {
    "tokenizer": "standard",
    "filter": ["asciifolding"],
};
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"tokenizer": "standard", "filter": []any{"asciifolding"}}
```

</TabItem>

<TabItem value='java'>

```bash
# restful
analyzerParams='{
  "tokenizer": "standard",
  "filter": [
    "asciifolding"
  ]
}'

```

</TabItem>
</Tabs>

```c++
nlohmann::json analyzer_params = {
    {"tokenizer", "standard"},
    {"filter", {"asciifolding"}}
};
```

`asciifolding` フィルターは、トークナイザーによって生成されたトークンに対して動作するため、トークナイザーと組み合わせて使用する必要があります。Zilliz Cloud で利用可能なトークナイザーの一覧については、[トークナイザーリファレンス](./analyzer-tokenizers) を参照してください。

`analyzer_params` を定義した後、コレクションスキーマを定義する際に、それらを `VARCHAR` フィールドに適用できます。これにより、Zilliz Cloud は指定されたアナライザーを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを実現できます。詳細については、[使用例](./analyzer-overview#example-use) を参照してください。

## Examples\{#examples}

アナライザー構成をコレクションスキーマに適用する前に、`run_analyzer` メソッドを使用してその動作を確認します。

### Analyzer configuration\{#analyzer-configuration}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["asciifolding"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("asciifolding"));
```

</TabItem>

<TabItem value='java'>

```javascript
// javascript
```

</TabItem>

<TabItem value='java'>

```go
analyzerParams = map[string]any{"tokenizer": "standard", "filter": []any{"asciifolding"}}
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
    {"tokenizer", "standard"},
    {"filter", {"asciifolding"}}
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
sample_text = "Café Möller serves crème brûlée and piñatas."

# Run the standard analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Standard analyzer output:", result)
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
texts.add("Café Möller serves crème brûlée and piñatas.");

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
texts := []string{"Café Möller serves crème brûlée and piñatas."}
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

milvus::ConnectParam connect_param{"YOUR_CLUSTER_ENDPOINT", "YOUR_CLUSTER_TOKEN"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string text = "Café Möller serves crème brûlée and piñatas.";
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
['Cafe', 'Moller', 'serves', 'creme', 'brulee', 'and', 'pinatas']
```

