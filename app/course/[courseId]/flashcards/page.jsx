"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashCardItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

const Flashcards = () => {
    const {courseId}=useParams();

    const [flashcards,setFlashCards]=useState([])
    const [isFlipped,setIsFlipped]=useState();
    const [api,setApi] = useState()

    useEffect(()=>{
        getFlashCards()
    },[])

    useEffect(()=>{
        if(!api){
            return ;
        }
        api.on('select',()=>{
            setIsFlipped(false);
        })
    },[api])

    const getFlashCards=async()=>{
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Flashcard'
        });

        setFlashCards(result.data);
        console.log('flashcard',result.data);
        
    }

    const handleClick=()=>{
        setIsFlipped(!isFlipped)
    }

  return (
    <div>
      <h2 className="font-bold text-2xl">Flashcards</h2>
      <p className="">Flashcards: The ultimate Tool to Lock in Concepts! </p>

      <div className='flex items-center justify-center mt-10'>
            <Carousel setApi={setApi}>
                <CarouselContent>
                {flashcards?.content&&flashcards.content?.map((flashcard,index)=>{
                    <CarouselItem key={index} className='flex items-center justify-center'>
                        <FlashCardItem handleClick={handleClick} 
                        isFlipped={isFlipped} 
                        flashcard={flashcard}/>
                    </CarouselItem>
                })}
                </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>

            
            
        
      </div>
    </div>
  );
}

export default Flashcards