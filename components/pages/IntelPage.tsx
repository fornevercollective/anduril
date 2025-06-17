import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Database, Search, FileText, Image, MapPin, Clock, User, Lock } from 'lucide-react';

interface IntelReport {
  id: string;
  title: string;
  type: 'HUMINT' | 'SIGINT' | 'GEOINT' | 'OSINT';
  classification: 'TOP SECRET' | 'SECRET' | 'CONFIDENTIAL' | 'UNCLASSIFIED';
  source: string;
  location: string;
  timestamp: string;
  summary: string;
  status: 'NEW' | 'REVIEWED' | 'VERIFIED' | 'ARCHIVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

const mockReports: IntelReport[] = [
  {
    id: 'INTEL_001',
    title: 'Suspicious Vessel Activity',
    type: 'GEOINT',
    classification: 'SECRET',
    source: 'Satellite Imagery',
    location: '25.7641°, -80.1443°',
    timestamp: '2024-12-16 12:34:56',
    summary: 'Unknown vessel displaying non-standard navigation patterns in restricted waters.',
    status: 'NEW',
    priority: 'HIGH'
  },
  {
    id: 'INTEL_002',
    title: 'Radio Communications Intercept',
    type: 'SIGINT',
    classification: 'TOP SECRET',
    source: 'Electronic Surveillance',
    location: '25.8120°, -80.2010°',
    timestamp: '2024-12-16 11:15:30',
    summary: 'Encrypted communications detected on unauthorized frequencies.',
    status: 'REVIEWED',
    priority: 'HIGH'
  },
  {
    id: 'INTEL_003',
    title: 'Port Activity Report',
    type: 'HUMINT',
    classification: 'CONFIDENTIAL',
    source: 'Field Agent Alpha',
    location: 'Miami Port Authority',
    timestamp: '2024-12-16 09:22:15',
    summary: 'Increased activity observed at dock 7, unusual cargo loading patterns.',
    status: 'VERIFIED',
    priority: 'MEDIUM'
  }
];

export function IntelPage() {
  const [reports] = useState<IntelReport[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<IntelReport | null>(reports[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-red-900 text-red-300 border-red-700';
      case 'SECRET': return 'bg-orange-900 text-orange-300 border-orange-700';
      case 'CONFIDENTIAL': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'UNCLASSIFIED': return 'bg-green-900 text-green-300 border-green-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-900 text-red-300 border-red-700';
      case 'MEDIUM': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'LOW': return 'bg-green-900 text-green-300 border-green-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'REVIEWED': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'VERIFIED': return 'bg-green-900 text-green-300 border-green-700';
      case 'ARCHIVED': return 'bg-gray-900 text-gray-400 border-gray-600';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="flex h-full bg-gray-950">
      {/* Intel Reports List */}
      <div className="w-96 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-200">INTELLIGENCE DATABASE</h2>
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              {reports.length} REPORTS
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-900 rounded p-2 text-center">
              <div className="text-sm font-semibold text-red-400">
                {reports.filter(r => r.priority === 'HIGH').length}
              </div>
              <div className="text-xs text-gray-500">HIGH</div>
            </div>
            <div className="bg-gray-900 rounded p-2 text-center">
              <div className="text-sm font-semibold text-blue-400">
                {reports.filter(r => r.status === 'NEW').length}
              </div>
              <div className="text-xs text-gray-500">NEW</div>
            </div>
            <div className="bg-gray-900 rounded p-2 text-center">
              <div className="text-sm font-semibold text-green-400">
                {reports.filter(r => r.status === 'VERIFIED').length}
              </div>
              <div className="text-xs text-gray-500">VERIFIED</div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-gray-300"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="humint">HUMINT</SelectItem>
                  <SelectItem value="sigint">SIGINT</SelectItem>
                  <SelectItem value="geoint">GEOINT</SelectItem>
                  <SelectItem value="osint">OSINT</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="flex-1 overflow-y-auto">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                selectedReport?.id === report.id ? 'bg-gray-800' : 'hover:bg-gray-900'
              }`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-200 text-sm">{report.title}</span>
                </div>
                <Badge className={getPriorityColor(report.priority)}>
                  {report.priority}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getClassificationColor(report.classification)}>
                    <Lock className="w-3 h-3 mr-1" />
                    {report.classification}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {report.type}
                  </Badge>
                </div>
                
                <div className="text-xs text-gray-400">
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="w-3 h-3" />
                    <span>{report.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(report.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Details */}
      <div className="flex-1 flex flex-col">
        {selectedReport ? (
          <>
            {/* Report Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-200 mb-1">{selectedReport.title}</h1>
                  <p className="text-gray-400">{selectedReport.id}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getClassificationColor(selectedReport.classification)}>
                    <Lock className="w-3 h-3 mr-1" />
                    {selectedReport.classification}
                  </Badge>
                  <Badge className={getPriorityColor(selectedReport.priority)}>
                    {selectedReport.priority} PRIORITY
                  </Badge>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Type</div>
                  <div className="text-gray-300">{selectedReport.type}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Source</div>
                  <div className="text-gray-300">{selectedReport.source}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Location</div>
                  <div className="text-gray-300">{selectedReport.location}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Status</div>
                  <Badge className={getStatusColor(selectedReport.status)}>
                    {selectedReport.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Summary */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-3">EXECUTIVE SUMMARY</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedReport.summary}</p>
                  </div>
                </Card>

                {/* Full Report */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-3">DETAILED REPORT</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">
                        Intelligence gathered through {selectedReport.type} sources indicates significant activity 
                        requiring immediate attention and further investigation.
                      </p>
                      
                      <h4 className="text-gray-200 font-medium mb-2">Key Findings:</h4>
                      <ul className="text-gray-300 space-y-1 mb-4 list-disc list-inside">
                        <li>Anomalous patterns detected in target area</li>
                        <li>Correlation with previous intelligence reports</li>
                        <li>Potential security implications identified</li>
                        <li>Recommended follow-up actions outlined</li>
                      </ul>
                      
                      <h4 className="text-gray-200 font-medium mb-2">Assessment:</h4>
                      <p className="text-gray-300 mb-4">
                        Based on available intelligence, the situation warrants continued monitoring 
                        and potential escalation to appropriate command authority.
                      </p>
                      
                      <h4 className="text-gray-200 font-medium mb-2">Recommendations:</h4>
                      <ul className="text-gray-300 space-y-1 list-disc list-inside">
                        <li>Increase surveillance in the specified area</li>
                        <li>Cross-reference with allied intelligence sources</li>
                        <li>Prepare contingency response protocols</li>
                        <li>Schedule regular briefings with command staff</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Attachments */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-3">ATTACHMENTS</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                        <Image className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">satellite_imagery_001.jpg</span>
                        <span className="text-xs text-gray-500 ml-auto">2.4 MB</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">technical_analysis.pdf</span>
                        <span className="text-xs text-gray-500 ml-auto">1.8 MB</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">coordinates.kml</span>
                        <span className="text-xs text-gray-500 ml-auto">15 KB</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <Button variant="secondary" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300">
                    MARK REVIEWED
                  </Button>
                  <Button variant="secondary" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300">
                    VERIFY INTEL
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
                    EXPORT REPORT
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
                    SHARE INTEL
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select an intelligence report to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}