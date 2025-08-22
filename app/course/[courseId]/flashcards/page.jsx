// page.jsx (Flashcards page)
"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashCardItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../../components/ui/carousel"

const Flashcards = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const [flashcards, setFlashCards] = useState([])
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        getFlashCards();
    }, [courseId]);

    useEffect(() => {
        if (!api) return;
        api.on('select', () => {
            setIsFlipped(false);
        });
    }, [api]);

    const getFlashCards = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard' // Changed to lowercase to match your API
            });

            console.log('Flashcard API response:', result.data);
            
            if (result.data?.flashcard?.length > 0) {
                setFlashCards(result.data.content);
            } else {
                setFlashCards([]);
            }
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            setError('Failed to load flashcards');
        } finally {
            setLoading(false);
        }
    }

    const handleGenerateFlashcards = async () => {
        setGenerating(true);
        try {
            let chapters = '';
            // You might need to fetch course data here or pass it as prop
            const courseResult = await axios.get(`/api/course/${courseId}`);
            courseResult.data.courseLayout.chapters.forEach(chapter => {
                chapters = (chapter.chapter_title || chapter?.chapterTitle) + ',' + chapters;
            });

            await axios.post('/api/study-type-content', {
                courseId: courseId,
                type: 'Flashcard',
                chapters: chapters
            });

            // Poll for completion
            const checkStatus = async () => {
                const result = await axios.post('/api/study-type', {
                    courseId: courseId,
                    studyType: 'Flashcard'
                });
                
                if (result.data?.flashcard?.length > 0) {
                    setFlashCards(result.data.content);
                    setGenerating(false);
                } else {
                    setTimeout(checkStatus, 2000); // Check again after 2 seconds
                }
            };

            setTimeout(checkStatus, 2000);
        } catch (error) {
            console.error('Error generating flashcards:', error);
            setGenerating(false);
        }
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading flashcards...</p>
                </div>
            </div>
        );
    }

    if (generating) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Generating flashcards... This may take a minute.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 border rounded-lg bg-red-50">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                    onClick={getFlashCards}
                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="font-bold text-2xl mb-2">Flashcards</h2>
            <p className="text-gray-600 mb-6">Flashcards: The ultimate Tool to Lock in Concepts!</p>

            {flashcards.length === 0 ? (
                <div className="text-center p-8 border rounded-lg mt-10">
                    <p className="text-gray-500 mb-4">
                        No flashcards available yet.
                    </p>
                    <button 
                        onClick={handleGenerateFlashcards}
                        className="bg-primary text-white px-4 py-2 rounded mr-2"
                    >
                        Generate Flashcards
                    </button>
                    <button 
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <div className='flex items-center justify-center mt-10'>
                    <Carousel setApi={setApi} className="w-full max-w-md">
                        <CarouselContent>
                            {flashcards.map((flashcard, index) => (
                                <CarouselItem key={index} className='flex items-center justify-center'>
                                    <FlashCardItem 
                                        handleClick={handleClick} 
                                        isFlipped={isFlipped} 
                                        flashcard={flashcard}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
        </div>
    );
}

export default Flashcards;


