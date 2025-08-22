import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";

export async function POST(req){
    const {courseId,courseType}=await req.json();

    if(courseType=='ALL'){
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));

        //Get the All other study type records
        const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId))

        const result = {
            notes:notes,
            flashCard:contentList?.filter(item=>item.type=='FlashCard'),
            quiz:contentList?.filter(item=>item.type=='Quiz'),
            qa:contentList?.filter(item=>item.type=='QA'),
        }
        return NextResponse.json(result);
    }

    else if(courseType=='notes'){
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));

        return NextResponse.json(notes);
    }

    else{
        const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(and( eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type,courseType)))

        return NextResponse.json(result[0]??[]);
    }
}