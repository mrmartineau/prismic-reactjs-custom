import * as React from 'react'
import { render, cleanup } from 'react-testing-library'

import testData from './richtext-test-data'
import { CustomRichText } from './custom-prismic-richtext-render'

const RichText = ({ text }) => CustomRichText.render(text)

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

test('RichText snapshot', () => {
  const { container } = render(<RichText text={testData} />)
  expect(container.firstChild).toMatchSnapshot()
})
