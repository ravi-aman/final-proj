// /app/layout.tsx
import React from "react";
import { SidebarDemo } from "@/components/sidebar"; // Ensure correct path for SidebarDemo
import { cn } from "@/lib/utils"; // Assuming `cn` is a utility for class names

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={cn("min-h-screen flex flex-col")}>
            {/* Sidebar */}
            <div className="flex">
                <SidebarDemo />
                {children}

                
            </div>
        </div>
    );
};

export default Layout;
