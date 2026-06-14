---
title: "データのインポート（コンソール） | Cloud"
slug: /import-data-on-web-ui
sidebar_key: import-data-on-web-ui
sidebar_label: "コンソール"
beta: FALSE
notebook: FALSE
description: "このページでは、Zilliz Cloud コンソールで準備されたデータをインポートする方法を説明します。 | Cloud"
type: origin
token: KkdswLx2bi4bgCkY6bEc7Do9neh
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - データインポート
  - コンソール

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# データインポート（コンソール）

このページでは、Zilliz Cloud コンソールで準備したデータをインポートする方法について説明します。

## Web UI でデータをインポートする\{#import-data-on-the-web-ui}

データファイルの準備ができたら、ローカルドライブから直接インポートするか、データインポート用に AWS S3、Google Cloud GCS、Azure Blob Storage などのオブジェクトストレージバケットにアップロードできます。

<Admonition type="info" icon="📘" title="Notes">

- コレクション内で実行中または保留中のインポートジョブは最大 10,000 個まで可能です。

- Web コンソールでは、最大 1 GB のローカル JSON または Parquet ファイルのアップロードをサポートしています。より大きなファイルの場合は、代わりに [オブジェクトストレージからアップロード](./import-data-on-web-ui#remote-files-from-an-object-storage-bucket) することをお勧めします。データインポートで問題が発生した場合は、[サポートチケットを作成](https://support.zilliz.com/hc/en-us) してください。

</Admonition>

### ローカルファイル\{#local-file}

Zilliz Cloud は、ローカル JSON または Parquet ファイルからのデータインポートをサポートしています。データが NumPy 形式で準備されている場合は、[オブジェクトストレージバケット](./import-data-on-web-ui#remote-files-from-an-object-storage-bucket) からインポートしてください。

ローカルファイルからデータをインポートするには、アップロードエリアにファイルをドラッグアンドドロップし、**インポート** をクリックします。

<Supademo id="cme7x3fgv388ch3pyymi6ek0q?utm_source=link" title=""  />

### オブジェクトストレージバケットからのリモートファイル\{#remote-files-from-an-object-storage-bucket}

リモートファイルをインポートするには、まずリモートバケットにアップロードする必要があります。[BulkWriter ツール](./use-bulkwriter) を使用して、生データをサポートされている形式に変換し、結果ファイルをアップロードできます。

準備したファイルをリモートバケットにアップロードしたら、オブジェクトストレージサービスを選択し、リモートバケット内のファイルへのパスと、Zilliz Cloud がバケットからデータを取得するためのバケット認証情報を入力します。

データセキュリティの要件に基づいて、データインポート時に長期認証情報または短期トークンのいずれかを使用できます。

認証情報の取得の詳細については、以下を参照してください。

- Amazon S3: [長期認証情報を使用した認証](https://docs.aws.amazon.com/sdkref/latest/guide/access-iam-users.html)

- Google Cloud Storage: [サービスアカウントの HMAC キーの管理](https://cloud.google.com/storage/docs/authentication/managing-hmackeys)

- Azure Blob Storage: [アカウントアクセスキーの表示](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys)

短期トークンの使用の詳細については、[この FAQ](/docs/faq-data-import#can-i-use-short-term-credentials-when-importing-data-from-an-object-storage-service) を参照してください。

<Admonition type="info" icon="📘" title="Notes">

Zilliz Cloud では、クラスターをホストしているクラウドプロバイダーに関係なく、任意のオブジェクトストレージサービスから任意の Zilliz Cloud クラスターにデータをインポートできるようになりました。たとえば、AWS S3 バケットから GCP にデプロイされた Zilliz Cloud クラスターにデータをインポートできます。

低レイテンシで安定したエクスペリエンスを確保するために、ターゲットクラスターと同じプロバイダーおよび同じリージョンのバケットまたは BLOB コンテナーを使用することをお勧めします。

</Admonition>

<Supademo id="cme7xfbw40096xf0irz21196r?utm_source=link" title=""  />

### ボリュームから\{#from-a-volume}

- **マネージドボリューム**: ローカルファイルが非常に大きい（> 1GB）場合は、最初に[ファイルをマネージドボリュームにアップロード](./managed-volume) し、ボリュームからインポートできます。準備したファイルをボリュームにアップロードしたら、ファイルパスをコピーして、コレクションにファイルをインポートします。

- **外部ボリューム**: データファイルがクラウドオブジェクトストレージバケットにある場合は、そのバケットにマッピングする[外部ボリューム](./external-volume) を作成できます。その後、毎回認証情報を提供することなく、外部ボリュームから直接データをインポートできます。

次のデモは、マネージドボリュームからデータをインポートする方法を示しています。

<Supademo id="cmidzr662adilb7b4d7l45rnf?utm_source=link" title=""  />

## 結果を確認する\{#verify-results}

インポートジョブの進行状況とステータスは、[ジョブ](./job-center) ページで確認できます。

## サポートされているオブジェクトパス\{#supported-object-paths}

該当するオブジェクトパスについては、[ストレージオプション](./data-import-storage-options) と [フォーマットオプション](./data-import-format-options) を参照してください。

## FAQ\{#faq}

**外部ボリュームと外部ストレージからの直接インポートの違いは何ですか？**

どちらも独自の S3 または GCS バケットからデータをインポートできます。主な違いは次のとおりです。

- 外部ボリュームでは、認証情報管理のために、[AWS S3 バケット](./integrate-with-aws-s3)、[Google Cloud Storage バケット](./integrate-with-gcp)、または [Microsoft Azure BLOB ストレージコンテナー](./integrate-with-azure-blob-storage) を Zilliz Cloud と統合する必要があります。認証情報は一度設定され、複数のボリュームと操作で再利用されます。データエンジニアはクラウドストレージキーに直接アクセスする必要はありません。

- 直接の[外部ストレージインポート](./import-data-on-web-ui#remote-files-from-an-object-storage-bucket) では、各インポートリクエストにインラインで認証情報（アクセスキー、シークレットキー）を提供する必要があります。これは1回限りのインポートには簡単ですが、認証情報の分離や再利用性は提供されません。

## 関連トピック\{#related-topics}

- [ストレージオプション](./data-import-storage-options)

- [フォーマットオプション](./data-import-format-options)

- [RESTful API 経由のデータインポート](./import-data-via-restful-api)

- [SDK 経由のデータインポート](./import-data-via-sdks)

- [データインポートのハンズオン](./data-import-zero-to-hero)

