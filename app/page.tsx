// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { supabase, type Announcement, type Event, type DailyMass } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Church, Calendar, Video, Heart, Bell, Users, BookOpen } from 'lucide-react';

// export default function Home() {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
//   const [latestMass, setLatestMass] = useState<DailyMass | null>(null);
//   const [selectedMass, setSelectedMass] = useState(masses[0]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     const { data: announcementsData } = await supabase
//       .from('announcements')
//       .select('*')
//       .eq('is_active', true)
//       .order('priority', { ascending: false })
//       .order('created_at', { ascending: false })
//       .limit(3);

//     const { data: eventsData } = await supabase
//       .from('events')
//       .select('*')
//       .eq('is_published', true)
//       .gte('event_date', new Date().toISOString())
//       .order('event_date', { ascending: true })
//       .limit(3);

//     const { data: massData } = await supabase
//       .from('daily_masses')
//       .select('*')
//       .order('mass_date', { ascending: false })
//       .limit(1)
//       .maybeSingle();

//     if (announcementsData) setAnnouncements(announcementsData);
//     if (eventsData) setUpcomingEvents(eventsData);
//     if (massData) setLatestMass(massData);
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Church className="h-8 w-8 text-amber-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">St. Helena Parish</h1>
//                 <p className="text-sm text-slate-600">A Community of Faith, Hope, and Love</p>
//               </div>
//             </div>
//             <nav className="hidden md:flex gap-6 items-center">
//               <Link href="#announcements" className="text-slate-700 hover:text-amber-600 transition-colors">
//                 Announcements
//               </Link>
//               <Link href="#events" className="text-slate-700 hover:text-amber-600 transition-colors">
//                 Events
//               </Link>
//               <Link href="#masses" className="text-slate-700 hover:text-amber-600 transition-colors">
//                 Daily Mass
//               </Link>
//               <Link href="/donate" className="text-slate-700 hover:text-amber-600 transition-colors">
//                 Donate
//               </Link>
//               <Link href="/admin">
//                 <Button variant="outline" size="sm">
//                   Admin
//                 </Button>
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <section className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-5xl font-bold mb-6">Welcome to St. Helena Parish</h2>
//           <p className="text-xl mb-8 text-amber-50 max-w-2xl mx-auto leading-relaxed">
//             Join us in worship, fellowship, and service as we grow together in faith and strengthen our community through God's love.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 shadow-lg" asChild>
//               <Link href="#masses">
//                 <Calendar className="mr-2 h-5 w-5" />
//                 View Mass Schedule
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
//               <Link href="/donate">
//                 <Heart className="mr-2 h-5 w-5" />
//                 Support Our Parish
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             <Card className="border-t-4 border-t-amber-600 shadow-md hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
//                   <Church className="h-6 w-6 text-amber-600" />
//                 </div>
//                 <CardTitle>Mass Times</CardTitle>
//                 <CardDescription>Join us for worship and prayer</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Sunday:</span>
//                     <span className="font-medium">7:00 AM, 09:00 AM, 10:30 AM</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Weekdays:</span>
//                     <span className="font-medium">06:20 AM</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Saturday:</span>
//                     <span className="font-medium">06:00 AM, 7:30 AM (Youth Mass)</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-t-4 border-t-blue-600 shadow-md hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                   <Users className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <CardTitle>Get Involved</CardTitle>
//                 <CardDescription>Become part of our community</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-slate-600 mb-4">
//                   Connect with others through ministries, volunteer opportunities, and fellowship groups.
//                 </p>
//                 <Button variant="outline" className="w-full">Learn More</Button>
//               </CardContent>
//             </Card>

//             <Card className="border-t-4 border-t-green-600 shadow-md hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                   <BookOpen className="h-6 w-6 text-green-600" />
//                 </div>
//                 <CardTitle>Faith Formation</CardTitle>
//                 <CardDescription>Grow in your faith journey</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-slate-600 mb-4">
//                   Programs for all ages including RCIA, youth ministry, and adult education.
//                 </p>
//                 <Button variant="outline" className="w-full">Explore Programs</Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <section id="announcements" className="py-16 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3 mb-8">
//             <Bell className="h-8 w-8 text-amber-600" />
//             <h3 className="text-3xl font-bold text-slate-900">Parish Announcements</h3>
//           </div>

//           {announcements.length > 0 ? (
//             <div className="space-y-4">
//               {announcements.map((announcement) => (
//                 <Card key={announcement.id} className="shadow-md hover:shadow-lg transition-shadow">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <CardTitle className="text-xl">{announcement.title}</CardTitle>
//                       {announcement.priority === 'high' && (
//                         <Badge variant="destructive">Important</Badge>
//                       )}
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-slate-700 leading-relaxed">{announcement.content}</p>
//                     <p className="text-sm text-slate-500 mt-4">
//                       Posted {new Date(announcement.created_at).toLocaleDateString()}
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <Card className="shadow-md">
//               <CardContent className="py-12 text-center text-slate-500">
//                 No announcements at this time. Check back soon!
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </section>

//       <section id="events" className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3 mb-8">
//             <Calendar className="h-8 w-8 text-amber-600" />
//             <h3 className="text-3xl font-bold text-slate-900">Upcoming Events</h3>
//           </div>

//           {upcomingEvents.length > 0 ? (
//             <div className="grid md:grid-cols-3 gap-6">
//               {upcomingEvents.map((event) => (
//                 <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                   {event.image_url && (
//                     <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300" />
//                   )}
//                   <CardHeader>
//                     <Badge className="w-fit mb-2">{event.category}</Badge>
//                     <CardTitle className="text-lg">{event.title}</CardTitle>
//                     <CardDescription>
//                       {new Date(event.event_date).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-slate-700 mb-3">{event.description}</p>
//                     <p className="text-sm text-slate-500">📍 {event.location}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <Card className="shadow-md">
//               <CardContent className="py-12 text-center text-slate-500">
//                 No upcoming events scheduled. Check back soon!
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </section>

//       <section id="masses" className="py-16 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3 mb-8">
//             <Video className="h-8 w-8 text-amber-600" />
//             <h3 className="text-3xl font-bold text-slate-900">Daily Mass Videos</h3>
//           </div>

//           {masses.length > 0 ? (
//             <div className="space-y-8">
//               {/* Main featured mass */}
//               <Card className="shadow-md max-w-4xl mx-auto">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">{selectedMass.title}</CardTitle>
//                   <CardDescription>
//                     {new Date(selectedMass.mass_date).toLocaleDateString('en-US', {
//                       weekday: 'long',
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
//                     <iframe
//                       width="100%"
//                       height="100%"
//                       src={selectedMass.youtube_url.replace('watch?v=', 'embed/')}
//                       title={selectedMass.title}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   </div>
//                   {selectedMass.description && (
//                     <p className="text-slate-700">{selectedMass.description}</p>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Grid of 4 recent masses */}
//               <div className="max-w-4xl mx-auto">
//                 <h4 className="text-lg font-semibold text-slate-700 mb-4">Recent Masses</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {masses.map((mass) => (
//                     <Card
//                       key={mass.id}
//                       className={`cursor-pointer transition-all hover:shadow-lg ${selectedMass.id === mass.id ? 'ring-2 ring-amber-500' : ''
//                         }`}
//                       onClick={() => setSelectedMass(mass)}
//                     >
//                       <CardContent className="p-4">
//                         <div className="aspect-video bg-slate-200 rounded-lg mb-3 overflow-hidden">
//                           <img
//                             src={`https://img.youtube.com/vi/${mass.youtube_url.split('v=')[1]}/hqdefault.jpg`}
//                             alt={mass.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <h5 className="font-medium text-slate-900 line-clamp-2 text-sm">
//                           {mass.title}
//                         </h5>
//                         <p className="text-xs text-slate-500 mt-1">
//                           {new Date(mass.mass_date).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             year: 'numeric'
//                           })}
//                         </p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>

//               <div className="text-center">
//                 <Button variant="outline">View All Mass Videos</Button>
//               </div>
//             </div>
//           ) : (
//             <Card className="shadow-md max-w-4xl mx-auto">
//               <CardContent className="py-12 text-center text-slate-500">
//                 No mass videos available yet. Check back soon!
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </section>

//       <section id="donate" className="py-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <Heart className="h-16 w-16 mx-auto mb-6 text-amber-100" />
//           <h3 className="text-4xl font-bold mb-4">Support St. Helena Parish</h3>
//           <p className="text-xl mb-8 text-amber-50 leading-relaxed">
//             Your generous donations help us continue our mission of spreading God's love, supporting our community, and maintaining our sacred space.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50" asChild>
//               <Link href="/donate">
//                 <Heart className="mr-2 h-5 w-5" />
//                 Make a Donation
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
//               <Link href="/donate">
//                 Learn About Planned Giving
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-slate-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <Church className="h-6 w-6 text-amber-400" />
//                 <h4 className="text-lg font-bold">St. Helena Parish</h4>
//               </div>
//               <p className="text-slate-400 text-sm leading-relaxed">
//                 A welcoming Catholic community dedicated to worship, service, and spiritual growth.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4">Contact Us</h4>
//               <div className="text-sm text-slate-400 space-y-2">
//                 <p>123 Church Street</p>
//                 <p>Your City, State 12345</p>
//                 <p>Phone: (555) 123-4567</p>
//                 <p>Email: info@sthelenparish.org</p>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4">Office Hours</h4>
//               <div className="text-sm text-slate-400 space-y-2">
//                 <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
//                 <p>Saturday: 9:00 AM - 1:00 PM</p>
//                 <p>Sunday: By appointment</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
//             <p>&copy; {new Date().getFullYear()} St. Helena Parish. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, type Announcement, type Event, type DailyMass } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Church, Calendar, Video, Heart, Bell, Users, BookOpen } from 'lucide-react';

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [masses, setMasses] = useState<DailyMass[]>([]);
  const [selectedMass, setSelectedMass] = useState<DailyMass | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: announcementsData } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(3);

    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true })
      .limit(3);

    const { data: massData } = await supabase
      .from('daily_masses')
      .select('*')
      .order('mass_date', { ascending: false })
      .limit(4);

    if (announcementsData) setAnnouncements(announcementsData);
    if (eventsData) setUpcomingEvents(eventsData);
    if (massData) {
      setMasses(massData);
      setSelectedMass(massData[0]); // Set the first mass as selected by default
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Church className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">St. Helena Parish</h1>
                <p className="text-sm text-slate-600">A Community of Faith, Hope, and Love</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 items-center">
              <Link href="#announcements" className="text-slate-700 hover:text-amber-600 transition-colors">
                Announcements
              </Link>
              <Link href="#events" className="text-slate-700 hover:text-amber-600 transition-colors">
                Events
              </Link>
              <Link href="#masses" className="text-slate-700 hover:text-amber-600 transition-colors">
                Daily Mass
              </Link>
              <Link href="/donate" className="text-slate-700 hover:text-amber-600 transition-colors">
                Donate
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to St. Helena Parish</h2>
          <p className="text-xl mb-8 text-amber-50 max-w-2xl mx-auto leading-relaxed">
            Join us in worship, fellowship, and service as we grow together in faith and strengthen our community through God's love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 shadow-lg" asChild>
              <Link href="#masses">
                <Calendar className="mr-2 h-5 w-5" />
                View Mass Schedule
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Support Our Parish
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-amber-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Church className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Mass Times</CardTitle>
                <CardDescription>Join us for worship and prayer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sunday:</span>
                    <span className="font-medium">7:00 AM, 09:00 AM, 10:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Weekdays:</span>
                    <span className="font-medium">06:20 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday:</span>
                    <span className="font-medium">06:00 AM, 7:30 AM (Youth Mass)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Get Involved</CardTitle>
                <CardDescription>Become part of our community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Connect with others through ministries, volunteer opportunities, and fellowship groups.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Faith Formation</CardTitle>
                <CardDescription>Grow in your faith journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Programs for all ages including RCIA, youth ministry, and adult education.
                </p>
                <Button variant="outline" className="w-full">Explore Programs</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="announcements" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="h-8 w-8 text-amber-600" />
            <h3 className="text-3xl font-bold text-slate-900">Parish Announcements</h3>
          </div>

          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      {announcement.priority === 'high' && (
                        <Badge variant="destructive">Important</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{announcement.content}</p>
                    <p className="text-sm text-slate-500 mt-4">
                      Posted {new Date(announcement.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-md">
              <CardContent className="py-12 text-center text-slate-500">
                No announcements at this time. Check back soon!
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="events" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-8 w-8 text-amber-600" />
            <h3 className="text-3xl font-bold text-slate-900">Upcoming Events</h3>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {event.image_url && (
                    // <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300">
                      <img src={event.image_url} alt="img-alt" className="h-25"/>
                    // </div>
                  )}
                  <CardHeader>
                    <Badge className="w-fit mb-2">{event.category}</Badge>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 mb-3">{event.description}</p>
                    <p className="text-sm text-slate-500">📍 {event.location}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-md">
              <CardContent className="py-12 text-center text-slate-500">
                No upcoming events scheduled. Check back soon!
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="masses" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Video className="h-8 w-8 text-amber-600" />
            <h3 className="text-3xl font-bold text-slate-900">Daily Mass Videos</h3>
          </div>

          {masses.length > 0 && selectedMass ? (
            <div className="space-y-8">
              {/* Main featured mass */}
              <Card className="shadow-md max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedMass.title}</CardTitle>
                  <CardDescription>
                    {new Date(selectedMass.mass_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedMass.youtube_url.replace('watch?v=', 'embed/')}
                      title={selectedMass.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {selectedMass.description && (
                    <p className="text-slate-700">{selectedMass.description}</p>
                  )}
                </CardContent>
              </Card>

              {/* Grid of 4 recent masses */}
              <div className="max-w-4xl mx-auto">
                <h4 className="text-lg font-semibold text-slate-700 mb-4">Recent Masses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {masses.map((mass) => (
                    <Card
                      key={mass.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${selectedMass.id === mass.id ? 'ring-2 ring-amber-500' : ''
                        }`}
                      onClick={() => setSelectedMass(mass)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-slate-200 rounded-lg mb-3 overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${mass.youtube_url.split('v=')[1]}/hqdefault.jpg`}
                            alt={mass.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h5 className="font-medium text-slate-900 line-clamp-2 text-sm">
                          {mass.title}
                        </h5>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(mass.mass_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* <div className="text-center">
                <Button variant="outline">View All Mass Videos</Button>
              </div> */}
            </div>
          ) : (
            <Card className="shadow-md max-w-4xl mx-auto">
              <CardContent className="py-12 text-center text-slate-500">
                No mass videos available yet. Check back soon!
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="donate" className="py-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-amber-100" />
          <h3 className="text-4xl font-bold mb-4">Support St. Helena Parish</h3>
          <p className="text-xl mb-8 text-amber-50 leading-relaxed">
            Your generous donations help us continue our mission of spreading God's love, supporting our community, and maintaining our sacred space.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50" asChild>
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
              <Link href="/donate">
                Learn About Planned Giving
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Church className="h-6 w-6 text-amber-400" />
                <h4 className="text-lg font-bold">St. Helena Parish</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                A welcoming Catholic community dedicated to worship, service, and spiritual growth.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <div className="text-sm text-slate-400 space-y-2">
                <p>Off greg Lungu</p>
                <p>Lusaka Zambia</p>
                <p>Phone:  0973849272</p>
                <p>Email: info@sthelenparish.org</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Office Hours</h4>
              <div className="text-sm text-slate-400 space-y-2">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: By appointment</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} St. Helena Parish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}