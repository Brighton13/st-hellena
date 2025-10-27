// app/api/flutterwave/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { flutterwaveSecureService } from '../../../../lib/services/flutterwave-secure';

export async function GET(request: NextRequest) {
  try {
    const token = await flutterwaveSecureService.getAccessToken();
    
    return NextResponse.json({
      success: true,
      token: token.substring(0, 20) + '...', // Don't expose full token
      message: 'Access token retrieved successfully'
    });
  } catch (error) {
    console.error('Token API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve access token',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}