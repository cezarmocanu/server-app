import { IsNotEmpty, IsNumber } from 'class-validator';

export class AuthorizationRequestDTO {

    @IsNumber()
    userId: number;

    @IsNotEmpty()
    serviceUUID: string;

    @IsNotEmpty()
    resource: string;

    @IsNotEmpty()
    right: string;
}
