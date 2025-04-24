export const Roles = {
  ADMIN: "admin",
  SHIFT_LEAD: "chefe_turno",
  SALESPERSON: "vendedor",
  WHOLESALE_CLIENT: "revendedor",
  END_CLIENT: "cliente_final",
  COURIER: "entregador",
  FINANCE: "financeiro",
  BOT: "bot_promptos"
} as const;
export type Role = typeof Roles[keyof typeof Roles];
