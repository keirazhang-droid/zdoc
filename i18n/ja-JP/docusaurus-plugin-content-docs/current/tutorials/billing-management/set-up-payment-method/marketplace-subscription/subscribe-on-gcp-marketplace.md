---
title: "Google Cloud Marketplace で公開オファーを購読する | Cloud"
slug: /subscribe-on-gcp-marketplace
sidebar_key: subscribe-on-gcp-marketplace
sidebar_label: "Google Cloud Marketplace (公開オファー)"
beta: FALSE
notebook: FALSE
description: "このガイドでは、サブスクリプションのプロセスを段階的に説明し、GCP Marketplace での Zilliz Cloud の価格条件を概説します。 | Cloud"
type: origin
token: MIqTw7iJ4iQAtVkYKiEc98a7nsh
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - Google Cloud
  - 公開オファー

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Google Cloud Marketplaceでのパブリックオファーの購読

このガイドでは、サブスクリプションプロセスのステップバイステップの手順と、GCP MarketplaceでのZilliz Cloudの価格条件について説明します。

<Admonition type="info" icon="📘" title="Note">

購読すると、Google Cloud Marketplaceを介してGoogle Cloudクラスターの使用量を支払うことができます。他のクラウドプロバイダーにデプロイされたクラスターがある場合も、Google Cloud Marketplaceを使用して支払うことができます。

</Admonition>

## 始める前に\{#before-you-start}

- [GCPアカウント](https://cloud.google.com/apigee/docs/hybrid/v1.1/precog-gcpaccount)があることを確認してください。

- サブスクリプションに使用するGCPプロジェクトに請求アカウントが設定されていることを確認してください。

- GCP Marketplaceアカウントが組織の一部である場合、請求管理者による購入の承認が必要です。

## GCP Marketplaceで購読する\{#subscribe-on-gcp-marketplace}

[GCP](https://console.cloud.google.com/marketplace)[ Marketplace](https://console.cloud.google.com/marketplace)にアクセスし、次のようにZilliz Cloudの購読を開始します：

<Procedures>

1. 検索ボックスで**Zilliz Cloud**を検索するか、[GCP Marketplaceに移動](https://console.cloud.google.com/marketplace/product/zilliz-public/zilliz-cloud?project=zilliz-public&pli=1)してZilliz Cloudのポータルページを表示します。

    ![gcpでzillizを検索](https://zdoc-images.s3.us-west-2.amazonaws.com/search_for_zilliz_on_gcp.png "search_for_zilliz_on_gcp")

1. **Zilliz Cloud**をクリックします。

    サービスと価格を確認してください。

1. サブスクリプションのプロジェクトを選択し、**購読**をクリックします。

    ![gcpでsubscribeをクリック](https://zdoc-images.s3.us-west-2.amazonaws.com/click_subscribe_on_gcp.png "click_subscribe_on_gcp")

1. **新しいZilliz Cloudサブスクリプション**ページで、次の手順を実行します：

    1. **購入の詳細**セクションのドロップダウンから請求アカウントを選択します。

    1. **規約**を確認して同意します。

    1. **購読**をクリックします。

    ![gcpでの新しいzilliz cloudサブスクリプション](https://zdoc-images.s3.us-west-2.amazonaws.com/new_zilliz_cloud_subscription_on_gcp.png "new_zilliz_cloud_subscription_on_gcp")

1. ポップアップウィンドウで、**SIGN UP WITH ZILLIZ**をクリックします。

    <Admonition type="info" icon="📘" title="Notes">

    サインアッププロセスを完了できない場合は、GCP Marketplaceの**[Your Orders](https://console.cloud.google.com/marketplace/orders)**ページに移動して再試行できます。

    </Admonition>

    ![gcpフラッシュメッセージ](https://zdoc-images.s3.us-west-2.amazonaws.com/gcp_flash_message.png "gcp_flash_message")

1. 新しいタブで、以下の手順に従ってサブスクリプションを完了します。

    1. 既にZilliz Cloudアカウントをお持ちの場合は、ログインしてください。お持ちでない場合は、[サインアップオプション](./register-with-zilliz-cloud)を選択して手順に従ってください。

    1. サブスクリプションを既存のZilliz Cloud組織にリンクします。

    1. 承認を完了します。

    ![aws-marketplaceダイアログ](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-dialog.png "aws-marketplace-dialog")

1. **請求**に移動し、GCP Marketplaceサブスクリプションが支払い方法として設定されていることを確認します。

    ![gcp-marketplace成功](https://zdoc-images.s3.us-west-2.amazonaws.com/gcp-marketplace-success.png "gcp-marketplace-success")

</Procedures>

## サブスクリプションまたは支払い方法の更新\{#update-subscription-or-payment-method}

Marketplaceからのサブスクリプションが成功した後は、いつでも適切なタイミングでサブスクリプションを更新できます。

具体的には、次のいずれかを実行できます：

- サブスクリプションに使用するMarketplaceアカウントを別のアカウントに変更する

- 支払い方法をMarketplaceサブスクリプションからクレジットカードに切り替える。

詳細については、[支払い方法の更新](./update-payment-method)を参照してください。

## GCP Marketplaceサブスクリプションのキャンセル\{#cancel-gcp-marketplace-subscription}

<Admonition type="info" icon="📘" title="Note">

サブスクリプションをキャンセルすると、組織は高度なZilliz Cloud機能へのアクセスを失います。組織に残りのクレジットがない場合、またはすべてのクレジットが期限切れになった場合、すぐに凍結されます。

</Admonition>

<Procedures>

1. [Google Cloud Orders](https://console.cloud.google.com/marketplace/orders)ページに移動します。

1. キャンセルするプランの製品を選択します。

1. **Actions available to manage your orders**をクリックします。

1. **Cancel purchase**または**サブスクリプションをキャンセル**を選択します。

</Procedures>

詳細については、[プランのキャンセル](https://docs.cloud.google.com/marketplace/docs/manage-billing#saas-products)を参照してください。

## トラブルシューティング\{#troubleshooting}

**MarketplaceサブスクリプションをZilliz Cloudにリンクする際に、利用可能な組織がない場合はどうすればよいですか？**

いくつかの理由が考えられます。

- **権限が不十分です**

    これは、十分な権限がない場合に発生します。利用できない組織の横に**"権限が不十分です"**タグが表示されます。

    ![権限不足のサブスクリプション](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    組織をMarketplaceサブスクリプションにリンクするには、**組織オーナー**または**組織の請求管理者**である必要があります。しかし、組織メンバーのみである場合は、必要な権限がありません。組織オーナーに連絡して支援を求めてください。

- **すべての組織が既にMarketplaceサブスクリプションに正常にリンクされています**

    これは、すべての組織が既にMarketplaceサブスクリプションにリンクされている場合に発生します。利用できない組織の横に**"マーケットプレイスにリンク済み"**タグが表示されます。

    ![marketplace既にリンク済みのサブスクリプション](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存のMarketplaceサブスクリプションを更新する必要がある場合は、まず組織の現在のサブスクリプションのリンクを解除し、新しいサブスクリプションを設定してください。

    - 異なるMarketplaceサブスクリプションのために複数の組織が必要な場合は、次のことができます：

        - 新しいZilliz Cloudアカウントを[登録](./register-with-zilliz-cloud)して新しい組織を作成します。次に、組織オーナーを新しい組織に[招待](./organization-users#invite-a-user-to-your-organization)します。この組織オーナーは複数の組織に所属することになり、各組織に異なるMarketplaceサブスクリプションを設定できます。

        - [サポートチケットを作成](http://support.zilliz.com)して、新しい組織を作成してもらいます。現在、Zilliz Cloudはユーザーによる手動での組織作成をサポートしていません。

- **リストに組織がない**

    - これは、アカウントが閉鎖された場合、またはすべての組織から脱退した場合に発生します。画面は次のようになります。

    ![サブスクリプション中に組織がない](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、次のことができます：

    - 新しい組織を作成します。

    - 他のユーザーに、あなたを組織に[招待](./organization-users#invite-a-user-to-your-organization)し、組織オーナーのロールを付与するよう依頼します。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us)すると、新しい組織を作成します。

