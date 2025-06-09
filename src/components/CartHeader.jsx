export default function CartHeader({ allSelected, onSelectAllChange }) {
    return (
        <>
            <div className="cart-header-visible justify-center items-center hidden mb-5">
                <div className="cart-header grid lg:grid-cols-5 xl:grid-cols-5 cart-title py-4 lg:px-12 md:px-6 items-center rounded-md">
                    <div className="">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-header checkbox-sm"
                            checked={allSelected}
                            onChange={onSelectAllChange}
                        />
                        <a className="pl-5">全選</a>
                    </div>
                    <div className="grid md:grid-cols-5 grid-cols-3 text-center lg:col-start-3 lg:col-end-6">
                        <div className="flex items-center justify-center"><a className="cart-label">食物</a></div>
                        <div className="flex items-center justify-center"><a className="cart-label">醫療</a></div>
                        <div className="flex items-center justify-center"><a className="cart-label">生活用品</a></div>
                        <div className="flex items-center justify-center"><a className="cart-label">娛樂訓練</a></div>
                        <div className="flex items-center justify-center"><a className="cart-label">操作</a></div>
                    </div>
                </div>
            </div>
        </>
    );
}
