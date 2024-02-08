import React from 'react'

import { cn } from '@/lib/utils'
import type { IMaxWidthWrapper } from '@/types/IMaxWidthWrapper'

const MaxWidthWrapper = ({ className, children }: IMaxWidthWrapper) => {
  return <div className={cn('mx-auto w-full max-w-screen-xl px-1.5 md:px-20', className)}>{children}</div>
}

export default MaxWidthWrapper
