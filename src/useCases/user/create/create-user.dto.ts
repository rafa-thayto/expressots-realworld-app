interface ICreateUserRequestDTO {
    username: string
    email: string
    password: string
}

interface ICreateUserResponseDTO {
    status: string;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
