import { Button } from "@/components/ui/button";
import { HardDrive, Shield, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              FileDrive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/shared">
              <Button variant="outline">Access Shared File</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Files, <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Secured</span> and <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Shared</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Store, manage, and share your files securely with temporary access codes. Simple, fast, and reliable.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
            <Link to="/shared">
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Access Shared File
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Secure Storage</h3>
              <p className="text-muted-foreground">
                Your files are stored securely with industry-standard encryption and protection.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Generate unique codes to share files with anyone, no account required.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Time-Limited Access</h3>
              <p className="text-muted-foreground">
                Set expiration dates for shared files to maintain control over your content.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
