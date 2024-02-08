import type { PRODUCT_CATEGORIES } from '@/config'

type Category = (typeof PRODUCT_CATEGORIES)[number]

export interface INavItemProps {
  category: Category
  handleOpen: () => void
  isOpen: boolean
  isAnyOpen: boolean
}
