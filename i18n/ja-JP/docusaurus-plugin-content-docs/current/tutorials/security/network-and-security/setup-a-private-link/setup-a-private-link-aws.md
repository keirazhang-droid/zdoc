---
title: "PrivateLink (AWS) を設定 | Cloud"
slug: /setup-a-private-link-aws
sidebar_key: setup-a-private-link-aws
sidebar_label: "PrivateLink (AWS) を設定"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud クラスターから別の AWS VPC でホストされているサービスへのプライベートリンクの設定手順を示します。 | Cloud"
type: origin
token: GBY6wbUmwi9lLjkXSuKccODgnne
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - プライベートリンク
  - プライベートリンク
  - プライベートエンドポイント
  - Private Service Connect
  - AWS
  - GCP
  - Azure

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# プライベートLink（AWS）のセットアップ

このガイドでは、Zilliz Cloud クラスターから別の AWS VPC でホストされているサービスへのプライベートリンクを設定する手順について説明します。

<Admonition type="info" icon="📘" title="Notes">

この機能は、**Dedicated** サービングクラスターおよび **on-demand** クラスターでのみ利用可能です。

</Admonition>

プライベートリンクはプロジェクトレベルで設定され、同じクラウドプロバイダーとリージョンでこのプロジェクト内にデプロイされたすべてのクラスターに対して有効です。

<Admonition type="info" icon="📘" title="Notes">

Zilliz Cloud では、プライベートエンドポイントの作成および使用に対して料金は発生しません。ただし、お客様のクラウドプロバイダーが、Zilliz Cloud にアクセスするために作成する各エンドポイントに対して [料金を請求する場合があります](https://aws.amazon.com/privatelink/pricing/)。

</Admonition>

## 開始前に\{#before-you-start}

以下を確認してください。

- お客様のサービスと Zilliz Cloud クラスターが異なるリージョンにあり、サービスが AWS プライベートLink を介してクラスターにアクセスする必要がある場合は、[チケットを送信](https://support.zilliz.com/hc/en-us/requests/new) してください。対応いたします。

## プライベートエンドポイントの作成\{#create-private-endpoint}

Zilliz Cloud では、直感的な Web コンソールを使用してプライベートエンドポイントを追加できます。対象のプロジェクトに移動し、左側のナビゲーションで **ネットワーク > プライベートエンドポイント** をクリックします。**+ プライベートエンドポイント** をクリックします。

![I02ibsAgioWpuLxwzHDcp1c2nge](https://zdoc-images.s3.us-west-2.amazonaws.com/i02ibsagiowpulxwzhdcp1c2nge.png "I02ibsAgioWpuLxwzHDcp1c2nge")

### ステップ 1: クラウドプロバイダーとリージョンを選択\{#step-1-select-a-cloud-provider-and-region}

AWS リージョンにデプロイされたクラスターのプライベートエンドポイントを作成するには、**クラウドプロバイダー** ドロップダウンリストから **AWS** を選択します。**リージョン** では、プライベートにアクセスするクラスターが配置されているリージョンを選択します。**次へ** をクリックします。

利用可能なクラウドプロバイダーとリージョンの詳細については、「[クラウドプロバイダーとリージョン](./cloud-providers-and-regions)」を参照してください。

![NxuFbXh41oA53VxB4sPcfR9snVg](https://zdoc-images.s3.us-west-2.amazonaws.com/nxufbxh41oa53vxb4spcfr9snvg.png "NxuFbXh41oA53VxB4sPcfR9snVg")

### ステップ 2: エンドポイントを作成\{#step-2-create-an-endpoint}

このステップは、お客様のクラウドプロバイダーのコンソールで、UI コンソールまたは CLI を使用して完了する必要があります。

- **UIコンソール経由**

    ![AJlTbcoxNoXKBIxAxz6cYrkBnrc](https://zdoc-images.s3.us-west-2.amazonaws.com/ajltbcoxnoxkbixaxz6cyrkbnrc.png "AJlTbcoxNoXKBIxAxz6cYrkBnrc")

    <Procedures>

    1. **UIコンソール経由** タブに切り替え、**サービス名** をコピーします。

    1. AWS コンソールに移動し、右上のリージョンでお客様のサービスが実行されているリージョンを選択します。次に、左側のナビゲーションで **エンドポイント** をクリックします。**エンドポイントの作成** をクリックします。

        <Admonition type="info" icon="📘" title="Notes">

        お客様の Zilliz Cloud クラスターにアクセスする必要があるサービスが配置されているリージョンは必ず使用してください。

        - お客様のサービスが Zilliz Cloud クラスターと同じリージョンで実行されている場合は、そのリージョンを使用します。

        - お客様のサービスが Zilliz Cloud クラスターとは異なるリージョンで実行されている場合は、お客様のサービスが実行されているリージョンを使用します。

        </Admonition>

        ![setup_private_link_window_aws](https://zdoc-images.s3.us-west-2.amazonaws.com/setup_private_link_window_aws.png "setup_private_link_window_aws")

    1. **エンドポイントの作成** ページで、エンドポイントの **タイプ** として **NLB および GWLB を使用するエンドポイントサービス** を選択します。

        ![create_endpoint_type_gcp](https://zdoc-images.s3.us-west-2.amazonaws.com/create_endpoint_type_gcp.png "create_endpoint_type_gcp")

    1. **サービス設定** で、Zilliz Cloud Web コンソールからコピーした **サービス名** を **サービス名** フィールドに貼り付けます。次に **サービスの確認** をクリックします。

        ![enter_service_name_gcp](https://zdoc-images.s3.us-west-2.amazonaws.com/enter_service_name_gcp.png "enter_service_name_gcp")

        <Admonition type="info" icon="📘" title="Notes">

        お客様のサービスが Zilliz Cloud クラスターがホストされているリージョンとは異なるリージョンで動作している場合は、**クロスリージョンエンドポイントを有効にする** を選択し、Zilliz Cloud クラスターが実行されているリージョンを選択してください。次に **サービスの確認** をクリックします。

        次の図では、Zilliz Cloud クラスターが **Europe (Frankfurt)** で実行され、お客様のサービスが別のリージョンで実行されていると想定しています。

        ![NX2AbfqBfokf1axbn4LchJfZnqS](https://zdoc-images.s3.us-west-2.amazonaws.com/nx2abfqbfokf1axbn4lchjfznqs.png "NX2AbfqBfokf1axbn4LchJfZnqS")

        </Admonition>

    1. サービス名が確認されたら、サブネットとセキュリティグループを構成し、**作成** をクリックします。

    1. エンドポイントが正常に作成されたら、エンドポイント ID（"vpce-" で始まる）をコピーします。

    </Procedures>

- **CLI経由**

    ![TzQdb9ReToZlkTxGRVZcCdUbnOe](https://zdoc-images.s3.us-west-2.amazonaws.com/tzqdb9retozlktxgrvzccdubnoe.png "TzQdb9ReToZlkTxGRVZcCdUbnOe")

    <Procedures>

    1. **CLI経由** タブに切り替えます。

    1. **VPC ID** を入力します。

        VPC を表示するには、[Amazon VPC コンソール](https://console.aws.amazon.com/vpc/) に移動します。ナビゲーションペインで、**お客様の VPC** を選択します。目的の VPC を見つけて、その ID をコピーします。この ID を Zilliz Cloud の **VPC ID** に入力します。

        VPC の作成については、「[VPC の作成](https://docs.aws.amazon.com/vpc/latest/userguide/working-with-vpcs.html#Create-VPC)」を参照してください。

    1. **サブネット ID** を入力します。

        サブネットは VPC のサブディビジョンです。作成するプライベートエンドポイントと同じリージョンに存在するサブネットが必要です。サブネットを表示するには、[Amazon VPC コンソール](https://console.aws.amazon.com/vpc/) に移動します。現在のリージョンをプライベートリンクを作成するために指定されたリージョンに変更します。ナビゲーションペインで、**サブネット** を選択します。目的のサブネットを見つけて、その ID をコピーします。この ID を Zilliz Cloud の **サブネット ID** に入力します。

        サブネットの作成については、「[VPC 内のサブネットの作成](https://docs.aws.amazon.com/vpc/latest/userguide/working-with-subnets.html#create-subnets)」を参照してください。

    1. コードブロック内のコピーアイコンをクリックし、AWS コンソールに移動します。

        上部のナビゲーションで、AWS CloudShell を起動します。Zilliz Cloud からコピーした CLI コマンドを CloudShell で実行します。

        ![setup_private_link_aws_cloud_shell](https://zdoc-images.s3.us-west-2.amazonaws.com/setup_private_link_aws_cloud_shell.png "setup_private_link_aws_cloud_shell")

        返されるメッセージは次のようになります。

        ```json
        {
            "VpcEndpoint": {
                # Copy this and fill it in "Your VPC Private Link ID"
                "VpcEndpointId": "vpce-0ce90d01341533a5c",
                "VpcEndpointType": "Interface",
                ...
                "DnsEntries": [
                    {
                        # Copy this one and use it as "VPCE_DNS" in the next step.
                        "DnsName": "vpce-0ce90d01341533a5c-ngbqfdnj.vpce-svc-0b62964bfd0edfb74.us-west-2.vpce.amazonaws.com",
                        "HostedZoneId": "Z1YSA3EXCYUU9Z"
                    },
                    {
                        "DnsName": "vpce-0ce90d01341533a5c-ngbqfdnj-us-west-2a.vpce-svc-0b62964bfd0edfb74.us-west-2.vpce.amazonaws.com",
                        "HostedZoneId": "Z1YSA3EXCYUU9Z"
                    }
                ]
        }
        ```

        返されたメッセージ内で、作成されたVPCエンドポイントのVpcEndpointId（"vpce-" で始まる）をコピーします。

    </Procedures>

### ステップ3：エンドポイントを承認する\{#step-3-authorize-your-endpoint}

AWSコンソールから取得したエンドポイントIDをZilliz Cloudの**エンドポイントID**ボックスに貼り付けます。**作成**をクリックします。

![AWSでエンドポイントを承認する設定](https://zdoc-images.s3.us-west-2.amazonaws.com/setup_private_link_aws_authorize_endpoint.png "setup_private_link_aws_authorize_endpoint")

## プライベートリンクを取得する\{#obtain-a-private-link}

提出したVPCエンドポイントの確認と承認後、Zilliz Cloudはこのエンドポイントにプライベートリンクを割り当てます。この処理には約5分かかります。

プライベートリンクの準備ができると、Zilliz Cloudの**プライベートリンク**ページで確認できます。

## DNSレコードを設定する\{#set-up-a-dns-record}

Zilliz Cloudによって割り当てられたプライベートリンクを介してクラスターにアクセスする前に、DNSゾーンにCNAMEレコードを作成して、プライベートリンクをVPCエンドポイントのDNS名に解決する必要があります。

- **Amazon Route 53を使用してホストゾーンを作成する**

    Amazon Route 53はウェブベースのDNSサービスです。DNSレコードを追加できるように、ホストDNSゾーンを作成します。

    ![A1zxblLRPo96Kvx0zzccZ485nGb](https://zdoc-images.s3.us-west-2.amazonaws.com/a1zxbllrpo96kvx0zzccz485ngb.png "A1zxblLRPo96Kvx0zzccZ485nGb")

    <Procedures>

    1. AWSアカウントにログインし、[ホストゾーン](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#)に移動します。

    1. **ホストゾーンの作成**をクリックします。

    1. **ホストゾーン設定**セクションで、以下のパラメータを設定します。

        <table>
           <tr>
             <th><p><strong>パラメータ名</strong></p></th>
             <th><p><strong>パラメータの説明</strong></p></th>
           </tr>
           <tr>
             <td><p><strong>ドメイン名</strong></p></td>
             <td><ul><li><p>提供クラスター: ターゲットの提供クラスターに対してZilliz Cloudによって割り当てられたプライベートリンク。</p></li><li><p>オンデマンドコンピュート: サービスのプロジェクトエンドポイント。</p></li></ul></td>
           </tr>
           <tr>
             <td><p><strong>説明</strong></p></td>
             <td><p>ホストゾーンを区別するために使用される説明。</p></td>
           </tr>
           <tr>
             <td><p><strong>タイプ</strong></p></td>
             <td><p><strong>プライベートホストゾーン</strong>を選択します。</p></td>
           </tr>
        </table>

    1. **ホストゾーンに関連付けるVPC**セクションで、VPC IDを追加してホストゾーンに関連付けます。

    </Procedures>

- **ホストゾーンにエイリアスレコードを作成する**

    エイリアスレコードは、エイリアス名を実際のドメイン名または正規ドメイン名にマッピングするDNSレコードの一種です。Zilliz Cloudによって割り当てられたプライベートリンクをVPCエンドポイントのDNS名にマッピングするエイリアスレコードを作成します。これにより、プライベートリンクを使用してクラスターにプライベートにアクセスできます。

    ![VoCsbJtTDo1glVx0vtGcqWPRnEd](https://zdoc-images.s3.us-west-2.amazonaws.com/vocsbjttdo1glvx0vtgcqwprned.png "VoCsbJtTDo1glVx0vtGcqWPRnEd")

    <Procedures>

    1. 作成したホストゾーンで、**レコードを作成**をクリックします。

    1. **レコードを作成**ページで、**エイリアス**をオンにし、次のようにルーティング先を選択します：

        1. 最初のドロップダウンリストで**VPCエンドポイントへのエイリアス**を選択します。

        1. 2番目のドロップダウンリストでクラウドリージョンを選択します。

        1. 上記で作成したVPCエンドポイントのDNS名を入力します。

    1. **レコードを作成**をクリックします。

    </Procedures>

## クラスターへのインターネットアクセスを管理する\{#manage-internet-access-to-your-clusters}

プライベートエンドポイントを設定した後、クラスターのパブリックエンドポイントを無効にして、プロジェクトへのインターネットアクセスを制限することができます。パブリックエンドポイントを無効にすると、ユーザーはプライベートリンクを使用してのみクラスターに接続できます。

パブリックエンドポイントを無効にするには：

<Procedures>

1. ターゲットクラスターの**クラスターの詳細**ページに移動します。

1. **接続**セクションに移動します。

1. クラスターのパブリックエンドポイントの横にある設定アイコンをクリックします。

1. 情報を読み、**パブリックエンドポイントを無効化**ダイアログボックスで**無効化**をクリックします。

</Procedures>

<Admonition type="info" icon="📘" title="Notes">

- プライベートエンドポイントは、[データプレーン](/reference/restful/data-plane-v2) アクセスにのみ影響します。[コントロールプレーン](/reference/restful/control-plane-v2) はパブリックインターネットから引き続きアクセスできます。

- パブリックエンドポイントを再び有効にした後、パブリックエンドポイントにアクセスできるようになるまで、ローカルDNSキャッシュの期限が切れるのを待つ必要がある場合があります。

</Admonition>

![パブリックエンドポイントの無効化](https://zdoc-images.s3.us-west-2.amazonaws.com/disable_public_endpoint.png "disable_public_endpoint")

## よくある質問（FAQ）\{#faq}

### AWSでプライベートリンクに接続すると常にタイムアウトが報告されるのはなぜですか？\{#why-does-it-always-report-a-timeout-when-connecting-to-the-private-link-on-aws}

通常、タイムアウトは以下の理由で発生します：

- プライベートDNSレコードが存在しない。

    DNSレコードが存在する場合、次のようにプライベートリンクにpingを実行できます：

    ![QOanbDGrYovMXHxczXmcCbUcnsc](https://zdoc-images.s3.us-west-2.amazonaws.com/qoanbdgryovmxhxczxmccbucnsc.png "QOanbDGrYovMXHxczXmcCbUcnsc")

    <Admonition type="info" icon="📘" title="Notes">

    pingリクエストの出力でVPCエンドポイントのIPアドレスが正しく解決されている場合、DNSレコードは機能しています。

    </Admonition>

    次のような表示がある場合は、[DNSレコードを設定](./setup-a-private-link-aws#set-up-a-dns-record) する必要があります。

    ![X5ahblpw1oRxp8xKR3OczuD9nFf](https://zdoc-images.s3.us-west-2.amazonaws.com/x5ahblpw1orxp8xkr3oczud9nff.png "X5ahblpw1oRxp8xKR3OczuD9nFf")

- セキュリティグループルールがないか、無効である。

    AWSコンソールで、EC2インスタンスからVPCエンドポイントへのトラフィックに対するセキュリティグループルールを適切に設定する必要があります。VPC内の適切なセキュリティグループは、プライベートリンクに付加されたポートでEC2インスタンスからのインバウンドアクセスを許可する必要があります。

    `curl`コマンドを使用してプライベートリンクの接続性をテストできます。通常の場合、400応答が返されます。

    ![ERtlbR2v7oA3Q4xXRlccM3VhnNc](https://zdoc-images.s3.us-west-2.amazonaws.com/ertlbr2v7oa3q4xxrlccm3vhnnc.png "ERtlbR2v7oA3Q4xXRlccM3VhnNc")

    次のスクリーンショットのように`curl`コマンドが応答なしでハングする場合は、[VPCエンドポイントを作成する](https://docs.amazonaws.cn/en_us/vpc/latest/privatelink/create-interface-endpoint.html) のステップ9を参照して、適切なセキュリティグループルールを設定する必要があります。

    ![KHj0bEy7ZojM6axnR0ocg1LPnue](https://zdoc-images.s3.us-west-2.amazonaws.com/khj0bey7zojm6axnr0ocg1lpnue.png "KHj0bEy7ZojM6axnR0ocg1LPnue")

    <Admonition type="info" icon="📘" title="Notes">

    2つのセキュリティグループを設定する必要があります：1つはEC2インスタンス用で、プライベートリンクに関連付けられたポートでのトラフィックを許可する必要があります。もう1つはVPCエンドポイント用で、EC2インスタンスのIPアドレスからのトラフィックを許可し、指定されたポート番号をターゲットとする必要があります。

    </Admonition>

### 既存のクラスターに対してプライベートエンドポイントを作成できますか？\{#can-i-create-a-private-endpoint-for-an-existing-cluster}

はい。プライベートエンドポイントを作成すると、同じリージョンとプロジェクト内のすべての既存および将来のDedicated（Enterprise）クラスターに適用されます。必要なのは、異なるクラスターに対して異なるDNSレコードを追加することだけです。

