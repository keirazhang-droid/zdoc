---
title: "既存クラスターの階層型ストレージを有効にする | BYOC"
slug: /enable-tiered-storage-aws
sidebar_key: enable-tiered-storage-aws
sidebar_label: "既存クラスターの階層型ストレージを有効にする"
beta: CONTACT SALES
notebook: FALSE
description: "このガイドは、以前のバージョンのterraform例を使用してBYOC/BYOC-Iクラスターをすでにデプロイしており、現在階層型ストレージを有効にしたいユーザー向けです。 | BYOC"
type: origin
token: EgovwOjveikizfkIk2Accq72nRh
sidebar_position: 6
keywords: 
  - zilliz
  - byoc
  - aws
  - 階層型ストレージ
  - 階層型ストレージの有効化

---

import Admonition from '@theme/Admonition';


# 既存のクラスターで階層化ストレージを有効にする

このガイドは、以前のバージョンの [Terraform の例](https://github.com/zilliztech/terraform-zilliz-examples/tree/master/examples/aws-project-byoc-I) を使用して BYOC/BYOC-I クラスターをすでにデプロイしており、**階層化ストレージ** を有効にしたいユーザーを対象としています。

## 前提条件\{#prerequisites}

- Terraform プロバイダー `zillizcloud` バージョン `>= 0.6.34`

## ステップ 1：プロバイダーのアップグレード\{#step-1-upgrade-the-provider}

`versions.tf` または `required_providers` ブロック内のバージョン制約を更新します。Terraform の `~>` 制約はプレリリースバージョンには**一致しない**ことに注意してください。そのため、`-rc` ビルドをテストする場合は明示的に固定してください。

```plaintext
zillizcloud = {
  source  = "zilliztech/zillizcloud"
  version = ">= 0.6.34"
}
```

## ステップ2: `data.tf` を更新\{#step-2-update-datatf}

`locals {}` ブロック内で、既存の `k8s_node_groups` の割り当てを置き換えます。

```plaintext
# Remove this line:
k8s_node_groups = data.zillizcloud_byoc_i_project_settings.this.node_quotas
```

以下のマージロジックを使用して:

```plaintext
  # Tiered node quota from API (separate provider field, null when not enabled)
  tiered_node_quota = (
    data.zillizcloud_byoc_i_project_settings.this.tiered_node_quota != null
    ? { tiered = data.zillizcloud_byoc_i_project_settings.this.tiered_node_quota }
    : {}
  )

  k8s_node_groups = {
    for name, ng in merge(
      # Tiered placeholder (max_size=0 → count=0, not created unless API enables it)
      { tiered = { disk_size = 100, min_size = 0, max_size = 0, desired_size = 0, instance_types = "i4i.2xlarge", capacity_type = "ON_DEMAND" } },
      # API returns: core, index, search, fundamental
      data.zillizcloud_byoc_i_project_settings.this.node_quotas,
      # API tiered quota overwrites placeholder when present
      local.tiered_node_quota,
    ) : name => merge(ng, {
      ami_id    = lookup(var.k8s_node_group_image_id, name, null)
      disk_size = max(ng.disk_size, 100)
    })
  }

  # Placeholder has max_size=0, so this is false unless API returns tiered with max_size>0
  enable_tiered = local.k8s_node_groups["tiered"].max_size > 0
```

## ステップ3: EKSモジュールの更新\{#step-3-update-eks-module}

[terraform-zilliz-examples](https://github.com/zilliztech/terraform-zilliz-examples) の master ブランチから最新の `modules/aws_byoc_i/eks/` ディレクトリをコピーして、ローカルのコピーを置き換えます。これにより、階層化ノードグループリソース、`enable_tiered` 変数、および更新された検証ルールが追加されます。

## ステップ4: `enable_tiered` を EKS モジュールに渡す\{#step-4-pass-enabletiered-to-the-eks-module}

ルートの `main.tf` で、`module "eks"` ブロックに引数を追加します:

```plaintext
module "eks" {
  # ... existing arguments ...
  enable_tiered = local.enable_tiered
}
```

## Step 5: Zilliz Cloud コンソールで階層型ストレージを有効にする\{#step-5-enable-tiered-storage-in-zilliz-cloud-console}

1. [Zilliz Cloud コンソール](https://cloud.zilliz.com/) にログインします。

1. 右上隅で、正しい **BYOC 組織** を選択します。

![Tfgxb8cJRoahQxx8UYicQiPPnLf](https://zdoc-images.s3.us-west-2.amazonaws.com/tfgxb8cjroahqxx8uyicqippnlf.png "Tfgxb8cJRoahQxx8UYicQiPPnLf")

1. **プロジェクト** に移動し、階層型ストレージを有効にしたいプロジェクトを見つけます。

1. プロジェクトカードの右下隅にある **「...」** ボタンをクリックし、次に **プロジェクトの詳細を表示** をクリックします。

![Roidb6iXZo373pxGnCSc0C2MnLh](https://zdoc-images.s3.us-west-2.amazonaws.com/roidb6ixzo373pxgncsc0c2mnlh.png "Roidb6iXZo373pxGnCSc0C2MnLh")

1. **リソース設定** セクションで、**編集** をクリックします。

![DOsebYbZZo4fDAx8uIPcOSRknhc](https://zdoc-images.s3.us-west-2.amazonaws.com/dosebybzzo4fdax8uipcosrknhc.png "DOsebYbZZo4fDAx8uIPcOSRknhc")

1. ダイアログで、**Tiered** をチェックし、右下隅の **保存** をクリックします。

保存後、API はこのプロジェクトの `tiered_node_quota` を返します。

![JvbVbbZlKojF2Pxd7SncmK69nvg](https://zdoc-images.s3.us-west-2.amazonaws.com/jvbvbbzlkojf2pxd7sncmk69nvg.png "JvbVbbZlKojF2Pxd7SncmK69nvg")

## Step 6: 確認\{#step-6-verify}

```bash
terraform init -upgrade
terraform plan
```

期待されるプラン出力：

<table>
   <tr>
     <th><p><strong>シナリオ</strong></p></th>
     <th><p><strong>期待される結果</strong></p></th>
   </tr>
   <tr>
     <td><p>階層型ストレージ <strong>無効</strong></p></td>
     <td><p>新しいリソースはありません (enable_tiered = false, count = 0)</p></td>
   </tr>
   <tr>
     <td><p>階層型ストレージ <strong>有効</strong></p></td>
     <td><p>aws_eks_node_group.tiered[0] が作成されます (1 追加)</p></td>
   </tr>
</table>

既存のリソースは**破棄または再作成**アクションを示さないはずです。

