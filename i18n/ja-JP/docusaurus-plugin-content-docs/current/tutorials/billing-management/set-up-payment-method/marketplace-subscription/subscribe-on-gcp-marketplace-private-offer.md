---
title: "Google Cloud Marketplace のプライベートオファーを購読 | Cloud"
slug: /subscribe-on-gcp-marketplace-private-offer
sidebar_key: subscribe-on-gcp-marketplace-private-offer
sidebar_label: "Google Cloud Marketplace (プライベートオファー)"
beta: FALSE
notebook: FALSE
description: "Google Cloud Marketplace のプライベートオファーは、Zilliz が組織向けに作成したカスタム購入オプションです。Google Cloud Marketplace の商品ページに表示される標準の価格と条件を使用するパブリックオファーとは異なり、プライベートオファーには交渉価格、カスタム契約条件、特定の契約期間、定義された支払いスケジュールを含めることができます。 | Cloud"
type: origin
token: Fd8EwsD0JiIt98kmps4c5wGlnrh
sidebar_position: 5
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - Google Cloud
  - パブリックオファー

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# Google Cloud Marketplace でのプライベートオファーの購読

Google Cloud Marketplace のプライベートオファーは、Zilliz がお客様の組織向けに作成するカスタム購入オプションです。Google Cloud Marketplace の製品ページに表示される標準的な料金と条件を使用するパブリックオファーとは異なり、プライベートオファーには、交渉された価格、カスタム契約条件、特定の契約期間、定義された支払いスケジュールを含めることができます。

Zilliz Cloud のプライベートオファーが必要な場合は、[Zilliz のアカウントエグゼクティブにお問い合わせください](https://zilliz.com/contact-sales)。その際、Google Cloud 請求 アカウント ID、オファーを受け取るメールアドレス、希望する契約期間、使用要件、および組織に含める必要がある調達または請求に関する要件を提供してください。

このガイドでは、Google Cloud Marketplace で Zilliz Cloud のプライベートオファーを受け入れ、Zilliz Cloud 組織にリンクする方法について説明します。

## 始める前に\{#before-you-start}

プライベートオファーを受け入れる前に、以下を確認してください。

- 有料の Google Cloud 請求 アカウントを持っていること。無料トライアルの Google Cloud 請求 アカウントは使用できません。

- Cloud 請求 アカウントに対して、以下のいずれかの必要な権限を持っていること。

    - 請求 アカウント Administrator（`roles/billing.admin`）

    - 請求 アカウント User（`roles/billing.user`）および Consumer Procurement Order Administrator（`roles/consumerprocurement.orderAdmin`）

    必要な権限がない場合は、請求管理者istrator または Organization Administrator にアクセス権を付与してもらうか、代理でオファーを受け入れてもらうよう依頼してください。

- Zilliz Cloud で組織オーナーまたは組織の請求管理者であること。Marketplace サブスクリプションを Zilliz Cloud 組織にリンクするには、これらの権限が必要です。

## プライベートオファーを購読する\{#subscribe-to-a-private-offer}

以下は、購読プロセスの概要です。

![YSY9wG2TNhNlvMbFCZ9cLrIDnDh](https://zdoc-images.s3.us-west-2.amazonaws.com/YSY9wG2TNhNlvMbFCZ9cLrIDnDh.png)

以下の詳細なステップバイステップガイドに従って、Google Cloud Marketplace でプライベートオファーを購読できます。

<Procedures>

1. プライベートオファーについて Zilliz のアカウントエグゼクティブに連絡する。

    [Zilliz のアカウントエグゼクティブにお問い合わせ](https://zilliz.com/contact-sales)の際に、[Google Cloud 請求 アカウント ID](https://docs.cloud.google.com/billing/docs/how-to/find-billing-account-id) と、プライベートオファーを受け取るメールアドレスを提供する必要があります。

1. メールの受信トレイを確認する。

    Google Cloud Marketplace から件名 **New プライベート Offer from Zilliz** のメールを探します。メール内の **Review Offer** ボタンをクリックします。

    ![Oawqwr3rDheYWibpPwQclqh0n3d](https://zdoc-images.s3.us-west-2.amazonaws.com/Oawqwr3rDheYWibpPwQclqh0n3d.png)

    <Admonition type="info" icon="📘" title="Note">

    オファーは有効期限前に受け入れる必要があります。オファーが有効期限切れになった場合は、アカウントエグゼクティブに連絡してください。

    </Admonition>

1. オファーの詳細を確認し、受け入れる。

    ![NGJ1w2fVKh9ED1bMqK4cuzq2n5w](https://zdoc-images.s3.us-west-2.amazonaws.com/NGJ1w2fVKh9ED1bMqK4cuzq2n5w.png)

1. Zilliz にサインアップする。

    オファーの購入が完了すると、ページに **Accepted! Now sign up with Zilliz** というタイトルのダイアログボックスが表示されます。

    **Sign up** をクリックします。Zilliz Cloud にリダイレクトされます。

    <Admonition type="info" icon="📘" title="Note">

    この手順を完了する必要があります。そうしないと、プライベートオファーのサブスクリプションがどの Zilliz Cloud 組織にもリンクされません。

    </Admonition>

    ![IOkkwz2A6hexfnbiBBfcGGmNnxc](https://zdoc-images.s3.us-west-2.amazonaws.com/IOkkwz2A6hexfnbiBBfcGGmNnxc.png)

1. Marketplace サブスクリプションを Zilliz Cloud 組織にリンクする。

    1. Zilliz Cloud アカウントにログインします。

        ![WZuibFtHLofsE5xOfTPccb4Xnxe](https://zdoc-images.s3.us-west-2.amazonaws.com/wzuibfthlofse5xoftpccb4xnxe.png "WZuibFtHLofsE5xOfTPccb4Xnxe")

    1. Marketplace サブスクリプションにリンクする Zilliz Cloud 組織を選択します。

        選択可能な組織がない場合、または質問がある場合は、[Zilliz Support](http://support.zilliz.com) にお問い合わせください。

        ![EGjCbIHRGoDylPxCNQdc4YT6nTd](https://zdoc-images.s3.us-west-2.amazonaws.com/egjcbihrgodylpxcnqdc4yt6ntd.png "EGjCbIHRGoDylPxCNQdc4YT6nTd")

    1. プロセスが完了すると、次の確認ウィンドウが表示されます。

        ![Hcy6bjddpoGiJfxszMBccAalnoe](https://zdoc-images.s3.us-west-2.amazonaws.com/hcy6bjddpogijfxszmbccaalnoe.png "Hcy6bjddpoGiJfxszMBccAalnoe")

    1. Zilliz Cloud の **請求** ページで、**支払い 方法** セクションを見つけます。ID アイコンにカーソルを合わせると、サブスクリプションを確認できます。

        ![XoiTbm6HzoZMCMxCttVco12GnAn](https://zdoc-images.s3.us-west-2.amazonaws.com/xoitbm6hzozmcmxcttvco12gnan.png "XoiTbm6HzoZMCMxCttVco12GnAn")

</Procedures>

## プライベートオファーを更新する\{#renew-your-private-offer}

プライベートオファーの有効期限が近づくと、Zilliz から新しいプライベートオファーリンクが更新用に送信されます。更新プロセスについて質問がある場合は、アカウントエグゼクティブに連絡してください。

<Admonition type="info" icon="📘" title="Note">

Google Cloud Marketplace では、更新は既存のプライベートオファー注文で処理されます。更新が有効になると、現在のプライベートオファーサブスクリプションから継続されるため、再度サブスクリプションを Zilliz Cloud 組織にリンクする必要はありません。

</Admonition>

以下は、更新プロセスの概要です。

![CbdUwGifPh2rvFbk0F4c1OVFnxh](https://zdoc-images.s3.us-west-2.amazonaws.com/CbdUwGifPh2rvFbk0F4c1OVFnxh.png)

以下の詳細なステップバイステップガイドに従って、Google Cloud Marketplace でプライベートオファーを購読できます。

<Procedures>

1. メールの受信トレイを確認する。

    1. Google Cloud Marketplace から件名 **New プライベート Offer from Zilliz** のメールを探します。メール内の **Review Offer** ボタンをクリックします。

        ![DYogwUgizhEYNnbIks9cqZVcn1f](https://zdoc-images.s3.us-west-2.amazonaws.com/DYogwUgizhEYNnbIks9cqZVcn1f.png)

1. オファーの詳細を確認し、受け入れる。

    ![Y6cAwGfu0hBF5obUyWScaR63njf](https://zdoc-images.s3.us-west-2.amazonaws.com/Y6cAwGfu0hBF5obUyWScaR63njf.png)

1. オファーが正常に更新される。

    **Amendment request sent to Zilliz** というタイトルのダイアログボックスが表示されたら、Zilliz Cloud での更新プロセスは完了です。

    ![O7r8wYN4lhED5qbVkrScNkpAned](https://zdoc-images.s3.us-west-2.amazonaws.com/O7r8wYN4lhED5qbVkrScNkpAned.png)

1. 更新を確認する。

    1. [Google Cloud Orders](https://console.cloud.google.com/marketplace/orders) ページに移動します。請求先アカウントを選択し、注文 ID をクリックして詳細を表示します。

        ![A3piwyJD6hz3qwbzry0cAYSunRc](https://zdoc-images.s3.us-west-2.amazonaws.com/A3piwyJD6hz3qwbzry0cAYSunRc.png)

    1. **キー Events** セクションで、既存の注文が正常に修正され、プライベートオファーが新しい契約終了日で更新されたことを確認できます。

        ![SlGfwioVMhP8uqbFi0ucDEMOnmd](https://zdoc-images.s3.us-west-2.amazonaws.com/SlGfwioVMhP8uqbFi0ucDEMOnmd.png)

</Procedures>

## パブリックオファーからプライベートオファーに切り替える\{#switch-from-a-public-offer-to-a-private-offer}

[プライベートオファーの更新](./subscribe-on-gcp-marketplace-private-offer#renew-your-private-offer)と同様に、パブリックオファーからプライベートオファーに切り替えるには、新しいプライベートオファーを受け入れる必要があります。受け入れると、新しいプライベートオファーが以前のパブリックオファーに自動的に置き換わります。ただし、新しいオファーを再度 Zilliz Cloud 組織にリンクする必要はありません。

## プライベートオファーのサブスクリプションをキャンセルする\{#cancel-private-offer-subscription}

Google Cloud Marketplace からプライベートオファーのサブスクリプションをキャンセルできます。

<Admonition type="info" icon="📘" title="Note">

サブスクリプションをキャンセルすると、組織は高度な Zilliz Cloud 機能にアクセスできなくなります。組織に残りのクレジットがない場合、またはすべてのクレジットが期限切れになった場合、組織は直ちに凍結されます。

</Admonition>

<Procedures>

1. [Google Cloud Orders](https://console.cloud.google.com/marketplace/orders) ページに移動します。

1. 関連する **Cloud 請求 アカウント** を選択します。

1. プライベートオファーの注文を見つけます。

1. **Actions** で **Contact support** をクリックします。Zilliz Cloud Support ポータルにリダイレクトされます。アクティブなプライベートオファー注文のキャンセルをリクエストするチケットを作成します。

    アカウントエグゼクティブに連絡してキャンセルをリクエストすることもできます。

1. Zilliz がキャンセルリクエストを処理した後、Cloud Marketplace で注文をキャンセルできることを知らせる通知が Google Cloud に届きます。

</Procedures>

詳細については、「[承認済みオファーの管理](https://docs.cloud.google.com/marketplace/docs/offers/manage-accepted-offer)」を参照してください。

## FAQ\{#faq}

**プライベートオファーが期限切れになり、更新されなかった場合はどうなりますか？**

プライベートオファーが期限切れになり、更新されなかった場合、Google Cloud Marketplace サブスクリプションはプライベートオファーの条件を失います。Zilliz Cloud 組織に有効な支払い方法や残りのクレジットがない場合、高度な機能へのアクセスが無効になり、組織は凍結されます。

**プライベートオファーを受け入れたが、Zilliz Cloud へのサインアップを完了しなかった場合はどうなりますか？**

プライベートオファーを受け入れても **Zilliz Cloud へのサインアップ** を完了しなかった場合、Marketplace サブスクリプションは作成されますが、どの Zilliz Cloud 組織にもリンクされません。その結果、組織はプライベートオファーを支払い方法として使用できません。

設定を完了するには、

<Procedures>

1. **Google Cloud Marketplace > 注文** に移動し、Zilliz Cloud の注文を見つけます。製品名をクリックします。

    ![YgzQwi6xDh8eVFbgOSLcNElVnNh](https://zdoc-images.s3.us-west-2.amazonaws.com/YgzQwi6xDh8eVFbgOSLcNElVnNh.png)

1. **プロバイダーで管理** をクリックします。

    ![GO3bwCnjWhyzT0bZCk3cpyHonPH](https://zdoc-images.s3.us-west-2.amazonaws.com/GO3bwCnjWhyzT0bZCk3cpyHonPH.png)

1. Zilliz Cloud にリダイレクトされます。Zilliz Cloud で操作を完了してください。

    ![RYtsbHgYUoaFBuxOspXcxIlrn5b](https://zdoc-images.s3.us-west-2.amazonaws.com/rytsbhgyuoafbuxospxcxilrn5b.png "RYtsbHgYUoaFBuxOspXcxIlrn5b")

</Procedures>

**Marketplace サブスクリプションを Zilliz Cloud にリンクする際に、利用可能な組織がない場合はどうすればよいですか？**

いくつかの理由が考えられます。

- **権限が不十分です**

    これは、十分な権限がない場合に発生する可能性があります。利用できない組織の横に **"権限が不十分です"** タグが表示されます。

    ![insufficient-permission-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    Marketplace サブスクリプションで組織をリンクするには、**組織オーナー** または **組織の請求管理者** である必要があります。しかし、組織メンバーのみの場合は、必要な権限がありません。組織オーナーにサポートを依頼してください。

- **すべての組織がすでに Marketplace サブスクリプションに正常にリンクされている**

    これは、すべての組織がすでに Marketplace サブスクリプションにリンクされている場合に発生する可能性があります。利用できない組織の横に **"マーケットプレイスにリンク済み"** タグが表示されます。

    ![marketplace-already-linked-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存の Marketplace サブスクリプションを更新する必要がある場合は、まず組織の現在のサブスクリプションのリンクを解除し、新しいサブスクリプションを設定してください。

    - 異なる Marketplace サブスクリプション用に複数の組織が必要な場合は、次のことができます。

        - 新しい Zilliz Cloud アカウントを[登録](./register-with-zilliz-cloud)して新しい組織を作成します。その後、組織オーナーを新しい組織に[招待](./organization-users#invite-a-user-to-your-organization)します。この組織オーナーは複数の組織に所属することになり、各組織に異なる Marketplace サブスクリプションを設定できます。

        - [サポートチケットを作成](http://support.zilliz.com)して、新しい組織を作成してもらいます。現在、Zilliz Cloud はユーザーによる手動での組織作成をサポートしていません。

- **リストに組織がない**

    - これは、アカウントが閉鎖されたか、すべての組織から退出した場合に発生する可能性があります。UI は次のようになります。

    ![no-organization-during-subcription](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、次のことができます。

    - 新しい組織を作成します。

    - 他のユーザーにあなたを組織に[招待](./organization-users#invite-a-user-to-your-organization)してもらい、組織オーナーの役割を付与してもらいます。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us)すると、新しい組織が作成されます。

