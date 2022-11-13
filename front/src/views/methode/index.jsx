// Chakra imports
import {
  Box,
  useColorModeValue,Text,Textarea,Button, Input,
  FormControl,
  FormLabel,

} from "@chakra-ui/react";

import React from "react";
//React imports
import {useState,useRef,useEffect} from 'react'


export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // States Initiation
  const [file, setFile] = useState('')
  let [value, setValue] = React.useState({
    of:"",    
    client:"",
    model:"",  
  })
  let inputRef = useRef(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/ofs').then(res=>res.json()).then(data=>{setInfo(data)})
  }, [])
  
  let tab=info.map(el=>el.OF)
  let tab1=info.map(el=>el.Modele)
  let tab2=info.map(el=>el.Client)

  //  console.log(tab,tab1,tab2);
  
  let handleInputChange = (e) => {
    let inputValue = {...value}
    inputValue[e.target.id]= e.target.value
    setValue(inputValue)
    //console.log(inputValue);
    }

    let handleInputFile = (e)=>{
      setFile(e.target.files[0])       
    }

  
    let handleSubmit = async (e) => {
         e.preventDefault();
         const formData = new FormData()
         formData.append('of', value.of)
         formData.append('client', value.client)
         formData.append('model', value.model)
         formData.append('file', file)

      try {
        const res = await fetch ('http://localhost:5000/upload', {
          method : 'POST',
          body : formData,
         }).then(res=> {
          console.log('success');
          setValue({
            of:"",    
            client:"",
            model:"",  
          })  
        })
       

        if (!file || value.of==='' || value.client==='' || value.model===''){
          alert('Incorrect input values !') 
          }

        else
        {if (tab.indexOf(value.of)!== -1 & tab1.indexOf(value.model)!== -1 & tab2.indexOf(value.client)!== -1){ 
            // console.log(tab.indexOf(value.of), tab1.indexOf(value.model), 
            // tab2.indexOf(value.client))
            alert('File already exists !')}

          else alert('File uploaded successffully')
          }
          
          inputRef.current.value = null
          setFile('')
          window.location.reload() 
          
        } catch (error) {
          error?console.log(error):console.log('uploaded successfully');  
          
        }}

  return (
    
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <>
      <Text mb='8px'>OF : </Text>
      <Textarea
        bg='white'
        id='of'
        value={value.of}
        onChange={handleInputChange}
        placeholder='Enter OF number'
        size='sm'
        mb='20px'
      />
    </>
    <>
      <Text mb='8px'>Client : </Text>
      <Textarea
        bg='white'
        id='client'
        value={value.client}
        onChange={handleInputChange}
        placeholder='Enter the client name'
        size='sm'
        mb='20px'
      />
    </>
    <>
      <Text mb='8px'>Modèle : </Text>
      <Textarea
        bg='white'
        id='model'
        value={value.model}
        onChange={handleInputChange}
        placeholder='Enter the model name'
        size='sm'
        mb='20px'
      />
    </>
    <FormControl mb='10px'>
  <FormLabel>Import file</FormLabel>
  <Input ref={inputRef} type='file' onChange={handleInputFile} />
  </FormControl>
    <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
