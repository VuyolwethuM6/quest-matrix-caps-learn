import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { 
  Plus, Edit, Trash2, Save, X, AlertTriangle, 
  ChevronDown, ChevronRight, FolderOpen, FileText,
  BookOpen, Layers
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'formula' | 'example' | 'video' | 'practice' | 'tip' | 'exam-tip';
  content: string | {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  subjectId: string;
  topicId: string;
  subtopicId: string;
  order: number;
}

interface ContentManagerProps {
  contentBlocks: ContentBlock[];
  subjects: any[];
  topics: any[];
  subtopics: any[];
  onAddContent: (content: any) => Promise<void>;
  onEditContent: (id: string, content: any) => Promise<void>;
  onDeleteContent: (id: string) => Promise<void>;
  onSubjectChange: (subjectId: string) => Promise<void>;
  onTopicChange: (topicId: string) => Promise<void>;
  onAddSubject: (subject: any) => Promise<void>;
  onAddTopic: (topic: any) => Promise<void>;
  onAddSubtopic: (subtopic: any) => Promise<void>;
}

export const ContentManager: React.FC<ContentManagerProps> = ({
  contentBlocks,
  subjects,
  topics,
  subtopics,
  onAddContent,
  onEditContent,
  onDeleteContent,
  onSubjectChange,
  onTopicChange,
  onAddSubject,
  onAddTopic,
  onAddSubtopic,
}) => {
  const { toast } = useToast();
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [isAddingSubtopic, setIsAddingSubtopic] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentBlock | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const [newTopic, setNewTopic] = useState({ name: '', description: '' });
  const [newSubtopic, setNewSubtopic] = useState({ name: '', description: '' });
  const [contentFormData, setContentFormData] = useState({
    type: 'text' as ContentBlock['type'],
    content: '',
    subjectId: '',
    topicId: '',
    subtopicId: '',
    order: 0
  });

  const toggleSubject = async (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
      await onSubjectChange(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const toggleTopic = async (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
      await onTopicChange(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const handleSubjectSelect = async (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedTopic('');
    setSelectedSubtopic('');
    setContentFormData(prev => ({
      ...prev,
      subjectId,
      topicId: '',
      subtopicId: ''
    }));
    await onSubjectChange(subjectId);
  };

  const handleTopicSelect = async (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic('');
    setContentFormData(prev => ({
      ...prev,
      topicId,
      subtopicId: ''
    }));
    await onTopicChange(topicId);
  };

  const handleSubtopicSelect = (subtopicId: string) => {
    setSelectedSubtopic(subtopicId);
    setContentFormData(prev => ({
      ...prev,
      subtopicId
    }));
  };

  const handleAddSubject = async () => {
    try {
      if (!newSubject.name.trim()) {
        toast({
          title: "Error",
          description: "Subject name is required.",
          variant: "destructive",
        });
        return;
      }

      await onAddSubject({
        name: newSubject.name,
        description: newSubject.description,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      setIsAddingSubject(false);
      setNewSubject({ name: '', description: '' });
      toast({
        title: "Success",
        description: "Subject added successfully.",
      });
    } catch (error) {
      console.error('Error adding subject:', error);
      toast({
        title: "Error",
        description: "Failed to add subject.",
        variant: "destructive",
      });
    }
  };

  const handleAddTopic = async () => {
    try {
      if (!newTopic.name.trim()) {
        toast({
          title: "Error",
          description: "Topic name is required.",
          variant: "destructive",
        });
        return;
      }

      if (!selectedSubject) {
        toast({
          title: "Error",
          description: "Please select a subject first.",
          variant: "destructive",
        });
        return;
      }

      await onAddTopic({
        name: newTopic.name,
        description: newTopic.description,
        subjectId: selectedSubject,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      setIsAddingTopic(false);
      setNewTopic({ name: '', description: '' });
      toast({
        title: "Success",
        description: "Topic added successfully.",
      });
    } catch (error) {
      console.error('Error adding topic:', error);
      toast({
        title: "Error",
        description: "Failed to add topic.",
        variant: "destructive",
      });
    }
  };

  const handleAddSubtopic = async () => {
    try {
      if (!newSubtopic.name.trim()) {
        toast({
          title: "Error",
          description: "Subtopic name is required.",
          variant: "destructive",
        });
        return;
      }

      if (!selectedTopic) {
        toast({
          title: "Error",
          description: "Please select a topic first.",
          variant: "destructive",
        });
        return;
      }

      await onAddSubtopic({
        name: newSubtopic.name,
        description: newSubtopic.description,
        topicId: selectedTopic,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      setIsAddingSubtopic(false);
      setNewSubtopic({ name: '', description: '' });
      toast({
        title: "Success",
        description: "Subtopic added successfully.",
      });
    } catch (error) {
      console.error('Error adding subtopic:', error);
      toast({
        title: "Error",
        description: "Failed to add subtopic.",
        variant: "destructive",
      });
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContent) {
        await onEditContent(editingContent.id, contentFormData);
        toast({
          title: "Success",
          description: "Content updated successfully.",
        });
      } else {
        await onAddContent(contentFormData);
        toast({
          title: "Success",
          description: "Content added successfully.",
        });
      }
      setIsAddingContent(false);
      setEditingContent(null);
      setContentFormData({
        type: 'text',
        content: '',
        subjectId: '',
        topicId: '',
        subtopicId: '',
        order: 0
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Sidebar - Structure Tree */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Content Structure</CardTitle>
              <CardDescription>Manage your learning content hierarchy</CardDescription>
            </div>
            <Button onClick={() => setIsAddingSubject(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div key={subject.id} className="space-y-1">
                  <div 
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer",
                      selectedSubject === subject.id && "bg-muted"
                    )}
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubject(subject.id);
                        }}
                      >
                        {expandedSubjects.has(subject.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <FolderOpen className="h-4 w-4" />
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAddingTopic(true);
                          setSelectedSubject(subject.id);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedSubjects.has(subject.id) && (
                    <div className="ml-6 space-y-1">
                      {topics
                        .filter(topic => topic.subjectId === subject.id)
                        .map((topic) => (
                          <div key={topic.id} className="space-y-1">
                            <div 
                              className={cn(
                                "flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer",
                                selectedTopic === topic.id && "bg-muted"
                              )}
                              onClick={() => handleTopicSelect(topic.id)}
                            >
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTopic(topic.id);
                                  }}
                                >
                                  {expandedTopics.has(topic.id) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                                <Layers className="h-4 w-4" />
                                <span className="font-medium">{topic.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAddingSubtopic(true);
                                    setSelectedTopic(topic.id);
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {expandedTopics.has(topic.id) && (
                              <div className="ml-6 space-y-1">
                                {subtopics
                                  .filter(subtopic => subtopic.topicId === topic.id)
                                  .map((subtopic) => (
                                    <div 
                                      key={subtopic.id}
                                      className={cn(
                                        "flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer",
                                        selectedSubtopic === subtopic.id && "bg-muted"
                                      )}
                                      onClick={() => handleSubtopicSelect(subtopic.id)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span className="font-medium">{subtopic.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setIsAddingContent(true);
                                            setSelectedSubtopic(subtopic.id);
                                          }}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Content Area */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {selectedSubtopic ? (
                  <div className="flex items-center gap-2">
                    <span>Content for:</span>
                    <Badge variant="secondary">
                      {subjects.find(s => s.id === selectedSubject)?.name}
                    </Badge>
                    <ChevronRight className="h-4 w-4" />
                    <Badge variant="secondary">
                      {topics.find(t => t.id === selectedTopic)?.name}
                    </Badge>
                    <ChevronRight className="h-4 w-4" />
                    <Badge variant="secondary">
                      {subtopics.find(s => s.id === selectedSubtopic)?.name}
                    </Badge>
                  </div>
                ) : (
                  "Select a subject, topic, and subtopic to view content"
                )}
              </CardTitle>
              <CardDescription>
                {selectedSubtopic ? (
                  "Manage content for the selected subtopic"
                ) : (
                  "Use the structure tree to navigate and select content"
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4">
              {contentBlocks
                .filter(block => 
                  (!selectedSubject || block.subjectId === selectedSubject) &&
                  (!selectedTopic || block.topicId === selectedTopic) &&
                  (!selectedSubtopic || block.subtopicId === selectedSubtopic)
                )
                .map((block) => (
                  <div 
                    key={block.id} 
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{block.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Order: {block.order}
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {typeof block.content === 'string' ? block.content : block.content.question}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingContent(block);
                          setContentFormData({
                            type: block.type,
                            content: block.content,
                            subjectId: block.subjectId,
                            topicId: block.topicId,
                            subtopicId: block.subtopicId,
                            order: block.order
                          });
                          setIsAddingContent(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDeleteContent(block.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Subject Dialog */}
      <Dialog open={isAddingSubject} onOpenChange={setIsAddingSubject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Create a new subject for your learning content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter subject name"
                value={newSubject.name}
                onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter subject description"
                value={newSubject.description}
                onChange={(e) => setNewSubject(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingSubject(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubject}>
                Add Subject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Topic Dialog */}
      <Dialog open={isAddingTopic} onOpenChange={setIsAddingTopic}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
            <DialogDescription>
              Create a new topic for {subjects.find(s => s.id === selectedSubject)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter topic name"
                value={newTopic.name}
                onChange={(e) => setNewTopic(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter topic description"
                value={newTopic.description}
                onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingTopic(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTopic}>
                Add Topic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Subtopic Dialog */}
      <Dialog open={isAddingSubtopic} onOpenChange={setIsAddingSubtopic}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subtopic</DialogTitle>
            <DialogDescription>
              Create a new subtopic for {topics.find(t => t.id === selectedTopic)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter subtopic name"
                value={newSubtopic.name}
                onChange={(e) => setNewSubtopic(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter subtopic description"
                value={newSubtopic.description}
                onChange={(e) => setNewSubtopic(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingSubtopic(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubtopic}>
                Add Subtopic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Content Dialog */}
      <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContent ? 'Edit Content' : 'Add New Content'}
            </DialogTitle>
            <DialogDescription>
              {selectedSubtopic && (
                <div className="flex items-center gap-2">
                  <span>Adding content to:</span>
                  <Badge variant="secondary">
                    {subjects.find(s => s.id === selectedSubject)?.name}
                  </Badge>
                  <ChevronRight className="h-4 w-4" />
                  <Badge variant="secondary">
                    {topics.find(t => t.id === selectedTopic)?.name}
                  </Badge>
                  <ChevronRight className="h-4 w-4" />
                  <Badge variant="secondary">
                    {subtopics.find(s => s.id === selectedSubtopic)?.name}
                  </Badge>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Content Type</Label>
                <Select
                  value={contentFormData.type}
                  onValueChange={(value: ContentBlock['type']) => 
                    setContentFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="formula">Formula</SelectItem>
                    <SelectItem value="example">Example</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="tip">Tip</SelectItem>
                    <SelectItem value="exam-tip">Exam Tip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  placeholder="Enter order number"
                  value={contentFormData.order}
                  onChange={(e) => setContentFormData({
                    ...contentFormData,
                    order: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={contentFormData.subjectId}
                  onValueChange={(value) => {
                    setContentFormData({ ...contentFormData, subjectId: value });
                    onSubjectChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem 
                        key={`subject-select-${subject.id}-${subject.name}`} 
                        value={subject.id}
                      >
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Topic</Label>
                <Select
                  value={contentFormData.topicId}
                  onValueChange={(value) => {
                    setContentFormData({ ...contentFormData, topicId: value });
                    onTopicChange(value);
                  }}
                  disabled={!contentFormData.subjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subtopic</Label>
                <Select
                  value={contentFormData.subtopicId}
                  onValueChange={(value) => 
                    setContentFormData({ ...contentFormData, subtopicId: value })
                  }
                  disabled={!contentFormData.topicId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subtopic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subtopics.map((subtopic) => (
                      <SelectItem key={subtopic.id} value={subtopic.id}>
                        {subtopic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {contentFormData.type === 'practice' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    placeholder="Enter question"
                    value={(contentFormData.content as any).question || ''}
                    onChange={(e) => setContentFormData(prev => ({
                      ...prev,
                      content: {
                        ...(prev.content as any),
                        question: e.target.value
                      }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Options</Label>
                  {(contentFormData.content as any).options?.map((option: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(contentFormData.content as any).options];
                          newOptions[index] = e.target.value;
                          setContentFormData(prev => ({
                            ...prev,
                            content: {
                              ...(prev.content as any),
                              options: newOptions
                            }
                          }));
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = [...(contentFormData.content as any).options];
                          newOptions.splice(index, 1);
                          setContentFormData(prev => ({
                            ...prev,
                            content: {
                              ...(prev.content as any),
                              options: newOptions
                            }
                          }));
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setContentFormData(prev => ({
                        ...prev,
                        content: {
                          ...(prev.content as any),
                          options: [...(prev.content as any).options || [], '']
                        }
                      }));
                    }}
                  >
                    Add Option
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <Select
                    value={(contentFormData.content as any).correctAnswer?.toString()}
                    onValueChange={(value) => setContentFormData(prev => ({
                      ...prev,
                      content: {
                        ...(prev.content as any),
                        correctAnswer: parseInt(value)
                      }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {(contentFormData.content as any).options?.map((option: string, index: number) => (
                        <SelectItem key={index} value={index.toString()}>
                          Option {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Explanation</Label>
                  <Textarea
                    placeholder="Enter explanation"
                    value={(contentFormData.content as any).explanation || ''}
                    onChange={(e) => setContentFormData(prev => ({
                      ...prev,
                      content: {
                        ...(prev.content as any),
                        explanation: e.target.value
                      }
                    }))}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  placeholder="Enter content"
                  value={typeof contentFormData.content === 'string' ? contentFormData.content : ''}
                  onChange={(e) => setContentFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                />
              </div>
            )}

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Content Formatting</AlertTitle>
              <AlertDescription>
                For LaTeX formulas, use double backslashes (\\). For example: \\[x^2 + y^2 = z^2\\]
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingContent(false);
                  setEditingContent(null);
                  setContentFormData({
                    type: 'text',
                    content: '',
                    subjectId: '',
                    topicId: '',
                    subtopicId: '',
                    order: 0
                  });
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingContent ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 