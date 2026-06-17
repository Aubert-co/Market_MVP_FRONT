import { Link } from "react-router-dom"
import type { Product } from "@/types/products.types"
import { loadImage } from "@/utils/index"
import { Rating } from "../ratings"



type ListType = 'Product' | 'Cart'

type Props = {
    products:Product[],
    listType:ListType
}
type ContentProps = {
  type:ListType
  averageRating?:number,
  price:number
}

export const RenderProductContent = ({type,averageRating,price}:ContentProps)=> {
  if(type !=="Product")return null;
  
  return (
    <>
        {averageRating != null && (
          <Rating value={averageRating} />
        )}
     <p className="item_price" >R${price}</p>
     </>
  )
}
  
   

export const ListProducts = ({ products, listType }: Props) => {
  
  return (
    <>
      {
      products.map(
  ({
    id,
    name,
    imageUrl,
    price,
    averageRating,
  }: Product) => (
    <Link
      to={`/produto/${id}`}
      key={id}
      className="product"
      data-testid="product"
    >
      <div className="img">
        <img alt={name} src={loadImage(imageUrl)} />
      </div>

      <div className="content">
        <p className="item_name">{name}</p>

        <RenderProductContent type={listType} price={price}  averageRating={averageRating} />
      </div>
    </Link>
  )
)
          }
    </>
  );
};