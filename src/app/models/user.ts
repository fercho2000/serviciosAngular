import { Address } from './address';

export class User {
    id: number;
    name: string;
    email: string;
    username: string;
    address: Address;

    constructor(){
        this.address = new Address();
    }
}
