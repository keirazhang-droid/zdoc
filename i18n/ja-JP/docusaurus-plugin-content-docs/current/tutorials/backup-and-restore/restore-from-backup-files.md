---
title: "バックアップファイルからの復元 | Cloud"
slug: /restore-from-backup-files
sidebar_key: restore-from-backup-files
sidebar_label: "バックアップファイルから復元"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud の復元機能を使用すると、偶発的なデータ損失、破損、システム障害が発生した場合に、バックアップファイルからデータを復元し、ビジネス継続性を確保できます。この機能は、インシデントからの復旧、意図しない変更の取り消し、またはテスト用にクラスターを複製するための信頼性の高い方法であり、中断を最小限に抑えます。 | Cloud"
type: origin
token: Dd6jwYIGiiz6HWkEPJqcpMA3n6g
sidebar_position: 4
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - バックアップ
  - 復元

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# バックアップファイルからの復元

Zilliz Cloud の復元機能を使用すると、データが誤って失われたり、破損したり、システム障害が発生した場合に、バックアップファイルからデータを復元できるため、ビジネスの継続性を確保できます。これは、インシデントから復旧したり、意図しない変更を元に戻したり、テスト用にクラスターを最小限の中断でクローンするための信頼性の高い方法です。

このガイドでは、バックアップファイルからフルクラスターまたは部分クラスターを復元する方法を説明します。

<Admonition type="info" icon="📘" title="Notes">

この機能は **Dedicated** クラスターでのみ利用可能です。

</Admonition>

## 制限\{#limits}

- **アクセス制御**: プロジェクト管理者、組織オーナー、またはバックアップ権限を持つカスタムロールである必要があります。

## フルクラスターの復元\{#restore-a-full-cluster}

すべてのデータベースとコレクションを含むクラスター全体を**新しい**クラスターに復元できます。これは、テストや復旧のために環境をクローンするのに便利です。クラスター全体を復元するには、バックアップファイルがクラスターバックアップである必要があります。

復元中に、以下を設定することもできます。

- RBAC 設定を含めるかどうかを選択します。

- 復元された新しいクラスターの Milvus バージョンを選択します。

    - 過去30日以内に作成されたバックアップファイルの場合、元のクラスターが利用可能な最新のGAバージョンよりも古いMilvus GAバージョンを使用している場合、復元されたクラスターのMilvusバージョンを選択できます。デフォルトでは、Zilliz Cloudはクラスターを最新のGA Milvusバージョンに復元します。

    - 30日以上前に作成されたバックアップファイル、または既に最新のMilvus GAバージョンを使用しているバックアップファイルの場合、ターゲットのMilvusバージョンを変更することはできません。

    例えば、利用可能な最新のMilvus GAバージョンが2.6.xであるとします。

    - 過去30日以内に作成された2.5.xバックアップファイルから復元する場合、Zilliz Cloudはデフォルトで新しいクラスターを2.6.xに復元しますが、2.5.xに復元することも選択できます。

    - 30日以上前に作成された2.5.xバックアップファイルから復元する場合、Zilliz Cloudはデフォルトで新しいクラスターを2.6.xに復元し、ターゲットのMilvusバージョンを変更することはできません。

    - 2.6.xバックアップファイルから復元する場合、Zilliz Cloudは新しいクラスターを2.6.xに復元し、ターゲットのMilvusバージョンを変更することはできません。

- CMEKを使用して保存時の暗号化を有効にするかどうかを選択します。詳細については、[カスタマーマネージド暗号化キー](./cmek)を参照してください。

復元後、`db_admin` ユーザーに対して**新しいパスワード**が生成されます。このパスワードを使用して復元されたクラスターに接続します。

### ウェブコンソール経由\{#via-web-console}

次のデモは、Zilliz Cloud ウェブコンソールでフルクラスターを復元する方法を示しています。

<Supademo id="cmcsruzjd0gyo9st8kcjye30i" title=""  />

### RESTful API経由\{#via-restful-api}

次の例では、既存のバックアップファイルから`Dedicated-01-backup`という名前の新しいクラスターにフルクラスターを復元します。RESTful APIの詳細については、[クラスターバックアップの復元](/reference/restful/restore-cluster-backup-v2)を参照してください。

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

## 暗号化されたバックアップファイルからの復元\{#restore-from-an-encrypted-backup-file}

暗号化されたバックアップを新しいクラスターに復元する場合、Zilliz Cloud はバックアップファイルに関連付けられた KMS キーを使用して、復元前にデータを復号化します。そのため、バックアップを暗号化ありまたはなしで新しいクラスターに復元できます。

<Admonition type="info" icon="📘" title="Notes">

この機能は、**ビジネスクリティカル** プロジェクトの **Dedicated** クラスターでのみ利用可能です。

</Admonition>

![WaApbDlaYoywaMxxUMxcQLAOnDe](https://zdoc-images.s3.us-west-2.amazonaws.com/waapbdlayoywamxxumxcqlaonde.png "WaApbDlaYoywaMxxUMxcQLAOnDe")

暗号化されたバックアップからの復元手順は、**保存時の暗号化（CMEK）** を有効にするかどうかを除いて、通常の復元とほぼ同じです。

![V1QJb3SK1oGa11xLljhcxKQEnkc](https://zdoc-images.s3.us-west-2.amazonaws.com/v1qjb3sk1oga11xlljhcxkqenkc.png "V1QJb3SK1oGa11xLljhcxKQEnkc")

- このオプションを有効にすると、復元後に作成されたクラスターは、以下で指定された KMS キーを使用して暗号化されます。

- このオプションを無効にすると、復元後に作成されたクラスターは暗号化されません。

## FAQ\{#faq}

**復元されたクラスターはどの Milvus バージョンで動作しますか？**

デフォルトでは、クラスター全体の復元は、Zilliz Cloud がサポートする最新の GA メジャーバージョンを使用してターゲットクラスターを作成します。

- 過去 30 日以内に作成されたバックアップファイルの場合、元のクラスターが最新の GA バージョンよりも古い Milvus GA バージョンを使用していた場合、復元されたクラスターの Milvus バージョンを選択できます。デフォルトでは、Zilliz Cloud はクラスターを最新の GA Milvus バージョンに復元します。

- 過去 30 日以上前に作成されたバックアップファイル、または既に最新の Milvus GA バージョンを使用しているバックアップファイルの場合、ターゲットの Milvus バージョンを変更できません。

たとえば、最新の利用可能な Milvus GA バージョンが 2.6.x だとします。

- 過去 30 日以内に作成された 2.5.x のバックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元しますが、2.5.x に復元することも選択できます。

- 過去 30 日以上前に作成された 2.5.x のバックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンを変更できません。

- 2.6.x のバックアップファイルから復元する場合、Zilliz Cloud は新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンを変更できません。

