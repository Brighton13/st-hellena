'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Video, DollarSign, ArrowLeft, Church } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Church className="h-8 w-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600">Manage your parish website content</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/announcements">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-amber-600">
              <CardHeader>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  <Bell className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Manage parish announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Manage</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/events">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-blue-600">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Events</CardTitle>
                <CardDescription>Manage church events</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Manage</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/masses">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-green-600">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Daily Masses</CardTitle>
                <CardDescription>Manage mass recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Manage</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/donations">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-orange-600">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Donations</CardTitle>
                <CardDescription>View donation records</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <p className="text-slate-700">Create announcements to share news with your parishioners</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <p className="text-slate-700">Add upcoming events to keep the community informed</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <p className="text-slate-700">Upload daily mass YouTube links for those who cannot attend in person</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <p className="text-slate-700">Monitor donations and acknowledge the generosity of your community</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
