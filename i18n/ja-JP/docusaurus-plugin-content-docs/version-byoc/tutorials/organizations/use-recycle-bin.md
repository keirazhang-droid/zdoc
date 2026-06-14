---
title: "ごみ箱の使用 | BYOC"
slug: /use-recycle-bin
sidebar_key: use-recycle-bin
sidebar_label: "ごみ箱の使用"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud のごみ箱機能は、意図的か試用期間の終了またはサービスの停止の結果かを問わず、削除されたすべてのクラスターの記録を保持することでデータを保護します。もし考えが変わったり、誤ってクラスターを削除した場合、ごみ箱はクラスター復元のための30日間の猶予期間を提供します。 | BYOC"
type: origin
token: JQvjwCDxhiMcj0kpaWicqXsTn1e
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - ごみ箱

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# ごみ箱を使用する

Zilliz Cloud のごみ箱機能は、意図的、またはトライアル期限切れやサービスの停止によって削除されたすべてのクラスターのレコードを保持することで、データを保護します。もし考えが変わったり、誤ってクラスターを削除した場合でも、ごみ箱はクラスター復元のために 30 日間の猶予期間を提供します。

ごみ箱を使用するには、**組織オーナー**である必要があります。

## ごみ箱内の削除されたクラスターを復元する\{#restore-a-dropped-cluster-in-the-recycle-bin}

![ごみ箱の使用](https://zdoc-images.s3.us-west-2.amazonaws.com/byoc-use-recycle-bin.png "byoc-use-recycle-bin")

<Procedures>

1. 削除されたクラスターが属する組織に移動します。

1. 左側のナビゲーションメニューまたは上部のナビゲーションアイコンから**ごみ箱**にアクセスします。

1. 復元するクラスターを見つけます。**アクション**ドロップダウンから**完全クラスターの復元**を選択します。

1. 復元されたクラスターを設定します。

    1. この組織内の別のプロジェクトにクラスターを復元できますが、異なるクラウドリージョンには復元できません。

    1. クラスターの名前を変更したり、クエリ CU の数をリセットしたりできます。

    1. 削除されたクラスターの保持方法によって、復元ページで異なるターゲット Milvus バージョンを選択できる場合があります。バージョンセレクタが利用可能な場合は、復元されたクラスターの Milvus バージョンを選択します。バージョンセレクタが利用できない場合は、復元されたクラスターは元のクラスターのバージョンを使用し、ターゲットバージョンを変更することはできません。

    <Admonition type="info" icon="📘" title="Notes">

    クラスター内のコレクションのロードステータスは保持されます。

    </Admonition>

1. **復元**をクリックします。Zilliz Cloud は指定された属性でクラスターの作成を開始し、データを作成されたクラスターに復元します。

1. 新しい復元ジョブが生成されます。[ジョブ](./job-center)ページでクラスター復元の進行状況を確認できます。ジョブのステータスが **IN PROGRESS** から **SUCCESSFUL** に変わると、復元は完了です。

</Procedures>