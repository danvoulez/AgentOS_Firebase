import nc from 'next-connect';
import { z } from 'zod';
export function createHandler() { return nc(); }