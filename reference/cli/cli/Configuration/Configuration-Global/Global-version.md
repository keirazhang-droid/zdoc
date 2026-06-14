---
title: "version | Cloud"
slug: /cli/cli/Global-version
sidebar_key: cli/Global-version
sidebar_label: "version"
added_since: v0.1.x
last_modified: false
deprecate_since: false
beta: false
notebook: false
description: "This operation shows the version of the installed Zilliz CLI. | Cloud"
type: docx
token: MzJHdc3iSoGlKsx4D6TcoY5anOf
sidebar_position: 1
keywords: 
  - Video deduplication
  - Video similarity search
  - Vector retrieval
  - Audio similarity search
  - zilliz
  - zilliz cloud
  - cloud
  - version
  - cliv13
displayed_sidebar: cliSidebar

---

import Admonition from '@theme/Admonition';


# version

This operation shows the version of the installed Zilliz CLI.

## Description\{#description}

Shows the installed Zilliz CLI version. The example also shows how to request JSON output with the global output option.

## Synopsis\{#synopsis}

```bash
zilliz version
```

## Options\{#options}

This command has no command-specific options.

## Example\{#example}

```bash
zilliz version

# Example output
# zilliz 1.4.2

# The output format is a global CLI option. To get JSON output:
zilliz version -o json

# Example output
# {
#   "version": "1.4.2"
# }

# If a newer CLI is available, upgrade guidance is written to stderr:
# Tips: A new version of zilliz (1.4.2) is available. Run \`zilliz upgrade\` to update.
```
