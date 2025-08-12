import { NextResponse } from 'next/server';

/**
 * A simple mock API route for handling donations.
 * In a real application, this would connect to a payment gateway,
 * save the donation to a database, and then return a real transaction ID.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation to ensure data is received
    if (!body.name || !body.mobile || !body.amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Simulate a successful transaction by generating a random ID
    const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({ transactionId });
  } catch (error) {
    console.error('Donation API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}