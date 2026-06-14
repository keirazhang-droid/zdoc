---
title: "AWSにBYOC-Iをデプロイ | BYOC"
slug: /deploy-byoc-i-aws
sidebar_key: deploy-byoc-i-aws
sidebar_label: "AWSにBYOC-Iをデプロイ"
beta: CONTACT SALES
notebook: FALSE
description: "このページでは、お客様のAWS Virtual Private Cloud (VPC)内でBYOCエージェントを使用してBring-Your-Own-Cloud (BYOC)データプレーンをデプロイする方法を説明します。 | BYOC"
type: origin
token: D1E4wLr5xiuHoFkJgblcHZ1FnLb
sidebar_position: 4
keywords: 
  - zilliz
  - byoc
  - byoc-i
  - aws
  - 権限
  - 最小権限
  - milvus
  - ベクトルデータベース

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# AWS での BYOC-I のデプロイ

このページでは、Bring-Your-Own-Cloud (BYOC) データプレーンを BYOC エージェントと共に AWS Virtual プライベート Cloud (VPC) にデプロイする方法について説明します。

<Admonition type="info" icon="📘" title="Notes">

- Zilliz BYOC は現在 **一般提供** 中です。アクセスと実装の詳細については、[Zilliz Cloud サポート](https://zilliz.com/contact-sales) にお問い合わせください。

- このガイドでは、AWS コンソールで必要なリソースを段階的に作成する方法を示します。Terraform スクリプトを使用してインフラストラクチャをプロビジョニングする場合は、[Terraform プロバイダー](./terraform-provider) を参照してください。

</Admonition>

## 前提条件\{#prerequisites}

以下を確認してください。

- あなたが BYOC-I 組織の所有者であること。

- [必要な権限](./deploy-byoc-i-aws#required-permissions) にリストされている権限が付与されていること。

## 手順\{#procedures}

### ステップ 1: デプロイ環境の準備\{#step-1-prepare-the-deployment-environment}

デプロイ環境とは、Terraform 構成ファイルを実行し、BYOC-I プロジェクトのデータプレーンをデプロイするように構成されたローカルマシン、仮想マシン (VM)、または CI/CD パイプラインです。このステップでは、次のことを行う必要があります。

- **AWS 認証情報 (AWS プロファイルまたはアクセスキー) を構成します。**

    AWS 認証情報の構成方法の詳細については、[このドキュメント](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) を参照してください。

- **最新の Terraform バイナリをインストールします。**

    Terraform のインストール方法の詳細については、[このドキュメント](https://developer.hashicorp.com/terraform/install?product_intent=terraform) を参照してください。

### ステップ 2: プロジェクトの作成\{#step-2-create-a-project}

BYOC-I 組織内で、**Create Project** ボタンをクリックしてデプロイを開始します。表示されたダイアログボックスで、**Zilliz BYOC プロジェクト名** を設定し、**Create and Next** をクリックします。

このステップの最後にプロジェクトが作成され、**Deploy データプレーン** ダイアログボックスにリダイレクトされます。

![BYiTwvFLRhOJvRbMWNSc7zitnPu](https://zdoc-images.s3.us-west-2.amazonaws.com/BYiTwvFLRhOJvRbMWNSc7zitnPu.png)

### ステップ 3: データプレーンのデプロイ\{#step-3-deploy-the-data-plane}

<Procedures>

1. **データプレーン Name** と **クラウドリージョン** を設定し、**Next** をクリックします。

    **Cancel** をクリックすると、データプレーンのデプロイが停止します。ただし、上記で作成したプロジェクトは引き続き使用できます。プロジェクト内でいつでもデータプレーンのデプロイを開始でき、1 つのプロジェクトに複数のデータプレーンを追加できます。

    ![Lxi8wtMwmhRETHbRDqucLMx1nvb](https://zdoc-images.s3.us-west-2.amazonaws.com/Lxi8wtMwmhRETHbRDqucLMx1nvb.png)

1. **AWS プライベートLink** を有効にするかどうかを決定します。

    このオプションを有効にすると、現在のプロジェクト内のクラスターへのプライベート接続が可能になります。このオプションを有効にする場合は、プライベート接続用に VPC エンドポイントを作成する必要があります。

    ![WIjGwV6bvhzqk1ba4YecWQGonTh](https://zdoc-images.s3.us-west-2.amazonaws.com/WIjGwV6bvhzqk1ba4YecWQGonTh.png)

1. **Architecture** で、アプリケーションに合ったアーキテクチャタイプを選択します。

    これにより、使用する Zilliz BYOC イメージのアーキテクチャタイプが決まります。利用可能なオプションは **X86** と **ARM** です。

1. **リソース設定** で、以下のことを行う必要があります。

    1. **オートスケーリング** を有効または無効にして、Zilliz Cloud がプロジェクトのワークロードに基づいて定義された範囲内で EC2 インスタンスの数を自動的に調整し、リソースの効率的な使用を確保できるようにします。

    1. **初期プロジェクトサイズ** を構成します。

        BYOC プロジェクトでは、クエリノード、インデックスサービス、Milvus コンポーネント、および依存関係に異なるタイプの EC2 インスタンスが使用されます。これらのサービスとコンポーネントのインスタンスタイプと数を個別に設定できます。

        **オートスケーリング** が無効になっている場合は、対応する **Count** フィールドに各プロジェクトコンポーネントに必要な EC2 インスタンスの数を指定するだけです。

        ![CxLubcykMohdUbxSlfVcj7ecn8d](https://zdoc-images.s3.us-west-2.amazonaws.com/cxlubcykmohdubxslfvcj7ecn8d.png "CxLubcykMohdUbxSlfVcj7ecn8d")

        **オートスケーリング** を有効にすると、実際のプロジェクトワークロードに基づいて Zilliz Cloud が EC2 インスタンスの数を自動的にスケーリングするための範囲を、対応する **Min** フィールドと **Max** フィールドに設定する必要があります。

        ![FYu6bpIW9oURxuxkZlbc9ETzn3d](https://zdoc-images.s3.us-west-2.amazonaws.com/fyu6bpiw9ourxuxkzlbc9etzn3d.png "FYu6bpIW9oURxuxkZlbc9ETzn3d")

        リソース設定を容易にするために、4 つの定義済みプロジェクトサイズオプションがあります。次の表は、これらのプロジェクトサイズオプションと、プロジェクト内に作成できるクラスターの数、およびこれらのクラスターに含めることができるエンティティの数とのマッピングを示しています。

        <table>
           <tr>
             <th rowspan="2"><p>サイズ</p></th>
             <th rowspan="2"><p>最大クラスター数</p></th>
             <th colspan="3"><p>最大エンティティ数 (百万)</p></th>
           </tr>
           <tr>
             <td><p>パフォーマンス最適化済み CU</p></td>
             <td><p>容量最適化済み CU</p></td>
             <td><p>Tiered-storage CU</p></td>
           </tr>
           <tr>
             <td><p>小</p></td>
             <td><p>8 ～ 16 CU の 3 クラスター</p></td>
             <td><p>2,000万～4,000万</p></td>
             <td><p>6,400万～1億2,800万</p></td>
             <td><p>3億2,000万～6億4,000万</p></td>
           </tr>
           <tr>
             <td><p>中</p></td>
             <td><p>16 ～ 64 CU の 7 クラスター</p></td>
             <td><p>4,000万～1億6,000万</p></td>
             <td><p>1億2,800万～5億1,200万</p></td>
             <td><p>6億4,000万～26億</p></td>
           </tr>
           <tr>
             <td><p>大</p></td>
             <td><p>64 ～ 192 CU の 12 クラスター</p></td>
             <td><p>1億6,000万～4億8,000万</p></td>
             <td><p>5億1,200万～15億</p></td>
             <td><p>26億～77億</p></td>
           </tr>
           <tr>
             <td><p>特大</p></td>
             <td><p>192 ～ 576 CU の 17 クラスター</p></td>
             <td><p>4億8,000万～14億4,000万</p></td>
             <td><p>15億～46億</p></td>
             <td><p>77億～230億</p></td>
           </tr>
        </table>

        **初期プロジェクトサイズ** で **カスタム** を選択し、すべてのデータプレーンコンポーネントの EC2 インスタンスタイプと数を調整して、設定をカスタマイズすることもできます。希望する EC2 インスタンスタイプがリストにない場合は、[Zilliz サポートにお問い合わせ](https://zilliz.com/contact) ください。

    1. **Tiered Query Node** を有効にするかどうかを決定します。

        このオプションは、Tiered-storage クラスターを作成できるかどうかを決定します。このオプションを選択すると、Tiered query node のインスタンスタイプと数を設定できます。

        ![FKDsbxbUuoEqMJxniZGcSZMQnb3](https://zdoc-images.s3.us-west-2.amazonaws.com/fkdsbxbuuoeqmjxnizgcszmqnb3.png "FKDsbxbUuoEqMJxniZGcSZMQnb3")

        <Admonition type="info" icon="📘" title="Notes">

        - **プロジェクトサイズ** の選択は、**Tiered Storage Node** の設定には影響しません。

        - **オートスケーリング** が無効になっている場合、**Default Query Node** の数と **Tiered Query Node** の数の合計は正の整数にする必要があります。

        - **オートスケーリング** が有効になっている場合、**Default Query Node** と **Tiered Query Node** の両方の **Min** 値の合計は正の整数にする必要があります。

        - BYOC で Tiered Storage が利用可能になる前に作成されたクラスターの場合は、手動で Tiered Storage を有効にできます。詳細については、[既存のクラスターで Tiered Storage を有効にする](./enable-tiered-storage-aws) を参照してください。

        </Admonition>

1. **Next** をクリックします。

</Procedures>

### ステップ 4: データプレーンのデプロイ\{#step-4-deploy-the-data-plane}

ダイアログに表示される手順に従って、現在作成したプロジェクトのデータプレーンをデプロイします。

![GHGqbw4UroKPu7xoEWmcDQaDnEd](https://zdoc-images.s3.us-west-2.amazonaws.com/ghgqbw4urokpu7xoewmcdqadned.png "GHGqbw4UroKPu7xoEWmcDQaDnEd")

上記の Terraform スクリプトの実行の詳細については、[Zilliz Cloud BYOC-I プロジェクトセットアップガイド](https://registry.terraform.io/providers/zilliztech/zillizcloud/latest/docs/guides/create-a-byoc-i-project) を参照してください。

プロジェクトのデータプレーンをデプロイし、クラスターを作成したら、直接 VPC アクセスまたは AWS プライベートLink を介してこれらのクラスターに接続できます。詳細については、[BYOC クラスターへの接続](./prepare-for-cluster-connection) を参照してください。

## データプレーンの管理\{#manage-dataplanes}

![RJwFwpytnhWVcabKr6tcNsnfnrb](https://zdoc-images.s3.us-west-2.amazonaws.com/RJwFwpytnhWVcabKr6tcNsnfnrb.png)

### デプロイ解除 タグが付いたデータプレーン\{#data-planes-with-an-undeploy-tag}

プロジェクトカードの右隅にあるステータスタグが **デプロイ解除** と表示されている場合は、いつでもプロジェクトカードの **Deploy データプレーン** ボタンをクリックして再度開くことができます。プロジェクトの名前を変更または削除するには、プロジェクトカードの **...** ボタンをクリックし、ドロップダウンメニューから **Rename** または **Delete** を選択します。

### デプロイ中 タグが付いたデータプレーン\{#data-planes-with-a-deploying-tag}

デプロイ環境を準備し、表示されたコマンドを実行したら、BYOC エージェントがアクティブになるまで待つ必要があります。プロジェクトカードのステータスタグが **デプロイ中** と表示され、進行状況のパーセンテージが表示されている間は、データプレーンが配置されるまでプロジェクトの名前を変更したり削除したりすることはできません。

### Running タグが付いたデータプレーン\{#data-planes-with-a-running-tag}

プロジェクトカードのステータスタグが **Running** と表示されたら、プロジェクト内でクラスターの作成を開始できます。実行中のプロジェクトの名前を変更または削除するには、プロジェクト内にクラスターがないことを確認してください。

## テクニカルサポートアクセス\{#technical-support-access}

トラブルシューティングとメンテナンス操作を支援するために、Zilliz Cloud はデフォルトでテクニカルサポートがプロジェクトのデータプレーンにアクセスできるようにします。

![XThkbwy5hoho7Ixpgg5ctUp1nRe](https://zdoc-images.s3.us-west-2.amazonaws.com/xthkbwy5hoho7ixpgg5ctup1nre.png "XThkbwy5hoho7Ixpgg5ctUp1nRe")

対象のプロジェクトのドロップダウンメニューから **テクニカルサポートアクセス** をクリックすると、現在の設定を表示できます。

![Z4L2bIrA0onlxPxFNUNcYv78nIe](https://zdoc-images.s3.us-west-2.amazonaws.com/z4l2bira0onlxpxfnuncyv78nie.png "Z4L2bIrA0onlxPxFNUNcYv78nIe")

データガバナンスとセキュリティ要件を満たすために無効にすることができます。

## 必要な権限\{#required-permissions}

このセクションでは、AWS で BYOC-I をデプロイするために必要なすべての主要な権限を確認できます。

### VPC およびネットワークリソースの権限\{#vpc-and-networking-resource-permissions}

- **VPC 管理**: VPC の作成、変更、説明、削除

- **サブネット操作**: サブネットの作成と削除

- **セキュリティグループ**: セキュリティグループとそのルールの作成、変更、削除

- **ルートテーブル**: ルートテーブルの作成、関連付け、管理

- **インターネットゲートウェイ**: インターネットゲートウェイの作成、アタッチ、デタッチ

- **NAT ゲートウェイ**: Elastic IP を使用した NAT ゲートウェイの作成と削除

- **VPC エンドポイント**: AWS サービス用の VPC エンドポイントの作成と削除

- **起動テンプレート**: EC2 起動テンプレートの作成と削除

- **Route53**: VPC とホストゾーンの関連付け

- **タグ付け**: VPC リソースのタグの作成と削除

### IAM ロールと BYOC-I デプロイの権限\{#iam-roles-and-byoc-i-deployment-permissions}

- **ロール管理**: IAM ロールの作成、取得、一覧表示、ポリシーのアタッチ/デタッチ、削除

- **ポリシー管理**: IAM ポリシーの作成、取得、バージョンの一覧表示、削除

- **タグ付け**: ロールとポリシーのタグ付けとタグ解除

- **ID 検証**: 呼び出し元 ID の取得 (STS)

### S3 バケットの権限\{#s3-bucket-permissions}

- **バケット操作**: S3 バケットの作成、一覧表示、設定の取得、削除

- **バケット設定**: バケットのタグ付け、ポリシー、ACL、CORS、バージョニング、暗号化、パブリックアクセス設定の管理

- **オブジェクトタグ付け**: オブジェクトタグの設定、取得、削除

- **バケットリスト**: アカウント内のすべてのバケットの一覧表示

### EKS クラスターおよび関連リソースの権限\{#eks-cluster-and-related-resource-permissions}

- **サービスにリンクされたロール**: クラスターおよびノードグループ管理のための EKS サービスリンクロールの作成

- **OIDC プロバイダー**: OpenID Connect プロバイダーの作成、タグ付け、取得、削除 (`Vendor=zilliz-byoc` タグ要件あり)

- **IAM ロール管理**: EKS ロールの読み取り、EKS サービスへのロールの引き渡し

- **EC2 リソース**: 起動テンプレートの作成、インスタンスの実行、タグの管理 (`Vendor=zilliz-byoc` タグ要件あり)

- **EKS クラスター操作**: EKS クラスターの作成、更新、説明、タグ付け、削除

- **ノードグループ操作**: EKS ノードグループの作成、更新、説明、削除

- **アドオン管理**: EKS アドオンの作成、更新、説明、削除

- **アクセスエントリ管理**: EKS アクセスエントリとポッド ID 関連付けの作成、更新、説明、削除

