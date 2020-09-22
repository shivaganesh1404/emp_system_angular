export class login{
    constructor(
    public email: string,
    public password: string,
    ){}
}

export class modelID{
    constructor(
    public id: number,
    ){}
}

export class UserAdd{
    constructor(
    public first_name: string,
    public last_name:string,
    public dob:string,
    public email:string,
    public password:string,
    public mobile_number:string
    ){}
}

export class UserEdit{
    constructor(
    public id: string,
    public first_name: string,
    public last_name:string,
    public dob:string,
    public email:string,
    public password:string,
    public mobile_number:string
    ){}
}