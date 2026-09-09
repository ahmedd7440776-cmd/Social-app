
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useUploadProfilePhoto } from './useUpdataProfile';

export default function UpdateProfileModal({ isOpen, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const { mutate: uploadPhoto, isPending } = useUploadProfilePhoto();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        toast.promise(
            new Promise((resolve, reject) => {
                uploadPhoto(selectedFile, {
                    onSuccess: (data) => {
                        setSelectedFile(null);
                        setPreview(null);
                        if (onClose) onClose();
                        resolve(data);
                    },
                    onError: (err) => reject(err)
                });
            }),
            {
                loading: 'Uploading photo...',
                success: 'Profile picture updated successfully! 🎉',
                error: (err) => err?.response?.data?.message || 'Failed to upload photo'
            }
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-4">
                <h3 className="text-xl font-bold text-gray-800">Update Profile Picture</h3>

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    {/* see the photo bfore you upload it ok*/}
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-sky-500 shadow"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                            Select Image
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                    />

                    <div className="flex justify-end gap-3 w-full mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!selectedFile || isPending}
                            className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 transition"
                        >
                            {isPending ? 'Uploading...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}