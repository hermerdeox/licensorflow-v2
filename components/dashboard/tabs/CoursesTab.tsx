export default function CoursesTab({ enrollments }: { enrollments: any[] }) {
  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        <a href="/courses" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse Courses â†’
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => (
        <div key={enrollment.id} className="rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">{enrollment.course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Instructor: {enrollment.course.instructor.name || `${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`}
          </p>
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              enrollment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
              enrollment.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {enrollment.status}
            </span>
            <a href={`/courses/${enrollment.course.id}`} className="text-blue-600 hover:underline text-sm">
              Continue â†’
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
