import type { Metadata } from 'next';
import { ComingSoon } from '@/components/sections/ComingSoon';
export const metadata:Metadata = {title:'Foundation — Coming soon',description:'The BitQueens Foundation is in development, with a focus on scholarships, advocacy and social impact.'};
export default function FoundationPage(){return <ComingSoon foundation/>;}
