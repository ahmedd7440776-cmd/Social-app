import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from './src/pages/useChangPassword';
import toast from 'react-hot-toast'

export default function ChangePasswordModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { mutateAsync, isPending } = useChangePassword();

    async function onSubmit(data) {
        if (data.newPassword !== data.rePassword) {
            toast.error("كلمة السر الجديدة وغير متطابقة مع إعادة التأكيد");
            return;
        }
        toast.promise(
            mutateAsync(data),
            {
                loading: 'جاري تغيير كلمة السر...',
                success: () => {
                    reset();
                    onClose();
                    return 'تم تغيير كلمة السر بنجاح!';
                },
                error: (err) => err?.response?.data?.message || 'حدث خطأ أثناء التغيير'
            }
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">تغيير كلمة السر</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">كلمة السر الحالية</label>
                        <input
                            type="password"
                            {...register('password', { required: 'هذا الحقل مطلوب' })}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">كلمة السر الجديدة</label>
                        <input
                            type="password"
                            {...register('newPassword', { required: 'هذا الحقل مطلوب' })}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">تأكيد كلمة السر الجديدة</label>
                        <input
                            type="password"
                            {...register('rePassword', { required: 'هذا الحقل مطلوب' })}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm">
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-sm font-semibold">
                            {isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}