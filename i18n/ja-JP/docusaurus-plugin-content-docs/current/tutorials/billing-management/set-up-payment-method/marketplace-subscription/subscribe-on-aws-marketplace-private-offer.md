---
title: "AWS Marketplace のプライベートオファーを購読 | Cloud"
slug: /subscribe-on-aws-marketplace-private-offer
sidebar_key: subscribe-on-aws-marketplace-private-offer
sidebar_label: "AWS Marketplace (プライベートオファー)"
beta: FALSE
notebook: FALSE
description: "AWS Marketplace のプライベートオファーは、Zilliz が組織向けに作成したカスタム購入オプションです。パブリックオファーは AWS Marketplace の商品ページに表示される標準価格と条件を使用しますが、プライベートオファーには交渉価格、カスタム契約条件、特定の契約期間、定義された支払いスケジュールを含めることができます。 | Cloud"
type: origin
token: QGVxwmnGTidbjtk1LcYcEfqbnOe
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - aws
  - プライベートオファー

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# AWS Marketplace でのプライベートオファーの購読

AWS Marketplace のプライベートオファーは、Zilliz が組織向けに作成したカスタム購入オプションです。AWS Marketplace の製品ページに表示される標準的な料金と条件を使用するパブリックオファーとは異なり、プライベートオファーには、交渉済みの料金、カスタム契約条件、特定の契約期間、定義された支払スケジュールを含めることができます。

組織に割引料金、確約支出、エンタープライズ調達条件、特定の AWS アカウントに紐づく契約などのカスタム商用条件が必要な場合は、プライベートオファーを利用してください。プライベートオファーは、Zilliz がオファーに含めた AWS アカウント ID にのみ表示されます。

Zilliz Cloud のプライベートオファーが必要な場合は、[Zilliz の担当営業担当者にお問い合わせください](https://zilliz.com/contact-sales)。オファーを受け取るべき AWS アカウント ID、希望する契約期間、使用要件、および組織に含める必要のある調達または請求の要件を提供してください。

## 始める前に\{#before-you-start}

AWS Marketplace でプライベートオファーを購読する前に、次の点を確認してください。

- Zilliz Cloud アカウントと[組織](./organizations)があること。

- プライベートオファーを受け取り、承諾するべき [AWS アカウント ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console-account-id.html) を持っていること。

- AWS Marketplace 製品を購読する権限（`AWSMarketplaceManageSubscriptions` 管理ポリシーなど）があること。

- Zilliz Cloud 上で組織オーナーまたは組織の請求管理者であること。Marketplace サブスクリプションを Zilliz Cloud 組織にリンクするには、これらの権限が必要です。

## プライベートオファーを購読する\{#subscribe-to-a-private-offer}

以下は、購読プロセスの概要です。

![I0BNwWPPnhoWZrbMZWnccBE1nYe](https://zdoc-images.s3.us-west-2.amazonaws.com/I0BNwWPPnhoWZrbMZWnccBE1nYe.png)

以下の詳細なステップバイステップガイドに従って、AWS Marketplace でプライベートオファーを購読できます。

<Procedures>

1.  プライベートオファーについて Zilliz の担当営業担当者に連絡します。

    [Zilliz の担当営業担当者に連絡する](https://zilliz.com/contact-sales)際、プライベートオファーを受け取るために AWS アカウント ID を提供する必要があります。

1. メールの受信箱を確認します。

    1. AWS Marketplace から件名が **You have a new プライベート Offer** のメールを探します。メールには、オファーにアクセスできる AWS アカウント ID が含まれています。

    1. メール内の **AWS Marketplace console private offers page** リンクをクリックします。プロンプトが表示されたら、メールに示されているものと同じアカウント ID で AWS にサインインします。そうしないと、プライベートオファーを表示できない場合があります。

        ![AAEEwdD8zhamcKbFjB8cr1j7nFc](https://zdoc-images.s3.us-west-2.amazonaws.com/AAEEwdD8zhamcKbFjB8cr1j7nFc.png)

        <Admonition type="info" icon="📘" title="Note">

        オファーは有効期限前に承諾する必要があります。オファーが期限切れの場合は、担当営業担当者に連絡してください。

        </Admonition>

1. オファーの詳細を確認し、オファーを承諾します。

    請求書に発注書 (PO) 番号を含めるには、**Add a purchase order** を選択し、必要な情報を入力します。発注書が不要な場合は、**No purchase order** を選択します。

    **Accept offer** をクリックします。

    ![Xn6qwEcmihhj0LbwOXicnRgMnCh](https://zdoc-images.s3.us-west-2.amazonaws.com/Xn6qwEcmihhj0LbwOXicnRgMnCh.png)

1. リクエストが完了するのを待ちます。

    AWS Marketplace にメッセージ "Y*our request is in progress, this will take a few minutes. Don't refresh or close this page. Meanwhile, you can set up your account on the vendor's website.*" が表示されます。

    ![TrnVwl8sHhW8yLbHI0bcVMO7ntf](https://zdoc-images.s3.us-west-2.amazonaws.com/TrnVwl8sHhW8yLbHI0bcVMO7ntf.png)

1. アカウントを設定します。

    リクエストが完了すると、AWS Marketplace ページの上部に緑色の確認バナーが表示されます。

    **Set up your account** をクリックします。Zilliz Cloud にリダイレクトされます。

    <Admonition type="info" icon="📘" title="Note">

    この手順を完了する必要があります。完了しない場合、プライベートオファーのサブスクリプションはどの Zilliz Cloud 組織にもリンクされません。

    </Admonition>

    ![PJGGwBu6nh8lSQbZK1ac2wfhn0d](https://zdoc-images.s3.us-west-2.amazonaws.com/PJGGwBu6nh8lSQbZK1ac2wfhn0d.png)

1. Marketplace サブスクリプションを Zilliz Cloud 組織にリンクします。

    1. Zilliz Cloud アカウントにログインします。

        ![Q6PDbtOwioM06kxe46ecIAKCnMh](https://zdoc-images.s3.us-west-2.amazonaws.com/q6pdbtowiom06kxe46eciakcnmh.png "Q6PDbtOwioM06kxe46ecIAKCnMh")

    1. Marketplace サブスクリプションにリンクする Zilliz Cloud 組織を選択します。

        選択できる組織がない場合、または質問がある場合は、[Zilliz サポート](http://support.zilliz.com) にお問い合わせください。

        ![HvVkbNvp9oe5wIxkdWvcDMWJnNc](https://zdoc-images.s3.us-west-2.amazonaws.com/hvvkbnvp9oe5wixkdwvcdmwjnnc.png "HvVkbNvp9oe5wIxkdWvcDMWJnNc")

    1. プロセスが完了すると、次の確認ウィンドウが表示されます。

        ![REvibD9Nvog0X9xsNGMcwrvynTg](https://zdoc-images.s3.us-west-2.amazonaws.com/revibd9nvog0x9xsngmcwrvyntg.png "REvibD9Nvog0X9xsNGMcwrvynTg")

    1. Zilliz Cloud の **請求** ページで、**支払い方法** セクションを見つけます。ID アイコンにカーソルを合わせることで、サブスクリプションを確認できます。

        ![NjQObiKEco940qxMYSpc8g0mnHb](https://zdoc-images.s3.us-west-2.amazonaws.com/njqobikeco940qxmyspc8g0mnhb.png "NjQObiKEco940qxMYSpc8g0mnHb")

</Procedures>

## プライベートオファーを更新する\{#renew-your-private-offer}

プライベートオファーが期限に近づくと、Zilliz から更新用の新しいプライベートオファーリンクが送信されます。更新プロセスについて質問がある場合は、担当営業担当者に連絡してください。

<Admonition type="info" icon="📘" title="Note">

AWS Marketplace では、更新は新しいプライベートオファーを承諾することとして機能します。承諾後、新しいオファーが自動的に以前のオファーに取って代わります。新しいオファーを再び Zilliz Cloud 組織にリンクする必要があります。

</Admonition>

以下は、更新プロセスの概要です。

![GKcDwCIv4hVc12bEFPvcXshQniR](https://zdoc-images.s3.us-west-2.amazonaws.com/GKcDwCIv4hVc12bEFPvcXshQniR.png)

以下の詳細なステップバイステップガイドに従って、AWS Marketplace でプライベートオファーを購読できます。

<Procedures>

1. メールの受信箱を確認します。

    1. AWS Marketplace から件名が **You have a new プライベート Offer** のメールを探します。メールには、オファーにアクセスできる AWS アカウント ID が含まれています。

    1. メール内の **AWS Marketplace console private offers page** リンクをクリックします。プロンプトが表示されたら、メールに示されているものと同じアカウント ID で AWS にサインインします。

        ![GvHEwgn55hnE1fbRg1Mcg8UEnOc](https://zdoc-images.s3.us-west-2.amazonaws.com/GvHEwgn55hnE1fbRg1Mcg8UEnOc.png)

1. AWS Marketplace ページで、**Your offers** セクションに移動し、正しいオファーが選択されていることを確認します。**Offer ID** がメールに表示されている ID と一致している必要があります。

    "**Accepting this offer replaces your current agreement**" というプロンプトが表示されます。

    ![NLAjwwr9ahgutebTFJKcVyntnxb](https://zdoc-images.s3.us-west-2.amazonaws.com/NLAjwwr9ahgutebTFJKcVyntnxb.png)

1. オファーの詳細を確認し、オファーを承諾します。

    請求書に発注書 (PO) 番号を含めるには、**Add a purchase order** を選択し、必要な情報を入力します。発注書が不要な場合は、**No purchase order** を選択します。

    **Accept offer** をクリックします。

    ![YHQxwYXemhfrvubRftzcjBSPn7e](https://zdoc-images.s3.us-west-2.amazonaws.com/YHQxwYXemhfrvubRftzcjBSPn7e.png)

1. リクエストが完了するのを待ちます。

    AWS Marketplace にメッセージ "*Your request is in progress, this will take a few minutes. Don't refresh or close this page. Meanwhile, you can set up your account on the vendor's website.*" が表示されます。

    <Admonition type="info" icon="📘" title="Note">

    この時点では **"Set up your account"** をクリック**しない**でください。リクエストが完了するまで待ってください。

    リクエストが完了する前にクリックすると、オファーを Zilliz Cloud 組織にリンクする際に「利用可能な組織がありません」と表示される場合があります。これは、以前のプライベートオファーがまだリンク解除されていないために発生します。

    </Admonition>

1. アカウントを設定します。

    リクエストが完了すると、AWS Marketplace ページの上部に緑色の確認バナーが表示されます。

    **Set up your account** をクリックします。Zilliz Cloud にリダイレクトされます。

    <Admonition type="info" icon="📘" title="Note">

    この手順を完了する必要があります。完了しない場合、プライベートオファーのサブスクリプションはどの Zilliz Cloud 組織にもリンクされません。

    </Admonition>

    ![SEMzwPBZNh5ejWbOOdAcmPJunRf](https://zdoc-images.s3.us-west-2.amazonaws.com/SEMzwPBZNh5ejWbOOdAcmPJunRf.png)

1. Marketplace サブスクリプションを Zilliz Cloud 組織にリンクします。

    1. Zilliz Cloud アカウントにログインします。

        ![U3fHb1ZF1o9AWnxYyztcTcpBnXe](https://zdoc-images.s3.us-west-2.amazonaws.com/u3fhb1zf1o9awnxyyztctcpbnxe.png "U3fHb1ZF1o9AWnxYyztcTcpBnXe")

    1. Marketplace サブスクリプションにリンクする Zilliz Cloud 組織を選択します。

        選択できる組織がない場合、または質問がある場合は、[Zilliz サポート](http://support.zilliz.com) にお問い合わせください。

        ![KgGJbyKCsoT15cxTzgDcsadWnHc](https://zdoc-images.s3.us-west-2.amazonaws.com/kggjbykcsot15cxtzgdcsadwnhc.png "KgGJbyKCsoT15cxTzgDcsadWnHc")

    1. プロセスが完了すると、次の確認ウィンドウが表示されます。

        ![Rbp1bcYjJoFfyjxf2s7cLO8KnQh](https://zdoc-images.s3.us-west-2.amazonaws.com/rbp1bcyjjoffyjxf2s7clo8knqh.png "Rbp1bcYjJoFfyjxf2s7cLO8KnQh")

    1. Zilliz Cloud の **請求** ページで、**支払い方法** セクションを見つけます。ID アイコンにカーソルを合わせることで、サブスクリプションを確認できます。

        ![G15cbgalfoDgRExOSBWcfbzlnxd](https://zdoc-images.s3.us-west-2.amazonaws.com/g15cbgalfodgrexosbwcfbzlnxd.png "G15cbgalfoDgRExOSBWcfbzlnxd")

</Procedures>

## パブリックオファーからプライベートオファーに切り替える\{#switch-from-a-public-offer-to-a-private-offer}

[プライベートオファーの更新](./subscribe-on-aws-marketplace-private-offer#renew-your-private-offer)と同様に、パブリックオファーからプライベートオファーに切り替えるには、新しいプライベートオファーを承諾する必要があります。承諾後、新しいプライベートオファーが自動的に以前のパブリックオファーに取って代わります。新しいオファーを再び Zilliz Cloud 組織にリンクする必要があります。

## プライベートオファーのサブスクリプションをキャンセルする\{#cancel-private-offer-subscription}

プライベートオファーのサブスクリプションは AWS Marketplace からキャンセルできます。

<Admonition type="info" icon="📘" title="Note">

サブスクリプションをキャンセルすると、組織は Zilliz Cloud の高度な機能にアクセスできなくなります。組織に残りのクレジットがない場合、またはすべてのクレジットが期限切れになった場合、組織は直ちに凍結されます。

</Admonition>

<Procedures>

1. プライベートオファーを承諾した AWS アカウントにサインインします。

1. AWS Marketplace コンソールを開き、**Manage subscriptions** に移動します。

1. Zilliz Cloud サブスクリプションを見つけ、契約 ID をクリックします。

1. **Agreement** の下で、**Actions** リストを開き、**サブスクリプションをキャンセル** を選択します。

1. **サブスクリプションをキャンセル** ダイアログボックスに **confirm** と入力し、**Yes, cancel subscription** を選択します。

</Procedures>

詳細については、[製品サブスクリプションのキャンセル](https://docs.aws.amazon.com/marketplace/latest/buyerguide/cancel-subscription.html) を参照してください。

## FAQ\{#faq}

**プライベートオファーが期限切れになり、更新されないとどうなりますか？**

プライベートオファーが期限切れになり更新されない場合、AWS Marketplace サブスクリプションはプライベートオファーの条件を失います。Zilliz Cloud 組織に有効な支払い方法や残りのクレジットがない場合、高度な機能へのアクセスが無効になり、組織は凍結されます。

**Marketplace サブスクリプションを Zilliz Cloud にリンクする際に、利用可能な組織がない場合はどうすればよいですか？**

考えられる理由はいくつかあります。

- **権限が不十分です**

    これは、十分な権限がない場合に発生する可能性があります。利用できない組織の横に **"権限が不十分です"** タグが表示されます。

    ![insufficient-permission-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    組織を Marketplace サブスクリプションにリンクするには、**組織オーナー** または **組織の請求管理者** である必要があります。しかし、組織メンバーのみである場合は、必要な権限がありません。組織オーナーに支援を依頼してください。

- **すべての組織がすでに Marketplace サブスクリプションに正常にリンクされている**

    これは、すべての組織がすでに Marketplace サブスクリプションにリンクされている場合に発生する可能性があります。利用できない組織の横に **"マーケットプレイスにリンク済み"** タグが表示されます。

    ![marketplace-already-linked-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存の Marketplace サブスクリプションを更新する必要がある場合は、まず組織の現在のサブスクリプションをリンク解除してから、新しいサブスクリプションを設定してください。

    - 異なる Marketplace サブスクリプションに複数の組織が必要な場合は、次のことができます。

        - 新しい Zilliz Cloud アカウントを[登録](./register-with-zilliz-cloud)して新しい組織を作成します。次に、組織オーナーを新しい組織に[招待](./organization-users#invite-a-user-to-your-organization)します。この組織オーナーは複数の組織に所属することになり、各組織に異なる Marketplace サブスクリプションを設定できます。

        - [サポートチケットを作成](http://support.zilliz.com)して、新しい組織を作成してもらいます。現在、Zilliz Cloud はユーザーによる手動での組織作成をサポートしていません。

- **リストに組織がない**

    - これは、アカウントが閉鎖されたか、すべての組織を脱退した場合に発生する可能性があります。UI は次のようになります。

    ![no-organization-during-subcription](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、次のことができます。

    - 新しい組織を作成します。

    - 他のユーザーに招待してもらい、その組織に参加して組織オーナーの役割を付与してもらうよう依頼します。[招待](./organization-users#invite-a-user-to-your-organization) を参照してください。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us)すると、新しい組織を作成します。

