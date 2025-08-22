import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { db } from "../../../configs/db"; 
import { eq, and } from "drizzle-orm";

export async function POST(req){
    try {
        const {courseId, studyType} = await req.json();

        console.log("Received request:", { courseId, studyType });

        // Validate input
        if (!courseId) {
            return NextResponse.json({ error: "courseId is required" }, { status: 400 });
        }

        if (studyType === 'ALL') {
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            // Get the All other study type records
            const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

            const result = {
                notes: notes,
                Flashcard: contentList?.filter(item => item.type === 'Flashcard'),
                quiz: contentList?.filter(item => item.type === 'Quiz'),
                qa: contentList?.filter(item => item.type === 'QA'),
            };
            
            return NextResponse.json(result);
        }
        else if (studyType === 'notes') {
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            console.log("Notes found:", notes);
            return NextResponse.json(notes);
        }
        else {
            const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
                .where(and(
                    eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
                ));

            return NextResponse.json(result[0] ?? []);
        }
    } 
    
    catch (error) {
        console.error("Error in /api/study-type:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}