export type Product ={
    name: string, 
    description: string,
    price: number,
    _id: string
}

export type Order ={
    product?: any
    quantity: number, 
    id?: Product,
    _id: string
}