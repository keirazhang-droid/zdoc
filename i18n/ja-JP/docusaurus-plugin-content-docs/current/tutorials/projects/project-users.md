---
title: "プロジェクトユーザーの管理 | Cloud"
slug: /project-users
sidebar_key: project-users
sidebar_label: "プロジェクトユーザー"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud では、ユーザーをプロジェクトに招待し、担当業務に応じたロールを割り当てることができます。これらのロールは、ユーザーがプロジェクトリソースにアクセスできる範囲と実行できる操作を決定します。 | Cloud"
type: origin
token: PZ4uwwgUfio5OikY0Ecc5nrunFf
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - cloud
  - プロジェクトユーザー

---

import Admonition from '@theme/Admonition';


# プロジェクトユーザーの管理

Zilliz Cloud では、ユーザーをプロジェクトに招待し、担当業務に応じてロールを割り当てることができます。これらのロールは、ユーザーがプロジェクトリソースにアクセスできる範囲と実行できる操作を決定します。

このトピックでは、プロジェクトユーザーの管理方法について説明します。

## プロジェクトへのユーザー招待\{#invite-a-user-to-a-project}

プロジェクトにユーザーを招待するには、**組織オーナー** または **プロジェクト管理者** である必要があります。

1. 招待したいユーザーのメールアドレスを入力します。

1. アクセス権の割り当て方法を選択します：

    - [プロジェクト管理者](./project-users#project-admin) — プロジェクトおよびそのすべてのリソースに対する完全な制御権を付与します。

    - カスタム [プロジェクトアクセスポリシー](./project-users#project-access) — プロジェクト内でのユーザーの特定の権限を設定します。

招待を受け取った人は、48時間以内に承諾してプロジェクトに参加する必要があるメール招待を受信します。または、Webコンソールから招待リンクをコピーして、招待者と共有することもできます。

ユーザーがプロジェクトに参加すると、自動的にそのプロジェクトが属する組織の **組織メンバー** となります。

<Admonition type="info" icon="📘" title="Notes">

一度に、同じロールを持つ1人以上のユーザーをプロジェクトに招待できます。

</Admonition>

### プロジェクト管理者\{#project-admin}

**プロジェクト管理者** ロールは、プロジェクトおよびそのすべてのリソース（クラスター、データベース、コレクション）を管理する完全な権限を持ちます。

### プロジェクトアクセス\{#project-access}

アクセス権限を最小限に抑えるため、招待したユーザーに対してクラスターとボリュームのアクセスに関するきめ細かな権限を設定することもできます。

![Gs3jwYjb6hVbunbyASAcVUp3nIe](https://zdoc-images.s3.us-west-2.amazonaws.com/Gs3jwYjb6hVbunbyASAcVUp3nIe.png)

- **クラスターアクセス**

    デフォルトでは、**すべてのクラスター** へのアクセスが許可され、**将来のすべてのクラスターを含める** オプションが有効になっています。**読み書き** などのロールを割り当てて、招待したユーザーがこれらのクラスターに対して持つ権限を定義できます。招待が承諾されると、ユーザーはプロジェクト内のすべての現在および将来のクラスターに対して指定された権限を持ちます。

    アクセスを制限するには、ドロップダウンから特定のクラスターを選択します。また、**将来のすべてのクラスターを含める** オプションを無効にして、新しく作成されたクラスターをアクセス範囲から除外することもできます。

    **+ クラスターアクセス** をクリックして、さらにクラスターアクセスポリシーを追加します。

- **ボリュームアクセス**

    デフォルトでは、**すべてのボリューム** へのアクセスが許可され、**将来のすべてのボリュームを含める** オプションが有効になっています。**読み書き** などのロールを割り当てて、招待したユーザーがこれらのボリュームに対して持つ権限を定義できます。招待が承諾されると、ユーザーはプロジェクト内のすべての現在および将来のボリュームに対して指定された権限を持ちます。

    アクセスを制限するには、ドロップダウンから特定のボリュームを選択します。また、**将来のすべてのボリュームを含める** オプションを無効にして、新しく作成されたボリュームをアクセス範囲から除外することもできます。

    **+ ボリュームアクセス** をクリックして、さらにクラスターアクセスポリシーを追加します。

**読み書き**、**読み取り専用**、および **Cluster Admin** ロールの具体的な権限については、以下のセクションで説明します。

#### 読み書き\{#read-write\}

読み書きロールは、プロジェクトを表示し、そのリソース（クラスター、データベース、コレクション）を管理する権限を持ちます。

#### 読み取り専用\{#read-only\}

読み取り専用ロールは、プロジェクトとそのリソース（クラスター、データベース、コレクション）を表示する権限を持ちます。

#### Cluster Admin\{#cluster-admin\}

Cluster Admin ロールは、プロジェクトを表示し、そのリソース（クラスター、データベース、コレクション）を管理する権限を持ちます。

プロジェクト読み書きロールの権限に加えて、Cluster Admin はクラスターのスケーリング、一時停止、再開などのクラスター操作を実行できます。

### プロジェクトロールとアクセスの比較\{#project-role-and-access-comparison\}

以下の表は、異なるプロジェクトロールの権限を簡単に比較したものです。

**クラスター操作**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>クラスターの作成</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターの削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスター Query CU のスケーリング</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスター レプリカのスケーリング</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターの一時停止</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターの再開</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスター一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>クラスターの詳細の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>クラスターメトリクスの表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

**クラスターユーザー**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>クラスターユーザー一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>クラスターユーザーの作成</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターユーザーのパスワードのリセット</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターユーザーの削除</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**監査ログ**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>監査ログの有効化</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>監査ログ設定の編集</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>監査ログの無効化</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>監査ログのステータスの表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

**データプレーン操作**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>コレクションの作成</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>コレクションの削除</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>コレクションの一覧/詳細表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>挿入/アップサート</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>削除</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クエリ/検索/取得</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>一括インポート</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>その他の RESTful API 操作</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>状況による</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="Notes">

Cluster Admin とプロジェクト読み書きの両ロールは、同じデータプレーン権限を共有します。

</Admonition>

**バックアップと復元**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>バックアップ一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>バックアップの作成</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターバックアップファイルを新しいクラスターに復元</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>コレクションバックアップファイルを既存のクラスターに復元</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスターバックアップの削除</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**ボリューム**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>ボリューム一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>ボリュームの作成</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>ボリュームの削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**移行**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>移行ジョブの表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>移行ジョブの作成</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>移行ジョブのキャンセル</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>移行ジョブの詳細の表示（移行されたコレクション/データベースの表示）</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

**ジョブ**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>ジョブ一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>ジョブ詳細の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>ジョブのキャンセル</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>ジョブの再試行</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**プロジェクトアラート**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>アラート一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>アラートの作成</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>アラートの編集</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>アラートの削除</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>アラート履歴の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

**共同作業者**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>プロジェクト共同作業者の招待</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プロジェクト共同作業者のロールの編集</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プロジェクト共同作業者の削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**クラスター IP 許可リスト**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>クラスター IP 許可リストの表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>クラスター IP 許可リストへの IP アドレスの追加</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスター IP 許可リストの IP アドレスの変更</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>クラスター IP 許可リストからの IP アドレスの削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**プライベートエンドポイント**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>プライベートエンドポイント一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>プライベートエンドポイントの作成</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートエンドポイントの削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**CMEK**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>CMEK 一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>CMEK の追加</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>CMEK の削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

**統合**

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>プロジェクト管理者</strong></p></th>
     <th><p><strong>Cluster Admin</strong></p></th>
     <th><p><strong>プロジェクト読み書き</strong></p></th>
     <th><p><strong>プロジェクト読み取り専用</strong></p></th>
   </tr>
   <tr>
     <td><p>統合一覧の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>データdog 統合の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>データdog 統合の作成</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>データdog 統合設定の編集</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>データdog 統合の削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>ストレージ統合の表示</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td><p>ストレージ統合の作成</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>ストレージ統合の削除</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
   </tr>
</table>

## 招待の取り消しまたは再送信\{#revoke-or-resend-an-invitation\}

同じ組織内の既存の組織メンバーをプロジェクトに招待する場合、別途招待を受け取ることなく自動的にプロジェクトへのアクセス権を取得します。ただし、まだ所属していない組織のプロジェクトにユーザーを招待する場合、組織への参加招待を受け取り、これにより指定されたプロジェクトへのアクセスも許可されます。

![CKuxwsNxihJzNtbQ4fBc1xHRnxf](https://zdoc-images.s3.us-west-2.amazonaws.com/CKuxwsNxihJzNtbQ4fBc1xHRnxf.png)

招待を取り消したり再送信したりするには、**組織オーナー** または **プロジェクト管理者** である必要があります。

<Admonition type="info" icon="📘" title="Notes">

ユーザーが承諾する前に、招待を取り消したり再送信したりできます。

</Admonition>

## 共同作業者のロールの編集\{#edit-a-collaborators-role\}

ユーザーが招待を承諾すると、プロジェクトの共同作業者となります。

共同作業者のロールを編集するには、**組織オーナー** または **プロジェクト管理者** である必要があります。

![DCvMwB44UhQdXRbmxdUc493ynJb](https://zdoc-images.s3.us-west-2.amazonaws.com/DCvMwB44UhQdXRbmxdUc493ynJb.png)

## 共同作業者の削除\{#remove-a-collaborator\}

プロジェクトの共同作業者を削除するには、**組織オーナー** または **プロジェクト管理者** である必要があります。

![HKpow0x7qheStnb0zcOcDlyunHc](https://zdoc-images.s3.us-west-2.amazonaws.com/HKpow0x7qheStnb0zcOcDlyunHc.png)

## プロジェクトからの脱退\{#leave-a-project\}

共同作業者をプロジェクトから削除する以外に、自分自身を削除するためにプロジェクトから脱退することもできます。

![DTwiwN0AThgVZLb60dMcSblDnsb](https://zdoc-images.s3.us-west-2.amazonaws.com/DTwiwN0AThgVZLb60dMcSblDnsb.png)

プロジェクトの唯一の管理者である場合、各プロジェクトには常に少なくとも1人のプロジェクト管理者が必要であるため、脱退することはできません。

<Admonition type="caution" icon="🚧" title="Warning">

プロジェクトから脱退すると、プロジェクトおよび関連リソースへのアクセスが取り消されます。

</Admonition>

