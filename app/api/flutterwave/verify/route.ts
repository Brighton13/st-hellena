// app/api/flutterwave/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { flutterwaveSecureService } from '../../../../lib/services/flutterwave-secure';

export async function POST(request: NextRequest) {
  try {
    const { transaction_id } = await request.json();

    if (!transaction_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Transaction ID is required'
        },
        { status: 400 }
      );
    }

    const verificationResponse = await flutterwaveSecureService.verifyTransaction(transaction_id);

    return NextResponse.json({
      success: true,
      data: verificationResponse,
      message: 'Transaction verified successfully'
    });

  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify transaction',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}