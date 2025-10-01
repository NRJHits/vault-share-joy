import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, HardDrive, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface SharedFile {
  code: string;
  fileId: string;
  fileName: string;
  expiresAt: string;
}

const SharedAccess = () => {
  const [shareCode, setShareCode] = useState("");
  const [foundFile, setFoundFile] = useState<SharedFile | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const sharedFiles = JSON.parse(localStorage.getItem("sharedFiles") || "[]");
      const file = sharedFiles.find((sf: SharedFile) => sf.code === shareCode.toUpperCase());

      if (file) {
        const expirationDate = new Date(file.expiresAt);
        if (expirationDate > new Date()) {
          setFoundFile(file);
          toast.success("File found!");
        } else {
          toast.error("This share link has expired");
          setFoundFile(null);
        }
      } else {
        toast.error("Invalid share code");
        setFoundFile(null);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleDownload = () => {
    if (foundFile) {
      toast.success(`Downloading ${foundFile.fileName}...`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-elevated mb-4">
            <HardDrive className="w-8 h-8 text-primary-foreground" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Access Shared File
          </h1>
          <p className="text-muted-foreground">Enter your share code to retrieve the file</p>
        </div>

        <Card className="shadow-elevated border-border/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Retrieve File</CardTitle>
            <CardDescription>
              Enter the 6-character code you received
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter share code (e.g., ABC123)"
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value.toUpperCase())}
                    className="pl-9 font-mono text-center text-lg tracking-wider uppercase"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Find File"}
              </Button>
            </form>

            {foundFile && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">File found:</p>
                  <p className="font-semibold text-lg">{foundFile.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires: {new Date(foundFile.expiresAt).toLocaleDateString()} at {new Date(foundFile.expiresAt).toLocaleTimeString()}
                  </p>
                </div>

                <Button 
                  onClick={handleDownload}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedAccess;
