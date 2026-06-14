---
title: "クラスターユーザーの管理（コンソール） | BYOC"
slug: /cluster-users
sidebar_key: cluster-users
sidebar_label: "クラスターユーザーの管理（コンソール）"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloudでは、クラスターユーザーを作成し、クラスターロールを割り当てて権限を定義し、データセキュリティを実現できます。 | BYOC"
type: origin
token: CWT2wh5YriZfPZkGlgCcWxVnnAf
sidebar_position: 2
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - アクセス制御
  - RBAC
  - ユーザー
  - 概要

---

import Admonition from '@theme/Admonition';


# クラスタユーザーの管理 (コンソール)

Zilliz Cloud では、クラスタユーザーを作成し、クラスタロールを割り当てて権限を定義することで、データセキュリティを実現できます。

クラスタ作成時に、`db_admin` というデフォルトユーザーが自動的に生成されます。このユーザーは削除できません。このデフォルトユーザーに加えて、きめ細かいアクセス制御のために追加のクラスタユーザーを作成できます。

クラスタユーザーを管理するには、**組織オーナー** または **プロジェクト管理者** であるか、**Cluster_Admin** 権限を持つロールが必要です。

## クラスタユーザーの作成\{#create-a-cluster-user}

クラスタユーザーを作成する際には、次の操作が必要です：

- ユーザーの名前を入力します。

- このユーザーに組み込みクラスタロールまたは[カスタムクラスタロール](./cluster-roles)を付与します。

- このクラスタユーザーのパスワードを設定します。このパスワードは[認証](./cluster-credentials)に使用されます。

![クラスタユーザーの追加](https://zdoc-images.s3.us-west-2.amazonaws.com/add-cluster-user.png "add-cluster-user")

<Admonition type="info" icon="📘" title="Notes">

各クラスタには最大500のクラスタユーザーを作成できます。

</Admonition>

## クラスタユーザーのロールの編集\{#edit-the-role-of-a-cluster-user}

![クラスタユーザーのロール編集](https://zdoc-images.s3.us-west-2.amazonaws.com/edit-cluster-user-role.png "edit-cluster-user-role")

## クラスタユーザーの削除\{#drop-a-cluster-user}

<Admonition type="info" icon="📘" title="Notes">

デフォルトユーザー **db_admin** は削除できません。

</Admonition>

![クラスタユーザーの削除](https://zdoc-images.s3.us-west-2.amazonaws.com/drop-cluster-user.png "drop-cluster-user")

