interface WindowNotificationProps {
    openNotification: () => void;
}

export const WindowNotification = ({ openNotification }: WindowNotificationProps) => {
    return (
        <div
            className="absolute top-2 left-2 w-70 h-40 bg-gradient rounded-sm border border-[#525B60] z-99 animate-blink"
        >
            <div>
                <img src="/images/logo-msn.png" alt="msn" className="w-6 absolute top-1 left-1" />
                <p className="pl-8">Windows Live Messenger</p>
            </div>
            <div className="flex pr-4 translate-y-3 md:relative">
                <div className="relative w-30 h-24 mx-2">
                    <img src="/images/border-profile.png" alt="border" className="w-full h-full" />
                    <img
                        src="/images/perfil-gabi-henrique.png"
                        alt="gabi-henrique"
                        className="absolute scale-[0.8] rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="flex h-fit flex-col justify-between py-2 gap-3"> 
                    <p>Mensagem de Gabi e Henrique</p>
                    <button className="bg-blue-300/80 px-4 h-8 rounded-sm cursor-pointer font-semibold" onClick={openNotification} >Ver mensagem</button>
                </div>
            </div>
        </div>
    );
};