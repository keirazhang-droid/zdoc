---
title: "マーケットプレイスサブスクリプション | Cloud"
slug: /marketplace-subscription
sidebar_key: marketplace-subscription
sidebar_label: "マーケットプレイスサブスクリプション"
beta: FALSE
notebook: FALSE
description: "サポートされているクラウドマーケットプレイスを通じて Zilliz Cloud に登録し、既存のクラウド請求アカウントで Zilliz Cloud の料金を支払うことができます。 | Cloud"
type: origin
token: OFjswbvuoit64pk5eGqc9Yx3nGg
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - マーケットプレイスサブスクリプション
  - AWS
  - Google Cloud
  - Microsoft
  - マーケットプレイス

---

import Admonition from '@theme/Admonition';


# マーケットプレイス サブスクリプション

サポートされているクラウドマーケットプレイスを通じて Zilliz Cloud にサブスクライブし、既存のクラウド請求アカウントを介して Zilliz Cloud の料金を受け取ることができます。

<Admonition type="info" icon="📘" title="Note">

支払い方法とサブスクリプションを管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

Zilliz Cloud は、次のマーケットプレイスを通じたサブスクリプションをサポートしています。

- AWS Marketplace

- Google Cloud Marketplace

- Microsoft Marketplace

## サブスクリプション オプション\{#subscription-options}

各マーケットプレイスは、複数のサブスクリプション オプションをサポートする場合があります。

- マーケットプレイス無料トライアル

- マーケットプレイス公開オファー

- マーケットプレイス プライベート オファー

次の表は、サブスクリプション オプションを比較しています。

<table>
   <tr>
     <th><p><strong>サブスクリプション オプション</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>最適な用途</strong></p></th>
     <th><p><strong>商用条件</strong></p></th>
     <th><p><strong>利用可能性</strong></p></th>
   </tr>
   <tr>
     <td><p>マーケットプレイス無料トライアル</p></td>
     <td><p>クラウドマーケットプレイスを通じて Zilliz Cloud を評価し、その後有料サブスクリプションに移行できるトライアルサブスクリプションです。</p></td>
     <td><p>初期評価と短期テスト。</p></td>
     <td><p>30日間の無料トライアルです。無料トライアル終了後は、有料サブスクリプションに<a href="./subscribe-on-aws-marketplace-free-trial#upgrade-to-paid-subscription">アップグレード</a>する必要があります。</p></td>
     <td><p><strong>AWS</strong> Marketplace を通じた Zilliz Cloud <strong>SaaS</strong> デプロイメントでのみ利用可能です。</p></td>
   </tr>
   <tr>
     <td><p>マーケットプレイス公開オファー</p></td>
     <td><p>クラウドマーケットプレイスで利用可能な標準の Zilliz Cloud リスティングです。</p></td>
     <td><p>標準的な価格と条件でのセルフサービスサブスクリプション。</p></td>
     <td><p>マーケットプレイスのリスティングページに表示される公開価格、契約条件、請求ルールを使用します。</p></td>
     <td><p><strong>AWS、Google Cloud、Microsoft</strong> Marketplace を通じた Zilliz Cloud <strong>SaaS</strong> デプロイメントでのみ利用可能です。</p></td>
   </tr>
   <tr>
     <td><p>マーケットプレイス プライベート オファー</p></td>
     <td><p>Zilliz が組織向けに作成するカスタムオファーです。</p></td>
     <td><p>エンタープライズ調達、割引、確約消費、カスタム条件、BYOC 購入。</p></td>
     <td><p>ネゴシエートされた価格、カスタム契約期間、支払いスケジュール、その他の商用条件を含めることができます。</p></td>
     <td><p><strong>AWS、Google Cloud、Microsoft</strong> Marketplace を通じた Zilliz Cloud <strong>SaaS</strong> および <strong>BYOC</strong> デプロイメントの両方で利用可能です。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="**Note**">

AWS Marketplace 無料トライアルは、AWS Marketplace を通じて開始および管理されます。トライアル後にアップグレードした場合、将来の料金は AWS Marketplace を通じて請求されます。このオプションは、AWS Marketplace を通じて調達と請求を行いたいチームに適しています。

Zilliz Cloud 無料トライアルは、Zilliz Cloud コンソールから直接開始され、Zilliz Cloud 内で管理されます。トライアル後は、サポートされている[支払い方法](./set-up-payment-method)を追加することを選択できます。このオプションは、外部請求を設定する前に Zilliz Cloud を直接試してみたいユーザーに適しています。

</Admonition>

## 考慮事項\{#considerations}

マーケットプレイス サブスクリプションは支払い方法に過ぎません。プロジェクト、クラスター、および関連リソースを作成するクラウドプロバイダーを決定するものではありません。たとえば、AWS Marketplace を通じてサブスクライブした後も、選択したクラウドプロバイダーとリージョンがサポートされていれば、AWS、Google Cloud、または Azure 上に Zilliz Cloud のプロジェクトとクラスターを作成できます。

import DocCardList from '@theme/DocCardList';

<DocCardList />