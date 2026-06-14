---
title: "AWS Marketplace での Zilliz Cloud 請求の分離 | Cloud"
slug: /separate-zilliz-cloud-billing-on-aws-marketplace
sidebar_key: separate-zilliz-cloud-billing-on-aws-marketplace
sidebar_label: "AWS Marketplace"
beta: FALSE
notebook: FALSE
description: "ビジネスユニット、チーム、ユースケース、アプリケーション、またはコストセンターごとに AWS Marketplace での Zilliz Cloud の請求を分離する必要がある場合、推奨されるパターンは、ビジネスユニットごとに 1 つの AWS メンバーアカウント、1 つの AWS Marketplace サブスクリプション、および 1 つの Zilliz Cloud 組織を使用することです。 | Cloud"
type: origin
token: V7nZwzmpFiOokGksfTqcAcjcnXh
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - aws
  - 使用
  - 請求の分離

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Zilliz Cloud の AWS Marketplace での請求の分離

ビジネスユニット、チーム、ユースケース、アプリケーション、またはコストセンターごとに Zilliz Cloud の AWS Marketplace での請求を分離する必要がある場合、推奨されるパターンは、ビジネスユニットごとに1つの AWS [メンバーアカウント](https://docs.aws.amazon.com/organizations/latest/userguide/orgs-manage_accounts_members.html)、1つの AWS Marketplace サブスクリプション、および1つの Zilliz Cloud 組織を使用することです。

AWS は請求ビューを提供します。Zilliz Cloud は[使用量](./analyze-cost)ビューを提供します。AWS 側での請求の分離には、ビジネスユニットごとに1つの Zilliz Cloud 組織を使用し、対応する AWS メンバーアカウントから購入した Marketplace サブスクリプションにバインドします。

## 概要\{#overview}

Zilliz Cloud の AWS Marketplace での請求を分離するには、各請求単位を1つの AWS メンバーアカウント、1つの Zilliz Cloud 用 AWS Marketplace サブスクリプション、および1つの Zilliz Cloud 組織にマッピングする必要があります。

この設定により、[AWS 請求 and Cost Management](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html) は選択した AWS メンバーアカウントの Marketplace 費用を表示します。統合請求では、組織は**管理アカウント**を通じて支払われる**1つの請求書**を受け取り、使用量とコストは各**メンバーアカウント**で追跡可能です。

![GvudwMSj7hDpbQbdIrqcGBbrn7e](https://zdoc-images.s3.us-west-2.amazonaws.com/GvudwMSj7hDpbQbdIrqcGBbrn7e.png)

この設定では:

- [AWS 組織 管理アカウント](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#account) は[統合請求書](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html)を受け取り、支払います。

- 各 AWS メンバーアカウントは、コスト追跡とコスト配分のために表示されたままになります。

- [AWS Marketplace サブスクリプション](https://docs.aws.amazon.com/marketplace/latest/buyerguide/buyer-managing-subscriptions.html)は、それを購入または承諾した AWS メンバーアカウントに属します。

- [プライベートオファー](https://docs.aws.amazon.com/marketplace/latest/buyerguide/private-offers-page.html) を使用する場合は、オファーがサブスクライブする AWS アカウントに拡張されるようにしてください。AWS 組織 と統合請求を使用するバイヤーの場合、AWS ではオファーの拡張方法と管理方法に応じて、管理アカウントまたはメンバーアカウントのいずれかからプライベートオファーを受け入れることができます。

- [プライベート Marketplace](https://docs.aws.amazon.com/marketplace/latest/buyerguide/buyer-private-marketplace.html) が有効になっている場合、メンバーアカウントがサブスクライブする前に、関連するアカウント、OU、または組織に対して製品の承認が必要になる場合があります。

以下は、3つの異なるチームの請求を分離する例です。

```plaintext
AWS Organizations management account / consolidated bill
+-- AWS member account: team-a
|   +-- AWS Marketplace SaaS subscription: Zilliz Cloud - team-a
|       +-- Zilliz organization: org-team-a
|           +-- Project: project-team-a
|               +-- Cluster(s)
|
+-- AWS member account: team-b
|   +-- AWS Marketplace SaaS subscription: Zilliz Cloud - team-b
|       +-- Zilliz organization: org-team-b
|           +-- Project: project-team-b
|               +-- Cluster(s)
|
+-- AWS member account: team-c
    +-- AWS Marketplace SaaS subscription: Zilliz Cloud - team-c
        +-- Zilliz organization: org-team-c
            +-- Project: project-team-c
                +-- Cluster(s)
```

<Admonition type="info" icon="📘" title="Note">

内部使用の分離のみが必要な場合は、1つの組織で複数のプロジェクトを使用するという、よりシンプルな代替手段があります。そのモデルでは、Azure Marketplaceの課金は1つのサブスクリプションにまとめられたままで、使用量の分割はZilliz Cloudの使用量分析でのみ確認できます。

</Admonition>

### 比較\{#comparison}

<table>
   <tr>
     <th><p>モデル</p></th>
     <th><p>AWS Marketplaceの課金を分離</p></th>
     <th><p>プロジェクトまたはチームごとのZilliz使用量を分離</p></th>
     <th><p>最適な用途</p></th>
   </tr>
   <tr>
     <td><p>事業単位ごとに1つの組織</p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>AWS側のコストをメンバーアカウントごとに分離する必要があるチーム。</p></td>
   </tr>
   <tr>
     <td><p>1つの組織で複数のプロジェクト</p></td>
     <td><p>いいえ</p></td>
     <td><p>はい</p></td>
     <td><p>内部使用の分割のみ</p></td>
   </tr>
</table>

## 複数組織のセットアップ\{#multi-organization-setup}

各事業単位が個別のAWS Marketplaceの請求を必要とする場合に、このモデルを使用します。

### 複数の組織を準備する\{#prepare-multiple-organizations}

新しいZilliz Cloudアカウントの登録により、自動的に1つのデフォルト組織が作成されます。

複数の組織を準備するには:

<Procedures>

1. [登録](./register-with-zilliz-cloud) して、異なる会社メールアカウントで個別のZilliz Cloudアカウントを作成するか、[Zilliz Cloudサポート](http://support.zilliz.com) チームに連絡して追加の組織を準備します。

1. 各事業単位が独自のZilliz Cloud組織を持っていることを確認します。

1. 必要なユーザーを各組織に[招待](./organization-users) します。

1. 各ターゲット組織で、請求オペレーターを[組織オーナー](./organization-users#organization-owner) または[組織の請求管理者](./organization-users#organization-billing-admin) として割り当てます。

</Procedures>

各組織は以下をそれぞれ持っています:

- 請求と支払い方法

- ユーザーとRBAC

- プロジェクト

- クラスター

- 使用量分析データ

### 各組織に1つのMarketplaceサブスクリプションをバインドする\{#bind-one-marketplace-subscription-to-each-organization}

各事業単位について:

<Procedures>

1. ターゲットの請求単位のAWSメンバーアカウントを使用して[AWS Marketplace](https://aws.amazon.com/marketplace) にサインインします。

1. Zilliz Cloudで、ターゲットの請求単位に対応するZilliz Cloud組織に移動します。

1. Zilliz Cloudの請求ページで、**+ 支払い方法を追加** をクリックし、次に **Marketplace** を選択します。**今すぐ購読** をクリックします。

    ![NCUmwUABRht89lbl0NKcBZ7on1e](https://zdoc-images.s3.us-west-2.amazonaws.com/NCUmwUABRht89lbl0NKcBZ7on1e.png)

1. AWS Marketplaceにリダイレクトされます。そこで購入を完了してください。

    詳細については、[AWS Marketplaceでの購読](./subscribe-on-aws-marketplace) を参照してください。

1. AWS Marketplaceで **アカウントを設定** をクリックした後、一致するZilliz Cloud組織を選択します。

1. 必要に応じて組織IDを確認します。

1. 認可を完了します。

</Procedures>

<Admonition type="info" icon="📘" title="Note">

- 各Marketplaceサブスクリプションは、1つのZilliz Cloud組織にのみリンクできます。

- MarketplaceサブスクリプションをZilliz Cloud組織にバインドするには、その組織で組織オーナーまたは組織の請求管理者である必要があります。

- 購入を完了するAWSユーザーまたはロールには、AWS Marketplace製品を購読する権限が必要です。AWSは、[`AWSMarketplaceManageSubscriptions`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSMarketplaceManageSubscriptions.html) や [`AWSMarketplaceFullAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSMarketplaceFullAccess.html) などのMarketplace管理ポリシーを提供しています。

</Admonition>

### AWS請求書を受け取り、料金を個別に表示する\{#receive-aws-invoices-and-view-charges-separately}

- 請求書はAWSを通じて発行され、Zilliz Cloudを通じては発行されません。

- [AWS 請求 and Cost Management](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html) には、各AWSメンバーアカウントのMarketplace料金が表示されます。

- メンバーアカウントがAWS 組織内にある場合、管理アカウントは[統合請求書](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html) を受け取り、メンバーアカウント間の料金を追跡できます。

- 各事業単位のZilliz Cloud支出は、独自のAWS Marketplaceサブスクリプションの下に表示されます。

- AWS Marketplaceの[サブスクリプション詳細](https://docs.aws.amazon.com/marketplace/latest/buyerguide/buyer-managing-subscriptions.html) には、製品、ベンダー、契約ID、契約ステータス、料金サマリー、該当する場合は発注書の詳細が含まれます。

- AWS側のコスト配分は、AWSアカウント構造、[コスト配分タグ](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html)、[コストカテゴリ](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-cost-categories.html)、および[発注書](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-purchase-orders.html) モデルに従うことができます。

- 請求書の表示は、引き続きお客様のAWSアカウント、AWS 組織、請求、およびMarketplace契約の設定に依存します。

### 各組織で使用量を個別に確認する\{#check-usage-separately-in-each-organization}

各Zilliz Cloud組織内で、Zilliz Cloudの[使用量](./analyze-cost) 分析を使用して、以下でドリルダウンします:

- プロジェクト

- クラスター

- 時間範囲

- コストタイプ

- リージョン

これにより、AWSの請求には表示されない詳細な使用量ビューが提供されます。

<Admonition type="info" icon="📘" title="Note">

- 請求されたMarketplace料金と請求書については、AWS 請求 and Cost Managementを使用します。

- 各組織内のプロジェクトレベルおよびクラスターレベルの使用量については、Zilliz Cloudの使用量ページを使用します。

</Admonition>

### AWSの請求とZilliz Cloudの使用量を調整する\{#reconcile-aws-billing-and-zilliz-cloud-usage}

次のコンポーネントを使用して、AWSの請求ビューとZilliz Cloudの使用量ビューを調整します:

- AWS 組織管理アカウントID

- AWSメンバーアカウントID

- AWS Marketplaceサブスクリプションまたは契約ID

- Zilliz Cloud組織名と組織ID

- Zilliz Cloudプロジェクト名とプロジェクトID

- Zilliz Cloudクラスター名とクラスターID

## 考慮事項\{#considerations}

- AWS側のMarketplace支出をチームごとに分離する必要がある場合は、事業単位ごとに1つのAWSメンバーアカウント、1つのAWS Marketplaceサブスクリプション、および1つのZilliz Cloud組織を使用します。

- 内部使用の分割のみが必要な場合は、1つのZilliz Cloud組織で複数のプロジェクトを使用する方がシンプルですが、AWS Marketplaceの料金は分離されません。

- 個別のAWS請求書PDFは、AWSアカウント構造、AWS 組織の設定、請求構成、およびMarketplace契約条件に依存します。Zilliz Cloudアーキテクチャだけでは保証されません。

- 確約消費、プライベートオファー、発注書、または複数のMarketplaceサブスクリプションにわたる共有コミットメントなどの商取引条件は、AWSセールスまたはMarketplace 運用に確認する必要があります。

