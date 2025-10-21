'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function DonatePage() {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const presetAmounts = [25, 50, 100, 250, 500];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

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
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to process donation. Please try again.',
        variant: 'destructive',
      });
    } else {
      setSubmitted(true);
      toast({
        title: 'Thank you!',
        description: 'Your donation has been recorded.',
      });
    }
  }

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
                Your donation of ${formData.amount} has been successfully recorded. May God bless you for your kindness and support of St. Helena Parish.
              </p>
              <div className="flex gap-4 justify-center">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
                <div className="grid grid-cols-5 gap-3 mb-3">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={formData.amount === String(amount) ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setFormData({ ...formData, amount: String(amount) })}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="amount">Or enter custom amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="pl-7"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-base font-semibold mb-4">Your Information (Optional)</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donor_name">Name</Label>
                    <Input
                      id="donor_name"
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      placeholder="Leave blank to donate anonymously"
                    />
                  </div>

                  <div>
                    <Label htmlFor="donor_email">Email</Label>
                    <Input
                      id="donor_email"
                      type="email"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      placeholder="For donation receipt"
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

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> This is a demonstration donation form. In a production environment, this would integrate with a payment processor like Stripe for secure credit card payments.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                <Heart className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Processing...' : 'Complete Donation'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Card className="bg-slate-50 border-0">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold mb-4">Other Ways to Give</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div>
                  <strong className="block text-slate-900 mb-2">Mail</strong>
                  <p>St. Helena Parish</p>
                  <p>123 Church Street</p>
                  <p>Your City, State 12345</p>
                </div>
                <div>
                  <strong className="block text-slate-900 mb-2">In Person</strong>
                  <p>Office Hours:</p>
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <strong className="block text-slate-900 mb-2">Planned Giving</strong>
                  <p>Contact our office to learn about</p>
                  <p>legacy gifts and estate planning</p>
                  <p>(555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
