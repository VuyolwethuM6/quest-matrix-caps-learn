
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, User as UserIcon, FileText, User } from "lucide-react";
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
    { 
      path: "/tutor", 
      icon: <UserIcon size={28} />, 
      label: "Tutor",
      isDominant: true
    },
    { path: "/exams", icon: <FileText size={24} />, label: "Exams" },
    { path: "/profile", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="flex justify-between items-end p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-all",
              item.isDominant && "-mb-2 relative",
              isActive(item.path)
                ? item.isDominant 
                  ? "text-quest-primary" 
                  : "text-quest-primary"
                : item.isDominant
                  ? "text-quest-primary"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.isDominant ? (
              <div className={cn(
                "w-12 h-12 rounded-full bg-quest-primary/10 border-2 border-quest-primary/20 flex items-center justify-center mb-1",
                isActive(item.path) && "bg-quest-primary/20 border-quest-primary/30"
              )}>
                {item.icon}
              </div>
            ) : (
              item.icon
            )}
            <span className={cn(
              "text-xs mt-1",
              item.isDominant && "font-semibold text-xs"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
