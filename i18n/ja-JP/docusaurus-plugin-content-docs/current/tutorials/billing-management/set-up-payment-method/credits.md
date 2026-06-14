---
title: "クレジット | Cloud"
slug: /credits
sidebar_key: credits
sidebar_label: "クレジット"
beta: FALSE
notebook: FALSE
description: "クレジットは、Zilliz Cloud の利用料金の支払いに使用できます。業務用メールアドレスで Zilliz Cloud に登録した場合、対象となる Zilliz Cloud のプログラムやイベントに参加した場合、または Zilliz から概念実証 (PoC) のためのクレジットを受け取った場合に、クレジットを受け取ることができます。 | Cloud"
type: origin
token: YWhwwvlxOiGk9gkTm0Pc2w00npe
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 支払い
  - 課金
  - クレジット

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# クレジット

クレジットは、Zilliz Cloud の使用料金をカバーするために使用できます。職場のメールアドレスで Zilliz Cloud に登録した場合、対象となる Zilliz Cloud プログラムやイベントに参加した場合、または Zilliz から概念実証 (PoC) のクレジットを受け取った場合などにクレジットを受け取ることができます。

クレジットを利用すると、長期的な支払い方法を設定する前に、Zilliz Cloud をお試しいただいたり、評価ワークロードを実行したりすることができます。

<Admonition type="info" icon="📘" title="Note">

クレジットと支払い方法を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

## クレジットの仕組み\{#how-credits-work}

クレジットは、他の[支払い方法](./payment-billing#payment-methods)よりも先に、使用料金に自動的に適用されます。

複数の支払い方法や残高が利用可能な場合、Zilliz Cloud は以下の順序で適用します。

1. クレジット

1. 前払い残高

1. クレジットカードまたはマーケットプレイスサブスクリプション

## クレジットの有効期間\{#credit-validity}

クレジットには有効期限があります。期限切れのクレジットは、将来の使用料金に使用することはできません。

利用可能なクレジットを失わないようにするには：

- 残りのクレジット残高を定期的に確認してください。

- クレジットの有効期限までの残日数を確認してください。

- クレジットを期限切れになる前に使用してください。

- 有効な支払い方法を追加して、クレジットの有効期間を30日から1年に延長してください。

- クレジットの有効期間に関するご質問は、[Zilliz サポート](http://support.zilliz.com) または担当のアカウントエグゼクティブにお問い合わせください。

## クレジットと支払い方法\{#credits-and-payment-methods}

クレジットは、クレジットカード、前払い残高、またはマーケットプレイスサブスクリプションと併用できます。

ただし、クレジットは長期的な支払い方法の代わりにはなりません。クレジットがなくなるか期限切れになり、他に有効な支払い方法がない場合、組織は高度な機能にアクセスできなくなり、凍結されます。

クレジットを使い切った後も Zilliz Cloud を継続して使用するには、以下のいずれかの支払い方法を設定してください。

- [クレジットカード](./subscribe-by-adding-credit-card)

- [前払い](./advance-pay)

- [AWS Marketplace サブスクリプション](./subscribe-on-aws-marketplace)

- [Google Cloud Marketplace サブスクリプション](./subscribe-on-gcp-marketplace)

- [Microsoft Marketplace サブスクリプション](./subscribe-on-azure-marketplace)

## クレジットの申請\{#apply-for-credits}

PoC 用にさらにクレジットが必要な場合は、[営業にお問い合わせ](http://zilliz.com/contact-sales)いただくか、担当のアカウントエグゼクティブまでご連絡ください。

## クレジット残高の確認\{#view-credit-balance}

クレジット残高を確認するには：

![FWMbwmjNKh6Qt3btRCyc4KKSnZf](https://zdoc-images.s3.us-west-2.amazonaws.com/FWMbwmjNKh6Qt3btRCyc4KKSnZf.png)

<Procedures>

1. Zilliz Cloud 上で組織に移動します。

1. **請求** に移動します。

1. **クレジット** セクションで残高を確認します。

</Procedures>

## クレジットアラートの監視\{#monitor-credit-alerts}

Zilliz Cloud は、クレジットと支払いの健全性を監視するのに役立つ請求アラートを提供します。

<table>
   <tr>
     <th><p><strong>メトリック</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>推奨される対応</strong></p></th>
   </tr>
   <tr>
     <td><p>クレジット有効期間（日）</p></td>
     <td><p>無料クレジットの有効期限までの残日数。</p></td>
     <td><p>有効期限内に利用可能なクレジットを使用するか、PoC を完全に完了するためにクレジットの有効期限を延長する必要がある場合は、<a href="http://zilliz.com/contact-sales">Zilliz 営業</a> にお問い合わせください。</p></td>
   </tr>
   <tr>
     <td><p>残りのクレジット（$）</p></td>
     <td><p>残りのクレジット残高。</p></td>
     <td><p>クレジットがなくなる前に、別の支払い方法を追加または設定してください。さらに PoC クレジットが必要な場合は、<a href="http://zilliz.com/contact-sales">Zilliz 営業</a> にお問い合わせいただけます。</p></td>
   </tr>
</table>

