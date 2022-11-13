import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { AdvantryXLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import LogoAdvantryX from "../../../assets/img/layout/LogoAdvantryX.jpg"


export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
     {/*<AdvantryXLogo h='50px' w='175px' my='32px' color={logoColor} />*/}
      <img src={LogoAdvantryX} alt="LogoAdvantryx"/>  
      <HSeparator mb='20px' />
    </Flex>
  );
}


export default SidebarBrand;
