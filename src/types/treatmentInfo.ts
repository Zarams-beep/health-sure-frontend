// Treatment Info Type
export interface TreatmentInfo {
    assignedDoctor: {
        name: string | null;
        specialization: string | null;
        contact: string | null;
    };
    treatmentPlans: string[];
    upcomingAppointments: {
        date: string;
        time: string;
        location: string;
    }[];
}