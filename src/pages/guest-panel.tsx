import { useEffect, useState } from "react";
import { getGuests, newGuest } from "../services/services";

interface Guest {
    id: string;
    nome: string;
    telefone?: string;
    message?: string;
    presenca?: boolean;
    bebidaAlcoolica?: boolean;
    step?: number;
}

export const GuestPanel = () => {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuestName, setNewGuestName] = useState("");
    const [loading, setLoading] = useState(false);

    // Busca a lista de convidados ao montar o componente
    useEffect(() => {
        const fetchGuests = async () => {
            const data = await getGuests();
            setGuests(data);
        };
        fetchGuests();
    }, []);

    // Adiciona um novo convidado
    const handleAddGuest = async () => {
        if (!newGuestName.trim()) return;
        setLoading(true);
        const success = await newGuest(newGuestName);
        if (success) {
            // Opcional: você pode buscar novamente ou adicionar manualmente
            setGuests(prev => [...prev, { id: Math.random().toString(), nome: newGuestName }]);
            setNewGuestName("");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen w-full max-w-screen relative px-3 py-8 flex flex-col md:gap-18 items-center justify-center grid-background overflow-x-scroll">
            <div className=" mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Lista de Convidados</h2>
                <table className="mb-4 w-220 border border-gray-300 rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Nome</th>
                            <th className="py-2 px-4 text-left">Convite</th>
                            <th className="py-2 px-4 text-left">Presença</th>
                            <th className="py-2 px-4 text-left">Bebe</th>
                            <th className="py-2 px-4 text-left">Mensagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.id} className="border-b">
                                <td className="py-1 px-4">{guest.nome}</td>
                                <td className="py-1 px-4">
                                    <a
                                        href={`http://localhost:5174/${guest.nome}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {`http://localhost:5174/${guest.nome}`}
                                    </a>
                                </td>
                                <td className="py-1 px-4">
                                    {guest.presenca === true ? "Sim" : guest.presenca === false ? "Não" : "-"}
                                </td>
                                <td className="py-1 px-4">
                                    {guest.bebidaAlcoolica === true ? "Sim" : guest.bebidaAlcoolica === false ? "Não" : "-"}
                                </td>
                                <td className="py-1 px-4">
                                    {guest.message ? guest.message : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newGuestName}
                        onChange={e => setNewGuestName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                handleAddGuest();
                            }
                        }}
                        placeholder="Nome do convidado"
                        className="border px-2 py-1 rounded w-full"
                    />
                    <button
                        onClick={handleAddGuest}
                        disabled={loading}
                        className="bg-black text-white px-4 py-1 rounded cursor-pointer"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
        </main>
    );
};