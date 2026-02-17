
import { getCourseById } from '@/api/courses';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const course = await getCourseById(id);

  if (!course) {
    return <div className="container mx-auto py-10">Курс не найден</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{course.nameRU || course.nameEN}</h1>
      <p className="text-lg mb-6">{course.description}</p>
    </div>
  );
}