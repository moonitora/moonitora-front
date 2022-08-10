export default function LoginChoice() {

    const moonitora = require('../../resources/moonitora.png')
    const openLogin = (type: number) => {
        if(type === 1) {
            window.location.href = "/login?type=monitor"
        }
        if(type === 2) {
            window.location.href = "login?type=adm"
        }
    }

    return (
        <div className="flex justify-center mt-24 h-96">
            <div className="font-roboto">
                <img src={moonitora} alt="" className="w-64 mx-auto" />
                <p className="mt-8 text-sm text-center mb-2 text-gray-600">Escolha um tipo de login</p>
                <div onClick={() => openLogin(1)} className="hover:cursor-pointer border-2 border-moonitora-cyan px-4 py-2 w-72 text-white text-sm rounded-full font-normal text-center mb-2">
                    <p className="text-moonitora-cyan">Entrar como monitor(a)</p>
                </div>
                <div onClick={() => openLogin(2)} className="hover:cursor-pointer  border-2 border-moonitora-orange px-4 py-2 w-72 font-normal rounded-full text-sm text-white text-center">
                    <p className="text-moonitora-orange">Entrar como administrador(a)</p>
                </div>
            </div>
        </div>
    )

}