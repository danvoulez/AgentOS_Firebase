import React, { useEffect, useState } from 'react';
import { Roles } from '../src/utils/roles';
import { PermissionsMatrix } from '../src/utils/permissions';
import { auth, db } from '../src/utils/firebase';
import {
  collection, getDocs, doc, updateDoc
} from 'firebase/firestore';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Select, MenuItem, Button, Dialog, DialogTitle, DialogContent
} from '@mui/material';

export default function UserAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selPerms, setSelPerms] = useState<string[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const snaps = await getDocs(collection(db, 'users'));
      setUsers(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid: string, role: string) => {
    // update custom claim via cloud function or admin SDK endpoint
    await fetch('/api/admin/users/updateRole', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId: uid, role })
    });
    setUsers(u => u.map(x=> x.id===uid?{...x, role}:x));
  };

  return (
    <>
      <h1>Admin - Users</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Select value={u.role||''} onChange={e=>handleRoleChange(u.id, e.target.value)}>
                  {Object.values(Roles).map(r=> <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </TableCell>
              <TableCell>
                <Button onClick={()=>{ setSelPerms(PermissionsMatrix[u.role]||[]); setOpen(true); }}>
                  View Permissions
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Permissions</DialogTitle>
        <DialogContent>
          <ul>{selPerms.map(p=> <li key={p}>{p}</li>)}</ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
