---
title: "バックアップファイルからのリストア | BYOC"
slug: /restore-from-backup-files
sidebar_key: restore-from-backup-files
sidebar_label: "バックアップファイルからリストア"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud のリストア機能は、偶発的な損失、破損、またはシステム障害が発生した場合にバックアップファイルからデータを復旧し、ビジネス継続性を確保します。インシデントからの回復、意図しない変更の取り消し、または最小限の中断でテスト用にクラスターをクローンするための信頼性の高い方法です。 | BYOC"
type: origin
token: Dd6jwYIGiiz6HWkEPJqcpMA3n6g
sidebar_position: 4
keywords: 
  - Zilliz
  - ベクトルデータベース
  - クラウド
  - バックアップ
  - リストア

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# バックアップファイルからの復元

Zilliz Cloud の復元機能を使用すると、偶発的なデータ損失、破損、システム障害が発生した場合にバックアップファイルからデータを復旧でき、ビジネスの継続性を確保できます。これは、インシデントからの復旧、意図しない変更のロールバック、または最小限の中断でテスト用にクラスターをクローンするための信頼性の高い方法です。

このガイドでは、バックアップファイルからフルクラスターまたは部分クラスターを復元する方法について説明します。

## 制限\{#limits}

- **アクセス制御**: プロジェクト管理者、組織オーナー、またはバックアップ権限を持つカスタムロールが必要です。

## フルクラスターの復元\{#restore-a-full-cluster}

データベースとコレクションを含むクラスター全体を、**新しい**クラスターに復元できます。これは、テストや復旧用に環境をクローンする場合に便利です。クラスター全体を復元するには、バックアップファイルがクラスターバックアップである必要があります。

復元中に、以下の項目も設定できます。

- RBAC 設定を含めるかどうかを選択します。

- 復元された新しいクラスターの Milvus バージョンを選択します。

    - 過去30日以内に作成されたバックアップファイルの場合、元のクラスターが利用可能な最新のGAバージョンよりも前のMilvus GAバージョンを使用していた場合、復元するクラスターのMilvusバージョンを選択できます。デフォルトでは、Zilliz Cloudはクラスターを最新のGA Milvusバージョンに復元します。

    - 30日以上前に作成されたバックアップファイル、またはすでに最新のMilvus GAバージョンを使用しているバックアップファイルの場合、ターゲットのMilvusバージョンは変更できません。

    例: 利用可能な最新のMilvus GAバージョンが2.6.xだとします。

    - 過去30日以内に作成された2.5.xのバックアップファイルから復元する場合、Zilliz Cloudはデフォルトで新しいクラスターを2.6.xに復元しますが、2.5.xに復元することも選択できます。

    - 30日以上前に作成された2.5.xのバックアップファイルから復元する場合、Zilliz Cloudはデフォルトで新しいクラスターを2.6.xに復元し、ターゲットのMilvusバージョンは変更できません。

    - 2.6.xのバックアップファイルから復元する場合、Zilliz Cloudは新しいクラスターを2.6.xに復元し、ターゲットのMilvusバージョンは変更できません。

- CMEKを使用した保存時の暗号化を有効にするかどうかを選択します。詳細については、[カスタマー管理の暗号化キー](./cmek) を参照してください。

復元後、`db_admin` ユーザーに対して **新しいパスワード** が生成されます。このパスワードを使用して復元されたクラスターに接続します。

### ウェブコンソール経由\{#via-web-console}

次のデモは、Zilliz Cloud ウェブコンソールでフルクラスターを復元する方法を示しています。

<Supademo id="cmcsruzjd0gyo9st8kcjye30i" title=""  />

### RESTful API経由\{#via-restful-api}

次の例では、既存のバックアップファイルから `Dedicated-01-backup` という名前の新しいクラスターにフルクラスターを復元します。RESTful APIの詳細については、[クラスターバックアップの復元](/reference/restful/restore-cluster-backup-v2) を参照してください。

```bash
export API_KEY="YOUR_API_KEY"
export BASE_URL="https://api.cloud.zilliz.com"
export CLUSTER_ID="your-cluster-id"

curl --request POST \
     --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/${BACKUP_ID}/restoreCluster" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-type: application/json" \
     --data-raw '{
        "targetProjectId": "proj-20e13e974c7d659a83xxxx",
        "clusterName": "Dedicated-01-backup",
        "cuSize": 1,
        "collectionStatus": "KEEP"
      }'
```

復元ジョブが生成され、進捗状況は [プロジェクトジョブセンター](./job-center) で確認できます。

```bash
{
  "code": 0,
  "data": {
    "clusterId": "inxx-xxxxxxxxxxxxxxx",
    "username": "db_admin",
    "password": "xxxxxxxxx",
    "jobId": "job-xxxxxxxxxxxxxx"
  }
}
```

## クラスタの一部を復元する\{#restore-a-partial-cluster}

特定のデータベースとコレクションのみを**既存のクラスタ**に復元することも選択できます。

### ウェブコンソール経由\{#via-web-console}

以下のデモでは、Zilliz Cloud ウェブコンソールでクラスタ内の特定のデータベースとコレクションを復元する方法を示しています。

<Supademo id="cmcss7xi00h8c9st8qsqnutnn" title=""  />

### RESTful API経由\{#via-restful-api}

以下の例では、バックアップファイルから既存のクラスタ `inxx-xxxxxxxxxxxxxxx` にコレクションを復元します。RESTful API の詳細については、[コレクションバックアップの復元](/reference/restful/restore-collection-backup-v2) を参照してください。

```bash
curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/${BACKUP_ID}/restoreCollection" \
--header "Authorization: Bearer ${API_KEY}" \
--header "Content-Type: application/json" \
-d '{
    "destClusterId": "inxx-xxxxxxxxxxxxxxx",
    "dbCollections": [
        {
            "collections": [
                {
                    "collectionName": "medium_articles",
                    "destCollectionName": "restore_medium_articles",
                    "destCollectionStatus": "LOADED"
                }
            ]
        }
    ]
}'
```

復元ジョブが生成され、進捗状況は [プロジェクトジョブセンター](./job-center) で確認できます。

```bash
{
  "code": 0,
  "data": {
    "jobId": "job-04bf9335838dzkeydpxxxx"
  }
}
```

## FAQ\{#faq}

**復元されたクラスターはどの Milvus バージョンで実行されますか？**

デフォルトでは、フルクラスター復元では、Zilliz Cloud がサポートする最新の GA メジャーバージョンでターゲットクラスターが作成されます。

- 過去30日以内に作成されたバックアップファイルの場合、元のクラスターが最新の GA バージョンよりも古い Milvus GA バージョンを使用していた場合、復元されたクラスターの Milvus バージョンを選択できます。デフォルトでは、Zilliz Cloud はクラスターを最新の GA Milvus バージョンに復元します。

- 過去30日より前に作成されたバックアップファイル、またはすでに最新の Milvus GA バージョンを使用しているバックアップファイルの場合、ターゲットの Milvus バージョンは変更できません。

例えば、利用可能な最新の Milvus GA バージョンが 2.6.x であるとします。

- 過去30日以内に作成された 2.5.x バックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元しますが、2.5.x に復元することも選択できます。

- 過去30日より前に作成された 2.5.x バックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンは変更できません。

- 2.6.x バックアップファイルから復元する場合、Zilliz Cloud は新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンは変更できません。

