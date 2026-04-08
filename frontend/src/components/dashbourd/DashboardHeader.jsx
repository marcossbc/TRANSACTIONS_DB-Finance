import { ClipboardCheck } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { replace, useNavigate } from 'react-router-dom'
import useAuthStore from '@/lib/store/authStore'
import { toast } from 'sonner'

const DashboardHeader = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  console.log("USER FROM STORE:", user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      toast("Logging out...");
      clearAuth();
      
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="w-full px-4 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ClipboardCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            Transaction Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, <span className="font-medium text-foreground">
              {user?.name || "User"}
            </span>
          </span>

          <Button className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-red-600" variant={"outline "} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader
