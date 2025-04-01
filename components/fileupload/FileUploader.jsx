'use client';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileUpload } from './file-upload';
import SpinningLoader from '../loaders/SpinningLoader';
import { getQuestions, getSubjects } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CardWithTable from '../staff/CardWithDatatable';
import { questionColumns } from '../tables/components/columns';

const UploadStatus = {
  Idle: 'idle',
  Uploading: 'uploading',
  Success: 'success',
  Error: 'error',
};
const FileUploader = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(''); // State for selected subject
  const [status, setStatus] = useState(UploadStatus.Idle);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [activeButton, setActiveButton] = useState('extract');
  const { data: subjects } = useQuery({
    queryKey: ['fileSubjects'],
    queryFn: () => getSubjects({ pageIndex: 0 }).then((res) => res.results),
  });

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleFileChange = (file) => {
    if (file) {
      setFile(file);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value); // Update selected subject ID
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedSubject) {
      toast({
        description: 'Please select a subject',
        variant: 'destructive',
      });
      return;
    }

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('subjectId', selectedSubject); // Append subject ID

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/file-manager/process-doc`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${user?.token_type} ${user?.access_token}`,
            JWTAUTH: `${user?.token_type} ${user?.jwt_token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      setStatus('success');
      setUploadProgress(100);
      toast.success('File uploaded successfully');
    } catch {
      setStatus('error');
      setUploadProgress(0);
      toast.error('Failed to upload file');
    }
  };

  const handleReset = () => {
    setFile(null);
    setSelectedSubject(''); // Reset selected subject
    setStatus(UploadStatus.Idle);
    setUploadProgress(0);
    setResetKey((prevKey) => prevKey + 1);
  };
  return (
    <div className="pt-10">
      <Card className="shadow-md border-0">
        <CardHeader className=" py-1 bg-slate-200 rounded-md flex flex-row justify-between items-center">
          <Button
            variant="ghost"
            className="font-semibold text-md hover:bg-slate-200 pr-5"
          >
            Extract Questions
          </Button>
          <Button className="text-sm">Process Questions</Button>
        </CardHeader>
        <CardContent className="py-5">
          <div className="container flex flex-col max-w-7xl mx-auto">
            <div className="flex flex-row  border-b-2 mb-5">
              <Button
                className={`text-md rounded-none  min-w-[200px] ${activeButton === 'extract' ? 'border-b-2 border-primary text-primary ' : 'border-b-2 border-transparent'}`}
                variant="ghost"
                onClick={() => handleButtonClick('extract')}
              >
                Extract Questions
              </Button>
              <Button
                className={`text-md rounded-none min-w-[200px] ${activeButton === 'questions' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent'}`}
                variant="ghost"
                onClick={() => handleButtonClick('questions')}
              >
                Extracted Questions
              </Button>
            </div>
            {activeButton === 'extract' && (
              <div className="mb-8 flex flex-col space-y-3">
                <label className="text-md font-semibold ">Select Subject</label>
                <select
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="mt-4 border border-primary rounded p-2 w-full"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {subjects?.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeButton === 'extract' && (
              <>
                <div className="flex flex-col">
                  <div className="w-full border border-dashed  rounded-lg">
                    <FileUpload key={resetKey} onChange={handleFileChange} />
                  </div>
                  <div className="flex justify-center space-x-24 mt-3">
                    <Button
                      className=" py-2 px-4 rounded flex items-center"
                      onClick={handleFileUpload}
                    >
                      {status === UploadStatus.Uploading ? (
                        <>
                          <SpinningLoader />
                          Extracting...
                        </>
                      ) : (
                        'Extract Questions'
                      )}
                    </Button>
                    <Button
                      className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                {status === 'uploading' && (
                  <div className="flex flex-1 flex-row space-y-2 max-w-[600px] mx-auto">
                    <p className="text-sm text-gray-600">
                      {uploadProgress}% uploaded
                    </p>
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </>
            )}
            {activeButton === 'questions' && (
              <>
                <CardWithTable
                  title="Biology Questions"
                  columns={questionColumns}
                  fetchFunction={getQuestions}
                  queryKey="questions"
                  searchColumn="subject_name"
                  searchLabel="Subject"
                  cardHeaderClass={'py-2 items-center text-md'}
                  mainDivClass={'p-0 pt-5'}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default FileUploader;
