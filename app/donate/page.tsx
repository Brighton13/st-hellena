// 'use client';

// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Heart, ArrowLeft, Check } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import Link from 'next/link';

// export default function DonatePage() {
//   const [formData, setFormData] = useState({
//     donor_name: '',
//     donor_email: '',
//     amount: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const { toast } = useToast();

//   const presetAmounts = [25, 50, 100, 250, 500];

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const { error } = await supabase
//       .from('donations')
//       .insert([
//         {
//           donor_name: formData.donor_name || null,
//           donor_email: formData.donor_email || null,
//           amount: parseFloat(formData.amount),
//           message: formData.message || null,
//           status: 'completed',
//           currency: 'ZMW',
//         },
//       ]);

//     setIsSubmitting(false);

//     if (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to process donation. Please try again.',
//         variant: 'destructive',
//       });
//     } else {
//       setSubmitted(true);
//       toast({
//         title: 'Thank you!',
//         description: 'Your donation has been recorded.',
//       });
//     }
//   }

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Card className="text-center">
//             <CardContent className="py-16">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Check className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Your Generosity!</h2>
//               <p className="text-lg text-slate-600 mb-8">
//                 Your donation of ZMW{formData.amount} has been successfully recorded. May God bless you for your kindness and support of St. Helena Parish.
//               </p>
//               <div className="flex gap-4 justify-center">
//                 <Link href="/">
//                   <Button>
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Return to Home
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setSubmitted(false);
//                     setFormData({
//                       donor_name: '',
//                       donor_email: '',
//                       amount: '',
//                       message: '',
//                     });
//                   }}
//                 >
//                   Make Another Donation
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-6">
//           <Link href="/">
//             <Button variant="ghost" size="sm">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Home
//             </Button>
//           </Link>
//         </div>

//         <div className="text-center mb-8">
//           <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Heart className="h-8 w-8 text-amber-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">Support St. Helena Parish</h1>
//           <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
//             Your generous donations help us continue our mission of faith, worship, and service to our community. Every contribution makes a meaningful difference.
//           </p>
//         </div>

//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Make a Donation</CardTitle>
//             <CardDescription>All donations are greatly appreciated and help support our parish ministries</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
//                 <div className="grid grid-cols-5 gap-3 mb-3">
//                   {presetAmounts.map((amount) => (
//                     <Button
//                       key={amount}
//                       type="button"
//                       variant={formData.amount === String(amount) ? 'default' : 'outline'}
//                       className="h-12"
//                       onClick={() => setFormData({ ...formData, amount: String(amount) })}
//                     >
//                       ZMW {amount}
//                     </Button>
//                   ))}
//                 </div>
//                 <div>
//                   <Label htmlFor="amount">Or enter custom amount</Label>
//                   <div className="relative mt-1">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">ZMW</span>
//                     <Input
//                       id="amount"
//                       type="number"
//                       min="1"
//                       step="0.01"
//                       value={formData.amount}
//                       onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                       className="pl-7"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <h3 className="text-base font-semibold mb-4">Your Information (Optional)</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="donor_name">Name</Label>
//                     <Input
//                       id="donor_name"
//                       value={formData.donor_name}
//                       onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
//                       placeholder="Leave blank to donate anonymously"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="donor_email">Email</Label>
//                     <Input
//                       id="donor_email"
//                       type="email"
//                       value={formData.donor_email}
//                       onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
//                       placeholder="For donation receipt"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="message">Message (Optional)</Label>
//                     <Textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       rows={3}
//                       placeholder="Share a prayer intention or message..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//                 <p className="text-sm text-slate-700">
//                   <strong>Note:</strong> This is a demonstration donation form. In a production environment, this would integrate with a payment processor like Stripe for secure credit card payments.
//                 </p>
//               </div>

//               <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
//                 <Heart className="mr-2 h-5 w-5" />
//                 {isSubmitting ? 'Processing...' : 'Complete Donation'}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <div className="mt-8 text-center">
//           <Card className="bg-slate-50 border-0">
//             <CardContent className="py-8">
//               <h3 className="text-lg font-semibold mb-4">Other Ways to Give</h3>
//               <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
//                 <div>
//                   <strong className="block text-slate-900 mb-2">Mail</strong>
//                   <p>St. Helena Parish</p>
//                   <p>123 Church Street</p>
//                   <p>Your City, State 12345</p>
//                 </div>
//                 <div>
//                   <strong className="block text-slate-900 mb-2">In Person</strong>
//                   <p>Office Hours:</p>
//                   <p>Monday - Friday</p>
//                   <p>9:00 AM - 5:00 PM</p>
//                 </div>
//                 <div>
//                   <strong className="block text-slate-900 mb-2">Planned Giving</strong>
//                   <p>Contact our office to learn about</p>
//                   <p>legacy gifts and estate planning</p>
//                   <p>(555) 123-4567</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useCallback } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Heart, ArrowLeft, Check, Smartphone, Building } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import Link from 'next/link';
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

// export default function DonatePage() {
//   const [formData, setFormData] = useState({
//     donor_name: '',
//     donor_email: '',
//     amount: '',
//     message: '',
//     payment_method: 'mobilemoney', // 'mobilemoney' or 'banktransfer'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const { toast } = useToast();

//   const presetAmounts = [25, 50, 100, 250, 500];

//   // Generate unique transaction reference
//   const generateTransactionRef = () => {
//     return `STHELENA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//   };

//   const handleFlutterwavePayment = useFlutterwave({
//     public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
//     tx_ref: generateTransactionRef(),
//     amount: parseFloat(formData.amount) || 0,
//     currency: 'ZMW',
//     payment_options: 'card, mobilemoneyzambia, banktransfer',
//     customer: {
//       email: formData.donor_email || 'anonymous@sthelena.org',
//       name: formData.donor_name || 'Anonymous Donor',
//       phone_number: ''
//     },
//     customizations: {
//       title: 'St. Helena Parish Donations',
//       description: 'Support our church mission and community services',
//       logo: '/logo.png',
//     },
//   });

//   const handlePayment = async () => {
//     if (!formData.amount || parseFloat(formData.amount) <= 0) {
//       toast({
//         title: 'Invalid Amount',
//         description: 'Please enter a valid donation amount.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       handleFlutterwavePayment({
//         callback: async (response) => {
//           console.log('Payment response:', response);
          
//           if (response.status === 'successful') {
//             // Save donation to database
//             const { error } = await supabase
//               .from('donations')
//               .insert([
//                 {
//                   donor_name: formData.donor_name || null,
//                   donor_email: formData.donor_email || null,
//                   amount: parseFloat(formData.amount),
//                   message: formData.message || null,
//                   status: 'completed',
//                   currency: 'ZMW',
//                   payment_method: formData.payment_method,
//                   transaction_id: response.transaction_id,
//                   flutterwave_reference: response.tx_ref,
//                   created_at: new Date().toISOString(),
//                 },
//               ]);

//             if (error) {
//               console.error('Database error:', error);
//               toast({
//                 title: 'Donation Recorded',
//                 description: 'Payment successful but failed to save record. Please contact support.',
//                 variant: 'default',
//               });
//             } else {
//               setSubmitted(true);
//               toast({
//                 title: 'Thank You!',
//                 description: `Your donation of ZMW${formData.amount} has been processed successfully.`,
//               });
//             }
//           } else {
//             toast({
//               title: 'Payment Failed',
//               description: 'The payment was not successful. Please try again.',
//               variant: 'destructive',
//             });
//           }
          
//           closePaymentModal();
//           setIsSubmitting(false);
//         },
//         onClose: () => {
//           setIsSubmitting(false);
//           toast({
//             title: 'Payment Cancelled',
//             description: 'You cancelled the payment process.',
//             variant: 'default',
//           });
//         },
//       });
//     } catch (error) {
//       console.error('Payment error:', error);
//       toast({
//         title: 'Payment Error',
//         description: 'An error occurred while processing payment.',
//         variant: 'destructive',
//       });
//       setIsSubmitting(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Card className="text-center">
//             <CardContent className="py-16">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Check className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Your Generosity!</h2>
//               <p className="text-lg text-slate-600 mb-8">
//                 Your donation of ZMW{formData.amount} has been successfully processed. May God bless you for your kindness and support of St. Helena Parish.
//               </p>
//               <div className="flex gap-4 justify-center flex-col sm:flex-row">
//                 <Link href="/">
//                   <Button>
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Return to Home
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setSubmitted(false);
//                     setFormData({
//                       donor_name: '',
//                       donor_email: '',
//                       amount: '',
//                       message: '',
//                       payment_method: 'mobilemoney',
//                     });
//                   }}
//                 >
//                   Make Another Donation
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-6">
//           <Link href="/">
//             <Button variant="ghost" size="sm">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Home
//             </Button>
//           </Link>
//         </div>

//         <div className="text-center mb-8">
//           <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Heart className="h-8 w-8 text-amber-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">Support St. Helena Parish</h1>
//           <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
//             Your generous donations help us continue our mission of faith, worship, and service to our community. Every contribution makes a meaningful difference.
//           </p>
//         </div>

//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Make a Donation</CardTitle>
//             <CardDescription>All donations are greatly appreciated and help support our parish ministries</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {/* Payment Method Selection */}
//               <div>
//                 <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Button
//                     type="button"
//                     variant={formData.payment_method === 'mobilemoney' ? 'default' : 'outline'}
//                     className="h-16 flex-col gap-2"
//                     onClick={() => setFormData({ ...formData, payment_method: 'mobilemoney' })}
//                   >
//                     <Smartphone className="h-5 w-5" />
//                     Mobile Money
//                   </Button>
//                   <Button
//                     type="button"
//                     variant={formData.payment_method === 'banktransfer' ? 'default' : 'outline'}
//                     className="h-16 flex-col gap-2"
//                     onClick={() => setFormData({ ...formData, payment_method: 'banktransfer' })}
//                   >
//                     <Building className="h-5 w-5" />
//                     Bank Transfer
//                   </Button>
//                 </div>
//               </div>

//               {/* Amount Selection */}
//               <div>
//                 <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
//                 <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
//                   {presetAmounts.map((amount) => (
//                     <Button
//                       key={amount}
//                       type="button"
//                       variant={formData.amount === String(amount) ? 'default' : 'outline'}
//                       className="h-12"
//                       onClick={() => setFormData({ ...formData, amount: String(amount) })}
//                     >
//                       ZMW {amount}
//                     </Button>
//                   ))}
//                 </div>
//                 <div>
//                   <Label htmlFor="amount">Or enter custom amount</Label>
//                   <div className="relative mt-1">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></span>
//                     <Input
//                       id="amount"
//                       type="number"
//                       min="1"
//                       step="0.01"
//                       value={formData.amount}
//                       onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                       className="pl-7"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Donor Information */}
//               <div className="border-t pt-6">
//                 <h3 className="text-base font-semibold mb-4">Your Information (Optional)</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="donor_name">Name</Label>
//                     <Input
//                       id="donor_name"
//                       value={formData.donor_name}
//                       onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
//                       placeholder="Leave blank to donate anonymously"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="donor_email">Email</Label>
//                     <Input
//                       id="donor_email"
//                       type="email"
//                       value={formData.donor_email}
//                       onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
//                       placeholder="For donation receipt"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="message">Message (Optional)</Label>
//                     <Textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       rows={3}
//                       placeholder="Share a prayer intention or message..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Information */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <h4 className="font-semibold text-blue-900 mb-2">
//                   {formData.payment_method === 'mobilemoney' ? 'Mobile Money Payment' : 'Bank Transfer'}
//                 </h4>
//                 <p className="text-sm text-blue-700">
//                   {formData.payment_method === 'mobilemoney' 
//                     ? 'You will be redirected to Flutterwave to complete your mobile money payment securely.'
//                     : 'You will be redirected to Flutterwave to complete your bank transfer securely.'
//                   }
//                 </p>
//                 <p className="text-xs text-blue-600 mt-2">
//                   Supports: Airtel Money, MTN Mobile Money, and all major Zambian banks
//                 </p>
//               </div>

//               <Button 
//                 type="button" 
//                 size="lg" 
//                 className="w-full" 
//                 onClick={handlePayment}
//                 disabled={isSubmitting || !formData.amount || parseFloat(formData.amount) <= 0}
//               >
//                 <Heart className="mr-2 h-5 w-5" />
//                 {isSubmitting ? 'Processing...' : `Donate ZMW${formData.amount || '0'}`}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Other Ways to Give */}
//         <div className="mt-8 text-center">
//           <Card className="bg-slate-50 border-0">
//             <CardContent className="py-8">
//               <h3 className="text-lg font-semibold mb-4">Other Ways to Give</h3>
//               <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
//                 <div>
//                   <strong className="block text-slate-900 mb-2">Mobile Money</strong>
//                   <p>Airtel Money: 0977 123 456</p>
//                   <p>MTN Mobile Money: 0966 123 456</p>
//                 </div>
//                 <div>
//                   <strong className="block text-slate-900 mb-2">Bank Transfer</strong>
//                   <p>Bank: Zanaco</p>
//                   <p>Account: 1234567890</p>
//                   <p>St. Helena Parish</p>
//                 </div>
//                 <div>
//                   <strong className="block text-slate-900 mb-2">In Person</strong>
//                   <p>Office Hours:</p>
//                   <p>Monday - Friday</p>
//                   <p>9:00 AM - 5:00 PM</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowLeft, Check, Smartphone, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function DonatePage() {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    message: '',
    payment_method: 'mobilemoney',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const presetAmounts = [25, 50, 100, 250, 500];

  const handlePayment = async () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid donation amount.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.donor_email) {
      toast({
        title: 'Email Required',
        description: 'Email is required for payment processing.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call our secure API endpoint
      const response = await fetch('/api/flutterwave/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          email: formData.donor_email,
          fullname: formData.donor_name || 'Anonymous Donor',
          currency: 'ZMW',
          meta: {
            message: formData.message,
            payment_method: formData.payment_method,
            donation_type: 'church',
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to initiate payment');
      }

      if (result.success && result.data?.link) {
        // Redirect to Flutterwave payment page
        window.location.href = result.data.link;
      } else {
        throw new Error('No payment link received');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle successful payment callback (you can create a separate success page)
  const handleSuccessCallback = async (transactionData: any) => {
    try {
      // Save donation to database
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            donor_name: formData.donor_name || null,
            donor_email: formData.donor_email || null,
            amount: parseFloat(formData.amount),
            message: formData.message || null,
            status: 'completed',
            currency: 'ZMW',
            payment_method: formData.payment_method,
            transaction_id: transactionData.id,
            flutterwave_reference: transactionData.tx_ref,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error('Database error:', error);
        toast({
          title: 'Thank You!',
          description: 'Your donation was processed successfully.',
          variant: 'default',
        });
      } else {
        setSubmitted(true);
        toast({
          title: 'Thank You!',
          description: `Your donation of ZMW${formData.amount} has been processed successfully.`,
        });
      }
    } catch (error) {
      console.error('Error saving donation:', error);
      toast({
        title: 'Thank You!',
        description: 'Your donation was processed successfully.',
        variant: 'default',
      });
    }
  };

  // Check for payment success in URL parameters (if redirected back)
  // You can implement this if you set up a redirect URL
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const status = urlParams.get('status');
  //   const transactionId = urlParams.get('transaction_id');
  //   
  //   if (status === 'successful' && transactionId) {
  //     handleSuccessCallback({ id: transactionId, tx_ref: urlParams.get('tx_ref') });
  //   }
  // }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="py-16">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Your Generosity!</h2>
              <p className="text-lg text-slate-600 mb-8">
                Your donation of ZMW{formData.amount} has been successfully processed. May God bless you for your kindness and support of St. Helena Parish.
              </p>
              <div className="flex gap-4 justify-center flex-col sm:flex-row">
                <Link href="/">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      donor_name: '',
                      donor_email: '',
                      amount: '',
                      message: '',
                      payment_method: 'mobilemoney',
                    });
                  }}
                >
                  Make Another Donation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Support St. Helena Parish</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your generous donations help us continue our mission of faith, worship, and service to our community. Every contribution makes a meaningful difference.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>All donations are greatly appreciated and help support our parish ministries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={formData.payment_method === 'mobilemoney' ? 'default' : 'outline'}
                    className="h-16 flex-col gap-2"
                    onClick={() => setFormData({ ...formData, payment_method: 'mobilemoney' })}
                  >
                    <Smartphone className="h-5 w-5" />
                    Mobile Money
                  </Button>
                  <Button
                    type="button"
                    variant={formData.payment_method === 'banktransfer' ? 'default' : 'outline'}
                    className="h-16 flex-col gap-2"
                    onClick={() => setFormData({ ...formData, payment_method: 'banktransfer' })}
                  >
                    <Building className="h-5 w-5" />
                    Bank Transfer
                  </Button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={formData.amount === String(amount) ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setFormData({ ...formData, amount: String(amount) })}
                    >
                      ZMW {amount}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="amount">Or enter custom amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">ZMW</span>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="pl-12"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donor_email">Email Address *</Label>
                    <Input
                      id="donor_email"
                      type="email"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      placeholder="Your email for payment receipt"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="donor_name">Full Name (Optional)</Label>
                    <Input
                      id="donor_name"
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      placeholder="Leave blank to donate anonymously"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      placeholder="Share a prayer intention or message..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Secure Payment Processing
                </h4>
                <p className="text-sm text-blue-700">
                  You will be redirected to Flutterwave's secure payment page to complete your donation.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Supports: Airtel Money, MTN Mobile Money, Bank Transfers, and Card Payments
                </p>
              </div>

              <Button 
                type="button" 
                size="lg" 
                className="w-full" 
                onClick={handlePayment}
                disabled={isSubmitting || !formData.amount || !formData.donor_email || parseFloat(formData.amount) <= 0}
              >
                <Heart className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Processing...' : `Donate ZMW${formData.amount || '0'}`}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other Ways to Give */}
        <div className="mt-8 text-center">
          <Card className="bg-slate-50 border-0">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold mb-4">Other Ways to Give</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div>
                  <strong className="block text-slate-900 mb-2">Mobile Money</strong>
                  <p>Airtel Money: 0977 123 456</p>
                  <p>MTN Mobile Money: 0966 123 456</p>
                </div>
                <div>
                  <strong className="block text-slate-900 mb-2">Bank Transfer</strong>
                  <p>Bank: Zanaco</p>
                  <p>Account: 1234567890</p>
                  <p>St. Helena Parish</p>
                </div>
                <div>
                  <strong className="block text-slate-900 mb-2">In Person</strong>
                  <p>Office Hours:</p>
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}