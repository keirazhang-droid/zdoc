---
title: "Database Explained | Cloud"
slug: /database-concept
sidebar_key: database-concept
sidebar_label: "Database Explained"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "A database is a logical container for collections within a project. It helps you organize data for different applications, tenants, or environments while keeping collection names and operations scoped to the database you choose. | Cloud"
type: origin
token: B7SFwbn76iUM06kkYzBcffE8nYf
sidebar_position: 2
keywords: 
  - zilliz
  - vector database
  - cloud
  - database

---

import Admonition from '@theme/Admonition';


# Database Explained

A database is a logical container for collections within a project. It helps you organize data for different applications, tenants, or environments while keeping collection names and operations scoped to the database you choose.

Zilliz Cloud uses two database models:

- **Database in serving clusters**: A database hosted by a Dedicated serving cluster. It supports schema management, data writes, deletes, search, query, and other collection operations through the serving cluster endpoint.

- **Database for on-demand search**: A project-level database managed by Zilliz Cloud. It is independent of serving clusters and is queried through a project endpoint with on-demand compute.

<Admonition type="info" icon="📘" title="This page explains the database models. To create and manage databases, see [Database in Serving Clusters](./undefined) and [Database for On-Demand Search](./undefined).">

</Admonition>

## Database in serving clusters\{#database-in-serving-clusters}

A database in a serving cluster is created inside a specific Dedicated serving cluster. When a Dedicated cluster is created, a default database is created with it. You can create additional databases in the same serving cluster as needed.

Databases in serving clusters are tied to the lifecycle of the hosting cluster:

- If the serving cluster is suspended, its databases and collections become unavailable until the cluster is resumed.

- If the serving cluster is dropped, its databases and collections are deleted as well.

Use this model for production workloads that need always-on, low-latency access to data.

```plaintext
Project
└── Serving Cluster
    ├── Database (default)
    │   ├── Collection_01
    │   └── Collection_02
    └── Database
        ├── Collection_03
        └── Collection_04
```

## Database for on-demand search\{#database-for-on-demand-search}

A database for on-demand search is a project-level database managed by Zilliz Cloud. It is not tied to a serving cluster. You use a project endpoint and specify on-demand compute when you search or query data in this database.

This model supports database and collection management, import, search, and query. It does not support insert, upsert, or delete operations.

Use this model for large-scale datasets that are queried less frequently or searched with bursty workloads.

```plaintext
Project
├── Serving Cluster
│   └── Database (default)
│       ├── Collection_01
│       └── Collection_02
└── Databases for on-demand search
    ├── Database
    │   └── External_Collection_01
    └── Database
        └── Managed_Collection_01
```

## Comparison\{#comparison}

<table>
   <tr>
     <th></th>
     <th><p><strong>Database in Serving Clusters</strong></p></th>
     <th><p><strong>Database for On-Demand Search</strong></p></th>
   </tr>
   <tr>
     <td><p>Best for</p></td>
     <td><p>Production workloads that require always-on, low-latency access to data.</p></td>
     <td><p>Large-scale datasets with bursty searches and queries.</p></td>
   </tr>
   <tr>
     <td><p>Hosted on</p></td>
     <td><p>A serving cluster</p></td>
     <td><p>Platform-managed project resources</p></td>
   </tr>
   <tr>
     <td><p>Endpoint</p></td>
     <td><p>Serving cluster endpoint</p></td>
     <td><p>Project endpoint</p></td>
   </tr>
   <tr>
     <td><p>Compute resource</p></td>
     <td><p>Hosting serving cluster</p></td>
     <td><p>Specified on-demand compute</p></td>
   </tr>
   <tr>
     <td><p>Create/drop database</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
   </tr>
   <tr>
     <td><p>Create/drop collection</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
   </tr>
   <tr>
     <td><p>Load/release collection</p></td>
     <td><p>Yes</p></td>
     <td><p>No need</p></td>
   </tr>
   <tr>
     <td><p>Insert/upsert/delete</p></td>
     <td><p>Yes</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p>Import</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
   </tr>
   <tr>
     <td><p>Search and query</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
   </tr>
   <tr>
     <td><p>Lifecycle</p></td>
     <td><p>Tied to the serving cluster</p></td>
     <td><p>Independent of serving clusters</p></td>
   </tr>
</table>

## Next steps\{#next-steps}

- [Database in Serving Clusters](./undefined)

- [Database for On-Demand Search](./undefined)

