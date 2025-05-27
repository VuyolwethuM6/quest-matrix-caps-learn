
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, GraduationCap, User, FileText } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { level, xp } = useProgress();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/dashboard", icon: <Home size={24} />, label: "Home" },
    { path: "/curriculum", icon: <BookOpen size={24} />, label: "Learn" },
    { path: "/tutor", icon: <GraduationCap size={24} />, label: "Tutor" },
    { path: "/exams", icon: <FileText size={24} />, label: "Exams" },
    { path: "/profile", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="flex justify-between items-center p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg",
              isActive(item.path)
                ? "text-quest-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
