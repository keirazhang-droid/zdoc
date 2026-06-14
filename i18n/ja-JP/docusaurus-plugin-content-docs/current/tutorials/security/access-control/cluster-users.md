---
title: "クラスターユーザーの管理 (コンソール) | Cloud"
slug: /cluster-users
sidebar_key: cluster-users
sidebar_label: "クラスターユーザーの管理 (コンソール)"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloudでは、クラスターユーザーを作成し、クラスターロールを割り当てて権限を定義することで、データセキュリティを実現できます。 | Cloud"
type: origin
token: CWT2wh5YriZfPZkGlgCcWxVnnAf
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - アクセス制御
  - RBAC
  - ユーザー
  - 概要

---

import Admonition from '@theme/Admonition';


# クラスターユーザーの管理 (コンソール)

Zilliz Cloud では、クラスターユーザーを作成し、クラスターロールを割り当てて権限を定義することで、データセキュリティを実現できます。

クラスターが作成されると、`db_admin` という名前のデフォルトユーザーが自動的に生成されます。このユーザーは削除できません。このデフォルトユーザーに加えて、きめ細かなアクセス制御のために追加のクラスターユーザーを作成できます。

クラスターユーザーを管理するには、**組織オーナー** または **プロジェクト管理者** であるか、**Cluster_Admin** 権限を持つロールを持っている必要があります。

<Admonition type="info" icon="📘" title="Notes">

この機能は **Dedicated** クラスターでのみ利用可能です。

</Admonition>

## クラスターユーザーの作成\{#create-a-cluster-user}

クラスターユーザーを作成する際には、以下の操作が必要です：

- ユーザーの名前を入力します。

- このユーザーに組み込みのクラスターロールまたは[カスタムクラスターロール](./cluster-roles)を付与します。

- このクラスターユーザーのパスワードを設定します。このパスワードは[認証](./cluster-credentials)に使用されます。

![クラスターユーザーの追加](https://zdoc-images.s3.us-west-2.amazonaws.com/add-cluster-user.png "add-cluster-user")

<Admonition type="info" icon="📘" title="Notes">

各クラスターは最大500人のクラスターユーザーを持つことができます。

</Admonition>

## クラスターユーザーのロールの編集\{#edit-the-role-of-a-cluster-user}

![クラスターユーザーロールの編集](https://zdoc-images.s3.us-west-2.amazonaws.com/edit-cluster-user-role.png "edit-cluster-user-role")

## クラスターユーザーの削除\{#drop-a-cluster-user}

<Admonition type="info" icon="📘" title="Notes">

デフォルトユーザーの **db_admin** は削除できません。

</Admonition>

![クラスターユーザーの削除](https://zdoc-images.s3.us-west-2.amazonaws.com/drop-cluster-user.png "drop-cluster-user")

