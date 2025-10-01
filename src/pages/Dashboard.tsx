import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HardDrive, LogOut, Upload } from "lucide-react";
import FileList from "@/components/FileList";
import ShareModal from "@/components/ShareModal";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  type: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const savedFiles = localStorage.getItem("files");
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      type: file.type || "application/octet-stream",
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    localStorage.setItem("files", JSON.stringify(updatedFiles));
    toast.success(`${newFiles.length} fichier(s) téléversé(s) avec succès`);
  };

  const handleDeleteFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem("files", JSON.stringify(updatedFiles));
    toast.success("Fichier supprimé");
  };

  const handleShareFile = (id: string) => {
    setSelectedFileId(id);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                FileDrive
              </h1>
              <p className="text-xs text-muted-foreground">Votre stockage cloud personnel</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Mes fichiers</h2>
              <p className="text-muted-foreground mt-1">
                {files.length} {files.length === 1 ? "fichier stocké" : "fichiers stockés"}
              </p>
            </div>

            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity cursor-pointer">
                <Upload className="w-4 h-4" />
                Téléverser des fichiers
              </Button>
            </label>
          </div>

          <FileList
            files={files}
            onDelete={handleDeleteFile}
            onShare={handleShareFile}
          />
        </div>
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedFileId(null);
        }}
        fileId={selectedFileId}
        files={files}
      />
    </div>
  );
};

export default Dashboard;
