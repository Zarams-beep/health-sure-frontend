export interface Department {
    id: number;
    name: string;
  }
  
  export interface Doctor {
    id: number;
    name: string;
    department: string;
  }
  
  export const departments: Department[] = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Orthopedics" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "General Surgery" },
    { id: 6, name: "Ophthalmology" },
    { id: 7, name: "Oncology" },
    { id: 8, name: "Psychiatry" },
    { id: 9, name: "Dermatology" },
    { id: 10, name: "Radiology" },
    { id: 11, name: "Anesthesiology" },
    { id: 12, name: "Emergency Medicine" },
    { id: 13, name: "Gastroenterology" },
    { id: 14, name: "Pulmonology" },
    { id: 15, name: "Obstetrics and Gynecology" },
    { id: 16, name: "Urology" },
    { id: 17, name: "Nephrology" },
    { id: 18, name: "Pathology" },
    { id: 19, name: "Endocrinology" },
    { id: 20, name: "Rheumatology" },
    { id: 21, name: "ENT (Otolaryngology)" },
    { id: 22, name: "Hematology" },
    { id: 23, name: "Infectious Diseases" },
    { id: 24, name: "Family Medicine" },
    { id: 25, name: "Geriatrics" },
    { id: 26, name: "Plastic Surgery" },
    { id: 27, name: "Rehabilitation Medicine" },
    { id: 28, name: "Nuclear Medicine" },
    { id: 29, name: "Allergy and Immunology" },
    { id: 30, name: "Sports Medicine" },
  ];
  
  export const doctors: Doctor[] = [
    { id: 1, name: "Dr. Tunde Adewale", department: "Cardiology" },
    { id: 2, name: "Dr. Adaobi Nwosu", department: "Neurology" },
    { id: 3, name: "Dr. Emeka Okafor", department: "Orthopedics" },
    { id: 4, name: "Dr. Kemi Ayeni", department: "Pediatrics" },
    { id: 5, name: "Dr. Chuka Eze", department: "General Surgery" },
    { id: 6, name: "Dr. Halima Mohammed", department: "Ophthalmology" },
    { id: 7, name: "Dr. Idris Balogun", department: "Oncology" },
    { id: 8, name: "Dr. Fola Oladipo", department: "Psychiatry" },
    { id: 9, name: "Dr. Ifeoma Obi", department: "Dermatology" },
    { id: 10, name: "Dr. Musa Ibrahim", department: "Radiology" },
    { id: 11, name: "Dr. Ayodele Falana", department: "Anesthesiology" },
    { id: 12, name: "Dr. Blessing Ezeagu", department: "Emergency Medicine" },
    { id: 13, name: "Dr. Obinna Ekeh", department: "Gastroenterology" },
    { id: 14, name: "Dr. Nnenna Umeh", department: "Pulmonology" },
    { id: 15, name: "Dr. Rahila Bako", department: "Obstetrics and Gynecology" },
    { id: 16, name: "Dr. Segun Ojo", department: "Urology" },
    { id: 17, name: "Dr. Ngozi Ibe", department: "Nephrology" },
    { id: 18, name: "Dr. Abdulahi Sule", department: "Pathology" },
    { id: 19, name: "Dr. Zainab Lawal", department: "Endocrinology" },
    { id: 20, name: "Dr. Clement Opara", department: "Rheumatology" },
    { id: 21, name: "Dr. Mary Akpan", department: "ENT (Otolaryngology)" },
    { id: 22, name: "Dr. Uchenna Nwankwo", department: "Hematology" },
    { id: 23, name: "Dr. Samuel Etim", department: "Infectious Diseases" },
    { id: 24, name: "Dr. Gloria Udo", department: "Family Medicine" },
    { id: 25, name: "Dr. Peter Alabi", department: "Geriatrics" },
    { id: 26, name: "Dr. Tola Adebayo", department: "Plastic Surgery" },
    { id: 27, name: "Dr. Hadiza Bello", department: "Rehabilitation Medicine" },
    { id: 28, name: "Dr. Chinyere Okon", department: "Nuclear Medicine" },
    { id: 29, name: "Dr. Ibrahim Abubakar", department: "Allergy and Immunology" },
    { id: 30, name: "Dr. Peace Obioma", department: "Sports Medicine" },
  ];
  