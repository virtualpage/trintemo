import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../context/chat-context";
import { confirmation, drink, message, notConfirmation, notDrink, stepDb } from "../services/services";
import { GrEdit } from "react-icons/gr";
import { FaCircleCheck } from "react-icons/fa6";

export const Chat = () => {
    const {
        loadedDate,
        step, setStep,
        convidados, setConvidados,
        confirmed, setConfirmed,
        confirmedChopp, setConfirmedChopp,
    } = useChat();
    
    const { nome } = useParams()
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
    console.log(step)

    function insertMessage(htmlContent: string) {
        const chatElement = document.getElementById("chat");
        if (chatElement) {

            const container = document.createElement("div");
            container.innerHTML = htmlContent;

            chatElement.appendChild(container);

            chatElement.scrollTop = chatElement.scrollHeight;
        }
    }
    console.log(confirmed)
    return (
        <div className="w-full flex min-h-145 md:min-h-140 flex-col justify-between px-6 pb-1 md:pt-25 overflow-y-scroll max-h-[200px]">
            <div id="chat" className="overflow-y-scroll overflow-x-hidden mb-4">
                <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                <p className="ml-4">Oii, {nome}! Vai poder vir pra nossa festa?</p>
                <p className="ml-4">Vai ser dia 13 de dezembro às 16h em Eldorado do Sul</p>
                {confirmed == false && (
                    <div id="1">
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Não</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">Tranquilo! Fica pra próxima</p>
                    </div>
                )}
                {step >= 1 && confirmed && (
                    confirmed ? (
                        <div id="2">
                            <p className="text-[#6f6f6f]">Você diz:</p>
                            <p className="ml-4">Sim!</p>
                            <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                            <p className="ml-4">Tu vai beber chopp?</p>
                        </div>
                    ) : (
                        <div id="3">
                            <p className="text-[#6f6f6f]">Você diz:</p>
                            <p className="ml-4">Não</p>
                            <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                            <p className="ml-4">Beleza</p>
                            <p className="ml-4">A gente te aguarda lá</p>
                        </div>
                    ))}
                {step == 2 && confirmedChopp ? (
                    // confirmed ? (
                    <div id="4">
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Sim!</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">E quem mais vai vir junto?</p>
                    </div>
                ) : (
                    <div id="5">
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Não</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">E quem mais vai vir junto?</p>
                    </div>
                )
                    // ) : (
                    //     <>
                    //         <p className="text-[#6f6f6f]">Você diz:</p>
                    //         <p className="ml-4">Não</p>
                    //         <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                    //         <p className="ml-4">E quem mais vai vir junto?</p>
                    //     </>
                    // )
                }
                {step > 2 && confirmed && (
                    <div id="6">
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <div className="flex items-center gap-2">
                            {!isEditing ? (
                                <button onClick={() => {
                                    setIsEditing(!isEditing)
                                    // if (nome) message(nome, convidados);
                                    // setStep(3);
                                    // setIsEditing(false);
                                }}>
                                    <GrEdit />
                                </button>
                            ) : (
                                <button onClick={() => {
                                    if (nome) {
                                        message(nome, convidados)
                                    };
                                    setStep(3);
                                    setIsEditing(false);
                                }}>
                                    <FaCircleCheck className="text-[#3BB2EA]" />
                                </button>
                            )}
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full h-full wrap-break-word px-2 py-1 rounded border"
                                    value={convidados}
                                    onChange={(e) => setConvidados(e.target.value)}
                                />
                            ) : (
                                <p>{convidados || "Nenhum convidado informado"}</p>
                            )}
                        </div>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">Combinado, a gente te aguarda lá</p>
                    </div>
                )}
            </div>
            <div>
                {step == 0 && (
                    <div className="bg-white mt-1 flex items-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                        <button
                            className="bg-[#3BB2EA] px-3 rounded-md mr-2 cursor-pointer"
                            onClick={() => {
                                if (nome) { confirmation(nome); stepDb(nome, 1) };
                                setConfirmed(true)
                                if (step < 3) setStep(1)
                                if (step >= 3) {
                                    insertMessage(`
                                        <p class="text-[#6f6f6f]">Você diz:</p>
                                        <p class="ml-4">Sim!</p>
                                        <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                        <p class="ml-4">Tu vai beber chopp?</p>
                                    `);
                                }

                            }}
                        >
                            Sim!
                        </button>
                        <button
                            className="bg-[#999999] px-3 rounded-md cursor-pointer"
                            onClick={() => {
                                if (nome) { notConfirmation(nome); stepDb(nome, 1) };
                                setConfirmed(false)
                                if (step < 3) setStep(1)
                                if (step >= 3) {
                                    insertMessage(`
                                        <p class="text-[#6f6f6f]">Você diz:</p>
                                        <p class="ml-4">Não</p>
                                        <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                        <p class="ml-4">Tranquilo! Fica pra próxima :)</p>
                                    `)
                                }
                            }}
                        >
                            Não
                        </button>
                    </div>
                )}
                {step == 2 && (
                    confirmed ? (
                        <div id="10" className="bg-white mt-1 flex items-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                            <button
                                className="bg-[#3BB2EA] px-3 rounded-md mr-2 cursor-pointer" onClick={() => {
                                    if (nome) { drink(nome); stepDb(nome, 2) };
                                    setConfirmedChopp(true)
                                    if (step < 3) setStep(2)
                                    insertMessage(`
                                    <p class="text-[#6f6f6f]">Você diz:</p>
                                    <p class="ml-4">Sim!</p>
                                    <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                    <p class="ml-4">E quem mais vai vir junto?</p>
                                `);
                                }}
                            >
                                Sim! 🍺
                            </button>
                            <button
                                className="bg-[#999999] px-3 rounded-md cursor-pointer"
                                onClick={() => {
                                    if (nome) { notDrink(nome); stepDb(nome, 2) };
                                    setConfirmedChopp(false)
                                    if (step < 3) setStep(2)
                                    insertMessage(`
                                    <p class="text-[#6f6f6f]">Você diz:</p>
                                    <p class="ml-4">Sim!</p>
                                    <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                    <p class="ml-4">E quem mais vai vir junto?</p>
                                `);
                                }}
                            >
                                Não
                            </button>
                        </div>
                    ) : (
                        <div id="11" className={`${confirmed ? "h-25" : "h-13"} bg-white mt-1 flex flex-col lg:flex-row justify-center gap-4 items-center sm:h-20 lg:h-9 py-1 px-3 rounded-lg border border-[#909090]`}>
                            <div className="flex flex-col sm:flex-row items-center">
                                <p
                                    className="px-2 rounded-sm"
                                    style={{ backgroundColor: confirmed ? "#60C540" : "#ce342f", color: confirmed ? "#000000" : "#ffffff" }}
                                >
                                    {confirmed ? "✅ Presença confirmada" : "❌ Presença cancelada"}
                                </p>
                                <button
                                    onClick={() => {
                                        setConfirmed(!confirmed)
                                        if (confirmed) {
                                            if (nome) notConfirmation(nome)
                                            insertMessage(`
                                                <p class="text-[#6f6f6f]">Você diz:</p>
                                                <p class="ml-4">Não, vou mais poder ir à festa de vocês</p>
                                                <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                                <p class="ml-4">Tranquilo! Fica pra próxima :)</p>
                                            `);
                                        } else {
                                            if (nome) confirmation(nome)
                                            insertMessage(`
                                        <p class="text-[#6f6f6f]">Você diz:</p>
                                        <p class="ml-4">Vou ir à festa de vocês</p>
                                        <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                        <p class="ml-4">Combinado, a gente te aguarda lá</p>
                                    `);
                                        }

                                    }}
                                    className="pl-1 text-[13px]"
                                >
                                    {confirmed ? "cancelar presença" : "confirmar presença"}
                                </button>
                            </div>
                            {confirmed && (
                                <div className="flex flex-col sm:flex-row items-center">
                                    <p className="bg-[#3BB2EA] px-2 rounded-sm">
                                        {confirmedChopp ? "🍺 Com chopp" : "🥤 Sem chopp"}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setConfirmedChopp(!confirmedChopp)
                                            if (confirmedChopp) {
                                                if (nome) notDrink(nome)
                                            } else {
                                                if (nome) drink(nome)
                                            }
                                        }}
                                        className="pl-1 text-[13px]">{confirmedChopp ? "cancelar presença" : "confirmar presença"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                {step == 2 && confirmed && (
                    <div className="bg-white mt-1 flex justify-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                        <input
                            type="text"
                            className="w-full h-full"
                            value={convidados}
                            onChange={(e) => setConvidados(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                if (nome) { message(nome, convidados); stepDb(nome, 3) };
                                if (step < 3) setStep(3)
                            }}
                            className="bg-blue-400 px-3 rounded-sm cursor-pointer"
                        >
                            Enviar
                        </button>
                    </div>
                )}
                {step == 3 && (
                    <>
                        <div className={`${confirmed ? "h-25" : "h-13"} bg-white mt-1 flex flex-col lg:flex-row justify-center gap-4 items-center sm:h-20 lg:h-9 py-1 px-3 rounded-lg border border-[#909090]`}>
                            <div className="flex flex-col sm:flex-row items-center">
                                <p
                                    className="px-2 rounded-sm"
                                    style={{ backgroundColor: confirmed ? "#60C540" : "#ce342f", color: confirmed ? "#000000" : "#ffffff" }}
                                >
                                    {confirmed ? "✅ Presença confirmada" : "❌ Presença cancelada"}
                                </p>
                                <button
                                    onClick={() => {
                                        setConfirmed(!confirmed)
                                        if (confirmed) {
                                            if (nome) notConfirmation(nome)
                                            insertMessage(`
                                                <p class="text-[#6f6f6f]">Você diz:</p>
                                                <p class="ml-4">Não, vou mais poder ir à festa de vocês</p>
                                                <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                                <p class="ml-4">Tranquilo! Fica pra próxima :)</p>
                                            `);
                                        } else {
                                            if (nome) confirmation(nome)
                                            insertMessage(`
                                        <p class="text-[#6f6f6f]">Você diz:</p>
                                        <p class="ml-4">Vou ir à festa de vocês</p>
                                        <p class="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                                        <p class="ml-4">Combinado, a gente te aguarda lá</p>
                                    `);
                                        }

                                    }}
                                    className="pl-1 text-[13px]"
                                >
                                    {confirmed ? "cancelar presença" : "confirmar presença"}
                                </button>
                            </div>
                            {confirmed && (
                                <div className="flex flex-col sm:flex-row items-center">
                                    <p className="bg-[#3BB2EA] px-2 rounded-sm">
                                        {confirmedChopp ? "🍺 Com chopp" : "🥤 Sem chopp"}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setConfirmedChopp(!confirmedChopp)
                                            if (confirmedChopp) {
                                                if (nome) notDrink(nome)
                                            } else {
                                                if (nome) drink(nome)
                                            }
                                        }}
                                        className="pl-1 text-[13px]">{confirmedChopp ? "cancelar presença" : "confirmar presença"}
                                    </button>
                                </div>
                            )}
                        </div>
                        {confirmed && (
                            <div className="flex items-center gap-2">
                                {!isEditing ? (
                                    <button onClick={() => {
                                        setIsEditing(!isEditing)
                                    }}>
                                        <GrEdit />
                                    </button>
                                ) : (
                                    <button onClick={() => {
                                        if (nome) message(nome, convidados);
                                        setStep(3);
                                        setIsEditing(false);
                                    }}>
                                        <FaCircleCheck className="text-[#3BB2EA]" />
                                    </button>
                                )}
                                {isEditing ? (
                                    <>
                                        <span className="whitespace-nowrap">Convidados: {nome} e</span>
                                        <input
                                            type="text"
                                            className="w-full h-full my-1 wrap-break-word px-2 py-1 rounded border"
                                            value={convidados}
                                            onChange={(e) => setConvidados(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    setIsEditing(false); // Sai do modo de edição
                                                    if (nome) {
                                                        message(nome, convidados); // Envia os convidados para o backend
                                                    }
                                                }
                                            }}
                                        />
                                    </>
                                ) : (
                                    <p className="w-full h-full my-2">Convidados: {nome} {convidados && "e"} {convidados || ""}</p>
                                )}
                            </div>
                        )}
                    </>
                )}
                <p className="text-[12px] text-center text-[#6f6f6f]">última mensagem recebida em {loadedDate}</p>
            </div>
        </div>
    );
};