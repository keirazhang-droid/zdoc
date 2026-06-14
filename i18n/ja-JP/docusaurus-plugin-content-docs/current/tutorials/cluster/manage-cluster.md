---
title: "クラスターの管理 | Cloud"
slug: /manage-cluster
sidebar_key: manage-cluster
sidebar_label: "クラスターを管理"
beta: FALSE
notebook: FALSE
description: "このガイドでは、Zilliz Cloud コンソールを最大限に活用して目標を達成できるよう、クラスターのライフサイクルについて説明します。 | Cloud"
type: origin
token: PharwAysCiBzvgkuqqecmNzunQf
sidebar_position: 3
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - 管理

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Supademo from '@site/src/components/Supademo';

# クラスターの管理

このガイドでは、クラスターのライフサイクルについて説明し、Zilliz Cloud コンソールを最大限に活用して目標を達成する方法を示します。

## 稼働中のクラスターの管理\{#manage-serving-cluster}

稼働中のクラスターに対して、以下の操作を実行できます。

### 名前の変更\{#rename}

対象のクラスターの**クラスターの詳細**ページに移動し、以下の手順に従ってクラスターの名前を変更します。

<Supademo id="cm9tp57ye0ri911m7ljrn1yg6" title=""  />

### 一時停止\{#suspend}

実行中の Dedicated クラスターの場合、CU とストレージの両方に対して課金されます。コストを削減するには、クラスターの一時停止を検討してください。Dedicated クラスターが一時停止されている間は、ストレージ料金のみが発生します。

一時停止中は、クラスターに対して他の操作を実行できないことに注意してください。

クラスターは、Web コンソールまたはプログラム経由で一時停止できます。

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

対象のクラスターの**クラスターの詳細**ページに移動し、以下の手順に従って Dedicated クラスターを一時停止します。

<Supademo id="cm9tqgxt30snl11m7twwj7xia" title=""  />

</TabItem>

<TabItem value="Bash">

リクエストは以下の例のようになります。ここで、`{API_KEY}` は認証に使用する API キーです。

以下の `POST` リクエストはリクエストボディを受け取り、Dedicated クラスターを一時停止します。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com/v2/clusters/${CLUSTER_ID}/suspend" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "Successfully Submitted. The cluster will not incur any computing costs when suspended. You will only be billed for the storage costs during this time."
#     }
# }     
```

上記のコマンドでは、

- `{API_KEY}`: API リクエストの認証に使用される資格情報。値を自分のものに置き換えてください。

- `{CLUSTER_ID}`: 一時停止する Dedicated クラスターの ID。

詳細については、[クラスターの一時停止](/reference/restful/suspend-cluster-v2) を参照してください。

</TabItem>

</Tabs>

一時停止操作が成功すると、ジョブレコードが生成されます。[ジョブ](./job-center) ページで進捗を確認できます。

### 再開\{#resume}

**Free クラスター** は **7 日間連続で非アクティブ** になると自動的に一時停止されますが、いつでも再開できます。非アクティブとは、クラスターに対する Web コンソールでの操作や API 操作（検索、クエリ、挿入、削除、SDK、RESTful API、gRPC リクエストなど）がない状態を指します。クラスターとのやり取りがあると、7 日間のタイマーがリセットされ、アクティブな状態が維持されます。

**Serverless クラスター** は、一時停止および再開操作をサポートしていません。

**一時停止された Dedicated クラスター** も、必要に応じて手動で再開できます。

再開中は、クラスターに対して他の操作を実行できないことに注意してください。

クラスターは、Web コンソールまたはプログラムで再開できます。

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

ターゲットクラスターの **クラスターの詳細** ページに移動し、以下の指示に従ってクラスターを再開してください。

<Supademo id="cm9tr2hze0t1j11m7ijth1pr5" title=""  />

</TabItem>

<TabItem value="Bash">

リクエストは次の例のようになります。`{API_KEY}` は認証に使用する API キーです。

次の `POST` リクエストはリクエストボディを受け取り、クラスターを再開します。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com/v2/clusters/${CLUSTER_ID}/resume" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "successfully Submitted. Cluster is being resumed, which is expected to takes several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
#     }
# }     
```

上記のコマンドでは、

- `{API_KEY}`: API リクエストの認証に使用される認証情報です。値はご自身のものに置き換えてください。

- `{CLUSTER_ID}`: 再開するクラスターの ID です。

詳細については、[クラスターの再開](/reference/restful/resume-cluster-v2) を参照してください。

</TabItem>

</Tabs>

再開操作が成功すると、ジョブレコードが生成されます。進捗状況は [ジョブ](./job-center) ページで確認できます。

### デプロイメントオプションのアップグレード\{#upgrade-deployment-option}

一部の機能は Dedicated クラスターにのみ限定されています。これらの機能を使用するには、クラスターのデプロイメントオプションをアップグレードすることをお勧めします。

<table>
   <tr>
     <th><p><strong>デプロイメントオプションのアップグレード</strong></p></th>
     <th><p><strong>注意事項</strong></p></th>
   </tr>
   <tr>
     <td><p>Free から Serverless へ</p></td>
     <td><p>Free クラスターが Serverless デプロイメントオプションにアップグレードされます。クラスターがアップグレードされると、ダウングレードすることはできません。</p></td>
   </tr>
   <tr>
     <td><p>Free から Dedicated へ</p></td>
     <td><p>新しい Dedicated クラスターが作成され、既存の Free クラスターからデータが自動的に移行されます。Free クラスターはそのまま残ります。</p><p>アプリケーションコード内のクラスターエンドポイントを更新することを忘れないでください。</p></td>
   </tr>
   <tr>
     <td><p>Serverless から Dedicated へ</p></td>
     <td><p>新しい Dedicated クラスターが作成され、既存の Serverless クラスターからデータが自動的に移行されます。Serverless クラスターはそのまま残ります。</p><p>アプリケーションコード内のクラスターエンドポイントを更新することを忘れないでください。</p></td>
   </tr>
</table>

次のデモでは、Free から Dedicated へのアップグレードを例に、クラスターのデプロイメントオプションをアップグレードする方法を説明します。

<Supademo id="cmfnfgviq0il71d3n2up3lci1?utm_source=link" title=""  />

### プレビュー機能のためのクラスターアップグレード\{#upgrade-cluster-for-preview-features}

最新のプレビュー機能を試すには、専用クラスターの互換性のある Milvus バージョンをアップグレードする必要があります。

![upgrade-to-preview-version](https://zdoc-images.s3.us-west-2.amazonaws.com/upgrade-to-preview-version.png "upgrade-to-preview-version")

### グローバルクラスターへの変換\{#convert-to-a-global-cluster}

既存の Dedicated クラスターを [グローバルクラスター](./global-cluster-explained) に変換する必要がある場合は、以下の手順に従ってください。

<Supademo id="cmm5p53sh3hogdtfhemesjhv0" title=""  />

### 削除\{#drop}

クラスターが不要になった場合は、削除することができます。クラスターは Web コンソールまたはプログラムで削除できます。

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

対象クラスターの **クラスターの詳細** ページに移動し、以下の手順に従ってクラスターを削除してください。

<Supademo id="cm9trwi5n0txr11m7otr902sk" title=""  />

</TabItem>

<TabItem value="Bash">

リクエストは以下の例のようになります。ここで `{API_KEY}` は認証に使用する API キーです。

次の `DELETE` リクエストはリクエストボディを受け取り、クラスターを削除します。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com/v2/clusters/${CLUSTER_ID}/drop" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "The cluster has been deleted. If you consider this action to be an error, you have the option to restore the deleted cluster from the recycle bin within a 30-day period. Kindly note, this recovery feature does not apply to free clusters."
#     }
# }     
```

上記のコマンドでは、

- `{API_KEY}`: APIリクエストの認証に使用される認証情報です。値を独自のものに置き換えてください。

- `{CLUSTER_ID}`: 削除するDedicatedクラスタのIDです。

詳細については、[クラスタの削除](/reference/restful/drop-cluster-v2) を参照してください。

</TabItem>

</Tabs>

## オンデマンドクラスタの管理 ｜PUBLIC\{#manage-on-demand-cluster-public}

オンデマンドクラスタに対して以下の操作を実行できます。

### 削除\{#drop}

- **RESTful API経由**

    ```bash
    curl --request DELETE \
         --url "https://${BASE_URL}/v2/clusters/onDemandClusters/inxx-xxxxxxxxxxxxxxx" \
         --header "Authorization: Bearer ${API_KEY}" \
         --header "Accept: application/json"
    ```

- **ウェブコンソール経由**

