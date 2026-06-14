---
title: "StructArray Operators | Cloud"
slug: /struct-array-filtering
sidebar_key: struct-array-filtering
sidebar_label: "StructArray"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: PRIVATE
notebook: FALSE
description: "StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for `elementfilter` and the `MATCH` operator family. | Cloud"
type: origin
token: VmGMwsTliiGZdFkzzeBckRNlnCh
sidebar_position: 7
keywords: 
  - zilliz
  - vector database
  - cloud
  - collection
  - data
  - filter
  - filtering expressions
  - filtering
  - struct array operators

---

import Admonition from '@theme/Admonition';


# StructArray Operators

StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for `element_filter` and the `MATCH_*` operator family.

StructArray filtering has two operator families:

<table>
   <tr>
     <th><p>Operator family</p></th>
     <th><p>Main purpose</p></th>
     <th><p>Result behavior</p></th>
   </tr>
   <tr>
     <td><p><code>element_filter</code></p></td>
     <td><p>Match Struct elements that satisfy a scalar predicate.</p></td>
     <td><p>In element-level search, matched hits can include element offsets. In row-level query or filtered search, result shape depends on the API and output fields.</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_&ast;</code></p></td>
     <td><p>Select entities by how many Struct elements satisfy a scalar predicate.</p></td>
     <td><p>Row-level filtering. These operators do not return element offsets by themselves.</p></td>
   </tr>
</table>

Use scalar subfields in StructArray operators. Vector subfields are used by vector search paths and are not scalar predicate inputs.

## When to use which operator\{#when-to-use-which-operator}

<table>
   <tr>
     <th><p>Goal</p></th>
     <th><p>Use</p></th>
   </tr>
   <tr>
     <td><p>Constrain element-level vector search to elements that match scalar conditions.</p></td>
     <td><p><code>element_filter</code></p></td>
   </tr>
   <tr>
     <td><p>Match multiple scalar conditions within the same Struct element.</p></td>
     <td><p><code>element_filter</code></p></td>
   </tr>
   <tr>
     <td><p>Return only entities where at least one Struct element satisfies a predicate.</p></td>
     <td><p><code>MATCH_ANY</code></p></td>
   </tr>
   <tr>
     <td><p>Return only entities where all Struct elements satisfy a predicate.</p></td>
     <td><p><code>MATCH_ALL</code></p></td>
   </tr>
   <tr>
     <td><p>Return only entities where at least, at most, or exactly <code>N</code> Struct elements satisfy a predicate.</p></td>
     <td><p><code>MATCH_LEAST</code>, <code>MATCH_MOST</code>, or <code>MATCH_EXACT</code></p></td>
   </tr>
</table>

## Element Filter\{#element-filter}

Use `element_filter(structArrayField, predicate)` to match Struct elements in a StructArray field.

Inside the predicate, use `$[subfield]` to refer to a scalar subfield of the current Struct element.

```plaintext
element_filter(chunks, $[section] == "index")
```

When multiple conditions are used inside the predicate, all `$[subfield]` references apply to the same Struct element:

```plaintext
element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)
```

When you combine an entity-level predicate with `element_filter`, place `element_filter` at the end of the expression:

```plaintext
# Correct
category == "index" && element_filter(chunks, $[quality_score] > 0.9)

# Incorrect
element_filter(chunks, $[quality_score] > 0.9) && category == "index"
```

`element_filter` can appear only once in a filter expression. Do not nest `element_filter` or `MATCH_*` inside another `element_filter`.

## Match Family Operators\{#match-family-operators}

Use `MATCH_*` operators when an entity should be selected based on how many Struct elements satisfy a predicate.

<table>
   <tr>
     <th><p>Operator</p></th>
     <th><p>Meaning</p></th>
   </tr>
   <tr>
     <td><p><code>MATCH_ANY(field, predicate)</code></p></td>
     <td><p>At least one Struct element satisfies the predicate.</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_ALL(field, predicate)</code></p></td>
     <td><p>All Struct elements satisfy the predicate.</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_LEAST(field, predicate, threshold=N)</code></p></td>
     <td><p>At least <code>N</code> Struct elements satisfy the predicate.</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_MOST(field, predicate, threshold=N)</code></p></td>
     <td><p>At most <code>N</code> Struct elements satisfy the predicate.</p></td>
   </tr>
   <tr>
     <td><p><code>MATCH_EXACT(field, predicate, threshold=N)</code></p></td>
     <td><p>Exactly <code>N</code> Struct elements satisfy the predicate.</p></td>
   </tr>
</table>

`MATCH_ANY` and `element_filter` can both express that at least one Struct element satisfies a predicate. Use `MATCH_ANY` when you only need row-level filtering. Use `element_filter` when you need element-level constraints, such as filtering which Struct elements participate in element-level vector search.

### MATCH_ANY\{#matchany}

`MATCH_ANY` evaluates to `true` if at least one element in the StructArray satisfies the predicate.

```plaintext
MATCH_ANY(chunks, $[section] == "index")
```

For an empty StructArray, `MATCH_ANY` returns `false`.

### MATCH_ALL\{#matchall}

`MATCH_ALL` evaluates to `true` if every element in the StructArray satisfies the predicate.

```plaintext
MATCH_ALL(chunks, $[has_code] == true)
```

For an empty StructArray, `MATCH_ALL` returns `true`.

### MATCH_LEAST\{#matchleast}

`MATCH_LEAST` evaluates to `true` if the number of elements satisfying the predicate is greater than or equal to `threshold`.

```plaintext
MATCH_LEAST(chunks, $[quality_score] > 0.9, threshold=2)
```

For `MATCH_LEAST`, `threshold` must be a positive integer.

### MATCH_MOST\{#matchmost}

`MATCH_MOST` evaluates to `true` if the number of elements satisfying the predicate is less than or equal to `threshold`.

```plaintext
MATCH_MOST(chunks, $[has_code] == true, threshold=1)
```

For `MATCH_MOST`, `threshold` can be zero or a positive integer.

### MATCH_EXACT\{#matchexact}

`MATCH_EXACT` evaluates to `true` if the number of elements satisfying the predicate is exactly equal to `threshold`.

```plaintext
MATCH_EXACT(chunks, $[section] == "filter", threshold=1)
```

For `MATCH_EXACT`, `threshold` can be zero or a positive integer.

## Supported predicates\{#supported-predicates}

The `$[...]` syntax represents the scalar value of the current Struct element. Predicate support depends on the scalar subfield type.

<table>
   <tr>
     <th><p>Subfield type</p></th>
     <th><p>Element-level predicate support</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>Scalar predicates such as <code>$[has_code] == true</code> or <code>!($[has_code] == true)</code>. Avoid bare boolean expressions such as <code>$[has_code]</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>INT8</code>, <code>INT16</code>, <code>INT32</code>, <code>INT64</code></p></td>
     <td><p>Comparison, chained range, <code>in</code>, <code>not in</code>, arithmetic expressions with <code>+</code>, <code>-</code>, <code>&ast;</code>, <code>/</code>, or <code>%</code> followed by comparison, and logical combinations.</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT</code>, <code>DOUBLE</code></p></td>
     <td><p>Comparison, chained range, <code>in</code>, <code>not in</code>, arithmetic expressions with <code>+</code>, <code>-</code>, <code>&ast;</code>, or <code>/</code> followed by comparison, and logical combinations. The <code>%</code> operator is not supported for floating-point subfields.</p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>String comparison, chained range, <code>in</code>, <code>not in</code>, <code>like</code>, <code>=&#126;</code>, <code>!&#126;</code>, and logical combinations.</p></td>
   </tr>
   <tr>
     <td><p>Vector subfields</p></td>
     <td><p>Not supported as <code>$[...]</code> scalar predicate inputs. Use vector subfields through EmbeddingList search or element-level vector search instead.</p></td>
   </tr>
</table>

Logical operators such as `&&`, `||`, and `!` apply to predicate expressions. For example, write `!($[has_code] == true)` instead of `!$[has_code]`.

## Unsupported predicates\{#unsupported-predicates}

Element-level `$[...]` predicates do not support:

- Text match functions, such as `text_match(field, "...")` or `phrase_match(field, "...")`.

- JSON path syntax, `exists` on JSON paths, or JSON functions such as `json_contains`, `json_contains_all`, or `json_contains_any`.

- Array container functions such as `array_contains`, `array_contains_all`, `array_contains_any`, or `array_length`.

- `$[subfield] is null` or `$[subfield] is not null`.

- Geometry / GIS functions.

- Timestamptz expressions.

- `random_sample(...)`.

- Field-level vector predicates.

- Generic filter function calls unless the specific function signature and execution path explicitly support StructArray element-level predicates.

## Syntax rules\{#syntax-rules}

- `MATCH_*` operator names are case-insensitive.

- Use `$[subfield]` only inside `element_filter` or `MATCH_*` predicates.

- Do not use `$[subfield]` as a JSON path, array container, or vector field reference.

- Do not nest `element_filter` or `MATCH_*` inside another StructArray operator.

- Use named `threshold=N` for `MATCH_LEAST`, `MATCH_MOST`, and `MATCH_EXACT`.

- `MATCH_ANY` on an empty StructArray returns `false`.

- `MATCH_ALL` on an empty StructArray returns `true`.

## See also\{#see-also}

- [Filtered Search with StructArray](./undefined)

- [Basic Vector Search with StructArray](./undefined)

- [Index StructArray Fields](./undefined)

- [StructArray Limits](./undefined)

