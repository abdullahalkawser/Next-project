

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Collection from "@/lib/models/Collections";
import { ObjectId } from "mongodb";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // Connect to the database


    // Get the user ID from Clerk's auth
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDB();




   // Find and delete the collection that matches the ID and belongs to the authenticated user
 await Collection.findOneAndDelete(params.id);

 return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
