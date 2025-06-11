export default function DeleteBox() {
    const DeleteConfirmationBox = ({ onConfirm, onCancel }) => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                    <h2 className="text-lg font-bold mb-4">確定要刪除嗎？</h2>
                    <p className="text-gray-600 mb-6">此操作將無法恢復。</p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            onClick={onConfirm}
                        >
                            確定
                        </button>
                        <button
                            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                            onClick={onCancel}
                        >
                            取消
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div>
            {showConfirmation && (
                <DeleteConfirmationBox
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}