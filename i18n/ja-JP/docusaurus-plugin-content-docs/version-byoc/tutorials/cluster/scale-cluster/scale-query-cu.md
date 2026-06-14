---
title: "Query CUのスケーリング | BYOC"
slug: /scale-query-cu
sidebar_key: scale-query-cu
sidebar_label: "Query CUのスケーリング"
beta: FALSE
notebook: FALSE
description: "ワークロードの増加やデータの書き込みが進むにつれて、サービングクラスターが容量の限界に達する可能性があります。その場合、読み取り操作は引き続き機能しますが、新しい書き込み操作は失敗する可能性があります。 | BYOC"
type: origin
token: ExUFwDY1siCa2Bkp4incCvxFnlh
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - スケーリング
  - 管理
  - Query CU

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# クエリCUのスケーリング

ワークロードが増加し、より多くのデータが書き込まれると、サービスクラスタが容量制限に達する可能性があります。その場合、読み取り操作は引き続き機能しますが、新しい書き込み操作は失敗する可能性があります。

これを事前に管理するには、[メトリクス](./metrics-alerts-reference)ページで**クエリCU容量**を監視し、クエリCUのスケーリングが必要かどうかを判断できます。ビジネスニーズとパターンに基づいて、クエリCU数を増やしてクラスタ容量を拡大したり、需要が減少したときに削減してコストを節約したりできます。

なお、1～12 CUのサービスクラスタでは、クエリCUを直接スケーリングできます。12 CUを超えるサービスクラスタの場合は、[レプリカ](./manage-replica)を増やしてください。

このガイドでは、変化するワークロードに合わせてサービスクラスタのサイズを変更する方法について説明します。

## 考慮事項\{#considerations}

- **リソースの制限**:

    - **スケールアップ**

        - Dedicated（Standard）クラスタ：最大32 CU

            Dedicated（Enterprise）クラスタ：最大1,024 CU

        - **クエリCU数** × **レプリカ数** の積は10,240を超えないようにする必要があります

        より大きなクエリCUについては、[セールスまでお問い合わせ](http://zilliz.com/contact-sales)ください。

    - **スケールダウン**

        - レプリカがあるクラスタは、12 CU未満にスケールダウンできません

        - スケールダウンリクエストが成功するのは、次の条件を満たす場合のみです：

            - 現在のデータ量が、新しいCUサイズのCU容量の80%未満であること。

            - 現在のコレクション数とパーティション数が、新しいCUサイズで許可されている[コレクションとパーティションの最大数](./limits#collections)未満であること。

- **スケーリング中**: クラスタステータスが「変更中」に変わり、その間は操作を実行できません。複数のスケーリングタスクがトリガーされた場合、トリガータイムスタンプに基づいて順次処理されます。完了時間はデータ量によって異なります。

- **スケーリング中の請求**: クエリCUのスケーリングジョブ中、Zilliz Cloudは引き続き以前のクエリCU構成に基づいてクラスタに請求します。新しいクエリCU数は、スケーリングジョブが正常に完了した後にのみ請求に使用されます。スケーリングジョブが進行中または完了していない場合、請求は以前のクエリCU構成に基づいて行われます。

- **パフォーマンスへの影響**: スケーリングにより、サービスにわずかなジッターが発生する可能性があります。

- **バックアップの制限**: 動的およびスケジュールされたスケーリング設定は、[バックアップ](./create-backup)に含まれません。クラスタを復元した後は、これらの設定を手動で再構成してください。

## 手動スケーリング\{#manual-scaling}

Zilliz CloudコンソールまたはRESTful APIを使用して、クラスタを手動でスケールアップまたはスケールダウンできます。

次のデモでは、Zilliz Cloud Webコンソールでクラスタを手動でスケールアップおよびスケールダウンする方法を示します。

<Supademo id="cmd2r0jc634jlc4kju69onxyh?utm_source=link" title=""  />

<Admonition type="info" icon="📘" title="Notes">

「クエリノードCUのスケール」ダイアログボックスで**保存**をクリックすると、プロジェクトのリソースクォータを確認するよう求められます。リソースが十分な場合、チェックが完了するとダイアログボックスは閉じます。それ以外の場合は、次のいずれかを実行できます。

- **プロジェクトリソース設定に移動**をクリックして、プロジェクトのリソース設定を編集するか、

- **前のステップに戻る**をクリックして、クラスタ設定を変更します。

このプロセス中、ローリングのために追加のリソースが必要になります。これらのリソースは使用後に解放されます。

</Admonition>

さらに、RESTful APIを使用してクエリCUを手動でスケーリングすることもできます。

次の例では、既存のクラスタを2 CUにスケーリングします。詳細については、[クラスタの変更](/reference/restful/modify-cluster-v2)を参照してください。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "cuSize": 2
}'
```

