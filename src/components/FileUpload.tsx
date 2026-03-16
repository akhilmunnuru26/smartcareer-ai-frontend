'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
}

export default function FileUpload({ 
  onTextExtracted, 
  acceptedFormats = ['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg'],
  maxSize = 10 
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('');
    
    if (acceptedFiles.length === 0) {
      setError('Please upload a valid file');
      return;
    }

    const uploadedFile = acceptedFiles[0];
    
    // Check file size
    if (uploadedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(uploadedFile);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // const response = await fetch('http://localhost:5000/api/upload/extract', {
      //   method: 'POST',
      //   body: formData,
      // });
      const response = await fetch('https://smartcareer-ai-backend.onrender.com/api/upload/extract', {
        method: 'POST',
        body: formData,
      });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to extract text');
      }

      onTextExtracted(data.text);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setFile(null);
    } finally {
      setUploading(false);
    }
  }, [maxSize, onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setError('');
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'docx' || ext === 'doc') {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
    return <ImageIcon className="h-8 w-8 text-purple-600" />;
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <input {...getInputProps()} />
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop file here' : 'Upload Resume or Screenshot'}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Drag & drop or click to browse
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">PDF</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">DOCX</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">DOC</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">PNG</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">JPG</span>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Maximum file size: {maxSize}MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon(file.name)}
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {uploading && (
              <div className="mt-3">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 animate-pulse w-full"></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Extracting text from file...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}