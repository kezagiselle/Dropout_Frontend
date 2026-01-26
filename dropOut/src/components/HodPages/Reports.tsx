import { useState, useEffect } from "react";
import { FaDownload, FaUsers, FaExclamationTriangle, FaChartLine, FaChevronDown, FaGraduationCap, FaCalendarCheck } from "react-icons/fa";
import { useTheme } from '../Hod';
import Report from '../Forms/Report';
import { useUserAuth } from '../../context/useUserAuth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ReportType = 'overall' | 'attendance' | 'grades';

interface CourseReport {
  courseId: string;
  courseName: string;
  teacherName: string;
  studentCount: number;
  reportData: any;
}

interface OverallReportData {
  schoolId: string;
  schoolName: string;
  totalStudents: number;
  totalCourses: number;
  totalTeachers: number;
  averageGrade: number;
  averageAttendance: number;
  riskDistribution: any;
  atRiskStudents: any[];
  courseSummaries: CourseReport[];
}

interface CourseBasedReportData {
  schoolId: string;
  schoolName: string;
  reportType: string;
  totalCourses: number;
  totalStudents: number;
  courseReports: CourseReport[];
}

const Reports = () => {
  const { theme } = useTheme();
  const { token, user } = useUserAuth();
  
  // Report Type State
  const [reportType, setReportType] = useState<ReportType>('overall');
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  // Filter States
  const [timePeriod, setTimePeriod] = useState("Last 30 Days");
  
  // UI States
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState<OverallReportData | CourseBasedReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dynamic courses list from API response
  const courses = [
    { id: 'all', name: 'All Courses' },
    ...(reportData && 'courseReports' in reportData 
      ? reportData.courseReports.map(course => ({
          id: course.courseId,
          name: course.courseName
        }))
      : reportData && 'courseSummaries' in reportData
      ? reportData.courseSummaries.map(course => ({
          id: course.courseId,
          name: course.courseName
        }))
      : [])
  ];

  // Fetch report data when reportType changes
  useEffect(() => {
    fetchReportData();
  }, [reportType]);

  const fetchReportData = async () => {
    if (!token || !user?.schoolId) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = 'http://localhost:8080/api/reports/principal';
      let url = `${baseUrl}/${user.schoolId}`;
      
      if (reportType === 'attendance') {
        url += '?type=ATTENDANCE';
      } else if (reportType === 'grades') {
        url += '?type=GRADES';
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch report: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setReportData(result.data);
        setSelectedCourse('all'); // Reset course filter when report type changes
      } else {
        setError(result.message || 'Failed to fetch report');
      }
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if course filter should be shown
  const showCourseFilter = reportType === 'attendance' || reportType === 'grades';

  // Get filtered report data
  const getFilteredData = () => {
    if (!reportData) return null;
    
    // If 'all' is selected or it's an overall report, return full data
    if (selectedCourse === 'all' || reportType === 'overall') {
      return reportData;
    }

    // Filter by selected course for attendance/grades reports
    if ('courseReports' in reportData) {
      const filteredCourse = reportData.courseReports.find(
        course => course.courseId === selectedCourse
      );
      
      if (filteredCourse) {
        return {
          ...reportData,
          courseReports: [filteredCourse],
          totalStudents: filteredCourse.studentCount
        };
      }
    }

    return reportData;
  };

  // Get display metrics based on report type and filtered data
  const getDisplayMetrics = () => {
    const filteredData = getFilteredData();
    
    if (!filteredData) {
      return {
        totalStudents: 0,
        riskMetric: 0,
        averageMetric: '0',
        totalCourses: 0
      };
    }

    if (reportType === 'overall' && 'totalStudents' in filteredData) {
      return {
        totalStudents: filteredData.totalStudents,
        riskMetric: filteredData.atRiskStudents?.length || 0,
        averageMetric: `${filteredData.averageAttendance?.toFixed(1) || 0}%`,
        totalCourses: filteredData.totalCourses
      };
    }

    if (reportType === 'attendance' && 'courseReports' in filteredData) {
      const totalStudents = selectedCourse === 'all'
        ? filteredData.totalStudents
        : filteredData.courseReports[0]?.studentCount || 0;
      
      let avgAttendance = 0;
      let lowAttendanceCount = 0;
      
      if (selectedCourse === 'all') {
        const attendanceRates = filteredData.courseReports.flatMap(course => 
          course.reportData?.studentAttendance?.map((s: any) => s.attendanceRate) || []
        );
        avgAttendance = attendanceRates.length > 0
          ? attendanceRates.reduce((a: number, b: number) => a + b, 0) / attendanceRates.length
          : 0;
        
        lowAttendanceCount = attendanceRates.filter((rate: number) => rate < 75).length;
      } else {
        const courseData = filteredData.courseReports[0];
        const attendanceRates = courseData?.reportData?.studentAttendance?.map((s: any) => s.attendanceRate) || [];
        avgAttendance = attendanceRates.length > 0
          ? attendanceRates.reduce((a: number, b: number) => a + b, 0) / attendanceRates.length
          : 0;
        
        lowAttendanceCount = attendanceRates.filter((rate: number) => rate < 75).length;
      }

      return {
        totalStudents,
        riskMetric: lowAttendanceCount,
        averageMetric: `${avgAttendance.toFixed(1)}%`,
        totalCourses: filteredData.courseReports.length
      };
    }

    if (reportType === 'grades' && 'courseReports' in filteredData) {
      const totalStudents = selectedCourse === 'all'
        ? filteredData.totalStudents
        : filteredData.courseReports[0]?.studentCount || 0;
      
      let avgGrade = 0;
      let failingCount = 0;
      
      if (selectedCourse === 'all') {
        const allGrades = filteredData.courseReports.flatMap(course =>
          course.reportData?.studentGrades?.map((s: any) => s.overallAverage) || []
        );
        avgGrade = allGrades.length > 0
          ? allGrades.reduce((a: number, b: number) => a + b, 0) / allGrades.length
          : 0;
        
        failingCount = allGrades.filter((grade: number) => grade < 10).length;
      } else {
        const courseData = filteredData.courseReports[0];
        const grades = courseData?.reportData?.studentGrades?.map((s: any) => s.overallAverage) || [];
        avgGrade = grades.length > 0
          ? grades.reduce((a: number, b: number) => a + b, 0) / grades.length
          : 0;
        
        failingCount = grades.filter((grade: number) => grade < 10).length;
      }

      return {
        totalStudents,
        riskMetric: failingCount,
        averageMetric: `${avgGrade.toFixed(2)}/20`,
        totalCourses: filteredData.courseReports.length
      };
    }

    return {
      totalStudents: 0,
      riskMetric: 0,
      averageMetric: '0',
      totalCourses: 0
    };
  };

  const displayMetrics = getDisplayMetrics();

  // Handle download report
  const handleDownloadReport = () => {
    if (!reportData) {
      console.error('No report data available');
      return;
    }

    const filteredData = getFilteredData();
    if (!filteredData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 0;

    // ============ PROFESSIONAL HEADER (Report Card Style) ============
    yPos = 15;
    
    // School Name and Logo Area (Left side)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const schoolName = 'schoolName' in filteredData ? filteredData.schoolName : 'Educational Institution';
    doc.text(schoolName, 14, yPos);
    yPos += 5;
    
    // Report title under school name
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const reportTitle = reportType === 'overall' ? 'Comprehensive School Report' 
                      : reportType === 'attendance' ? 'Attendance Analysis Report' 
                      : 'Academic Performance Report';
    doc.text(reportTitle, 14, yPos);
    yPos += 4;
    
    // Period info
    doc.setFontSize(8);
    doc.text(`Period: ${timePeriod}`, 14, yPos);
    yPos += 4;
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Page 1 of 1`, 14, yPos);
    
    // (Logo placeholder removed as per request)
    
    // Right side information box
    yPos = 15;
    const infoBoxX = pageWidth - 80;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    // Create bordered boxes for info
    const boxWidth = 65;
    const boxHeight = 4;
    
    // Principal
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
    doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
    doc.text('Principal:', infoBoxX + 1, yPos);
    doc.text(user?.name || 'Administration', infoBoxX + 26, yPos);
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
    
    // Course (if applicable)
    if (selectedCourse !== 'all' && reportType !== 'overall') {
      doc.rect(infoBoxX, yPos - 3, 25, boxHeight);
      doc.rect(infoBoxX + 25, yPos - 3, boxWidth - 25, boxHeight);
      doc.text('Course:', infoBoxX + 1, yPos);
      const courseName = courses.find(c => c.id === selectedCourse)?.name || selectedCourse;
      doc.text(courseName.substring(0, 25), infoBoxX + 26, yPos);
      yPos += 4;
    }
    
    // Horizontal line separator
    yPos = 42;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(14, yPos, pageWidth - 14, yPos);
    
    yPos = 50;

    // Generate PDF based on report type
    if (reportType === 'overall' && 'totalStudents' in filteredData) {
      // ============ OVERALL REPORT PDF (Report Card Style) ============
      
      // SECTION HEADER: School Overview
      doc.setFillColor(230, 230, 230);
      doc.rect(14, yPos, pageWidth - 28, 7, 'F');
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(14, yPos, pageWidth - 28, 7, 'S');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('[S1] SCHOOL OVERVIEW', 16, yPos + 5);
      yPos += 7;

      // Grid-based statistics table
      const colWidth = (pageWidth - 28) / 4;
      const rowHeight = 12;
      
      const overviewData = [
        ['Total Students', filteredData.totalStudents.toString()],
        ['Total Courses', filteredData.totalCourses.toString()],
        ['Total Teachers', filteredData.totalTeachers.toString()],
        ['Behavior Incidents', filteredData.totalBehaviorIncidents?.toString() || '0'],
        ['Average Grade', `${filteredData.averageGrade?.toFixed(2) || 'N/A'}/20`],
        ['Grade Range', `${filteredData.lowestGrade || 'N/A'} - ${filteredData.highestGrade || 'N/A'}`],
        ['Average Attendance', `${filteredData.averageAttendance?.toFixed(1) || 'N/A'}%`],
        ['Attendance Range', `${filteredData.lowestAttendance || 'N/A'}% - ${filteredData.highestAttendance || 'N/A'}%`],
      ];

      doc.setFontSize(8);
      let currentY = yPos;
      
      overviewData.forEach((item, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = 14 + (col * (pageWidth - 28) / 2);
        const y = currentY + (row * rowHeight);
        
        // Draw cell borders
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        doc.rect(x, y, (pageWidth - 28) / 2, rowHeight);
        
        // Label (bold)
        doc.setFont('helvetica', 'bold');
        doc.text(item[0], x + 2, y + 4);
        
        // Value
        doc.setFont('helvetica', 'normal');
        doc.text(item[1], x + 2, y + 9);
      });
      
      yPos = currentY + (Math.ceil(overviewData.length / 2) * rowHeight) + 8;

      // SECTION HEADER: Risk Distribution
      if (filteredData.riskDistribution) {
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
        doc.text('[S2] STUDENT RISK DISTRIBUTION', 16, yPos + 5);
        yPos += 7;

        // Grid table for risk distribution
        autoTable(doc, {
          startY: yPos,
          head: [['Risk Category', 'Count', 'Percentage', 'Status']],
          body: [
            ['Low Risk', (filteredData.riskDistribution.lowRiskCount || 0).toString(), `${filteredData.riskDistribution.lowRiskPercentage?.toFixed(2) || 0}%`, 'Optimal'],
            ['Medium Risk', (filteredData.riskDistribution.mediumRiskCount || 0).toString(), `${filteredData.riskDistribution.mediumRiskPercentage?.toFixed(2) || 0}%`, 'Monitor'],
            ['High Risk', (filteredData.riskDistribution.highRiskCount || 0).toString(), `${filteredData.riskDistribution.highRiskPercentage?.toFixed(2) || 0}%`, 'Intervention Required'],
            ['Critical Risk', (filteredData.riskDistribution.criticalRiskCount || 0).toString(), `${filteredData.riskDistribution.criticalRiskPercentage?.toFixed(2) || 0}%`, 'Urgent Action'],
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

      // SECTION HEADER: Academic Performance
      if (filteredData.topPerformers?.length > 0 || filteredData.bottomPerformers?.length > 0) {
        if (yPos > pageHeight - 80) {
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
        doc.text('[S3] ACADEMIC PERFORMANCE ANALYSIS', 16, yPos + 5);
        yPos += 7;

        // Top Performers Subsection
        if (filteredData.topPerformers?.length > 0) {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.text('[S3.1] Top Performing Students', 16, yPos + 4);
          yPos += 7;

          autoTable(doc, {
            startY: yPos,
            head: [['Rank', 'Student Name', 'Average Grade (/20)', 'Percentile']],
            body: filteredData.topPerformers.map((student: any, index: number) => [
              `#${index + 1}`,
              student.studentName || 'N/A',
              student.averageGrade?.toFixed(2) || 'N/A',
              `${student.percentileRank?.toFixed(0) || 'N/A'}%`,
            ]),
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
              0: { cellWidth: 15, halign: 'center' },
              1: { cellWidth: 70 },
              2: { cellWidth: 35, halign: 'center' },
              3: { cellWidth: 25, halign: 'center' },
            },
          });
          yPos = (doc as any).lastAutoTable.finalY + 6;
        }

        // Bottom Performers Subsection
        if (filteredData.bottomPerformers?.length > 0) {
          if (yPos > pageHeight - 50) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.text('[S3.2] Students Requiring Academic Support', 16, yPos + 4);
          yPos += 7;

          autoTable(doc, {
            startY: yPos,
            head: [['Rank', 'Student Name', 'Average Grade (/20)', 'Percentile']],
            body: filteredData.bottomPerformers.map((student: any, index: number) => [
              `#${index + 1}`,
              student.studentName || 'N/A',
              student.averageGrade?.toFixed(2) || 'N/A',
              `${student.percentileRank?.toFixed(0) || 'N/A'}%`,
            ]),
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
              0: { cellWidth: 15, halign: 'center' },
              1: { cellWidth: 70 },
              2: { cellWidth: 35, halign: 'center' },
              3: { cellWidth: 25, halign: 'center' },
            },
          });
          yPos = (doc as any).lastAutoTable.finalY + 8;
        }
      }

      // SECTION HEADER: At-Risk Students
      if (filteredData.atRiskStudents && filteredData.atRiskStudents.length > 0) {
        if (yPos > pageHeight - 70) {
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
        doc.text('[S4] AT-RISK STUDENTS - INTERVENTION REQUIRED', 16, yPos + 5);
        yPos += 7;

        autoTable(doc, {
          startY: yPos,
          head: [['Student Name', 'Risk', 'Dropout %', 'Grade', 'Attend.', 'Behavior', 'Primary Concern']],
          body: filteredData.atRiskStudents.map((student: any) => [
            student.studentName || 'N/A',
            student.riskLevel || 'N/A',
            `${(student.dropoutProbability * 100).toFixed(1)}%`,
            `${student.averageGrade?.toFixed(2) || 'N/A'}`,
            `${student.attendanceRate?.toFixed(1) || 0}%`,
            (student.behaviorIncidents || 0).toString(),
            student.primaryConcern || 'N/A',
          ]),
          theme: 'grid',
          styles: { 
            fontSize: 7,
            cellPadding: 2,
            lineColor: [180, 180, 180],
            lineWidth: 0.3,
          },
          headStyles: { 
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            fontSize: 7,
            halign: 'center',
          },
          columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 15, halign: 'center' },
            2: { cellWidth: 18, halign: 'center' },
            3: { cellWidth: 15, halign: 'center' },
            4: { cellWidth: 17, halign: 'center' },
            5: { cellWidth: 17, halign: 'center' },
            6: { cellWidth: 'auto' },
          },
        });
        yPos = (doc as any).lastAutoTable.finalY + 8;
      }

      // SECTION HEADER: Course Summaries
      if (filteredData.courseSummaries && filteredData.courseSummaries.length > 0) {
        if (yPos > pageHeight - 70) {
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
        doc.text('[S5] COURSE PERFORMANCE OVERVIEW', 16, yPos + 5);
        yPos += 7;

        autoTable(doc, {
          startY: yPos,
          head: [['Course Name', 'Teacher', 'Enrolled', 'Avg Grade', 'Attendance', 'At Risk']],
          body: filteredData.courseSummaries.map((course: any) => [
            course.courseName || 'N/A',
            course.teacherName || 'N/A',
            (course.studentCount || 0).toString(),
            `${course.averageGrade?.toFixed(2) || 'N/A'}`,
            `${course.attendanceRate?.toFixed(1) || 0}%`,
            (course.atRiskCount || 0).toString(),
          ]),
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
            0: { cellWidth: 55 },
            1: { cellWidth: 40 },
            2: { cellWidth: 20, halign: 'center' },
            3: { cellWidth: 20, halign: 'center' },
            4: { cellWidth: 22, halign: 'center' },
            5: { cellWidth: 18, halign: 'center' },
          },
        });
        yPos = (doc as any).lastAutoTable.finalY + 8;
      }
      
      // Footer on last page
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('This report is confidential and intended for authorized school administration.', pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);

    } else if (reportType === 'attendance' && 'courseReports' in filteredData) {
      // ============ ATTENDANCE REPORT PDF (Report Card Style) ============
      
      filteredData.courseReports.forEach((course: any, index: number) => {
        // No forced page break; let content flow naturally

        // Course Section Header
        doc.setFillColor(230, 230, 230);
        doc.rect(14, yPos, pageWidth - 28, 7, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(14, yPos, pageWidth - 28, 7, 'S');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`[ATT${index + 1}] ${course.courseName.toUpperCase()}`, 16, yPos + 5);
        yPos += 7;

        // Course Info Grid
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        
        const infoHeight = 5;
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Instructor:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text(course.teacherName || 'N/A', 46, yPos + 3.5);
        yPos += infoHeight;
        
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFont('helvetica', 'bold');
        doc.text('Enrolled:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text(`${course.studentCount} students`, 46, yPos + 3.5);
        yPos += infoHeight + 5;

        if (course.reportData?.studentAttendance && course.reportData.studentAttendance.length > 0) {
          // Map attendanceByDate to attendanceDetails array for each student
          const attendanceData = course.reportData.studentAttendance.map((student: any) => {
            let attendanceDetails = student.attendanceDetails;
            if (!attendanceDetails && student.attendanceByDate && course.reportData.dates) {
              attendanceDetails = course.reportData.dates.map((date: string) => {
                let status = student.attendanceByDate[date];
                // Convert 1/0 to PRESENT/ABSENT if needed
                if (status === 1) status = 'PRESENT';
                if (status === 0) status = 'ABSENT';
                return {
                  date,
                  status: status || 'ABSENT',
                };
              });
            }
            return {
              ...student,
              attendanceDetails,
            };
          });

          // Use the dates from the course reportData
          const dates = course.reportData.dates?.slice(0, 10) || [];

          const tableData = attendanceData.map((student: any) => {
            const row = [student.studentName];
            (student.attendanceDetails || []).slice(0, 10).forEach((detail: any) => {
              // Show 1 for present, 0 for absent
              if (detail.status === 'PRESENT' || detail.status === 1) {
                row.push('1');
              } else {
                row.push('0');
              }
            });
            row.push(`${student.attendanceRate?.toFixed(1) || 0}%`);
            return row;
          });

          autoTable(doc, {
            startY: yPos,
            head: [['Student Name', ...dates.map((d: string) => {
              const dt = new Date(d);
              // Format as MM/DD/YYYY
              return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
            }), 'Rate']],
            body: tableData,
            theme: 'grid',
            styles: { 
              fontSize: 7, 
              cellPadding: 1.5,
              halign: 'center',
              lineColor: [180, 180, 180],
              lineWidth: 0.3,
            },
            headStyles: { 
              fillColor: [200, 200, 200],
              textColor: [0, 0, 0],
              fontStyle: 'bold',
              fontSize: 7,
              halign: 'center',
            },
            columnStyles: {
              0: { cellWidth: 45, halign: 'left', fontStyle: 'bold' },
              [dates.length + 1]: { fontStyle: 'bold', fillColor: [240, 240, 240] },
            },
          });
          yPos = (doc as any).lastAutoTable.finalY + 4;
          
          // Legend
          doc.setFontSize(6);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          doc.text('P = Present  |  A = Absent', 16, yPos);
          doc.setTextColor(0, 0, 0);
        } else {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(150, 150, 150);
          doc.text('No attendance data available', 16, yPos);
          doc.setTextColor(0, 0, 0);
        }
      });
      
      // Footer
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('This report is confidential and intended for authorized school administration.', pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);

    } else if (reportType === 'grades' && 'courseReports' in filteredData) {
      // ============ GRADES REPORT PDF (Report Card Style) ============
      
      filteredData.courseReports.forEach((course: any, index: number) => {
        if (index > 0) {
          doc.addPage();
          yPos = 50;
        }

        // Course Section Header
        doc.setFillColor(230, 230, 230);
        doc.rect(14, yPos, pageWidth - 28, 7, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(14, yPos, pageWidth - 28, 7, 'S');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`[GRD${index + 1}] ${(course.courseName || 'N/A').toUpperCase()}`, 16, yPos + 5);
        yPos += 7;

        // Course Info Grid
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        
        const infoHeight = 5;
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Instructor:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text(course.teacherName ? String(course.teacherName) : 'N/A', 46, yPos + 3.5);
        yPos += infoHeight;
        
        doc.rect(14, yPos, 30, infoHeight);
        doc.rect(44, yPos, pageWidth - 58, infoHeight);
        doc.setFont('helvetica', 'bold');
        doc.text('Enrolled:', 16, yPos + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.text((course.studentCount !== undefined && course.studentCount !== null) ? `${course.studentCount} students` : 'N/A', 46, yPos + 3.5);
        yPos += infoHeight + 5;

        if (course.reportData?.studentGrades && course.reportData.studentGrades.length > 0) {
          autoTable(doc, {
            startY: yPos,
            head: [['Student Name', 'Assignment', 'Quiz', 'Groupwork', 'Final', 'Overall']],
            body: course.reportData.studentGrades.map((student: any) => [
              student.studentName || 'N/A',
              student.assignmentAverage !== undefined ? student.assignmentAverage.toFixed(2) : 'N/A',
              student.quizAverage !== undefined ? student.quizAverage.toFixed(2) : 'N/A',
              student.groupworkAverage !== undefined ? student.groupworkAverage.toFixed(2) : 'N/A',
              student.finalExam !== undefined ? student.finalExam.toFixed(2) : 'N/A',
              student.overallAverage !== undefined ? student.overallAverage.toFixed(2) : 'N/A',
            ]),
            theme: 'grid',
            styles: { 
              fontSize: 8,
              cellPadding: 2,
              halign: 'center',
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
              0: { cellWidth: 50, halign: 'left', fontStyle: 'bold' },
              5: { fontStyle: 'bold', fillColor: [240, 240, 240] },
            },
          });
          yPos = (doc as any).lastAutoTable.finalY + 4;
          
          // Note
          doc.setFontSize(6);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          doc.text('Grading Scale: All grades out of 20 points', 16, yPos);
          doc.setTextColor(0, 0, 0);
        } else {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(150, 150, 150);
          doc.text('No grade data available', 16, yPos);
          doc.setTextColor(0, 0, 0);
        }
      });
      
      // Footer
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('This report is confidential and intended for authorized school administration.', pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }

    // Save the PDF
    const fileName = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  if (showReport) {
    return <Report onBack={() => setShowReport(false)} />;
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Reports Management
          </h1>
          <p className={`text-xs sm:text-sm md:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Generate and download comprehensive school reports
          </p>
        </div>
        
        <div className="flex flex-row items-center space-x-2 sm:space-x-3 mt-2 lg:mt-0">
          <button 
            onClick={handleDownloadReport}
            className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4 sm:space-y-6">
          {/* Report Type Tabs Skeleton */}
          <div className={`rounded-lg shadow-sm p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-lg w-32"></div>
              ))}
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className={`rounded-lg shadow-sm p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className={`rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="px-4 sm:px-6 py-4">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
            </div>
            <div className="p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded mb-3"></div>
              ))}
            </div>
          </div>
        </div>
      ) : error ? (
        <div className={`rounded-lg shadow-sm p-6 text-center ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <FaExclamationTriangle className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`} />
          <p className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Error Loading Report
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {error}
          </p>
          <button
            onClick={fetchReportData}
            className="mt-4 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
      {/* Report Type Tabs */}
      <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setReportType('overall')}
            className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
              reportType === 'overall'
                ? 'bg-black text-white shadow-md'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaChartLine className="w-4 h-4" />
            <span>Overall Report</span>
          </button>
          
          <button
            onClick={() => setReportType('attendance')}
            className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
              reportType === 'attendance'
                ? 'bg-black text-white shadow-md'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaCalendarCheck className="w-4 h-4" />
            <span>Attendance Report</span>
          </button>
          
          <button
            onClick={() => setReportType('grades')}
            className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
              reportType === 'grades'
                ? 'bg-black text-white shadow-md'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaGraduationCap className="w-4 h-4" />
            <span>Grades Report</span>
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-base sm:text-lg font-bold mb-4 transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Filters
        </h2>
        
        <div className={`grid grid-cols-1 gap-3 sm:gap-4 ${showCourseFilter ? 'xs:grid-cols-2 lg:grid-cols-3' : 'xs:grid-cols-2 lg:grid-cols-2'}`}>
          {/* Course Filter - Only show for attendance and grades */}
          {showCourseFilter && (
            <div>
              <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Select Course
              </label>
              <div className="relative">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={`w-full border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 hover:border-orange-200 appearance-none transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white hover:border-orange-400'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-orange-300'
                  }`}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
          )}

          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Time Period
            </label>
            <div className="relative">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className={`w-full border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 hover:border-orange-200 appearance-none transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white hover:border-orange-400'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-orange-300'
                }`}
              >
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
              <FaChevronDown className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Data Section */}
      <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {reportType === 'overall' ? 'Overall School Report' : reportType === 'attendance' ? 'Attendance Report' : 'Grades Report'}
            {showCourseFilter && selectedCourse !== 'all' && (
              <span className={`ml-2 text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                - {courses.find(c => c.id === selectedCourse)?.name}
              </span>
            )}
          </h2>
        </div>

        <div className="p-4 sm:p-6">
          {/* Attendance Report Table */}
          {reportType === 'attendance' && reportData && 'courseReports' in reportData && (
            <div className="space-y-6">
              {getFilteredData()?.courseReports.map((course: CourseReport) => (
                <div key={course.courseId}>
                  {selectedCourse === 'all' && (
                    <h3 className={`text-base font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {course.courseName} - {course.teacherName}
                    </h3>
                  )}
                  
                  {course.reportData?.studentAttendance?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Student Name
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Attendance Rate
                            </th>
                            {course.reportData.dates?.slice(0, 10).map((date: string) => (
                              <th key={date} className={`text-center py-2 px-2 text-xs font-semibold ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {course.reportData.studentAttendance.map((student: any) => (
                            <tr key={student.studentId} className={`border-b ${
                              theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                            }`}>
                              <td className={`py-2 px-3 text-sm font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {student.studentName}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                  student.attendanceRate >= 75
                                    ? 'bg-green-100 text-green-800'
                                    : student.attendanceRate >= 50
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {student.attendanceRate.toFixed(1)}%
                                </span>
                              </td>
                              {course.reportData.dates?.slice(0, 10).map((date: string) => {
                                const status = student.attendanceByDate[date];
                                return (
                                  <td key={date} className="py-2 px-2 text-center">
                                    {status === 'PRESENT' ? (
                                      <span className="text-green-600 font-bold">✓</span>
                                    ) : status === 'ABSENT' ? (
                                      <span className="text-red-600 font-bold">✗</span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className={`text-sm text-center py-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No attendance data available for this course
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Grades Report Table */}
          {reportType === 'grades' && reportData && 'courseReports' in reportData && (
            <div className="space-y-6">
              {getFilteredData()?.courseReports.map((course: CourseReport) => (
                <div key={course.courseId}>
                  {selectedCourse === 'all' && (
                    <h3 className={`text-base font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {course.courseName} - {course.teacherName}
                    </h3>
                  )}
                  
                  {course.reportData?.studentGrades?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[800px]">
                        <thead>
                          <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Student Name
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Assignment Avg
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Quiz Avg
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Groupwork Avg
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Final Exam
                            </th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Overall Avg
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.reportData.studentGrades.map((student: any) => (
                            <tr key={student.studentId} className={`border-b ${
                              theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                            }`}>
                              <td className={`py-2 px-3 text-sm font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {student.studentName}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.assignmentAverage.toFixed(2)}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.quizAverage.toFixed(2)}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.groupworkAverage.toFixed(2)}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.finalExam.toFixed(2)}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                  student.overallAverage >= 15
                                    ? 'bg-green-100 text-green-800'
                                    : student.overallAverage >= 10
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {student.overallAverage.toFixed(2)}/20
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className={`text-sm text-center py-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No grade data available for this course
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Overall Report */}
          {reportType === 'overall' && reportData && 'atRiskStudents' in reportData && (
            <div className="space-y-6">
              {/* School Overview Stats */}
              <div>
                <h3 className={`text-base font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  School Overview
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.totalStudents}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Courses</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.totalCourses}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Teachers</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.totalTeachers}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Behavior Incidents</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.totalBehaviorIncidents}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Grade</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.averageGrade?.toFixed(2)}/20</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Range: {reportData.lowestGrade} - {reportData.highestGrade}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Attendance</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reportData.averageAttendance?.toFixed(1)}%</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Range: {reportData.lowestAttendance}% - {reportData.highestAttendance}%</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Dropout Probability</p>
                    <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{(reportData.averageDropoutProbability * 100).toFixed(1)}%</p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Risk Trend</p>
                    <p className={`text-xl font-bold mt-1 ${
                      reportData.riskDistribution?.trend === 'CONCERNING' ? 'text-orange-600' :
                      reportData.riskDistribution?.trend === 'CRITICAL' ? 'text-red-600' : 'text-green-600'
                    }`}>{reportData.riskDistribution?.trend}</p>
                  </div>
                </div>
              </div>

              {/* Risk Distribution */}
              <div>
                <h3 className={`text-base font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Risk Distribution
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Risk Level</th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Count</th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                        <td className={`py-2 px-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Low Risk</span>
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.lowRiskCount || 0}
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.lowRiskPercentage?.toFixed(2) || 0}%
                        </td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                        <td className={`py-2 px-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Medium Risk</span>
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.mediumRiskCount || 0}
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.mediumRiskPercentage?.toFixed(2) || 0}%
                        </td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                        <td className={`py-2 px-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">High Risk</span>
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.highRiskCount || 0}
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.highRiskPercentage?.toFixed(2) || 0}%
                        </td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                        <td className={`py-2 px-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Critical Risk</span>
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.criticalRiskCount || 0}
                        </td>
                        <td className={`py-2 px-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reportData.riskDistribution?.criticalRiskPercentage?.toFixed(2) || 0}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top & Bottom Performers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Performers */}
                <div>
                  <h3 className={`text-base font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Top Performers
                  </h3>
                  
                  {reportData.topPerformers?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Student Name</th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Avg Grade</th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Percentile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.topPerformers.map((student: any) => (
                            <tr key={student.studentId} className={`border-b ${
                              theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                            }`}>
                              <td className={`py-2 px-3 text-sm font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {student.studentName}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                  {student.averageGrade.toFixed(2)}/20
                                </span>
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.percentileRank.toFixed(0)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className={`text-sm text-center py-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No top performers data available
                    </p>
                  )}
                </div>

                {/* Bottom Performers */}
                <div>
                  <h3 className={`text-base font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Bottom Performers
                  </h3>
                  
                  {reportData.bottomPerformers?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Student Name</th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Avg Grade</th>
                            <th className={`text-center py-2 px-3 text-xs font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>Percentile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.bottomPerformers.map((student: any) => (
                            <tr key={student.studentId} className={`border-b ${
                              theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                            }`}>
                              <td className={`py-2 px-3 text-sm font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {student.studentName}
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                  {student.averageGrade.toFixed(2)}/20
                                </span>
                              </td>
                              <td className={`py-2 px-3 text-center text-sm ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {student.percentileRank.toFixed(0)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className={`text-sm text-center py-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No bottom performers data available
                    </p>
                  )}
                </div>
              </div>

              {/* At-Risk Students Table */}
              <div>
                <h3 className={`text-base font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  At-Risk Students
                </h3>
                
                {reportData.atRiskStudents?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Student Name
                          </th>
                          <th className={`text-center py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Risk Level
                          </th>
                          <th className={`text-center py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Dropout Probability
                          </th>
                          <th className={`text-center py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Avg Grade
                          </th>
                          <th className={`text-center py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Attendance
                          </th>
                          <th className={`text-center py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Behavior Incidents
                          </th>
                          <th className={`text-left py-2 px-3 text-xs font-semibold ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Primary Concern
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.atRiskStudents.map((student: any) => (
                          <tr key={student.studentId} className={`border-b ${
                            theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                          }`}>
                            <td className={`py-2 px-3 text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {student.studentName}
                            </td>
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
                            <td className={`py-2 px-3 text-center text-sm ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {student.averageGrade.toFixed(2)}
                            </td>
                            <td className={`py-2 px-3 text-center text-sm ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {student.attendanceRate.toFixed(1)}%
                            </td>
                            <td className={`py-2 px-3 text-center text-sm ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {student.behaviorIncidents}
                            </td>
                            <td className={`py-2 px-3 text-sm ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {student.primaryConcern}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={`text-sm text-center py-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    No at-risk students identified
                  </p>
                )}
              </div>

              {/* Course Summaries Table */}
              <div>
                <h3 className={`text-base font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Course Summaries
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Course Name
                        </th>
                        <th className={`text-left py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Teacher
                        </th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Students
                        </th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Avg Grade
                        </th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Attendance
                        </th>
                        <th className={`text-center py-2 px-3 text-xs font-semibold ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          At Risk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.courseSummaries?.map((course: any) => (
                        <tr key={course.courseId} className={`border-b ${
                          theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                        }`}>
                          <td className={`py-2 px-3 text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {course.courseName}
                          </td>
                          <td className={`py-2 px-3 text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {course.teacherName || 'N/A'}
                          </td>
                          <td className={`py-2 px-3 text-center text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {course.studentCount}
                          </td>
                          <td className={`py-2 px-3 text-center text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {course.averageGrade.toFixed(2)}
                          </td>
                          <td className={`py-2 px-3 text-center text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {course.attendanceRate.toFixed(1)}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            {course.atRiskCount > 0 ? (
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                {course.atRiskCount}
                              </span>
                            ) : (
                              <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                0
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Reports;
