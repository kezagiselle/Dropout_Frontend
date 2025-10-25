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
  teacherCourses: Course[];
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
    setUser(jwtDecode<DecodedToken>(newToken));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Helper values for easier access
  const isTeacher = user?.role === 'TEACHER';
  const isPrincipal = user?.role === 'PRINCIPAL'; 
  const teacherCourses = user?.courses || [];

  return (
    <UserAuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      logout,
      isTeacher,
      isPrincipal,
      teacherCourses
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext };
