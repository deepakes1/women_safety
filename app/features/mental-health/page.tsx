'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const emotions = [
  { value: 'happy', label: '😊 Happy' },
  { value: 'sad', label: '😢 Sad' },
  { value: 'anxious', label: '😰 Anxious' },
  { value: 'angry', label: '😠 Angry' },
  { value: 'calm', label: '😌 Calm' },
  { value: 'tired', label: '😴 Tired' },
];

const selfCareSuggestions = {
  happy: [
    'Share your joy with others',
    'Practice gratitude',
    'Engage in creative activities',
    'Help someone else',
  ],
  sad: [
    'Talk to a friend or loved one',
    'Practice self-compassion',
    'Listen to uplifting music',
    'Write in a journal',
  ],
  anxious: [
    'Practice deep breathing',
    'Go for a walk',
    'Try meditation',
    'Write down your worries',
  ],
  angry: [
    'Take deep breaths',
    'Go for a run',
    'Write a letter (but don\'t send it)',
    'Practice mindfulness',
  ],
  calm: [
    'Maintain this peaceful state',
    'Practice gratitude',
    'Help others find peace',
    'Engage in gentle exercise',
  ],
  tired: [
    'Take a short nap',
    'Drink water',
    'Go for a gentle walk',
    'Practice relaxation techniques',
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function MentalHealthPage() {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [entries, setEntries] = useState<Array<{emotion: string, entry: string, date: string}>>([]);

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = localStorage.getItem('mentalHealthEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleEmotionSelect = (value: string) => {
    setSelectedEmotion(value);
    setShowSuggestions(true);
  };

  const handleSaveEntry = () => {
    if (!selectedEmotion || !journalEntry) return;

    const newEntry = {
      emotion: selectedEmotion,
      entry: journalEntry,
      date: new Date().toISOString()
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('mentalHealthEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setSelectedEmotion('');
    setJournalEntry('');
    setShowSuggestions(false);
  };

  const getEmotionData = () => {
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion.value] = entries.filter(e => e.emotion === emotion.value).length;
      return acc;
    }, {} as Record<string, number>);

    return emotions.map(emotion => ({
      name: emotion.label,
      value: emotionCounts[emotion.value] || 0
    }));
  };

  const getTimeSeriesData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayEntries = entries.filter(entry => 
        entry.date.split('T')[0] === date
      );
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        entries: dayEntries.length
      };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Mental Health Tracker</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={handleEmotionSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your emotion" />
                </SelectTrigger>
                <SelectContent>
                  {emotions.map((emotion) => (
                    <SelectItem key={emotion.value} value={emotion.value}>
                      {emotion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Write about your feelings..."
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="min-h-[100px]"
              />

              <Button 
                className="w-full"
                onClick={handleSaveEntry}
                disabled={!selectedEmotion || !journalEntry}
              >
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {showSuggestions && selectedEmotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Self-Care Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selfCareSuggestions[selectedEmotion as keyof typeof selfCareSuggestions].map(
                    (suggestion, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-primary">•</span>
                        {suggestion}
                      </motion.li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-8"
          >
            <h2 className="text-2xl font-bold">Your Mental Health Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emotional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getEmotionData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }: { name: string; percent: number }) => 
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getEmotionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Journal Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getTimeSeriesData()}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="entries"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8">Your Journal Entries</h2>
            <div className="space-y-4">
              {entries.slice().reverse().map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          {emotions.find(e => e.value === entry.emotion)?.label}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{entry.entry}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}