import { Category } from "./categories";

export interface Transaction{
    id: number,
    type: number,
    date: Date,
    category: Category | undefined,
    amount: number,
    note: string
}