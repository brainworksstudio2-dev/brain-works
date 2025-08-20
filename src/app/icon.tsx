import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <img
        src={new URL('/images/brain.png', process.env.URL || 'http://localhost:3000').toString()}
        alt="Brain Works"
        width={32}
        height={32}
      />
    ),
    {
      ...size,
    }
  )
}
