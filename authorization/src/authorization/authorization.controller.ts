import { Controller, ForbiddenException, Post, Res, UnauthorizedException,Headers, Body } from '@nestjs/common';
import {Response} from 'express';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { PermissionCertificate } from 'src/permission-certificate/permission-certificate.entity';
import { Permission } from 'src/permission/permission.entity';

import { AuthorizationService } from './authorization.service';
import { AuthorizationRequestDTO } from './dto/authorization-request.dto';

@Controller('authorization')
export class AuthorizationController {
    constructor(
        private authorizationService: AuthorizationService,
        private authenticationService: AuthenticationService
      ) {}

    @Post('/verify')
    async verify(
        @Headers() headers,
        @Body() body: AuthorizationRequestDTO,
        @Res({ passthrough: true }) res: Response
    ){
        if (!this.authenticationService.authorizeRequest(headers)){
            return new UnauthorizedException();
        }

        const {
            userId,
            serviceUUID,
            resource,
            right
        } = body;

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
