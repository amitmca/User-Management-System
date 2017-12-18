export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNo: string;

    constructor(id: number, firstName: string, lastName: string,
    email: string, password: string, mobileNo: string){

            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.mobileNo = mobileNo;
    }
}