import { Controller, ForbiddenException, Post, Res, UnauthorizedException } from '@nestjs/common';
import {Response} from 'express';
import { PermissionCertificate } from 'src/permission-certificate/permission-certificate.entity';
import { Permission } from 'src/permission/permission.entity';

import { UserService } from 'src/user/user.service';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
    constructor(
        private authorizationService: AuthorizationService
      ) {}

    @Post('/verify')
    async verify(@Res({ passthrough: true }) res: Response){

        //TODO pass propper parameters from request
        //TODO check if the user is authenticated
        const userId = 10;
        const serviceUUID = "financial";
        const resource = "salaries";
        const right = "READ";

        const certificate: PermissionCertificate = await this.authorizationService.findCertificate(userId, serviceUUID);
        if (!certificate) {
            //TODO add something comaptible with mutliple services
            throw new ForbiddenException();
        }

        const permission: Permission = await this.authorizationService.findResourcePermissionInCertificate(certificate.id, resource);
        if (!permission) {
            throw new ForbiddenException();
        }
        
        const hasRight: boolean = this.authorizationService.checkIfPermissionContainsRight(permission, right);
        if (!hasRight) {
            throw new ForbiddenException();
        }

        res.status(200);

        return "Authorized";
    }

}
