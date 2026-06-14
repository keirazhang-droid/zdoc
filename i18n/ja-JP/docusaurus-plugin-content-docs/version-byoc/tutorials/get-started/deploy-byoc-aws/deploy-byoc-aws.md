---
title: "AWSでBYOCをデプロイ | BYOC"
slug: /deploy-byoc-aws
sidebar_key: deploy-byoc-aws
sidebar_label: "AWSでBYOCをデプロイ"
beta: CONTACT SALES
notebook: FALSE
description: "このページでは、Zilliz CloudコンソールとカスタムAWS設定を使用して、AWS Virtual Private Cloud (VPC) 内にフルマネージドのBring-Your-Own-Cloud (BYOC) データプレーンを手動で作成する方法について説明します。 | BYOC"
type: origin
token: DsqzwjegpiYSdtk1k75c1zXsnZc
sidebar_position: 3
keywords: 
  - zilliz
  - byoc
  - aws
  - milvus
  - ベクトルデータベース

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# AWS で BYOC をデプロイ

このページでは、Zilliz Cloud コンソールとカスタム AWS 設定を使用して、お客様の AWS Virtual プライベート Cloud (VPC) 内にフルマネージドの Bring-Your-Own-Cloud (BYOC) データプレーンを手動で作成する方法について説明します。

<Admonition type="info" icon="📘" title="Notes">

- Zilliz BYOC は現在 **一般提供** 中です。アクセスと実装の詳細については、[Zilliz Cloud セールス](https://zilliz.com/contact-sales) までお問い合わせください。

- このガイドでは、AWS コンソールで必要なリソースを段階的に作成する方法を示します。Terraform スクリプトを使用してインフラストラクチャをプロビジョニングする場合は、[Terraform プロバイダー](./terraform-provider) を参照してください。

</Admonition>

## 前提条件\{#prerequisites}

- BYOC 組織オーナーである必要があります。

## 手順\{#procedure}

AWS で BYOC をデプロイするには、Zilliz Cloud がお客様に代わって顧客管理 VPC 内の S3 バケットと EKS クラスターにアクセスするために、特定のロールを引き受ける必要があります。そのため、Zilliz Cloud は、お客様の S3 バケット、EKS クラスター、VPC、およびこれらのインフラストラクチャリソースにアクセスするために必要なロールに関する情報を収集する必要があります。

BYOC 組織内で、**プロジェクトの作成** ボタンをクリックしてデプロイを開始します。

### ステップ 1: プロジェクトを作成する\{#step-1-create-a-project}

このステップでは、プロジェクト名を設定し、クラウドプロバイダーとリージョン、および初期プロジェクトサイズを決定し、Zilliz Cloud がプロジェクトを作成してデータプレーンをデプロイする方法を選択する必要があります。

**Zilliz BYOC プロジェクト名** を設定し、**作成して次へ** をクリックします。プロジェクトはこのステップの最後に作成され、**データプレーンのデプロイ** ダイアログボックスにリダイレクトされます。

![FlZqw4JI6hcTNVbWCyJcBPdFnsb](https://zdoc-images.s3.us-west-2.amazonaws.com/FlZqw4JI6hcTNVbWCyJcBPdFnsb.png)

### ステップ 2: データプレーンをデプロイする\{#step-2-deploy-the-data-plane}

<Procedures>

1. **データプレーン名** と **クラウドリージョン** を設定し、**次へ** をクリックします。

    **キャンセル** をクリックすると、データプレーンのデプロイを停止できます。ただし、上記で作成したプロジェクトは引き続き利用可能です。プロジェクト内でいつでもデータプレーンのデプロイを開始でき、プロジェクトに複数のデータプレーンを追加できます。

    ![W1BNwopYAht6oxb9m9FccJXDnRc](https://zdoc-images.s3.us-west-2.amazonaws.com/W1BNwopYAht6oxb9m9FccJXDnRc.png)

1. **AWS プライベートLink** を有効にするかどうかを決定します。

    このオプションを有効にすると、現在のプロジェクト内のクラスターへのプライベート接続が可能になります。このオプションを有効にする場合は、プライベート接続用に VPC エンドポイントを作成する必要があります。詳細については、[クラスター接続の準備](./prepare-for-cluster-connection#private-endpoint-access) を参照してください。

    ![EfRbwxMhIhlIKfbCaTPcPZPlnJd](https://zdoc-images.s3.us-west-2.amazonaws.com/EfRbwxMhIhlIKfbCaTPcPZPlnJd.png)

1. **アーキテクチャ** で、アプリケーションに合ったアーキテクチャタイプを選択します。

    これにより、使用する Zilliz BYOC イメージのアーキテクチャタイプが決まります。選択肢は **X86** と **ARM** です。

1. **リソース設定** で、以下の操作を行う必要があります

    1. **オートスケーリング** を有効または無効にします。有効にすると、プロジェクトのワークロードに基づいて、Zilliz Cloud が定義された範囲内で EC2 インスタンスの数を自動的に調整し、リソースの効率的な使用を確保します。

    1. **初期プロジェクトサイズ** を設定します。

        BYOC プロジェクトでは、クエリノード、階層型クエリノード、インデックスサービス、Milvus コンポーネント、および依存関係は、異なるタイプの EC2 インスタンスを使用します。これらのサービスとコンポーネントのインスタンスタイプと数を個別に設定できます。

        **オートスケーリング** が無効になっている場合は、各プロジェクトコンポーネントに必要な EC2 インスタンスの数を、対応する **数** フィールドに指定するだけです。

        ![MliHb3dF5oJYGPxvhpfcLT1vnfd](https://zdoc-images.s3.us-west-2.amazonaws.com/mlihb3df5ojygpxvhpfclt1vnfd.png "MliHb3dF5oJYGPxvhpfcLT1vnfd")

        **オートスケーリング** を有効にすると、実際のプロジェクトワークロードに基づいて Zilliz Cloud が EC2 インスタンスの数を自動的にスケーリングできるように、対応する **最小** フィールドと **最大** フィールドを設定して範囲を指定する必要があります。

        ![QQ4Gb1IyiowJPQxCViGcMb8pnHb](https://zdoc-images.s3.us-west-2.amazonaws.com/qq4gb1iyiowjpqxcvigcmb8pnhb.png "QQ4Gb1IyiowJPQxCViGcMb8pnHb")

        リソース設定を容易にするために、4 つの定義済みプロジェクトサイズオプションがあります。次の表は、これらのプロジェクトサイズオプションと、プロジェクト内で作成できるクラスターの数、およびこれらのクラスターが含むことができるエンティティの数とのマッピングを示しています。

        <table>
           <tr>
             <th rowspan="2"><p>サイズ</p></th>
             <th rowspan="2"><p>最大クラスター数</p></th>
             <th colspan="3"><p>最大エンティティ数 (100万)</p></th>
           </tr>
           <tr>
             <td><p>パフォーマンス最適化済み CU</p></td>
             <td><p>容量最適化済み CU</p></td>
             <td><p>階層型ストレージ CU</p></td>
           </tr>
           <tr>
             <td><p>小</p></td>
             <td><p>8 ～ 16 CU の 3 クラスター</p></td>
             <td><p>2,000万 ～ 4,000万</p></td>
             <td><p>6,400万 ～ 1億2,800万</p></td>
             <td><p>3億2,000万 ～ 6億4,000万</p></td>
           </tr>
           <tr>
             <td><p>中</p></td>
             <td><p>16 ～ 64 CU の 7 クラスター</p></td>
             <td><p>4,000万 ～ 1億6,000万</p></td>
             <td><p>1億2,800万 ～ 5億1,200万</p></td>
             <td><p>6億4,000万 ～ 26億</p></td>
           </tr>
           <tr>
             <td><p>大</p></td>
             <td><p>64 ～ 192 CU の 12 クラスター</p></td>
             <td><p>1億6,000万 ～ 4億8,000万</p></td>
             <td><p>5億1,200万 ～ 15億</p></td>
             <td><p>26億 ～ 77億</p></td>
           </tr>
           <tr>
             <td><p>特大</p></td>
             <td><p>192 ～ 576 CU の 17 クラスター</p></td>
             <td><p>4億8,000万 ～ 14億4,000万</p></td>
             <td><p>15億 ～ 46億</p></td>
             <td><p>77億 ～ 230億</p></td>
           </tr>
        </table>

        **初期プロジェクトサイズ** で **カスタム** を選択し、すべてのデータプレーンコンポーネントの EC2 インスタンスタイプと数を調整して、設定をカスタマイズすることもできます。ご希望の EC2 インスタンスタイプが一覧にない場合は、[Zilliz サポートに連絡](https://zilliz.com/contact) してサポートを依頼してください。

    1. **階層型クエリノード** を有効にするかどうかを決定します。

        このオプションにより、階層型ストレージクラスターを作成できるかどうかが決まります。このオプションを選択すると、階層型クエリノードのインスタンスタイプと数を設定できます。

        ![LWMFbm73GoM8mFxjajCcaGqPnMO](https://zdoc-images.s3.us-west-2.amazonaws.com/lwmfbm73gom8mfxjajccagqpnmo.png "LWMFbm73GoM8mFxjajCcaGqPnMO")

        <Admonition type="info" icon="📘" title="Notes">

        - **プロジェクトサイズ** の選択は **階層型ストレージノード** の設定に影響しません。

        - **オートスケーリング** が無効になっている場合、**デフォルトクエリノード** の数と **階層型クエリノード** の数の合計は正の整数である必要があります。

        - **オートスケーリング** が有効になっている場合、**デフォルトクエリノード** と **階層型クエリノード** の両方の **最小** 値の合計は正の整数である必要があります。

        - BYOC で階層型ストレージが利用可能になる前に作成されたクラスターの場合、階層型ストレージを手動で有効にできます。詳細については、[既存クラスターの階層型ストレージを有効にする](./enable-tiered-storage-aws) を参照してください。

        </Admonition>

1. **デプロイ方法** で Zilliz Cloud がタスクを実行する方法を選択します。

    AWS 上の BYOC プロジェクトのインフラストラクチャをプロビジョニングするには、3 つのオプションがあります。次のいずれかを選択できます。

    - **AWS CloudFormation を使用してインフラストラクチャをプロビジョニングする。**

        AWS CloudFormation を使用してプロジェクトのデータプレーンインフラストラクチャをプロビジョニングする場合は、**デプロイ方法** セクションで **クイックスタート** タイルを選択します。これは、BYOC プロジェクトを開始するための推奨方法でもあります。

        AWS CloudFormation を使用する場合は、**次へ** をクリックします。次のダイアログボックスが表示され、新しい VPC または既存の VPC のどちらにプロジェクトをデプロイするかを選択できます。

        ![EWCsb9An2oM6dkxjCuOcM5hRnCe](https://zdoc-images.s3.us-west-2.amazonaws.com/ewcsb9an2om6dkxjcuocm5hrnce.png "EWCsb9An2oM6dkxjCuOcM5hRnCe")

        次に、**CloudFormation でスタックを作成** をクリックして、プロジェクトのデプロイを開始できます。

    - **Terraform スクリプトを使用してインフラストラクチャをプロビジョニングする。**

        Terraform スクリプトを使用してインフラストラクチャをプロビジョニングする場合は、スクリプトの出力をコピーして Zilliz Cloud に貼り付ける必要があります。詳細については、[Terraform プロバイダー](./terraform-provider) を参照してください。

        [認証情報設定](./deploy-byoc-aws#step-2-set-up-credentials) および [ネットワーク設定](./deploy-byoc-aws#step-3-configure-network-settings) で指定されているように、Terraform スクリプトから返された情報を Zilliz Cloud コンソールに入力する必要があることに注意してください。

    - **AWS コンソールを使用して必要なリソースとロールを作成する。**

        ストレージバケットや複数の IAM ロールなどの必要なリソースを AWS コンソールで作成する必要があります。次に、それらの名前と ID をコピーして Zilliz Cloud コンソールに貼り付けます。この方法でプロジェクトを作成する場合は、**デプロイ方法** セクションで **手動で** タイルを選択し、**次へ** をクリックします。

        Zilliz Cloud は、設定を容易にするために、プロセスを [認証情報設定](./deploy-byoc-aws#step-2-set-up-credentials) と [ネットワーク設定](./deploy-byoc-aws#step-3-configure-network-settings) に分割します。

1. **次へ** をクリックして認証情報を設定します。

</Procedures>

### ステップ 2: 認証情報を設定する\{#step-2-set-up-credentials}

**認証情報設定** では、ストレージと、ストレージアクセス、EKS クラスター管理、およびデータプレーンデプロイ用の複数の IAM ロールを設定する必要があります。

![LEGhbUbZwoPdwSx1PjxcHBjQnab](https://zdoc-images.s3.us-west-2.amazonaws.com/leghbubzwopdwsx1pjxchbjqnab.png "LEGhbUbZwoPdwSx1PjxcHBjQnab")

<Procedures>

1. **ストレージ設定** で、AWS から取得した **バケット名** と **IAM ロール ARN** を設定します。

    Zilliz Cloud は、指定されたバケットをデータプレーンストレージとして使用し、指定された IAM ロールを使用してお客様に代わってアクセスします。

    S3 バケットを作成する手順の詳細については、[S3 バケットと IAM ロールの作成](./create-bucket-and-role) を参照してください。

1. **EKS設定** で、EKS 管理用の **IAM ロール ARN** を設定します。

    Zilliz Cloud は、指定されたロールを使用して、お客様に代わって EKS クラスターをデプロイし、その EKS クラスター内にデータプレーンをデプロイします。

    EKS ロールを作成する手順の詳細については、[EKS IAM ロールの作成](./create-eks-role) を参照してください。

1. **クロスアカウント設定** で、データプレーンデプロイ用の **IAM ロール ARN** を設定します。

    ダイアログボックスに表示されている **外部 ID** をコピーする必要があります。Zilliz Cloud は、指定されたロールを使用して、Zilliz Cloud BYOC プロジェクトのデータプレーンをデプロイします。

    クロスアカウントロールを作成する手順の詳細については、[クロスアカウント IAM ロールの作成](./create-cross-account-role) を参照してください。

1. **次へ** をクリックしてネットワーク設定を構成します。

</Procedures>

### ステップ 3: ネットワーク設定を構成する\{#step-3-configure-network-settings}

**ネットワーク設定** で、VPC と、サブネット、セキュリティグループ、オプションの VPC エンドポイントなどの複数のタイプのリソースを VPC 内に作成します。

![NeKmbmKVhoNWcOx18IjcC1eLnDb](https://zdoc-images.s3.us-west-2.amazonaws.com/nekmbmkvhonwcox18ijcc1elndb.png "NeKmbmKVhoNWcOx18IjcC1eLnDb")

<Procedures>

1. **ネットワーク設定** で、**VPC ID**、**サブネット ID**、**セキュリティグループ ID**、およびオプションの **VPC エンドポイント ID** を設定します。

    指定された VPC 内で、Zilliz Cloud には次のものが必要です。

    - 1 つのパブリックサブネットと 3 つのプライベートサブネット。

    - セキュリティグループ。

    - オプションの VPC エンドポイント。

    **VPC エンドポイント ID** は、上記の **一般設定** で **AWS プライベートLink** をオンにした場合にのみ使用できることに注意してください。VPC とその関連リソースを作成する手順の詳細については、[顧客管理 VPC の構成](./configure-vpc) を参照してください。

1. **次へ** をクリックしてサマリーを表示します。

1. **デプロイ概要** で、設定内容を確認します。

1. 問題がなければ **作成** をクリックします。

</Procedures>

## デプロイ詳細の表示\{#view-deployment-details}

プロジェクトを作成したら、プロジェクトページでそのステータスを確認できます。

![Bw2Xb6wIKoXWAuxU4jOcDdAnn2e](https://zdoc-images.s3.us-west-2.amazonaws.com/bw2xb6wikoxwauxu4jocddann2e.png "Bw2Xb6wIKoXWAuxU4jOcDdAnn2e")

プロジェクトのデータプレーンをデプロイし、クラスターを作成したら、直接 VPC アクセスまたは AWS プライベートLink を介してこれらのクラスターに接続できます。詳細については、[BYOC クラスターへの接続](./prepare-for-cluster-connection) を参照してください。

## 一時停止と再開\{#suspend-and-resume}

プロジェクトを一時停止すると、データプレーンが停止し、プロジェクトをサポートする EKS クラスターに関連付けられたすべての EC2 インスタンスが終了します。この操作は、プロジェクト内の一時停止された Zilliz Cloud クラスターには影響しません。これらのクラスターは、データプレーンが復元されると再開できます。

![G2tIwZdrsh88VrbSWsEc6iHunWe](https://zdoc-images.s3.us-west-2.amazonaws.com/G2tIwZdrsh88VrbSWsEc6iHunWe.png)

実行中のプロジェクトを一時停止できるのは、そのプロジェクトにクラスターがないか、すべてのクラスターがすでに一時停止されている場合のみです。

プロジェクトカードのステータスタグが **一時停止** と表示されたら、プロジェクト内のクラスターを操作できなくなります。その場合は、**再開** をクリックしてプロジェクトを再開できます。ステータスタグが再び **実行中** に変わったら、プロジェクト内のクラスターの操作を続行できます。

## テクニカルサポートアクセス\{#technical-support-access}

トラブルシューティングとメンテナンス操作を支援するために、Zilliz Cloud はデフォルトでテクニカルサポートがプロジェクトのデータプレーンにアクセスできるようにします。

![TKIEwRBp0hpQL5btdvwccQGKngZ](https://zdoc-images.s3.us-west-2.amazonaws.com/TKIEwRBp0hpQL5btdvwccQGKngZ.png)

対象のプロジェクトのドロップダウンメニューから **テクニカルサポートアクセス** をクリックすると、現在の設定を表示できます。データガバナンスとセキュリティ要件を満たすために、このアクセスを無効にすることもできます。

## 手順\{#procedures}



import DocCardList from '@theme/DocCardList';

<DocCardList />