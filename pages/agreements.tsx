import React, { useState } from 'react';
import useSWR from 'swr';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const fetcher = url => fetch(url).then(r=>r.json());

export default function AgreementsPage() {
  const { data, error, mutate } = useSWR('/api/agreements', fetcher);
  const [desc, setDesc] = useState('');
  const [wit, setWit] = useState('');

  const create = async () => {
    await fetch('/api/agreements/create', {
      method: 'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ created_by: '##USER_ID##', description: desc, witness_id: wit })
    });
    setDesc(''); setWit('');
    mutate();
  };

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <Typography variant="h4">Acordos</Typography>
      <div>
        <TextField label="Descrição" value={desc} onChange={e=>setDesc(e.target.value)} />
        <TextField label="Testemunha" value={wit} onChange={e=>setWit(e.target.value)} />
        <Button onClick={create}>Criar Acordo</Button>
      </div>
      {data.agreements.map(a=>(
        <Card key={a.id} sx={{ my:1 }}>
          <CardContent>
            <Typography>{a.description} ({a.status})</Typography>
            {a.status==='pending' && <Button onClick={()=>fetch(`/api/agreements/${a.id}/accept`)>Aceitar</Button>}
            {a.status==='accepted' && <Button onClick={()=>fetch(`/api/agreements/${a.id}/trigger`)}>Acionar</Button>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
