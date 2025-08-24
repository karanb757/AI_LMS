// "use client"
// import { Button } from '../../../../components/ui/button'
// import axios from 'axios'
// import { useParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'; // Fixed import
// import React, { useEffect, useState } from 'react'

// const ViewNotes = () => {
//     const { courseId } = useParams();
//     const [notes, setNotes] = useState();
//     const [stepCount, setStepCount] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const router = useRouter(); // Fixed variable name

//     useEffect(() => {
//         GetNotes()
//     }, [])

//     const GetNotes = async () => {
//         try {
//             setLoading(true);
//             setError(null);
            
//             const result = await axios.post('/api/study-type', {
//                 courseId: courseId,
//                 studyType: 'notes' // This matches what your API expects
//             });
            
//             console.log(result?.data);
//             setNotes(result?.data);
//         } catch (error) {
//             console.error("Error fetching notes:", error);
//             setError("Failed to load notes. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }

//     // Function to clean and format HTML content
//     const cleanAndFormatHTML = (htmlContent) => {
//         if (!htmlContent) return '';
        
//         // Remove markdown code blocks
//         let cleaned = htmlContent.replace(/```html|```/g, '');
        
//         // Replace \n with actual line breaks in HTML
//         cleaned = cleaned.replace(/\\n/g, '\n');
        
//         // Convert \n to <br> for proper line breaks in paragraphs
//         cleaned = cleaned.replace(/\n\n/g, '</p><p>');
//         cleaned = cleaned.replace(/\n/g, '<br>');
        
//         // Wrap in paragraph tags if not already wrapped
//         if (!cleaned.trim().startsWith('<')) {
//             cleaned = `<p>${cleaned}</p>`;
//         }
        
//         return cleaned;
//     };

//     const handleNext = () => {
//         if (stepCount < notes.length - 1) {
//             setStepCount(stepCount + 1);
//         }
//     }

//     const handlePrevious = () => {
//         if (stepCount > 0) {
//             setStepCount(stepCount - 1);
//         }
//     }

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
//                     <p>Loading notes...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center p-8 border rounded-lg bg-red-50">
//                 <p className="text-red-600 mb-4">{error}</p>
//                 <Button onClick={GetNotes}>Try Again</Button>
//             </div>
//         );
//     }

//     if (!notes || notes.length === 0) {
//         return (
//             <div className="text-center p-8 border rounded-lg">
//                 <p className="text-gray-500 mb-4">No notes available for this course yet.</p>
//                 <Button onClick={() => router.back()}>Go Back</Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//             {/* Enhanced Navigation Bar */}
//             <div className='sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 mb-8'>
//                 <div className='flex gap-4 items-center justify-between max-w-4xl mx-auto'>
//                     <Button 
//                         variant='outline' 
//                         size='sm' 
//                         onClick={handlePrevious}
//                         disabled={stepCount === 0}
//                         className="px-6 py-2 bg-white/70 hover:bg-white border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                     >
//                         ← Previous
//                     </Button>
                    
//                     {/* Enhanced Progress Bar */}
//                     <div className="flex gap-2 flex-1 max-w-md mx-6">
//                         {notes?.map((item, index) => (
//                             <div 
//                                 key={index} 
//                                 className={`flex-1 h-3 rounded-full transition-all duration-300 ${
//                                     index <= stepCount 
//                                         ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
//                                         : 'bg-gray-200'
//                                 }`}
//                             />
//                         ))}
//                     </div>
                    
//                     <Button 
//                         variant='outline' 
//                         size='sm' 
//                         onClick={handleNext}
//                         disabled={stepCount >= notes.length - 1}
//                         className="px-6 py-2 bg-white/70 hover:bg-white border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                     >
//                         Next →
//                     </Button>
//                 </div>
                
//                 {/* Chapter Title */}
//                 <div className="text-center mt-4">
//                     <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         Chapter {stepCount + 1}: {notes?.[stepCount]?.chapterTitle || `Study Notes`}
//                     </h1>
//                 </div>
//             </div>

//             <div className='mt-10'>
//                 {notes[stepCount]?.notes ? (
//                     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
//                         <div 
//                             className="prose max-w-none"
//                             dangerouslySetInnerHTML={{
//                                 __html: cleanAndFormatHTML(notes[stepCount].notes)
//                             }} 
//                         />
                        
//                         {/* Chapter progress indicator */}
//                         <div className="mt-12 pt-8 border-t border-gray-200">
//                             <div className="flex items-center justify-between text-sm text-gray-500">
//                                 <span>Chapter {stepCount + 1} of {notes.length}</span>
//                                 <div className="flex items-center gap-2">
//                                     <span>Progress:</span>
//                                     <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                         <div 
//                                             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
//                                             style={{
//                                                 width: `${((stepCount + 1) / notes.length) * 100}%`
//                                             }}
//                                         />
//                                     </div>
//                                     <span>{Math.round(((stepCount + 1) / notes.length) * 100)}%</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
//                         <div className="text-6xl mb-4">📚</div>
//                         <p className="text-gray-500 text-lg">No content available for this chapter.</p>
//                     </div>
//                 )}
                
//                 {stepCount >= notes.length - 1 && (
//                     <div className='mt-12'>
//                         <div className='bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg'>
//                             <div className="text-6xl mb-4">🎉</div>
//                             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                                 Congratulations!
//                             </h2>
//                             <p className="text-gray-600 text-lg mb-6">
//                                 You've completed all the chapter notes! Great job on your learning journey.
//                             </p>
//                             <Button 
//                                 onClick={() => router.back()}
//                                 className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
//                             >
//                                 🏠 Return to Course
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ViewNotes;


"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '../../../../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react'

const ViewNotes = () => {
  const { courseId } = useParams()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [currentChapter, setCurrentChapter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    GetNotes()
  }, [])

  const GetNotes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes'
      })
      
      setNotes(result?.data || [])
    } catch (error) {
      console.error("Error fetching notes:", error)
      setError("Failed to load notes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const formatContent = (content) => {
    if (!content) return ''
    
    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // This is a code block
        const codeContent = part.slice(3, -3).trim()
        const lines = codeContent.split('\n')
        const language = lines[0] || 'text'
        const code = lines.slice(1).join('\n')
        const codeId = `code-${currentChapter}-${index}`
        
        return (
          <div key={index} className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-gray-900">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
              <span className="text-sm font-medium text-gray-300 capitalize">{language}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(code, codeId)}
                className="h-8 px-3 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {copiedCode === codeId ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="ml-2 text-xs">
                  {copiedCode === codeId ? 'Copied!' : 'Copy'}
                </span>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm leading-relaxed">
                <code className="text-green-400 font-mono whitespace-pre">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        )
      } else {
        // Regular content
        return (
          <div 
            key={index}
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br>') }}
          />
        )
      }
    })
  }

  const navigationItems = [
    { name: 'Home', onClick: () => router.push('/') },
    { name: 'Dashboard', onClick: () => router.push('/dashboard') },
    { name: 'Contact', onClick: () => router.push('/contact') },
    { name: 'Help', onClick: () => router.push('/help') },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your notes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <Button onClick={GetNotes} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 mb-4 text-lg">No notes available for this course yet.</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            Go Back to Course
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              AI-LMS
            </button>
          </div>
          
          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
            <UserButton />
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-gray-50 border-r border-gray-200`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Course Chapters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {notes.map((note, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    currentChapter === index
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-semibold text-sm">
                        Chapter {index + 1}
                      </div>
                      <div className={`text-xs mt-1 ${
                        currentChapter === index ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {note.chapterTitle || 'Study Notes'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Progress */}
            <div className="mt-8 p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-gray-800 mb-3">Progress</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Chapter {currentChapter + 1} of {notes.length}</span>
                <span>{Math.round(((currentChapter + 1) / notes.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentChapter + 1) / notes.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chapter Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Chapter {currentChapter + 1}: {notes[currentChapter]?.chapterTitle || 'Study Notes'}
                </h1>
                <p className="text-blue-100">
                  {currentChapter + 1} of {notes.length} chapters
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                  disabled={currentChapter === 0}
                  className="text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentChapter(Math.min(notes.length - 1, currentChapter + 1))}
                  disabled={currentChapter === notes.length - 1}
                  className="text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              {notes[currentChapter]?.notes ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  {formatContent(notes[currentChapter].notes)}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="text-gray-500 text-lg">No content available for this chapter.</p>
                </div>
              )}
              
              {/* Completion Message */}
              {currentChapter === notes.length - 1 && (
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Course Completed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Congratulations! You've finished all chapters. Ready to test your knowledge?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => router.back()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Course
                    </Button>
                    <Button 
                      onClick={() => router.push(`/course/${courseId}/quiz`)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Take Quiz
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button - Desktop */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`hidden lg:block fixed top-1/2 ${sidebarOpen ? 'left-80' : 'left-0'} transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg p-2 shadow-lg transition-all duration-300 z-40 hover:bg-gray-50`}
      >
        {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default ViewNotes