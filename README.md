# prismic-reactjs-custom

> This is an opinionated fork of [prismic-reactjs](https://github.com/prismicio/prismic-reactjs) that allows you to use custom React components instead of standard HTML tags

[![](https://badgen.net/npm/v/prismic-reactjs-custom)](https://www.npmjs.com/package/prismic-reactjs-custom) [![](https://badgen.net/bundlephobia/minzip/prismic-reactjs-custom)](https://bundlephobia.com/result?p=prismic-reactjs-custom)

```js
import { RichText, RichTextRenderer, Link, Date } from 'prismic-reactjs-custom'
```

## Usage

Use the `RichText` React component

```jsx
import { RichText } from 'prismic-reactjs-custom'

// `richText` is the only required prop
// all other props are optional
<RichText
  richText={richTextDataFromPrismic}
  heading1={yourCustomHeading1}
  paragraph={yourCustomParagraph}
/>
```

### Props

`richText`: The only required prop. Must be a `JSON.parse`d version of a Prismic Rich Text array. See an example [here](https://github.com/mrmartineau/prismic-reactjs-custom/blob/master/src/Richtext.test.data.ts)

Each of these props should be a React component that renders a specific tag.

- `heading1`
- `heading2`
- `heading3`
- `heading4`
- `heading5`
- `heading6`
- `paragraph`
- `preformatted`
- `strong`
- `em`
- `listItem`
- `oListItem`
- `list`
- `oList`
- `image`
- `embed`
- `hyperlink`
- `label`
- `span`

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

# Example using styled-components

```jsx
import { RichText } from 'prismic-reactjs-custom'
import styled from 'styled-components'

const Heading1 = styled.h1`
  font-size: 3rem;
  color: pink;
`

const Paragraph = styled.p`
  font-size: 1rem;
  color: blue;
`

<RichText
  richText={richTextDataFromPrismic}
  heading1={Heading1}
  paragraph={Paragraph}
/>
```
