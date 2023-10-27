import { Category } from "./category";

export interface Event {
    id: string;
    title?: string;
    startTime: Date;
    endTime: Date;
    allDay: boolean;
    expenditure?: number;
    revenue?: number;
    type: "expenditure" | "revenue";
    category: Category;
}