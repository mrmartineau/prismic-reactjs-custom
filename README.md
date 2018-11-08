# prismic-reactjs-custom

> This is an opinionated fork of [prismic-reactjs](https://github.com/prismicio/prismic-reactjs) that allows you to use custom React components instead of standard HTML tags

```js
import { RichText } from 'prismic-reactjs-custom'
```

## Usage

Use our `RichText` React component.

```jsx
import { RichText } from 'prismic-reactjs-custom'

// `text` is the only required prop
// all other props are optional
<RichText
  richText={richTextDataFromPrismic}
  heading1={yourCustomHeading1}
  paragraph={yourCustomParagraph}
/>
```

## Alternative Usage

Import the renderer and create your own React component

```js
import { RichTextRenderer } from 'prismic-reactjs-custom'

export const RichText = ({ text }) =>
  CustomRichText.render(text, {
    heading1: CustomH1, // your own component
    heading2: CustomH2,
    heading3: CustomH3,
    heading4: CustomH4,
    heading5: CustomH5,
    heading6: CustomH6,
    paragraph: CustomParagraph,
    preformatted: CustomPreformatted,
    strong: CustomStrong,
    em: CustomEm,
    listItem: CustomListItem,
    oListItem: CustomOListItem,
    list: CustomList,
    oList: CustomOList,
    image: CustomImage,
    embed: CustomEmbed,
    hyperlink: CustomHyperlink,
    label: CustomLabel,
    span: CustomSpan,
  })
```

Find out more about Prismic's "Structured text" [here](https://prismic.io/blog/structured-text-a-cleaner-way-to-deal-with-rich-text).

---

## Link

Get a URL from a Link fragment of any kind

```js
import { Link } from 'prismic-reactjs-custom'

// link resolver not required if sure that it's not a document link
Link.url(mydoc.data.mylink, ctx.linkResolver)
```

## Date

Convert a Date as string from the API to an ISO Date:

```js
import { Date } from 'prismic-reactjs-custom'

Date(mydoc.data.mydate)
```
