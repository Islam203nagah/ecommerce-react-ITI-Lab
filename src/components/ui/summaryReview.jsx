import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./card";
import { Progress } from "./progress";
import { Star } from "lucide-react";

const SummaryReview = ({ product }) => {
  const rating = product?.rating?.rate || 0;
  const count = product?.rating?.count || 0;

  const stars = [5, 4, 3, 2, 1];

  return (
    <Card className="max-w-lg mx-auto my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {product?.title || "Customer Reviews"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Average Rating */}
        <div className="flex items-center gap-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>

          <span className="text-lg font-semibold">
            {rating.toFixed(1)}
          </span>

          <span className="text-sm text-muted-foreground">
            ({count} reviews)
          </span>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {stars.map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm w-6">{star}★</span>

              <Progress value={(rating / 5) * 100} className="flex-1" />

              <span className="text-xs text-muted-foreground w-10 text-right">
                {Math.round((rating / 5) * count)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryReview;