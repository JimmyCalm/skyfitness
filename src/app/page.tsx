"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/api/courses";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Загрузка курсов...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center text-red-600">
        Ошибка загрузки курсов: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3x1 font-bold mb-8">
        Начните заниматься спортом и улучшите качество жизни
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">Нет доступных курсов</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{course.nameRU || course.nameEN}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {course.directions?.length ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {course.directions.map((dir) => (
                      <span key={dir} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {dir}
                      </span>
                    ))}
                  </div>
                ) : null}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Подробнее</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}