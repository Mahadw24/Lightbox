import React, { useState, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';
import { GrRotateRight } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai'

const LightBox = () => {
    const array = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg'];
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const imageRef = useRef(null);

    const imageClickHandle = (index) => {
        setCurrentIndex(index);
        setShowModal(true);
    };

    const rightIconClickHandle = () => {
        setCurrentIndex(currentIndex + 1);
        setScale(1);
        setRotation(0);
    };

    const leftIconClickHandle = () => {
        setCurrentIndex(currentIndex - 1);
        setScale(1);
        setRotation(0);
    };

    const handleZoomIn = () => {
        setScale(scale + 0.25);
    };

    const handleZoomOut = () => {
        setScale(scale - 0.25);
    };

    const handleClose = () => {
        setShowModal(false);
    }
    const handleRotate = () => {
        setRotation(rotation + 30);
    };

    return (
        <>
            <div className='flex flex-wrap m-10 h-[800px] md:border-2 md:border-2 blue-500 md:w-fit'>
            {/* <div className='m-10 flex'> */}
                {array.map((item, index) => {
                    return (
                        <img
                            className='w-[49%] h-[49%] md:w-[100%] m-1 border-2 border-black cursor-pointer'
                            onClick={() => imageClickHandle(index)}
                            src={`/static/${item}`}
                            alt={item}
                            key={item}
                            style={{ position: 'relative' }}
                        />
                    );
                })}
            </div>

            {showModal && (
                <div className='w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center justify-around md:justify-center'>
                    <AiOutlineClose className='absolute top-7  left-7 w-10 h-10 cursor-pointer' onClick={handleClose} />
                    <div className='flex justify-between w-20 mb-10 h-fit'>
                        <h1 className='text-3xl font-light text-[#CCB37A]'>{`${currentIndex + 1}`}</h1>
                        <h1 className='text-3xl font-light'>{`of ${array.length}`}</h1>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        {currentIndex === 0 ? (
                            <div></div>
                        ) : (
                            <SlArrowLeft className='w-[45px] h-[45px] cursor-pointer' onClick={leftIconClickHandle} />
                        )}
                        <div className='flex items-center w-[1000px] justify-around'>
                            <div className='z-10 flex flex-col justify-between h-[200px]  py-2 bg-white rounded-xl'>
                                <TfiZoomIn
                                    className='w-[45px] h-[30px] text-[#757575] cursor-pointer'
                                    onClick={handleZoomIn}
                                />
                                <GrRotateRight className='w-[45px] h-[30px] text-[#757575] cursor-pointer' onClick={handleRotate} />
                                <TfiZoomOut
                                    className='w-[45px] h-[30px] text-[#757575] cursor-pointer'
                                    onClick={handleZoomOut}
                                />
                            </div>
                            <img
                                ref={imageRef}
                                className='w-[900px] h-[500px] md:w-[450px] md:h-[250px]'
                                src={`/static/${array[currentIndex]}`}
                                alt=''
                                style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, transition: 'transform 0.3s ease-in-out' }}
                            />
                        </div>
                        {currentIndex === array.length - 1 ? (
                            <div></div>
                        ) : (
                            <SlArrowRight className='w-[45px] h-[45px] cursor-pointer' onClick={rightIconClickHandle} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LightBox;