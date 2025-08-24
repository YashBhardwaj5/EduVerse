import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function PublicCourseCard({ courseId, title, description, thumbnail, price }) {
  const handleEnrollClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:3000/courses/${courseId}/enroll`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-2 font-semibold text-gray-900">Price: ₹{price}</p>

      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleEnrollClick}>
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}
