import { render, fireEvent } from '@testing-library/react'
import VideoLoader from './index'

describe('VideoLoader', () => {
  it('renders correctly', () => {
    const { queryByTestId } = render(<VideoLoader />)
    expect(queryByTestId('intro-video')).toBeTruthy()
  })

  it('disappears after playing video', () => {
    const { queryByTestId } = render(<VideoLoader />)
    const video = queryByTestId('intro-video') as HTMLVideoElement

    // Simulate the video ending
    fireEvent(video, new Event('ended'))

    expect(queryByTestId('intro-video')).toBeNull()
  })
})
