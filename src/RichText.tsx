import * as React from 'react'
import { CustomRichText } from './custom-prismic-richtext-render'

export const RichText = props => CustomRichText.render(props.text)
