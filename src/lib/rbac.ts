export type Role = "1" | "2" | "3" | "4" | "5";

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
  "1": [
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
  "2": [
    "user.view",
    "user.create",
    "user.update",
    "coach.assignClient",
    "plan.create",
    "plan.update",
    "progress.view",
    "comment.create",
  ],
  "3": [
    "user.view",
    "user.create",
    "coach.assignClient",
    "plan.create",
    "plan.update",
    "progress.view",
    "comment.create",
  ],
  "4": ["plan.create", "plan.update", "progress.view", "comment.create"],
  "5": [],
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