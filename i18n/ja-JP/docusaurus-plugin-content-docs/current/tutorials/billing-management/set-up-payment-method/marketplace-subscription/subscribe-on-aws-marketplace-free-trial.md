---
title: "AWS Marketplaceで無料トライアルに購読する | Cloud"
slug: /subscribe-on-aws-marketplace-free-trial
sidebar_key: subscribe-on-aws-marketplace-free-trial
sidebar_label: "AWS Marketplace (無料トライアル)"
beta: FALSE
notebook: FALSE
description: "このガイドでは、購読プロセスをステップバイステップで説明します。 | Cloud"
type: origin
token: X6nAwrgYAiJ3Lzku8mBczdbXnuo
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - AWS
  - 無料トライアル

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Procedures from '@site/src/components/Procedures';

# AWS Marketplace での無料トライアルの購読

このガイドでは、購読プロセスのステップバイステップの手順を説明します。

## 始める前に\{#before-you-start}

- トライアルではなくフルバージョンが必要な場合は、[パブリックオファー](./subscribe-on-aws-marketplace) または [プライベートオファー](./subscribe-on-aws-marketplace-private-offer) を通じて再度購読する必要があります。

- AWS Marketplace アカウントを持っていることを確認してください。

- AWS バイヤー ID のデフォルトの支払い方法を請求プランに設定してください。[デフォルトの支払い方法の変更方法を参照する](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-payment-method.html)。

- AWS アカウントが組織の一部である場合、購入を行うには `AWSMarketplaceManageSubscriptions` 管理ポリシーなどの権限が必要です。

## 無料トライアルに購読する\{#subscribe-to-a-free-trial}

[AWS Marketplace](https://aws.amazon.com/marketplace) にアクセスし、以下の手順で Zilliz Cloud の購読を開始します。

<Supademo id="cmpf98x1j009u0l0jk5t2s6j3" title=""  />

<Procedures>

1. 検索ボックスで **Zilliz Cloud** を検索し、**Milvus Vector データベース, Zilliz Cloud (Pay-as-you-go)** をクリックします。

    または、[このページ](https://aws.amazon.com/marketplace/pp/prodview-iqbidum7feuio?trk=8d276e92-b310-40ce-908f-23a198ca7ffc&sc_channel=el&source=zilliz) に直接アクセスすることもできます。

    ![CGffbQ9Jro826Rxupwvc42Vmn1c](https://zdoc-images.s3.us-west-2.amazonaws.com/cgffbq9jro826rxupwvc42vmn1c.png "CGffbQ9Jro826Rxupwvc42Vmn1c")

1. **無料で試す** をクリックします。

    このオプションは AWS が提供する 30 日間の無料トライアルです。無料トライアルが終了したら、Zilliz Cloud を引き続き使用するには [購読をアップグレード](./subscribe-on-aws-marketplace) する必要があります。

    ![KCGqbey5monHEdxTouNcJkIVneg](https://zdoc-images.s3.us-west-2.amazonaws.com/kcgqbey5monhedxtouncjkivneg.png "KCGqbey5monHEdxTouNcJkIVneg")

1. ページをスクロールダウンし、**購読** をクリックします。

    ![PllVbyXrMo9ydWxOG2DcjHkZnGf](https://zdoc-images.s3.us-west-2.amazonaws.com/pllvbyxrmo9ydwxog2dcjhkzngf.png "PllVbyXrMo9ydWxOG2DcjHkZnGf")

1. プロンプトに従って、Zilliz Cloud 上で **アカウントを設定** します。

    ![アカウント設定](https://zdoc-images.s3.us-west-2.amazonaws.com/set-up-account.png "set-up-account")

1.  新しいタブで、以下の手順に従って購読を完了します。

    1. すでに Zilliz Cloud アカウントをお持ちの場合は、ログインするだけです。お持ちでない場合は、[サインアップオプション](./register-with-zilliz-cloud) を選択し、手順に従ってください。URL 内のすべてのクエリ文字列が保持されていることを確認して、AWS の ID を Zilliz Cloud アカウントにリンクしてください。

        <Admonition type="info" icon="📘" title="Notes">

        AWS Marketplace は URL 内のクエリ文字列を使用して、ID 情報を Zilliz Cloud に渡します。サインアップに失敗すると、これらのクエリ文字列が失われる可能性があります。その結果、Zilliz Cloud は AWS の ID とお客様が登録したアカウントを関連付けることができなくなる場合があります。このような場合は、AWS Marketplace に戻り、<b>アカウントを設定</b> を再度クリックしてください。

        </Admonition>

    1. 購読を既存の Zilliz Cloud 組織にリンクします。

        ![aws-marketplace-dialog](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-dialog.png "aws-marketplace-dialog")

    1. 認証を完了します。

1. **請求** に移動して、AWS Marketplace の購読が支払い方法として設定されていることを確認します。

    ![aws-marketplace-success](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-success.png "aws-marketplace-success")

</Procedures>

## 有料購読へのアップグレード\{#upgrade-to-paid-subscription}

AWS Marketplace で Zilliz Cloud の無料トライアルを開始すると、通常の Zilliz Cloud 無料トライアルと同じ機能を利用できます。詳細については、[Zilliz Cloud を無料で試す](./free-trials#free-trial) を参照してください。

無料トライアル中は、**請求概要** ページの AWS Marketplace 購読の横に `Free Trial` タグが表示されます。

また、上部のバナーでトライアルの詳細を表示することもできます。

![OJtZbGmhAoKOC7xlpQsceYtDn0c](https://zdoc-images.s3.us-west-2.amazonaws.com/ojtzbgmhaokoc7xlpqsceytdn0c.png "OJtZbGmhAoKOC7xlpQsceYtDn0c")

より高度な機能については、いつでも有料の AWS 購読にアップグレードできます。アップグレードするには、[パブリックオファーに購読](./subscribe-on-aws-marketplace) するだけです。新しいパブリックオファーの購読は、以前の無料トライアルの購読を自動的に置き換えます。

<Procedures>

1. AWS Marketplace の [Zilliz Cloud ページ](https://aws.amazon.com/marketplace/pp/prodview-iqbidum7feuio?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) に移動します。

1. **購入オプションを表示** をクリックします。

1. ページをスクロールダウンし、**購読** をクリックします。

1. プロンプトで **アカウントを設定** をクリックします。

1. Zilliz Cloud アカウントにログインし、AWS Marketplace 購読を Zilliz Cloud 組織にリンクします。

</Procedures>

詳細なステップバイステップガイドについては、[AWS Marketplace でのパブリックオファーの購読](./subscribe-on-aws-marketplace) を参照してください。

**請求概要** ページの **支払い方法** カードに移動して、アップグレードが成功したかどうかを確認できます。AWS Marketplace 購読の横にある `Free Trial` タグが消えていれば、アップグレードは成功です。

## 無料トライアル購読のキャンセル\{#cancel-free-trial-subscription}

<Admonition type="info" icon="📘" title="Note">

購読をキャンセルすると、組織は Zilliz Cloud の高度な機能にアクセスできなくなります。組織に残りのクレジットがない場合、またはすべてのクレジットが期限切れになった場合、組織は直ちに凍結されます。

</Admonition>

<Procedures>

1. プライベートオファーを受け入れた AWS アカウントにサインインします。

1. AWS Marketplace コンソールを開き、**購読管理** に移動します。

1. Zilliz Cloud の購読を見つけ、契約 ID をクリックします。

1. **契約** で、**アクション** リストを開き、**購読をキャンセル** を選択します。

1. **購読をキャンセル** ダイアログボックスで **confirm** と入力し、**はい、購読をキャンセルします** を選択します。

</Procedures>

詳細については、[製品購読のキャンセル](https://docs.aws.amazon.com/marketplace/latest/buyerguide/cancel-subscription.html) を参照してください。

## FAQ\{#faq}

**AWS Marketplace 無料トライアルは期限切れになると自動的にアップグレードされますか？**

いいえ。AWS Marketplace 無料トライアルが終了したら、Zilliz Cloud を引き続き使用するには手動で有料購読にアップグレードする必要があります。

**AWS Marketplace 無料トライアルの期限が近づくと通知は届きますか？**

はい。AWS Marketplace は無料トライアルの期限が切れる前にメール通知を送信します。通知は、トライアルを開始した AWS アカウントに関連付けられたメールアドレスに送信されます。

**マーケットプレイス購読を Zilliz Cloud にリンクするときに利用可能な組織がない場合はどうすればよいですか？**

いくつかの理由が考えられます。

- **権限が不十分です**

    十分な権限がない場合に発生する可能性があります。利用できない組織の横に **"権限が不十分です"** タグが表示されます。

    ![insufficient-permission-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    組織をマーケットプレイス購読にリンクするには、**組織オーナー** または **組織の請求管理者** である必要があります。組織メンバーのみの場合は、必要な権限がありません。組織オーナーに連絡して支援を求めてください。

- **すべての組織がすでにマーケットプレイス購読に正常にリンクされている**

    すべての組織がすでにマーケットプレイス購読にリンクされている場合に発生する可能性があります。利用できない組織の横に **"マーケットプレイスにリンク済み"** タグが表示されます。

    ![marketplace-already-linked-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存のマーケットプレイス購読を更新する必要がある場合は、最初に組織の現在の購読のリンクを解除してから、新しい購読を設定してください。

    - 異なるマーケットプレイス購読用に複数の組織が必要な場合は、次のことができます。

        - 新しい Zilliz Cloud アカウントを [登録](./register-with-zilliz-cloud) して、新しい組織を作成します。次に、組織オーナーを新しい組織に [招待](./organization-users#invite-a-user-to-your-organization) します。この組織オーナーは複数の組織に所属することになり、各組織に対して異なるマーケットプレイス購読を設定できます。

        - [サポートチケットを作成](http://support.zilliz.com) して、新しい組織を作成してもらいます。現在、Zilliz Cloud はユーザーによる手動での組織作成をサポートしていません。

- **リストに組織がない**

    - アカウントが閉鎖されたか、すべての組織から退出した場合に発生する可能性があります。UI は次のようになります。

    ![no-organization-during-subcription](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、次のことができます。

    - 新しい組織を作成します。

    - 他のユーザーに自分の組織に [招待](./organization-users#invite-a-user-to-your-organization) してもらい、組織オーナーのロールを付与してもらいます。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us) して、新しい組織を作成してもらいます。

