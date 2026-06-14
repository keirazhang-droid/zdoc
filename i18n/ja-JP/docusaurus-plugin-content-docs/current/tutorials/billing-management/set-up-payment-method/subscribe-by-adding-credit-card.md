---
title: "クレジットカード | Cloud"
slug: /subscribe-by-adding-credit-card
sidebar_key: subscribe-by-adding-credit-card
sidebar_label: "クレジットカード"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud で組織に支払い用のクレジットカードを追加する方法についての包括的な手順を説明します。 | Cloud"
type: origin
token: TVnkwXupUiX3zDkzYPWcxKP3nvg
sidebar_position: 2
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - クレジットカード
  - サブスクライブ

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Procedures from '@site/src/components/Procedures';

# クレジットカード

このガイドでは、Zilliz Cloud で組織に支払い用のクレジットカードを追加する方法について包括的な手順を説明します。

<Admonition type="info" icon="📘" title="Note">

- **税金:** 請求書の税金は、提供された請求先住所に基づいて計算されます。VAT または GST ID の入力が必要な企業の場合は、[お問い合わせ](http://support.zilliz.com) ください。

- **アクセス制御**: 支払い方法を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

## クレジットカードの追加\{#add-a-credit-card}

<Supademo id="cmpf2ubt32ddyqm8qp3nfrb56" title=""  />

<Procedures>

1. **請求** に移動します。

1. **+ 支払い方法の追加** をクリックします。

1. **クレジットカード** を選択します。

1. カード情報と請求情報を入力します。

    - クレジットカード情報:

        - **カード番号**

        - **有効期限**

        - **CVC**

    - 請求情報:

        - **名**

        - **姓**

        - **会社名**

        - **Eメール**

        - **番地**

            会社の住所を使用することをお勧めします。この住所は税額の計算に使用され、発行されるすべての請求書に記載されます。

        - **国/地域**

        - **都道府県**

        - **市区町村**

        - **郵便番号**

1. **追加** をクリックします。

</Procedures>

## クレジットカードの交換\{#replace-a-credit-card}

クレジットカードの有効期限が近づいたら、既存のカードを交換するか、[Marketplace サブスクリプション](./marketplace-subscription) に切り替えることができます。

次のデモでは、既存のクレジットカードを新しいカードに交換する方法を示します。

<Supademo id="cmpf3fm4q2ehaqm8q8j5jx188" title=""  />

<Procedures>

1. **請求** に移動します。

1. クレジットカードの横にある **置き換え** をクリックします。

1. 新しいクレジットカードの情報を入力します。

    - **カード番号**

    - **有効期限**

    - **CVC**

1. **置き換え** をクリックします。

</Procedures>

## Marketplace サブスクリプションへの切り替え\{#switch-to-marketplace-subscription}

クレジットカードの支払い方法から Marketplace サブスクリプションに移行する場合は、対応する Marketplace で直接サブスクライブしてください。

サブスクリプションが成功すると、既存のクレジットカード情報は自動的に置き換えられます。**請求概要** ページの **支払い方法** セクションで更新を確認できます。

<Admonition type="info" icon="📘" title="Note">

請求概要に変更が反映されるまで、数分お待ちください。

</Admonition>

Marketplace サブスクリプションの詳細については、[Marketplace サブスクリプション](./marketplace-subscription) を参照してください。

支払い方法の更新の詳細については、[支払い方法の更新](./update-payment-method) を参照してください。

## クレジットカード有効期限の監視設定\{#set-monitor-for-credit-card-expiration}

デフォルトでは、クレジットカードの有効期限の監視は無効になっています。ただし、有効にすると、クレジットカードの有効期限が 7 日または 30 日後に切れる場合に通知を受け取ることができます。詳細については、[組織アラートの管理](./manage-organization-alerts) を参照してください。

## クレジットカードの削除\{#remove-credit-card}

現在、Zilliz Cloud は Web コンソールでの支払い用クレジットカードの削除をサポートしていません。リンクされたクレジットカードを削除する必要がある場合は、Zilliz Cloud の[サポートポータル](https://support.zilliz.com/hc/en-us) からお問い合わせの上、チケットを送信してください。