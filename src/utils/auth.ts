import React from 'react';
export function AuthProvider({ children }) { return <>{children}</>; }
export function useAuth() { return { user: { uid: 'u1' } }; }
export async function login() {} export async function logout() {}