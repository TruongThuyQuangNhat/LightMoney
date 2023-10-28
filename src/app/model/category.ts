export interface Category {
    icon: string;
    name: string;
    color: string;
    type: "expenditure" | "revenue";
}

export const listCategory: Category[] = [
    {
        icon: "assets/icon-category/add.svg",
        name: "Xăng xe",
        color: "#F44336",
        type: "expenditure"
    },
    {
        icon: "assets/icon-category/albums.svg",
        name: "Cơm",
        color: "#E91E63",
        type: "expenditure"
    },
    {
        icon: "assets/icon-category/apps.svg",
        name: "quang nhat",
        color: "#9C27B0",
        type: "revenue"
    },
    {
        icon: "assets/icon-category/archive.svg",
        name: "archive Trương THiyuj",
        color: "#673AB7",
        type: "revenue"
    },
    {
        icon: "assets/icon-category/at.svg",
        name: "at",
        color: "#3F51B5",
        type: "revenue"
    },
    {
        icon: "assets/icon-category/ban.svg",
        name: "ban",
        color: "#2196F3",
        type: "expenditure"
    },
    {
        icon: "assets/icon-category/barcode.svg",
        name: "barcode",
        color: "#03A9F4",
        type: "revenue"
    },
]