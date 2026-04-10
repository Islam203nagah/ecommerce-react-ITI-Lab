import {
    fetchCategoryById,
    fetchProductById,
    fetchUserById,
    updateCategory,
    updateProduct,
    updateUser,
} from '../service/api';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldSet,
    FieldGroup,
} from '../components/ui/field';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';

const DetailsAdmin = () => {
    const theme = useThemeStore(state => state.theme);
    const location = useLocation();
    const [, urlDetails, id] = location.pathname.split('/');
    const [data, setData] = useState(null);
    const [dataKeys, setDataKeys] = useState([]);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                if (urlDetails === 'products') {
                    const productDtails = await fetchProductById(id);
                    setData(productDtails);
                    setDataKeys(Object.keys(productDtails));
                } else if (urlDetails === 'categories') {
                    const categoryDtails = await fetchCategoryById(id);
                    setData(categoryDtails);
                    setDataKeys(Object.keys(categoryDtails));
                } else {
                    const userDtails = await fetchUserById(id);
                    setData(userDtails);
                    setDataKeys(Object.keys(userDtails));
                }
            } catch (error) {
                toast.error('Error fetching product:', {
                    style: {
                        background: '#dc2626',
                        color: '#fff',
                    },
                });
            }
        };

        fetchProduct();
    }, [id, urlDetails]);
    const updateProductData = async () => {
        try {
            if (urlDetails === 'products') {
                await updateProduct(id, data);
                toast.success('Product saved successfully', {
                    style: {
                        background: '#16a34a',
                        color: 'white',
                    },
                });
            } else if (urlDetails === 'categories') {
                await updateCategory(id, data);
                toast.success('Category saved successfully', {
                    style: {
                        background: '#16a34a',
                        color: 'white',
                    },
                });
            } else {
                await updateUser(id, data);
                toast.success('User saved successfully', {
                    style: {
                        background: '#16a34a',
                        color: 'white',
                    },
                });
            }
        } catch (error) {
            toast.error('Failed to update product', {
                style: {
                    background: '#dc2626',
                    color: '#fff',
                },
            });
        }
    };
    const renderField = (key, value) => {
        // Long text / description
        if (key.toLowerCase().includes('description')) {
            return (
                <FieldGroup key={key} className={`w-full ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                    <FieldLabel>{key}</FieldLabel>
                    <FieldDescription>
                        <textarea
                            className={`w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-400 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                            value={value ?? ''}
                            onChange={e =>
                                setData({
                                    ...data,
                                    [key]: e.target.value,
                                })
                            }
                        />
                    </FieldDescription>
                </FieldGroup>
            );
        }

        // Object field
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return (
                <FieldSet
                    key={key}
                    className={`mb-4 p-4 border rounded-lg ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                >
                    <legend className="font-semibold text-sm">{key}</legend>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {Object.entries(value).map(([k, v]) => (
                            <Field key={k}>
                                <FieldLabel>{k}</FieldLabel>
                                <FieldDescription>
                                    <Input
                                        className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                        type={typeof v === 'number' ? 'number' : 'text'}
                                        value={v}
                                        onChange={e =>
                                            setData({
                                                ...data,
                                                [key]: {
                                                    ...data[key],
                                                    [k]: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </FieldDescription>
                            </Field>
                        ))}
                    </div>
                </FieldSet>
            );
        }

        // Array field (like reviews)
        // inside renderField function, replace array handling with this:
        if (Array.isArray(value)) {
            // Check if it's reviews array
            if (key.toLowerCase() === 'reviews') {
                return (
                    <FieldSet
                        key={key}
                        className={`mb-4 p-4 border rounded-lg bg-gray-50 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                    >
                        <legend className={`font-semibold text-sm ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>{key}</legend>
                        <div className={`flex flex-col lg:flex-row space-x-4 overflow-x-auto py-2 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                            {value.map((item, idx) => {
                                if (typeof item === 'object' && item !== null) {
                                    return (
                                        <FieldSet
                                            key={idx}
                                            className={`min-w-70 p-3 border rounded-md bg-white shrink-0 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                        >
                                            <legend className={`text-xs font-medium mb-1 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                                Review {idx + 1}
                                            </legend>
                                            <div className="space-y-1">
                                                {Object.entries(item).map(
                                                    ([k, v]) => (
                                                        <Field
                                                            key={k}
                                                            className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"} mb-1`}
                                                        >
                                                            <FieldLabel className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                                                {k}
                                                            </FieldLabel>
                                                            <FieldDescription>
                                                                {k.toLowerCase() ===
                                                                'comment' ? (
                                                                    <textarea
                                                                        className={`w-full border rounded p-1 text-xs ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                                                        value={
                                                                            v
                                                                        }
                                                                        onChange={e => {
                                                                            const updatedArray =
                                                                                [
                                                                                    ...value,
                                                                                ];
                                                                            updatedArray[
                                                                                idx
                                                                            ] =
                                                                                {
                                                                                    ...updatedArray[
                                                                                        idx
                                                                                    ],
                                                                                    [k]: e
                                                                                        .target
                                                                                        .value,
                                                                                };
                                                                            setData(
                                                                                {
                                                                                    ...data,
                                                                                    [key]: updatedArray,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Input
                                                                        className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                                                        value={
                                                                            v
                                                                        }
                                                                        onChange={e => {
                                                                            const updatedArray =
                                                                                [
                                                                                    ...value,
                                                                                ];
                                                                            updatedArray[
                                                                                idx
                                                                            ] =
                                                                                {
                                                                                    ...updatedArray[
                                                                                        idx
                                                                                    ],
                                                                                    [k]: e
                                                                                        .target
                                                                                        .value,
                                                                                };
                                                                            setData(
                                                                                {
                                                                                    ...data,
                                                                                    [key]: updatedArray,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                )}
                                                            </FieldDescription>
                                                        </Field>
                                                    )
                                                )}
                                            </div>
                                        </FieldSet>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </FieldSet>
                );
            }

            // fallback for other arrays
            return (
                <FieldSet key={key} className="m-4">
                    <legend className="font-semibold text-sm">{key}</legend>
                    <div className="space-y-2 mt-2">
                        {value.map((item, idx) => (
                            <Field key={idx}>
                                <FieldLabel>{`${key} item ${idx + 1}`}</FieldLabel>
                                <FieldDescription>
                                    <Input
                                        className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                        value={item}
                                        onChange={e => {
                                            const updatedArray = [...value];
                                            updatedArray[idx] = e.target.value;
                                            setData({
                                                ...data,
                                                [key]: updatedArray,
                                            });
                                        }}
                                    />
                                </FieldDescription>
                            </Field>
                        ))}
                    </div>
                </FieldSet>
            );
        }

        // Number / string / default
        return (
            <div key={key} className="w-1/3 pr-4 m-4">
                <Field>
                    <FieldLabel>{key}</FieldLabel>
                    <FieldDescription>
                        <Input
                            className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                            type={typeof value === 'number' ? 'number' : 'text'}
                            value={value ?? ''}
                            onChange={e =>
                                setData({
                                    ...data,
                                    [key]:
                                        typeof value === 'number'
                                            ? Number(e.target.value)
                                            : e.target.value,
                                })
                            }
                        />
                    </FieldDescription>
                </Field>
            </div>
        );
    };

    if (!data) return <p>Loading...</p>;

    return (
        <Card className={`w-full max-w-5xl mx-auto my-7 p-6 ${theme==="dark"?"bg-[#333] text-[#fff] ":"bg-[#fff] text-[#000]"}`}>
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <div className="flex flex-wrap -mx-4">
                {dataKeys.map(key => renderField(key, data[key]))}
            </div>
            <Button
                className={`cursor-pointer w-25 h-10 ${theme==="dark"?"bg-[#fff] text-[#000]":"bg-[#000] text-[#fff]"}`}
                onClick={() => updateProductData()}
            >
                Save Changes
            </Button>
        </Card>
    );
};

export default DetailsAdmin;
