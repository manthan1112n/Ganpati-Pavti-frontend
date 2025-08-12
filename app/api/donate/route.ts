import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, amount } = body;

    // Basic validation
    if (!name || !mobile || !amount) {
      return NextResponse.json(
        { error: 'सर्व फील्ड भरणे आवश्यक आहे' },
        { status: 400 }
      );
    }

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'वैध मोबाईल नंबर टाका' },
        { status: 400 }
      );
    }

    // Validate amount
    if (isNaN(amount) || parseInt(amount) <= 0) {
      return NextResponse.json(
        { error: 'वैध रक्कम टाका' },
        { status: 400 }
      );
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a mock transaction ID
    const transactionId = 'GNP' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Mock successful payment response
    return NextResponse.json({
      success: true,
      message: 'देणगी यशस्वीरित्या प्राप्त झाली',
      transactionId,
      amount: parseInt(amount),
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Donation API error:', error);
    return NextResponse.json(
      { error: 'सर्व्हर त्रुटी. कृपया पुन्हा प्रयत्न करा.' },
      { status: 500 }
    );
  }
}