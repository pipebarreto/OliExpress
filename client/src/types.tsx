import { EnumDeclaration } from "typescript"

export type Product ={
    name: string, 
    description: string,
    category: EnumDeclaration,
    image: string,
    price: number,
    _id: string
}

export type Order ={
    product: any
    quantity: number, 
    _id: string,
    total_price: number
}
  
    //  enum: ['Fashion', 'Technology', 'Toys', 'Furniture', 'Other'],