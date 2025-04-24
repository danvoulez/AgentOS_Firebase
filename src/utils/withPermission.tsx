import React from 'react';
import { useAuth } from './auth';
import useSWR from 'swr';

export function withPermission(action: string) {
  return function<P>(Component: React.ComponentType<P>) {
    return function Wrapped(props: P) {
      const { user } = useAuth();
      const { data: allowed } = useSWR(
        () => user ? ['/api/admin/users/hasPermission', action] : null,
        async () => {
          const res = await fetch('/api/admin/users/hasPermission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.uid, action })
          });
          const json = await res.json();
          return json.allowed;
        }
      );
      if (!user || !allowed) return null;
      return <Component {...props} />;
    };
  };
}
