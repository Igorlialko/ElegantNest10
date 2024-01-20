import { Model } from "sequelize-typescript";
interface BlogCreationAttrs {
    title: string;
    content: string;
    slug: string;
    date?: string;
    image: string;
    authorName?: string;
}
export declare class Blog extends Model<Blog, BlogCreationAttrs> {
    id: number;
    title: string;
    date: string;
    content: string;
    slug: string;
    image: string;
    authorName: string;
}
export {};
