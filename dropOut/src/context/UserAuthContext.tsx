import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface Course {
  courseName: string;
  courseId: string;
}

interface DecodedToken {
  role: string;
  schoolId: string;
  name: string;
  schoolName: string;
  userId: string;
  email: string;
  courses?: Course[]; // Teacher-specific: array of courses they teach
  studentId?: string; // Student-specific: student ID
  parentId?: string; // Parent-specific: parent ID
  studentIds?: string[]; // Parent-specific: array of student IDs
  iat: number;
  exp: number;
}

interface UserAuthContextType {
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  // Helper properties for easier access
  isTeacher: boolean;
  isPrincipal: boolean;
  isStudent: boolean;
  isParent: boolean;
  teacherCourses: Course[];
  parentId?: string;
  studentIds?: string[];
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<DecodedToken | null>(
    token ? jwtDecode<DecodedToken>(token) : null
  );

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode<DecodedToken>(newToken);
    // Ensure parentId and studentIds are set if present
    setUser({
      ...decoded,
      parentId: decoded.parentId,
      studentIds: decoded.studentIds,
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Helper values for easier access
  const isTeacher = user?.role === 'TEACHER';
  const isPrincipal = user?.role === 'PRINCIPAL'; 
  const isStudent = user?.role === 'STUDENT';
  const isParent = user?.role === 'PARENT';
  const teacherCourses = user?.courses || [];
  const parentId = user?.parentId;
  const studentIds = user?.studentIds || [];

  return (
    <UserAuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      logout,
      isTeacher,
      isPrincipal,
      isStudent,
      isParent,
      teacherCourses,
      parentId,
      studentIds
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext };
