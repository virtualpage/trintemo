import { Chat } from "./chat"
import { ProfileComponent } from "./profile"

export const WindowMsn = () => {
    return (
        <div className="w-full max-w-220 mx-3 mb-10 rounded-md border border-[#525B60] bg-white overflow-hidden z-00" style={{zIndex: "100"}}>
            <header className="w-full text-white h-8 bg-[#3BB2EA] relative shadow-[0_4px_6px_-2px_rgba(255,255,255,0.8)] z-10">
                <div className="flex absolute left-2 top-1">
                    <img src="/images/avatar-msn.png" alt="" className="w-6 " />
                    <p className="ml-1 sm:ml-3 mr-10">Gabi & Henrique</p>
                    <p className="hidden sm:block">trint.emo@hotmail.com</p>
                </div>
                <div className="w-28 h-4.5 flex absolute right-3 top-0 border border-[#525B60] rounded-b-md">
                    <div className="flex-2 flex items-start justify-center">
                        <img src="/images/minimizar.png" alt="minimizar" className="w-6" />
                    </div>
                    <div className="flex-2 flex items-center justify-center border-x border-[#525B60]">
                        <img src="/images/maximizar.png" alt="maximizar" className="w-4.5" />
                    </div>
                    <div className="flex-3 flex items-center justify-center">
                        <img src="/images/fechar.png" alt="fechar" className="w-5" />
                    </div>
                </div>
            </header>
            <nav className="text-white">
                <ul className="flex gap-3 px-3 py-1 bg-linear-to-t from-[#3CB1E8] via-[#68C4EE] to-[#68C4EE]">
                    <li>Fotos</li>
                    <li>Arquivos</li>
                    <li>Videos</li>
                    <li>Chamadas</li>
                    <li className="hidden sm:block">Jogos</li>
                    <li className="hidden sm:block">Atividades</li>
                    <li className="hidden sm:block">Convidar</li>
                    <li className="hidden sm:block">Histórico </li>
                    <li className="hidden md:block">Bloquear</li>
                </ul>
            </nav>
            <div className="w-full relative flex flex-col md:flex-row items-center justify-center">
                <div className="absolute h-24 inset-0 background-chat" />
                <div className="md:min-h-140 md:max-w-80 pt-4 md:py-4 flex justify-start">
                    <ProfileComponent />
                </div>
                <Chat />
            </div>
        </div>
    )
}