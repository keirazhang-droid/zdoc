---
title: "Microsoft MarketplaceでのZilliz Cloud請求の分離 | Cloud"
slug: /separate-zilliz-cloud-billing-on-azure-marketplace
sidebar_key: separate-zilliz-cloud-billing-on-azure-marketplace
sidebar_label: "Microsoft Marketplace"
beta: FALSE
notebook: FALSE
description: "ビジネスユニット、チーム、ユースケース、アプリケーション、またはコストセンターごとにMicrosoft MarketplaceでのZilliz Cloud請求を分離する必要がある場合、推奨されるパターンは、ビジネスユニットごとに1つのAzureサブスクリプション、1つのMicrosoft Marketplaceサブスクリプション、および1つのZilliz Cloud組織を使用することです。 | Cloud"
type: origin
token: RLu1wO0FpiisJxkkViQcq039nff
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - Azure
  - Microsoft
  - 使用
  - 請求の分離

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Microsoft Marketplace での Zilliz Cloud 請求の分割

ビジネスユニット、チーム、ユースケース、アプリケーション、またはコストセンターごとに [Microsoft Marketplace](https://marketplace.microsoft.com/en-us/) での Zilliz Cloud 請求を分割する必要がある場合、推奨されるパターンは、ビジネスユニットごとに 1 つの Azure サブスクリプション、1 つの Microsoft Marketplace サブスクリプション、および 1 つの Zilliz Cloud 組織を使用することです。

Microsoft は請求ビューを提供します。Zilliz Cloud は [使用状況](./analyze-cost) ビューを提供します。Microsoft 側での請求分割には、ビジネスユニットごとに 1 つの組織を使用してください。

## 概要\{#overview}

Microsoft Marketplace で Zilliz Cloud の請求を分割するには、各請求単位を 1 つの Microsoft サブスクリプション、1 つの Zilliz Cloud 用 Microsoft Marketplace サブスクリプション、および 1 つの Zilliz Cloud 組織にマッピングする必要があります。

![AaIlw5K0ThgXP7bBjGvczyIZnpg](https://zdoc-images.s3.us-west-2.amazonaws.com/AaIlw5K0ThgXP7bBjGvczyIZnpg.png)

この設定により：

- [Microsoft Cost Management ](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/overview-cost-management)は、選択した Microsoft サブスクリプションの下で Marketplace の料金を表示します。

- 各 Microsoft Marketplace サブスクリプションは、1 つの Zilliz Cloud 組織にマッピングされます。

- Zilliz Cloud は、その組織内でプロジェクトレベルとクラスターレベルの使用状況のドリルダウンを提供します。

以下は、3 つの異なるチームの請求を分割する例です。

```plaintext
  Microsoft billing account
  +-- Microsoft subscription: team-a
  |   +-- Microsoft Marketplace SaaS subscription: Zilliz Cloud - team-a
  |       +-- Zilliz organization: org-team-a
  |           +-- Project: project-team-a
  |               +-- Cluster(s)
  +-- Microsoft subscription: team-b
  |   +-- Microsoft Marketplace SaaS subscription: Zilliz Cloud - team-b
  |       +-- Zilliz organization: org-team-b
  |           +-- Project: project-team-b
  |               +-- Cluster(s)
  +-- Microsoft subscription: team-c
      +-- Microsoft Marketplace SaaS subscription: Zilliz Cloud - team-c
          +-- Zilliz organization: org-team-c
              +-- Project: project-team-c
                  +-- Cluster(s)
```

<Admonition type="info" icon="📘" title="Note">

内部使用量の分割のみが必要な場合は、1つの組織で複数のプロジェクトを使用するというより簡単な方法もあります。そのモデルでは、Microsoft Marketplace の料金は1つのサブスクリプションでまとめて請求され、使用量の分割は Zilliz Cloud の使用量分析でのみ表示されます。

</Admonition>

### 比較\{#comparison}

<table>
   <tr>
     <th><p>モデル</p></th>
     <th><p>Microsoft Marketplace の料金を分離</p></th>
     <th><p>プロジェクトまたはチームごとの Zilliz 使用量を分離</p></th>
     <th><p>最適な用途</p></th>
   </tr>
   <tr>
     <td><p>ビジネスユニットごとに1つの組織</p></td>
     <td><p>あり</p></td>
     <td><p>あり</p></td>
     <td><p>個別の Azure 請求が必要なチームまたはコストセンター</p></td>
   </tr>
   <tr>
     <td><p>1つの組織で複数のプロジェクト</p></td>
     <td><p>なし</p></td>
     <td><p>あり</p></td>
     <td><p>内部使用量の分割のみ</p></td>
   </tr>
</table>

## マルチ組織のセットアップ\{#multi-organization-setup}

各ビジネスユニットが個別の Microsoft Marketplace 請求を必要とする場合は、このモデルを使用します。

### 複数の組織を準備する\{#prepare-multiple-organizations}

新しい Zilliz Cloud アカウントの登録により、デフォルトの組織が自動的に1つ作成されます。

複数の組織を準備するには:

<Procedures>

1. 個別の会社メールアカウントを使用して別々の Zilliz Cloud アカウントを[登録](./register-with-zilliz-cloud)するか、[Zilliz Cloud サポート](http://support.zilliz.com)チームに連絡して追加の組織を準備します。

1. 各ビジネスユニットが独自の Zilliz Cloud 組織を持っていることを確認します。

1. 必要なユーザーを各組織に[招待](./organization-users)します。

1. 各対象組織で、請求オペレーターを[組織オーナー](./organization-users#organization-owner)または[組織の請求管理者](./organization-users#organization-billing-admin)として割り当てます。

</Procedures>

各組織には独自の次のものがあります:

- 請求と支払い方法

- ユーザーと RBAC

- プロジェクト

- クラスター

- 使用量分析データ

### 各組織に1つの Marketplace サブスクリプションをバインドする\{#bind-one-marketplace-subscription-to-each-organization}

各ビジネスユニットについて:

<Procedures>

1. Zilliz Cloud 上で、対象の請求ユニットに対応する Zilliz Cloud 組織に移動します。

1. Zilliz Cloud の請求ページで、**+ 支払い方法を追加** をクリックし、次に **Marketplace** を選択します。**今すぐ購読** をクリックします。

    ![VI6ew0JUHh3u1Yb5lrRcLhrxn9b](https://zdoc-images.s3.us-west-2.amazonaws.com/VI6ew0JUHh3u1Yb5lrRcLhrxn9b.png)

1. Microsoft Marketplace にリダイレクトされます。そこで購入を完了します。

    詳細については、[Azure Marketplace での購読](./subscribe-on-azure-marketplace#subscribe-on-azure-marketplace) を参照してください。

1. **今すぐアカウントを構成** をクリックした後、一致する Zilliz Cloud 組織を選択します。

1. 必要に応じて組織 ID を確認します。

1. 認証を完了します。

</Procedures>

<Admonition type="info" icon="📘" title="Note">

- 各 Marketplace サブスクリプションは、1つの Zilliz Cloud 組織にのみリンクできます。

- Marketplace サブスクリプションを Zilliz Cloud 組織にバインドするには、その組織の組織オーナーまたは組織の請求管理者である必要があります。

</Admonition>

### Microsoft の請求書を受け取り、料金を個別に表示する\{#receive-microsoft-invoices-and-view-charges-separately}

- 請求書は Zilliz Cloud ではなく Microsoft を通じて発行されます。

- [Microsoft Cost Management](https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu) には、各 Microsoft サブスクリプションの Marketplace 料金が表示されます。

- 各ビジネスユニットの Zilliz Cloud 支出は、その独自の Microsoft Marketplace サブスクリプションの下に表示されます。

- Microsoft 側の[コスト配分](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-allocation-introduction)は、Microsoft サブスクリプション、リソースグループ、タグモデルに従うことができます。

- [請求書](https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-invoice)の表示は、Microsoft の請求アカウント設定に依存します。

### 各組織で使用量を個別に確認する\{#check-usage-separately-in-each-organization}

各 Zilliz Cloud 組織内で、Zilliz Cloud の[使用量](./analyze-cost)分析を使用して、以下の項目でドリルダウンします:

- プロジェクト

- クラスター

- 時間範囲

- コストタイプ

- リージョン

これにより、Microsoft の請求では表示されない詳細な使用量ビューが提供されます。

<Admonition type="info" icon="📘" title="Note">

- 請求された Marketplace 料金と請求書については、Microsoft Cost Management を使用します。

- 各組織内のプロジェクトレベルおよびクラスターレベルの使用量については、Zilliz Cloud の使用量ページを使用します。

</Admonition>

### Microsoft の請求と Zilliz Cloud の使用量を調整する\{#reconcile-microsoft-billing-and-zilliz-cloud-usage}

Microsoft の請求ビューと Zilliz Cloud の使用量ビューを調整するには、次のコンポーネントを使用します:

- [Microsoft サブスクリプション](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/resource-org-subscriptions)

- Microsoft Marketplace サブスクリプション

- Zilliz Cloud 組織名と組織 ID

- Zilliz Cloud プロジェクト名とプロジェクト ID

- Zilliz Cloud クラスター名とクラスター ID

## 考慮事項\{#considerations}

- Microsoft 側の Marketplace 支出をチームごとに分離する必要がある場合は、ビジネスユニットごとに1つの Microsoft Marketplace サブスクリプションと1つの Zilliz Cloud 組織を使用します。

- 内部使用量の分割のみが必要な場合、1つの組織で複数のプロジェクトを使用する方が簡単ですが、Microsoft Marketplace の料金は分離されません。

- 個別の Microsoft 請求書 PDF は Microsoft の請求アカウントタイプに依存し、Zilliz Cloud のアーキテクチャのみでは保証されません。

- 確約支出、プライベートオファー、または複数の Marketplace サブスクリプションにわたる共有コミットメントなどの商用条件は、Microsoft の営業または Marketplace 運用 に確認する必要があります。

