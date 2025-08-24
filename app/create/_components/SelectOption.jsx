// import Image from 'next/image'
// import React, { useState } from 'react'

// const SelectOption = ({selectedStudyType}) => {

//     const Options = [
//         {
//             name:'Exam',
//             icon:'/exam_1.png'
//         },
//         {
//             name:'Job Interview',
//             icon:'/job.png'    
//         },
//         {
//             name:'Practise',
//             icon:'/practice.png'
//         },
//         {
//             name:'Coding Prep',
//             icon:'/code.png'
//         },
//         {
//             name:'Other',
//             icon:'/knowledge.png'
//         }
//     ]
//     const [selectedOption,setSelectedOption]=useState();

//   return (
//     <div>
//         <h2 className='text-center mb-2 text-lg'>For which you create your personal study material</h2>
//         <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5'>
//             {Options.map((option,index)=>(
//                 <div key={index} 
//                 className={`p-4 flex flex-col  items-center justify-center border rounded-xl hover:border-primary cursor-pointer
//                 ${option?.name==selectedOption&&'border-primary'}`}
//                 onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}
//                 >
//                     <Image src={option.icon} alt={option.name} width={50} height={50} />
//                     <h2 className='text-sm mt-2 '>{option.name}</h2>
//                 </div> 
//             ))}
//         </div>
//     </div>
//   )
// }

// export default SelectOption

import Image from 'next/image'
import React, { useState } from 'react'

const SelectOption = ({selectedStudyType}) => {
    const Options = [
        {
            name:'Exam',
            icon:'/exam_1.png'
        },
        {
            name:'Job Interview',
            icon:'/job.png'
        },
        {
            name:'Practise',
            icon:'/practice.png'
        },
        {
            name:'Coding Prep',
            icon:'/code.png'
        },
        {
            name:'Other',
            icon:'/knowledge.png'
        }
    ]
    
    const [selectedOption,setSelectedOption]=useState();

    return (
        <div>
            <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                {Options.map((option,index)=>(
                    <div key={index} 
                        className={`group bg-white p-6 flex flex-col items-center justify-center rounded-lg shadow-lg hover:shadow-2xl  cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 
                        ${option?.name==selectedOption 
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                            : 'border-slate-100 hover:border-blue-200'
                        }`}
                        onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}
                    >
                        <div className={`mb-4 p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                            option?.name==selectedOption 
                                ? 'bg-gradient-to-br from-blue-100 to-purple-100' 
                                : 'bg-gradient-to-br from-slate-50 to-blue-50 group-hover:from-blue-100 group-hover:to-purple-100'
                        }`}>
                            <Image src={option.icon} alt={option.name} width={50} height={50} />
                        </div>
                        <h2 className={`text-sm font-semibold text-center transition-colors duration-300 ${
                            option?.name==selectedOption 
                                ? 'text-blue-600' 
                                : 'text-slate-700 group-hover:text-blue-600'
                        }`}>
                            {option.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectOption