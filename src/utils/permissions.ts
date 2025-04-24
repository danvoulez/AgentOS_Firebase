import { Role } from './roles';

interface RolePermissions {
  inherits?: Role[];
  modules: string[];
  permissions: string[];
  activation: "permanent" | "shift + checkin" | "admin_hours + checkin";
}

export const PermissionsMatrix: Record<Role, RolePermissions> = {
  admin: {
    inherits: ["chefe_turno","vendedor","revendedor","entregador","financeiro","cliente_final","bot_promptos"],
    modules: ["*"],
    permissions: ["*"],
    activation: "permanent"
  },
  chefe_turno: {
    modules: ["SALES","OFFICE","CLIENTS"],
    permissions: ["create_sale","edit_client","view_commission","close_shift"],
    activation: "shift + checkin"
  },
  vendedor: {
    modules: ["SALES","OFFICE"],
    permissions: ["create_sale","view_clients"],
    activation: "shift + checkin"
  },
  revendedor: {
    modules: ["SALES"],
    permissions: ["view_catalog","place_order"],
    activation: "permanent"
  },
  cliente_final: {
    modules: ["SALES"],
    permissions: ["view_catalog","place_order"],
    activation: "permanent"
  },
  entregador: {
    modules: ["DELIVERY"],
    permissions: ["update_location","confirm_delivery"],
    activation: "shift + checkin"
  },
  financeiro: {
    modules: ["BANKING","REPORTS"],
    permissions: ["view_finances","trigger_payments"],
    activation: "admin_hours + checkin"
  },
  bot_promptos: {
    modules: ["*"],
    permissions: ["*"],
    activation: "permanent"
  }
};
