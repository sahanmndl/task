export type FormData = {
    firstName: string;
    lastName: string;
    gender: GenderGroup;
    dateOfBirth: string;
    techStack: { id: string; value: string }[];
    email: string;
    phoneNumber: string;
}

export type GenderGroup = {
    label: string;
    value: string;
}