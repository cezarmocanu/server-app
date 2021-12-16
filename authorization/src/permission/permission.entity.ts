import { PermissionCertificate } from 'src/permission-certificate/permission-certificate.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PermissionCertificate)
  permissionCertificate: PermissionCertificate;

  @Column()
  resource: string;

  @Column()
  canCreate: boolean;

  @Column()
  canRead: boolean;

  @Column()
  canUpdate: boolean;

  @Column()
  canDelete: boolean;
}
