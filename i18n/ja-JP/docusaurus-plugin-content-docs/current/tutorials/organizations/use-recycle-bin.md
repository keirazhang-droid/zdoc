---
title: "ごみ箱を使用する | Cloud"
slug: /use-recycle-bin
sidebar_key: use-recycle-bin
sidebar_label: "ごみ箱を使用する"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloudのごみ箱機能は、意図的または試用期限切れやサービス停止の結果として削除されたすべてのServerlessクラスターおよびDedicatedクラスターの記録を保持することで、データを保護します。もし気が変わったり、誤ってクラスターを削除した場合、ごみ箱はクラスター復元のための30日間の猶予期間を提供します。 | Cloud"
type: origin
token: JQvjwCDxhiMcj0kpaWicqXsTn1e
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - cloud
  - ごみ箱

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# ごみ箱の使用

Zilliz Cloud のごみ箱機能は、意図的またはトライアルの期限切れやサービスの停止により削除されたすべての Serverless および Dedicated クラスターの記録を保持することで、データを保護します。もし気が変わったり、誤ってクラスターを削除した場合、ごみ箱はクラスターの復元のために30日間の猶予期間を提供します。

ごみ箱を使用するには、**組織オーナー**である必要があります。

## 前提条件\{#prerequisites}

ごみ箱内のクラスターを復元するには、[支払い方法を追加](/docs/payment-billing) する必要があります。

## ごみ箱内の削除されたクラスターを復元する\{#restore-a-dropped-cluster-in-the-recycle-bin}

![ごみ箱の使用](https://zdoc-images.s3.us-west-2.amazonaws.com/use-recycle-bin.png "use-recycle-bin")

<Procedures>

1. 削除されたクラスターが所属する組織に移動します。

1. 左側のナビゲーションメニューまたは上部のナビゲーションアイコンから**ごみ箱**にアクセスします。

1. 復元するクラスターを見つけます。**Actions**ドロップダウンから**Restore Full Cluster**を選択します。

1. 復元するクラスターを設定します。

    1. この組織内の別のプロジェクトにクラスターを復元できますが、別のクラウドリージョンには復元できません。

    1. クラスターの名前を変更したり、クエリCUの数をリセットしたりできます。

    1. 削除されたクラスターの保持方法によって、復元ページで異なるターゲット Milvus バージョンを選択できる場合があります。バージョンセレクターが利用可能な場合は、復元するクラスターの Milvus バージョンを選択してください。バージョンセレクターが利用できない場合、復元されたクラスターは元のクラスターバージョンを使用し、ターゲットバージョンは変更できません。

    <Admonition type="info" icon="📘" title="Notes">

    クラスター内のコレクションのロード状態は保持されます。

    </Admonition>

1. **Restore**をクリックします。Zilliz Cloud は指定された属性でクラスターの作成を開始し、作成されたクラスターにデータを復元します。

1. 新しい復元ジョブが生成されます。[ジョブ](./job-center) ページでクラスター復元の進行状況を確認できます。ジョブのステータスが **IN PROGRESS** から **SUCCESSFUL** に変わると、復元は完了です。

</Procedures>