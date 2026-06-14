---
title: "Microsoft Marketplace のパブリックオファーを購読する | Cloud"
slug: /subscribe-on-azure-marketplace
sidebar_key: subscribe-on-azure-marketplace
sidebar_label: "Microsoft Marketplace (パブリックオファー)"
beta: FALSE
notebook: FALSE
description: "このガイドでは、サブスクリプションのプロセスをステップバイステップで説明し、Azure Marketplace 上の Zilliz Cloud の価格条件を概説します。 | Cloud"
type: origin
token: LbFXwpruviFWWokwtkhcVmnhnFh
sidebar_position: 6
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - Azure
  - Microsoft
  - パブリックオファー

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Grid from '@site/src/components/Grid';

import Procedures from '@site/src/components/Procedures';

# Microsoft Marketplace でのパブリックオファーの購読

このガイドでは、サブスクリプションのプロセスを段階的に説明し、Azure Marketplace での Zilliz Cloud の料金条件を概説します。

<Admonition type="info" icon="📘" title="Note">

- サブスクリプションを開始すると、Azure Marketplace を介して Azure クラスターの使用料を支払うことができます。他のクラウドプロバイダーにクラスターをデプロイしている場合も、Azure Marketplace を使用して支払うことができます。

- Azure Marketplace の請求をチームやビジネスユニットごとに分ける必要がある場合は、[Azure Marketplace での Zilliz Cloud 請求の分離](./separate-zilliz-cloud-billing-on-azure-marketplace) を参照してください。

</Admonition>

## 始める前に\{#before-you-start}

Azure Marketplace でのサブスクリプションのために、[Azure Marketplace](https://learn.microsoft.com/en-us/marketplace/azure-marketplace-overview) アカウントと Azure [請求アカウント](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/view-all-accounts) があることを確認してください。

また、請求先の国または地域がサポート対象市場のリストに含まれていることを確認してください。Zilliz Cloud は、税務およびコンプライアンス上の理由から、Azure Marketplace の一部の市場をサポートしていません。サポートされていない市場からサブスクリプションを試みると、`"No plans are available for market '<market_code>'."` というエラーメッセージが表示される場合があります。その場合は、[サポートに連絡](http://support.zilliz.com/) し、エラーメッセージのスクリーンショットと市場コードを提供してください。可能な解決策についてご相談させていただきます。

![YaPcbHnQXovDLIxks0xcItOJnpf](https://zdoc-images.s3.us-west-2.amazonaws.com/yapcbhnqxovdlixks0xcitojnpf.png "YaPcbHnQXovDLIxks0xcItOJnpf")

<details>

<summary>サポート対象市場</summary>

<Grid columnSize="4" widthRatios="25,25,25,25">

    <div>

        - Armenia

        - Australia

        - Austria

        - Bahrain

        - Barbados

        - Belarus

        - Belgium

        - Bulgaria

        - Canada

        - Chile

        - Colombia

        - Croatia

        - Cyprus

        - Czechia

        - Denmark

        - Egypt

        - Estonia

        - Finland

    </div>

    <div>

        - France

        - Georgia

        - Germany

        - Greece

        - Hong Kong SAR

        - Hungary

        - Iceland

        - India

        - Indonesia

        - Ireland

        - Italy

        - Japan

        - Kenya

        - Latvia

        - Liechtenstein

        - Lithuania

        - Luxembourg

        - Malaysia

    </div>

    <div>

        - Malta

        - Moldova

        - Monaco

        - Netherlands

        - New Zealand

        - Nigeria

        - Norway

        - Oman

        - Philippines

        - Poland

        - Portugal

        - Puerto Rico

        - Qatar

        - Romania

        - Russia

        - Saudi Arabia

        - Serbia

        - Singapore

    </div>

    <div>

        - Slovakia

        - Slovenia

        - South Africa

        - South Korea

        - Spain

        - Sweden

        - Switzerland

        - Taiwan

        - Tajikistan

        - Thailand

        - Türkiye

        - Uganda

        - Ukraine

        - United Arab Emirates

        - United Kingdom

        - United States

        - Uzbekistan

        - Vietnam

    </div>

</Grid>

</details>

## Azure Marketplace でサブスクリプション\{#subscribe-on-azure-marketplace}

[Azure Marketplace](https://azuremarketplace.microsoft.com/en-us) にアクセスし、次の手順で Zilliz Cloud のサブスクリプションを開始します。

<Supademo id="cm9jmpiac3eq2ljv5itt1tn7s" title="Zilliz Cloud - Azure Marketplace Subscription Demo" />

<Procedures>

1. 検索ボックスで **Zilliz Cloud** を検索するか、[Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/zillizinc1703056661329.zilliz_cloud?tab=Overview) に移動して Zilliz Cloud のポータルページを表示します。

    ![search_for_zilliz_on_azure](https://zdoc-images.s3.us-west-2.amazonaws.com/search_for_zilliz_on_azure.png "search_for_zilliz_on_azure")

1. **Zilliz Cloud** をクリックします。

    サービスと価格をご確認ください。

1. **プランと料金** タブに切り替えます。**今すぐ入手** をクリックします。

    ![get_it_now_on_azure](https://zdoc-images.s3.us-west-2.amazonaws.com/get_it_now_on_azure.png "get_it_now_on_azure")

1. ポップアップウィンドウで、Zilliz Cloud に必要な基本情報を入力します。

    ![enter_basic_information_azure](https://zdoc-images.s3.us-west-2.amazonaws.com/enter_basic_information_azure.png "enter_basic_information_azure")

1. **Zilliz Cloud を購読する** ページで、以下の手順を完了します。

    1. 適切な **サブスクリプション** と **リソースグループ** を選択して、**プロジェクトの詳細** を設定します。リソースグループがない場合は作成してください。サブスクリプションとリソースグループの詳細については、Azure の [SaaS 購入エクスペリエンス](https://learn.microsoft.com/en-us/marketplace/purchase-saas-offer-in-azure-portal#the-saas-purchase-experience) を参照してください。

    1. **SaaS の詳細** を設定します。

        1. 後で簡単に識別できるようにサブスクリプションに名前を付けます。

        1. 契約期間を選択します: 1 か月または 1 年。

        1. **自動更新** 設定を構成します。

            <Admonition type="info" icon="📘" title="Note">

            自動更新がオンの場合、契約期間の終了時に Azure 上の Zilliz Cloud に自動的にサブスクライブされます。自動更新がオフの場合、契約期間の終了時にサブスクリプションが終了し、Zilliz Cloud 組織とアカウントはこの Azure Marketplace サブスクリプションから自動的にリンク解除されます。

            </Admonition>

    1. サブスクリプションの詳細を確認し、**確認とサブスクライブ** をクリックします。

    ![configure_subscription_on_azure](https://zdoc-images.s3.us-west-2.amazonaws.com/configure_subscription_on_azure.png "configure_subscription_on_azure")

1. 次のページで、**今すぐアカウントを構成** をクリックして、Azure Marketplace サブスクリプションを Zilliz Cloud にリンクします。

    ![configure_account_azure](https://zdoc-images.s3.us-west-2.amazonaws.com/configure_account_azure.png "configure_account_azure")

1. 新しいタブで、以下の手順に従ってサブスクリプションを完了します。

    1. Zilliz Cloud アカウントを既にお持ちの場合は、ログインします。お持ちでない場合は、[サインアップオプション](./register-with-zilliz-cloud) を選択し、手順に従います。

    1. サブスクリプションを既存の Zilliz Cloud 組織にリンクします。

    1. 認証を完了します。

        ![aws-marketplace-dialog](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-dialog.png "aws-marketplace-dialog")

1. Zilliz Cloud で **請求** に移動し、Azure Marketplace サブスクリプションが支払い方法として設定されていることを確認します。

    ![azure-marketplace-success](https://zdoc-images.s3.us-west-2.amazonaws.com/azure-marketplace-success.png "azure-marketplace-success")

</Procedures>

## サブスクリプションまたは支払い方法の更新\{#update-subscription-or-payment-method}

Marketplace からのサブスクリプションが成功した後は、いつでも適宜サブスクリプションを更新できます。

具体的には、以下のいずれかが可能です。

- サブスクリプションに使用する Marketplace アカウントを別のものに変更する

- 支払い方法を Marketplace サブスクリプションからクレジットカードに切り替える

詳細については、[支払い方法の更新](./update-payment-method) を参照してください。

## Azure Marketplace サブスクリプションのキャンセル\{#cancel-azure-marketplace-subscription}

<Procedures>

1. Azure Marketplace のホームページを開きます。

1. **すべてのリソース** をクリックするか、**リソース/最近** タブでサブスクリプションを見つけます。

    ![azure_all_resources](https://zdoc-images.s3.us-west-2.amazonaws.com/azure_all_resources.png "azure_all_resources")

1. キャンセルしたいサブスクリプションに移動します。**サブスクリプションをキャンセル** をクリックします。Azure Marketplace が処理を完了するまで数分待ちます。

    ![cancel_azure_subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/cancel_azure_subscription.png "cancel_azure_subscription")

</Procedures>

Azure Marketplace でのサブスクリプションのキャンセル方法の詳細については、[こちら](https://learn.microsoft.com/en-us/marketplace/saas-subscription-lifecycle-management#cancel-subscription) を参照してください。

## トラブルシューティング\{#troubleshooting}

**Azure Marketplace 経由でサブスクリプションを行う際に、“No plans are available for market '&lt;country_code&gt;'” と表示されるのはなぜですか？**

このメッセージは、Zilliz Cloud がお客様の請求先国または地域の Azure Marketplace でまだ利用できないために表示されます。詳細については、[サポート対象市場](./subscribe-on-azure-marketplace#before-you-start) を参照してください。[サポートに連絡](http://support.zilliz.com) し、エラーメッセージのスクリーンショットと市場コードを提供してください。代替ソリューションを提供したり、利用可能な地域を更新できる場合があります。

**Marketplace サブスクリプションを Zilliz Cloud にリンクする際に、利用可能な組織がない場合はどうすればよいですか？**

いくつかの理由が考えられます。

- **権限が不十分です**

    これは、十分な権限がない場合に発生します。利用できない組織の横に **"権限が不十分です"** タグが表示されます。

    ![insufficient-permission-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    組織を Marketplace サブスクリプションにリンクするには、**組織オーナー** または **組織の請求管理者** である必要があります。しかし、組織メンバーのみである場合は、必要な権限がありません。組織オーナーに連絡して支援を求めてください。

- **すべての組織が既に Marketplace サブスクリプションに正常にリンクされています**

    これは、すべての組織が既に Marketplace サブスクリプションにリンクされている場合に発生します。利用できない組織の横に **"マーケットプレイスにリンク済み"** タグが表示されます。

    ![marketplace-already-linked-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存の Marketplace サブスクリプションを更新する必要がある場合は、まず組織の現在のサブスクリプションのリンクを解除してから、新しいサブスクリプションを設定してください。

    - 異なる Marketplace サブスクリプション用に複数の組織が必要な場合は、以下のいずれかが可能です。

        - 新しい Zilliz Cloud アカウントを[登録](./register-with-zilliz-cloud) して新しい組織を作成します。次に、組織オーナーを新しい組織に[招待](./organization-users#invite-a-user-to-your-organization) します。この組織オーナーは複数の組織に所属し、それぞれの組織に異なる Marketplace サブスクリプションを設定できるようになります。

        - [サポートチケットを作成](http://support.zilliz.com) して、新しい組織を作成してもらいます。現在、Zilliz Cloud はユーザーによる手動の組織作成をサポートしていません。

- **リストに組織がない**

    - これは、アカウントが閉鎖された場合、またはすべての組織から離脱した場合に発生する可能性があります。UI は次のようになります。

    ![no-organization-during-subcription](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、以下のいずれかが可能です。

    - 新しい組織を作成します。

    - 他のユーザーに自分の組織に[招待](./organization-users#invite-a-user-to-your-organization) してもらい、組織オーナーの役割を付与してもらいます。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us) すると、新しい組織を作成します。

