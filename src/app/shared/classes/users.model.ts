import { IUser } from "../interfaces/interface";

export class User implements IUser{
    public id: number;
    public userId: number;
    public email: string;
    public password:string;
    public feeds: Array<string>;
 }