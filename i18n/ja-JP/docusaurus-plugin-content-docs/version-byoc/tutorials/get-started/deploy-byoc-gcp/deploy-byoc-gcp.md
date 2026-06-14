---
title: "GCPにBYOCをデプロイ | BYOC"
slug: /deploy-byoc-gcp
sidebar_key: deploy-byoc-gcp
sidebar_label: "GCPにBYOCをデプロイ"
beta: CONTACT SALES
notebook: FALSE
description: "このページでは、Zilliz CloudコンソールとカスタムGCP設定を使用して、お使いのGoogle Cloud Platform (GCP) Virtual Private Cloud (VPC)内に完全管理型のBring-Your-Own-Cloud (BYOC) データプレーンを手動で作成する方法について説明します。 | BYOC"
type: origin
token: KmYgwHNOFiPQ9sk4bSDcMuIHnjC
sidebar_position: 6
keywords: 
  - zilliz
  - byoc
  - byoc-i
  - gcp
  - 権限
  - 最小権限
  - milvus
  - ベクトルデータベース

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# GCP上でのBYOCのデプロイ

このページでは、Zilliz CloudコンソールとカスタムGCP設定を使用して、Google Cloud Platform（GCP）のVirtual プライベート Cloud（VPC）内に完全マネージドのBring-Your-Own-Cloud（BYOC）データプレーンを手動で作成する方法について説明します。

<Admonition type="info" icon="📘" title="Notes">

- Zilliz BYOCは現在、**一般提供** されています。アクセスと実装の詳細については、[Zilliz Cloud 営業](https://zilliz.com/contact-sales) にお問い合わせください。

- このガイドでは、GCPコンソールで必要なリソースを段階的に作成する方法を示します。Terraformスクリプトを使用してインフラストラクチャをプロビジョニングする場合は、[Terraform Provider](./terraform-provider) を参照してください。

</Admonition>

## 前提条件\{#prerequisites}

- BYOC組織のオーナーである必要があります。

- [必要なGCP APIサービス](./required-api-services-gcp) を有効にしている必要があります。

## 手順\{#procedure}

GCP上にBYOCをデプロイするために、Zilliz Cloudは、お客様の代わりにCloud StorageバケットとGKEクラスターにアクセスするための特定のロールを引き受ける必要があります。そのため、Zilliz Cloudは、Cloud Storageバケット、GKEクラスター、VPC、およびこれらのインフラストラクチャリソースへのアクセスに必要なロールに関する情報を収集する必要があります。

BYOC組織内で、「プロジェクトの作成」ボタンをクリックしてデプロイを開始します。

![LyCiw8o03hUOnebv2CJc0vianpf](https://zdoc-images.s3.us-west-2.amazonaws.com/LyCiw8o03hUOnebv2CJc0vianpf.png)

### ステップ1: データプレーンのデプロイ\{#step-1-deploy-the-data-plane}

このステップでは、Zilliz BYOCプロジェクト名を設定し、クラウドプロバイダーとリージョン、およびデプロイの初期プロジェクトサイズを決定する必要があります。

<Procedures>

1. **データプレーン名** と **クラウドリージョン** を設定し、**次へ** をクリックします。

    **キャンセル** をクリックすると、データプレーンのデプロイを停止できます。ただし、上記で作成したプロジェクトは引き続き利用可能です。プロジェクト内でいつでもデータプレーンのデプロイを開始でき、1つのプロジェクトに複数のデータプレーンを追加できます。

    ![SVVZwpbNphBfYGb5IgmckSkan6b](https://zdoc-images.s3.us-west-2.amazonaws.com/SVVZwpbNphBfYGb5IgmckSkan6b.png)

1. **GCP プライベート Service Connect** を有効にするかどうかを決定します。

    このオプションを有効にすると、現在のプロジェクト内のクラスターへのプライベート接続が可能になります。このオプションを有効にする場合は、プライベート接続用に プライベート Service Connect エンドポイントを作成する必要があります。詳細については、[クラスター接続の準備](./prepare-for-cluster-connection#private-endpoint-access) を参照してください。

1. **アーキテクチャ** で、アプリケーションに適したアーキテクチャタイプを選択します。

    これにより、使用するZilliz BYOCイメージのアーキテクチャタイプが決まります。利用可能なオプションは **X86** と **ARM** です。

1. **リソース設定** で、以下を行う必要があります。

    1. **オートスケーリング** を有効または無効にして、Zilliz Cloudがプロジェクトのワークロードに基づいて定義された範囲内でGCEインスタンスの数を自動的に調整し、リソースを効率的に使用できるようにします。

    1. **初期プロジェクトサイズ** を構成します。

        BYOCプロジェクトでは、クエリノード、インデックスサービス、Milvusコンポーネント、および依存関係に異なるGoogle Compute Engine（GCE）インスタンスが使用されます。これらのサービスとコンポーネントのインスタンスタイプを設定できます。

        **オートスケーリング** が無効になっている場合は、各プロジェクトコンポーネントに必要なGCEインスタンスの数を、対応する **カウント** フィールドに指定するだけです。

        ![Tl4Zbuwi5oT1KdxKVaIcnf05nEr](https://zdoc-images.s3.us-west-2.amazonaws.com/tl4zbuwi5ot1kdxkvaicnf05ner.png "Tl4Zbuwi5oT1KdxKVaIcnf05nEr")

        一旦 **オートスケーリング** を有効にすると、対応する **最小** フィールドと **最大** フィールドを設定して、実際のプロジェクトワークロードに基づいてZilliz CloudがGCEインスタンスの数を自動的にスケーリングする範囲を指定する必要があります。

        ![Gq0GbQWJxoJf85xg6KJcppLDnZS](https://zdoc-images.s3.us-west-2.amazonaws.com/gq0gbqwjxojf85xg6kjcppldnzs.png "Gq0GbQWJxoJf85xg6KJcppLDnZS")

        リソース設定を容易にするために、4つの定義済みプロジェクトサイズオプションがあります。次の表は、これらのプロジェクトサイズオプションと、プロジェクト内で作成できるクラスターの数、およびこれらのクラスターに含めることができるエンティティの数とのマッピングを示しています。

        <table>
           <tr>
             <th rowspan="2"><p>サイズ</p></th>
             <th rowspan="2"><p>最大クラスター数</p></th>
             <th colspan="3"><p>最大エンティティ数 (百万)</p></th>
           </tr>
           <tr>
             <td><p>パフォーマンス最適化済み CU</p></td>
             <td><p>容量最適化済み CU</p></td>
             <td><p>階層型ストレージ CU</p></td>
           </tr>
           <tr>
             <td><p>小</p></td>
             <td><p>8～16 CUのクラスター 3つ</p></td>
             <td><p>2000万～4000万</p></td>
             <td><p>6400万～1億2800万</p></td>
             <td><p>3億2000万～6億4000万</p></td>
           </tr>
           <tr>
             <td><p>中</p></td>
             <td><p>16～64 CUのクラスター 7つ</p></td>
             <td><p>4000万～1億6000万</p></td>
             <td><p>1億2800万～5億1200万</p></td>
             <td><p>6億4000万～26億</p></td>
           </tr>
           <tr>
             <td><p>大</p></td>
             <td><p>64～192 CUのクラスター 12つ</p></td>
             <td><p>1億6000万～4億8000万</p></td>
             <td><p>5億1200万～15億</p></td>
             <td><p>26億～77億</p></td>
           </tr>
           <tr>
             <td><p>特大</p></td>
             <td><p>192～576 CUのクラスター 17つ</p></td>
             <td><p>4億8000万～14億4000万</p></td>
             <td><p>15億～46億</p></td>
             <td><p>77億～230億</p></td>
           </tr>
        </table>

        **初期プロジェクトサイズ** で **カスタム** を選択し、すべてのデータプレーンコンポーネントのGCEインスタンスタイプと数を調整して設定をカスタマイズすることもできます。希望するGCEインスタンスタイプがリストにない場合は、[Zillizサポートにお問い合わせ](https://zilliz.com/contact) ください。

    1. **階層型クエリノード** を有効にするかどうかを決定します。

        このオプションは、階層型ストレージクラスターを作成できるかどうかを決定します。このオプションを選択すると、階層型クエリノードのインスタンスタイプと数を設定できます。

        ![CFISbr4gloeeYoxStjuc7VuanM5](https://zdoc-images.s3.us-west-2.amazonaws.com/cfisbr4gloeeyoxstjuc7vuanm5.png "CFISbr4gloeeYoxStjuc7VuanM5")

        <Admonition type="info" icon="📘" title="Notes">

        - **プロジェクトサイズ** の選択は **階層型ストレージノード** の設定に影響しません。

        - **オートスケーリング** が無効の場合、**デフォルトクエリノード** 数と **階層型クエリノード** 数の合計は正の整数にする必要があります。

        - **オートスケーリング** が有効の場合、**デフォルトクエリノード** と **階層型クエリノード** の両方の **Min** 値の合計は正の整数にする必要があります。

        </Admonition>

1. **次へ** をクリックして認証情報を設定します。

</Procedures>

### ステップ2: 認証情報の設定\{#step-2-set-up-credentials}

**認証情報設定** では、ストレージアクセス、GKEクラスター管理、およびデータプレーンのデプロイのために、ストレージと複数のサービスアカウントを設定する必要があります。

![BbOOboWZAo5eu2xplJWcXyLonph](https://zdoc-images.s3.us-west-2.amazonaws.com/bboobowzao5eu2xpljwcxylonph.png "BbOOboWZAo5eu2xplJWcXyLonph")

<Procedures>

1. **Google Cloud Platform プロジェクトID** に、GCPプロジェクトのIDを入力します。

1. **ストレージ設定** で、GCPから取得した **バケット名** と **サービスアカウントメール** を設定します。

    Zilliz Cloudは、指定されたバケットをデータプレーンストレージとして使用し、指定されたサービスアカウントを使用してお客様の代わりにアクセスします。

    バケットの設定とサービスアカウントの作成の詳細については、[Cloud Storage バケットとサービスアカウントの作成](./create-bucket-and-service-account) を参照してください。

1. **GKE設定** で、GKE管理用の **GKEクラスター名** と **サービスアカウントメール** を設定します。

    Zilliz Cloudは、指定されたサービスアカウントを使用して、指定された名前のGKEクラスターをお客様の代わりにデプロイし、そのGKEクラスター内にデータプレーンをデプロイします。

    サービスアカウントの作成の詳細については、[GKEサービスアカウントの作成](./create-gke-service-account) を参照してください。

1. **クロスアカウント設定** で、データプレーンデプロイ用の **サービスアカウント名** を設定します。

    サービスアカウントの準備ができたら、読み取り専用のテキストボックスに記載されているZilliz BYOCプリンシパルをコピーし、GCPコンソールに貼り付けて、Zilliz Cloud BYOCプロジェクトのデータプレーンをデプロイするために必要な権限をZilliz BYOCに付与します。

    クロスアカウントサービスアカウントの作成の詳細については、[クロスアカウントサービスアカウントの作成](./create-cross-account-sa) を参照してください。

1. **次へ** をクリックしてネットワーク設定を構成します。

</Procedures>

### ステップ3: ネットワーク設定の構成\{#step-3-configure-network-settings}

**ネットワーク設定** では、VPCと、サブネット名やオプションのプライベート Service Connectエンドポイントなど、VPC内の複数のタイプのリソースを作成します。

![YVPNbLCjOoCkDTx9TEMcbV9LnPd](https://zdoc-images.s3.us-west-2.amazonaws.com/yvpnblcjoockdtx9temcbv9lnpd.png "YVPNbLCjOoCkDTx9TEMcbV9LnPd")

<Procedures>

1. **ネットワーク設定** で、**VPC名**、**サブネット名**、およびオプションの **プライベート Service Connect エンドポイント** を設定します。

    指定されたVPC内で、Zilliz Cloudは以下を必要とします。

    - 2つのセカンダリサブネットを持つプライマリサブネット、
    - ロードバランサーサブネット、および
    - オプションのプライベート Service Connectエンドポイント。

    **プライベート Service Connect エンドポイント** は、上記の **一般設定** で **GCP プライベート Service Connect** をオンにした場合にのみ使用できることに注意してください。

1. **次へ** をクリックしてサマリーを表示します。

1. **デプロイ概要** で、構成設定を確認します。

1. すべてが期待通りであれば **作成** をクリックします。

</Procedures>

## デプロイの詳細を表示する\{#view-deployment-details}

プロジェクトを作成した後、プロジェクトページでそのステータスを確認できます。

![BE13bnOpGo9ZAVxTx3acX2J8nEe](https://zdoc-images.s3.us-west-2.amazonaws.com/be13bnopgo9zavxtx3acx2j8nee.png "BE13bnOpGo9ZAVxTx3acX2J8nEe")

プロジェクトのデータプレーンをデプロイし、クラスターを作成したら、直接VPCアクセスまたはGCP プライベート Service Connectを介してこれらのクラスターに接続できます。詳細については、[BYOCクラスターへの接続](./prepare-for-cluster-connection) を参照してください。

## 一時停止と再開\{#suspend-and-resume}

プロジェクトを一時停止すると、データプレーンが停止し、そのプロジェクトをサポートするGKEクラスターに関連付けられたすべてのGCEインスタンスが終了します。このアクションは、プロジェクト内の一時停止されたZilliz Cloudクラスターには影響を与えず、データプレーンが復元されると再開できます。

![Lq7AwLshAh64ZObMKeFcIXBwn5g](https://zdoc-images.s3.us-west-2.amazonaws.com/Lq7AwLshAh64ZObMKeFcIXBwn5g.png)

実行中のプロジェクトは、プロジェクト内にクラスターがない場合、またはすべてのクラスターがすでに一時停止されている場合にのみ一時停止できます。

![SVLQbgURIoRqHBx2tWwc5caWnx7](https://zdoc-images.s3.us-west-2.amazonaws.com/svlqbguriorqhbx2twwc5cawnx7.png "SVLQbgURIoRqHBx2tWwc5caWnx7")

プロジェクトカードのステータスタグが「一時停止済み」と表示された場合、そのプロジェクト内のクラスターを操作することはできません。その場合は、「再開」をクリックしてプロジェクトを再開できます。ステータスタグが再び「実行中」に変わると、プロジェクト内のクラスターの操作を続行できます。

## テクニカルサポートアクセス\{#technical-support-access}

トラブルシューティングとメンテナンス操作を支援するために、Zilliz Cloudはデフォルトでテクニカルサポートがプロジェクトのデータプレーンにアクセスできるようにします。

![OHNUwYrFHhEUeIbgOW9coc5hngb](https://zdoc-images.s3.us-west-2.amazonaws.com/OHNUwYrFHhEUeIbgOW9coc5hngb.png)

対象プロジェクトのドロップダウンメニューから「テクニカルサポートアクセス」をクリックすると、現在の設定を表示できます。

データガバナンスとセキュリティ要件を満たすために、これを無効にすることができます。

## 手順\{#procedures}



import DocCardList from '@theme/DocCardList';

<DocCardList />