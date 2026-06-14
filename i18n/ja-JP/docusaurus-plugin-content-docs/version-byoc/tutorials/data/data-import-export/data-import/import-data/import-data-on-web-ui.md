---
title: "データのインポート (コンソール) | BYOC"
slug: /import-data-on-web-ui
sidebar_key: import-data-on-web-ui
sidebar_label: "コンソール"
beta: FALSE
notebook: FALSE
description: "このページでは、Zilliz Cloud コンソールで準備したデータをインポートする方法を紹介します。 | BYOC"
type: origin
token: KkdswLx2bi4bgCkY6bEc7Do9neh
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - データのインポート
  - コンソール

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# データインポート（コンソール）

このページでは、Zilliz Cloud コンソールで準備したデータをインポートする方法を説明します。

## Web UI でデータをインポートする\{#import-data-on-the-web-ui}

データファイルの準備ができたら、データインポート用にオブジェクトストレージバケットにアップロードできます。

<Admonition type="info" icon="📘" title="Notes">

- コレクション内で実行中または保留中のインポートジョブは最大10,000個まで保持できます。

- Webコンソールは、最大1GBのローカルJSONまたはParquetファイルのアップロードをサポートしています。より大きなファイルの場合は、代わりに[オブジェクトストレージからアップロード](./import-data-on-web-ui#remote-files-from-an-object-storage-bucket)することをお勧めします。データインポートに関する問題が発生した場合は、[サポートチケットを作成](https://support.zilliz.com/hc/en-us)してください。

</Admonition>

### オブジェクトストレージバケットからのリモートファイル\{#remote-files-from-an-object-storage-bucket}

リモートファイルをインポートするには、まずそれらをリモートバケットにアップロードする必要があります。[BulkWriterツール](./use-bulkwriter)を使用して、生データをサポートされている形式に簡単に変換し、結果ファイルをアップロードできます。

準備したファイルをリモートバケットにアップロードしたら、オブジェクトストレージサービスを選択し、リモートバケット内のファイルへのパスと、Zilliz Cloudがバケットからデータをプルするためのバケット認証情報を入力します。

データセキュリティの要件に応じて、データインポート時に長期認証情報または短期トークンのいずれかを使用できます。

認証情報の取得に関する詳細は以下を参照してください：

- Amazon S3：[長期認証情報を使用した認証](https://docs.aws.amazon.com/sdkref/latest/guide/access-iam-users.html)

- Google Cloud Storage：[サービスアカウントのHMACキーを管理する](https://cloud.google.com/storage/docs/authentication/managing-hmackeys)

- Azure Blob Storage：[アカウントアクセスキーを表示する](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys)

短期トークンの使用に関する詳細は、[このFAQ](/docs/faq-data-import#can-i-use-short-term-credentials-when-importing-data-from-an-object-storage-service)を参照してください。

<Admonition type="info" icon="📘" title="Notes">

Zilliz Cloud では、クラスターをホストするクラウドプロバイダーに関係なく、任意のオブジェクトストレージサービスから任意の Zilliz Cloud クラスターにデータをインポートできるようになりました。たとえば、AWS S3 バケットから GCP にデプロイされた Zilliz Cloud クラスターにデータをインポートできます。

低レイテンシで安定したエクスペリエンスを確保するために、ターゲットクラスターと同じプロバイダーかつ同じリージョンのバケットまたはBLOBコンテナを使用することをお勧めします。

</Admonition>

<Supademo id="cme7xfbw40096xf0irz21196r?utm_source=link" title=""  />

## 結果の確認\{#verify-results}

インポートジョブの進捗状況とステータスは、[ジョブ](./job-center) ページで確認できます。

## サポートされているオブジェクトパス\{#supported-object-paths}

該当するオブジェクトパスについては、[ストレージオプション](./data-import-storage-options) および [フォーマットオプション](./data-import-format-options) を参照してください。

## 関連トピック\{#related-topics}

- [ストレージオプション](./data-import-storage-options)

- [フォーマットオプション](./data-import-format-options)

- [RESTful API 経由でのデータインポート](./import-data-via-restful-api)

- [SDK 経由でのデータインポート](./import-data-via-sdks)

- [データインポートのハンズオン](./data-import-zero-to-hero)

