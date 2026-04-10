import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud, X } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { createProduct, fetchCategories } from '@/service/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';
import { useThemeStore } from '@/store/useThemeStore';

const NewProduct = () => {
    const theme = useThemeStore(state => state.theme);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const productSchema = z.object({
        title: z.string().min(3, 'Title is required'),
        slug: z.string(),
        price: z.number().min(1),
        stock: z.number().min(0),
        brand: z.string().min(2),
        category: z.string(),
        description: z.string().min(10),
    });
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    const title = watch('title');
    const price = watch('price');
    React.useEffect(() => {
        const fetchCategoriesData = async () => {
            const categoriesRes = await fetchCategories();
            setCategories(categoriesRes);
        };
        fetchCategoriesData();
    }, [categories]);
    // auto slug
    React.useEffect(() => {
        if (!title) return;

        const slug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');

        setValue('slug', slug);
    }, [setValue, title]);

    // drag drop
    const handleDrop = e => {
        e.preventDefault();
        setDragActive(false);

        const files = [...e.dataTransfer.files];

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages(prev => [...prev, ...previews]);
    };

    const handleFile = e => {
        const files = [...e.target.files];

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages(prev => [...prev, ...previews]);
    };

    const removeImage = index => {
        setImages(images.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
    try{

        const payload = {
            ...data,
            images: images.map(img => img.url),
        };

        await createProduct(payload);

        toast.success("Product created", {
                    style: {
                        background: '#16a34a',
                        color: '#fff',
                    },
                });

    }catch{
        toast.error("Failed to create product", {
                    style: {
                        background: '#dc2626',
                        color: '#fff',
                    },
                });
    }
};

    return (
        <div className={`max-w-7xl mx-auto grid grid-cols-3 gap-6 my-8 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
            {/* FORM */}
            <Card className={`col-span-2 p-6 space-y-4 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-4'>
                    <h2 className="text-xl font-bold">Create Product</h2>

                    <Input placeholder="Title" {...register('title')} />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                    )}

                    <Input placeholder="Slug" {...register('slug')} readOnly />

                    <textarea
                        placeholder="Description"
                        rows={8}
                        className="border rounded-md p-2 w-full"
                        {...register('description')}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            placeholder="Price"
                            {...register('price', { valueAsNumber: true })}
                        />

                        <Input
                            type="number"
                            placeholder="Stock"
                            {...register('stock', { valueAsNumber: true })}
                        />
                    </div>

                    <Input placeholder="Brand" {...register('brand')} />
                    <Select onValueChange={value => setValue('category', value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose Category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category.name} value={category.name}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Drag Drop Upload */}
                    <div
                        onDragOver={e => e.preventDefault()}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed p-6 text-center rounded-lg
                ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                        <UploadCloud className="mx-auto mb-2" />

                        <p>Drag images here</p>

                        <Input type="file" multiple onChange={handleFile} />
                    </div>

                    {/* gallery */}
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((img, i) => (
                            <div key={i} className="relative">
                                <img
                                    src={img.url}
                                    className="rounded-md h-24 w-full object-cover"
                                />

                                <X
                                    size={18}
                                    className="absolute top-1 right-1 bg-white rounded-full cursor-pointer"
                                    onClick={() => removeImage(i)}
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        className={`cursor-pointer w-25 h-10 ${theme==="dark"?"bg-[#fff] text-[#000]":"bg-[#000] text-[#fff]"}`}
                        type="submit"
                    >
                        Create Product
                    </Button>
                </form>
            </Card>
            {/* LIVE PREVIEW */}
            <Card className={`p-6 space-y-3 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                <h3 className="font-semibold">Live Preview</h3>

                {images[0] && (
                    <img src={images[0].url} className="rounded-lg" />
                )}

                <h4 className="font-bold text-lg">
                    {title || 'Product Title'}
                </h4>

                <p className="text-sm text-gray-500">${price || '0'}</p>
            </Card>
        </div>
    );
};

export default NewProduct;
