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
    console.log("=== STARTING COURSE CREATION ===");
    
    const requestBody = await req.json();
    console.log("📦 Raw request body:", requestBody);
    
    const { courseId, topic, courseType, difficultyLevel, createdBy } = requestBody;

    console.log("✅ Received in backend:", {
      courseId,
      topic,
      courseType,
      difficultyLevel,
      createdBy,
    });
    
    // ✅ Input validation
    if (!topic || !courseType || !difficultyLevel || !createdBy) {
      console.error("❌ Missing required fields");
      return new Response("Missing required fields", { status: 400 });
    }

    const PROMPT = `Generate a study material for ${topic} for ${courseType}, difficulty: ${difficultyLevel}. Include chapter summaries, emoji icons per chapter, and a topic list per chapter. Respond in JSON format.`;

    console.log("🤖 Sending prompt to AI for course outline...");
    console.log("Prompt:", PROMPT);
    
    // ✅ Generate course layout using AI 
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    console.log("✅ AI response received");
    
    const aiText = aiResp.response.text();
    console.log("AI response text length:", aiText.length);
    console.log("AI response preview:", aiText.substring(0, 200) + "...");
    
    let aiResult;
    try {
      aiResult = JSON.parse(aiText);
      console.log("✅ JSON parsed successfully");
      console.log("Course title:", aiResult.course_title);
      console.log("Number of chapters:", aiResult.chapters?.length);
    } catch (parseError) {
      console.error("❌ Failed to parse AI response as JSON:", parseError);
      console.error("Raw AI response:", aiText);
      throw new Error("AI response is not valid JSON");
    }

    // Save the result along with user input
    console.log("💾 Inserting into studyMaterial table...");
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
        course: dbResult[0]
      }
    });
    
    console.log("✅ Inngest trigger successful");
    console.log("Inngest result:", inngestResult);

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
      
  } catch (error) {
    console.error("❌ ERROR in POST endpoint:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}