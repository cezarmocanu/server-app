import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCertificate } from 'src/permission-certificate/permission-certificate.entity';
import { Permission } from 'src/permission/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectRepository(PermissionCertificate)
        private permissionCertificateRepo: Repository<PermissionCertificate>,
        @InjectRepository(Permission)
        private permissionRepo: Repository<Permission>
    ){}
    
    // find certificate by userId and serviceUUID
    async findCertificate(userId: number, serviceUUID: string): Promise<PermissionCertificate | null> {
        return await this.permissionCertificateRepo.findOne({
            where: {
                user : {
                    id: userId
                },
                serviceUUID
            }
        });
    }

    // look for the permission from the certificate by certificate id and resource
    async findResourcePermissionInCertificate(certificateId: number, resource: string): Promise<Permission | null> {
        return await this.permissionRepo.findOne({
            relations: ['permissionCertificate'],
            where: {
                permissionCertificate: {
                    id: certificateId
                },
                resource
            }
        });
    }   

    // check if right is true
    checkIfPermissionContainsRight(permission: Permission, rightString: string): boolean{
        if (permission.canRead && rightString === "READ") {
            return true;
        }

        if (permission.canCreate && rightString === "CREATE") {
            return true;
        }

        if (permission.canUpdate && rightString === "UPDATE") {
            return true;
        }

        if (permission.canDelete && rightString === "DELETE") {
            return true;
        }

        return false;
    }

}
