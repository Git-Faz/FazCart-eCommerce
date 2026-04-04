export interface ProductCardProps {
    img: {
        link: string,
        alt: string
    },
    name: string,
    price: number;
    onClick: () => void,
    onBtnClick: () => void,
    disabled?: boolean,
    classname?: string
}

export interface ProductInfoProps {
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    quantity: number;
    imageUrl: string;
    onQuantityChange: (q: number) => void;
    onButtonClick: () => void;
}

export interface QuantityCounterProps {
    max: number;
    value: number;
    onChange: (qty: number) => void;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

export interface ProductsListProps {
  query?: string;
  category?: string;
  hidePagination?: boolean;
  size?: number;
  className?: string
}

export interface ProductsPage {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
