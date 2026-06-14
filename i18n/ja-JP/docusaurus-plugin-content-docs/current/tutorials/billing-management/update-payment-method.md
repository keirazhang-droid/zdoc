---
title: "支払い方法の更新 | Cloud"
slug: /update-payment-method
sidebar_key: update-payment-method
sidebar_label: "支払い方法の更新"
beta: FALSE
notebook: FALSE
description: "組織が有効期限切れのカードを交換する必要がある場合、請求をクラウドマーケットプレイスに移行する場合、マーケットプレイスアカウント間で切り替える場合、またはマーケットプレイス請求からクレジットカード請求に戻す場合に、支払い方法を更新できます。 | Cloud"
type: origin
token: TfzMwdLsWibd0UkGpGAcLhuInvb
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 支払い
  - 請求
  - 更新

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# 支払い方法の更新

組織で期限切れのカードを交換する必要がある場合、請求をクラウドマーケットプレイスに移行する場合、マーケットプレイスアカウントを切り替える場合、またはマーケットプレイス請求からクレジットカード請求に戻す場合に、支払い方法を更新できます。

<Admonition type="info" icon="📘" title="Note">

支払い方法を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

## サポートされている支払い方法の変更\{#supported-payment-method-changes}

Zilliz Cloud は以下の支払い方法の変更をサポートしています。

<table>
   <tr>
     <th><p><strong>変更元</strong></p></th>
     <th><p><strong>変更先</strong></p></th>
     <th><p><strong>更新方法</strong></p></th>
   </tr>
   <tr>
     <td><p>クレジットカード</p></td>
     <td><p>クレジットカード</p></td>
     <td><p>Zilliz Cloud コンソールで追加したクレジットカードを交換します。</p></td>
   </tr>
   <tr>
     <td><p>クレジットカード</p></td>
     <td><p>マーケットプレイス購読</p></td>
     <td><p>対象のマーケットプレイスを通じて Zilliz Cloud を購読し、購読を Zilliz Cloud 組織にリンクします。 </p><p>リンク後、支払い方法は自動的に更新されます。マーケットプレイスの購読はクレジットカード情報を自動的に置き換えます。</p></td>
   </tr>
   <tr>
     <td><p>マーケットプレイス購読</p></td>
     <td><p>クレジットカード</p></td>
     <td><p>現在のマーケットプレイスの購読をキャンセルし、Zilliz Cloud コンソールでクレジットカードを追加します。</p></td>
   </tr>
   <tr>
     <td><p>マーケットプレイス購読</p></td>
     <td><p>マーケットプレイス購読</p></td>
     <td><p>現在のマーケットプレイスの購読をキャンセルし、新しいマーケットプレイスアカウントで購読し、新しい購読を Zilliz Cloud 組織にリンクします。</p></td>
   </tr>
</table>

## クレジットカードの交換\{#replace-a-credit-card}

ステップバイステップガイドについては、[クレジットカード](./subscribe-by-adding-credit-card#replace-a-credit-card) を参照してください。

## クレジットカードからマーケットプレイス購読への切り替え\{#switch-from-credit-card-to-marketplace-subscription}

クレジットカード請求からマーケットプレイス請求に切り替えるには、以下の手順に従ってください。

<Procedures>

1. クラウドマーケットプレイスを通じて Zilliz Cloud を購読します。

    - [AWS Marketplace](./subscribe-on-aws-marketplace)

    - [Google Cloud Marketplace](./subscribe-on-gcp-marketplace)

    - [Microsoft Marketplace](./subscribe-on-azure-marketplace)

1. 更新を確認します。

    マーケットプレイスの購読が成功すると、支払い方法は自動的に更新されます。クレジットカードを手動で削除する必要はありません。

    **請求**ページで更新を確認できます。

</Procedures>

## マーケットプレイス購読からクレジットカードへの切り替え\{#switch-from-marketplace-subscription-to-credit-card}

マーケットプレイス請求からクレジットカード請求に切り替えるには、以下の手順に従ってください。

<Procedures>

1. 購読したクラウドマーケットプレイスから現在の購読をキャンセルします。

1. Zilliz Cloud コンソールで、**請求**に移動します。

1. **支払い方法**セクションで[クレジットカードを追加](./subscribe-by-adding-credit-card#add-a-credit-card)します。

</Procedures>

正常に追加されると、組織はクレジットカードを支払い方法として使用します。

## マーケットプレイス購読間の切り替え\{#switch-between-marketplace-subscriptions}

請求に使用するマーケットプレイスアカウントを変更する必要がある場合、AWS Marketplace 無料トライアルをアップグレードする場合、またはパブリックオファーからプライベートオファーに移行する場合に、マーケットプレイス購読間を切り替えることができます。

必要な手順は変更の種類によって異なります。

<table>
   <tr>
     <th><p><strong>シナリオ</strong></p></th>
     <th><p><strong>操作</strong></p></th>
   </tr>
   <tr>
     <td><p>請求に使用するマーケットプレイスアカウントの変更</p></td>
     <td><p>現在のマーケットプレイスの購読をキャンセルし、新しいマーケットプレイスアカウントで再度購読し、新しい購読を Zilliz Cloud 組織にリンクします。</p></td>
   </tr>
   <tr>
     <td><p>AWS Marketplace 無料トライアルのアップグレード</p></td>
     <td><p>AWS Marketplace オファーページからアップグレードまたは購読し、有料購読を Zilliz Cloud 組織にリンクします。</p></td>
   </tr>
   <tr>
     <td><p>パブリックオファーからプライベートオファーへの切り替え</p></td>
     <td><p>プライベートオファーを受け入れます。プライベートオファーは以前のパブリックオファーを置き換えます。新しいオファーを Zilliz Cloud 組織にリンクする必要があります。</p></td>
   </tr>
</table>

### マーケットプレイスアカウントの変更\{#change-marketplace-account}

以下の例は、請求に使用する AWS Marketplace アカウントを変更する方法を示しています。同じプロセスが Google Cloud Marketplace および Microsoft Marketplace にも適用されます。

<Admonition type="info" icon="📘" title="Note">

サービス中断を避けるため、1時間以内に操作を完了することをお勧めします。

</Admonition>

<Procedures>

1. 購読に使用した元の AWS アカウントで AWS Marketplace にサインインします。

1. Zilliz Cloud の購読をキャンセルします。詳細は[製品購読のキャンセル](https://docs.aws.amazon.com/marketplace/latest/buyerguide/cancel-subscription.html#cancel-saas-subscription)を参照してください。

    <Admonition type="info" icon="📘" title="Note">

    購読をキャンセルしても Zilliz Cloud のデータは削除されないのでご安心ください。

    </Admonition>

    AWS Marketplace がキャンセル処理を完了するまでに数分かかります。

1. 元の AWS アカウントからサインアウトします。

1. 購読に使用する別の AWS アカウントで AWS Marketplace にサインインします。

1. [AWS Marketplace での購読](./subscribe-on-aws-marketplace#subscribe-to-a-public-offer)セクションの手順に従って、新しいアカウントで Zilliz Cloud の購読を完了します。

    <Admonition type="info" icon="📘" title="Note">

    AWS Marketplace の購読を更新するときは、**アカウントを設定** ボタンをクリックして、新しい購読を Zilliz Cloud 組織にリンクする必要があります。

    </Admonition>

1. **請求概要**ページの**支払い方法**セクションで更新を確認します。購読 ID をクリックし、購読の**アカウント ID** が新しいマーケットプレイスアカウントに更新されていることを確認します。

    ![AWS 購読 ID の表示](https://zdoc-images.s3.us-west-2.amazonaws.com/view-aws-subscription-id.png "view-aws-subscription-id")

</Procedures>

### AWS Marketplace 無料トライアルのアップグレード\{#upgrade-aws-marketplace-free-trial}

AWS Marketplace 無料トライアルを使用している場合、有料の AWS Marketplace 購読にアップグレードできます。詳細は[有料購読へのアップグレード](./subscribe-on-aws-marketplace-free-trial#upgrade-to-paid-subscription)を参照してください。

アップグレードが完了したら、Zilliz Cloud で更新を確認します。**請求概要**ページに移動し、**支払い方法**セクションを確認してください。

### パブリックオファーからプライベートオファーへの切り替え\{#switch-from-public-offer-to-private-offer}

マーケットプレイスのパブリックオファーからプライベートオファーに切り替えるには、Zilliz が提供するプライベートオファーを受け入れます。

新しいプライベートオファーは、受け入れ後、自動的に以前のパブリックオファーを置き換えます。新しいオファーを Zilliz Cloud 組織にリンクする必要があります。

詳細については、[パブリックオファーからプライベートオファーへの切り替え](./subscribe-on-aws-marketplace-private-offer#switch-from-a-public-offer-to-a-private-offer)を参照してください。 

