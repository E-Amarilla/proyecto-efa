"use client";

const Selector = () => {

    const recetaList = [
        { id: 1, name: "RECETA 1" },
        { id: 2, name: "RECETA 2" },
        { id: 3, name: "RECETA 3" },
        { id: 4, name: "RECETA 4" },
        { id: 5, name: "RECETA 5" },
        { id: 6, name: "RECETA 6" },
        { id: 7, name: "RECETA 7" },
        { id: 8, name: "RECETA 8" },
        { id: 9, name: "RECETA 9" },
        { id: 10, name: "RECETA 10" },
        { id: 11, name: "RECETA 11" },
        { id: 12, name: "RECETA 12" },
        { id: 13, name: "RECETA 13" },
        { id: 14, name: "RECETA 14" },
        { id: 15, name: "RECETA 15" },
        { id: 16, name: "RECETA 16" },
        { id: 17, name: "RECETA 17" },
        { id: 18, name: "RECETA 18" },
        { id: 19, name: "RECETA 19" },
        { id: 20, name: "RECETA 20" },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex justify-start w-full h-[50px]">
                <select
                    className="
                        w-full
                        h-[60px]
                        bg-[#131313]
                        p-[15px]
                        rounded-tl-xl
                        rounded-tr-xl
                        border-b-2
                        focus:outline-none
                    "
                >
                    <option value="" disabled className="">
                        Seleccione una cocina
                    </option>
                    {recetaList.map((cocina) => (
                        <option
                            key={cocina.id}
                            value={cocina.id}
                            className="
                                p-10
                                text-orange
                                hover:text-orange
                                bg-black
                                font-bold
                            "
                        >
                            {cocina.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Selector;
