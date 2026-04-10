export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface CategoryCardProps{
  image: {
      link: string,
      alt: string
  },
  title: string
  className?: string
  onClick : () => void
}