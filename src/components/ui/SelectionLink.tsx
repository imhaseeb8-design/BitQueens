'use client';
import Link from 'next/link';
import type {ReactNode} from 'react';

export interface FormSelection { kind:'quote'|'cohort'; value:string; message?:string; }
export function SelectionLink({href,selection,className,children}:{href:string;selection:FormSelection;className?:string;children:ReactNode}) {
  return <Link href={href} className={className} onClick={()=>window.dispatchEvent(new CustomEvent('bq:form-selection',{detail:selection}))}>{children}</Link>;
}
