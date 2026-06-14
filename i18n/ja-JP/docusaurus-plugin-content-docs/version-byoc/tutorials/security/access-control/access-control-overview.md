---
title: "アクセス制御の説明 | BYOC"
slug: /access-control-overview
sidebar_key: access-control-overview
sidebar_label: "アクセス制御の説明"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud はロールベースのアクセス制御 (RBAC) を実装しており、Zilliz Cloud 内のリソースへのアクセスを細かく制御します。RBAC (ロールベースのアクセス制御) は、ユーザーに直接権限を付与するのではなく、ロールに権限を付与するセキュリティ対策です。リソースに対する特定の権限を含むこれらのロールは、ユーザーに付与され、ユーザーアクセス制御の効率的な管理を可能にします。 | BYOC"
type: origin
token: UDjcwWISuixYjqkQy3GcmBpsnmV
sidebar_position: 1
keywords: 
  - zilliz
  - ベクトルデータベース
  - クラウド
  - クラスター
  - アクセス制御
  - rbac

---

import Admonition from '@theme/Admonition';


# アクセス制御の説明

Zilliz Cloud は、ロールベースのアクセス制御 (RBAC) を実装して、Zilliz Cloud 内のリソースへのアクセスを細かく制御します。RBAC (ロールベースのアクセス制御) は、特権をユーザーに直接付与するのではなく、ロールに付与するセキュリティ対策です。リソースに対する特定の特権を含むこれらのロールは、ユーザーに付与され、ユーザーアクセス制御の効率的な管理を可能にします。

![L1WGwjF2NhxLRXbcyl6cSroNnoc](https://zdoc-images.s3.us-west-2.amazonaws.com/L1WGwjF2NhxLRXbcyl6cSroNnoc.png)

## Zilliz Cloud RBAC アーキテクチャ\{#zilliz-cloud-rbac-architecture}

![WVIgwWtMYhhTBIbgAdAcegDRnle](https://zdoc-images.s3.us-west-2.amazonaws.com/WVIgwWtMYhhTBIbgAdAcegDRnle.png)

Zilliz Cloud は、リソースを 2 つのプレーン内に整理し、両方に RBAC を実装しています。

- **コントロールプレーン:** このプレーンは、組織、プロジェクト、クラスター管理を含みます。[アカウントユーザー](./email-accounts) は、特定の組織ロールとプロジェクトロールが付与され、コントロールプレーン上のリソースと対話する際に [APIキー](./manage-api-keys) を介して認証します。

- **データプレーン:** このプレーンは、クラスター、データベース、コレクションを含み、データアクセス管理に重点を置いています。[クラスターユーザー](./cluster-users) は、適切なクラスターロールが付与され、データプレーンリソースと対話する際に [APIキー](./manage-api-keys) または [ユーザー名とパスワードのペア](./cluster-credentials) を使用して認証します。

通常、各アカウントユーザーはクラスターユーザーに対応します。ただし、すべてのユーザーが両方のプレーンへのアクセスを必要とするわけではありません。場合によっては、請求管理者のようなコントロールプレーンアカウントユーザーは、請求管理の目的でコントロールプレーンへのアクセスのみを必要とし、データプレーンへのアクセスを必要としない場合があります。逆に、一時的なクラスターユーザーを作成し、カスタマイズされた APIキーを通じてデータプレーンリソースへのアクセスを付与することで、登録アカウントなしでデータアクセスを可能にすることができます。カスタマイズされた APIキーの管理の詳細については、[APIキー](./manage-api-keys) を参照してください。

## ロールと特権\{#roles-and-privileges}

アカウントユーザーには組織ロールとプロジェクトロールが付与され、クラスターユーザーにはクラスター、データベース、コレクションへのアクセスを制御するクラスターロールが付与されます。次の図は、Zilliz Cloud のロールの階層を示しています。

![TnkCwHx6jhk7UmbvYT7cVGlIn7b](https://zdoc-images.s3.us-west-2.amazonaws.com/TnkCwHx6jhk7UmbvYT7cVGlIn7b.png)

- **組織レベルで**

    - 組織オーナーロールは、すべてのプロジェクトとクラスターにわたる包括的な特権を含みます。

    すべての組織ロールの詳細については、[組織ロール](./organization-users) を参照してください。

- **プロジェクトレベルで**

    - プロジェクト管理者ロールは、特定のプロジェクトのすべての特権と、すべてのクラスターにわたる特権を含みます。

    - プロジェクト読み書きロールは、プロジェクトを表示し、そのリソースを管理する権限を持ちます。

    - プロジェクト読み取り専用ロールは、プロジェクトとそのリソースを表示する権限を持ちます。

    プロジェクトロールの詳細については、[プロジェクトロール](./project-users) を参照してください。

- **クラスターレベルで**

    - クラスター管理者ロールは、特定のクラスターのすべての特権を含みます。

    - クラスター読み書きロールは、クラスターを表示し、そのすべてのリソースを管理する権限を持ちます。

    - クラスター読み取り専用ロールは、クラスターとそのリソースを表示する権限を持ちます。

    - さらに、このレベルでは [カスタムロール](./cluster-roles#custom-cluster-roles) を作成して、データベースやコレクションなどのクラスターリソースに対する [特権](./cluster-privileges) を正確に管理できます。

    クラスターロールの詳細については、[クラスターロールの管理（コンソール）](./cluster-roles) を参照してください。

## Zilliz Cloud での RBAC の実装\{#implement-rbac-in-zilliz-cloud}

次の図は、Zilliz Cloud で RBAC を実装するための完全なワークフローを示しています。

![B8sbwgywghYn1tbMTOwcjg65nne](https://zdoc-images.s3.us-west-2.amazonaws.com/B8sbwgywghYn1tbMTOwcjg65nne.png)

1. **ユーザーの作成:** Zilliz Cloud のデフォルトユーザー `db_admin` に加えて、[Web コンソール](./cluster-users) または [SDK](./cluster-users-sdk) を使用して新しいユーザーを作成し、パスワードを設定してデータセキュリティを保護できます。

1. **ロールの作成:** [Web コンソール](./cluster-roles) または [SDK](./cluster-roles-sdk) を使用してカスタマイズされたロールを作成できます。ロールの特定の機能は、その特権によって決まります。

1. **（オプション）特権グループを作成し、特権を特権グループに追加する:** 複数の [特権](./cluster-privileges) を 1 つの特権グループに結合して、ロールに特権を付与するプロセスを効率化します。Zilliz Cloud が提供する組み込みの特権グループに加えて、[SDK](./cluster-privileges#custom-privilege-groups-or-private) を使用して独自のカスタマイズされた特権グループを作成することもできます。

1. **特権または特権グループをロールに付与する:** 特権または特権グループをロールに付与することで、ロールの機能を定義します。現在、[Web コンソール](./cluster-roles#create-a-custom-cluster-role) では、組み込みの特権グループのみをロールに付与できます。特定の特権やカスタマイズされた特権グループをロールに付与するには、[サポートチケットを作成](http://support.zilliz.com) し、代わりに [SDK](./cluster-roles-sdk#grant-a-privilege-or-a-privilege-group-to-a-role) を使用してください。

1. **ロールをユーザーに付与する:** 特定の特権を持つロールをユーザーに付与して、ユーザーがロールの特権を持てるようにします。単一のロールを複数のユーザーに付与できます。この手順は、[Web コンソール](./cluster-users#edit-the-role-of-a-cluster-user) または [SDK](./cluster-users-sdk#grant-a-role-to-a-user) を使用して完了できます。

