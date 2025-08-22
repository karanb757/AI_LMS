import { STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { db } from "../../../configs/db"; 
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { courseId } = await req.json();
        
        console.log("=== DATABASE DEBUG ===");
        console.log("CourseId:", courseId);
        
        // Get all records for this course
        const allRecords = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));
            
        console.log("All records for course:", JSON.stringify(allRecords, null, 2));
        
        // Get specifically Quiz records
        const quizRecords = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));
            
        console.log("Quiz records:", JSON.stringify(quizRecords.filter(r => r.type === 'Quiz'), null, 2));
        
        return NextResponse.json({
            success: true,
            allRecords: allRecords,
            quizRecords: quizRecords.filter(r => r.type === 'Quiz'),
            totalRecords: allRecords.length
        });
        
    } catch (error) {
        console.error("Debug error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}