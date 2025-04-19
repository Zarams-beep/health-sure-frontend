export interface LabResults {
    testResults: {
      testName: string;
      result: string;
      date: string;
    }[];
    medicalReports: {
      title: string;
      url: string;
    }[];
  }