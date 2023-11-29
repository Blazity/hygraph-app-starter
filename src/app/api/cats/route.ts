import { NextRequest, NextResponse } from 'next/server';
import { CAT_API_URL } from '../consts';
import { RequestBody } from './types';
import { ApiAsset } from '@/hooks/useAssetsQuery/useAssetsQuery.types';

export async function POST(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as RequestBody;

    const apiKey = requestBody.configuration.apiKey;

    if (!apiKey) {
      throw new Error('API key is missing');
    }

    const response = await fetch(CAT_API_URL, {
      headers: {
        'x-api-key': apiKey
      }
    });

    const data = (await response.json()) as ApiAsset[];

    const cats = data.slice(0, 10); // Example: Fetch only the first 10 cats

    return NextResponse.json({ data: cats });
  } catch (error) {
    console.error('Error fetching cat data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
