import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../../redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-[#000000] py-12">
            <Carousel className="w-full max-w-3xl mx-auto">
                <CarouselContent className="gap-4">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={index} 
                            className="md:basis-1/2 lg:basis-1/3 flex justify-center"
                        >
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="
                                    rounded-full 
                                    border-2 
                                    border-[#CF0F47] 
                                    text-[#CF0F47] 
                                    font-semibold
                                    hover:bg-[#CF0F47] 
                                    hover:text-white 
                                    transition-colors
                                    px-6 py-3
                                    bg-[#000000]
                                "
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-[#CF0F47] border-[#CF0F47] hover:bg-[#CF0F47] hover:text-white" />
                <CarouselNext className="text-[#CF0F47] border-[#CF0F47] hover:bg-[#CF0F47] hover:text-white" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
