---
title: "支払い失敗と組織の復旧 | Cloud"
slug: /failed-payments-organization-recovery
sidebar_key: failed-payments-organization-recovery
sidebar_label: "支払い失敗と組織の復旧"
beta: FALSE
notebook: FALSE
description: "支払い失敗は、組織の請求ステータスや有料Zilliz Cloud機能へのアクセスに影響を与える可能性があります。このガイドでは、支払い失敗のよくある原因、支払いが完了できない場合に何が起こるか、そして組織を復旧する方法について説明します。 | Cloud"
type: origin
token: JYXswRlj9i5KE5kJ2U0cdaM5nBh
sidebar_position: 7
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 請求書
  - 延滞
  - 凍結
  - 組織の復旧
  - 支払い失敗

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# 支払いの失敗と組織の復旧

支払いの失敗は、組織の請求ステータスや有料の Zilliz Cloud 機能へのアクセスに影響を与える可能性があります。このガイドでは、支払い失敗の一般的な原因、支払いが完了できない場合の影響、および組織を復旧する方法について説明します。

<Admonition type="info" icon="📘" title="**Note**">

支払いと請求の設定を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

## 支払い失敗の一般的な原因\{#common-causes-for-failed-payments}

支払いが失敗する理由はいくつかあります。

- 保存されたクレジットカードの有効期限が切れている。

- クレジットカードがカード発行会社によって拒否された。

- Advance Pay の残高が不足している。

- クレジットが使い切られた、または期限切れになった。

- Marketplace のパブリックオファーサブスクリプションの有効期限が切れた、キャンセルされた、または Zilliz Cloud 組織にリンクされていない。

- Marketplace のプライベートオファーサブスクリプションの有効期限が切れ、更新されなかった。

- Marketplace の無料トライアルサブスクリプションの有効期限が切れ、Zilliz Cloud に他の支払い方法が提供されていない。

## クレジットカードの中間請求\{#credit-card-interim-charges}

Zilliz Cloud SaaS のインボイスは毎月生成されます。ただし、初めてクレジットカードを支払い方法として追加する新しい組織の場合、Zilliz Cloud は月次インボイスが発行される前に中間請求を行う場合があります。

中間請求は、累積使用量が初めて特定の請求しきい値（例：&#36;100 および &#36;1,000）に達したときにトリガーされます。これらのしきい値での中間請求が正常に完了すると、以降の請求は通常の月次請求サイクルに従います。

これらの中間請求は、新しいアカウントの請求の信頼性を確立し、請求サイクル中に組織の良好な状態を維持するのに役立ちます。

中間請求が失敗した場合、月次請求サイクルが終了していなくても、組織は直ちに凍結される可能性があります。サービス中断を防ぐために、クレジットカードが有効で、十分な利用可能残高があることを確認してください。

## サービスへの影響\{#service-impact}

Zilliz Cloud が支払いを回収できず、有効なクレジットや Advance Pay 残高がない場合、組織は未払いのインボイスが発生し、凍結されます。

組織が凍結されると：

- Zilliz Cloud はメール通知を送信し、未払いのインボイスを支払うための 15 日間の猶予期間を提供します。猶予期間後もインボイスが未払いの場合、データとリソースはごみ箱に移動されます。

- 実行中のサービスや高度な機能が制限される場合があります。

- 新しい有料リソースを作成できません。

- 影響を受ける Zilliz Cloud リソースに依存するアプリケーションが中断される可能性があります。

## 組織を復旧する\{#recover-your-organization}

アクセスを復元するには、請求の問題を解決し、組織に有効な支払い方法または利用可能な残高があることを確認してください。

### クレジットの期限切れまたは使い切りの場合\{#if-credits-expired-or-ran-out}

<Procedures>

1. [クレジットカード](./subscribe-by-adding-credit-card) や [Marketplace サブスクリプション](./marketplace-subscription) などの有効な支払い方法を追加します。

1. [Advance Pay](./advance-pay) を使用している場合は、残高に資金を追加します。

1. クレジットについてサポートが必要な場合は、Zilliz [セ](http://zilliz.com/contact-sales)[ールス](http://zilliz.com/contact-sales) またはアカウントチームにお問い合わせください。

</Procedures>

### クレジットカードの支払いが失敗した場合\{#if-your-credit-card-payment-failed}

<Procedures>

1. Zilliz Cloud コンソールに移動します。

1. 組織を開きます。

1. **請求** に移動します。

1. クレジットカードを [交換](./subscribe-by-adding-credit-card#replace-a-credit-card) します。

1. 支払いを [再試行](./manage-invoice#pay-invoice) します。それでも未払いのインボイスを支払えない場合は、[Zilliz サポート](http://support.zilliz.com) にお問い合わせください。

</Procedures>

### Advance Pay の残高が不足している場合\{#if-your-advance-pay-balance-is-insufficient}

<Procedures>

1. [Advance Pay](./advance-pay) の残高に資金を追加します。

1. 更新された残高が請求ページに表示されていることを確認します。

1. 残高を更新しても組織が凍結されたままの場合は、[Zilliz サポート](http://support.zilliz.com) にお問い合わせください。

</Procedures>

### Marketplace サブスクリプションの期限切れまたはキャンセルされた場合\{#if-your-marketplace-subscription-expired-or-was-canceled}

<Procedures>

1. Marketplace サブスクリプションを確認します。

    1. Marketplace の **無料トライアル** サブスクリプションの有効期限が切れた場合は、有料サブスクリプションに [アップグレード](./subscribe-on-aws-marketplace-free-trial#upgrade-to-paid-subscription) します。

    1. Marketplace の **パブリックオファー** サブスクリプションがキャンセルされた場合は、再度 [サブスクライブ](./subscribe-on-aws-marketplace) するか、[他の支払い方法に切り替え](./update-payment-method) ます。

    1. Marketplace の **プライベートオファー** サブスクリプションの有効期限が切れた場合は、プライベートオファーを [更新](./subscribe-on-aws-marketplace-private-offer#renew-your-private-offer) するか、アカウント担当者にお問い合わせください。

1. 請求ページの **支払い方法** セクションで更新されたサブスクリプションを確認します。

1. 支払いを [再試行](./manage-invoice#pay-invoice) します。それでも未払いのインボイスを支払えない場合は、[Zilliz サポート](http://support.zilliz.com) にお問い合わせください。

</Procedures>

## 組織復旧後\{#after-recovering-your-organization}

組織の凍結が解除された後、ごみ箱に移動されたデータとリソースは自動的には復元されません。

それらを復元するには、[ごみ箱](./use-recycle-bin) に移動し、必要なデータとリソースを手動で復元します。

復元後、アプリケーションが復元されたリソースに期待どおりにアクセスできることを確認します。

## 支払いの問題を回避する\{#avoid-payment-issues}

サービス中断のリスクを減らすには：

- [残りのクレジットとクレジットの有効期限を監視](./monitor-billing-alerts) します。

- [クレジットカード](./subscribe-by-adding-credit-card) を最新の状態に保ちます。

- 残高がなくなる前に [Advance Pay](./advance-pay) を補充します。

- Marketplace の [プライベートオファー](./subscribe-on-aws-marketplace-private-offer) を期限切れ前に更新します。

- 使用量、クレジット、カードの有効性、Advance Pay 残高に関する [請求アラートを設定](./monitor-billing-alerts) します。

- [Marketplace サブスクリプション](./marketplace-subscription) が正しい Zilliz Cloud 組織にリンクされていることを確認します。

- 組織が最近初めてクレジットカードを追加した場合は、累積使用量が最初に請求しきい値に達したときに、中間請求に対応できる十分な利用可能残高がカードにあることを確認してください。

