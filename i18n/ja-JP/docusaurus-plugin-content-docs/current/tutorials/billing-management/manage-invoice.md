---
title: "請求書の管理 | Cloud"
slug: /manage-invoice
sidebar_key: manage-invoice
sidebar_label: "請求書の管理"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud 組織の請求書を表示、ダウンロード、追跡する方法について説明します。 | Cloud"
type: origin
token: A3YdwRQwoiDLfkkPbwOcEOr3nLe
sidebar_position: 6
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 請求書
  - 管理

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Procedures from '@site/src/components/Procedures';

# 請求書の管理

このガイドでは、Zilliz Cloud 組織の請求書を表示、ダウンロード、追跡する方法について説明します。

支払い方法によっては、請求書は Zilliz Cloud またはご登録のクラウドマーケットプレイスから発行される場合があります。

<Admonition type="info" icon="📘" title="Note">

請求書を管理するには、**組織オーナー** または **組織の請求管理者** である必要があります。

</Admonition>

### すべての請求書を一覧表示\{#list-all-invoices}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

![請求書の表示](https://zdoc-images.s3.us-west-2.amazonaws.com/view-invoices.png "view-invoices")

<Procedures>

1. 左側のナビゲーションで **請求** をクリックします。

1. **請求書** タブに切り替えます。現在および過去のすべての請求書が表示されます。

</Procedures>

</TabItem>

<TabItem value="Bash">

<Admonition type="info" icon="📘" title="Notes">

List 請求書 RESTful API は現在パブリックプレビュー中です。この API を使用するには、[お問い合わせ](http://support.zilliz.com) ください。

</Admonition>

リクエストは以下の例のようになります。ここで `{TOKEN}` は [組織オーナーまたは請求管理者ロール](./organization-users#invite-a-user-to-your-organization) を持つ認証 API キーです。次の `GET` リクエストは、組織のすべての請求書を一覧表示します。

```bash
curl --request GET \
--url "https://api.cloud.zilliz.com/v2/invoices" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "count": 1,
#         "currentPage": 1,
#         "pageSize": 10,
#         "invoices": [
#             {
#                 "id": "inv-12312io23810o291",
#                 "orgId": "org-xxxxxx",
#                 "periodStart": "2024-01-01T00:00:00Z",
#                 "periodEnd": "2024-02-01T00:00:00Z",
#                 "invoiceDate": "2024-02-01T00:00:00Z",
#                 "dueDate": "2024-02-01T00:00:00Z",
#                 "currency": "USD",
#                 "status": "unpaid",
#                 "usageAmount": 52400,
#                 "creditsApplied": 12400,
#                 "alreadyBilledAmount": 0,
#                 "subtotal": 40000,
#                 "tax": 5000,
#                 "total": 45000,
#                 "advancePayAmount": 0,
#                 "amountDue": 45000
#             }
#         ]
#     }
# }
```

<Admonition type="info" icon="📘" title="Notes">

API が返す結果では、すべての金額はセント単位で表示されます。

</Admonition>

</TabItem>

</Tabs>

### 特定の請求書の詳細を表示する\{#view-the-details-of-a-specific-invoice}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

![view-invoice-detail](https://zdoc-images.s3.us-west-2.amazonaws.com/view-invoice-detail.png "view-invoice-detail")

<Procedures>

1. 左側のナビゲーションで **請求** をクリックします。

1. **請求書** タブに切り替えます。

1. 対象の請求書の請求期間をクリックして詳細を表示します。

</Procedures>

</TabItem>

<TabItem value="Bash">

<Admonition type="info" icon="📘" title="Notes">

Describe Invoice RESTful API は現在パブリックプレビュー中です。この API を使用するには、[お問い合わせ](http://support.zilliz.com) ください。

</Admonition>

リクエストは以下の例のようになります。`{TOKEN}` は [組織オーナーまたは請求管理者](./organization-users#invite-a-user-to-your-organization) のロールを持つ認証 API キーです。以下の `GET` リクエストは、指定された請求書の詳細を取得します。

```bash
curl --request GET \
--url "https://api.cloud.zilliz.com/v2/invoices/${INVOICE_ID}" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "id": "inv-12312io23810o291",
#         "orgId": "org-xxxxxx",
#         "periodStart": "2024-01-01T00:00:00Z",
#         "periodEnd": "2024-02-01T00:00:00Z",
#         "invoiceDate": "2024-02-01T00:00:00Z",
#         "dueDate": "2024-02-01T00:00:00Z",
#         "currency": "USD",
#         "status": "unpaid",
#         "usageAmount": 52400,
#         "creditsApplied": 12400,
#         "alreadyBilledAmount": 0,
#         "subtotal": 40000,
#         "tax": 5000,
#         "total": 45000,
#         "advancePayAmount": 0,
#         "amountDue": 45000
#     }
# }
```

上記のコマンドでは、

- `{API_KEY}`：APIリクエストの認証に使用される資格情報です。ご自身の値に置き換えてください。

- `{INVOICE_ID}`：説明する請求書のIDです。

<Admonition type="info" icon="📘" title="Notes">

APIから返される結果では、すべての金額はセント単位です。

</Admonition>

</TabItem>

</Tabs>

### 請求書の支払い\{#pay-invoice}

請求書が期限切れになった場合、最初に支払い方法を確認して更新し、その後Zilliz Cloud Webコンソールで支払いビューを再試行できます。

![請求書の支払い](https://zdoc-images.s3.us-west-2.amazonaws.com/pay-invoice.png "pay-invoice")

### 請求書のダウンロード\{#download-invoice}

請求書をダウンロードするには、Zilliz Cloud Webコンソールで対象の請求書の横にあるダウンロードアイコンをクリックします。

![請求書のダウンロード](https://zdoc-images.s3.us-west-2.amazonaws.com/download-invoices.png "download-invoices")

