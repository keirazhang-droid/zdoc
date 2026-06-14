---
title: "Milvus から Zilliz Cloud へのバックアップファイルによる移行 | BYOC"
slug: /via-backup-files
sidebar_key: via-backup-files
sidebar_label: "バックアップファイルによる"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud は、インフラストラクチャを自ら管理する必要なく Milvus ベクトルデータベースを使用したいユーザー向けに、Milvus をフルマネージドのクラウドホスト型ソリューションとして提供しています。このトピックでは、バックアップファイルを直接アップロードすることで Milvus から移行する方法について説明します。 | BYOC"
type: origin
token: IO4fwm5fJiroaoktKeIcbdkDnRb
sidebar_position: 2
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - 移行
  - milvus
  - バックアップファイル

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Procedures from '@site/src/components/Procedures';

# Milvus から Zilliz Cloud へのバックアップファイルを利用した移行

Zilliz Cloud は、インフラストラクチャを自分で管理することなく Milvus ベクトルデータベースを利用したいユーザー向けに、Milvus をフルマネージドのクラウドホスト型ソリューションとして提供しています。このトピックでは、バックアップファイルを直接アップロードして Milvus から移行する方法について説明します。

## 始める前に\{#before-you-start}

以下の前提条件が満たされていることを確認してください。

- 移行方法に基づいて移行に必要な準備ができていること:

    - **ローカルファイルから**: 事前にローカルバックアップファイルを準備します。バックアップファイルの準備方法については、[移行用のバックアップファイルの準備](./via-backup-files#prepare-backup-files-for-migration) を参照してください。

    - **オブジェクトストレージから**: Milvus オブジェクトストレージのパブリック URL とアクセス資格情報。長期または一時的な資格情報を選択できます。オブジェクトストレージ URL の詳細な例については、[FAQ](./via-backup-files#faq) を参照してください。

        <Admonition type="info" icon="📘" title="Notes">

        低遅延で安定したエクスペリエンスを確保するために、同じプロバイダーでターゲットクラスターと同じリージョンのバケットまたはブロブコンテナを使用することをお勧めします。

        </Admonition>

- **組織オーナー**または**プロジェクト管理者**のロールが付与されていること。必要な権限がない場合は、Zilliz Cloud 組織オーナーにお問い合わせください。

- ターゲットクラスターの CU サイズがソースデータに対応できることを確認してください。必要な CU サイズを見積もるには、[計算ツール](https://zilliz.com/pricing?_gl=1*qro801*_ga*MzkzNTY1NDM0LjE3Mjk1MDExNzQ.*_ga_Q1F8R2NWDP*MTc0NTQ4MzY1Ni4zMDEuMS4xNzQ1NDg0MTEzLjAuMC4w*_ga_KKMVYG8YF2*MTc0NTQ4MzY1Ni4yNTIuMS4xNzQ1NDg0MTEzLjAuMC4w#calculator) を使用してください。

## 移行用のバックアップファイルの準備\{#prepare-backup-files-for-migration}

Milvus 2.x の移行データを準備するには、

<Procedures>

1. **[milvus-backup](https://github.com/zilliztech/milvus-backup/releases)** をダウンロードします。常に最新リリースを使用してください。

    現在、Milvus 2.2 以降のバージョンから Zilliz Cloud クラスターにデータを移行できます。互換性のあるソースとターゲットの Milvus バージョンの詳細については、[Milvus バックアップの概要](https://milvus.io/docs/milvus_backup_overview.md) を参照してください。

1. ダウンロードしたバイナリと並べて **configs** フォルダを作成し、**[backup.yaml](https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml)** をその **configs** フォルダにダウンロードします。

    この手順が完了すると、ワークスペースフォルダの構造は次のようになります:

    ```plaintext
    workspace
    ├── milvus-backup
    └── configs
         └── backup.yaml
    ```

1. **backup.yaml** をカスタマイズします。

    通常の場合、このファイルをカスタマイズする必要は～しません。ただし、続行する前に、以下の設定項目が正しいかどうかを確認してください：

    ```yaml
    ...
    # milvus proxy address, compatible to milvus.yaml
    milvus:
      address: localhost
      port: 19530
      ...
      
    # Related configuration of minio, which is responsible for data persistence for Milvus.
    minio:
      # Milvus storage configs, make them the same with milvus config
      storageType: "minio" # support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent), gcpnative
      # You can use "gcpnative" for the Google Cloud Platform provider. Uses service account credentials for authentication.
      address: localhost # Address of MinIO/S3
      port: 9000   # Port of MinIO/S3
      bucketName: "a-bucket" # Milvus Bucket name in MinIO/S3, make it the same as your milvus instance
      backupBucketName: "a-bucket" # Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath
      rootPath: "files" # Milvus storage root path in MinIO/S3, make it the same as your milvus instance
      ...
    ```

    <Admonition type="info" icon="📘" title="Notes">

    - Docker Compose でインストールされた Milvus インスタンスの場合、`minio.bucketName` のデフォルト値は `a-bucket`、`rootPath` のデフォルト値は `files` です。

    - Kubernetes でインストールされた Milvus インスタンスの場合、`minio.bucketName` のデフォルト値は `milvus-bucket`、`rootPath` のデフォルト値は `file` です。

    </Admonition>

1. Milvus インストールのバックアップを作成します。

    ```plaintext
    ./milvus-backup --config backup.yaml create -n my_backup
    ```

1. バックアップファイルを取得します。

    ```plaintext
    ./milvus-backup --config backup.yaml get -n my_backup
    ```

1. バックアップファイルを確認します。

    - `minio.address` と `minio.port` を S3 バケットに設定した場合、バックアップファイルは既に S3 バケットに存在します。

    - `minio.address` と `minio.port` を Minio バケットに設定した場合、Minio Console または **mc** クライアントを使用してダウンロードできます。

        - [Minio Console](https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html) からダウンロードするには、Minio Console にログインし、`minio.address` で指定されたバケットを見つけ、バケット内のファイルを選択して、**ダウンロード** をクリックしてダウンロードします。

        - [mc](https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install) クライアントを使用する場合は、以下の手順を実行します。

            ```plaintext
            # configure a Minio host
            mc alias set my_minio https://<minio_endpoint> <accessKey> <secretKey>
            
            # List the available buckets
            mc ls my_minio
            
            # Download a file from the bucket
            mc cp --recursive my_minio/<your-bucket-path> <local_dir_path>
            ```

1. ダウンロードしたアーカイブを解凍し、**backup** フォルダの内容のみを Zilliz Cloud にアップロードします。

</Procedures>

## Zilliz Cloud へのデータ移行\{#migrate-data-to-zilliz-cloud}

バックアップファイルの準備ができたら、ローカルファイルからデータを移行できます。

<Supademo id="cmbhd2wj85jktsn1rnjmi4t5o" title="Zilliz Cloud - Migrate from Milvus via Backup File Demo" />

<Admonition type="info" icon="📘" title="Notes">

ソースコレクションで全文検索がすでに有効になっている場合、Zilliz Cloud は移行後にターゲットコレクションにその Function 設定を保持します。これらの継承された設定は変更できません。

</Admonition>

## 移行プロセスの監視\{#monitor-the-migration-process}

**Migrate** をクリックすると、移行ジョブが生成されます。[ジョブ](./job-center) ページで移行の進行状況を確認できます。ジョブのステータスが **進行中** から **成功** に変わると、移行は完了です。

<Supademo id="cme9my2nn4b64h3pyiyvsakqb" title="Zilliz Cloud - Monitor the Migration Process" />

<Admonition type="info" icon="📘" title="Notes">

移行後、ターゲットクラスターのコレクション数とエンティティ数がデータソースと一致していることを確認してください。不一致が見つかった場合は、エンティティが不足しているコレクションを削除して再移行します。

</Admonition>

## 移行後\{#post-migration}

移行ジョブが完了したら、次の点に注意してください。

- **インデックスの作成**: 移行プロセスでは、移行されたコレクションに対して自動的に [AUTOINDEX](./autoindex-explained) が作成されます。

- **手動ロードが必要です**: 自動インデックス作成にもかかわらず、移行されたコレクションはすぐに検索やクエリ操作に使用できるわけではありません。Zilliz Cloud でコレクションを手動でロードして、検索およびクエリ機能を有効にする必要があります。詳細については、[ロードとリリース](./load-release-collections) を参照してください。

## 移行ジョブのキャンセル\{#cancel-migration-job}

移行プロセスで問題が発生した場合は、次の手順で問題をトラブルシューティングし、移行を再開できます。

<Procedures>

1. [ジョブ](./job-center) ページで、失敗した移行ジョブを特定し、キャンセルします。

1. **Actions** 列の **View Details** をクリックして、エラーログにアクセスします。

</Procedures>

## FAQ\{#faq}

1. **オブジェクトストレージバケットに保存されたバックアップファイルから移行する場合、どのような形式の URL を使用すればよいですか？**

    次の表に、さまざまなオブジェクトストレージサービスの URL の例を示します。バックアップファイルから移行する場合、バックアップフォルダのみを選択できることに注意してください。

    <table>
       <tr>
         <th colspan="2"><p><strong>クラウドオブジェクトストレージ</strong></p></th>
         <th><p><strong>URL 形式</strong></p></th>
       </tr>
       <tr>
         <td rowspan="3"><p><strong>Amazon S3</strong></p></td>
         <td><p>AWS オブジェクト URL（仮想ホスト形式）</p></td>
         <td><p>https://&lt;bucket_name&gt;.s3.&lt;region-code&gt;.amazonaws.com/&lt;folder_name&gt;/</p></td>
       </tr>
       <tr>
         <td><p>AWS オブジェクト URL（パス形式）</p></td>
         <td><p>https://s3.&lt;region-code&gt;.amazonaws.com/&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></td>
       </tr>
       <tr>
         <td><p>Amazon S3 URI</p></td>
         <td><p>s3://&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></td>
       </tr>
       <tr>
         <td rowspan="2"><p><strong>Google Cloud Storage</strong></p></td>
         <td><p>GSC 公開 URL</p></td>
         <td><p>https://storage.cloud.google.com/&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></td>
       </tr>
       <tr>
         <td><p>GSC gsutil URI</p></td>
         <td><p>gs://&lt;bucket_name&gt;/&lt;folder_name&gt;/</p></td>
       </tr>
       <tr>
         <td colspan="2"><p><strong>Azure Blob Storage</strong></p></td>
         <td><p>https://&lt;storage_account&gt;.blob.core.windows.net/&lt;container&gt;/&lt;folder&gt;/</p></td>
       </tr>
    </table>
