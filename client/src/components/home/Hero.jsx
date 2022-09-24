import React from 'react'
// imgs
import HeroImg from '../../assets/imgs/hero.png'
// icons
import { MdQuestionAnswer } from 'react-icons/md'
import { BsFillPatchQuestionFill } from 'react-icons/bs'

const Hero = () => {
    return (
        <section className="bg-white">
            <div className="grid min-h-screen max-w-screen-xl place-content-center px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">You have Questions, We have answers</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">This free and open-source landing page template was built using the utility classes from <a href="https://tailwindcss.com" className="hover:underline">Tailwind CSS</a> and based on the components from the <a href="https://flowbite.com/docs/getting-started/introduction/" className="hover:underline">Flowbite Library</a> and the <a href="https://flowbite.com/blocks/" className="hover:underline">Blocks System</a>.</p>
                    <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                        <a href="https://github.com/themesberg/landwind" className="inline-flex min-w-[200px] items-center justify-start gap-4 w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                            <BsFillPatchQuestionFill fontSize={20} />
                            <span className='capitalize'>Ask questions</span>
                        </a>
                        <a href="https://github.com/themesberg/landwind" className="inline-flex min-w-[200px] items-center justify-cejustify-startnter gap-4 w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                            <MdQuestionAnswer fontSize={20} />
                            <span className='capitalize'>browse questions</span>
                        </a>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={HeroImg} alt="hero image" />
                </div>
            </div>
        </section>
    )
}

export default Hero