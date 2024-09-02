"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/customui/DataTable";
import { columns } from "@/components/collections/CollectionsColumns";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

import Link from "next/link";



interface Collection {
  _id: string;
  title: string;
  description: string;
  image: string;
  searchKey:string
}

const Collectionssssss = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<Collection[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  console.log(collections)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 py-5 space-y-9">
    <div className="flex justify-between">
    <h1 className="text-2xl font-bold mb-4">Collections</h1>
<Link href = {'/collections/new'}>
<p className="text-xl font-bold mb-4 flex ml-2 bg-red-500  rounded-lg text-white p-2">
        <Plus/>
        Create Collections</p>
</Link>
    </div>
      <Separator></Separator>

      
      <DataTable  columns={columns} data={collections} searchKey="title"/>
 
    </div>
  );
};

export default Collectionssssss;
