
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

import Link from "next/link";
import { DataTable } from "@/components/customui/DataTable";
import { columns } from "@/components/products/ProductsColumns";





const Producttsssss = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState<ProductType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setproducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  console.log(products)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 py-5 space-y-9">
    <div className="flex justify-between">
    <h1 className="text-2xl font-bold mb-4">Collections</h1>
<Link href = {'/products/new'}>
<p className="text-xl font-bold mb-4 flex ml-2 bg-red-500  rounded-lg text-white p-2">
        <Plus/>
        Create products</p>
</Link>
    </div>
      <Separator></Separator>

      
      <DataTable  columns={columns} data={products} searchKey="title"/>
 
    </div>
  );
};

export default Producttsssss;
