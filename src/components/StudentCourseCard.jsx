import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function StudentCourseCard({ title, description, progress, thumbnail }) {
  // Dynamic progress color
  const getProgressColor = () => {
    if (progress >= 70) return "bg-green-600";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Thumbnail */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className={`${getProgressColor()} h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Progress: {progress}%</p>
        <Button size="sm" variant="outline">
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}
