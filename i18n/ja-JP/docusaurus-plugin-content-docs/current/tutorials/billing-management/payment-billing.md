---
title: "支払いと請求概要 | Cloud"
slug: /payment-billing
sidebar_key: payment-billing
sidebar_label: "支払いと請求概要"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud で利用可能な支払い方法、支払いの優先順位の仕組み、および請求書とサブスクリプションを管理する際の考慮事項について説明します。 | Cloud"
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


# 支払いと請求の概要

このガイドでは、Zilliz Cloud で利用可能な支払い方法、支払いの優先順位の仕組み、請求書とサブスクリプションを管理する際の注意点について説明します。

<Admonition type="info" icon="📘" title="Note">

支払いと請求の設定を管理するには、**組織オーナー**または**組織の請求管理者**である必要があります。

</Admonition>

## 支払い方法\{#payment-methods}

次の表は、Zilliz Cloud で利用可能な支払い方法と、各方法が SaaS および BYOC デプロイメントでサポートされているかどうかを示しています。

<table>
   <tr>
     <th colspan="2"><p><strong>支払い方法</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>SaaS</strong></p></th>
     <th><p><strong>BYOC</strong></p></th>
   </tr>
   <tr>
     <td colspan="2"><p>クレジット</p></td>
     <td><p>クレジットは、Zilliz Cloud に登録した場合、または対象となる Zilliz Cloud プログラムやイベントに参加した場合に付与されます。 </p><p>クレジットは、Zilliz Cloud の使用料金の支払いに使用できます。</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td colspan="2"><p>クレジットカード</p></td>
     <td><p>Zilliz Cloud の使用量に基づいてクレジットカードで支払います。請求書は毎月発行されます。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td colspan="2"><p>アドバンスペイ</p></td>
     <td><p>Zilliz Cloud サービスに対して前払いします。使用料金はアドバンスペイ残高から差し引かれます。</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>AWS Marketplace のサブスクリプション</p></td>
     <td><p>無料トライアル</p></td>
     <td rowspan="3"><p>AWS Marketplace を通じて Zilliz Cloud の使用料金の請求書を受け取ります。</p></td>
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
     <td rowspan="2"><p>GCP Marketplace のサブスクリプション</p></td>
     <td><p>パブリックオファー</p></td>
     <td rowspan="2"><p>Google Cloud Marketplace を通じて Zilliz Cloud の使用料金の請求書を受け取ります。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートオファー</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>Microsoft Marketplace のサブスクリプション</p></td>
     <td><p>パブリックオファー</p></td>
     <td rowspan="2"><p>Microsoft Marketplace を通じて Zilliz Cloud の使用料金の請求書を受け取ります。</p></td>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
   </tr>
   <tr>
     <td><p>プライベートオファー</p></td>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
   </tr>
</table>

クレジットとアドバンスペイは、クレジットカードまたは Marketplace のサブスクリプションと併用できます。ただし、クレジットカードと Marketplace のサブスクリプションを同時に使用することはできません。

Marketplace のサブスクリプションは支払い方法としてのみ機能します。プロジェクト、クラスター、関連リソースを作成するクラウドプロバイダーを決定するものではありません。たとえば、AWS Marketplace でサブスクライブした後でも、選択したクラウドプロバイダーとリージョンがサポートされていれば、AWS、Google Cloud、Azure 上に Zilliz Cloud のプロジェクトとクラスターを作成できます。

## 支払い方法の優先順位\{#payment-method-priority}

複数の支払い方法または残高が利用可能な場合、Zilliz Cloud は以下の順序で適用します。

1. クレジット

1. アドバンスペイ残高

1. クレジットカードまたは Marketplace のサブスクリプション

たとえば、未払いの請求書が &#36;500、クレジットが &#36;100、アドバンスペイ残高が &#36;200 あり、AWS Marketplace のサブスクリプションがリンクされているとします。

- Zilliz Cloud は最初に &#36;100 のクレジットを適用し、未払い額を &#36;400 に減らします。

- 次に Zilliz Cloud は &#36;200 のアドバンスペイ残高を適用し、未払い額を &#36;200 に減らします。

- 残りの &#36;200 は AWS Marketplace のサブスクリプションに請求されます。

## Marketplace のサブスクリプション\{#marketplace-subscription}

次のマーケットプレイスを通じて Zilliz Cloud をサブスクライブできます。

- [AWS Marketplace](./subscribe-on-aws-marketplace)

- [Google Cloud Marketplace](./subscribe-on-gcp-marketplace)

- [Microsoft Marketplace](./subscribe-on-azure-marketplace)

Marketplace のサブスクリプションにより、組織はクラウドマーケットプレイスの請求アカウントを通じて Zilliz Cloud の料金を受け取ることができます。これは、財務部門や調達部門が既存のクラウド請求書に Zilliz Cloud の使用料金を表示したい場合に便利です。

Marketplace の価格は、クラウドプロバイダー、リージョン、クラスタータイプ、クラスターのプランによって異なる場合があります。詳細な価格については、[Zilliz Cloud の価格](https://zilliz.com/pricing) を参照してください。

## ロールと権限\{#roles-and-permissions}

支払いと請求の設定は組織レベルで管理されます。請求情報を表示または更新するには、必要な組織レベルの権限が必要です。

<table>
   <tr>
     <th><p><strong>ロール</strong></p></th>
     <th><p><strong>請求権限</strong></p></th>
   </tr>
   <tr>
     <td><p>組織オーナー</p></td>
     <td><p>支払い方法、請求プロファイル、Marketplace のサブスクリプション、請求書、請求アラートを管理できます。</p></td>
   </tr>
   <tr>
     <td><p>組織の請求管理者</p></td>
     <td><p>支払い方法、請求プロファイル、Marketplace のサブスクリプション、請求書、請求アラートを管理できます。</p></td>
   </tr>
   <tr>
     <td><p>その他の組織ロール</p></td>
     <td><p>請求情報へのアクセス権はありません。請求設定を表示または更新するには、組織オーナーまたは組織の請求管理者に連絡してください。</p></td>
   </tr>
</table>

詳細については、[組織ユーザーの管理](./organization-users) を参照してください。

## 請求サイクルと請求書\{#billing-cycle-and-invoices}

Zilliz Cloud は、各請求期間中に使用されたリソースとサービスに基づいて使用料金を計算します。料金には、デプロイメントモード、クラスタータイプ、リージョン、有効化されたサービスに応じて、クラスター使用量、ストレージ、データ操作、その他の課金対象機能が含まれる場合があります。

支払い方法としてクレジットカードを選択した場合、Zilliz Cloud は組織に対して毎月の請求書を生成します。請求書の解釈方法の詳細については、[請求書について](./view-invoice) を参照してください。

Marketplace でサブスクライブすることを選択した場合、請求書は対応するクラウドマーケットプレイスから発行されますが、使用の詳細は Zilliz Cloud で確認および調整のために利用できる場合があります。

請求サイクルについて質問がある場合は、[営業にお問い合わせください](http://zilliz.com/contact-sales)。

## 請求ステータスとサービスへの影響\{#billing-status-and-service-impact}

組織の請求ステータスは、有料の Zilliz Cloud 機能とリソースを引き続き使用できるかどうかを決定します。

- 組織に有効なクレジット、アドバンスペイ残高、クレジットカード、またはアクティブな Marketplace サブスクリプションがある場合、プランと支払い条件に従って使用を継続できます。

- 有効な支払い方法や残高がない場合、組織は未払いの請求書が発生し、高度な機能へのアクセスが失われ、フリーズ状態になる可能性があります。サービスの中断を避けるには、次のことを行ってください。

    - クレジットの有効期限と残高を監視する。

    - クレジットカードを最新の状態に保つ。

    - アドバンスペイ残高がなくなる前に補充する。

    - Marketplace のサブスクリプションの期限が切れる前に更新または変更する。

    - 請求アラートを設定して、支払いや使用のリスクを早期に検出する。

組織がフリーズしているか、支払いが失敗した場合は、支払い方法を更新してアクセスを復元します。詳細については、[支払いの失敗](./failed-payments-organization-recovery) を参照してください。

## 関連トピック\{#related-topics}

- [支払い方法の設定](./set-up-payment-method)

- [支払い方法の更新](./update-payment-method)

- [請求プロファイルの更新](./update-billing-profile)

- [請求書について](./view-invoice)

- [請求書の管理](./manage-invoice)

- [支払いの失敗](./failed-payments-organization-recovery)

- [Marketplace アカウントによる請求の分離](./separate-billing-by-marketplace-account)

- [請求アラートの監視](./monitor-billing-alerts)

