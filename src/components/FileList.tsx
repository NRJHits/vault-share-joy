import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Share2, FileIcon } from "lucide-react";
import { FileItem } from "@/pages/Dashboard";

interface FileListProps {
  files: FileItem[];
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}

const FileList = ({ files, onDelete, onShare }: FileListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FileIcon className="w-5 h-5 text-primary" />;
    if (type.startsWith("video/")) return <FileIcon className="w-5 h-5 text-accent" />;
    return <FileText className="w-5 h-5 text-muted-foreground" />;
  };

  if (files.length === 0) {
    return (
      <Card className="shadow-card border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="w-16 h-16 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Aucun fichier pour le moment</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Téléversez votre premier fichier pour commencer</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3">
      {files.map((file) => (
        <Card key={file.id} className="shadow-card border-border/50 hover:shadow-elevated transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                {getFileIcon(file.type)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onShare(file.id)}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(file.id)}
                  className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FileList;
