import { inngest } from "./client";
import { STUDY_MATERIAL_TABLE, USER_TABLE } from "../configs/schema";
import { db } from "../configs/db";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
  {id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {

    const { user } = event.data; // ✅ extract user here
    
    //Get Event Data
    const result = await step.run("Check User and Create New if Not in DB",async () => {
      // Check is User Already Exist
      const result = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length == 0) {
          //IF NOT, THEN ADD TO DB
          const userResponse = await db.insert(USER_TABLE).values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            return userResponse;
        }
        return result;
      });

    return 'Success';
  }

  //step is to send welcome email notification 

  //step to send email notification after 3 days of user login
);

// GENERATE NOTES -> 
// export const GenerateNotes = inngest.createFunction(
//   { id: "generate-course" },
//   { event: "notes.generate" },
//   async ({ event, step }) => {

//     const { course } = event.data; //All the record info

//     //Generate Notes for each chapter with AI
//     const notesResult = await step.run("Generate Chapter Notes", async () => {
//       const Chapters = course?.courseLayout?.chapters;

//       let index = 0;
//       Chapters.forEach(async (chapter) => {
//         const PROMPT ="Generate exam material detail content for each chapter, Make sure to include all topic point in the content, make sure to give all content in HTML format (Do not add HTML, Head, Body, title tag), The chapters : " +JSON.stringify(chapter);
//         const result = await generateNotesAiModel().sendMessage(PROMPT);
//         const aiResp = result.response.text();

//         await db.insert(CHAPTER_NOTES_TABLE).values({
//           chapterId: index,
//           courseId: course?.courseId,
//           notes: aiResp
//         });
//         index = index + 1;
//       });
//       return "Completed";
//     });

//     //Update Status to 'Ready'
//     const updateCourseStatusResult = await step.run("Update course status to Ready",async () => {
//         const result = await db
//           .update(STUDY_MATERIAL_TABLE)
//           .set({
//             status: "Ready",
//           })
//           .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
//         return "SUCCESS";
//       });
//   }
// );

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    // Add detailed logging
    console.log("=== STARTING NOTES GENERATION ===");
    console.log("Received course data:", JSON.stringify(course, null, 2));
    console.log("Course ID:", course?.courseId);
    console.log("Course layout exists:", !!course?.courseLayout);
    console.log("Chapters exist:", !!course?.courseLayout?.chapters);
    
    if (course?.courseLayout?.chapters) {
      console.log("Number of chapters:", course.courseLayout.chapters.length);
      console.log("First chapter:", course.courseLayout.chapters[0]);
    }

    // Generate Notes for each chapter with AI
    await step.run("Generate Chapter Notes", async () => {
      const Chapters = course?.courseLayout?.chapters;

      if (!Chapters || !Array.isArray(Chapters)) {
        console.error("❌ No chapters found or chapters is not an array");
        return "No chapters to process";
      }

      console.log(`📚 Processing ${Chapters.length} chapters`);

      for (const [index, chapter] of Chapters.entries()) {
        try {
          console.log(`🔍 Processing chapter ${index}: ${chapter.chapter_title}`);
          
          const PROMPT = `
            Generate exam material detail content for this chapter.
            Make sure to include all topic points.
            Return in HTML format (no <html>, <head>, <body>, or <title> tags).
            Chapter: ${JSON.stringify(chapter)}
          `;

          console.log("🤖 Sending prompt to AI model...");
          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResp = result.response.text();
          
          console.log("✅ AI response received, length:", aiResp.length);

          console.log("💾 Inserting into database...");
          const insertResult = await db.insert(CHAPTER_NOTES_TABLE)
            .values({
              chapterId: index,
              courseId: course.courseId,
              notes: aiResp,
            })
            .returning();

          console.log("✅ Inserted Notes Row:", insertResult);
          
        } catch (error) {
          console.error(`❌ Error processing chapter ${index}:`, error);
          console.error("Error details:", error.message);
          console.error("Error stack:", error.stack);
          // Continue with other chapters even if one fails
        }
      }

      return "Completed";
    });

    // Update Status to 'Ready'
    await step.run("Update course status to Ready", async () => {
      try {
        console.log("🔄 Updating course status to Ready...");
        console.log("Course ID for update:", course?.courseId);
        
        const updateResult = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({ status: "Ready" })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
          .returning();

        console.log("✅ Updated Course Row:", updateResult);
        return "SUCCESS";
      } catch (error) {
        console.error("❌ Error updating course status:", error);
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
      }
    });
  }
);