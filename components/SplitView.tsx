import React from 'react';
export default function SplitView({left, right}) { return <div style={{display:'flex'}}><div>{left}</div><div>{right}</div></div>; }