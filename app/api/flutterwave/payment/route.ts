// // app/api/flutterwave/payment/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { flutterwaveSecureService } from '../../../../lib/services/flutterwave-secure';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     const {
//       amount,
//       currency = 'ZMW',
//       customer,
//       email,
//       customizations,
//       payment_method = 'card',
//       meta
//     } = body;

//     // Validate required fields
//     if (!amount) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Missing required fields: amount, customer.email, customer.name'
//         },
//         { status: 400 }
//       );
//     }

//     const tx_ref = flutterwaveSecureService.generateTransactionRef();

//     const paymentData = {
//       amount,
//       currency,
//       tx_ref,
//       payment_method,
//       email,
//       customer,
//       customizations: {
//         title: customizations?.title || 'St. Helena Parish Donations',
//         description: customizations?.description || 'Church donation',
//         logo: customizations?.logo,
//       },
//       meta: {
//         church_donation: true,
//         donor_name: customer.name,
//         ...meta
//       },
//       redirect_url: `${process.env.NEXTAUTH_URL}/donate/success`, // Your success page
//     };

//     const paymentResponse = await flutterwaveSecureService.initializePayment(paymentData);

//     return NextResponse.json({
//       success: true,
//       data: paymentResponse.data,
//       tx_ref,
//       message: 'Payment initiated successfully'
//     });

//   } catch (error) {
//     console.error('Payment API error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to initiate payment',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }


// app/api/flutterwave/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { flutterwaveSecureService } from '@/lib/services/flutterwave-secure';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body'
        },
        { status: 400 }
      );
    }
    
    const {
      amount,
      email,
      fullname,
      phone_number,
      currency = 'ZMW',
      meta = {},
    } = body;

    // Validate required fields
    if (!amount || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: amount, email'
        },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Amount must be a positive number'
        },
        { status: 400 }
      );
    }

    // Generate transaction reference
    const tx_ref = flutterwaveSecureService.generateTransactionRef();

    const paymentData = {
      amount: amountNum,
      currency,
      email: email.trim(),
      tx_ref,
      fullname: (fullname || 'Anonymous Donor').trim(),
      phone_number: phone_number?.trim() || '',
      redirect_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/donate/success`,
      meta: {
        church_donation: true,
        donor_name: fullname || 'Anonymous',
        ...meta,
      },
    };

    console.log('Initiating payment with data:', { ...paymentData, email: '***' }); // Log without sensitive data

    // Initialize payment with Flutterwave
    const paymentResponse = await flutterwaveSecureService.initializePayment(paymentData);

    console.log('Payment response received:', paymentResponse.status);

    return NextResponse.json({
      success: true,
      data: paymentResponse.data,
      tx_ref,
      message: 'Payment initiated successfully'
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to initiate payment';
    let errorDetails = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorDetails.includes('Token request failed')) {
      errorMessage = 'Authentication failed with payment processor';
    } else if (errorDetails.includes('encrypt')) {
      errorMessage = 'Payment data encryption failed';
    } else if (errorDetails.includes('network') || errorDetails.includes('fetch')) {
      errorMessage = 'Network error occurred while connecting to payment processor';
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}

// Also add a GET handler for debugging
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Flutterwave payment API is running',
    timestamp: new Date().toISOString()
  });
}