export type Role = "SUPERADMIN" | "TENANT_ADMIN" | "ADMIN" | "COACH" | "USER";

export type Permission =
  | "tenant.manage"
  | "user.view"
  | "user.create"
  | "user.update"
  | "role.assign"
  | "coach.assignClient"
  | "plan.create"
  | "plan.update"
  | "progress.view"
  | "comment.create";

export const rolePermissions: Record<Role, Permission[]> = {
  "SUPERADMIN": [
    "tenant.manage",
    "user.view",
    "user.create",
    "user.update",
    "role.assign",
    "coach.assignClient",
    "plan.create",
    "plan.update",
    "progress.view",
    "comment.create",
  ],
  "TENANT_ADMIN": [
    "user.view",
    "user.create",
    "user.update",
    "coach.assignClient",
    "plan.create",
    "plan.update",
    "progress.view",
    "comment.create",
  ],
  "ADMIN": [
    "user.view",
    "user.create",
    "coach.assignClient",
    "plan.create",
    "plan.update",
    "progress.view",
    "comment.create",
  ],
  "COACH": ["plan.create", "plan.update", "progress.view", "comment.create"],
  "USER": [],
};

export function getPermissionsForRole(roles: Role[]): Permission[] {
  const set = new Set<Permission>();

  roles.forEach((role) => {
    const permissions = rolePermissions[role] || [];
    permissions.forEach((perm) => set.add(perm));
  });

  return Array.from(set);
}

export function hasRole(userRoles: Role[], requiredRoles: Role[]): boolean {
  return requiredRoles.some((role) => userRoles.includes(role));
}

export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission);
}