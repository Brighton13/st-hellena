'use client';

import { useEffect, useState } from 'react';
import { supabase, type Event } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image_url: '',
    category: 'other' as 'mass' | 'prayer' | 'community' | 'youth' | 'other',
    is_published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      });
    } else if (data) {
      setEvents(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...formData,
      image_url: formData.image_url || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('events')
        .update(payload)
        .eq('id', editingId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update event',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Event updated successfully',
        });
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert([payload]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create event',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Event created successfully',
        });
        resetForm();
        fetchEvents();
      }
    }
  }

  function handleEdit(event: Event) {
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      image_url: event.image_url || '',
      category: event.category,
      is_published: event.is_published,
    });
    setEditingId(event.id);
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      fetchEvents();
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      image_url: '',
      category: 'other',
      is_published: true,
    });
    setEditingId(null);
    setIsEditing(false);
  }

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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Events</h1>
            <p className="text-slate-600 mt-2">Create and manage church events</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          )}
        </div>

        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Event' : 'New Event'}</CardTitle>
              <CardDescription>Fill in the details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event_date">Event Date & Time</Label>
                    <Input
                      id="event_date"
                      type="datetime-local"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: 'mass' | 'prayer' | 'community' | 'youth' | 'other') =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mass">Mass</SelectItem>
                        <SelectItem value="prayer">Prayer</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                        <SelectItem value="youth">Youth</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="image_url">Image URL (Optional)</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Published (visible to public)</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? 'Update' : 'Create'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {event.image_url ? (
                <img src={event.image_url} alt="img-2"/>
                // <div className="h-32 bg-gradient-to-br from-amber-200 to-orange-300" />
              ) : (
                <div className="h-32 bg-gradient-to-br from-slate-200 to-slate-300" />
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="w-fit">{event.category}</Badge>
                  {!event.is_published && (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-3 line-clamp-2">{event.description}</p>
                <p className="text-sm text-slate-500 mb-4">📍 {event.location}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {events.length === 0 && !isEditing && (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center text-slate-500">
                No events yet. Create your first one!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
