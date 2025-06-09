export default function Category() {
    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <div className="w-full md:flex items-center h-[50px] px-30 categoryBar hidden">
                <div className="absolute left-30">
                    <img className="items-start cursor-pointer" src="/img/PetLink.png" alt="PetLink" />
                </div>
                <div className="flex-grow flex justify-center space-x-10">
                    <button
                        onClick={() => scrollToSection("#dog_section")}
                        className="inline-block col-span-1 hover:scale-150 category flex justify-center items-center cursor-pointer"
                    >
                        <h2>狗</h2>
                    </button>
                    <button
                        onClick={() => scrollToSection("#cat_section")}
                        className="inline-block col-span-1 hover:scale-150 category flex justify-center items-center cursor-pointer"
                    >
                        <h2>貓</h2>
                    </button>
                </div>
            </div>
        </>
    );
}
