'use client';

import { useEffect, useState } from 'react';
import { supabase, type DailyMass } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function MassesAdmin() {
  const [masses, setMasses] = useState<DailyMass[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    mass_date: '',
    youtube_url: '',
    description: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMasses();
  }, []);

  async function fetchMasses() {
    const { data, error } = await supabase
      .from('daily_masses')
      .select('*')
      .order('mass_date', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch daily masses',
        variant: 'destructive',
      });
    } else if (data) {
      setMasses(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...formData,
      description: formData.description || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('daily_masses')
        .update(payload)
        .eq('id', editingId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update mass',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Mass updated successfully',
        });
        resetForm();
        fetchMasses();
      }
    } else {
      const { error } = await supabase
        .from('daily_masses')
        .insert([payload]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create mass',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Mass created successfully',
        });
        resetForm();
        fetchMasses();
      }
    }
  }

  function handleEdit(mass: DailyMass) {
    setFormData({
      title: mass.title,
      mass_date: mass.mass_date,
      youtube_url: mass.youtube_url,
      description: mass.description || '',
    });
    setEditingId(mass.id);
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this mass recording?')) return;

    const { error } = await supabase
      .from('daily_masses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete mass',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Mass deleted successfully',
      });
      fetchMasses();
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      mass_date: '',
      youtube_url: '',
      description: '',
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
            <h1 className="text-3xl font-bold text-slate-900">Manage Daily Masses</h1>
            <p className="text-slate-600 mt-2">Add YouTube links for daily mass recordings</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Mass Recording
            </Button>
          )}
        </div>

        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Mass Recording' : 'New Mass Recording'}</CardTitle>
              <CardDescription>Fill in the details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Sunday Mass - 10:30 AM"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mass_date">Mass Date</Label>
                    <Input
                      id="mass_date"
                      type="date"
                      value={formData.mass_date}
                      onChange={(e) => setFormData({ ...formData, mass_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtube_url">YouTube URL</Label>
                    <Input
                      id="youtube_url"
                      value={formData.youtube_url}
                      onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Special readings, feast day, etc."
                  />
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

        <div className="space-y-4">
          {masses.map((mass) => (
            <Card key={mass.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{mass.title}</CardTitle>
                    <CardDescription>
                      {new Date(mass.mass_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(mass)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(mass.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden mb-3">
                  <iframe
                    width="100%"
                    height="100%"
                    src={mass.youtube_url.replace('watch?v=', 'embed/')}
                    title={mass.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {mass.description && (
                  <p className="text-slate-700 text-sm">{mass.description}</p>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  YouTube: {mass.youtube_url}
                </p>
              </CardContent>
            </Card>
          ))}

          {masses.length === 0 && !isEditing && (
            <Card>
              <CardContent className="py-12 text-center text-slate-500">
                No mass recordings yet. Add your first one!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
