import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Progress } from './progress';
import { Star } from 'lucide-react';

const SummaryReview = ({ product }) => {
    const rating = product?.rating || 0;
    const reviews = product?.reviews || [];
    const totalReviews = reviews.length;
    const ratingCount = (star) =>
    reviews.filter((review) => review.rating === star).length;

    const ratingPercentage = (star) => {
        const count = ratingCount(star);
        return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    };
    const stars = [5, 4, 3, 2, 1];

    return (
        <Card className="max-w-lg mx-auto my-6 shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    {product?.title || 'Customer Reviews'}
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
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground'
                                }`}
                            />
                        ))}
                    </div>

                    <span className="text-lg font-semibold">
                        {rating.toFixed(1)}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        ({totalReviews} reviews)
                    </span>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {stars.map(star => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-6">{star}★</span>

                            <Progress
                                value={ratingPercentage(star) }
                                className="flex-1"
                            />

                            <span className="text-xs text-muted-foreground w-10 text-right">
                                {Math.floor(ratingPercentage(star))}%
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default SummaryReview;
