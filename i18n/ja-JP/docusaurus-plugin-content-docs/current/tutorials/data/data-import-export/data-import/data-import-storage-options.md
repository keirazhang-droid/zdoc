---
title: "ストレージオプション | Cloud"
slug: /data-import-storage-options
sidebar_key: data-import-storage-options
sidebar_label: "ストレージオプション"
beta: FALSE
notebook: FALSE
description: "データをインポートする前に、サポートされているクラウドストレージオプションとそれに対応するURL形式を理解することが重要です。これにより、リクエストが検証エラーなしで適切に処理されます。 | Cloud"
type: origin
token: TjxAw7lx6iNluBkR4a6czoHpn0f
sidebar_position: 1
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - データインポート
  - Milvus
  - ストレージオプション

---

import Admonition from '@theme/Admonition';


# ストレージオプション

データをインポートする前に、サポートされているクラウドストレージオプションとそれに対応するURL形式を理解することが重要です。これにより、リクエストが検証エラーなしで適切に処理されることが保証されます。

<Admonition type="info" icon="📘" title="Notes">

Zilliz Cloudでは現在、クラスターをホストするクラウドプロバイダーに関係なく、任意のオブジェクトストレージサービスから任意の Zilliz Cloud クラスターにデータをインポートできます。たとえば、AWS S3 バケットから GCP にデプロイされた Zilliz Cloud クラスターにデータをインポートできます。

低レイテンシで安定したエクスペリエンスを確保するには、ターゲットクラスターと同じプロバイダーかつ同じリージョンのバケットまたは BLOB コンテナーを使用することをお勧めします。

</Admonition>

## Amazon Simple Storage Service (S3)\{#amazon-simple-storage-service-s3}

- **オブジェクトアクセスURI**

    <table>
       <tr>
         <th><p><strong>URIスタイル</strong></p></th>
         <th><p><strong>URI形式</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>AWS オブジェクト URL、仮想ホストスタイル</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: https://&lt;bucket_name&gt;.s3.&lt;region-code&gt;.amazonaws.com/&lt;object_name&gt;</p></li><li><p><strong>フォルダー</strong>: https://&lt;bucket_name&gt;.s3.&lt;region-code&gt;.amazonaws.com/&lt;folder_name&gt;/</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>AWS オブジェクト URL、パススタイル</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: https://s3.&lt;region-code&gt;.amazonaws.com/&lt;bucket_name&gt;/&lt;object_name&gt;</p></li><li><p><strong>フォルダー</strong>: https://s3.&lt;region-code&gt;.amazonaws.com/&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>AWS S3 URI</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: s3://&lt;bucket_name&gt;/&lt;object_name&gt;</p></li><li><p><strong>フォルダー</strong>: s3://&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></li></ul></td>
       </tr>
    </table>

    詳細については、[バケットへのアクセス方法](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html) を参照してください。

- **必要な権限**

    - `s3:GetObject`

    - `s3:Listバケット`

    - `s3:GetバケットLocation`

    - `kms:Decrypt`

        <Admonition type="info" icon="📘" title="Notes">

        バケットまたはバケット内の特定のアイテムがカスタム KMS ID で暗号化されている場合は、認証情報とともにその KMS ID の復号化権限を提供する必要があります。

        </Admonition>

- **認証情報の取得**

    データセキュリティの要件に基づき、データインポート時に長期認証情報またはセッショントークンのいずれかを使用できます。

    - 長期認証情報で認証する場合は、[長期認証情報を使用した認証](https://docs.aws.amazon.com/sdkref/latest/guide/access-iam-users.html) を参照してください。

    - 短期認証情報で認証する場合は、[この FAQ](/docs/faq-data-import#can-i-use-short-term-credentials-when-importing-data-from-an-object-storage-service) を参照してください。

## Google Cloud Storage\{#google-cloud-storage}

- **オブジェクトアクセスURI**

    <table>
       <tr>
         <th><p><strong>URIスタイル</strong></p></th>
         <th><p><strong>URI形式</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>GSC パブリック URL</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: https://storage.cloud.google.com/&lt;bucket_name&gt;/&lt;object_name&gt;</p></li><li><p><strong>フォルダー</strong>: https://storage.cloud.google.com/&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>GSC gsutil URI</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: gs://&lt;bucket_name&gt;/&lt;object_name&gt;</p></li><li><p><strong>フォルダー</strong>: gs://&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></li></ul></td>
       </tr>
    </table>

    詳細については、[オブジェクトの共有](https://cloud.google.com/storage/docs/discover-object-storage-console#share_the_object) を参照してください。

- **必要な権限**

    - `storage.objects.get`

    - `storage.objects.list`

- **認証情報の取得**

    データセキュリティの要件に基づき、データインポート時に長期認証情報またはセッショントークンのいずれかを使用できます。

    - 長期認証情報で認証する場合は、[サービスアカウントの HMAC キーの管理](https://cloud.google.com/storage/docs/authentication/managing-hmackeys) を参照してください。

    - 短期認証情報で認証する場合は、[この FAQ](/docs/faq-data-import#can-i-use-short-term-credentials-when-importing-data-from-an-object-storage-service) を参照してください。

## Azure Blob Storage\{#azure-blob-storage}

- **オブジェクトアクセスURI**

    <table>
       <tr>
         <th><p><strong>URIスタイル</strong></p></th>
         <th><p><strong>URI形式</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>Azure ストレージ BLOB URI</strong></p></td>
         <td><ul><li><p><strong>ファイル</strong>: https://&lt;storage_account&gt;.blob.core.windows.net/&lt;container&gt;/&lt;blob&gt;</p></li><li><p><strong>フォルダー</strong>: https://&lt;storage_account&gt;.blob.core.windows.net/&lt;container&gt;/&lt;folder&gt;/</p></li></ul></td>
       </tr>
    </table>

    詳細については、[リソース URI 構文](https://learn.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#resource-uri-syntax) を参照してください。

- **認証情報の取得**

    データセキュリティの要件に基づき、データインポート時に長期認証情報またはセッショントークンのいずれかを使用できます。

    - 長期認証情報で認証する場合は、[アカウントアクセスキーの表示](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys) を参照してください。

    - 短期認証情報で認証する場合は、[この FAQ](/docs/faq-data-import#can-i-use-short-term-credentials-when-importing-data-from-an-object-storage-service) を参照してください。

