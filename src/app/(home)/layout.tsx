import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}
