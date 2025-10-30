const API_URL = import.meta.env.VITE_API_URL;

export const getGuests = async () => {
    try {
        const response = await fetch(`${API_URL}/guests`);
        if (!response.ok) {
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar convidados:", error);
        return [];
    }
};

export const newGuest = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/new-guest/${nome}`, {
            method: "POST",
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erro ao adicionar convidado:", error);
        return false;
    }
};

export const deleteGuest = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/delete-guest/${nome}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erro ao adicionar convidado:", error);
        return false;
    }
};

export const confirmation = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/confirmation/${nome}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
};

export const notConfirmation = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/not-confirmation/${nome}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
};

export const drink = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/drink/${nome}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
};

export const notDrink = async (nome: string) => {
    try {
        const response = await fetch(`${API_URL}/not-drink/${nome}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
};

export const message = async (nome: string, mensagem: string) => {
    try {
        const response = await fetch(`${API_URL}/message/${nome}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: mensagem }),
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
};

export const stepDb = async (nome: string, stepNumber: number) => {
    try {
        const response = await fetch(`${API_URL}/step/${nome}/${stepNumber}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            return null;
        }

        return true;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}