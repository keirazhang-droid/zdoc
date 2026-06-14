---
title: "クラスター ロールの管理 (コンソール) | BYOC"
slug: /cluster-roles
sidebar_key: cluster-roles
sidebar_label: "クラスター ロールの管理 (コンソール)"
beta: FALSE
notebook: FALSE
description: "クラスター ロールは、クラスター内でのユーザーの権限を定義します。具体的には、クラスター ロールは、クラスター、データベース、コレクション レベルでのクラスター ユーザーの権限を制御します。 | BYOC"
type: origin
token: YHG0wCYxfiZILvkZ2VLclmvsn7g
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - アクセス制御
  - RBAC
  - ロール

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# クラスターロールの管理（コンソール）

クラスターロールは、ユーザーがクラスター内で持つ特権を定義します。より具体的には、クラスターロールは、クラスターレベル、データベースレベル、およびコレクションレベルでのクラスターユーザーの特権を制御します。

Zilliz Cloud は、組み込みロールとカスタムロールの2種類のクラスターロールを提供しています。

クラスターロールを管理するには、**組織オーナー** または **プロジェクト管理者** であるか、**Cluster_Admin** 特権を持つロールが割り当てられている必要があります。

## 組み込みクラスターロール\{#built-in-cluster-roles}

Zilliz Cloud は、ベクトルデータベースシステムで一般的に必要とされるさまざまな特権を持つ3つの組み込みクラスターロールを提供しています。組み込みロールは編集または削除できません。

- **Admin**: クラスター管理者ロールは、クラスターとそのすべてのリソース（データベース、コレクション）を管理するための完全な特権を持ちます。

    次の表は、このロールに対応するUIおよびAPI特権を示しています。

    <table>
       <tr>
         <th><p><strong>UI特権</strong></p></th>
         <th><p><strong>データプレーン RESTful API (V2) 特権</strong></p></th>
       </tr>
       <tr>
         <td><ul><li><p>クラスターのプロパティ（CUサイズ、レプリカ数、自動スケーリング）を管理</p></li><li><p>コレクションとインデックスを管理</p></li><li><p>クラスターメトリクスを表示</p></li><li><p>クラスターユーザーとロールを管理</p></li><li><p>クラスターバックアップを管理</p></li></ul></td>
         <td><ul><li><p><a href="/reference/restful/collection-operations-v2">すべてのコレクション操作</a></p></li><li><p><a href="/reference/restful/index-operations-v2">すべてのインデックス操作</a></p></li><li><p><a href="/reference/restful/partition-operations-v2">すべてのパーティション操作</a></p></li><li><p><a href="/reference/restful/vector-operations-v2">すべてのベクトル操作</a></p></li><li><p><a href="/reference/restful/alias-operations-v2">すべてのエイリアス操作</a></p></li><li><p><a href="/reference/restful/role-operations-v2">すべてのロール操作</a></p></li><li><p><a href="/reference/restful/user-operations-v2">すべてのユーザー操作</a></p></li></ul></td>
       </tr>
    </table>

- **読み書き**: クラスター読み書きロールは、クラスターを表示し、そのすべてのリソース（データベース、コレクション）を管理する特権を持ちます。

    次の表は、このロールに対応するUIおよびAPI特権を示しています。

    <table>
       <tr>
         <th><p><strong>UI特権</strong></p></th>
         <th><p><strong>データプレーン RESTful API (V2) 特権</strong></p></th>
       </tr>
       <tr>
         <td><ul><li><p>コレクションとインデックスを管理</p></li><li><p>クラスターメトリクスを表示</p></li><li><p>クラスターユーザーとロールを表示</p></li><li><p>クラスターバックアップを表示</p></li></ul></td>
         <td><ul><li><p><a href="/reference/restful/collection-operations-v2">すべてのコレクション操作</a></p></li><li><p><a href="/reference/restful/index-operations-v2">すべてのインデックス操作</a></p></li><li><p><a href="/reference/restful/partition-operations-v2">すべてのパーティション操作</a></p></li><li><p><a href="/reference/restful/vector-operations-v2">すべてのベクトル操作</a></p></li><li><p><a href="/reference/restful/alias-operations-v2">すべてのエイリアス操作</a></p></li></ul></td>
       </tr>
    </table>

- **読み取り専用**: クラスター読み取り専用ロールは、クラスターとそのリソース（データベース、コレクション）を表示する特権を持ちます。

    次の表は、このロールに対応するUIおよびAPI特権を示しています。

    <table>
       <tr>
         <th><p><strong>UI特権</strong></p></th>
         <th><p><strong>データプレーン RESTful API (V2) 特権</strong></p></th>
       </tr>
       <tr>
         <td><ul><li><p>コレクションとインデックスを表示</p></li><li><p>クラスターメトリクスを表示</p></li><li><p>クラスターユーザーとロールを表示</p></li><li><p>クラスターバックアップを表示</p></li></ul></td>
         <td><ul><li><p>コレクション操作の一部</p><ul><li><p><a href="/reference/restful/describe-collection-v2">コレクションの説明</a></p></li><li><p><a href="/reference/restful/get-collection-load-state-v2">コレクションのロード状態の取得</a></p></li><li><p><a href="/reference/restful/get-collection-stats-v2">コレクション統計の取得</a></p></li><li><p><a href="/reference/restful/has-collection-v2">コレクションの存在確認</a></p></li><li><p><a href="/reference/restful/list-collections-v2">コレクション一覧</a></p></li></ul></li><li><p>インデックス操作の一部</p><ul><li><p><a href="/reference/restful/describe-index-v2">インデックスの説明</a></p></li><li><p><a href="/reference/restful/list-indexes-v2">インデックス一覧</a></p></li></ul></li><li><p>パーティション操作の一部</p><ul><li><p><a href="/reference/restful/get-partition-statistics-v2">パーティション統計の取得</a></p></li><li><p><a href="/reference/restful/has-partition-v2">パーティションの存在確認</a></p></li><li><p><a href="/reference/restful/list-partitions-v2">パーティション一覧</a></p></li></ul></li><li><p>エイリアス操作の一部</p><ul><li><p><a href="/reference/restful/describe-alias-v2">エイリアスの説明</a></p></li><li><p><a href="/reference/restful/list-aliases-v2">エイリアス一覧</a></p></li></ul></li></ul></td>
       </tr>
    </table>

## カスタムクラスターロール\{#custom-cluster-roles}

カスタムロールは、事前定義されたアクセス権を提供する組み込みロールとは異なり、クラスターレベル、データベースレベル、コレクションレベルで特権を柔軟に付与することができます。

コレクションレベルのアクセス制御には、カスタムロールを作成することをお勧めします。

<Admonition type="info" icon="📘" title="Notes">

この機能は、Dedicated クラスターでのみ利用可能です。

現在、Zilliz Cloud では、ウェブコンソール上で組み込み特権グループを使用したカスタムロールの作成のみをサポートしています。特定の特権を持つカスタムロールやカスタム特権グループを作成する必要がある場合は、まず [サポートチケットを作成](http://support.zilliz.com) して、この機能を有効にしてください。機能が有効になったら、SDK を使用して [カスタム特権グループを作成](./cluster-privileges#custom-privilege-groups) できます。

</Admonition>

## カスタムクラスターロールの作成\{#create-a-custom-cluster-role}

<Procedures>

1. ターゲットクラスターの **ロール** タブに移動し、**+ クラスターロール** をクリックします。

    ![add-cluster-role](https://zdoc-images.s3.us-west-2.amazonaws.com/add-cluster-role.png "add-cluster-role")

1. ロール名を入力します。

1. コレクション、データベース、クラスターレベルで特権を設定します。組み込み特権グループを選択し、次にターゲットリソースを選択します。

    Zilliz Cloud は、合計9つの組み込み特権グループを提供しています。

    - コレクション特権グループ: Admin (`COLL_ADMIN`)、読み書き (`COLL_RW`)、読み取り専用 (`COLL_RO`)

    - データベース特権グループ: Admin (`DB_Admin`)、読み書き (`DB_RW`)、読み取り専用 (`DB_RO`)

    - クラスター特権グループ: Admin (`Cluster_Admin`)、読み書き (`Cluster_RW`)、読み取り専用 (`Cluster_RO`)

    <Admonition type="info" icon="📘" title="Notes">

    3つのレベルの組み込み特権グループには、カスケード関係はありません。インスタンスレベルで組み込み特権グループを設定しても、そのインスタンス配下のすべてのデータベースとコレクションに対して自動的に権限が設定されるわけではありません。データベースレベルとコレクションレベルの特権は手動で設定する必要があります。

    </Admonition>

    各組み込み特権グループの具体的な特権の詳細については、[特権と特権グループ](./cluster-privileges#built-in-privilege-groups) を参照してください。

    ![add-cluster-role-form](https://zdoc-images.s3.us-west-2.amazonaws.com/add-cluster-role-form.png "add-cluster-role-form")

1. **作成** をクリックします。各クラスターは最大500のカスタムクラスターロールを持つことができます。

</Procedures>

## ユーザーへのロールの付与\{#grant-a-role-to-a-user}

クラスターロールが作成されたら、それをユーザーに付与できます。ユーザータブに移動し、[新しいクラスターユーザーの作成](./cluster-users#create-a-cluster-user) 時、または [既存のクラスターユーザーのロールの編集](./cluster-users#edit-the-role-of-a-cluster-user) 時にロールを付与します。

![grant-role-to-user](https://zdoc-images.s3.us-west-2.amazonaws.com/grant-role-to-user.png "grant-role-to-user")

## ユーザーからのロールの剥奪\{#revoke-a-role-from-a-user}

クラスターロールがユーザーに適さなくなった場合は、ロールを剥奪できます。ユーザータブに移動し、対象のユーザーを見つけて [ロールの編集](./cluster-users#edit-the-role-of-a-cluster-user) をクリックします。ダイアログボックスで別のロールを選択します。

![revoke-role-from-user](https://zdoc-images.s3.us-west-2.amazonaws.com/revoke-role-from-user.png "revoke-role-from-user")

## カスタムクラスターロールの編集\{#edit-a-custom-cluster-role}

カスタムクラスターロールの特権を調整できます。調整は、このロールが付与されているすべてのユーザーに適用されます。

![edit-custom-role](https://zdoc-images.s3.us-west-2.amazonaws.com/edit-custom-role.png "edit-custom-role")

## カスタムクラスターロールの削除\{#delete-a-custom-cluster-role}

ロールが不要になった場合は、カスタムクラスターロールを削除できます。

ユーザーに付与されているロールは削除できません。まず、対象のロールが付与されているユーザーを特定し、それらのユーザーに別のロールを割り当てる必要があります。

![delete-cluster-role](https://zdoc-images.s3.us-west-2.amazonaws.com/delete-cluster-role.png "delete-cluster-role")

