import type {ComponentType} from 'react';
export const createFileRoute=(_path:string)=>(options:{component:ComponentType<any>;head?:()=>any})=>options;
