
import React from "react";
import { Medal, Trophy, Award } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";

// Sample leaderboard data - in a real app this would come from a database
const sampleUsers = [
  { id: 1, name: "Alex Kim", avatar: "🦁", xp: 5240, quizzes: 32, streak: 14 },
  { id: 2, name: "Jamie Smith", avatar: "🐯", xp: 4980, quizzes: 28, streak: 21 },
  { id: 3, name: "Taylor Wong", avatar: "🐼", xp: 4750, quizzes: 30, streak: 12 },
  { id: 4, name: "Jordan Lee", avatar: "🦊", xp: 4500, quizzes: 25, streak: 18 },
  { id: 5, name: "Casey Garcia", avatar: "🐺", xp: 4320, quizzes: 24, streak: 9 },
  { id: 6, name: "Riley Patel", avatar: "🦅", xp: 4120, quizzes: 23, streak: 16 },
  { id: 7, name: "Quinn Johnson", avatar: "🐬", xp: 3950, quizzes: 22, streak: 7 },
  { id: 8, name: "Morgan Brown", avatar: "🦉", xp: 3800, quizzes: 20, streak: 10 },
  { id: 9, name: "Sam Davis", avatar: "🐢", xp: 3650, quizzes: 19, streak: 8 },
  { id: 10, name: "Jordan Wilson", avatar: "🐘", xp: 3500, quizzes: 18, streak: 5 },
];

type LeaderboardCategory = "xp" | "quizzes" | "streak";

const LeaderboardsPage: React.FC = () => {
  const { level, xp } = useProgress();
  const [category, setCategory] = React.useState<LeaderboardCategory>("xp");
  
  // Sort users based on the selected category
  const sortedUsers = React.useMemo(() => {
    return [...sampleUsers].sort((a, b) => b[category] - a[category]);
  }, [category]);

  // Find current user's rank (in a real app, this would come from the backend)
  const userRank = 4; // Example rank
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-quest-primary to-quest-purple p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Leaderboards</h1>
        <p className="opacity-90">See how you rank against other learners</p>
      </div>
      
      {/* User Rank Card */}
      <div className="px-4 relative -mt-6 mb-6">
        <Card className="p-4 shadow-sm bg-white">
          <div className="flex items-center">
            <div className="bg-quest-primary/10 rounded-full p-2 mr-3">
              <Trophy className="text-quest-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Rank</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-1">#{userRank}</span>
                <span className="text-sm text-muted-foreground">of {sampleUsers.length}</span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-muted-foreground">Your XP</p>
              <p className="text-xl font-bold">{xp} XP</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="xp" onValueChange={(value) => setCategory(value as LeaderboardCategory)}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="xp" className="flex-1">XP</TabsTrigger>
            <TabsTrigger value="quizzes" className="flex-1">Quizzes</TabsTrigger>
            <TabsTrigger value="streak" className="flex-1">Streak</TabsTrigger>
          </TabsList>
          
          <TabsContent value="xp" className="mt-0">
            <LeaderboardTable users={sortedUsers} category="xp" />
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-0">
            <LeaderboardTable users={sortedUsers} category="quizzes" />
          </TabsContent>
          
          <TabsContent value="streak" className="mt-0">
            <LeaderboardTable users={sortedUsers} category="streak" />
          </TabsContent>
        </Tabs>
      </div>
      
      <NavBar />
    </div>
  );
};

interface LeaderboardTableProps {
  users: typeof sampleUsers;
  category: LeaderboardCategory;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, category }) => {
  // Determine which icon to show based on category
  const getCategoryIcon = () => {
    switch (category) {
      case "xp": return <Award className="h-4 w-4 text-quest-primary" />;
      case "quizzes": return <Trophy className="h-4 w-4 text-quest-orange" />;
      case "streak": return <Medal className="h-4 w-4 text-quest-blue" />;
    }
  };
  
  // Format the value based on category
  const formatValue = (value: number) => {
    switch (category) {
      case "xp": return `${value} XP`;
      case "quizzes": return `${value} completed`;
      case "streak": return `${value} days`;
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">Rank</TableHead>
            <TableHead>Learner</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                {getCategoryIcon()}
                <span>{category === "xp" ? "Experience" : (category === "quizzes" ? "Quizzes" : "Streak")}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            // Apply special styling for top 3 ranks
            const isTopThree = index < 3;
            const rankColors = [
              "text-yellow-500", // Gold for 1st
              "text-gray-400",   // Silver for 2nd
              "text-amber-600",  // Bronze for 3rd
            ];
            
            return (
              <TableRow key={user.id}>
                <TableCell className="text-center font-bold">
                  <span className={isTopThree ? rankColors[index] : ""}>
                    #{index + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 text-lg">
                      {user.avatar}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatValue(user[category])}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardsPage;
