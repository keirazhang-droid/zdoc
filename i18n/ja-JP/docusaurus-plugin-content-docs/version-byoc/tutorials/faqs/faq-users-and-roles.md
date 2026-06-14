---
title: "FAQ: ユーザーとロール | BYOC"
slug: /faq-users-and-roles
sidebar_label: "FAQ: ユーザーとロール"
beta: FALSE
notebook: FALSE
description: "このトピックでは、Zilliz Cloud で発生する可能性があるユーザー、ロール、およびアクセスに関する問題とその解決方法を説明します。 | BYOC"
type: origin
token: EV41wG08BiOWW8kbo9xcTGoPnKd
sidebar_position: 8

---

# FAQ: ユーザーとロール

このトピックでは、Zilliz Cloud で発生する可能性のあるユーザー、ロール、アクセスに関する問題とその解決策を説明します。

## 目次

- [組織を脱退することはできますか？](#can-i-leave-my-organization)
- [組織名を編集するにはどうすればよいですか？](#how-can-i-edit-my-organization-name)
- [同僚やチームメイトを招待して共同作業するにはどうすればよいですか？](#how-can-i-invite-a-colleague-or-teammate-to-collaborate)
- [特定の権限やカスタム特権グループを持つロールを作成できますか？](#can-i-create-a-role-with-specific-privileges-or-custom-privilege-groups)

## よくある質問

### 組織を脱退することはできますか？\{#can-i-leave-my-organization}

組織メンバーの場合、自由に組織を脱退できます。

組織オーナーの場合、組織内の最後のオーナーでない場合にのみ組織を脱退できます。組織には少なくとも1人のオーナーが必要であり、組織内で唯一のオーナーは脱退できません。

### 組織名を編集するにはどうすればよいですか？\{#how-can-i-edit-my-organization-name}

1. 組織を選択します。

1. 左側のナビゲーションで **設定** をクリックします。

1. **組織設定** ページの **組織情報** セクションで **編集** をクリックします。

1. 新しい組織名を入力し、**確認** をクリックします。

1. 組織名が正常に変更されたことを示すメッセージが表示されます。

### 同僚やチームメイトを招待して共同作業するにはどうすればよいですか？\{#how-can-i-invite-a-colleague-or-teammate-to-collaborate}

組織オーナーの場合、ユーザーを組織に招待できます。詳細な手順については、[組織ユーザーの管理](./organization-users) を参照してください。

組織メンバーの場合、組織オーナーに連絡して他のユーザーを招待してもらうことができます。

さらに、Zilliz Cloud ではプロジェクトへのユーザー招待もサポートしています。プロジェクト管理者の場合、他のプロジェクトユーザーをプロジェクトに招待できます。詳細な手順については、[プロジェクトユーザーの管理](./project-users) を参照してください。

### 特定の権限やカスタム特権グループを持つロールを作成できますか？\{#can-i-create-a-role-with-specific-privileges-or-custom-privilege-groups}

はい。まず、[サポートチケットを作成](http://support.zilliz.com) して、この機能を有効にしてもらう必要があります。この機能が有効になると、SDK を使用してこのタスクを完了できます。詳細については、[権限と特権グループ](./cluster-privileges#custom-privilege-groups-or-private) を参照してください。
