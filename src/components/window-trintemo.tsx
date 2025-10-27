interface WindowNotificationProps {
    open: () => void;
}


export const WindowTintemo = ({open}: WindowNotificationProps) => {
    return (
        <div
            className="relative w-70 h-40 bg-gradient rounded-sm border border-[#525B60] z-99"
        >
            <div>
                <img src="/images/windows-logo.png" alt="msn" className="w-5 absolute top-1 left-1" />
                <p className="pl-8">Trint<span className="font-bold">emo</span></p>
            </div>
            <div className="flex translate-y-3 md:relative">
                <div className="flex h-fit flex-col justify-between py-2 gap-3">
                    <p className="text-center">Convite para trintemo da Gabi e Henrique</p>
                    <button className="bg-[#000000] text-white mx-auto px-4 h-8 rounded-sm cursor-pointer font-semibold" onClick={open} >Abrir convite</button>
                </div>
            </div>
        </div>
    )
}