import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Users, 
  BarChart3, 
  Calendar, 
  FileText, 
  Download,
  Building2,
  BookOpen,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaFilePdf } from 'react-icons/fa';
import { useUserAuth } from '../../context/useUserAuth';
import userr from "../../../src/img/userr.png";

// Sidebar Component
interface OrganizationSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (path: string, tabName: string) => void;
}

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  handleNavigation 
}) => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Building2, label: 'Schools', path: '/org-schools' },
    { icon: Users, label: 'Students', path: '/student-page' },
    { icon: FaChalkboardTeacher, label: 'Teachers', path: '/teacher-page' },
    { icon: BookOpen, label: 'Courses & Timetable', path: '/course-timetable' },
    // { icon: CalendarDays, label: 'Exams & Grades', path: '/exams-grades' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/organ-settings' }
  ];

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Mobile Close Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <nav className="p-3 sm:p-4 relative z-50 bg-white h-full flex flex-col">
        <div className="flex-1">
          {/* Dashboard Button */}
          <button 
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
              activeTab === 'Dashboard' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
            }`}
            onClick={() => handleNavigation('/org-dash', 'Dashboard')}
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </button>
          
          {/* Menu Items */}
          {menuItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={idx} 
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout Button pinned to sidebar bottom */}
        <div className="mt-4 mb-2">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 text-base bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

// Main ReportPage Component
export default function ReportPage() {
      // Report types for tab selector
      const reportTypes = [
        { value: 'OVERALL', label: 'Overall' },
        { value: 'GRADES', label: 'Grades' },
        { value: 'ATTENDANCE', label: 'Attendance' },
      ];
    // School filter state
    const [selectedSchoolId, setSelectedSchoolId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportType, setReportType] = useState<'OVERALL' | 'GRADES' | 'ATTENDANCE'>('OVERALL');
  // Removed unused state: startDate, endDate, selectedSchool
  // Removed unused selectedRegion state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Reports');
  // Removed unused searchQuery state
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userAuth = useUserAuth();
  const user = userAuth.user;

  // Types for API data
  interface CourseSummary {
    courseId: string;
    courseName: string;
    teacherName: string | null;
    studentCount: number;
    averageGrade: number;
    attendanceRate: number;
    atRiskCount: number;
  }
  interface StudentSummary {
    studentId: string;
    studentName: string;
    averageAttendance?: number;
    averageGrade?: number;
  }
  interface RiskDistribution {
    lowRiskCount: number;
    lowRiskPercentage: number;
    mediumRiskCount: number;
    mediumRiskPercentage: number;
    highRiskCount: number;
    highRiskPercentage: number;
    criticalRiskCount: number;
    criticalRiskPercentage: number;
    trend: string;
  }
  interface Performer {
    studentId: string;
    studentName: string;
    averageGrade: number;
    percentileRank: number;
  }
  interface AtRiskStudent {
    studentId: string;
    studentName: string;
    riskLevel: string;
    dropoutProbability: number;
    averageGrade: number;
    attendanceRate: number;
    behaviorIncidents: number;
    primaryConcern: string;
  }
  interface SchoolReport {
    schoolId: string;
    schoolName: string;
    totalStudents: number;
    totalCourses: number;
    totalTeachers: number;
    totalBehaviorIncidents: number;
    averageGrade: number;
    highestGrade: number;
    lowestGrade: number;
    averageAttendance: number;
    highestAttendance: number;
    lowestAttendance: number;
    riskDistribution: RiskDistribution;
    averageDropoutProbability: number;
    topPerformers: Performer[];
    bottomPerformers: Performer[];
    atRiskStudents: AtRiskStudent[];
    courseSummaries: CourseSummary[];
    studentSummaries: StudentSummary[];
  }
  interface ReportData {
    reportType?: string;
    totalSchools: number;
    totalStudents: number;
    averageAttendance: number;
    averageGrade: number;
    totalAtRiskStudents: number;
    schoolReports: SchoolReport[];
  }

  // Fetch report data from API
  const fetchReport = async (type = reportType) => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ;
      let url = `${baseUrl}/api/reports/government`;
      if (type !== 'OVERALL') {
        url += `?type=${type}`;
      }
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setReportData(data.data);
      } else {
        setError(data.message || 'Failed to fetch report');
      }
    } catch {
      setError('Failed to fetch report');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, [reportType]);

  // Handle navigation to different tabs
  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Removed unused handleLogout

  // Function to handle View Profile click - navigates to ReportsView
  const handleViewProfile = (schoolId: string) => {
    navigate('/report-view', { state: { schoolId } });
  };

  // Removed unused getRiskLevelColor

  // Removed unused handleClearFilters


  // School filter dropdown logic
  const allSchools = reportData?.schoolReports || [];
  const filteredSchools = allSchools
    .filter((school) => selectedSchoolId === 'ALL' || school.schoolId === selectedSchoolId)
    .filter((school) => searchQuery === '' || school.schoolName.toLowerCase().includes(searchQuery.toLowerCase()));

  // Aggregate metrics for all schools
  // Removed unused aggregate function

  // PDF Export (professional format like Reports.tsx)
  const handleExportPDF = () => {
    if (!reportData) {
      console.error('No report data available');
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 0;

    // ============ PROFESSIONAL HEADER (Report Card Style) ============
    yPos = 15;

    // Organization Name and Logo Area (Left side)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const orgName = user?.name || 'Education Organization';
    doc.text(orgName, 14, yPos);
    yPos += 5;

    // Report title under organization name
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const reportTitle = reportType === 'OVERALL' ? 'Organization Comprehensive Report'
                      : reportType === 'ATTENDANCE' ? 'Organization Attendance Analysis Report'
                      : 'Organization Academic Performance Report';
    doc.text(reportTitle, 14, yPos);
    yPos += 4;

    // Period info
    doc.setFontSize(8);
    doc.text('Period: Current Academic Year', 14, yPos);
    yPos += 4;

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Page 1 of 1`, 14, yPos);

    // Right side information box
    yPos = 15;
    const infoBoxX = pageWidth - 80;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Create bordered boxes for info
    const boxWidth = 65;
    const boxHeight = 4;

    // Administrator
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
    doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
    doc.text('Administrator:', infoBoxX + 1, yPos);
    doc.text(user?.name || 'Organization Admin', infoBoxX + 26, yPos);
    yPos += 4;

    // Date
    doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
    doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
    doc.text('Generated:', infoBoxX + 1, yPos);
    doc.text(currentDate, infoBoxX + 26, yPos);
    yPos += 4;

    // Report Type
    doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
    doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
    doc.text('Report Type:', infoBoxX + 1, yPos);
    const reportTypeText = reportType.charAt(0).toUpperCase() + reportType.slice(1);
    doc.text(reportTypeText, infoBoxX + 26, yPos);
    yPos += 4;

    // Filter (if applicable)
    if (selectedSchoolId !== 'ALL') {
      const selectedSchool = allSchools.find(school => school.schoolId === selectedSchoolId);
      doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
      doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
      doc.text('School Filter:', infoBoxX + 1, yPos);
      doc.text(selectedSchool?.schoolName.substring(0, 25) || 'N/A', infoBoxX + 26, yPos);
      yPos += 4;
    }

    // Horizontal line separator
    yPos = 42;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(14, yPos, pageWidth - 14, yPos);

    yPos = 50;

    // ============ ORGANIZATION OVERVIEW SECTION ============
    doc.setFillColor(230, 230, 230);
    doc.rect(14, yPos, pageWidth - 28, 7, 'F');
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(14, yPos, pageWidth - 28, 7, 'S');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('[O1] ORGANIZATION OVERVIEW', 16, yPos + 5);
    yPos += 7;

    // Organization statistics grid
    const overviewData = [
      ['Total Schools', reportData.totalSchools.toString()],
      ['Total Students', reportData.totalStudents.toString()],
    ];

    // Add report-specific metrics
    if (reportType === 'ATTENDANCE') {
      overviewData.push(['Average Attendance', `${reportData.averageAttendance?.toFixed(1) || 'N/A'}%`]);
    } else if (reportType === 'GRADES') {
      overviewData.push(['Average Grade', `${reportData.averageGrade?.toFixed(2) || 'N/A'}/20`]);
    }

    overviewData.push(
      ['Schools with At-Risk', filteredSchools.filter(school => (school.atRiskStudents?.length || 0) > 0).length.toString()],
      ['Total At-Risk Students', reportData.totalAtRiskStudents?.toString() || '0']
    );

    doc.setFontSize(8);
    let currentY = yPos;

    overviewData.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 14 + (col * (pageWidth - 28) / 2);
      const y = currentY + (row * 12);

      // Draw cell borders
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);
      doc.rect(x, y, (pageWidth - 28) / 2, 12);

      // Label (bold)
      doc.setFont('helvetica', 'bold');
      doc.text(item[0], x + 2, y + 4);

      // Value
      doc.setFont('helvetica', 'normal');
      doc.text(item[1], x + 2, y + 9);
    });

    yPos = currentY + (Math.ceil(overviewData.length / 2) * 12) + 8;

    // ============ SCHOOL PERFORMANCE SUMMARY ============
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFillColor(230, 230, 230);
    doc.rect(14, yPos, pageWidth - 28, 7, 'F');
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(14, yPos, pageWidth - 28, 7, 'S');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('[O2] SCHOOL PERFORMANCE SUMMARY', 16, yPos + 5);
    yPos += 7;

    // School performance table
    let schoolTableHead = ['School Name', 'Students', 'Courses', 'Teachers'];
    let schoolTableBody = filteredSchools.map((school) => {
      let row = [
        school.schoolName || 'N/A',
        school.totalStudents?.toString() || '0',
        school.totalCourses?.toString() || '0',
        school.totalTeachers?.toString() || '0',
      ];
      if (reportType === 'GRADES') {
          schoolTableHead = ['School Name', 'Students', 'Courses', 'Teachers', 'Avg Grade'];
          row.push(`${school.averageGrade?.toFixed(2) || 'N/A'}`);
      } else if (reportType === 'ATTENDANCE') {
          schoolTableHead = ['School Name', 'Students', 'Courses', 'Teachers', 'Avg Attendance'];
          row.push(`${school.averageAttendance?.toFixed(1) || 0}%`);
      } else {
          schoolTableHead = ['School Name', 'Students', 'Courses', 'Teachers', 'Avg Grade', 'Avg Attendance', 'At-Risk Students'];
          row.push(`${school.averageGrade?.toFixed(2) || 'N/A'}`);
          row.push(`${school.averageAttendance?.toFixed(1) || 0}%`);
      }
        if (reportType === 'OVERALL') {
          row.push((school.atRiskStudents?.length || 0).toString());
        }
      return row;
    });

    autoTable(doc, {
      startY: yPos,
      head: [schoolTableHead],
      body: schoolTableBody,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        lineColor: [180, 180, 180],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'center',
      },
    });
    yPos = (doc as any).lastAutoTable.finalY + 8;

    // ============ DETAILED SCHOOL ANALYSIS (for filtered schools) ============
    filteredSchools.forEach((school, index) => {
      if (yPos > pageHeight - 80) {
        doc.addPage();
        yPos = 20;
      }

      // School Section Header
      doc.setFillColor(240, 240, 240);
      doc.rect(14, yPos, pageWidth - 28, 7, 'F');
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(14, yPos, pageWidth - 28, 7, 'S');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`[S${index + 1}] ${school.schoolName.toUpperCase()}`, 16, yPos + 5);
      yPos += 7;

      // School Info Grid
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);

      const infoHeight = 5;
      doc.rect(14, yPos, 30, infoHeight);
      doc.rect(44, yPos, pageWidth - 58, infoHeight);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Students:', 16, yPos + 3.5);
      doc.setFont('helvetica', 'normal');
      doc.text(school.totalStudents?.toString() || '0', 46, yPos + 3.5);
      yPos += infoHeight;

      doc.rect(14, yPos, 30, infoHeight);
      doc.rect(44, yPos, pageWidth - 58, infoHeight);
      doc.setFont('helvetica', 'bold');
      doc.text('Courses:', 16, yPos + 3.5);
      doc.setFont('helvetica', 'normal');
      doc.text(school.totalCourses?.toString() || '0', 46, yPos + 3.5);
      yPos += infoHeight;

      doc.rect(14, yPos, 30, infoHeight);
      doc.rect(44, yPos, pageWidth - 58, infoHeight);
      doc.setFont('helvetica', 'bold');
      doc.text('Teachers:', 16, yPos + 3.5);
      doc.setFont('helvetica', 'normal');
      doc.text(school.totalTeachers?.toString() || '0', 46, yPos + 3.5);
      yPos += infoHeight;

      // Performance Metrics
      if (reportType === 'OVERALL' || reportType === 'GRADES') {
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFont('helvetica', 'bold');
        doc.text('Avg Grade:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text(`${school.averageGrade?.toFixed(2) || 'N/A'}/20`, 46, yPos + 3.5);
        yPos += infoHeight;
      }

      if (reportType === 'OVERALL' || reportType === 'ATTENDANCE') {
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFont('helvetica', 'bold');
        doc.text('Avg Attendance:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text(`${school.averageAttendance?.toFixed(1) || 0}%`, 46, yPos + 3.5);
        yPos += infoHeight;
      }

      yPos += 5;

      // Risk Distribution (only for OVERALL)
      if (reportType === 'OVERALL' && school.riskDistribution) {
        if (yPos > pageHeight - 60) {
          doc.addPage();
          yPos = 20;
        }

        autoTable(doc, {
          startY: yPos,
          head: [['Risk Category', 'Count', 'Percentage', 'Status']],
          body: [
            ['Low Risk', (school.riskDistribution.lowRiskCount || 0).toString(), `${school.riskDistribution.lowRiskPercentage?.toFixed(2) || 0}%`, 'Optimal'],
            ['Medium Risk', (school.riskDistribution.mediumRiskCount || 0).toString(), `${school.riskDistribution.mediumRiskPercentage?.toFixed(2) || 0}%`, 'Monitor'],
            ['High Risk', (school.riskDistribution.highRiskCount || 0).toString(), `${school.riskDistribution.highRiskPercentage?.toFixed(2) || 0}%`, 'Intervention Required'],
            ['Critical Risk', (school.riskDistribution.criticalRiskCount || 0).toString(), `${school.riskDistribution.criticalRiskPercentage?.toFixed(2) || 0}%`, 'Urgent Action'],
          ],
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 3,
            lineColor: [180, 180, 180],
            lineWidth: 0.3,
          },
          headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center',
          },
          columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 30, halign: 'center' },
            2: { cellWidth: 30, halign: 'center' },
            3: { cellWidth: 'auto' },
          },
        });
        yPos = (doc as any).lastAutoTable.finalY + 8;
      }

      // Course Summaries
      if (school.courseSummaries && school.courseSummaries.length > 0) {
        if (yPos > pageHeight - 70) {
          doc.addPage();
          yPos = 20;
        }

        // Dynamically build columns based on report type
        let courseHead = ['Course Name'];
        let courseBody = school.courseSummaries.map((course: any) => {
          let row = [course.courseName || 'N/A'];
          if (reportType !== 'ATTENDANCE') {
            courseHead.push('Teacher');
            row.push(course.teacherName || 'N/A');
          }
          courseHead.push('Enrolled');
          row.push((course.studentCount || 0).toString());
          if (reportType !== 'ATTENDANCE') {
            courseHead.push('Avg Grade');
            row.push(`${course.averageGrade?.toFixed(2) || 'N/A'}`);
          }
          if (reportType !== 'GRADES') {
            courseHead.push('Attendance');
            row.push(`${course.attendanceRate?.toFixed(1) || 0}%`);
          }
          courseHead.push('At Risk');
          row.push((course.atRiskCount || 0).toString());
          return row;
        });

        // Remove duplicate headers
        courseHead = [...new Set(courseHead)];
        autoTable(doc, {
          startY: yPos,
          head: [courseHead],
          body: courseBody,
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 2,
            lineColor: [180, 180, 180],
            lineWidth: 0.3,
          },
          headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 8,
          },
        });
        yPos = (doc as any).lastAutoTable.finalY + 8;
      }

      // Student Summaries (for ATTENDANCE and GRADES reports)
      if ((reportType === 'ATTENDANCE' || reportType === 'GRADES') && school.studentSummaries && school.studentSummaries.length > 0) {
        if (yPos > pageHeight - 70) {
          doc.addPage();
          yPos = 20;
        }

        const studentHead = [['Student Name', reportType === 'ATTENDANCE' ? 'Average Attendance (%)' : 'Average Grade']];
        const studentBody = school.studentSummaries.map((student: StudentSummary) => [
          student.studentName || 'N/A',
          reportType === 'ATTENDANCE' ? `${student.averageAttendance?.toFixed(1) || 0}%` : `${student.averageGrade?.toFixed(2) || 'N/A'}`,
        ]);

        autoTable(doc, {
          startY: yPos,
          head: studentHead,
          body: studentBody,
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 2,
            lineColor: [180, 180, 180],
            lineWidth: 0.3,
          },
          headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 8,
          },
          columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 40, halign: 'center' },
          },
        });
        yPos = (doc as any).lastAutoTable.finalY + 8;
      }
    });

    // Footer on last page
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('This report is confidential and intended for authorized organization administration.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // Save the PDF
    const fileName = `organization_${reportType.toLowerCase()}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and Organization Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.name || 'Education Organization'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            {/* Top menu bar removed as requested */}
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Organization Admin'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Report Type Tabs (HOD-style) */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setReportType('OVERALL')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'OVERALL'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overall Report</span>
              </button>
              <button
                onClick={() => setReportType('ATTENDANCE')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'ATTENDANCE'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Attendance Report</span>
              </button>
              <button
                onClick={() => setReportType('GRADES')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'GRADES'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Grades Report</span>
              </button>
              <div className="flex-1 flex justify-end">
                <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Report Parameters - Made responsive */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6 sm:mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Parameters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by School name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* New School Filter Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by School</label>
              <select
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="ALL">All Schools</option>
                {allSchools.length > 0 ? (
                  allSchools.map((school) => (
                    <option key={school.schoolId} value={school.schoolId}>
                      {school.schoolName}
                    </option>
                  ))
                ) : (
                  <option disabled>No schools available</option>
                )}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Per-School Report UI */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8 p-4 sm:p-6">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading report data...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : reportData && (
              <>
                {/* Metrics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-600">Total Schools</p>
                    <p className="text-xl font-bold mt-1 text-gray-900">{reportData.totalSchools}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-600">Total Students</p>
                    <p className="text-xl font-bold mt-1 text-gray-900">{reportData.totalStudents}</p>
                  </div>
                  {/* Show Average Attendance only for OVERALL and ATTENDANCE */}
                  {(reportType === 'OVERALL' || reportType === 'ATTENDANCE') && (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs font-medium text-gray-600">Average Attendance</p>
                      <p className="text-xl font-bold mt-1 text-gray-900">{reportData.averageAttendance?.toFixed(1)}%</p>
                    </div>
                  )}
                  {/* Show Average Grade only for OVERALL and GRADES */}
                  {(reportType === 'OVERALL' || reportType === 'GRADES') && (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs font-medium text-gray-600">Average Grade</p>
                      <p className="text-xl font-bold mt-1 text-gray-900">{reportData.averageGrade?.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                {/* Per-School Sections */}
                {filteredSchools.map((school: SchoolReport) => (
                  <div key={school.schoolId} className="mb-12 border rounded-lg p-4 sm:p-6 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h2 className="text-lg font-bold text-blue-700 mb-1">{school.schoolName}</h2>
                        <div className="text-xs text-gray-600">Students: {school.totalStudents} | Courses: {school.totalCourses} | Teachers: {school.totalTeachers}</div>
                      </div>
                    </div>

                    {/* School Metrics - dynamic by reportType */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {reportType !== 'ATTENDANCE' && (
                        <div className="p-3 rounded-lg bg-white border">
                          <p className="text-xs font-medium text-gray-600">Avg Grade</p>
                          <p className="text-xl font-bold mt-1 text-gray-900">{school.averageGrade?.toFixed(2)}</p>
                          {typeof school.lowestGrade === 'number' && typeof school.highestGrade === 'number' && (
                            <p className="text-xs text-gray-500">Range: {school.lowestGrade} - {school.highestGrade}</p>
                          )}
                        </div>
                      )}
                      {reportType !== 'GRADES' && (
                        <div className="p-3 rounded-lg bg-white border">
                          <p className="text-xs font-medium text-gray-600">Avg Attendance</p>
                          <p className="text-xl font-bold mt-1 text-gray-900">{school.averageAttendance?.toFixed(1)}%</p>
                          {typeof school.lowestAttendance === 'number' && typeof school.highestAttendance === 'number' && (
                            <p className="text-xs text-gray-500">Range: {school.lowestAttendance}% - {school.highestAttendance}%</p>
                          )}
                        </div>
                      )}
                      {reportType === 'OVERALL' && (
                        <>
                          <div className="p-3 rounded-lg bg-white border">
                            <p className="text-xs font-medium text-gray-600">Dropout Probability</p>
                            <p className="text-xl font-bold mt-1 text-gray-900">{(school.averageDropoutProbability * 100).toFixed(1)}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white border">
                            <p className="text-xs font-medium text-gray-600">Risk Trend</p>
                            <p className={`text-xl font-bold mt-1 ${
                              school.riskDistribution?.trend === 'CONCERNING' ? 'text-orange-600' :
                              school.riskDistribution?.trend === 'CRITICAL' ? 'text-red-600' : 'text-green-600'
                            }`}>{school.riskDistribution?.trend}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Risk Distribution - only for OVERALL */}
                    {reportType === 'OVERALL' && school.riskDistribution && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">Risk Distribution</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Risk Level</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Count</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Low Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.lowRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.lowRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Medium Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.mediumRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.mediumRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">High Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.highRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.highRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Critical Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.criticalRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.criticalRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Top & Bottom Performers - only for GRADES and OVERALL */}
                    {(reportType === 'GRADES' || reportType === 'OVERALL') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Top Performers */}
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Top Performers</h3>
                          {school.topPerformers?.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                    <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                    {reportType === 'OVERALL' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentile</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {school.topPerformers.map((student) => (
                                    <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                      <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                      <td className="py-2 px-3 text-center text-sm">
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                          {student.averageGrade.toFixed(2)}{reportType === 'OVERALL' ? '/20' : ''}
                                        </span>
                                      </td>
                                      {reportType === 'OVERALL' && <td className="py-2 px-3 text-center text-sm">{student.percentileRank?.toFixed(0)}%</td>}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-center py-4 text-gray-500">No top performers data available</p>
                          )}
                        </div>
                        {/* Bottom Performers */}
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Bottom Performers</h3>
                          {school.bottomPerformers?.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                    <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                    {reportType === 'OVERALL' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentile</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {school.bottomPerformers.map((student) => (
                                    <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                      <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                      <td className="py-2 px-3 text-center text-sm">
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                          {student.averageGrade.toFixed(2)}{reportType === 'OVERALL' ? '/20' : ''}
                                        </span>
                                      </td>
                                      {reportType === 'OVERALL' && <td className="py-2 px-3 text-center text-sm">{student.percentileRank?.toFixed(0)}%</td>}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-center py-4 text-gray-500">No bottom performers data available</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* At-Risk Students - only for OVERALL */}
                    {reportType === 'OVERALL' && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">At-Risk Students</h3>
                        {school.atRiskStudents?.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Risk Level</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Dropout Probability</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Attendance</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Behavior Incidents</th>
                                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Primary Concern</th>
                                </tr>
                              </thead>
                              <tbody>
                                {school.atRiskStudents.map((student) => (
                                  <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                    <td className="py-2 px-3 text-center">
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        student.riskLevel === 'CRITICAL'
                                          ? 'bg-red-100 text-red-800'
                                          : student.riskLevel === 'HIGH'
                                          ? 'bg-orange-100 text-orange-800'
                                          : student.riskLevel === 'MEDIUM'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-green-100 text-green-800'
                                      }`}>
                                        {student.riskLevel}
                                      </span>
                                    </td>
                                    <td className={`py-2 px-3 text-center text-sm font-semibold ${
                                      student.dropoutProbability >= 0.7
                                        ? 'text-red-600'
                                        : student.dropoutProbability >= 0.5
                                        ? 'text-orange-600'
                                        : 'text-yellow-600'
                                    }`}>
                                      {(student.dropoutProbability * 100).toFixed(1)}%
                                    </td>
                                    <td className="py-2 px-3 text-center text-sm">{student.averageGrade.toFixed(2)}</td>
                                    <td className="py-2 px-3 text-center text-sm">{student.attendanceRate.toFixed(1)}%</td>
                                    <td className="py-2 px-3 text-center text-sm">{student.behaviorIncidents}</td>
                                    <td className="py-2 px-3 text-sm">{student.primaryConcern}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-sm text-center py-4 text-gray-500">No at-risk students identified</p>
                        )}
                      </div>
                    )}

                    {/* Course Summaries - dynamic by reportType */}
                    <div>
                      <h3 className="text-base font-semibold mb-3 text-gray-900">Course Summaries</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Course Name</th>
                              {reportType !== 'ATTENDANCE' && <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Teacher</th>}
                              <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Students</th>
                              {reportType !== 'ATTENDANCE' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>}
                              {reportType !== 'GRADES' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Attendance</th>}
                              <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">At Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {school.courseSummaries.map((course) => (
                              <tr key={course.courseId} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-3 text-sm font-medium text-gray-900">{course.courseName}</td>
                                {reportType !== 'ATTENDANCE' && <td className="py-2 px-3 text-sm text-gray-600">{course.teacherName || 'N/A'}</td>}
                                <td className="py-2 px-3 text-center text-sm">{course.studentCount}</td>
                                {reportType !== 'ATTENDANCE' && <td className="py-2 px-3 text-center text-sm">{typeof course.averageGrade === 'number' ? course.averageGrade.toFixed(2) : '-'}</td>}
                                {reportType !== 'GRADES' && <td className="py-2 px-3 text-center text-sm">{typeof course.attendanceRate === 'number' ? course.attendanceRate.toFixed(1) + '%' : '-'}</td>}
                                <td className="py-2 px-3 text-center">{course.atRiskCount > 0 ? (
                                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">{course.atRiskCount}</span>
                                ) : (
                                  <span className="text-sm text-gray-400">0</span>
                                )}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Student Summaries - for ATTENDANCE and GRADES reports */}
                    {(reportType === 'ATTENDANCE' || reportType === 'GRADES') && school.studentSummaries && school.studentSummaries.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">
                          {reportType === 'ATTENDANCE' ? 'Student Attendance Summary' : 'Student Grades Summary'}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[400px]">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">
                                  {reportType === 'ATTENDANCE' ? 'Average Attendance (%)' : 'Average Grade'}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {school.studentSummaries.map((student) => (
                                <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                  <td className="py-2 px-3 text-center text-sm">
                                    {reportType === 'ATTENDANCE' ? (
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        (student.averageAttendance || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                        (student.averageAttendance || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {student.averageAttendance?.toFixed(1) || 0}%
                                      </span>
                                    ) : (
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        (student.averageGrade || 0) >= 15 ? 'bg-green-100 text-green-800' :
                                        (student.averageGrade || 0) >= 10 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {student.averageGrade?.toFixed(2) || 'N/A'}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Student Summaries - for GRADES and ATTENDANCE (removed, property does not exist) */}
                  </div>
                ))}
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}