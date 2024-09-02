

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Collection from "@/lib/models/Collections";




export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Find the collection that matches the ID
    const collection = await Collection.findOne(params.id );

    // Check if the collection was found
    if (!collection) {
      return NextResponse.json({ message: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};



export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // Get the user ID from Clerk's auth
    const { userId } = auth();

    if (!userId) {
      console.error("Unauthorized: User ID not found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDB();

    // Check if the collection exists and belongs to the authenticated user
    const result = await Collection.findOneAndDelete(params.id );

    if (!result) {
      console.error(`Collection not found or not authorized. Collection ID: ${params.id}`);
      return NextResponse.json({ message: "Collection not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};





export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};