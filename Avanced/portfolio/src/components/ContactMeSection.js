import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {

  // const {isLoading, response, submit} = useSubmit();
  // JavaScript 的解构赋值（Destructuring assignment）语法
  // 从 useSubmit 钩子返回的对象中提取三个属性：
  // isLoading、response 和 submit。
  // useSubmit 是一个自定义钩子（Custom Hook），
  // 它返回一个包含这三个属性的对象。
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email:"",
      type:"",
      comment: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await submit(values);
        if (res && res.type === 'success') {
          resetForm();
        }
      } catch (error) {
        console.error("Submit error:", error);
      }
    },    
      
    // onSubmit 是一个函数
    // submit 也是一个函数
    // onSubmit 是 useFormik 的配置之一，你需要提供一个函数，当表单触发提交事件时，
    // Formik 将调用这个 onSubmit 函数，并传入表单的值（values）作为参数。
    // onSubmit 和 submit 并非一回事；
    // onSubmit 是 useFormik 钩子的配置选项之一，用于定义表单提交时的行为，
    // 而 submit 是从 useSubmit 钩子中解构出来的，用于执行实际的提交逻辑。   
    
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter your name'),
      email: Yup.string().email('Invalid email address').required('Please enter your email'),
      type: Yup.string().required('Please select an enquiry type'),
      comment: Yup.string().required('Please enter your message'),
    }),
    //validationSchema 是 Yup 库中的一个功能
  });

  useEffect(() => {
    if (response) {
      const action = response.type === 'success' ? 'success' : 'error';
      const message = action === 'success' 
        ? `Thanks for reaching out, ${formik.values.firstName}!` 
        : "There was an error processing your request.";
      
      onOpen(action, message);
  
      if (response.type === 'success') {
        formik.resetForm();
      }
    }
    // Assuming `onOpen` doesn't change `response`, this dependency array is safe.
    // If `onOpen` does affect `response`, you'll need to reconsider its implementation.
  }, [response]);
  

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                //我们需要根据字段是否被触摸并且验证失败来设置 isInvalid 属性。
                //我们可以使用 Formik 提供的 touched 和 errors 属性来做到这一点。
                >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")} 
                  //将 formik.getFieldProps("firstName") 返回的对象中的所有属性展开到 Input 组件中
                  //返回的对象中的属性是由 Formik 提供的，用于实现表单字段与受控组件之间的关联
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl 
              isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")} 
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select 
                  id="type" 
                  name="type" 
                  {...formik.getFieldProps("type")}
                  placeholder="Select enquiry type"
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl 
              isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")} 
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={formik.isSubmitting || isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
