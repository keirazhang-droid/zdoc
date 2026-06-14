---
title: "Microsoft Azure で BYOC-I をデプロイ | BYOC"
slug: /deploy-byoc-i-azure
sidebar_key: deploy-byoc-i-azure
sidebar_label: "Microsoft Azure で BYOC-I をデプロイ"
beta: CONTACT SALES
notebook: FALSE
description: "このページでは、Microsoft Azure Virtual Network 内に Bring-Your-Own-Cloud (BYOC) データプレーンを BYOC エージェントと共にデプロイする方法について説明します。 | BYOC"
type: origin
token: QuBiwrIJdiDw3ckVDKBcPofinfe
sidebar_position: 5
keywords: 
  - zilliz
  - byoc
  - byoc-i
  - Microsoft Azure
  - 権限
  - 最小権限
  - milvus
  - ベクトルデータベース

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Microsoft Azure への BYOC-I のデプロイ

このページでは、Bring-Your-Own-Cloud (BYOC) データプレーンを BYOC エージェントと共に Microsoft Azure 仮想ネットワークにデプロイする方法について説明します。

<Admonition type="info" icon="📘" title="Notes">

- Zilliz BYOC は現在 **一般提供** 中です。アクセスや実装の詳細については、[Zilliz Cloud サポート](https://zilliz.com/contact-sales) までお問い合わせください。

- このガイドでは、Microsoft Azure コンソール上で必要なリソースを段階的に作成する方法を説明します。インフラストラクチャをプロビジョニングするために Terraform スクリプトを使用する場合は、[Terraform プロバイダー](./terraform-provider) を参照してください。

</Admonition>

## 前提条件\{#prerequisites}

次のことを確認してください。

- BYOC-I 組織の所有者であること。

- [必要な権限](./deploy-byoc-i-aws#required-permissions) に記載されている権限が付与されていること。

## 手順\{#procedures}

### ステップ 1: デプロイ環境の準備\{#step-1-prepare-the-deployment-environment}

デプロイ環境とは、Terraform 設定ファイルを実行し、BYOC-I プロジェクトのデータプレーンをデプロイするように構成されたローカルマシン、仮想マシン (VM)、または CI/CD パイプラインです。このステップでは、次のことを行う必要があります。

- **Microsoft Azure 認証情報の構成**

    Microsoft Azure 認証情報には、サブスクリプション ID とリソースグループ名が含まれます。

    **Azure Portal (UI)**

    - **サブスクリプション ID:**

        ![UCcVbQX7boMNMLxoiK8ccyM9ngd](https://zdoc-images.s3.us-west-2.amazonaws.com/uccvbqx7bomnmlxoik8ccym9ngd.png "UCcVbQX7boMNMLxoiK8ccyM9ngd")

        <Procedures>

        1. 上部の検索バーまたはホームページから **サブスクリプション** に移動します。

        1. サブスクリプションを選択します。

        1. [概要] ページの **基本** セクションで `サブスクリプション ID` を見つけます。

        </Procedures>

    - **リソースグループ名:**

        リソースグループは、Azure ソリューションの関連リソースを保持するコンテナーです。

        ![HY2ybEyBHoOrwTxvvsxcvBDFnOe](https://zdoc-images.s3.us-west-2.amazonaws.com/hy2ybeybhoorwtxvvsxcvbdfnoe.png "HY2ybEyBHoOrwTxvvsxcvBDFnOe")

        <Procedures>

        1. 左側のメニューで **リソースグループ** に移動します。

        1. 名前が **名前** 列に表示されます。

            表示されない場合は、リソースグループを作成し、Zilliz Cloud に提供する必要がある場合があります。後で Terraform スクリプトを実行すると、仮想マシン (VM)、仮想ネットワーク (VNet)、Azure Kubernetes Service (AKS) クラスターなど、必要なすべてのリソースがリソースグループに追加されます。

        </Procedures>

- **アクセス制御 (IAM) 権限の追加**

    Terraform スクリプトを実行するロールに **Contributor** および **User Access Administrator** 権限を割り当てます。

    ![P0NbbtVyTofpGmxtk1jcpQYsnTe](https://zdoc-images.s3.us-west-2.amazonaws.com/p0nbbtvytofpgmxtk1jcpqysnte.png "P0NbbtVyTofpGmxtk1jcpQYsnTe")

    <Procedures>

    1. 左側のメニューで **アクセス制御 (IAM)** に移動します。

    1. **+ 追加** をクリックし、ドロップダウンリストから **ロールの割り当ての追加** を選択します。

    1. **ロール** タブで、**特権管理者ロール** をクリックし、**Contributor** をフィルターで選択し、**次へ** をクリックします。

    1. **メンバー** タブで、**アクセスの割り当て先** から **ユーザー、グループ、またはサービスプリンシパル** または **管理エンティティ** を選択し、**+ メンバーの選択** をクリックします。

        Terraform スクリプトを実行するユーザー、グループ、またはサービスプリンシパルを使用する場合は、**ユーザー、グループ、またはサービスプリンシパル** を選択します。それ以外の場合は、**管理エンティティ** を選択します。

    1. **次へ** をクリックし、設定を確認して、**確認と割り当て** をクリックして保存します。

    1. **User Access Administrator** ロールについて上記の手順を繰り返します。

    </Procedures>

- **最新の Terraform バイナリのインストール**

    Terraform のインストールの詳細については、[こちらのドキュメント](https://developer.hashicorp.com/terraform/install?product_intent=terraform) を参照してください。

### ステップ 2: プロジェクトの作成\{#step-2-create-a-project}

BYOC-I 組織内で、**プロジェクトの作成** ボタンをクリックしてデプロイを開始します。表示されたダイアログボックスで、**Zilliz BYOC プロジェクト名** を設定し、**作成して次へ** をクリックします。

このステップの最後にプロジェクトが作成され、**データプレーンのデプロイ** ダイアログボックスにリダイレクトされます。

![Wc5KwW4BihKe17beYFccNdb3nCf](https://zdoc-images.s3.us-west-2.amazonaws.com/Wc5KwW4BihKe17beYFccNdb3nCf.png)

### ステップ 3: データプレーンのデプロイ\{#step-3-deploy-the-data-plane}

<Procedures>

1. **データプレーン名** と **クラウドリージョン** を設定し、**次へ** をクリックします。

    **キャンセル** をクリックすると、データプレーンのデプロイを停止できます。ただし、上記で作成したプロジェクトは引き続き利用可能です。プロジェクト内でいつでもデータプレーンのデプロイを開始でき、プロジェクトに複数のデータプレーンを追加できます。

    ![M8EWwH1WJhTkVBbyJLOcWEDjnqN](https://zdoc-images.s3.us-west-2.amazonaws.com/M8EWwH1WJhTkVBbyJLOcWEDjnqN.png)

1. **Azure プライベート Service Connect** を有効にするかどうかを決定します。

    このオプションを使用すると、現在のプロジェクト内のクラスターへのプライベート接続が可能になります。このオプションを有効にする場合は、プライベート接続用に VPC エンドポイントを作成する必要があります。

1. [ステップ 1](./deploy-byoc-i-azure#step-1-prepare-the-deployment-environment) で取得した Azure **サブスクリプション ID** と **リソースグループ名** を入力します。

1. **アーキテクチャ** で、アプリケーションに一致するアーキテクチャタイプを選択します。

    これにより、使用する Zilliz BYOC イメージのアーキテクチャタイプが決まります。選択肢は **X86** と **ARM** です。

1. **リソース設定** では、次のことを行う必要があります。

    1. **オートスケーリング** を有効または無効にして、Zilliz Cloud がプロジェクトのワークロードに基づいて定義された範囲内で VM インスタンスの数を自動的に調整し、リソースを効率的に使用できるようにします。

    1. **初期プロジェクトサイズ** を構成します。

        BYOC プロジェクトでは、クエリノード、インデックスサービス、Milvus コンポーネント、および依存関係は異なるタイプの VM インスタンスを使用します。これらのサービスおよびコンポーネントのインスタンスタイプと数を個別に設定できます。

        **オートスケーリング** が無効の場合は、対応する **カウント** フィールドにプロジェクトの各コンポーネントに必要な VM インスタンスの数を指定するだけです。

        ![DYwHb4uOioMCbZxajkHc6unEn8f](https://zdoc-images.s3.us-west-2.amazonaws.com/dywhb4uoiomcbzxajkhc6unen8f.png "DYwHb4uOioMCbZxajkHc6unEn8f")

        **オートスケーリング** を有効にすると、対応する **最小** フィールドと **最大** フィールドを設定して、実際のプロジェクトワークロードに基づいて Zilliz Cloud が VM インスタンスの数を自動的にスケーリングする範囲を指定する必要があります。

        ![As6Ebvzaoo4iccxsxdlctOCRnpd](https://zdoc-images.s3.us-west-2.amazonaws.com/as6ebvzaoo4iccxsxdlctocrnpd.png "As6Ebvzaoo4iccxsxdlctOCRnpd")

        リソース設定を容易にするために、4 つの定義済みプロジェクトサイズオプションがあります。次の表は、これらのプロジェクトサイズオプションとプロジェクト内で作成できるクラスター数、および各クラスターが含むことができるエンティティ数のマッピングを示しています。

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
             <td><p>8 から 16 CUs の 3 クラスター</p></td>
             <td><p>2,000 万 - 4,000 万</p></td>
             <td><p>6,400 万 - 1 億 2,800 万</p></td>
             <td><p>3 億 2,000 万 - 6 億 4,000 万</p></td>
           </tr>
           <tr>
             <td><p>中</p></td>
             <td><p>16 から 64 CUs の 7 クラスター</p></td>
             <td><p>4,000 万 - 1 億 6,000 万</p></td>
             <td><p>1 億 2,800 万 - 5 億 1,200 万</p></td>
             <td><p>6 億 4,000 万 - 26 億</p></td>
           </tr>
           <tr>
             <td><p>大</p></td>
             <td><p>64 から 192 CUs の 12 クラスター</p></td>
             <td><p>1 億 6,000 万 - 4 億 8,000 万</p></td>
             <td><p>5 億 1,200 万 - 15 億</p></td>
             <td><p>26 億 - 77 億</p></td>
           </tr>
           <tr>
             <td><p>特大</p></td>
             <td><p>192 から 576 CUs の 17 クラスター</p></td>
             <td><p>4 億 8,000 万 - 14 億 4,000 万</p></td>
             <td><p>15 億 - 46 億</p></td>
             <td><p>77 億 - 230 億</p></td>
           </tr>
        </table>

        **初期プロジェクトサイズ** で **カスタム** を選択し、すべてのデータプレーンコンポーネントの VM インスタンスタイプと数を調整して設定をカスタマイズすることもできます。希望する VM インスタンスタイプがリストにない場合は、[Zilliz サポート](https://zilliz.com/contact) にお問い合わせください。

    1. **階層型クエリノード** を有効にするかどうかを決定します。

        このオプションは、階層型ストレージクラスターを作成できるかどうかを決定します。このオプションを選択すると、階層型クエリノードのインスタンスタイプと数を設定できます。

        ![Aolab6yB3o8Z3mxDFCycMzNqnTf](https://zdoc-images.s3.us-west-2.amazonaws.com/aolab6yb3o8z3mxdfcycmznqntf.png "Aolab6yB3o8Z3mxDFCycMzNqnTf")

        <Admonition type="info" icon="📘" title="Notes">

        - **プロジェクトサイズ** の選択は、**階層型ストレージノード** の設定には影響しません。

        - **オートスケーリング** が無効の場合、**デフォルトクエリノード** の数と **階層型クエリノード** の数の合計は正の整数である必要があります。

        - **オートスケーリング** が有効の場合、**デフォルトクエリノード** と **階層型クエリノード** の両方の **最小** 値の合計は正の整数である必要があります。

        </Admonition>

1. **次へ** をクリックします。

</Procedures>

### ステップ 4: データプレーンのデプロイ\{#step-4-deploy-the-data-plane}

ダイアログに表示される手順に従って、現在作成されているプロジェクトのデータプレーンをデプロイします。

![X3s2bYas0o5ICVxZ18rcta5TnLd](https://zdoc-images.s3.us-west-2.amazonaws.com/x3s2byas0o5icvxz18rcta5tnld.png "X3s2bYas0o5ICVxZ18rcta5TnLd")

上記の Terraform スクリプトの実行の詳細については、[Zilliz Cloud BYOC-I プロジェクト設定ガイド](https://registry.terraform.io/providers/zilliztech/zillizcloud/latest/docs/guides/create-a-byoc-i-project) を参照してください。

プロジェクトのデータプレーンをデプロイしてクラスターを作成したら、VPC 経由の直接アクセスまたは Azure プライベート Link を介してこれらのクラスターに接続できます。詳細については、[BYOC クラスターへの接続](./prepare-for-cluster-connection) を参照してください。

## データプレーンの管理\{#manage-dataplanes}

![IqvEwsg5ah4UaAb56tmcbOOlnIR](https://zdoc-images.s3.us-west-2.amazonaws.com/IqvEwsg5ah4UaAb56tmcbOOlnIR.png)

### デプロイ解除タグが付いたデータプレーン\{#data-planes-with-an-undeploy-tag}

プロジェクトカードの右上隅にあるステータスタグが **デプロイ解除** と表示されている場合は、プロジェクトカードの **データプレーンのデプロイ** ボタンをクリックして、いつでも再度開くことができます。プロジェクトの名前を変更したり削除したりするには、プロジェクトカードの **...** ボタンをクリックし、ドロップダウンメニューから **名前の変更** または **削除** を選択します。

### デプロイ中タグが付いたデータプレーン\{#data-planes-with-a-deploying-tag}

デプロイ環境を準備し、表示されたコマンドを実行したら、BYOC エージェントがアクティブになるまで待つ必要があります。プロジェクトカードのステータスタグが **デプロイ中** と表示され、進行状況のパーセンテージが表示されている場合、データプレーンが配置されるまでプロジェクトの名前を変更したり削除したりすることはできません。

### 実行中タグが付いたデータプレーン\{#data-plans-with-a-running-tag}

プロジェクトカードのステータスタグが **実行中** と表示されたら、プロジェクト内でクラスターの作成を開始できます。実行中のプロジェクトの名前を変更したり削除したりするには、プロジェクト内にクラスターがないことを確認してください。

## テクニカルサポートアクセス\{#technical-support-access}

トラブルシューティングとメンテナンス操作を支援するために、Zilliz Cloud はデフォルトでテクニカルサポートがプロジェクトのデータプレーンにアクセスできるようにします。

![LozAb735eoX00UxLYAKcWqY2nkG](https://zdoc-images.s3.us-west-2.amazonaws.com/lozab735eox00uxlyakcwqy2nkg.png "LozAb735eoX00UxLYAKcWqY2nkG")

対象のプロジェクトのドロップダウンメニューから **テクニカルサポートアクセス** をクリックして、現在の設定を表示します。

![NdnSbwFbkokOPpxaW1ocGwklnab](https://zdoc-images.s3.us-west-2.amazonaws.com/ndnsbwfbkokoppxaw1ocgwklnab.png "NdnSbwFbkokOPpxaW1ocGwklnab")

データガバナンスとセキュリティ要件を満たすために、これを無効にすることができます。

