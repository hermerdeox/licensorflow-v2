export default function ProgressTab({ progress }: { progress: any[] }) {
  return (
    <div className="space-y-4">
      {progress.map((item) => (
        <div key={item.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{item.course.title}</h3>
            <span className="text-sm text-gray-600">
              {Math.round(Number(item.progressPercentage))}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${item.progressPercentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
