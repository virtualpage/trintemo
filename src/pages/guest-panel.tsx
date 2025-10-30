import { useEffect, useState } from "react";
import { deleteGuest, getGuests, newGuest } from "../services/services";
import { IoIosCloseCircle } from "react-icons/io";

interface Guest {
    id: string;
    nome: string;
    telefone?: string;
    message?: string;
    presenca?: boolean;
    bebidaAlcoolica?: boolean;
    step?: number;
    slug?: string;
}

export const GuestPanel = () => {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuestName, setNewGuestName] = useState("");
    const [loading, setLoading] = useState(false);

    // function generateSlug(name: string): string {
    //     return name
    //         .normalize("NFD")
    //         .replace(/[\u0300-\u036f]/g, "")
    //         .toLowerCase()
    //         .replace(/[^a-z0-9\s-]/g, "")
    //         .replace(/\s+/g, "-")
    //         .replace(/-+/g, "-")
    //         .trim();
    // }

    useEffect(() => {
        const fetchGuests = async () => {
            const data = await getGuests();
            setGuests(data);
        };
        fetchGuests();
    }, []);

    const handleAddGuest = async () => {
        if (!newGuestName.trim()) return;
        setLoading(true);
        const success = await newGuest(newGuestName);
        if (success) {
            const data = await getGuests(); 
            setGuests(data); 
            setNewGuestName(""); 
        }
        setLoading(false);
    };

    const handleDeleteGuest = async (name: string) => {
        const success = await deleteGuest(name); // Chama a API para deletar o convidado
        if (success) {
            setGuests((prev) => prev.filter((guest) => guest.nome !== name)); // Remove o convidado da lista local
        } else {
            alert("Erro ao deletar o convidado.");
        }
    };
console.log(guests)
    return (
        <main className="min-h-screen w-full max-w-screen relative px-3 py-8 flex flex-col md:gap-18 items-center justify-center grid-background overflow-x-scroll">
            <div className=" mx-auto p-4 bg-white rounded shadow z-99">
                <h2 className="text-xl font-bold mb-4">
                        Lista de Convidados | Presença: {guests.filter((guest) => guest.presenca === true).length} | Bebe: {guests.filter((guest) => guest.bebidaAlcoolica === true).length}
                    </h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        onKeyDown={(e) => {
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
                <table className="mb-4 w-220 border border-gray-300 rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Nome</th>
                            <th className="py-2 px-4 text-left">Convite</th>
                            <th className="py-2 px-4 text-left">Presença ({guests.filter((guest) => guest.presenca === true).length})</th>
                            <th className="py-2 px-4 text-left">Bebe ({guests.filter((guest) => guest.bebidaAlcoolica === true).length})</th>
                            <th className="py-2 px-4 text-left">Convidados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests
                            .slice() 
                            .sort((a, b) => Number(b.id) - Number(a.id))
                            .map((guest) => (
                                <tr key={guest.id} className="border-b">
                                    <td className="py-1 px-4 flex items-center gap-2">
                                        <IoIosCloseCircle
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDeleteGuest(guest.nome)}
                                        />
                                        {guest.nome}
                                    </td>
                                    <td className="py-1 px-4">
                                        <a
                                            href={`https://trintemo.site/${guest.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {`https://trintemo.site/${guest.slug}`}
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
                
            </div>
            <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
        </main>
    );
};