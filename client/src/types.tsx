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
    total_price: number,
    ownerId: string
    image:string
}

export type authUser ={
    userId: string
    admin: boolean, 
    id:string
}|null

export type User ={
    _id:string
    name?: string
    email: string
    picture?: string
    password?: string
    adress?: string
    isAdmin?: boolean
    orders?: Order
  }
  
    //  enum: ['Fashion', 'Technology', 'Toys', 'Furniture', 'Other'],