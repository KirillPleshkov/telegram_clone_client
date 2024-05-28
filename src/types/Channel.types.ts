import { TypeMessage } from "./Message.type";

type TypeChannel = {
    id: number;
    img: string;
    name: string;
    last_message: TypeMessage;
};

export type { TypeChannel };
