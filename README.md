<h1 align="center">Tagged Combinators for Tailwind CSS</h1>

Declarative child and descendant targeting with optional selector tags.

This plugin exposes two ergonomic variants that mirror CSS combinators:

- `*:` — direct children (like `& > *`), optionally tagged to filter which children
- `**:` — any descendants (like `&  *`), optionally tagged to filter which descendants

Use them as-is (to match all children/descendants) or “tag” them with a selector to filter which ones you want to style.

## Installation

```bash
npm install @toolwind/tagged-combinators
```

Then enable it:

```js
// tailwind.config.js (Tailwind v3)
module.exports = {
  plugins: [require('@toolwind/tagged-combinators')],
}
```

```ts
// tailwind.config.ts (Tailwind v4)
import taggedCombinators from '@toolwind/tagged-combinators'

export default {
  plugins: [taggedCombinators],
}
```

## Why not just use arbitrary variants?

You can target children/descendants with Tailwind’s arbitrary variants, but it’s verbose and easy to get wrong with spacing/escaping:

```html
<!-- Arbitrary variants -->
<div class="[&>*]:text-sm [&>*:first-child]:font-medium [&>button:hover]:text-red-600"></div>

<!-- Tagged combinators (this plugin) -->
<div class="*:text-sm *-[*:first-child]:font-medium *-[button:hover]:text-red-600"></div>
```

- **Less punctuation**: no `&`, no manual `>` / space combinators, no double `&&` tricks.
- **Readable intent**: `*:` and `**:` communicate “direct child” and “descendant” at a glance.
- **Selector tagging**: put the selector inside the tag when you need precision: `*-[button]`, `**-[.item input:checked]`.

## Usage

### Basics

```html
<!-- Direct children (all) -->
<div class="*:text-sm">…</div>           <!-- & > * -->

<!-- Direct children (filtered) -->
<div class="*-button:text-sm">…</div>    <!-- & > button -->
<div class="*-[.primary]:text-sm">…</div><!-- & > .primary -->

<!-- Any descendants -->
<section class="**:mt-2">…</section>     <!-- &  * -->
<section class="**-input:mt-2">…</section><!-- &  input -->
<section class="**-[a.active]:underline">…</section>
```

You can place complex selectors inside the tag:

```html
<div class="*-[input[type='checkbox']:checked]:opacity-50"></div>
<div class="**-[.card .cta:hover]:text-blue-600"></div>
```

### Targeting parent state vs child state

- **Parent state** (e.g., only when the parent is hovered):

  - Tailwind v4: `hover:*-[button]:text-red-600` → `&:hover > button { … }`
  - Tailwind v3: `*-[button]:hover:text-red-600` → `&:hover > button { … }`

- **Child state** (e.g., only when the child is hovered):

  Put the state inside the tag so it applies to the child selector directly. This works the same in v3 and v4:

  ```html
  <div class="*-[button:hover]:text-red-600"></div> <!-- & > button:hover { … } -->
  <div class="**-[a:focus-visible]:underline"></div>
  ```

### Tailwind v3 vs v4 stacking order

When stacking these variants with other variants, Tailwind’s ordering rules changed in v4. For parent state, the order is reversed between versions:

```html
<!-- Parent hovered, style direct child buttons -->
<!-- v4 --> <div class="hover:*-[button]:text-red-600"></div>
<!-- v3 --> <div class="*-[button]:hover:text-red-600"></div>

<!-- Parent dark mode, style any descendant links -->
<!-- v4 --> <article class="dark:**-[a]:text-slate-200"></article>
<!-- v3 --> <article class="**-[a]:dark:text-slate-200"></article>
```

If you want the state on the child itself, put it inside the tag (no reversal needed): `*-[button:hover]:…`, `**-[a:focus]:…`.

## Side‑by‑side with arbitrary variants

```html
<!-- Arbitrary variants -->
<div class="[&>form:valid]:bg-green-400 [&>button:hover]:text-red-600"></div>

<!-- Tagged combinators (same intent) -->
<div class="*-[form:valid]:bg-green-400 *-[button:hover]:text-red-600"></div>
```

## Notes

- Without a tag, `*:` compiles to `& > *` and `**:` compiles to `&  *`.
- With a tag, the tag replaces `*` on the right side of the combinator.
- Use bracketed tags for complex selectors: `*-[.item input:checked]`.

---

If you find this useful, issues and PRs are welcome.