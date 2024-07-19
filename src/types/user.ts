type LoginDTO = {
    email: string;
    password: string;
};

type RegisterDTO = LoginDTO;

export type {
    LoginDTO,
    RegisterDTO
}