import React from 'react';
import { Card, CardHeader, CardContent } from './card';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { Star } from 'lucide-react';

const CustomerReview = ({ product }) => {
    return (
        <Card className="max-w-md mx-auto my-4">
            <CardHeader className="flex items-center gap-4">
                <Avatar
                    src="https://github.com/evilrabbit.png"
                    alt={product?.title}
                />
                <div>
                    <div className="font-semibold">islam</div>
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <Star className="w-4 h-4 text-yellow-500" />
                        {product?.rating || 0}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {product?.description || 'No review available.'}
                </p>
            </CardContent>
        </Card>
    );
};

export default CustomerReview;
