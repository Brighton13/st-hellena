export const flutterwaveConfig = {
  public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
  tx_ref: '', // Will be generated dynamically
  amount: 0, // Will be set dynamically
  currency: 'ZMW',
  payment_options: 'card, mobilemoneyzambia, banktransfer',
  customer: {
    email: '',
    name: '',
  },
  customizations: {
    title: 'St. Helena Parish Donations',
    description: 'Support our church mission',
    logo: '/logo.png', // Add your church logo
  },
};