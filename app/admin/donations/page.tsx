'use client';

import { useEffect, useState } from 'react';
import { supabase, type Donation } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function DonationsAdmin() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    average: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  async function fetchDonations() {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch donations',
        variant: 'destructive',
      });
    } else if (data) {
      setDonations(data);

      const total = data.reduce((sum, d) => sum + Number(d.amount), 0);
      const count = data.length;
      const average = count > 0 ? total / count : 0;

      setStats({ total, count, average });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Donation Records</h1>
          <p className="text-slate-600 mt-2">View and track donations received</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-green-600">
            <CardHeader>
              <CardDescription>Total Donations</CardDescription>
              <CardTitle className="text-3xl">${stats.total.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardDescription>Number of Donations</CardDescription>
              <CardTitle className="text-3xl">{stats.count}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-amber-600">
            <CardHeader>
              <CardDescription>Average Donation</CardDescription>
              <CardTitle className="text-3xl">${stats.average.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>All donation records</CardDescription>
          </CardHeader>
          <CardContent>
            {donations.length > 0 ? (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {donation.donor_name || 'Anonymous Donor'}
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(donation.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        {donation.donor_email && (
                          <div className="text-xs text-slate-500 mt-1">
                            {donation.donor_email}
                          </div>
                        )}
                        {donation.message && (
                          <div className="text-sm text-slate-600 mt-2 italic">
                            "{donation.message}"
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${Number(donation.amount).toFixed(2)}
                      </div>
                      <Badge
                        variant={
                          donation.status === 'completed'
                            ? 'default'
                            : donation.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {donation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                No donations recorded yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
