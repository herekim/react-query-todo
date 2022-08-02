import React from 'react'
import LinkContainer from 'next/link'

const Link = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <LinkContainer href={href}>
      <a>{children}</a>
    </LinkContainer>
  )
}

export default Link
