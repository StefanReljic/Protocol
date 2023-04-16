import { CrudService } from './CrudService';
import { ProtocolService as ProtService } from './ProtocolService';
import { UserService as UsService } from './UserService';
import { DocumentService as DocService } from './DocumentService';

export const CompanyService = new CrudService('/companies');
export const OrganizationUnitService = new CrudService('/organization-units');
export const UserService = new UsService('/users');
export const ProtocolStatusService = new CrudService('/protocol-statuses');
export const ProtocolService = new ProtService('/protocols');
export const DocumentService = new DocService('/documents');
