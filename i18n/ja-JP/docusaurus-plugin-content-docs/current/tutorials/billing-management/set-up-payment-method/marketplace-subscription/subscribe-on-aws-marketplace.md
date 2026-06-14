---
title: "AWS Marketplace のパブリックオファーを購読する | Cloud"
slug: /subscribe-on-aws-marketplace
sidebar_key: subscribe-on-aws-marketplace
sidebar_label: "AWS Marketplace（パブリックオファー）"
beta: FALSE
notebook: FALSE
description: "このガイドでは、AWS Marketplace での Zilliz Cloud のサブスクリプションプロセスの段階的な手順と、価格条件の概要を説明します。 | Cloud"
type: origin
token: LDlOweEzmiLkdQkvPFec5lrcnbf
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイス
  - AWS
  - パブリックオファー

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Procedures from '@site/src/components/Procedures';

# AWS Marketplace でのパブリックオファーの購読

このガイドでは、サブスクリプションプロセスの詳細な手順と、AWS Marketplace 上の Zilliz Cloud の料金条件について説明します。

<Admonition type="info" icon="📘" title="Note">

一度購読すると、AWS Marketplace を介して AWS クラスターの使用料を支払うことができます。他のクラウドプロバイダーにデプロイされたクラスターがある場合も、AWS Marketplace を使用して支払うことができます。

</Admonition>

## 開始する前に\{#before-you-start}

- AWS Marketplace アカウントを持っていることを確認してください。

- AWS Buyer ID のデフォルトの支払い方法を請求プランに設定します。[デフォルトの支払い方法を変更する方法はこちら](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-payment-method.html)。

- AWS アカウントが組織の一部である場合、購入を行うには請求管理者による承認が必要です。

## パブリックオファーを購読する\{#subscribe-to-a-public-offer}

[AWS Marketplace](https://aws.amazon.com/marketplace) にアクセスし、次の手順で Zilliz Cloud のサブスクリプションを開始します:

<Supademo id="cm9hwfyvq1zgoljv5tu13vdk6" title=""  />

<Procedures>

1. 検索ボックスで **Zilliz Cloud** を検索し、**Milvus Vector データベース, Zilliz Cloud（従量課金制）** をクリックします。

    または、[このページ](https://aws.amazon.com/marketplace/pp/prodview-iqbidum7feuio?trk=8d276e92-b310-40ce-908f-23a198ca7ffc&sc_channel=el&source=zilliz) に直接アクセスすることもできます。

    ![UNGcb105Oo319KxghYwciqeCntf](https://zdoc-images.s3.us-west-2.amazonaws.com/ungcb105oo319kxghywciqecntf.png "UNGcb105Oo319KxghYwciqeCntf")

1. **購入オプションを表示** をクリックします。

    ![UQ0Bbe7huojVMUxpjWccXT6enkb](https://zdoc-images.s3.us-west-2.amazonaws.com/uq0bbe7huojvmuxpjwccxt6enkb.png "UQ0Bbe7huojVMUxpjWccXT6enkb")

1. ページを下にスクロールし、**購読** をクリックします。

    ![XAn8bszmeoIRJbxUml1cmXJQned](https://zdoc-images.s3.us-west-2.amazonaws.com/xan8bszmeoirjbxuml1cmxjqned.png "XAn8bszmeoIRJbxUml1cmXJQned")

1. プロンプトに従って、Zilliz Cloud で **アカウントを設定** します。

    ![set-up-account](https://zdoc-images.s3.us-west-2.amazonaws.com/set-up-account.png "set-up-account")

1.  新しいタブで、以下の手順に従ってサブスクリプションを完了します。

    1. 既に Zilliz Cloud アカウントをお持ちの場合は、ログインするだけです。お持ちでない場合は、[サインアップオプション](./register-with-zilliz-cloud) を選択し、プロセスに従います。AWS ID を Zilliz Cloud アカウントにリンクするために、URL 内のすべてのクエリ文字列が保持されていることを確認してください。

        <Admonition type="info" icon="📘" title="Notes">

        AWS Marketplace は URL 内のクエリ文字列を使用して、あなたの ID 情報を Zilliz Cloud に渡します。サインアップに失敗すると、これらのクエリ文字列が失われる可能性があります。その結果、Zilliz Cloud があなたの AWS ID を当社に登録されたアカウントに関連付けることができなくなる場合があります。このような場合は、AWS Marketplace に戻り、もう一度 <b>アカウントを設定</b> をクリックしてください。

        </Admonition>

    1. サブスクリプションを既存の Zilliz Cloud 組織にリンクします。

        ![aws-marketplace-dialog](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-dialog.png "aws-marketplace-dialog")

    1. 承認を完了します。

1. **請求** に移動し、AWS Marketplace サブスクリプションが支払い方法として設定されていることを確認します。

    ![aws-marketplace-success](https://zdoc-images.s3.us-west-2.amazonaws.com/aws-marketplace-success.png "aws-marketplace-success")

</Procedures>

## サブスクリプションまたは支払い方法の更新\{#update-subscription-or-payment-method}

Marketplace から正常に購読した後は、いつでもご都合に合わせてサブスクリプションを更新できます。

具体的には、次のいずれかを実行できます：

- サブスクリプションに使用する Marketplace アカウントを別のアカウントに変更する

- 支払い方法を Marketplace サブスクリプションからクレジットカードに切り替える。

詳細については、[支払い方法の更新](./update-payment-method) を参照してください。

## プライベートオファーへの切り替え\{#switch-to-a-private-offer}

詳細については、[AWS Marketplace でのプライベートオファーの購読](./subscribe-on-aws-marketplace-private-offer#switch-from-a-public-offer-to-a-private-offer) を参照してください。

## パブリックオファーのサブスクリプションをキャンセル\{#cancel-public-offer-subscription}

<Admonition type="info" icon="📘" title="Note">

サブスクリプションをキャンセルすると、組織は高度な Zilliz Cloud 機能にアクセスできなくなります。組織に残りのクレジットがない場合、またはすべてのクレジットが期限切れの場合、組織は直ちに凍結されます。

</Admonition>

<Procedures>

1. プライベートオファーを受け入れた AWS アカウントにサインインします。

1. AWS Marketplace コンソールを開き、**サブスクリプションの管理** に移動します。

1. Zilliz Cloud サブスクリプションを見つけ、契約 ID をクリックします。

1. **契約** で、**アクション** リストを開き、**サブスクリプションをキャンセル** を選択します。

1. **サブスクリプションをキャンセル** ダイアログボックスで、**confirm** と入力し、**はい、サブスクリプションをキャンセルします** を選択します。

</Procedures>

詳細については、[製品サブスクリプションのキャンセル](https://docs.aws.amazon.com/marketplace/latest/buyerguide/cancel-subscription.html) を参照してください。

## トラブルシューティング\{#troubleshooting}

**Marketplace サブスクリプションを Zilliz Cloud にリンクするときに利用可能な組織がない場合はどうすればよいですか？**

いくつかの理由が考えられます。

- **権限が不十分です** 

    これは、十分な権限がない場合に発生する可能性があります。利用できない組織の横に **"権限が不十分です"** タグが表示されます。

    ![insufficient-permission-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/insufficient-permission-subscription.png "insufficient-permission-subscription")

    組織を Marketplace サブスクリプションにリンクするには、**組織オーナー** または **組織の請求管理者** である必要があります。ただし、組織メンバーのみである場合は、必要な権限がありません。組織オーナーに連絡して支援を求めてください。

- **すべての組織がすでに Marketplace サブスクリプションに正常にリンクされています**

    これは、すべての組織がすでに Marketplace サブスクリプションにリンクされている場合に発生する可能性があります。利用できない組織の横に **"マーケットプレイスにリンク済み"** タグが表示されます。

    ![marketplace-already-linked-subscription](https://zdoc-images.s3.us-west-2.amazonaws.com/marketplace-already-linked-subscription.png "marketplace-already-linked-subscription")

    この場合、

    - 既存の Marketplace サブスクリプションを更新する必要がある場合は、まず組織の現在のサブスクリプションのリンクを解除し、新しいサブスクリプションを設定してください。

    - 異なる Marketplace サブスクリプション用に複数の組織が必要な場合は、次のことができます：

        - 新しい Zilliz Cloud アカウントを[登録](./register-with-zilliz-cloud)して新しい組織を作成します。次に、組織オーナーを新しい組織に[招待](./organization-users#invite-a-user-to-your-organization)します。この組織オーナーは複数の組織に所属することになり、各組織に対して異なる Marketplace サブスクリプションを設定できます。

        - [サポートチケットを作成](http://support.zilliz.com)すると、新しい組織を作成します。現在、Zilliz Cloud はユーザーによる手動での組織作成をサポートしていません。

- **リストに組織がない**

    - これは、アカウントが閉鎖された場合、またはすべての組織を退会した場合に発生する可能性があります。UI は次のようになります。

    ![no-organization-during-subcription](https://zdoc-images.s3.us-west-2.amazonaws.com/no-organization-during-subcription.png "no-organization-during-subcription")

    この場合、次のことができます：

    - 新しい組織を作成する。

    - 他のユーザーに自分の組織に[招待](./organization-users#invite-a-user-to-your-organization)してもらい、組織オーナーの役割を付与してもらう。

    - [サポートチケットを作成](https://support.zilliz.com/hc/en-us)すると、新しい組織を作成します。

