import React, { useState } from 'react';
import { 
  Mail, 
  Inbox, 
  Send, 
  Trash2, 
  Star, 
  AlertCircle,
  Edit3,
  Search,
  Shield,
  Link,
  Paperclip,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Download
} from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  content: string;
  urls: string[];
  attachments: {
    name: string;
    type: string;
    size: string;
  }[];
}

function App() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showIsolatedView, setShowIsolatedView] = useState(false);
  const [isolatedContent, setIsolatedContent] = useState<{
    type: 'url' | 'attachment';
    content: string;
  } | null>(null);
  
  const demoEmails: Email[] = [
    {
      id: '1',
      from: 'security@company.com',
      subject: 'Important Security Update',
      preview: 'We have detected unusual activity...',
      date: '10:30 AM',
      read: false,
      starred: true,
      content: 'Please review the security report and attached documents carefully.',
      urls: ['https://security-report.example.com', 'https://update.example.com'],
      attachments: [
        { name: 'security-report.pdf', type: 'application/pdf', size: '2.4 MB' },
        { name: 'update-instructions.docx', type: 'document', size: '1.1 MB' }
      ]
    },
    {
      id: '2',
      from: 'team@project.com',
      subject: 'Project Timeline Update',
      preview: 'Here are the latest changes to our timeline...',
      date: '9:15 AM',
      read: true,
      starred: false,
      content: 'Please review the updated project timeline and resources.',
      urls: ['https://project-timeline.example.com'],
      attachments: [
        { name: 'timeline-v2.xlsx', type: 'spreadsheet', size: '856 KB' }
      ]
    }
  ];

  const handleIsolatedView = (type: 'url' | 'attachment', content: string) => {
    setIsolatedContent({ type, content });
    setShowIsolatedView(true);
  };

  const selectedEmailData = selectedEmail 
    ? demoEmails.find(email => email.id === selectedEmail)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-8">
          <Mail className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">SecureMail</h1>
        </div>
        
        <button className="w-full bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
          <Edit3 className="h-5 w-5" />
          Compose
        </button>

        <nav className="space-y-1">
          {[
            { icon: Inbox, label: 'Inbox', id: 'inbox' },
            { icon: Send, label: 'Sent', id: 'sent' },
            { icon: Star, label: 'Starred', id: 'starred' },
            { icon: Trash2, label: 'Trash', id: 'trash' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFolder(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                selectedFolder === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              Secure Connection
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div className={`${selectedEmail ? 'w-1/3' : 'w-full'} border-r border-gray-200 overflow-auto`}>
            <div className="p-4 space-y-2">
              {demoEmails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email.id)}
                  className={`p-4 bg-white rounded-lg border ${
                    !email.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  } hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {email.from}
                        </span>
                        {!email.read && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                            New
                          </span>
                        )}
                        {email.starred && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <h3 className="text-gray-800 font-medium">{email.subject}</h3>
                      <p className="text-gray-600 text-sm">{email.preview}</p>
                    </div>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Detail View */}
          {selectedEmailData && (
            <div className="flex-1 overflow-auto">
              {showIsolatedView ? (
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Isolated Content Viewer
                    </h2>
                    <button
                      onClick={() => setShowIsolatedView(false)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-600">
                          Content is being displayed in an isolated environment
                        </span>
                      </div>
                      {isolatedContent && (
                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {isolatedContent.type === 'url' ? 'URL Preview' : 'File Preview'}
                          </h3>
                          <div className="bg-gray-50 p-4 rounded">
                            <code className="text-sm text-gray-700">
                              {isolatedContent.content}
                            </code>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {selectedEmailData.subject}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{selectedEmailData.from}</span>
                      <span>•</span>
                      <span>{selectedEmailData.date}</span>
                    </div>
                  </div>

                  <div className="prose max-w-none mb-6">
                    <p>{selectedEmailData.content}</p>
                  </div>

                  {/* URLs Section */}
                  {selectedEmailData.urls.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        <Link className="h-5 w-5 inline-block mr-2" />
                        URLs
                      </h3>
                      <div className="space-y-2">
                        {selectedEmailData.urls.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                          >
                            <span className="text-gray-600">{url}</span>
                            <button
                              onClick={() => handleIsolatedView('url', url)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="text-sm">View Safely</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments Section */}
                  {selectedEmailData.attachments.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        <Paperclip className="h-5 w-5 inline-block mr-2" />
                        Attachments
                      </h3>
                      <div className="space-y-2">
                        {selectedEmailData.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {attachment.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {attachment.size}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleIsolatedView('attachment', attachment.name)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="text-sm">Preview Safely</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Security Footer */}
        <footer className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            Always verify sender addresses and never share sensitive information
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;