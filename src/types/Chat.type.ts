type IChat = {
    id: number;
    logo: string;
    name: string;
    type: [string, string];
    public: boolean;
    user_settings: {
        role: [string, string];
        notifications: boolean;
    };
    users: {
        id: number;
        username: string;
        role: [string, string];
    }[];
};

type IChats = Omit<IChat, "users">[];

export type { IChat, IChats };
