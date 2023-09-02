import { useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params:{url}}:{params:{url:string}}) {
  console.log(url);
  return NextResponse.json({id:0})
}