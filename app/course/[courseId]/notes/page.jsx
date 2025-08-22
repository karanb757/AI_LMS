"use client"
import { Button } from '../../../../components/ui/button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'; // Fixed import
import React, { useEffect, useState } from 'react'

const ViewNotes = () => {
    const { courseId } = useParams();
    const [notes, setNotes] = useState();
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter(); // Fixed variable name

    useEffect(() => {
        GetNotes()
    }, [])

    const GetNotes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'notes' // This matches what your API expects
            });
            
            console.log(result?.data);
            setNotes(result?.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setError("Failed to load notes. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Function to clean and format HTML content
    const cleanAndFormatHTML = (htmlContent) => {
        if (!htmlContent) return '';
        
        // Remove markdown code blocks
        let cleaned = htmlContent.replace(/```html|```/g, '');
        
        // Replace \n with actual line breaks in HTML
        cleaned = cleaned.replace(/\\n/g, '\n');
        
        // Convert \n to <br> for proper line breaks in paragraphs
        cleaned = cleaned.replace(/\n\n/g, '</p><p>');
        cleaned = cleaned.replace(/\n/g, '<br>');
        
        // Wrap in paragraph tags if not already wrapped
        if (!cleaned.trim().startsWith('<')) {
            cleaned = `<p>${cleaned}</p>`;
        }
        
        return cleaned;
    };

    const handleNext = () => {
        if (stepCount < notes.length - 1) {
            setStepCount(stepCount + 1);
        }
    }

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount(stepCount - 1);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading notes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 border rounded-lg bg-red-50">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={GetNotes}>Try Again</Button>
            </div>
        );
    }

    if (!notes || notes.length === 0) {
        return (
            <div className="text-center p-8 border rounded-lg">
                <p className="text-gray-500 mb-4">No notes available for this course yet.</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Enhanced Navigation Bar */}
            <div className='sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 mb-8'>
                <div className='flex gap-4 items-center justify-between max-w-4xl mx-auto'>
                    <Button 
                        variant='outline' 
                        size='sm' 
                        onClick={handlePrevious}
                        disabled={stepCount === 0}
                        className="px-6 py-2 bg-white/70 hover:bg-white border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        ← Previous
                    </Button>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="flex gap-2 flex-1 max-w-md mx-6">
                        {notes?.map((item, index) => (
                            <div 
                                key={index} 
                                className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                                    index <= stepCount 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                                        : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                    
                    <Button 
                        variant='outline' 
                        size='sm' 
                        onClick={handleNext}
                        disabled={stepCount >= notes.length - 1}
                        className="px-6 py-2 bg-white/70 hover:bg-white border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        Next →
                    </Button>
                </div>
                
                {/* Chapter Title */}
                <div className="text-center mt-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Chapter {stepCount + 1}: {notes?.[stepCount]?.chapterTitle || `Study Notes`}
                    </h1>
                </div>
            </div>

            <div className='mt-10'>
                {notes[stepCount]?.notes ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: cleanAndFormatHTML(notes[stepCount].notes)
                            }} 
                        />
                        
                        {/* Chapter progress indicator */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Chapter {stepCount + 1} of {notes.length}</span>
                                <div className="flex items-center gap-2">
                                    <span>Progress:</span>
                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${((stepCount + 1) / notes.length) * 100}%`
                                            }}
                                        />
                                    </div>
                                    <span>{Math.round(((stepCount + 1) / notes.length) * 100)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-gray-500 text-lg">No content available for this chapter.</p>
                    </div>
                )}
                
                {stepCount >= notes.length - 1 && (
                    <div className='mt-12'>
                        <div className='bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg'>
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Congratulations!
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                You've completed all the chapter notes! Great job on your learning journey.
                            </p>
                            <Button 
                                onClick={() => router.back()}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                                🏠 Return to Course
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewNotes;