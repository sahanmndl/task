import * as React from "react";
import {useRef, useState} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Text,
} from '@chakra-ui/react';
import {FormData, GenderGroup} from "../types/form-types";
import {Select} from "chakra-react-select";

const genderGroups: GenderGroup[] = [
    {
        label: "Male",
        value: "male"
    },
    {
        label: "Female",
        value: "female"
    },
    {
        label: "Other",
        value: "other"
    },
];

const Form = () => {

    const {register, handleSubmit, formState: {errors}, control} = useForm<FormData>();

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'techStack',
    });

    const formRef = useRef(null);
    const [data, setData] = useState<FormData>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setData(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display={"flex"} flexDirection={"column"} flex={1} p={4}>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <Heading>Basic Details</Heading>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: "20px 0 20px 0"
                }}>
                    <FormControl flex={0.49} isInvalid={errors.firstName}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type={"text"}
                            placeholder={"John"}
                            {...register('firstName', {required: true, pattern: /^[A-Za-z]+$/i})}
                        />
                        <FormErrorMessage>
                            {errors.firstName?.type === 'required' && 'Name is required'}
                            {errors.firstName?.type === 'pattern' && 'Name is incorrect'}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl flex={0.49} isInvalid={errors.lastName}>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type={"text"}
                            placeholder={"Doe"}
                            {...register('lastName', {required: true, pattern: /^[A-Za-z]+$/i})}
                        />
                        <FormErrorMessage>
                            {errors.lastName?.type === 'required' && 'Name is required'}
                            {errors.lastName?.type === 'pattern' && 'Name is incorrect'}
                        </FormErrorMessage>
                    </FormControl>
                </div>

                <Heading>Other Information</Heading>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: "20px 0 20px 0"
                }}>
                    <Controller
                        control={control}
                        name="gender"
                        rules={{required: "Please select your gender"}}
                        render={({
                                     field: {onChange, onBlur, value, name, ref},
                                     fieldState: {invalid, error}
                                 }) => (
                            <FormControl flex={0.49} isInvalid={invalid}>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    placeholder={"Select"}
                                    name={name}
                                    ref={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    options={genderGroups}
                                />
                                <FormErrorMessage>{error && error.message}</FormErrorMessage>
                            </FormControl>
                        )}
                    />

                    <FormControl flex={0.49} isInvalid={errors.dateOfBirth}>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                            type={"date"}
                            placeholder={"01-01-1970"}
                            {...register('dateOfBirth', {required: true})}
                        />
                        <FormErrorMessage>{errors.dateOfBirth && 'Date of birth is required'}</FormErrorMessage>
                    </FormControl>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: "20px 0 20px 0"
                }}>
                    <FormControl flex={0.49} isInvalid={errors.email}>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type={"email"}
                            placeholder={"johndoe@email.com"}
                            {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                        />
                        <FormErrorMessage>
                            {errors.email?.type === 'required' && 'Email is required'}
                            {errors.email?.type === 'pattern' && 'Email format is incorrect'}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl flex={0.49} isInvalid={errors.phoneNumber}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            placeholder={"+919876543210"}
                            {...register('phoneNumber', {
                                required: true,
                                pattern: /^\+91[1-9][0-9]{9}$/,
                            })}
                        />
                        <FormErrorMessage>
                            {errors.phoneNumber?.type === 'required' && 'Phone number is required'}
                            {errors.phoneNumber?.type === 'pattern' && 'Phone number format is incorrect'}
                        </FormErrorMessage>
                    </FormControl>
                </div>

                <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    {fields.map((field, index) => (
                        <Box key={field.id} width={"49%"} display={"flex"} flexDirection={"row"} mt={4}>
                            <Input
                                {...register(`techStack.${index}.value`, {required: true})}
                            />
                            {index === 0 ? null : (
                                <IconButton
                                    icon={<Text>x</Text>}
                                    onClick={() => remove(index)}
                                    aria-label="Remove Tech Stack"
                                />
                            )}
                        </Box>
                    ))}
                    {fields.length === 0 && (
                        <Box key={0} width={'49%'} display={'flex'} flexDirection={'row'} mb={4}>
                            <Input
                                type={"text"}
                                placeholder={"React Native"}
                                {...register(`techStack.${0}.value`, {required: true})}
                            />
                        </Box>
                    )}
                    <IconButton
                        icon={<Text>+</Text>}
                        mt={4}
                        onClick={() => append({id: Date.now().toString(), value: ''})}
                        aria-label="Add Tech Stack"
                    />
                </FormControl>

                <div style={{display: "flex", flex: 1, flexDirection: 'row', marginTop: "40px"}}>
                    <Button isLoading={loading} colorScheme="teal" type="submit">
                        Submit
                    </Button>
                    <Button onClick={() => formRef.current.reset()} ml={4} colorScheme="red">
                        Reset
                    </Button>
                </div>
            </form>

            <Divider marginY={"20px"} orientation={'horizontal'}/>

            <Text fontSize={"medium"}>
                First Name: {data?.firstName}
            </Text>
            <Text marginY={4} fontSize={"medium"}>
                Last Name: {data?.lastName}
            </Text>
            <Text fontSize={"medium"}>
                Gender: {data?.gender.label}
            </Text>
            <Text marginY={4} fontSize={"medium"}>
                Date of Birth: {data?.dateOfBirth &&
                new Date(data?.dateOfBirth).toLocaleString("en-IN", {day: "2-digit", month: "short", year: "numeric"})}
            </Text>
            <Text fontSize={"medium"}>
                Tech Stack: {data?.techStack.map((it) => it.value).join(", ")}
            </Text>
        </Box>
    );
}

export default Form