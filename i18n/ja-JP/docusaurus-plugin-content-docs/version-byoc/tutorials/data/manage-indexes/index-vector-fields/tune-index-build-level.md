---
title: "インデックスビルドレベルの調整 | BYOC"
slug: /tune-index-build-level
sidebar_key: tune-index-build-level
sidebar_label: "ビルドレベルの調整"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud では、target コレクションのストレージ容量と検索再現率のバランスを調整できるパラメーター `buildlevel` を導入しています。使用頻度の低いコレクションや、より多くのストレージ容量を必要とするコレクションでは、再現率のわずかな低下と引き換えにストレージ容量を大幅に増やせます。逆も同様です。このガイドでは、使用可能なオプションとそれらを使用してコレクションのインデックスを構築する方法について説明します。 | BYOC"
type: origin
token: WQvUw9c9lifskGkgz0fcmUWvnFb
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - ベクトルフィールド
  - インデックス
  - インデックスビルドレベル

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# インデックスビルドレベルの調整

Zilliz Cloud は `build_level` というパラメーターを導入しており、これによりユーザーはターゲットコレクションのストレージ容量と検索再現率のバランスを調整できます。使用頻度が低いコレクションや、より多くのストレージ容量が必要なコレクションでは、わずかな再現率の低下と引き換えにストレージ容量を大幅に増加させることができ、その逆も可能です。このガイドでは、利用可能なオプションと、コレクションのインデックスを構築するための使用方法について説明します。

<Admonition type="info" icon="📘" title="Notes">

この機能は現在 **パブリックレビュー** 中であり、**パフォーマンス最適化済み**、**容量最適化済み**、および **Tiered-storage** タイプの専用クラスターにのみ適用されます。また、**Milvus v2.6.x** と互換性がある必要があります。

この機能をテストするためにクラスターをアップグレードできます。さらに説明が必要な点がありましたら、お問い合わせください。

</Admonition>

## 概要\{#overview}

Zilliz Cloud のクラスタータイプによって、公称ストレージ容量は大幅に異なります。パフォーマンス最適化済みクラスター内のコレクションが使用頻度が低い、または追加のストレージを必要とする場合は、コレクション内の浮動小数点ベクトルタイプ（**FLOAT_VECTOR**、**FLOAT16_VECTOR**、**BFLOAT16_VECTOR** など）のベクトルフィールドに対してインデックスを作成する際に、`build_level` を 容量優先 オプションに設定することを検討してください。これにより、再現率が若干低下する可能性がありますが、ストレージ容量を **30%** から **40%** 向上させることができます。

`build_level` パラメーターには、**精度優先** (2)、**バランス** (1)、**容量優先** (0) の 3 つのオプションがあります。

- **バランス** (1)

    これはデフォルトオプションであり、ほとんどのシナリオで検索精度とストレージ容量のバランスを取ります。

- **精度優先** (2)

    このオプションは検索パフォーマンスと高い再現率を優先し、高い精度が要求されるコレクションに適しています。

- **容量優先** (0)

    このオプションはストレージ容量を重視し、追加のストレージスペースを必要とするコレクションに理想的です。

内部ベンチマークテストで示されているように、デフォルトオプションはクラスターのタイプに関係なく、すべてのクラスターのストレージ容量を増加させます。パフォーマンス最適化済みクラスターの場合、デフォルトオプションはストレージ容量を **60%** 向上させ、パフォーマンス (QPS) を **17%** 改善します。

### パフォーマンス最適化済みクラスター\{#performance-optimized-clusters}

以下の表は、`build_level` 導入前後のパフォーマンス最適化済みクラスターの容量、QPS、および再現率を比較しています。デフォルトオプションは再現率を維持しつつ、QPS とストレージ容量の両方を向上させることがわかります。

<table>
   <tr>
     <th><p>ビルドレベルのオプション</p></th>
     <th><p>容量</p></th>
     <th><p>QPS</p></th>
     <th><p>再現率</p></th>
   </tr>
   <tr>
     <td><p>容量優先 (0)</p></td>
     <td><p>210 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 2,850</p></td>
     <td><p>90% - 95%</p></td>
   </tr>
   <tr>
     <td><p>バランス (1)</p></td>
     <td><p>150 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 3,500</p></td>
     <td><p>91% - 97%</p></td>
   </tr>
   <tr>
     <td><p>精度優先 (2)</p></td>
     <td><p>100 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 3,000</p></td>
     <td><p>92% - 98% (↑)</p></td>
   </tr>
</table>

### 容量最適化済みクラスター\{#capacity-optimized-clusters}

以下の表は、`build_level` 導入前後の容量最適化済みクラスターの容量、QPS、および再現率を比較しています。デフォルトオプションは再現率を維持しつつ、QPS とストレージ容量の両方を向上させることがわかります。

<table>
   <tr>
     <th><p>ビルドレベルのオプション</p></th>
     <th><p>容量</p></th>
     <th><p>QPS</p></th>
     <th><p>再現率</p></th>
   </tr>
   <tr>
     <td><p>容量優先 (0)</p></td>
     <td><p>700 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 300</p></td>
     <td><p>89% - 97%</p></td>
   </tr>
   <tr>
     <td><p>バランス (1)</p></td>
     <td><p>500 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 350</p></td>
     <td><p>93% - 98%</p></td>
   </tr>
   <tr>
     <td><p>精度優先 (2)</p></td>
     <td><p>300 万個の 768 次元ベクトル</p></td>
     <td><p>&#126; 345</p></td>
     <td><p>94% - 98%</p></td>
   </tr>
</table>

### ティアードストレージクラスター\{#tiered-storage-clusters}

データの大部分が S3 に保存されるため、メモリが主なボトルネックではなくなります。その結果、クラスターの最大容量は比較的安定したままになります。最も大きな影響は **再現率** に現れ、量子化レベルの違いによりパフォーマンスに若干の変動が生じます。

- **バランス (1):** これは現在の状態を表し、既存のベンチマークと一致したパフォーマンスを維持します。

- **精度優先 (2):** ビルドレベルを上げると、**再現率が約 3%～4% 向上**しますが、QPS がわずかに低下し、レイテンシーが若干増加します。

- **容量優先 (0):** メリットが最小限であるため、この構成はまれであると予想されます。容量は変わりませんが、**再現率が 3%～4% 低下**し、その代わりに QPS とレイテンシーがわずかに改善されます。

## 制限\{#limits}

操作を開始する前に、以下の制限を確認してください。

- コレクションにインデックスを作成する際、**FLOAT_VECTOR**、**FLOAT16_VECTOR**、**BFLOAT16_VECTOR** などの浮動小数点ベクトルタイプのベクトルフィールドにこのパラメーターを設定する必要があります。

- 一度設定すると、このパラメーターは変更できません。ただし、必要に応じてインデックスを削除し、別のインデックスを作成することは可能です。

- 移行またはバックアップを行うと、`build_level` の設定は削除されます。移行または復元が完了したら、必要に応じてインデックスを削除し、別のインデックスを作成できます。

## 手順\{#procedure}

ほとんどの場合、`build_level` を設定する必要はありません。デフォルト設定により、検索パフォーマンス、精度、ストレージ容量のバランスを取ることができます。

Zilliz Cloud では、プログラムによる方法または Zilliz Cloud コンソール上で `build_level` を設定できます。

### プログラムによる build_level の設定\{#set-buildlevel-programmatically}

`build_level` を設定するには、**FLOAT_VECTOR**、**FLOAT16_VECTOR**、**BFLOAT16_VECTOR** などの浮動小数点タイプの[ベクトルフィールドにインデックスを作成する](./index-vector-fields#index-a-collection) 際に行う必要があります。

次の例は、[準備](./index-vector-fields#preparations) の手順を完了していることを前提としています。`build_level` を `1` に設定すると、**バランス** オプションが適用されることを示します。

```python
# 4. Set up index
# 4.1. Set up the index parameters
index_params = MilvusClient.prepare_index_params()

# 4.2. Add an index on the vector field.
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type="AUTOINDEX",
    index_name="vector_index",
    # highlight-next-line
    build_level=1
)

# 4.4. Create an index file
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)

# 5. Describe index
res = client.list_indexes(
    collection_name="customized_setup"
)
```

### Zilliz Cloud コンソールで build_level を設定する\{#set-buildlevel-on-the-zilliz-cloud-console}

`build_level` をプログラムで設定する代わりに、コレクション作成時に Zilliz Cloud コンソール上で設定することもできます。

<Supademo id="cmfkua8whed1839ozdau9fzqp?utm_source=link" title=""  />

1. 対象クラスターの **Collection** タブで、**+ Create Collection** をクリックします。

1. **Create Collection** ページでスキーマを設定します。

    ベクトルフィールドのデータ型が、有効なオプション（**FLOAT_VECTOR**、**FLOAT16_VECTOR**、**BFLOAT16_VECTOR**）のいずれかであることを確認してください。

1. **Create Index** セクションで、**Edit Index** をクリックします。

1. 表示された **Edit Vector Index** フィールドで、**メトリックタイプ** と **Index Build Level** を設定できます。

