import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, User as UserIcon, FileText, User } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/lib/utils";

// ... existing code ...
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
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-10">
      <div className="flex justify-between items-center px-2 py-1.5 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center relative transition-all duration-200 group", // Added group class
              item.isDominant ? "flex-1" : "flex-[0.8]",
              isActive(item.path) && !item.isDominant && "text-quest-primary"
            )}
          >
            {/* Modified rendering for dominant item */}
            {item.isDominant ? (
              <div className="flex flex-col items-center -mt-6"> {/* Lifted container using negative margin */}
                <div className={cn(
                  "w-14 h-14 rounded-full bg-gradient-to-b from-quest-primary to-quest-purple shadow-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-100", // Added group-hover
                  isActive(item.path) ? "scale-100" : "scale-95"
                )}>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-quest-primary"> {/* Added text-quest-primary for icon color */}
                    {item.icon}
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-medium mt-1", // Adjusted margin-top
                  isActive(item.path) ? "text-quest-primary" : "text-muted-foreground group-hover:text-foreground" // Adjusted text color based on active state and hover
                )}>
                  {item.label}
                </span>
              </div>
            ) : (
              // Existing rendering for non-dominant items
              <div className={cn(
                "flex flex-col items-center gap-1 py-1.5",
                isActive(item.path) && "text-quest-primary"
              )}>
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;