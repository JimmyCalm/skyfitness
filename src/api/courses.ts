import api from "./index";
import { Course } from "./types";

export const getAllCourses = async (): Promise<Course[]> => {
    const response = await api.get<Course[]>("/courses");
    return response.data;
};