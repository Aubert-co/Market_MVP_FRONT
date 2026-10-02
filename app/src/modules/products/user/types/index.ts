export type Product ={
    name:string,
    price:number,
    id:number,
    imageUrl:string,
    category:string,
    stock:number,
    description:string,
    averageRating?:number
}

export type ProductView = Omit<Product,|"description">& {
    views:number
}

export type Comments = {
    content:string,
    name:string,
  
}
export type Rating = {
    _avg:{
        rating?:number
    },
    _count:{
        rating:number
    }
    
}
export type Reviews = {
    rating:number
}
export type ProductDetails = {
    product:Product[],
    ratings:Rating,
    comments:Comments[],
    reviews:Reviews[]
    
}