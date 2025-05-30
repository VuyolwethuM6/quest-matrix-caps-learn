import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import NavBar from '@/components/NavBar';
import { getDocuments, updateDocumentStatus } from '@/services/documentService';

interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'reviewed' | 'rejected';
  feedback?: string;
  uploadedAt: string;
  userName: string;
}

const DocumentReviewAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      toast.error('Failed to load documents');
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (documentId: string, status: 'reviewed' | 'rejected') => {
    try {
      await updateDocumentStatus(documentId, status, feedback);
      toast.success(`Document ${status === 'reviewed' ? 'approved' : 'rejected'}`);
      setSelectedDocument(null);
      setFeedback('');
      loadDocuments();
    } catch (error) {
      toast.error('Failed to update document status');
      console.error('Error updating document:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">Document Review</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Review and provide feedback on student documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid gap-4 sm:gap-6">
          {/* Document List */}
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Submitted Documents</h2>
              {loading ? (
                <div className="text-center py-4">Loading documents...</div>
              ) : documents.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No documents to review</div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedDocument?.id === doc.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedDocument(doc);
                        setFeedback(doc.feedback || '');
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm sm:text-base truncate">{doc.fileName}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span className="truncate">{doc.userName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatDate(doc.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {doc.status === 'pending' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {doc.status === 'reviewed' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Approved
                            </span>
                          )}
                          {doc.status === 'rejected' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Rejected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Review Panel */}
          {selectedDocument && (
            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold">Review Document</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {selectedDocument.fileName}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={selectedDocument.fileUrl}
                      className="w-full h-full"
                      title="Document Preview"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Feedback</label>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter your feedback for the student..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleReview(selectedDocument.id, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleReview(selectedDocument.id, 'reviewed')}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default DocumentReviewAdminPage; 