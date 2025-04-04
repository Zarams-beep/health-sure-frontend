// Lab Results Type
export interface LabResults {
    testResults: {
        testName: string;
        result: string;
        date: string;
    }[];
    medicalReports: {
        title: string;
        url: string; // Can store PDF links
    }[];
}