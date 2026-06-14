---
title: "コスト最適化 | Cloud"
slug: /cost-optimization
sidebar_key: cost-optimization
sidebar_label: "コスト最適化"
beta: FALSE
notebook: FALSE
description: "データの規模とクエリボリュームが増大するにつれて、コスト管理が重要になります。このガイドでは、Zilliz Cloudのコスト最適化戦略を、デプロイメント選択、インデックスチューニング、弾力性スケーリング、割引、課金分析の5つの次元にわたって体系的に説明します。 | Cloud"
type: origin
token: MYHwwhKtri4MMJku6BbcMjF4n1d
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - milvus
  - コスト最適化

---

import Admonition from '@theme/Admonition';


# コスト最適化

データの規模とクエリ量が増加するにつれて、コスト管理は重要になります。このガイドでは、デプロイメントの選択、インデックスのチューニング、エラスティックスケーリング、割引、課金分析の5つの側面から、Zilliz Cloudのコスト最適化戦略を体系的に説明します。

## 請求書を理解する\{#understand-your-bill}

最適化の前に、コストがどこから発生しているかを特定してください。Zilliz Cloudの料金は、以下の5つの要素で構成されています。

<table>
    <tr>
        <th><p>項目</p></th>
        <th><p>説明</p></th>
        <th><p>最適化可能？</p></th>
    </tr>
    <tr>
        <td><p><a href="https://zilliverse.feishu.cn/wiki/J2prwh2KLis9oqkqNIAcU1d6nsd">Compute（CU）</a></p></td>
        <td><p>専用クラスターのCompute Unitに基づく時間単位の課金。</p></td>
        <td><p>選択 + スケーリング</p></td>
    </tr>
    <tr>
        <td><p><a href="https://zilliverse.feishu.cn/wiki/Uk0Nw1ZdbiOEBtkAOKacLTf8nGe">読み取り/書き込み操作</a></p></td>
        <td><p>Serverlessクラスターの従量課金。</p></td>
        <td><p>クエリ最適化</p></td>
    </tr>
    <tr>
        <td><p><a href="https://zilliverse.feishu.cn/wiki/PNj2w5fY9ifr82kbX8ucKgXAn0r">ストレージ</a></p></td>
        <td><p>データおよびバックアップストレージ（クラスターのステータスに関わらず）。</p></td>
        <td><p>構築レベル + データクリーンアップ</p></td>
    </tr>
    <tr>
        <td><p><a href="https://zilliverse.feishu.cn/wiki/BClgwKlHaiushBkPPssclTkYnef">データ転送</a></p></td>
        <td><p>イングレス、エグレス、クロスリージョン転送。</p></td>
        <td><p>アーキテクチャ計画</p></td>
    </tr>
    <tr>
        <td><p><a href="https://zilliverse.feishu.cn/wiki/GBfswoqhviHfTVk2qhHc4eGXnfh">監査ログ</a></p></td>
        <td><p>監査ログのためのリソース消費。</p></td>
        <td><p>必要に応じて有効化</p></td>
    </tr>
</table>

ほとんどのユーザーにとって、コストの70%以上は**Compute**から発生しており、これが最大の最適化の可能性を提供します。

ベクトル次元、データ量、QPS要件に基づいて月間見積もりを取得するには、[料金計算ツール](https://zilliz.com/pricing#calculator) を使用してください。実際のコストは見積もりよりも低くなることがよくあります。これは、ビジネス負荷が無制限にピーク容量を維持することはほとんどないためです。

## 適切なデプロイメント方法を選択する\{#choose-the-right-deployment-method}

適切なデプロイメント方法を選択することは、最も影響力のある決定です。間違った方法を選択すると、マイナーな最適化では埋められないコストが発生する可能性があります。

### デプロイメント方法の概要\{#deployment-methods-at-a-glance}

<table>
    <tr>
        <th><p>タイプ</p></th>
        <th><p>価格参考（768次元）</p></th>
        <th><p>容量/CU</p></th>
        <th><p>検索QPS</p></th>
        <th><p>レイテンシー</p></th>
        <th><p>ユースケース</p></th>
    </tr>
    <tr>
        <td><p>無料</p></td>
        <td><p>0</p></td>
        <td><p>5 GB、≤5コレクション</p></td>
        <td><p>—</p></td>
        <td><p>—</p></td>
        <td><p>学習、プロトタイピング</p></td>
    </tr>
    <tr>
        <td><p>Serverless</p></td>
        <td><p>RUごとの従量課金</p></td>
        <td><p>オートスケーリング</p></td>
        <td><p>自動</p></td>
        <td><p>中</p></td>
        <td><p>不安定なトラフィック、開発/テスト</p></td>
    </tr>
    <tr>
        <td><p>専用（パフォーマンス最適化済み）</p></td>
        <td><p>～&#36;65/100万ベクトル/月</p></td>
        <td><p>200万/CU</p></td>
        <td><p>500～1,500</p></td>
        <td><p>低（&lt;10ms p99）</p></td>
        <td><p>レイテンシー重視の本番環境</p></td>
    </tr>
    <tr>
        <td><p>専用（容量最適化済み）</p></td>
        <td><p>～&#36;20/100万ベクトル/月</p></td>
        <td><p>800万/CU</p></td>
        <td><p>100～300</p></td>
        <td><p>中</p></td>
        <td><p>大規模、コスト重視</p></td>
    </tr>
    <tr>
        <td><p>専用（階層ストレージ）</p></td>
        <td><p>～&#36;7/100万ベクトル/月</p></td>
        <td><p>4000万/CU（8 CU以上）</p></td>
        <td><p>100～150（ホット）</p></td>
        <td><p>高い</p></td>
        <td><p>大規模データ、コールド/ホット分割</p></td>
    </tr>
    <tr>
        <td><p>BYOC</p></td>
        <td><p>カスタム</p></td>
        <td><p>カスタム</p></td>
        <td><p>カスタム</p></td>
        <td><p>カスタム</p></td>
        <td><p>コンプライアンス、クラウド割引</p></td>
    </tr>
</table>

### 選択決定ツリー\{#selection-decision-tree}

- **データ < 100万ベクトル、QPS < 50？**
→ **Serverless** を使用します。アイドルコストがゼロの操作に対してのみ支払います。「潜在的な」トラフィックのために専用リソースをプロビジョニングしないでください。

- **データ 100万～5000万ベクトル、安定した低レイテンシーが必要？**
→ **容量最適化済み** クラスターが最もコスト効率の高いソリューションです。パフォーマンス最適化済みオプションよりも3倍安く、サブ100ミリ秒のレイテンシーを提供し、これはほとんどのRAGやレコメンデーションシナリオで十分です。極端な要件（例：&lt;10 ms p99リアルタイム検索）の場合のみ、**パフォーマンス最適化済み** クラスターを使用します。

- **データ > 5000万ベクトル、アクセス頻度が低い？**
→ **階層ストレージ** クラスターを使用します。容量最適化済みオプションよりも3倍安く、サブセットのみが頻繁にクエリされる大規模データのシナリオ（例：履歴ログ分析）に最適です。

- **コンプライアンスまたは既存のクラウド割引（RI/SP）？**
→ **BYOC（Bring Your Own Cloud）**。クラスターはお客様のVPC内で実行され、エンタープライズレベルのクラウド割引を活用し、データ主権要件を満たすことができます。

### 推奨：容量最適化済み—ほとんどのシナリオに最適\{#recommendation-capacity-optimizedthe-best-fit-for-most-scenarios}

容量最適化済みクラスターは、単に「遅い」バージョンとして誤解されることがよくあります。実際には、Zilliz Cloudの最もアーキテクチャ的に洗練された製品です。

従来のベクトルデータベースはすべてのインデックスと生データをメモリに保持し、コストと速度をトレードオフするのに対し、容量最適化済みクラスターは**階層ストレージアーキテクチャ**を使用します。

- **レイヤードストレージ：** ベクトルインデックスは速度のためにメモリに保持され、スカラーデータと生ベクトルはインテリジェントキャッシングを備えたmmapを介してディスクにマッピングされます。これにより、パフォーマンス最適化済みクラスターと比較して、CUあたり3倍のデータ密度が可能になります。

- **DiskANNレベルの最適化：** IVFインデックスはディスクフレンドリーなアクセス向けにチューニングされており、NVMe SSDを使用してスループットを最大化し、10～50msのレイテンシーを維持します。これはほとんどのAIアプリケーションでは無視できるレベルです。

- **高いリソース利用率：** パフォーマンス最適化済みクラスターは多くの場合30%のヘッドルームを維持しますが、容量最適化済みクラスターは90%以上のデータ密度に達することができます。

**まとめ：** パフォーマンス最適化済みオプションはハードウェアで速度を購入し、容量最適化済みオプションはテクノロジーで効率を購入します。

### プロジェクトプラン：Standard vs. Enterprise vs. ビジネスクリティカル\{#project-plans-standard-vs-enterprise-vs-business-critical}

Zilliz Cloudは、機能とスケーリング制限に影響を与えるいくつかのプランを提供しています。

<table>
    <tr>
        <th><p>機能</p></th>
        <th><p>Standard</p></th>
        <th><p>Enterprise</p></th>
        <th><p>ビジネスクリティカル</p></th>
    </tr>
    <tr>
        <td><p>最大CU</p></td>
        <td><p>32 CU</p></td>
        <td><p>256 CU</p></td>
        <td><p>512 CU</p></td>
    </tr>
    <tr>
        <td><p>レプリカ制限</p></td>
        <td><p>クエリCU × レプリカ ≤ 32</p></td>
        <td><p>クエリCU × レプリカ ≤ 256</p></td>
        <td><p>クエリCU × レプリカ ≤ 512</p></td>
    </tr>
    <tr>
        <td><p>SLA</p></td>
        <td><p>0.999</p></td>
        <td><p>0.9995</p></td>
        <td><p>0.9999</p></td>
    </tr>
    <tr>
        <td><p>マルチAZ</p></td>
        <td><p>シングルAZ</p></td>
        <td><p>オプション</p></td>
        <td><p>デフォルトで有効</p></td>
    </tr>
    <tr>
        <td><p>RBAC</p></td>
        <td><p>基本</p></td>
        <td><p>カスタムロール + 監査</p></td>
        <td><p>フル + SOC2/HIPAA</p></td>
    </tr>
    <tr>
        <td><p>BYOC</p></td>
        <td><p>サポート対象外</p></td>
        <td><p>サポート対象</p></td>
        <td><p>サポート対象</p></td>
    </tr>
    <tr>
        <td><p>サポート</p></td>
        <td><p>チケット</p></td>
        <td><p>SA + Slack</p></td>
        <td><p>24時間365日 + 15分応答</p></td>
    </tr>
</table>

詳細については、[プラン比較の詳細](./select-zilliz-cloud-service-plans) を参照してください。

**アドバイス：** **Standard** から始めてください。より高いSLA、マルチAZ、またはより大規模なスケールが必要な場合のみ、**Enterprise** にアップグレードしてください。アップグレードはシームレスで、データ移行は不要です。

### よくある落とし穴\{#common-pitfalls}

1. **デフォルトでパフォーマンス最適化済みクラスターを選択する：** 多くのユーザーは、PoC中に使用したパフォーマンス最適化済みクラスターに基づいて予算を立てます。しかし、容量最適化済みは「ダウングレード」バージョンではなく、コスト効率のために特別に設計されたアーキテクチャです。パフォーマンス最適化済みクラスターの1/3のコストで、ほとんどのシナリオに十分なQPSを提供します。

1. **階層ストレージオプションを見落とす：** パフォーマンス最適化済みクラスターの1/9のコストで、階層ストレージクラスターは明確なホット/コールドアクセスパターンを持つデータに最適です。データのごく一部のみが低レイテンシーを必要とする場合、階層ストレージオプションはコストを1桁削減できます。

1. **小規模に専用を使用する：** 小規模なデータセットや不安定なトラフィックの場合、Serverless（従量課金）は専用よりもはるかにコスト効率が優れています。「エンタープライズ」という体裁のためにリソースを過剰にプロビジョニングしないでください。

## インデックスとストレージの最適化\{#index-and-storage-optimization}

モードが選択されたら、パラメータを調整して各CUの有用性を最大化します。

### インデックス構築レベル：容量 vs. 再現率\{#index-build-level-capacity-vs-recall}

[`build_level`](./tune-index-build-level)[パラメータ](./tune-index-build-level)は、インデックスの精度とストレージ密度を制御します。極端な再現率を必要としないシナリオでは、これを下げることで各CUのストレージ容量を大幅に増やすことができます。

- **パフォーマンス最適化済みクラスター（768次元、CUあたり）：**

    <table>
        <tr>
            <th><p>構築レベル</p></th>
            <th><p>容量</p></th>
            <th><p>増加</p></th>
            <th><p>再現率</p></th>
            <th><p>QPS</p></th>
        </tr>
        <tr>
            <td><p>容量優先（0）</p></td>
            <td><p>210万</p></td>
            <td><p>0.4</p></td>
            <td><p>90～95%</p></td>
            <td><p>～2,850</p></td>
        </tr>
        <tr>
            <td><p>バランス（1）デフォルト</p></td>
            <td><p>150万</p></td>
            <td><p>ベースライン</p></td>
            <td><p>91～97%</p></td>
            <td><p>～3,500</p></td>
        </tr>
        <tr>
            <td><p>精度優先（2）</p></td>
            <td><p>100万</p></td>
            <td><p>-0.33</p></td>
            <td><p>92～98%</p></td>
            <td><p>～3,000</p></td>
        </tr>
    </table>

- **容量最適化済みクラスター（768次元、CUあたり）：**

    <table>
        <tr>
            <th><p>構築レベル</p></th>
            <th><p>容量</p></th>
            <th><p>増加</p></th>
            <th><p>再現率</p></th>
            <th><p>QPS</p></th>
        </tr>
        <tr>
            <td><p>容量優先（0）</p></td>
            <td><p>700万</p></td>
            <td><p>0.4</p></td>
            <td><p>89～97%</p></td>
            <td><p>～300</p></td>
        </tr>
        <tr>
            <td><p>バランス（1）デフォルト</p></td>
            <td><p>500万</p></td>
            <td><p>ベースライン</p></td>
            <td><p>93～98%</p></td>
            <td><p>～350</p></td>
        </tr>
        <tr>
            <td><p>精度優先（2）</p></td>
            <td><p>300万</p></td>
            <td><p>-0.4</p></td>
            <td><p>94～98%</p></td>
            <td><p>～345</p></td>
        </tr>
    </table>

**ケーススタディ：** 16 CUの容量最適化済みクラスターは、デフォルトで8000万ベクトルを保持します。`容量優先`に切り替えると、これは1億1200万に増加するか、同じ8000万ベクトルを12 CUに収めることができ、**CUコストを25%節約**できます。

<Admonition type="info" icon="📘" title="**Note**">

`build_level`パラメータは一度設定すると変更できません。変更するにはインデックスをドロップして再作成する必要があります。コレクションを作成する前に要件を評価することをお勧めします。このパラメータは浮動小数点ベクトルタイプ（FLOAT_VECTOR、FLOAT16_VECTOR、BFLOAT16_VECTOR）のみをサポートします。

</Admonition>

### 検索レベル：パフォーマンス vs. コスト\{#search-level-performance-vs-cost}

[`level`](./tune-recall-rate)[パラメータ](./tune-recall-rate)（1～10）は検索精度を制御します。

- **レベル1～3：** ほとんどのシナリオに最適（90～95%の再現率）。
- **レベル4～7：** 高精度シナリオ。95～98%の再現率のために約2～3倍のレイテンシーとトレードオフします。
- **レベル8～10：** 高リスクシナリオ（例：医療、不正検出）向けの極端な精度ですが、レイテンシーとコンピューティングコストが大幅に増加します。

**アドバイス：** `enable_recall_calculation=true`を使用して再現率を測定し、ビジネス要件を満たす最低のレベルを見つけてください。レベルが上がるごとに、検索で消費される計算リソースが増加します。Serverlessクラスターでは、これは直接的にRead vCUコストの増加につながります。専用クラスターでは、同じCU割り当てでサポート可能なQPSが低下することを意味します。

### Mmap設定：メモリとディスクのバランス\{#mmap-configuration-balancing-memory-and-disk}

[メモリマッピング（mmap）](./use-mmap)は、データをメモリからディスクにオフロードします。

<table>
    <tr>
        <th><p>クラスタータイプ</p></th>
        <th><p>デフォルトのMMAPポリシー</p></th>
        <th><p>効果</p></th>
    </tr>
    <tr>
        <td><p>専用（パフォーマンス最適化済み）</p></td>
        <td><p>生ベクトルデータのみmmapを使用。スカラーデータとすべてのインデックスはメモリに残る</p></td>
        <td><p>低レイテンシーを保証</p></td>
    </tr>
    <tr>
        <td><p>専用（容量最適化済み）</p></td>
        <td><p>スカラーインデックス + すべての生データがmmapを使用。ベクトルインデックスのみメモリに残る</p></td>
        <td><p>容量を最大化</p></td>
    </tr>
    <tr>
        <td><p>無料 / Serverless</p></td>
        <td><p>すべてのフィールドとインデックスがmmapを使用</p></td>
        <td><p>システムキャッシュに依存</p></td>
    </tr>
</table>

**最適化の推奨事項：**

- パフォーマンス最適化済みクラスターの場合、スカラーフィルタリングがボトルネックでなければ、スカラーフィールドでmmapを有効にして、ベクトルインデックス用のメモリを解放することを検討してください。

- 容量最適化済みクラスターの場合、デフォルトのポリシーはすでにストレージ優先です。通常、追加のチューニングは必要ありません。

<Admonition type="info" icon="📘" title="**Note**">

mmap設定を変更する前にコレクションをリリースし、その後再ロードする必要があります。誤った設定はパフォーマンス低下やOOMエラーを引き起こす可能性があります。最初にテスト環境で検証してください。

</Admonition>

## クエリ最適化\{#query-optimization}

効率的なクエリは、ServerlessユーザーのRead Unit（RU）コストを削減し、専用CUのQPSを向上させます。

### スカラーフィールドのインデックス化\{#index-scalar-fields}

多くのユーザーは[スカラーインデックス作成](./index-scalar-fields)を軽視しています。これがないと、フィルタ（例：`category == "electronics"` や `timestamp > 1700000000`）は**フルコレクションスキャン**をトリガーし、非常にコストが高くなります。頻繁にフィルタリングされるスカラーフィールドにはインデックスを作成できます。

```python
collection.create_index(
    field_name="category",
    index_name="idx_category"
)
collection.create_index(
    field_name="timestamp",
    index_name="idx_timestamp"
)
```

**最適化の推奨事項:**

- `filter` 式に含まれるすべてのスカラーフィールドに対してインデックスの構築を行ってください。Zilliz Cloud は適切なインデックスタイプ（文字列には転置インデックス、数値にはソートインデックスなど）を自動的に選択します。

- スカラーインデックスのメモリオーバーヘッドは最小限ですが、フィルタリング性能を桁違いに向上させます — フルテーブルスキャンをインデックスルックアップに変換します。

- **重要:** 特に容量最適化クラスターでのフィルタ付きベクトル検索では、スカラーインデックスの有無が、クエリレイテンシがミリ秒単位になるか秒単位になるかを直接左右します。

### 適切な TopK の選択\{#select-appropriate-topk}

[TopK](./single-vector-search) は計算およびネットワークのオーバーヘッドに直接影響します。

<table>
    <tr>
        <th><p>TopK</p></th>
        <th><p>相対レイテンシ</p></th>
        <th><p>相対 RU コスト (Serverless)</p></th>
        <th><p>典型的なユースケース</p></th>
    </tr>
    <tr>
        <td><p>1–10</p></td>
        <td><p>ベースライン</p></td>
        <td><p>1x</p></td>
        <td><p>RAG（通常 3–5 コンテキストチャンク）</p></td>
    </tr>
    <tr>
        <td><p>10–50</p></td>
        <td><p>1.2–1.5x</p></td>
        <td><p>1.5–2x</p></td>
        <td><p>レコメンデーションシステム、検索結果ページ</p></td>
    </tr>
    <tr>
        <td><p>50–200</p></td>
        <td><p>1.5–3x</p></td>
        <td><p>2–4x</p></td>
        <td><p>候補セット生成、リランキング入力</p></td>
    </tr>
    <tr>
        <td><p>200–1000</p></td>
        <td><p>3–10x</p></td>
        <td><p>4–10x</p></td>
        <td><p>バッチ分析、クラスタリング</p></td>
    </tr>
</table>

- **RAG:** TopK 3–10 を使用してください。コンテキストを増やしても LLM の品質はほとんど向上せず、トークンと RU を無駄にするだけです。

- **レコメンデーション:** リランキングモデルの上限を使用してください（通常 20–50）。

- **大 きな TopK:** 巨大な結果セットを1回のリクエストで返すのではなく、[ページネーション](./single-vector-search#use-limit-and-offset)（`offset` + `limit`）または [イテレータ](./with-iterators) を使用してください。

### 出力フィールドの絞り込み\{#refine-output-fields}

デフォルトでは、検索は以下に示すようにすべてのスカラーフィールドを返します。

```python
results = collection.search(vectors, "embedding", search_params, limit=10)
```

ただし、すべてのクエリで大きなテキストフィールド（例：ドキュメントの全文）を返すと、レイテンシと RU コストが増加します。そのため、必要な出力フィールドのみを指定できます。

```python
results = collection.search(
    vectors, "embedding", search_params, limit=10,
    output_fields=["id", "title", "category"]  # 不要返回 "content" 等大字段
)
```

詳細については、[出力フィールドの使用](./single-vector-search#use-output-fields) を参照してください。

**最適化の推奨事項:**

- 常に `output_fields` を明示的に指定し、ビジネスロジックで必要なフィールドのみを返すようにしてください。

- RAG シナリオで元のテキストが必要な場合は、まずベクトル検索で ID を取得し、その後、外部ストレージ（例：Redis、データベース）から ID を使ってソースコンテンツを取得することを検討してください。これにより、ベクトル検索を高速に保ちながら、外部ストレージがキャッシングの恩恵を受けられるようになります。

- Serverless モードでは、返されるデータ量が Read vCU の課金に直接影響します — 不要なフィールドを減らすことは、コストを削減する最も簡単な方法です。

### パーティションキーを活用する\{#utilize-partition-keys}

[パーティションキー](./use-partition-key) は、スカラー値に基づいてデータを自動的にパーティションに分散させ、検索時に無関係なデータをスキップできるようにします。

以下の例は、コレクション作成時にパーティションキーを指定する方法を示しています：

```python
schema.add_field("tenant_id", DataType.VARCHAR, max_length=128, is_partition_key=True)
```

**ユースケース:**

- **マルチテナントSaaS:** `tenant_id` をパーティションキーとして使用することで、各テナントのクエリは自分のデータパーティションのみをスキャンし、QPSとレイテンシーの両方を大幅に改善します。

- **カテゴリフィルタリング:** `category` をパーティションキーとして使用することで、特定のカテゴリ内を検索する際にフルデータセットのスキャンが不要になります。

**パフォーマンス向上:** 100テナントでデータが均等に分散していると仮定すると、パーティションキーの使用によりクエリあたりのスキャン量が約99%削減されます。不均等な分散の場合でも、スキャン量は通常50〜90%削減されます。

## Elastic scaling\{#elastic-scaling}

Dedicated クラスターにおける最大のコストの落とし穴は、「ピーク負荷に合わせてプロビジョニングし、24時間稼働させること」です。Zilliz Cloud はこのパターンを打破するための3つのスケーリング戦略を提供しています。

### Dynamic scaling\{#dynamic-scaling}

最小および最大CU値を設定すると、システムがリアルタイムの負荷に基づいて自動的にスケーリングします。

- Query CU は CU容量 メトリクス（データ量主導）に基づいて自動スケーリングされます

- Replica は CU計算 メトリクス（QPS主導）に基づいて自動スケーリングされます

**典型的なシナリオ:** 昼間のピーク時に32 CUが必要だが、夜間は8 CUで十分なeコマース検索サービス。動的スケーリング の設定で min=8、max=32 と設定すると、オフピーク時に自動的に8 CUまでスケールダウンします。1日あたりオフピーク時間を10時間と仮定すると、月間のコンピュートコストを約30〜40%削減できます。

詳細については、[Dynamic Scaling](./scale-query-cu#dynamic-scaling) を参照してください。

### Scheduled scaling\{#scheduled-scaling}

予測可能なトラフィックパターンを持つワークロードに適しています。基本モード（シンプルなセレクタ）と詳細モード（Unix cron式）をサポートしています。

**典型的な設定:**

- 平日の9:00に32 CUへスケールアップ、22:00に8 CUへスケールダウン

- 週末は終日8 CUを維持

- 月末のプロモーション期間に事前スケーリング

詳細については、[Scheduled Scaling](./scale-query-cu#scheduled-scaling) を参照してください。

### Manual scaling\{#manual-scaling}

最もシンプルなオプションを見落とさないでください — ワークロードが静寂期に入った場合（例: プロジェクト間やオフシーズン中）、積極的にCU設定を削減してください。多くのユーザーはPoC後にスケールダウンを忘れ、数週間から数ヶ月にわたって不要な容量の料金を支払うことになります。

詳細については、[Manual Scaling](./scale-query-cu#manual-scaling) を参照してください。

### Scaling constraints\{#scaling-constraints}

- Query CU × Replica ≤ 10,240

- Replica > 1 の場合、クラスターは12 CU未満にスケールできません

- スケールダウン時、データ量は新しいCU容量の80%未満である必要があります

- 12 CU未満ではQuery CUのみ調整可能です。12 CU以上では、Query CUとReplicaを独立して調整できます

**推奨:** 予測不能なトラフィックには 動的スケーリング を、定期的なトラフィックパターンには スケジュールされたスケーリング を使用してください。両者を組み合わせることも可能です。

## Get more credits and discounts\{#get-more-credits-and-discounts}

技術的な最適化に加えて、Zillizのプロモーションプログラムを最大限に活用することも同様に重要です。

### クレジット\{#credits}

<table>
    <tr>
        <th><p>Channel</p></th>
        <th><p>クレジット</p></th>
        <th><p>Validity</p></th>
        <th><p>Notes</p></th>
    </tr>
    <tr>
        <td><p>New user registration</p></td>
        <td><p>&#36;100 credits</p></td>
        <td><p>30 days</p></td>
        <td><p>Ready to use immediately, no credit card required</p></td>
    </tr>
    <tr>
        <td><p>Add a payment method</p></td>
        <td><p>—</p></td>
        <td><p>Extended to 1 year</p></td>
        <td><p>Any unused credits are automatically extended upon adding a payment method</p></td>
    </tr>
    <tr>
        <td><p>ごみ箱</p></td>
        <td><p>Free</p></td>
        <td><p>—</p></td>
        <td><p>Deleted data incurs no charges while in the ごみ箱</p></td>
    </tr>
</table>

**推奨:** 初回登録後、できるだけ早く支払い方法を追加し、&#36;100クレジットの有効期限を30日間から1年間に延長して、技術評価に十分な時間を確保してください。

### Dedicated programs\{#dedicated-programs}

<table>
    <tr>
        <th><p>Program</p></th>
        <th><p>Target 対象ユーザー</p></th>
        <th><p>How to Apply</p></th>
    </tr>
    <tr>
        <td><p>Zilliz AI Startup Program</p></td>
        <td><p>Early-stage startups</p></td>
        <td><p>Apply through the <a href="https://zilliz.com/zilliz-for-startups">official website</a> to receive additional credits and technical support</p></td>
    </tr>
    <tr>
        <td><p>AI Agent Program</p></td>
        <td><p>AI Agent developers</p></td>
        <td><p>Exclusive credits for developers building AI Agent applications. Coming soon.</p></td>
    </tr>
</table>

### Enterprise customers\{#enterprise-customers}

- **営業部門に連絡してカスタム見積もりを取得:** エンタープライズ顧客は年間サブスクリプションを通じて割引を受けることができます。具体的な価格については [営業部門に連絡](https://zilliz.com/contact-sales) してください。

- **Cloud Marketplace サブスクリプション:** [AWS](./subscribe-on-aws-marketplace)、[Google Cloud](./subscribe-on-gcp-marketplace)、[Azure](./subscribe-on-azure-marketplace) Marketplace を通じてサブスクライブすると、Zilliz Cloud の料金をクラウド請求に統合し、既存のエンタープライズ割引を適用できます。

- **Advance pay:** [advance pay](./advance-pay) を通じてアカウントに資金を入金してください。控除の優先順位は: クレジット > advance pay > cloud marketplace サブスクリプション/クレジットカードです。予算管理要件を持つ組織に適しています。

## Monitor usage page\{#monitor-usage-page}

最適化は一度きりの作業ではありません。Zilliz Cloud は多角的なコスト分析ツールを提供し、支出の継続的な追跡と最適化を支援します。

### Visualized Cost Analysis\{#visualized-cost-analysis}

**請求 > Usage** ページでは、5つの次元で請求を内訳できます:

<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>目的</strong></p></th>
   </tr>
   <tr>
     <td><p>Project</p></td>
     <td><p>Compare usage across different business lines or departments</p></td>
   </tr>
   <tr>
     <td><p>Cluster</p></td>
     <td><p>Identify which cluster is the primary cost driver</p></td>
   </tr>
   <tr>
     <td><p>Time 期間</p></td>
     <td><p>View day-level trends and detect abnormal fluctuations</p></td>
   </tr>
   <tr>
     <td><p>Cost Type</p></td>
     <td><p>Break down charges by billing category</p></td>
   </tr>
   <tr>
     <td><p>クラウドリージョン</p></td>
     <td><p>Compare costs across regions in multi-region deployments</p></td>
   </tr>
</table>

複数の次元をフィルターとして組み合わせることができます。例えば、特定のプロジェクトの過去7日間のCUコストを選択すると、その事業部門のコンピュートコストトレンドを正確に把握できます。

詳細については、[Analyze Cost](./analyze-cost) を参照してください。

### RESTful API\{#restful-api}

[Query Daily Usage](/reference/restful/query-daily-usage-v2) API は、小数点以下8桁までの精度で使用状況データを提供し、内部的なFinOpsワークフローにプログラムで統合して以下が可能です:

- コストレポートの自動生成

- 内部予算システムとの統合

- カスタムアラートルールの設定

### Usage alerts\{#usage-alerts}

[cost metrics](./metrics-alerts-reference#organization-level-metrics) の監視とアラート閾値の設定を推奨し、異常な支出を早期に検出してください — 特に以下のシナリオで重要です:

- 新しく起動したクラスターで、実際のコストが想定と一致するか確認するため

- 動的スケーリング の設定後、スケーリングが正しく機能しているか確認するため

- 新しいチームメンバーが不要なリソースを作成した可能性がある場合

## Cost optimization checklist\{#cost-optimization-checklist}

すぐに実行できるチェックリスト:

**Selection Phase**

**Index 設定**

**Query Optimization**

**運用 Phase**

**請求 Optimization**

## Summary\{#summary}

Zilliz Cloud におけるコスト最適化は、単一のパラメーターを調整することではなく — 選択、設定、クエリ、運用、請求にまたがるシステム的な取り組みです。最も効果の高い最適化は以下の通りです:

1. **まず capacity-optimized クラスターを選択する** — これは「ダウングレード」ではありません。コスト効率を目的に特別に設計された階層型ストレージアーキテクチャであり、パフォーマンス最適化クラスターの1/3の単位コストで、90%以上の本番ユースケースをカバーします。

1. **クエリパターンを最適化する** — スカラーフィールドにインデックスを作成し、TopKを制御し、返却フィールドを削減し、パーティションキーを使用します。これらのそれぞれがクエリあたりのコストを意味fullyに削減します。

1. **Elastic scaling を使用する** — アイドルリソースの支払いをやめ、30〜40%の節約を実現します。

1. **Build level を調整する** — 同じCUで40%多くのデータを保存します。

適切に実行すれば、ほとんどのユーザーはビジネス要件を満たしながらコストを適正な範囲内に抑えることができ — ストレージ階層化、インデックス最適化、および弾力的なスケジューリングにおける Zilliz Cloud の技術的優位性からも恩恵を受けることができます。