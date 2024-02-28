import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}
