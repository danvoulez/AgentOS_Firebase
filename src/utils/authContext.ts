import { useAuth } from './auth';
import { PermissionsMatrix } from './permissions';

function isAdminHours(): boolean {
  const h = new Date().getHours();
  return h >= 9 && h <= 18;
}

export function isRoleActive(user: any, role: keyof typeof PermissionsMatrix): boolean {
  const rule = PermissionsMatrix[role];
  if (!rule) return false;
  if (rule.activation === "permanent") return true;
  if (rule.activation === "shift + checkin") return user.onShift && user.checkedIn;
  if (rule.activation === "admin_hours + checkin") return isAdminHours() && user.checkedIn;
  return false;
}
