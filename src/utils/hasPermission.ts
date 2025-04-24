import { PermissionsMatrix } from './permissions';
import { isRoleActive } from './authContext';
import { getAuth } from 'firebase-admin/auth';

export async function hasPermission(userId: string, action: string): Promise<boolean> {
  const auth = getAuth();
  const user = await auth.getUser(userId);
  const role = user.customClaims?.role as keyof typeof PermissionsMatrix;
  if (!role) return false;
  if (!isRoleActive(user, role)) return false;
  const rule = PermissionsMatrix[role];
  if (rule.permissions.includes('*') || rule.permissions.includes(action)) return true;
  // check inherited roles
  if (rule.inherits) {
    for (const parent of rule.inherits) {
      const parentRule = PermissionsMatrix[parent];
      if (parentRule.permissions.includes('*') || parentRule.permissions.includes(action)) return true;
    }
  }
  return false;
}
