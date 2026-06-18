"use client";

import { createContext, useContext, useMemo } from "react";
import { getPermissionsForRole, Role, Permission } from "../lib/rbac";

type AuthUser = {
    id: string;
    tenantId: string;
    roles: Role[];
};

type AuthContextType = {
    user: AuthUser | null;
    permissions: Permission[];
    hasRole: (roles: Role[]) => boolean;
    can: (permission: Permission) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    user,
    children,
}: {
    user: AuthUser | null;
    children: React.ReactNode;
}) {
    const permissions = useMemo(() => {
        if (!user) return [];
        return (user ? getPermissionsForRole(user.roles) : []);
    }, [user]);

    const value: AuthContextType = {
        user,
        permissions,
        hasRole: (roles) => !!user && roles.some(role => user.roles.includes(role)),
        can: (permission) => !!user && permissions.includes(permission),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function userAuth(){
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}