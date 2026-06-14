---
title: "支払いと請求概要 | BYOC"
slug: /payment-billing
sidebar_key: payment-billing
sidebar_label: "支払いと請求概要"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud で利用可能な支払い方法、支払い優先順位の仕組み、および請求書とサブスクリプションを管理する際の考慮事項について説明します。 | BYOC"
type: origin
token: Y6Qqw4a3XiWPlCkQYMqcLEORnAU
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 支払い
  - 請求

---

import Admonition from '@theme/Admonition';


# 支払いと請求概要

このガイドでは、Zilliz Cloud で利用可能な支払い方法、支払いの優先順位、および請求書とサブスクリプションを管理する際の注意事項について説明します。

<Admonition type="info" icon="📘" title="Note">

支払いと請求の設定を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

## 支払い方法\{#payment-methods}

次の表は、Zilliz Cloud で利用可能な支払い方法と、各方法が SaaS および BYOC デプロイメントでサポートされているかどうかを説明しています。

<table>
   <tr>
     <th colspan="2"><p><strong>支払い方法</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>SaaS</strong></p></th>
     <th><p><strong>BYOC</strong></p></th>
   </tr>
   <tr>
     <td colspan="2"><p>クレジット</p></td>
     <td><p>クレジットは、Zilliz Cloud に登録した場合、または対象となる Zilliz Cloud プログラムやイベントに参加した場合に付与されます。</p><p>クレジットは、Zilliz Cloud の使用料金に充当できます。</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td colspan="2"><p>クレジットカード</p></td>
     <td><p>Zilliz Cloud の使用量に基づいてクレジットカードで請求されます。請求書は毎月発行されます。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td colspan="2"><p>Advance Pay</p></td>
     <td><p>Zilliz Cloud サービスに前払い金をチャージします。使用料金は Advance Pay 残高から差し引かれます。</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>AWS Marketplace サブスクリプション</p></td>
     <td><p>無料トライアル</p></td>
     <td rowspan="3"><p>Zilliz Cloud の使用に関する請求書を AWS Marketplace を通じて受け取ります。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>パブリックオファー</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートオファー</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>GCP Marketplace サブスクリプション</p></td>
     <td><p>パブリックオファー</p></td>
     <td rowspan="2"><p>Zilliz Cloud の使用に関する請求書を Google Cloud Marketplace を通じて受け取ります。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートオファー</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>Microsoft Marketplace サブスクリプション</p></td>
     <td><p>パブリックオファー</p></td>
     <td rowspan="2"><p>Zilliz Cloud の使用に関する請求書を Microsoft Marketplace を通じて受け取ります。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートオファー</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

クレジットと Advance Pay は、クレジットカードまたは Marketplace サブスクリプションのいずれかと併用できます。ただし、クレジットカードと Marketplace サブスクリプションを同時に使用することはできません。

Marketplace サブスクリプションは支払い方法にすぎません。プロジェクト、クラスター、および関連リソースを作成するクラウドプロバイダーを決定するものではありません。たとえば、AWS Marketplace を通じてサブスクライブした後でも、選択したクラウドプロバイダーとリージョンがサポートされていれば、AWS、Google Cloud、Azure 上に Zilliz Cloud のプロジェクトとクラスターを作成できます。

## 支払い方法の優先順位\{#payment-method-priority}

複数の支払い方法または残高が利用可能な場合、Zilliz Cloud は次の順序で適用します。

1. クレジット

1. Advance Pay 残高

1. Marketplace サブスクリプション

たとえば、未払いの請求額が &#36;500、クレジットが &#36;100、Advance Pay 残高が &#36;200、リンクされた AWS Marketplace サブスクリプションがあるとします。

- Zilliz Cloud はまずクレジット &#36;100 を適用し、未払い額を &#36;400 に減らします。

- Zilliz Cloud は次に Advance Pay 残高 &#36;200 を適用し、未払い額を &#36;200 に減らします。

- 残りの &#36;200 は AWS Marketplace サブスクリプションに請求されます。

## Marketplace サブスクリプション\{#marketplace-subscription}

次のマーケットプレイスを通じて Zilliz Cloud にサブスクライブできます。

- [AWS Marketplace](./subscribe-on-aws-marketplace)

Marketplace サブスクリプションを使用すると、組織は Zilliz Cloud の料金をクラウドマーケットプレイスの請求アカウントを通じて受け取ることができます。これは、財務チームや調達チームが Zilliz Cloud の使用料を既存のクラウド請求書に表示したい場合に便利です。

詳細な料金については、[営業にお問い合わせください](http://zilliz.com/contact-sales)。

## ロールと権限\{#roles-and-permissions}

支払いと請求の設定は組織レベルで管理されます。請求情報を表示または更新するには、必要な組織レベルの権限が必要です。

<table>
   <tr>
     <th><p><strong>ロール</strong></p></th>
     <th><p><strong>請求権限</strong></p></th>
   </tr>
   <tr>
     <td><p>組織オーナー</p></td>
     <td><p>支払い方法、請求プロファイル、Marketplace サブスクリプション、請求書、請求アラートを管理できます。</p></td>
   </tr>
   <tr>
     <td><p>組織の請求管理者</p></td>
     <td><p>支払い方法、請求プロファイル、Marketplace サブスクリプション、請求書、請求アラートを管理できます。</p></td>
   </tr>
   <tr>
     <td><p>その他の組織ロール</p></td>
     <td><p>請求情報にアクセスできません。請求設定を表示または更新するには、組織オーナーまたは組織の請求管理者にお問い合わせください。</p></td>
   </tr>
</table>

詳細については、[組織ユーザーの管理](./organization-users) を参照してください。

## 請求書\{#invoices}

Zilliz Cloud BYOC の使用に関する請求書が必要な場合、またはご質問がある場合は、Zilliz Finance チーム (finance@zilliz.com) までお問い合わせください。

