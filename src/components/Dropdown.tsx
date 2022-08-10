import {useState} from "react";

interface Properties {
    options: any[]
    setter: any,
    value: any,
    disabled: boolean,
    placeholder: string
}

export default function Dropdown({options, setter, value, disabled, placeholder}: Properties) {
    const [isActive, setActive] = useState(false);
    const onClick = () => {
        if(!disabled) {
            setActive(!isActive);
        }
    }

    const handleClick = (element: any) => {
        setter(element);
        setActive(false)
    }

    return (
        <div className={`cursor-pointer font-inter text-sm`}>
            <ul className="z-10">
                <li>
                    <div className={`w-72 justify-between ${isActive? "rounded-bl-none rounded-br-none border-b-transparent" : "rounded-br-md rounded-bl-md"} w-60 p-2 rounded-md flex border-[1px] ${disabled ? "border-gray-300" : "border-moonitora-cyan"} bg-white`} onClick={onClick}>
                        {value === undefined ? <span className="text-gray-400 font-inter">{placeholder}</span> : <span className="text-gray-700 font-inter">{value.label}</span>}
                        {!isActive && <svg className="my-auto ml-2 fill-gray-700" width="12" height="12" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
                        {isActive && <svg className="rotate-180 my-auto ml-2 fill-gray-700" width="12" height="12" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
                    </div>
                    <div className={`${isActive ? "visible" : "invisible"} flex flex-col`}>
                        {options.map((element, index) => {
                            return (
                                <div className={`${index == options.length - 1 ? "border-b-[1px] rounded-bl-md rounded-br-md" : ""} p-2 bg-white w-72 border-l-[1px] border-r-[1px] border-moonitora-cyan hover:border-l-4 hover:bg-gray-50`} onClick={() => handleClick(element)}>
                                    <p className="text-gray-700 font-inter">{element.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </li>
            </ul>
        </div>
    )
}