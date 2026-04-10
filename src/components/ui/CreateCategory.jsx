import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2, "Category name required"),
  slug: z.string(),
});

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const name = watch("name");

  // auto slug
  React.useEffect(() => {
    if (!name) return;

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    setValue("slug", slug);
  }, [name, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        url: `https://dummyjson.com/products/category/${data.slug}`,
      };

      console.log(payload);

      toast.success("Category created", {
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });
    } catch {
      toast.error("Failed to create category", {
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 my-10">
      
      {/* FORM */}
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <h2 className="text-xl font-bold">Create Category</h2>

          <Input placeholder="Category Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          <Input placeholder="Slug" {...register("slug")} readOnly />

          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </form>
      </Card>

      {/* LIVE PREVIEW */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Live Preview</h3>

        <div className="border rounded-lg p-4 space-y-2">
          <p>
            <strong>Name:</strong> {name || "Category Name"}
          </p>

          <p>
            <strong>Slug:</strong> {watch("slug") || "category-slug"}
          </p>

          <p>
            <strong>URL:</strong>{" "}
            {watch("slug")
              ? `https://dummyjson.com/products/category/${watch("slug")}`
              : "category-url"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreateCategory;