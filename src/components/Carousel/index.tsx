import { Box, Image as ChakraImage, IconButton } from "@chakra-ui/react";
import { Image } from "../../types/events";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface CarouselProps {
    items: Image[];
    position: 'absolute' | 'relative'
}

export default function Carousel({ items, position }: CarouselProps) {
    const [index, setIndex] = useState<number>(0);

      function handleLeft() {
        setIndex((prev) => {
            if (prev == 0) {
                return items.length - 1;
            }
            else {
                return prev - 1;
            }
        })
      }

      function handleRight() {
        setIndex((prev) => {
            if (prev == items.length - 1) {
                return 0;
            }
            else {
                return prev + 1;
            }
        })
      }

    return (
        <Box display='flex'>
            <IconButton 
                ml={8}
                mr={position == 'relative' ? 5 : undefined}
                aria-label="carouselLeft" 
                icon={<ArrowLeftIcon />} 
                position={position} 
                left='0' 
                top='40%' 
                onClick={handleLeft} 
                visibility={items.length <= 1 ? 'hidden' : 'visible'}
            />
                <ChakraImage height='auto' width='100%' aspectRatio='1/1' objectFit='cover' src={items && items[index] && items[index].url} fallbackSrc="https://placehold.co/600x400" />
            <IconButton 
                mr={8} 
                ml={position == 'relative' ? 5 : undefined}
                aria-label="carouseRight" 
                icon={<ArrowRightIcon />} 
                position={position} 
                right='0' 
                top='40%' 
                onClick={handleRight}
                visibility={items.length <= 1 ? 'hidden' : 'visible'}
            />
        </Box>
    )
}