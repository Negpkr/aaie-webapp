import { useState } from 'react';
import { Save, Key, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      submissionAlerts: true,
      weeklyReports: false,
      systemUpdates: true,
    },
    api: {
      openaiKey: '',
      claudeKey: '',
      maxTokens: '2000',
      temperature: '0.7',
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
      theme: 'system',
      defaultRubric: 'standard',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '60',
      dataRetention: '365',
    },
  });

  const handleSave = () => {
    // TODO: Implement settings save
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="llm">LLM Platform</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle>General Preferences</CardTitle>
              </div>
              <CardDescription>
                Configure your basic application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.preferences.language} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, preferences: { ...prev.preferences, language: value } }))
                  }>
                    <SelectTrigger className="academic-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.preferences.timezone} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, preferences: { ...prev.preferences, timezone: value } }))
                  }>
                    <SelectTrigger className="academic-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.preferences.theme} onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, preferences: { ...prev.preferences, theme: value } }))
                }>
                  <SelectTrigger className="academic-input w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <CardTitle>API Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure your AI model API keys and parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input
                    id="openai-key"
                    type="password"
                    placeholder="sk-..."
                    value={settings.api.openaiKey}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      api: { ...prev.api, openaiKey: e.target.value }
                    }))}
                    className="academic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claude-key">Claude API Key</Label>
                  <Input
                    id="claude-key"
                    type="password"
                    placeholder="sk-ant-..."
                    value={settings.api.claudeKey}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      api: { ...prev.api, claudeKey: e.target.value }
                    }))}
                    className="academic-input"
                  />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    value={settings.api.maxTokens}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      api: { ...prev.api, maxTokens: e.target.value }
                    }))}
                    className="academic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={settings.api.temperature}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      api: { ...prev.api, temperature: e.target.value }
                    }))}
                    className="academic-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Submission Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new submissions are uploaded
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.submissionAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, submissionAlerts: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, weeklyReports: checked }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactorAuth: checked }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    security: { ...prev.security, sessionTimeout: e.target.value }
                  }))}
                  className="academic-input"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="llm" className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>LLM Platform Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure endpoints for LLM Team integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Available Endpoints</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-mono text-primary">POST /llm/classify</div>
                      <p className="text-muted-foreground mt-1">
                        Decide Human / AI / Hybrid from prompt_text, student_submission, chat_log
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Returns: classification, confidence
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-mono text-primary">POST /llm/rubric-score</div>
                      <p className="text-muted-foreground mt-1">
                        Score Structure, Clarity, Relevance, Academic Writing using T2 rubric
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Returns: labels (Excellent/Good/Average/Bad)
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-mono text-primary">POST /llm/generate-feedback</div>
                      <p className="text-muted-foreground mt-1">
                        Produce student-facing, actionable feedback tied to the prompt
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Returns: llm_feedback
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> LLM Team endpoints will be integrated in a future update. 
                    This section provides a preview of the available functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="academic-button">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}