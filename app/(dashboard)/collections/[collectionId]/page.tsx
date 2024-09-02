"use client";

import CollectionForm from '@/components/collections/CollectionsFrom';
import Loader from '@/components/customui/Loder';
import React, { useState, useEffect } from 'react';

type CollectionType = {
  _id: string;

  // Add other fields that your collection has
};

const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<CollectionType | null>(null);
  console.log(collection);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch collection details');
      }
      const data: CollectionType = await res.json();
      setCollection(data);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, [params.collectionId]);



  if (!collection) {
    return <div>Collection not found</div>;
  }

  return loading ? <Loader/>: (
    <div>
<CollectionForm initialData={collection}/>
    </div>
  );
};

export default CollectionDetails;
