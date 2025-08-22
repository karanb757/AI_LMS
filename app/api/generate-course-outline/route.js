// import { courseOutlineAIModel } from "../../../configs/AiModel";
// import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
// import { db } from "../../../configs/db"; // ✅ your Drizzle DB instance
// import { inngest } from "../../../inngest/client.js";
// import { NextResponse } from "next/server";

// export async function POST(req) {
  
//       const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();
  
//       console.log("✅ Received in backend:", {
//         courseId,
//         topic,
//         courseType,
//         difficultyLevel,
//         createdBy,
//       });
      
//       // ✅ Input validation
//       if (!topic || !courseType || !difficultyLevel || !createdBy) {
//         return new Response("Missing required fields", { status: 400 });
//       }
  
//       const PROMPT = `Generate a study material for ${topic} for ${courseType}, difficulty: ${difficultyLevel}. Include chapter summaries, emoji icons per chapter, and a topic list per chapter. Respond in JSON format.`;
  
//       // ✅ Generate course layout using AI 
//       const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
//       const aiResult = JSON.parse(aiResp.response.text());

//       //save the result along with user input
//       const dbResult= await db.insert(STUDY_MATERIAL_TABLE).values({
//         courseId:courseId,
//         courseType:courseType,
//         createdBy:createdBy,
//         topic:topic,
//         courseLayout:aiResult
//       }).returning({resp:STUDY_MATERIAL_TABLE});

//       console.log("✅ DB insert result:", dbResult);

//         // Trigger the Inngest Function to generate chapter Notes
//         const result = await inngest.send({
//             name:'notes.generate',
//               data:{
//                     course:dbResult[0].resp
//               }
//             })
//         console.log(result);
    
//         // Return response
//         return new Response(JSON.stringify({ result: dbResult[0] }), {
//           status: 200,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });      
//   }
  


//TESTING GUYS ->>>>>>>>

import { courseOutlineAIModel } from "../../../configs/AiModel";
import { generateNotesAiModel } from "../../../configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { db } from "../../../configs/db";
import { inngest } from "../../../inngest/client.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {    
    const requestBody = await req.json();    
    const { courseId, topic, courseType, difficultyLevel, createdBy } = requestBody;

    // ✅ Input validation
    if (!topic || !courseType || !difficultyLevel || !createdBy) {
      console.error("❌ Missing required fields");
      return new Response("Missing required fields", { status: 400 });
    }

    const PROMPT = `Generate a study material for ${topic} for ${courseType}, difficulty: ${difficultyLevel} with summary of course ,List of chapters (Max 3) along with summary and emoji icon for each chapter,Topic list per chapter. Respond in JSON format.`;
    
    // ✅ Generate course layout using AI 
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    console.log("✅ AI response received");
    
    const aiText = aiResp.response.text();
    
    let aiResult;
    try {
      aiResult = JSON.parse(aiText);
    } 
    catch (parseError) {
      throw new Error("AI response is not valid JSON");
    }

    // Save the result along with user input
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId: courseId,
      courseType: courseType,
      createdBy: createdBy,
      topic: topic,
      courseLayout: aiResult,
      difficultyLevel: difficultyLevel
    }).returning();

    console.log("✅ DB insert successful");
    console.log("Inserted record:", dbResult[0]);

    // Trigger the Inngest Function to generate chapter Notes
    console.log("🚀 Triggering Inngest function 'notes.generate'...");
    const inngestResult = await inngest.send({
      name: 'notes.generate',
      data: {
        course: {
          courseId: dbResult[0].courseId,
          courseLayout: dbResult[0].courseLayout,
          // Add any other needed fields
          ...dbResult[0]
        }
      }
    });
    
    // Return response
    return new Response(JSON.stringify({ 
      success: true, 
      result: dbResult[0],
      inngestEventId: inngestResult.ids?.[0] 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
  } 
  
  catch (error) {
      return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), 
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}