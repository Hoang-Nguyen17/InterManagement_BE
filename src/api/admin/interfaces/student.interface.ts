export interface IStudentLearnInternSubject {
    subject_id?: number;
    semester_id?: number;
    academic_id?: number;
    student_id?: number;
    search_text?: string;
    limit?: number;
    page?: number;
}

export interface IFilterStudent {
    schoolId?: number;
    status?: number;
    searchText?: string;
    departmentId: number;
    classId: number;
    page: number;
    limit: number;
}
