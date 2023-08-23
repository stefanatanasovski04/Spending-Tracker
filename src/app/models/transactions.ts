import { Category } from "./categories";

export interface Transaction{
    date: Date,
    category: Category,
    amount: number,
    note: string
}