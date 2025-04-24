import React from 'react';
import Link from 'next/link';
import { withPermission } from '../src/utils/withPermission';

const NavItem = ({ href, label, Component }) => (
  <li><Link href={href}>{label}</Link></li>
);

const SalesItem = withPermission('create_sale')(() => <NavItem href="/sales" label="Vendas" />);
const DeliveryItem = withPermission('update_location')(() => <NavItem href="/delivery" label="Entrega" />);
const FinanceItem = withPermission('view_finances')(() => <NavItem href="/banking" label="Financeiro" />);
const AgreementsItem = withPermission('create_agreement')(() => <NavItem href="/agreements" label="Acordos" />);

export default function NavBar() {
  return (
    <nav>
      <ul>
        <SalesItem />
        <DeliveryItem />
        <FinanceItem />
        <AgreementsItem />
      </ul>
    </nav>
  );
}
