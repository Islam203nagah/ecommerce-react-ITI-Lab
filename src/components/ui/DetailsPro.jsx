import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DetailsPro = ({ product }) => {
    if (!product) return (
        <Card>
            <CardContent>
                <div>No product details available.</div>
            </CardContent>
        </Card>
    );

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <Badge variant="secondary" className="mt-2">{product.category}</Badge>
            </CardHeader>
            <CardContent>
                <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-lg mb-4 w-full object-cover"
                    style={{ maxHeight: '300px' }}
                />
                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">Price:</span> ${product.price}
                    </p>
                    <p>
                        <span className="font-semibold">Description:</span> {product.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default DetailsPro;