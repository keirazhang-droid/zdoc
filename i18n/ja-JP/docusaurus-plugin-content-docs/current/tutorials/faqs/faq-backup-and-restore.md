---
title: "FAQ: バックアップと復元 | CLOUD"
slug: /faq-backup-and-restore
sidebar_label: "FAQ: バックアップと復元"
beta: FALSE
notebook: FALSE
description: "このトピックでは、Zilliz Cloud でデータをバックアップおよび復元する際に発生する可能性のある問題と、その対応策を一覧表示します。 | CLOUD"
type: origin
token: EV41wG08BiOWW8kbo9xcTGoPnKd
sidebar_position: 7

---

# FAQ: バックアップと復元

このトピックでは、Zilliz Cloud でデータをバックアップおよび復元する際に発生する可能性のある問題と、その解決方法を一覧表示します。

## 目次

- [Standard プランでバックアップ機能は利用できますか？](#is-the-backup-feature-available-in-the-standard-plan)
- [クラスターバックアップを復元する際に Milvus バージョンを選択できますか？](#can-i-choose-the-milvus-version-when-restoring-a-cluster-backup)

## FAQ

### Standard プランでバックアップ機能は利用できますか？\{#is-the-backup-feature-available-in-the-standard-plan}

はい。**Standard** プロジェクトの **Dedicated** クラスターでバックアップを作成できます。

### クラスターバックアップを復元する際に Milvus バージョンを選択できますか？\{#can-i-choose-the-milvus-version-when-restoring-a-cluster-backup}

- 過去30日以内に作成されたバックアップファイルの場合、元のクラスターが最新の利用可能な GA バージョンよりも古い Milvus GA バージョンを使用していた場合、復元されたクラスターの Milvus バージョンを選択できます。デフォルトでは、Zilliz Cloud はクラスターを最新の GA Milvus バージョンに復元します。

- 30日以上前に作成されたバックアップファイル、または既に最新の Milvus GA バージョンを使用しているバックアップファイルの場合、ターゲットの Milvus バージョンを変更することはできません。

例えば、最新の利用可能な Milvus GA バージョンが 2.6.x であるとします。

- 過去30日以内に作成された 2.5.x バックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元しますが、2.5.x に復元することも選択できます。

- 30日以上前に作成された 2.5.x バックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンを変更することはできません。

- 2.6.x バックアップファイルから復元する場合、Zilliz Cloud はデフォルトで新しいクラスターを 2.6.x に復元し、ターゲットの Milvus バージョンを変更することはできません。
