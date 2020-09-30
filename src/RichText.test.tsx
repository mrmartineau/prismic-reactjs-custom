import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

import { testData } from './Richtext.test.data'
import { RichText } from './'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

test('RichText snapshot', () => {
  const { container } = render(<RichText richText={testData} />)
  expect(container).toMatchSnapshot()
})
