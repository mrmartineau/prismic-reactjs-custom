# RichText

Find out more about Prismic's "Structured text" at https://prismic.io/blog/structured-text-a-cleaner-way-to-deal-with-rich-text

```js
import { CustomRichText } from 'prismic-reactjs-custom'
```

## Usage

```js
import { CustomRichText } from 'custom-prismic-reactjs'

export const RichText = ({ text }) =>
  CustomRichText.render(text, {
    heading1: CustomH1,
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
