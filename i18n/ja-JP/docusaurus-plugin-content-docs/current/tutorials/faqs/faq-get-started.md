---
title: "FAQ: はじめに | CLOUD"
slug: /faq-get-started
sidebar_label: "FAQ: はじめに"
beta: FALSE
notebook: FALSE
description: "このトピックでは、Zilliz Cloud を使い始める際に発生する可能性のある問題とその解決策を紹介します。 | CLOUD"
type: origin
token: EV41wG08BiOWW8kbo9xcTGoPnKd
sidebar_position: 1

---

# FAQ: はじめに

このトピックでは、Zilliz Cloud を使い始める際に発生する可能性のある問題とその解決策を紹介します。

## よくある質問

- [Zilliz Cloud と他のベクトル検索ソリューションのパフォーマンス比較はありますか？](#is-there-any-performance-comparison-between-zilliz-cloud-and-other-vector-search-solutions)
- [Zilliz Cloud ではどのタイプのインデックスがサポートされていますか？](#which-type-of-index-is-supported-by-zilliz-cloud)
- [Zilliz Cloud の検索レイテンシーはどのくらいですか？](#what-is-the-search-latency-of-zilliz-cloud)
- [すべてのリージョンで価格は同じですか？](#is-pricing-the-same-in-every-region)
- [無料トライアルの後はどうなりますか？](#what-happens-after-the-free-trial)
- [マーケットプレイスでの Zilliz Cloud の価格はどうなっていますか？](#what-is-the-pricing-of-zilliz-cloud-on-marketplaces)
- [クレジットを追加で申請できますか？](#can-i-apply-for-more-credits)
- [無料トライアルを延長できますか？](#can-i-extend-my-free-trial)
- [さらに技術サポートを受けるにはどうすればよいですか？](#how-can-i-get-further-technical-support)
- [GitHub アカウントでサインアップできますか？](#can-i-sign-up-with-my-github-account)
- [サインアップ中にメール確認コードが届きませんでした。どうすればよいですか？](#during-signup-i-did-not-receive-the-email-verification-code-what-should-i-do)
- [登録が失敗したのはなぜですか？](#why-did-my-registration-fail)
- [Google または GitHub でサインアップする前に MFA を無効にする必要がありますか？](#do-i-need-to-disable-mfa-before-signing-up-with-google-or-github)

## FAQ

### Zilliz Cloud と他のベクトル検索ソリューションのパフォーマンス比較はありますか？\{#is-there-any-performance-comparison-between-zilliz-cloud-and-other-vector-search-solutions}

はい。[VectorDBBench](https://zilliz.com/vector-database-benchmark-tool) というベクトルデータベースのベンチマークツールを使用して、Zilliz Cloud と他の主要なベクトルデータベースやクラウドサービスのパフォーマンスを比較できます。

### Zilliz Cloud ではどのタイプのインデックスがサポートされていますか？\{#which-type-of-index-is-supported-by-zilliz-cloud}

現在、Zilliz Cloud は AUTOINDEX のみをサポートしています。これは、より良い検索パフォーマンスを実現するための独自のインデックスタイプです。詳細については、[AUTOINDEX の説明](./autoindex-explained) を参照してください。

ただし、当社がサポートする[任意のインデックス](https://milvus.io/docs/index.md)の使用に慣れている場合は、[リクエストを送信](https://support.zilliz.com/hc/en-us)してください。アプリケーションのニーズを評価し、インデックスを有効にするお手伝いをします。

### Zilliz Cloud の検索レイテンシーはどのくらいですか？\{#what-is-the-search-latency-of-zilliz-cloud}

検索レイテンシーは、クラスタータイプとデータ量によって異なります。

<table>
   <tr>
     <th><p>top_k</p></th>
     <th><p>パフォーマンス最適化済みクラスターのレイテンシー (768-dim 1M vectors)</p></th>
     <th><p>容量最適化済みクラスターのレイテンシー (768-dim 5M vectors)</p></th>
   </tr>
   <tr>
     <td><p>10</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>100</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>1000</p></td>
     <td><p>10 - 20 ms</p></td>
     <td><p>50 - 100 ms</p></td>
   </tr>
</table>

テスト結果の詳細については、[適切な CU を選択する](./cu-types-explained) を参照してください。

### すべてのリージョンで価格は同じですか？\{#is-pricing-the-same-in-every-region}

簡単に言うと、クラウドサービスの価格はプロバイダーやリージョンによって異なることがよくあります。これらの違いには、クラウドデータベースサービスが依存する基盤となる物理リソースのコストなど、いくつかの要因が寄与しています。詳細については、[料金](https://zilliz.com/pricing) を参照してください。

### 無料トライアルの後はどうなりますか？\{#what-happens-after-the-free-trial}

無料トライアルが終了しても、フリークラスターには引き続きアクセスできます。ただし、サーバーレスクラスターと専用クラスター内のすべてのデータはごみ箱に移動され、30日間保持されます。クラスターデータを安全に回復するには、支払い方法を提供してください。詳細については、[Zilliz Cloud を無料で試す](./free-trials#use-free-trial) を参照してください。

### マーケットプレイスでの Zilliz Cloud の価格はどうなっていますか？\{#what-is-the-pricing-of-zilliz-cloud-on-marketplaces}

マーケットプレイスの価格条件の詳細については、[支払いと請求](./billing-management) を参照してください。

### クレジットを追加で申請できますか？\{#can-i-apply-for-more-credits}

Zilliz Cloud に仕事用メールアドレスで登録すると、100ドルの無料クレジットを受け取れます。[マーケットプレイス](./subscribe-on-aws-marketplace) で Zilliz Cloud にサブスクライブすると、さらに100ドルのクレジットを獲得できます。追加のクレジットや割引については、[営業にお問い合わせ](https://zilliz.com/contact-sales) ください。

### 無料トライアルを延長できますか？\{#can-i-extend-my-free-trial}

はい、可能です。Zilliz Cloud に登録すると、30日間有効な100ドルのクレジットを受け取ります。[支払い方法を追加する](./billing-management) ことで、これらのクレジットの有効期限を1年に延長できます。

### さらに技術サポートを受けるにはどうすればよいですか？\{#how-can-i-get-further-technical-support}

Zilliz Cloud の[サポートポータル](https://support.zilliz.com/hc/en-us)にリクエストを送信してください。

### GitHub アカウントでサインアップできますか？\{#can-i-sign-up-with-my-github-account}

はい、ただし GitHub アカウントに公開メールアドレスが必要です。登録する前に、GitHub プロフィール設定に移動してメールアドレスを公開設定にしてください。

### サインアップ中にメール確認コードが届きませんでした。どうすればよいですか？\{#during-signup-i-did-not-receive-the-email-verification-code-what-should-i-do}

確認ページで「再送信」をクリックしてください。それでも届かない場合は、迷惑メールフォルダを確認してください。

### 登録が失敗したのはなぜですか？\{#why-did-my-registration-fail}

同じメールアドレスでアカウントが既に存在する可能性があります。代わりにログインしてみてください。問題が解決しない場合は、[サポートにお問い合わせ](https://support.zilliz.com/) ください。

### Google または GitHub でサインアップする前に MFA を無効にする必要がありますか？\{#do-i-need-to-disable-mfa-before-signing-up-with-google-or-github}

はい。Google または GitHub アカウントでプロバイダー管理の MFA が有効になっている場合は、リンクする前に無効にして、スムーズな登録を確保してください。その後、再度有効にすることができます。
