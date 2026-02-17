import api from "./index";
import { Course } from "./types";

export const getAllCourses = async (): Promise<Course[]> => {
    const response = await api.get<Course[]>("/courses");
    return response.data;
};

export const getCourseById = async (id: string): Promise<Course> => {
    const res = await api.get(`/courses/${id}`);
    return res.data;
}