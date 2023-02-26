import { CrudService } from './CrudService';
import { ProtocolService as ProtService } from './ProtocolService';

export const CompanyService = new CrudService('/companies');
export const OrganizationUnitService = new CrudService('/organization-units');
export const UserService = new CrudService('/users');
export const ProtocolStatusService = new CrudService('/protocol-statuses');
export const ProtocolService = new ProtService('/protocols');
