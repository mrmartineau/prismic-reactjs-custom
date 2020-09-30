// this file has been lifted (and modified) directly from https://github.com/prismicio/prismic-reactjs/blob/master/src/richtext.js
import React, { createElement, ElementType, Fragment, ReactNode } from 'react'
import { Elements, asText, serialize as PRserialize } from 'prismic-richtext'
import { Link as LinkHelper } from 'prismic-helpers'
import { PrismicRichText } from './RichText.model'

const chooseElement = (
  standardTag: string,
  element: any,
  children: any,
  index: number,
  CustomElement?: ElementType
) => {
  if (CustomElement) {
    return <CustomElement key={index}>{children}</CustomElement>
  }
  return serializeStandardTag(standardTag, element, children, index)
}

interface SerializeOptions {
  heading1?: ElementType
  heading2?: ElementType
  heading3?: ElementType
  heading4?: ElementType
  heading5?: ElementType
  heading6?: ElementType
  paragraph?: ElementType
  preformatted?: ElementType
  strong?: ElementType
  em?: ElementType
  listItem?: ElementType
  oListItem?: ElementType
  list?: ElementType
  oList?: ElementType
  image?: ElementType
  embed?: ElementType
  hyperlink?: ElementType
  label?: ElementType
  span?: ElementType
}

function serialize(
  options: SerializeOptions,
  linkResolver: any,
  elements: any,
  type: string,
  element: any,
  content: any,
  children: ReactNode,
  index: number
) {
  const opts = Object.assign({}, options)
  if (elements[type]) {
    return serializeElement(
      elements[type],
      type,
      element,
      content,
      children,
      index
    )
  }

  switch (type) {
    case Elements.heading1:
      return chooseElement('h1', element, children, index, opts.heading1)
    case Elements.heading2:
      return chooseElement('h2', element, children, index, opts.heading2)
    case Elements.heading3:
      return chooseElement('h3', element, children, index, opts.heading3)
    case Elements.heading4:
      return chooseElement('h4', element, children, index, opts.heading4)
    case Elements.heading5:
      return chooseElement('h5', element, children, index, opts.heading5)
    case Elements.heading6:
      return chooseElement('h6', element, children, index, opts.heading6)
    case Elements.paragraph:
      return chooseElement('p', element, children, index, opts.paragraph)
    case Elements.preformatted:
      return chooseElement('pre', element, children, index, opts.preformatted)
    case Elements.strong:
      return chooseElement('strong', element, children, index, opts.strong)
    case Elements.em:
      return chooseElement('em', element, children, index, opts.em)
    case Elements.listItem:
      return chooseElement('li', element, children, index, opts.listItem)
    case Elements.oListItem:
      return chooseElement('li', element, children, index, opts.oListItem)
    case Elements.list:
      return chooseElement('ul', element, children, index, opts.list)
    case Elements.oList:
      return chooseElement('ol', element, children, index, opts.oList)
    case Elements.image:
      return serializeImage(linkResolver, element, index, opts.image)
    case Elements.embed:
      return serializeEmbed(element, index, opts.embed)
    case Elements.hyperlink:
      return serializeHyperlink(
        linkResolver,
        element,
        children,
        index,
        opts.hyperlink
      )
    case Elements.label:
      return serializeLabel(element, children, index, opts.label)
    case Elements.span:
      return serializeSpan(content)
    default:
      return null
  }
}

function propsWithUniqueKey(props: any = {}, key: number) {
  return Object.assign(props, { key })
}

function serializeElement(Element, type, props, content, children, index) {
  return createElement(
    Element,
    Object.assign(
      {},
      { key: `element-${type}-${index + 1}` },
      props,
      { children: children && children.length ? children : undefined },
      type === 'image' ? { src: props.url, url: undefined } : null
    )
  )
}

function serializeStandardTag(
  tag: any,
  element: any,
  children: ReactNode,
  key: number
) {
  const props = element.label
    ? Object.assign({}, { className: element.label })
    : {}
  return createElement(tag, propsWithUniqueKey(props, key), children)
}

function serializeHyperlink(
  linkResolver: any,
  element: any,
  children: ReactNode,
  key: number,
  CustomLink?: ElementType
) {
  const targetAttr = element.data.target ? { target: element.data.target } : {}
  const relAttr = element.data.target ? { rel: 'noopener' } : {}
  const props = Object.assign(
    { href: LinkHelper.url(element.data, linkResolver) },
    targetAttr,
    relAttr
  )
  if (CustomLink) {
    return (
      <CustomLink key={key} {...props}>
        {children}
      </CustomLink>
    )
  }
  return createElement('a', propsWithUniqueKey(props, key), children)
}

function serializeLabel(
  element: any,
  children: ReactNode,
  key: number,
  CustomLabel?: ElementType
) {
  const props = element.data
    ? Object.assign({}, { className: element.data.label })
    : {}
  if (CustomLabel) {
    return (
      <CustomLabel key={key} {...props}>
        {children}
      </CustomLabel>
    )
  }
  return createElement('span', propsWithUniqueKey(props, key), children)
}

function serializeSpan(content: string) {
  if (content) {
    return content.split('\n').reduce((acc, p) => {
      if (acc.length === 0) {
        return [p]
      } else {
        const brIndex = (acc.length + 1) / 2 - 1
        const br = createElement('br', propsWithUniqueKey({}, brIndex))
        return acc.concat([br, p])
      }
    }, [])
  } else {
    return null
  }
}

function serializeImage(
  linkResolver: any,
  element: any,
  key: number,
  CustomImage?: ElementType
) {
  const linkUrl = element.linkTo
    ? LinkHelper.url(element.linkTo, linkResolver)
    : null
  const linkTarget =
    element.linkTo && element.linkTo.target
      ? { target: element.linkTo.target }
      : {}
  const relAttr = linkTarget.target ? { rel: 'noopener' } : {}
  let img
  if (CustomImage) {
    img = <CustomImage src={element.url} alt={element.alt || ''} />
  } else {
    img = createElement('img', {
      src: element.url,
      alt: element.alt || '',
    })
  }

  return createElement(
    'p',
    propsWithUniqueKey(
      { className: [element.label || '', 'block-img'].join(' ') },
      key
    ),
    linkUrl
      ? createElement(
          'a',
          Object.assign({ href: linkUrl }, linkTarget, relAttr),
          img
        )
      : img
  )
}

function serializeEmbed(element: any, key: number, CustomEmbed: ElementType) {
  const className = `embed embed-${element.oembed.provider_name.toLowerCase()}`
  const props = Object.assign(
    {
      'data-oembed': element.oembed.embed_url,
      'data-oembed-type': element.oembed.type,
      'data-oembed-provider': element.oembed.provider_name,
    },
    element.label
      ? { className: `${className} ${element.label}` }
      : { className }
  )

  let embedHtml: ReactNode

  if (CustomEmbed) {
    embedHtml = <CustomEmbed key={key} />
  } else {
    embedHtml = createElement('div', {
      dangerouslySetInnerHTML: { __html: element.oembed.html },
    })
  }

  return createElement('div', propsWithUniqueKey(props, key), embedHtml)
}

export const RichTextRenderer = {
  asText: (richText: PrismicRichText) => {
    if (Object.prototype.toString.call(richText) !== '[object Array]') {
      console.warn(
        `Rich text argument should be an Array. Received ${typeof richText}`
      )
      return null
    }
    return asText(richText)
  },
  render: (
    richText: PrismicRichText,
    options?: any,
    linkResolver?: any,
    htmlSerializer?: any,
    Component: any = Fragment,
    elements: any = {},
    args: any = {}
  ) => {
    const serializedChildren = PRserialize(
      richText,
      serialize.bind(null, options, linkResolver, elements),
      htmlSerializer
    )
    return createElement(Component, args, serializedChildren)
  },
  Elements,
}
