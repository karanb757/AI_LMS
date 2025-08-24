"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "../../components/ui/button";
import TopicInput from "./_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData,setFormData]=useState([]);
  const {user} = useUser();
  const [loading,setLoading]=useState(false);

  const router = useRouter();

  //HANDLE USER INPUT 
  const handleUserInput=(fieldName,fieldValue)=>{
    
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
    console.log(formData)
  }

  // USED TO SAVE USER INPUT AND GENERATE COURSE LAYOUT USING AI
  const GenerateCourseOutline = async()=>{
    const courseId=uuidv4();
    setLoading(true);

    console.log("formData before sending:", formData);
    const result = await axios.post('/api/generate-course-outline',{
      courseId:courseId,
      ...formData,
      createdBy:user?.primaryEmailAddress?.emailAddress
    });

    setLoading(false);
    router.replace('/dashboard');
    console.log('formData After sending: :',result.data.result.resp);

    // TOAST Notification 
    // toast('Your course content is generating, Click on Refresh Button!');
    // console.log(result.data.result.resp);
    
  }

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:p-36 mt-20">
      <h2 className="font-extrabold text-4xl text-primary">
        Start Building Your Personal Study Material{" "}
      </h2>
      <p className="text-gray-500 text-lg">
        Select an option to build your preferred course
      </p>

      <div className="mt-10">
        {step == 0 ? <SelectOption selectedStudyType={(value)=>handleUserInput('courseType',value)}/> 
        : <TopicInput 
        setTopic={(value)=>handleUserInput('topic',value)}
        setDifficultyLevel={(value)=>handleUserInput('difficultyLevel',value)}/>}
      </div>

      <div className="flex justify-between w-full mt-32">
        <div>
          {step != 0 && (
            <Button onClick={() => setStep(step - 1)} variant="outline">
              Previous
            </Button>
          )}
        </div>
        <div>
          {step == 0 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={GenerateCourseOutline} disabled={loading}>
              {loading?<Loader className="animate-spin"/>:'Generate'}
            </Button>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Create;