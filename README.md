<h1 align="center">Tagged Combinators for Tailwind CSS</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/@toolwind/tagged-combinators)](https://bundlephobia.com/package/@toolwind/tagged-combinators)
[![license](https://img.shields.io/github/license/brandonmcconnell/@toolwind/tagged-combinators?label=license)](https://github.com/brandonmcconnell/@toolwind/tagged-combinators/blob/main/LICENSE)
[![version](https://img.shields.io/npm/v/@toolwind/tagged-combinators)](https://www.npmjs.com/package/@toolwind/tagged-combinators)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

This plugin adds slash-modifier tagging support to Tailwind’s built-in child (`*:`) and descendant (`**:`) variants. Keep using them as usual, and optionally filter which children/descendants match using a plain selector via `/selector` — no arbitrary variants needed.

Examples: `*/option`, `**/.active`, `*/button[aria-label]`.

```html
<div class="*:border-2 *:border-blue-500 */ol:bg-red-100 */ul:bg-green-100 odd:**/li:font-bold">
  <ul class="">
    <li>CSS</li>
    <li>Good</li>
  </ul>
  <ol>
    <li>Tailwind</li>
    <li>Better</li>
  </ol>
</div>
<div class="*/button[aria-label]:italic">
  <button type="button" aria-label>test</button>
</div>
<div class="**/span.active:text-violet-500">
  <span class="active">test</span>
</div>
```
Open this example in Tailwind Play: https://play.tailwindcss.com/h5EWjqbB85

## Installation

First, install the package:

```bash
npm install @toolwind/tagged-combinators
```

Then add it to your Tailwind config:

<table>
<tbody>
<tr>
<td width="10000">
<details name="enabling-tagged-combinators" open>

<summary>&nbsp;&nbsp;<strong>Tailwind v4 (<code>globals.css</code>)</strong></summary><br>

```css
@plugin "@toolwind/tagged-combinators";
```

</details>
</td>
</tr>
<tr></tr>
<tr>
<td width="10000">
<details name="enabling-tagged-combinators">

<summary>&nbsp;&nbsp;<strong>Tailwind v3 (<code>tailwind.config.js</code>)</strong></summary><br>

```js
module.exports = {
  plugins: [require('@toolwind/tagged-combinators')],
}
```

</details>
</td>
</tr>
</tbody>
</table>

## Why not just use arbitrary variants?

You can do this with Tailwind’s arbitrary variants, but the syntax is noisier:

```html
<!-- Arbitrary variants -->
<div class="[&>*]:text-sm [&>option]:font-bold [&_span.active]:text-violet-500"></div>

<!-- Tagged combinators (this plugin) -->
<div class="*:text-sm */option:font-bold **/span.active:text-violet-500"></div>
```

## Usage

### Basics

```html
<!-- Direct children (all) -->
<div class="*:text-sm">…</div> <!-- & > * -->

<!-- Direct children (filtered) -->
<div class="*/button:text-sm">…</div> <!-- & > button -->
<div class="*/.primary:text-sm">…</div> <!-- & > .primary -->

<!-- Any descendants -->
<section class="**:mt-2">…</section> <!-- & * -->
<section class="**/input:mt-2">…</section> <!-- & input -->
<section class="**/.active:underline">…</section> <!-- & .active -->
```

You can tag most selectors (no bracket syntax required): tags, classes, attributes, etc.

```html
<div class="*/button:hover:text-red-600"></div>
<div class="**/a.active:underline"></div>
```

One exception is pseudo classes, as the `:` conflicts with Tailwind's own variant syntax.

## Notes

- Without a tag, `*:` compiles to `& > *` and `**:` compiles to `& *`. This syntax is built into Tailwind natively and this plugin preserves it without any conflicts.
- Tag using the slash modifier — no brackets needed: `*/button`, `**/.active`, `*/button:hover`.

---

I hope you find `@toolwind/tagged-combinators` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [@toolwind/signals](https://github.com/@toolwind/signals): Apply styles based on parent or ancestor state, a state-driven alterative to groups
* [@toolwind/multi](https://github.com/@toolwind/multi): Group utilities together by variant
* [@toolwind/mixins](https://github.com/@toolwind/mixins): Construct reusable & aliased sets of utilities inline
* [@toolwind/selector-patterns](https://github.com/@toolwind/selector-patterns): Dynamic CSS selector patterns
* [@toolwind/js](https://github.com/@toolwind/js): Effortless build-time JS script injection
* [@toolwind/directional-shadows](https://github.com/@toolwind/directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too ✨)
* [@toolwind/default-shades](https://github.com/@toolwind/default-shades): Default shades for simpler color utility classes
* [@toolwind/lerp-colors](https://github.com/@toolwind/lerp-colors): Expand your color horizons and take the fuss out of generating new—or expanding existing—color palettes